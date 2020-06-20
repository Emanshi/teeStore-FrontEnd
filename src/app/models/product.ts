import { Images } from './images';

export class Product{
    productId:string;
    productName:string;
    cost:number;
    sizeAndQuantity:Map<string, number>;
    sex:string;
    category:string;
    dateOfAddition:Date;
    productInfo:string;
    discount:number;
    avgRating:number;
    totalRaters:string;
    images:Images[]
}