import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";

import {
  RequestBodyAdotante,
  RequestParamsAdotante,
  ResponseBodyAdotante,
} from "../types/AdotanteTypes";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}
  async criaAdotante(
    req: Request<RequestParamsAdotante, {}, RequestBodyAdotante>,
    res: Response<ResponseBodyAdotante>
  ) {
    const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );

    await this.repository.criaAdotante(novoAdotante);
    return res
      .status(201)
      .json({ dados: { id: novoAdotante.id, nome, celular, endereco } });
  }
  async atualizaAdotante(
    req: Request<RequestParamsAdotante, {}, RequestBodyAdotante>,
    res: Response<ResponseBodyAdotante>
  ) {
    const { id } = req.params;
    await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );

    return res.sendStatus(204);
  }

  async listaAdotantes(
    req: Request<RequestParamsAdotante, {}, RequestBodyAdotante>,
    res: Response<ResponseBodyAdotante>
  ) {
    const listaDeAdotantes = await this.repository.listaAdotantes();
    const dados = listaDeAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        endereco: adotante.endereco !== null ? adotante.endereco : undefined,
      };
    });
    return res.json({ dados });
  }

  async deletaAdotante(
    req: Request<RequestParamsAdotante, {}, RequestBodyAdotante>,
    res: Response<ResponseBodyAdotante>
  ) {
    const { id } = req.params;

    await this.repository.deletaAdotante(Number(id));

    return res.sendStatus(204);
  }

  async atualizaEnderecoAdotante(
    req: Request<RequestParamsAdotante, {}, EnderecoEntity>,
    res: Response<ResponseBodyAdotante>
  ) {
    const { id } = req.params;

    await this.repository.atualizaEnderecoAdotante(Number(id), req.body);

    return res.sendStatus(204);
  }
}
