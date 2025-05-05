const app = require('../server');

exports.handler = async (event, context) => {
  // Simula o objeto req do Express
  const req = {
    method: event.httpMethod,
    path: event.path,
    headers: event.headers,
    query: event.queryStringParameters,
    body: event.body
  };

  // Simula o objeto res do Express
  const res = {
    status: (code) => ({
      json: (data) => ({
        statusCode: code,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    })
  };

  try {
    // Roteia manualmente
    if (req.path === '/api/games/live') {
      return await app._router.handle(req, res);
    } else if (req.path === '/health') {
      return res.status(200).json({ status: 'ok' });
    }
    
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Rota não encontrada" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};