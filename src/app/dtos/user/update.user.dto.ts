import { IsDate, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDTO {
    @IsString()
    fullname: string;

    @IsPhoneNumber()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    retype_password: string;

    @IsDate()
    date_of_birth: Date;

    constructor(data: any) {
        this.fullname = data.fullname;
        this.phone_number = data.phone_number;
        this.address = data.address;
        this.password = data.password;
        this.retype_password = data.retype_password;
        this.date_of_birth = data.date_of_birth;
    }
}
