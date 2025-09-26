import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, projectId, voteType } = body;

    if (!userId || !projectId || !voteType) {
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
      return Response.json(
        { success: false, error: 'Voting period has ended' },
        { status: 400 }
      );
    }

    // Upsert vote (update if exists, create if not)
    const vote = await prisma.vote.upsert({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: projectId
        }
      },
      update: { voteType },
      create: {
        userId: userId,
        projectId: projectId,
        voteType
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
    const userId = searchParams.get('userId');
    const projectId = searchParams.get('projectId');

    if (!userId || !projectId) {
      return Response.json(
        { success: false, error: 'Missing userId or projectId' },
        { status: 400 }
      );
    }

    // Remove vote
    await prisma.vote.deleteMany({
      where: {
        userId: userId,
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