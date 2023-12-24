import { Role } from '../models/role';

export interface UserResponse {
    id: number;
    fullname: string;
    address: string;
    is_active: boolean;
    date_of_birth: Date;
    google_account_id: number;
    facebook_account_id: number;
    role: Role;
}
