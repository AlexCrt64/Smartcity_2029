import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 50;

    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    const projects = await prisma.project.findMany({
      where,
      include: {
        votes: true,
        _count: {
          select: {
            votes: true
          }
        }
      },
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Add vote counts and user voting info
    const projectsWithVoteCounts = projects.map((project: any) => {
      const upvotes = project.votes.filter((v: any) => v.voteType === 'UPVOTE').length;
      const downvotes = project.votes.filter((v: any) => v.voteType === 'DOWNVOTE').length;

      return {
        ...project,
        voteCount: {
          up: upvotes,
          down: downvotes,
          total: upvotes + downvotes,
          score: upvotes - downvotes
        },
        // Don't expose individual vote details for privacy
        votes: undefined
      };
    });

    return Response.json({
      success: true,
      projects: projectsWithVoteCounts,
      count: projectsWithVoteCounts.length
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}