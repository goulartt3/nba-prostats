export const transformSchedule = (data) => {
  if (!data?.games) return [];
  
  return data.games.map(game => ({
    id: game.id,
    status: game.status,
    home: {
      name: game.home.name,
      alias: game.home.alias,
      score: game.home_points || 0
    },
    away: {
      name: game.away.name,
      alias: game.away.alias,
      score: game.away_points || 0
    },
    scheduled: game.scheduled,
    venue: game.venue?.name
  }));
};

export const transformStandings = (data) => {
  if (!data?.standings) return [];
  
  return data.standings.map(team => ({
    rank: team.rank,
    name: `${team.market} ${team.name}`,
    wins: team.wins,
    losses: team.losses,
    win_pct: team.win_pct
  }));
};