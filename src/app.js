import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// middlewares
app.use(express.json());

app.use("/api", authRoutes);

export default app;
