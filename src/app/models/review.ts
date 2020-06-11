import { User } from './users';
import { Product } from './product';

export class Review {
    reviewId:string;
    reviewTitle:string;
    reviewBody:string;
    ratings:string;
    ratingHelpful:number;
    reviewDate:Date;
    user:User;
    product:Product;
}