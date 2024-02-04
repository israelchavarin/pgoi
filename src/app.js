import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import opportunityRoutes from "./routes/opportunities.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", opportunityRoutes);

export default app;
