export const mockGames = {
  games: [
    {
      id: "mock1",
      status: "scheduled",
      home: {
        id: "583ec825-fb46-11e1-82cb-f4ce4684ea4c",
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
      scheduled: new Date().toISOString(),
      venue: {
        id: "mock-venue",
        name: "Mock Arena",
        city: "Mock City"
      }
    }
  ],
  _warning: "Dados mockados - API indisponível"
};