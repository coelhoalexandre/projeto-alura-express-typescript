import express, { RequestHandler } from "express";
import { AppDataSource } from "../config/dataSource";
import AbrigoController from "../controller/AbrigoController";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { middlewareValidadorBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";
import middlewareVerificaId from "../middleware/verificaId";
const router = express.Router();
const abrigoRepository = new AbrigoRepository(
  AppDataSource.getRepository("AbrigoEntity")
);
const abrigoController = new AbrigoController(abrigoRepository);

const validateAbrigoBody: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyAbrigo(req, res, next);

const validateEnderecoBody: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyEndereco(req, res, next);

router.post("/", validateAbrigoBody, (req, res) =>
  abrigoController.criaAbrigo(req, res)
);

router.get("/", (req, res) => abrigoController.listaAbrigos(req, res));

router.put("/:id", middlewareVerificaId, (req, res) =>
  abrigoController.atualizaAbrigo(req, res)
);

router.delete("/:id", middlewareVerificaId, (req, res) =>
  abrigoController.deletaAbrigo(req, res)
);

router.patch("/:id", middlewareVerificaId, validateEnderecoBody, (req, res) =>
  abrigoController.atualizaEnderecoAbrigo(req, res)
);

export default router;
