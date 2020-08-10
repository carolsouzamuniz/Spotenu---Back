export enum Type {
    NORMAL_PAGANTE = "NORMAL PAGANTE",
    NORMAL_NAO_PAGANTE = "NORMAL NAO PAGANTE",
    ADMIN = "ADMIN",
    BANDA = "BANDA"
};

export class User{

}

export interface UserInputDTO {
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: Type,
        description: string,
        isApproved: number
}