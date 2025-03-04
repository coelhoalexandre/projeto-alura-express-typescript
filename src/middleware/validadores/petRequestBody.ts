import * as yup from "yup";
import { RequestBodyPet } from "../../types/PetTypes";
import { NextFunction, Request, Response } from "express";
import { pt } from "yup-locale-pt";
import Especie from "../../enum/Especie";
import Porte from "../../enum/Porte";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt);

const esquemaBodyPet: yup.ObjectSchema<
  Omit<RequestBodyPet, "adotante" | "abrigo">
> = yup.object({
  nome: yup.string().defined().required(),
  especie: yup.string().oneOf(Object.values(Especie)).defined().required(),
  porte: yup.string().oneOf(Object.values(Porte)).defined().required(),
  dataDeNascimento: yup.date().defined().required(),
  adotado: yup.boolean().defined().required(),
});

const middlewareValidadorBodyPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  tratarErroValidacaoYup(esquemaBodyPet, req, res, next);
};

export { middlewareValidadorBodyPet };
