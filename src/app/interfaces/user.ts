import { Photo } from './photo';

export interface User {
    id?: number;
    surname: string;
    othername: string;
    email: string;
    phoneNumber: number;
    address?: string;
    accountName: string;
    accountNo: string;
    photoUrl: string;
    photo?: Photo[];
}
