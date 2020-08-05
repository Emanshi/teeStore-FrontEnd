import { Product } from './product';
import { User } from './users';
import { Address } from './address';

export class Orders{
    orderId:string;
    products:Product[];
    quantities:number[];
    prices:number[];
    totalCost:number;
    timeOfOrder:Date;
    user:User;
    sizes:string[];
    deliveryAddress:Address;
    paymentType:string;
}