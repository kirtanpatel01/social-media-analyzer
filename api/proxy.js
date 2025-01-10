export default async function handler(req, res) {
    console.log("Incoming request:", req.method, req.url, req.body);
  
    const targetUrl = `https://api.langflow.astra.datastax.com${req.url.replace('/api', '')}`;
  
    try {
      console.log("Incoming request body (proxy):", req.body);
      console.log("Request Body Before Sending:", JSON.stringify(req.body, null, 2));
  
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          ...req.headers,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(req.body),
      });
  
      const responseBody = await response.text();
      console.log("Proxy response:", response.status, responseBody);
  
      res.status(response.status).send(responseBody);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Proxy error", details: error.message });
    }
  }
  