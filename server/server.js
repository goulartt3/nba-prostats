import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import logger from './utils/logger.js';
import nbaRoutes from './routes/nbaRoutes.js';

// Configuração do Express
const app = express();

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('📦 MongoDB conectado'))
  .catch(err => logger.error('Erro MongoDB:', err));

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded by IP: ${req.ip}`);
    res.status(429).json({
      error: "Muitas requisições",
      message: "Tente novamente em 15 minutos"
    });
  }
});
app.use('/api/', limiter);

// Rotas
app.use('/api', nbaRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Inicialização
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🏀 Servidor rodando na porta ${PORT}`);
  import('./services/dataUpdater.js').then(module => {
    module.startDataUpdates();
  });
});

export default app;