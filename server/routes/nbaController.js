import axios from 'axios';
import Player from '../models/Player.js';

// Dados mockados para teste
const mockGames = [
  {
    id: 1,
    home: "Lakers",
    away: "Warriors",
    score: "112-108"
  }
];

export const getLiveGames = async (req, res) => {
  try {
    // Implementação real com API externa (ex: SportsDataIO)
    // const response = await axios.get(`${process.env.API_URL}/games`);
    // res.json(response.data);

    // Temporário: retorna mock data
    res.json({ games: mockGames, source: "mock" });
  } catch (error) {
    res.status(503).json({ 
      games: mockGames,
      message: "Usando dados mockados - API offline"
    });
  }
};

export const getPlayerStats = async (req, res) => {
  const { id } = req.params;
  const player = await Player.findOne({ playerId: id });
  res.json(player || { error: "Jogador não encontrado" });
};