import AdotanteEntity from "../entities/AdotanteEntity";

export type RequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;
export type RequestParamsAdotante = { id?: string };
type PickedAdotanteFields = Pick<
  AdotanteEntity,
  "id" | "nome" | "celular" | "endereco"
>;
export type ResponseBodyAdotante = {
  dados?: PickedAdotanteFields | PickedAdotanteFields[];
};
