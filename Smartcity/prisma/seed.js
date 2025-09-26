const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SmartCity civic engagement database...');

  // Clear existing data
  await prisma.vote.deleteMany();
  await prisma.ideaSubmission.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const citizen1 = await prisma.user.create({
    data: {
      email: 'marie.dubois@bordeaux.fr',
      name: 'Marie Dubois',
      userType: 'CITIZEN'
    }
  });

  const citizen2 = await prisma.user.create({
    data: {
      email: 'pierre.martin@bordeaux.fr',
      name: 'Pierre Martin',
      userType: 'CITIZEN'
    }
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@mairie-bordeaux.fr',
      name: 'Jean-Pierre Mairie',
      userType: 'ADMIN'
    }
  });

  console.log('✅ Created demo users');

  // Create demo projects for Bordeaux
  const parcGambetta = await prisma.project.create({
    data: {
      title: 'Nouveau parc urbain Gambetta',
      description: 'Création d\'un parc de 2 hectares avec aires de jeux, espaces verts et parcours sportif au cœur du quartier Gambetta.',
      category: 'ESPACES_VERTS',
      latitude: 44.8378,
      longitude: -0.5792,
      location: 'Place Gambetta, Bordeaux',
      status: 'VOTE_EN_COURS',
      budget: 500000,
      votingStart: new Date('2024-09-01'),
      votingEnd: new Date('2024-10-15')
    }
  });

  const pisteCyclable = await prisma.project.create({
    data: {
      title: 'Piste cyclable Cours Victor Hugo',
      description: 'Aménagement d\'une piste cyclable sécurisée le long du Cours Victor Hugo pour améliorer la mobilité douce en centre-ville.',
      category: 'TRANSPORT',
      latitude: 44.8404,
      longitude: -0.5805,
      location: 'Cours Victor Hugo, Bordeaux',
      status: 'APPROUVE',
      budget: 200000
    }
  });

  const mediatheque = await prisma.project.create({
    data: {
      title: 'Rénovation médiathèque Bastide',
      description: 'Modernisation de la médiathèque de la Bastide avec espaces de coworking et salles numériques.',
      category: 'EQUIPEMENTS_PUBLICS',
      latitude: 44.8326,
      longitude: -0.5496,
      location: 'Rue de la Bastide, Bordeaux',
      status: 'EN_TRAVAUX',
      budget: 800000
    }
  });

  const ecoquartier = await prisma.project.create({
    data: {
      title: 'Écoquartier Brazza Phase 2',
      description: 'Extension de l\'écoquartier Brazza avec 200 nouveaux logements écologiques.',
      category: 'LOGEMENT',
      latitude: 44.8445,
      longitude: -0.5234,
      location: 'Quartier Brazza, Bordeaux',
      status: 'PROPOSAL',
      budget: 15000000,
      votingStart: new Date('2024-10-01'),
      votingEnd: new Date('2024-11-15')
    }
  });

  console.log('✅ Created demo civic projects');

  // Add votes to demonstrate the voting system
  await prisma.vote.createMany({
    data: [
      { userId: citizen1.id, projectId: parcGambetta.id, voteType: 'UPVOTE' },
      { userId: citizen2.id, projectId: parcGambetta.id, voteType: 'UPVOTE' },
      { userId: citizen1.id, projectId: pisteCyclable.id, voteType: 'UPVOTE' },
      { userId: citizen2.id, projectId: ecoquartier.id, voteType: 'DOWNVOTE' },
    ]
  });

  console.log('✅ Added demo votes');

  // Create a citizen idea submission
  await prisma.ideaSubmission.create({
    data: {
      userId: citizen1.id,
      title: 'Fontaine interactive Place Pey Berland',
      description: 'Installation d\'une fontaine interactive et ludique sur la Place Pey Berland pour les enfants et familles.',
      category: 'AMENAGEMENT_URBAIN',
      latitude: 44.8378,
      longitude: -0.5792,
      location: 'Place Pey Berland, Bordeaux',
      status: 'UNDER_REVIEW'
    }
  });

  console.log('✅ Created demo idea submission');

  console.log('\n🎉 SmartCity database seeded successfully!');
  console.log('📊 Summary:');
  console.log(`   • ${await prisma.user.count()} users created`);
  console.log(`   • ${await prisma.project.count()} civic projects created`);
  console.log(`   • ${await prisma.vote.count()} votes cast`);
  console.log(`   • ${await prisma.ideaSubmission.count()} citizen idea submitted`);
  console.log('\n🌐 Ready for your civic engagement demo on September 29th!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });