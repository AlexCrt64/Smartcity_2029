import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectId, voteType, sessionId } = body;

    if (!projectId || !voteType) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (voteType !== 'UPVOTE' && voteType !== 'DOWNVOTE') {
      return Response.json(
        { success: false, error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    // Check if project exists and is in voting period
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      return Response.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    if (project.status !== 'VOTE_EN_COURS') {
      return Response.json(
        { success: false, error: 'Voting not available for this project' },
        { status: 400 }
      );
    }

    // Check if voting period is active
    const now = new Date();
    if (project.votingEnd && now > project.votingEnd) {
      // Update project status to closed if voting period ended
      await prisma.project.update({
        where: { id: projectId },
        data: { status: 'APPROUVE' }
      });
      
      return Response.json(
        { success: false, error: 'Voting period has ended' },
        { status: 400 }
      );
    }

    // If no voting end date is set and status is VOTE_EN_COURS, allow voting
    if (!project.votingStart && project.status === 'VOTE_EN_COURS') {
      // Set voting start time for legacy projects
      await prisma.project.update({
        where: { id: projectId },
        data: { 
          votingStart: new Date(),
          votingEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      });
    }

    // Create vote (no user authentication needed for demo)
    const vote = await prisma.vote.create({
      data: {
        projectId: projectId,
        voteType: voteType,
        sessionId: sessionId || `demo_${Date.now()}`
      }
    });

    // Get updated vote counts
    const votes = await prisma.vote.findMany({
      where: { projectId }
    });

  const upvotes = votes.filter((v: any) => v.voteType === 'UPVOTE').length;
  const downvotes = votes.filter((v: any) => v.voteType === 'DOWNVOTE').length;

    return Response.json({
      success: true,
      vote,
      voteCount: {
        up: upvotes,
        down: downvotes,
        total: upvotes + downvotes,
        score: upvotes - downvotes
      }
    });

  } catch (error) {
    console.error('Vote API Error:', error);
    return Response.json(
      { success: false, error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const voteId = searchParams.get('voteId');
    const projectId = searchParams.get('projectId');

    if (!voteId || !projectId) {
      return Response.json(
        { success: false, error: 'Missing voteId or projectId' },
        { status: 400 }
      );
    }

    // Remove vote by ID (demo purposes)
    await prisma.vote.deleteMany({
      where: {
        id: voteId,
        projectId: projectId
      }
    });

    // Get updated vote counts
    const votes = await prisma.vote.findMany({
      where: { projectId }
    });

  const upvotes = votes.filter((v: any) => v.voteType === 'UPVOTE').length;
  const downvotes = votes.filter((v: any) => v.voteType === 'DOWNVOTE').length;

    return Response.json({
      success: true,
      voteCount: {
        up: upvotes,
        down: downvotes,
        total: upvotes + downvotes,
        score: upvotes - downvotes
      }
    });

  } catch (error) {
    console.error('Delete Vote API Error:', error);
    return Response.json(
      { success: false, error: 'Failed to remove vote' },
      { status: 500 }
    );
  }
}