const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SmartCity community engagement database...');

  // Clear existing data
  await prisma.vote.deleteMany();
  await prisma.ideaSubmission.deleteMany();
  await prisma.project.deleteMany();

  console.log('✅ Cleared existing data');

  // Create demo projects for Bordeaux (no user authentication needed)
  const parcGambetta = await prisma.project.create({
    data: {
      title: 'Nouveau parc urbain Gambetta',
      description: 'Création d\'un parc de 2 hectares avec aires de jeux, espaces verts et parcours sportif au cœur du quartier Gambetta.',
      category: 'ESPACES_VERTS',
      latitude: 44.8378,
      longitude: -0.5792,
      location: 'Place Gambetta, Bordeaux',
      status: 'VOTE_EN_COURS',
      submittedBy: 'CITY',
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
      submittedBy: 'CITIZEN',
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
      submittedBy: 'CITY',
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
      submittedBy: 'CITY',
      budget: 15000000,
      votingStart: new Date('2024-10-01'),
      votingEnd: new Date('2024-11-15')
    }
  });

  const placeSaintPierre = await prisma.project.create({
    data: {
      title: 'Réaménagement Place Saint-Pierre',
      description: 'Piétonnisation et verdissement de la Place Saint-Pierre avec espaces de convivialité et terrasses.',
      category: 'AMENAGEMENT_URBAIN',
      latitude: 44.8415,
      longitude: -0.5730,
      location: 'Place Saint-Pierre, Bordeaux',
      status: 'VOTE_EN_COURS',
      submittedBy: 'CITIZEN',
      budget: 750000,
      votingStart: new Date('2024-09-15'),
      votingEnd: new Date('2024-11-01')
    }
  });

  console.log('✅ Created demo community projects');

  // Add demo votes to demonstrate the voting system (no user authentication)
  await prisma.vote.createMany({
    data: [
      { projectId: parcGambetta.id, voteType: 'UPVOTE', sessionId: 'demo_session_1' },
      { projectId: parcGambetta.id, voteType: 'UPVOTE', sessionId: 'demo_session_2' },
      { projectId: parcGambetta.id, voteType: 'UPVOTE', sessionId: 'demo_session_3' },
      { projectId: parcGambetta.id, voteType: 'DOWNVOTE', sessionId: 'demo_session_4' },
      { projectId: pisteCyclable.id, voteType: 'UPVOTE', sessionId: 'demo_session_1' },
      { projectId: pisteCyclable.id, voteType: 'UPVOTE', sessionId: 'demo_session_5' },
      { projectId: ecoquartier.id, voteType: 'DOWNVOTE', sessionId: 'demo_session_2' },
      { projectId: ecoquartier.id, voteType: 'UPVOTE', sessionId: 'demo_session_6' },
      { projectId: placeSaintPierre.id, voteType: 'UPVOTE', sessionId: 'demo_session_1' },
      { projectId: placeSaintPierre.id, voteType: 'UPVOTE', sessionId: 'demo_session_7' },
      { projectId: placeSaintPierre.id, voteType: 'UPVOTE', sessionId: 'demo_session_8' },
    ]
  });

  console.log('✅ Added demo votes');

  // Create demo citizen idea submissions (no user authentication)
  await prisma.ideaSubmission.createMany({
    data: [
      {
        title: 'Fontaine interactive Place Pey Berland',
        description: 'Installation d\'une fontaine interactive et ludique sur la Place Pey Berland pour les enfants et familles.',
        category: 'AMENAGEMENT_URBAIN',
        latitude: 44.8378,
        longitude: -0.5792,
        location: 'Place Pey Berland, Bordeaux',
        status: 'UNDER_REVIEW',
        submitterName: 'Marie D.'
      },
      {
        title: 'Jardin partagé Chartrons',
        description: 'Création d\'un jardin partagé dans le quartier des Chartrons pour favoriser le lien social et l\'agriculture urbaine.',
        category: 'ESPACES_VERTS',
        latitude: 44.8521,
        longitude: -0.5654,
        location: 'Quartier des Chartrons, Bordeaux',
        status: 'SUBMITTED',
        submitterName: 'Pierre M.'
      },
      {
        title: 'Station Vcub supplémentaire Stalingrad',
        description: 'Installation d\'une nouvelle station Vcub près de la place Stalingrad pour améliorer la desserte vélo.',
        category: 'TRANSPORT',
        latitude: 44.8307,
        longitude: -0.5664,
        location: 'Place Stalingrad, Bordeaux',
        status: 'APPROVED',
        submitterName: 'Julie L.'
      }
    ]
  });

  console.log('✅ Created demo idea submissions');

  console.log('\n🎉 SmartCity database seeded successfully!');
  console.log('📊 Summary:');
  console.log(`   • ${await prisma.project.count()} community projects created`);
  console.log(`   • ${await prisma.vote.count()} demo votes cast`);
  console.log(`   • ${await prisma.ideaSubmission.count()} citizen ideas submitted`);
  console.log('\n🌐 Ready for your community engagement demo - no authentication required!');
  console.log('🎭 Just press login and start voting on community projects!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });