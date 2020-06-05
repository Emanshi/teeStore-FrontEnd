import { Images } from './images';

export class Product{
    productId:string;
    productName:string;
    cost:number;
    size:string;
    sex:string;
    category:string;
    productGroup:string;
    quantity:number;
    dateOfAddition:Date;
    productInfo:string;
    discount:number;
    avgRating:number;
    totalRaters:string;
    images:Images[]
}