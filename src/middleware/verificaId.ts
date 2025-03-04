import { NextFunction, Request, Response } from "express";
import { RequisicaoRuim } from "../utils/ManipulaErros";

const middlewareVerificaId = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const params = req.params;

  for (const param in params) {
    if (!Number.isInteger(Number(params[param])))
      throw new RequisicaoRuim(
        `O parametro ${param} deve ser um número inteiro`
      );
  }
};

export default middlewareVerificaId;
