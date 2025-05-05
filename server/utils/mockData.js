export const mockGames = {
  games: [
    {
      id: "mock1",
      status: "scheduled",
      scheduled: new Date().toISOString(),
      home: {
        id: "583ecae2-fb46-11e1-82cb-f4ce4684ea4c",
        name: "Los Angeles Lakers",
        alias: "LAL",
        points: 0
      },
      away: {
        id: "583ec825-fb46-11e1-82cb-f4ce4684ea4c",
        name: "Golden State Warriors",
        alias: "GSW",
        points: 0
      },
      venue: {
        id: "mock-venue-1",
        name: "Staples Center",
        city: "Los Angeles"
      }
    }
  ],
  _meta: {
    source: "mock-data",
    generatedAt: new Date().toISOString(),
    cacheStrategy: "fallback"
  }
};