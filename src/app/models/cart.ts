import { Product } from './product';
import { User } from './users';

export class Cart{

    cartId:string;
    products:Product[];
    quantities:number[];
    totalCost:number;
    user:User;
}