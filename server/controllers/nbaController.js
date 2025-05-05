import { getGamesFromAPI } from '../services/apiService.js';
import { getCachedData } from '../models/Cache.js';
import logger from '../utils/logger.js';

export const getGames = async (req, res) => {
  try {
    const data = await getGamesFromAPI();
    res.json(data);
  } catch (error) {
    logger.error('Erro ao buscar jogos:', error);
    res.status(503).json({
      error: "Serviço temporariamente indisponível",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getStandings = async (req, res) => {
  // Implementação similar
};