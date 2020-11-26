import { Table, Model, Column, ForeignKey, DataType, AllowNull } from "sequelize-typescript";
import { Product } from "./Product";
import { User } from "./User";

// Model de oferta (Tabela pivô)
@Table
export class Offer extends Model {

    @AllowNull(false)   // Usuário que fez a oferta
    @ForeignKey(() => User)
    @Column({type: DataType.BIGINT})
    userId!: number;

    @AllowNull(false)   // Produto que recebeu a oferta
    @ForeignKey(() => Product)
    @Column({type: DataType.BIGINT})
    productId!: number;

    @AllowNull(false)   // Valor da oferta
    @Column({type: DataType.FLOAT})
    value!: number;
}