import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
    target: 'https://api.langflow.astra.datastax.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Remove '/api' prefix
    },
});
