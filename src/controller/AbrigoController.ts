import { Request, Response } from "express";
import AbrigoEntity from "../entities/AbrigoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";
import {
  RequestBodyAbrigo,
  RequestParamsAbrigo,
  ResponseBodyAbrigo,
} from "../types/AbrigoTypes";
import EnderecoEntity from "../entities/EnderecoEntity";
import HttpStatusCode from "../enum/HttpStatusCode";

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {}
  async criaAbrigo(
    req: Request<RequestParamsAbrigo, {}, RequestBodyAbrigo>,
    res: Response<ResponseBodyAbrigo>
  ) {
    const { nome, celular, email, senha, endereco } = req.body;
    const novoAbrigo = new AbrigoEntity(nome, celular, email, senha, endereco);

    const teste = await this.repository.criaAbrigo(novoAbrigo);

    return res
      .status(201)
      .json({ dados: { id: novoAbrigo.id, nome, celular, email, endereco } });
  }

  async listaAbrigos(
    _: Request<RequestParamsAbrigo, {}, RequestBodyAbrigo>,
    res: Response<ResponseBodyAbrigo>
  ) {
    const listaDeAbrigos = await this.repository.listaAbrigos();
    const dados = listaDeAbrigos.map((abrigo) => {
      return {
        id: abrigo.id,
        nome: abrigo.nome,
        celular: abrigo.celular,
        email: abrigo.email,
        endereco: abrigo.endereco !== null ? abrigo.endereco : undefined,
      };
    });
    return res.status(HttpStatusCode.OK).json({ dados });
  }

  async atualizaAbrigo(
    req: Request<RequestParamsAbrigo, {}, RequestBodyAbrigo>,
    res: Response<ResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.atualizaAbrigo(Number(id), req.body as AbrigoEntity);

    return res.sendStatus(HttpStatusCode.NO_CONTENT);
  }

  async deletaAbrigo(
    req: Request<RequestParamsAbrigo, {}, RequestBodyAbrigo>,
    res: Response<ResponseBodyAbrigo>
  ) {
    const { id } = req.params;

    await this.repository.deletaAbrigo(Number(id));

    return res.sendStatus(HttpStatusCode.NO_CONTENT);
  }

  async atualizaEnderecoAbrigo(
    req: Request<RequestParamsAbrigo, {}, EnderecoEntity>,
    res: Response<ResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.atualizaEnderecoAbrigo(Number(id), req.body);
    return res.sendStatus(HttpStatusCode.OK);
  }
}
