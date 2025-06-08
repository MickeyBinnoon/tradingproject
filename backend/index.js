require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const prisma = require('./lib/prisma');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Database connection test endpoint
app.get('/db-test', async (req, res) => {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Try to count users (this will also test if the table exists)
    const userCount = await prisma.user.count();
    
    res.json({ 
      status: 'success',
      message: 'Database connection successful',
      userCount: userCount
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Example users endpoints
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        email: true,
        createdAt: true,
        lastLoginAt: true,
        plan: true,
        demoBalance: true,
        alpacaBalance: true
      }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        username: true,
        email: true,
        createdAt: true,
        lastLoginAt: true,
        plan: true,
        demoBalance: true,
        alpacaBalance: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Database test: http://localhost:${PORT}/db-test`);
}); 