class NBADataService {
  static async getLiveGames() {
    try {
      const response = await fetch('/api/schedule');
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch games:', error);
      return this.getCachedData('games');
    }
  }

  static async getCachedData(key) {
    const cache = localStorage.getItem(`nbaCache_${key}`);
    return cache ? JSON.parse(cache) : null;
  }
}

// Exemplo de uso
document.addEventListener('DOMContentLoaded', async () => {
  const games = await NBADataService.getLiveGames();
  if (games) {
    renderGames(games);
    localStorage.setItem('nbaCache_games', JSON.stringify(games));
  }
});