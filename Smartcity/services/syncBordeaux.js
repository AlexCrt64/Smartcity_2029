const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const BORDEAUX_API_ENDPOINTS = {
  plu: 'https://datahub.bordeaux-metropole.fr/api/records/1.0/search/?dataset=plu&rows=100',
  amenagement: 'https://datahub.bordeaux-metropole.fr/api/records/1.0/search/?dataset=projets-amenagement&rows=100',
  equipements: 'https://datahub.bordeaux-metropole.fr/api/records/1.0/search/?dataset=equipements-publics&rows=100'
};

// Map Bordeaux API categories to our schema
function mapCategory(apiCategory) {
  const categoryMap = {
    'logement': 'LOGEMENT',
    'habitat': 'LOGEMENT', 
    'transport': 'TRANSPORT',
    'mobilite': 'TRANSPORT',
    'espaces_verts': 'ESPACES_VERTS',
    'parc': 'ESPACES_VERTS',
    'jardin': 'ESPACES_VERTS',
    'equipement': 'EQUIPEMENTS_PUBLICS',
    'ecole': 'EQUIPEMENTS_PUBLICS',
    'bibliotheque': 'EQUIPEMENTS_PUBLICS',
    'mediatheque': 'EQUIPEMENTS_PUBLICS',
    'amenagement': 'AMENAGEMENT_URBAIN',
    'urbanisme': 'AMENAGEMENT_URBAIN'
  };
  
  const key = apiCategory?.toLowerCase();
  return categoryMap[key] || 'AMENAGEMENT_URBAIN';
}

// Determine project status from API data
function mapStatus(apiData) {
  const status = apiData.status?.toLowerCase();
  const phase = apiData.phase?.toLowerCase();
  
  if (status === 'en_cours' || phase === 'travaux') return 'EN_TRAVAUX';
  if (status === 'termine' || phase === 'termine') return 'TERMINE';
  if (status === 'approuve' || phase === 'approuve') return 'APPROUVE';
  
  // Default new projects to voting phase for civic engagement
  return 'VOTE_EN_COURS';
}

async function syncBordeauxProjects() {
  console.log('🔄 Starting Bordeaux PLU data sync...');
  
  try {
    let totalSynced = 0;
    
    // Sync from different Bordeaux datasets
    for (const [datasetName, endpoint] of Object.entries(BORDEAUX_API_ENDPOINTS)) {
      console.log(`📊 Fetching ${datasetName} data...`);
      
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          console.log(`⚠️  Failed to fetch ${datasetName}: ${response.status}`);
          continue;
        }
        
        const data = await response.json();
        console.log(`📥 Found ${data.records?.length || 0} records in ${datasetName}`);
        
        if (data.records && data.records.length > 0) {
          for (const record of data.records) {
            const fields = record.fields;
            
            // Skip records without essential data
            if (!fields.nom_projet && !fields.nom && !fields.libelle) continue;
            if (!fields.geo_point_2d) continue;
            
            const title = fields.nom_projet || fields.nom || fields.libelle;
            const latitude = fields.geo_point_2d[0];
            const longitude = fields.geo_point_2d[1];
            
            // Create unique identifier for deduplication
            const uniqueKey = `${title.substring(0, 50)}_${latitude.toFixed(4)}_${longitude.toFixed(4)}`;
            
            await prisma.project.upsert({
              where: { 
                // Use a combination of title and location for uniqueness
                id: record.recordid || uniqueKey
              },
              update: {
                description: fields.description || fields.descriptif || `Projet ${mapCategory(fields.type_projet || fields.categorie)} à Bordeaux`,
                status: mapStatus(fields),
                budget: fields.budget ? parseInt(fields.budget.toString().replace(/[^\d]/g, '')) : null,
                // Update voting period for new projects
                votingStart: new Date(),
                votingEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
              },
              create: {
                id: record.recordid || uniqueKey,
                title: title,
                description: fields.description || fields.descriptif || `Projet ${mapCategory(fields.type_projet || fields.categorie)} à Bordeaux`,
                category: mapCategory(fields.type_projet || fields.categorie || datasetName),
                latitude: latitude,
                longitude: longitude,
                location: fields.adresse || fields.localisation || `${fields.commune || 'Bordeaux'}`,
                status: mapStatus(fields),
                budget: fields.budget ? parseInt(fields.budget.toString().replace(/[^\d]/g, '')) : null,
                votingStart: new Date(),
                votingEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
              }
            });
            
            totalSynced++;
          }
        }
      } catch (error) {
        console.error(`❌ Error syncing ${datasetName}:`, error.message);
        continue; // Continue with other datasets
      }
    }
    
    console.log(`✅ Sync completed! ${totalSynced} projects synced from Bordeaux APIs`);
    
    // Log current database state
    const projectCount = await prisma.project.count();
    const voteCount = await prisma.vote.count();
    
    console.log(`📊 Database summary:`);
    console.log(`   • Total projects: ${projectCount}`);
    console.log(`   • Total votes: ${voteCount}`);
    console.log(`   • Sync completed at: ${new Date().toLocaleString()}`);
    
    return { success: true, synced: totalSynced, total: projectCount };
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    return { success: false, error: error.message };
  }
}

// For manual testing
if (require.main === module) {
  syncBordeauxProjects()
    .finally(() => prisma.$disconnect());
}

module.exports = { syncBordeauxProjects };