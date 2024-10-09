export class RefreshTokenDTO {
    refresh_token: string;

    constructor(data: any) {
        this.refresh_token = data.refresh_token;
    }
}
