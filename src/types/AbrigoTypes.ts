import AbrigoEntity from "../entities/AbrigoEntity";

export type RequestBodyAbrigo = Omit<AbrigoEntity, "id" | "pets">;

type PickedAbrigoFields = Pick<
  AbrigoEntity,
  "id" | "nome" | "email" | "celular" | "endereco"
>;

export type ResponseBodyAbrigo = {
  dados?: PickedAbrigoFields | PickedAbrigoFields[];
};

export type RequestParamsAbrigo = {
  id?: string;
};
