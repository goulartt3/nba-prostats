export async function updateGames() {
  try {
    const date = new Date().toISOString().split('T')[0];
    const url = `${BASE_URL}/games/${date}/schedule.json?api_key=${API_KEY}`;
    
    // Validação da URL
    if (!url.includes('https://api.sportradar.com')) {
      throw new Error('URL da API inválida');
    }

    const { data } = await axios.get(url);
    await updateCache('games', data);
    console.log('✅ Dados atualizados:', data.games?.length || 0, 'jogos');
    
  } catch (error) {
    console.error('❌ Falha crítica:', error.message);
    console.log('🔄 Usando dados mockados como fallback');
    await updateCache('games', mockGames); // Garante cache mesmo com falha
  }
}