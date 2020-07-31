import { Product } from './product';
import { User } from './users';

export class Orders{
    orderId:string;
    products:Product[];
    quantities:number[];
    prices:number[];
    totalCost:number;
    timeOfOrder:Date;
    user:User;
}