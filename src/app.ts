import "reflect-metadata";
import "express-async-errors";
import express from "express";
import router from "./routes";
import { AppDataSource } from "./config/dataSource";
import middlewareError from "./middleware/erro";

const app = express();
app.use(express.json());
router(app);
app.use(middlewareError);

AppDataSource.initialize()
  .then(() => console.log("Banco de dados conectado"))
  .catch((erro) => console.error(erro));

export default app;
