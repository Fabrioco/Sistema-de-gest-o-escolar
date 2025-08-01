import express from "express";
import indexRoutes from "./modules/index.routes";
import { Middleware } from "./commons/middlewares";

export const app = express();

app.use(express.json());
app.use(indexRoutes);

app.use(Middleware.errorZod)
app.use(Middleware.errorApp)