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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, location, latitude, longitude, submittedBy, status } = body;

    // Validate required fields
    if (!title || !description || !category || !location || !latitude || !longitude) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Creating project with:', { title, category, status: 'VOTE_EN_COURS' });

    // Create the new project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        category,
        location,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        status: 'VOTE_EN_COURS', // Skip PROPOSAL phase, go straight to voting
        // Set voting period for all new projects
        votingStart: new Date(),
        votingEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    console.log('Project created successfully:', project.id);

    return Response.json({
      success: true,
      project,
      message: 'Project created successfully',
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}