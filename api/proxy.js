export default async function handler(req, res) {
    console.log("Incoming request:", req.method, req.url, req.body);
  
    const targetUrl = `https://api.langflow.astra.datastax.com${req.url.replace('/api', '')}`;
  
    try {
      const isPostOrPut = req.method === 'POST' || req.method === 'PUT';
      console.log("Incoming request body (proxy):", req.body);

      const body = isPostOrPut ? (typeof req.body === 'object' ? JSON.stringify(req.body) : req.body) : undefined;
      console.log("Request Body Before Sending:", JSON.stringify(body, null, 2));
  
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          ...req.headers,
          'Content-Type': 'application/json',
        },
        body,
      });
  
      const responseBody = await response.text();
      console.log("Proxy response:", response.status, responseBody);
  
      res.status(response.status).send(responseBody);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Proxy error", details: error.message });
    }
  }
  