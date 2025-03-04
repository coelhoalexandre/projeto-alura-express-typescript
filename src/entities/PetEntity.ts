import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Especie from "../enum/Especie";
import AdotanteEntity from "./AdotanteEntity";
import Porte from "../enum/Porte";
import AbrigoEntity from "./AbrigoEntity";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  especie: Especie;
  @Column({ nullable: true })
  porte?: Porte;
  @Column()
  dataDeNascimento: Date;
  @Column()
  adotado: boolean;
  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
  adotante!: AdotanteEntity;
  @ManyToOne(() => AbrigoEntity, (abrigo) => abrigo.pets)
  abrigo!: AbrigoEntity;

  constructor(
    nome: string,
    especie: Especie,
    dataDeNascimento: Date,
    adotado: boolean,
    porte?: Porte
  ) {
    this.nome = nome;
    this.especie = especie;
    this.porte = porte;
    this.dataDeNascimento = dataDeNascimento;
    this.adotado = adotado;
  }
}
