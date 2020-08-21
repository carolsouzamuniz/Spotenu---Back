import { Type } from "./User"

export class Band{
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
    getNickname(){
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

    public static toBandModel(object: any): Band{
        return new Band(
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

export interface BandInputDTO {
    name: string,
    email: string,
    nickname: string,
    password: string,
    type: Type,
    description: string,
    isApproved: number
}

export interface LoginBandInputDTO {
    emailOrNickname: string,
    password: string
}