import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import opportunityRoutes from "./routes/opportunities.routes.js";
import usersRoutes from "./routes/users.routes.js";
import cors from "cors";

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

// routers
app.use("/api", authRoutes);
app.use("/api", opportunityRoutes);
app.use("/api", usersRoutes);

export default app;
