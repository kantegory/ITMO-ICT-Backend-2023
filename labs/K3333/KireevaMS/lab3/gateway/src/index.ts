import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use("/users", createProxyMiddleware({ target: "http://localhost:8001", changeOrigin: true }));

app.use("/exchange", createProxyMiddleware({ target: "http://localhost:8002", changeOrigin: true }));

app.listen(8000, () => {
    console.log("Gateway server is running on port 8000");
});






