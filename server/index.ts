import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { enquiriesRouter } from './routes/enquiries';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

// Basic Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[${new Date().toLocaleTimeString('en-IN')}] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'RealTech Backend API',
    location: 'Puducherry, India',
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

// Enquiries API routes
app.use('/api/enquiries', enquiriesRouter);

// Serve Static Frontend if built (e.g. in Production)
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    const indexPath = path.join(distPath, 'index.html');
    return res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(200).send(`RealTech API Server running. Build frontend with 'npm run build' to serve UI.`);
      }
    });
  }
  next();
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred.',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  RealTech Backend API Running`);
  console.log(`  Port:        http://localhost:${PORT}`);
  console.log(`  API Health:  http://localhost:${PORT}/api/health`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  Location:    Puducherry, India`);
  console.log(`====================================================`);
});
