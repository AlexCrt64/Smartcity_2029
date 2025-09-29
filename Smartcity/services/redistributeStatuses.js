const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function redistributeStatuses() {
  try {
    const projects = await prisma.project.findMany();
    console.log(`Updating statuses for ${projects.length} projects...`);
    
    const statuses = ['VOTE_EN_COURS', 'PROPOSAL', 'APPROUVE', 'EN_TRAVAUX', 'TERMINE'];
    const statusWeights = [0.35, 0.15, 0.20, 0.25, 0.05]; // 35% voting, 15% proposal, 20% approved, 25% in progress, 5% completed
    
    let updateCount = 0;
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      let newStatus;
      
      const random = Math.random();
      let cumulative = 0;
      for (let j = 0; j < statuses.length; j++) {
        cumulative += statusWeights[j];
        if (random < cumulative) {
          newStatus = statuses[j];
          break;
        }
      }
      
      // Update if status is different
      if (project.status !== newStatus) {
        await prisma.project.update({
          where: { id: project.id },
          data: { status: newStatus }
        });
        updateCount++;
      }
    }
    
    console.log(`Updated ${updateCount} project statuses`);
    
    // Show new distribution
    const updatedProjects = await prisma.project.findMany({
      select: { status: true }
    });
    
    const statusCounts = {};
    updatedProjects.forEach(p => {
      statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
    });
    
    console.log('\nNew status distribution:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      const percentage = ((count / updatedProjects.length) * 100).toFixed(1);
      console.log(`  ${status}: ${count} projects (${percentage}%)`);
    });
    
  } catch (error) {
    console.error('Error redistributing statuses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

redistributeStatuses();