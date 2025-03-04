import { NextFunction, Request, Response } from "express";
import { ManipulaErros } from "../utils/ManipulaErros";
import HttpStatusCode from "../enum/HttpStatusCode";

const middlewareError = (
  erro: ManipulaErros,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = erro.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
  const mensagem = erro.statusCode ? erro.message : "Erro interno do servidor";

  res.status(statusCode).json({ mensagem });
  return next();
};

export default middlewareError;
