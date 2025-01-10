export default async function handler(req, res) {
    const targetUrl = `https://api.langflow.astra.datastax.com${req.url.replace('/api', '')}`;
  
    try {
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          ...req.headers,
          'Content-Type': 'application/json',
          // Add any additional headers if required
        },
        body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
      });
  
      // Forward the response back to the client
      res.status(response.status).send(await response.text());
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Proxy error', details: error.message });
    }
  }
  