import { getGamesFromAPI } from './apiService.js';
import logger from '../utils/logger.js';

const UPDATE_INTERVAL = parseInt(process.env.UPDATE_INTERVAL) || 300000;

export async function updateGames() {
  try {
    await getGamesFromAPI();
    logger.info('✅ Dados atualizados com sucesso');
  } catch (error) {
    logger.error('❌ Falha na atualização:', error);
  }
}

export function startDataUpdates() {
  updateGames();
  setInterval(updateGames, UPDATE_INTERVAL);
  logger.info(`⏲ Atualizando dados a cada ${UPDATE_INTERVAL/60000} minutos`);
}

export default { startDataUpdates, updateGames };