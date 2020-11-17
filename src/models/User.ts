import { Column, DataType, Table, Model, HasMany, BelongsToMany, AllowNull, HasOne, Unique, BeforeCreate } from 'sequelize-typescript';
import { Address } from './Address';
import { Offer } from './Offer';
import { Product } from './Product';
import bcrypt  from 'bcrypt';



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

    @BeforeCreate
    static async hashPassword(user: User){
        try {
            if(user.password){
                user.password = await bcrypt.hash(user.password, 10);
            }
        } catch(err) {
            return err;
        }
    }
 
    async comparePassword(attempt: string): Promise<boolean> {
        try {
            return await bcrypt.compare(attempt, this.password);
        } catch (err) {
            return err;
        }
    }

    @HasMany(() => Product)
    products!: Product[];

    @BelongsToMany(() => Product, () => Offer)
    offers!: Product[];

    @HasOne(() => Address)
    address!: Address;
}
