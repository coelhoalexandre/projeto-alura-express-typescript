import HttpStatusCode from "../enum/HttpStatusCode";

export class ManipulaErros extends Error {
  readonly statusCode: HttpStatusCode;
  constructor(message: string, statusCode: HttpStatusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class RequisicaoRuim extends ManipulaErros {
  constructor(message: string) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}

export class NaoEncontrado extends ManipulaErros {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}
