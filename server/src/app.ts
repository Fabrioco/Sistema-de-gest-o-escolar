import express from "express";
import indexRoutes from "./modules/index.routes";

export const app = express();

app.use(express.json());
app.use(indexRoutes);
