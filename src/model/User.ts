export enum Type {
    NORMAL_PAGANTE = "NORMAL PAGANTE",
    NORMAL_NAO_PAGANTE = "NORMAL NAO PAGANTE",
    ADMIN = "ADMIN",
    BANDA = "BANDA"
};

export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private nickname: string,
        private password: string,
        private type: Type,
        private description: string,
        private isApproved: number
    ){}

    getId(){
        return this.id
    }
    getName(){
        return this.name
    }
    getEmail(){
        return this.email
    }
    getNichname(){
        return this.nickname
    }
    getPassword(){
        return this.password
    }
    getType(){
        return this.type
    }
    getDescription(){
        return this.description
    }
    getIsApproved(){
        return this.isApproved
    }

    setId(id: string){
        this.id = id
    }
    setName(name: string){
        this.name = name
    }
    setEmail(email: string){
        this.email = email
    }
    setNichname(nickname: string){
        this.nickname = nickname
    }
    setPassword(password: string){
        this.password = password
    }
    setType(type: Type){
        this.type = type
    }
    setDescription(description: string){
        this.description = description
    }
    setIsApproved(isApproved: number){
        this.isApproved = isApproved
    }

    public static toUserModel(object: any): User{
        return new User(
            object.UserID,
            object.Name,
            object.Email,
            object.Nickname,
            object.Password,
            object.Type,
            object.Description,
            object.IsApproved
        )
    }
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

export interface LoginInputDTO {
    email: string,
    password: string
}