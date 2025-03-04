import PetEntity from "../entities/PetEntity";

export type RequestBodyPet = Omit<PetEntity, "id">;
export type RequestParamsPet = {
  id?: string;
  pet_id?: string;
  adotante_id?: string;
};

type PickedPetFields = Pick<PetEntity, "id" | "nome" | "porte" | "especie">;
export type ResponseBodyPet = {
  dados?: PickedPetFields | PickedPetFields[];
};
