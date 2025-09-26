const { syncBordeauxProjects } = require('./syncBordeaux');

// Simple scheduler for data sync
class SyncScheduler {
  constructor(intervalHours = 24) {
    this.intervalMs = intervalHours * 60 * 60 * 1000; // Convert hours to milliseconds
    this.isRunning = false;
    this.intervalId = null;
  }

  start() {
    if (this.isRunning) {
      console.log('⚠️  Sync scheduler is already running');
      return;
    }

    console.log(`🕒 Starting sync scheduler (every ${this.intervalMs / (60 * 60 * 1000)} hours)`);
    
    // Run initial sync
    this.runSync();
    
    // Schedule periodic syncs
    this.intervalId = setInterval(() => {
      this.runSync();
    }, this.intervalMs);
    
    this.isRunning = true;
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('⏹️  Sync scheduler stopped');
  }

  async runSync() {
    const startTime = new Date();
    console.log(`\n🔄 [${startTime.toLocaleString()}] Running scheduled Bordeaux data sync...`);
    
    try {
      const result = await syncBordeauxProjects();
      
      if (result.success) {
        console.log(`✅ Scheduled sync completed successfully`);
        console.log(`   • ${result.synced} projects synced`);
        console.log(`   • ${result.total} total projects in database`);
      } else {
        console.error(`❌ Scheduled sync failed: ${result.error}`);
      }
    } catch (error) {
      console.error(`❌ Scheduled sync error:`, error);
    }
    
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 1000);
    console.log(`⏱️  Sync duration: ${duration}s\n`);
  }
}

// For use in your app startup
const scheduler = new SyncScheduler(24); // Sync every 24 hours

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down sync scheduler...');
  scheduler.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down sync scheduler...');
  scheduler.stop();
  process.exit(0);
});

module.exports = { SyncScheduler, scheduler };