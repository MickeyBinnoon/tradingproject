const { PrismaClient } = require('@prisma/client');

// Create a single instance of PrismaClient to be reused across the application
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Enable logging for development
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma; 