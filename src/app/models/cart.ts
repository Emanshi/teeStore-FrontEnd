import { Product } from './product';
import { User } from './users';

export class Cart{
    cartId:string;
    products:Product[];
    quantities:number[];
    sizes:string[];
    totalCost:number;
    user:User;
}