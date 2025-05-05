import axios from 'axios';
import { updateCache, getCachedData } from '../models/Cache.js';
import { mockGames } from '../utils/mockData.js';
import logger from '../utils/logger.js';

const validateApiKey = (apiKey) => {
  if (!apiKey || apiKey.length !== 32) {
    logger.error('❌ API Key inválida');
    throw new Error('Chave API inválida ou ausente');
  }
};

export const getGamesFromAPI = async () => {
  const API_KEY = process.env.SPORTSRADAR_API_KEY;
  const BASE_URL = process.env.SPORTSRADAR_BASE_URL;

  try {
    validateApiKey(API_KEY);
    const date = new Date().toISOString().split('T')[0];
    
    // Novo formato de endpoint testado
    const url = `${BASE_URL}/games/${date}/schedule.json?api_key=${API_KEY}`;
    logger.debug(`🔗 Tentando endpoint: ${url}`);

    const { data } = await axios.get(url, { 
      timeout: 5000,
      validateStatus: (status) => status < 500
    });

    if (!data.games) throw new Error('Formato de dados inválido');
    
    await updateCache('games', data);
    return data;

  } catch (error) {
    logger.error('⚠️ Falha na API:', {
      error: error.message,
      suggestion: 'Verifique sua chave API em https://developer.sportradar.com/'
    });

    const cached = await getCachedData('games', 1440); // 24h de cache
    return cached || { 
      ...mockGames,
      _warning: "Dados mockados - API indisponível"
    };
  }
};