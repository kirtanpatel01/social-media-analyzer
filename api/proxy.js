export default async function handler(req, res) {
    const { method, body, headers, query } = req;
  
    const targetUrl = `https://api.langflow.astra.datastax.com${req.url.replace(
      '/api',
      ''
    )}`;
  
    try {
      const response = await fetch(targetUrl, {
        method,
        headers: {
          'Content-Type': headers['content-type'] || 'application/json',
          Authorization: headers['authorization'] || '',
        },
        body: method === 'POST' ? JSON.stringify(body) : undefined,
      });
  
      const data = await response.text();
      res.status(response.status).send(data);
    } catch (error) {
      console.error('Error forwarding request:', error);
      res.status(500).send({ error: 'Proxy error', details: error.message });
    }
  }
  