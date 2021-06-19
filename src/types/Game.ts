import {User} from "./User"

export type Game = {
    id : number,
    name : string,
    started : boolean,
    height : number,
    width : number
    users : User[]
}