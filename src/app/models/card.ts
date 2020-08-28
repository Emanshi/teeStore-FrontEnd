import { User } from './users';

export class Card {
    cardNumber: string;
    cardHolderName: string;
    expiryMonthYear: string;
    cvv: string;
    user: User;
}