import { Column, DataType, Table, Model, HasMany, BelongsToMany, AllowNull, HasOne, Unique, BeforeCreate, Default } from 'sequelize-typescript';
import { Address } from './Address';
import { Offer } from './Offer';
import { Product } from './Product';
import bcrypt  from 'bcrypt';

// Model de usuário
@Table
export class User extends Model {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    password!: string;

    @AllowNull(false)
    @Unique
    @Column({type: DataType.STRING})
    email!: string;

    @AllowNull(true)
    @Column({type: DataType.STRING})
    photo!: string;

    @AllowNull(false)
    @Column({type: DataType.DATE})
    date_of_birth!: Date

    @AllowNull(false)
    @Default(false)
    @Column({type: DataType.BOOLEAN})
    is_admin!: boolean  // true se o usuário é admin, false caso contrário

    @BeforeCreate   // Encripta a senha do usuário antes de salavar no bd
    static async hashPassword(user: User){
        try {
            if(user.password){
                user.password = await bcrypt.hash(user.password, 10);
            }
        } catch(err) {
            return err;
        }
    }

    @BeforeCreate   // Garante que usuário não é criado como admin
    static async revokePrivileges(user: User) {
        user.is_admin = false;
    }
 
    // Verifica se a senha em attempt é válida
    async comparePassword(attempt: string): Promise<boolean> {
        try {
            return await bcrypt.compare(attempt, this.password);
        } catch (err) {
            return err;
        }
    }

    @HasMany(() => Product)
    products!: Product[];   // Relação de posse de produtos

    @BelongsToMany(() => Product, () => Offer)
    offers!: Product[]; // Relação de ofertas

    @HasOne(() => Address)
    address!: Address;  // Relação de endereço
}
