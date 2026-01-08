import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import chainRoutes from './routes/chainRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        CORS_ORIGIN,
        /\.vercel\.app$/  // 모든 Vercel 도메인 허용
      ]
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check route
app.get('/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'HEMP 2.0 API Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/chains', chainRoutes);

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🚀 HEMP 2.0 Backend Server Started    ║
╠═══════════════════════════════════════════╣
║   Port:        ${PORT}                       ║
║   Environment: ${process.env.NODE_ENV || 'development'}         ║
║   CORS Origin: ${CORS_ORIGIN}  ║
╚═══════════════════════════════════════════╝
  `);
});

export default app;
