import axios from "axios";
import {Board} from "../types/Board";
import {Space} from "../types/Space";
import {Game} from "../types/Game";

class GameApi{
    private static instance : GameApi;
    private readonly BACKEND_URL = "http://localhost:8080"
    private constructor() {}

    public static getInstance():GameApi{
        if(!GameApi.instance){
            GameApi.instance = new GameApi();
        }
        return GameApi.instance;
    }

    public getBoard(boardId : number){
        return axios.get<Board>(`${this.BACKEND_URL}/board/${boardId}`).then(value =>value.data)
    }

    public getGames(){
        return axios.get<Game[]>(`${this.BACKEND_URL}/game`).then(value => value.data)
    }

    public moveCurrentPlayer(boardId : number, space : Space){
        return axios.put(`${this.BACKEND_URL}/board/${boardId}/move`,space)
    }

    public switchPlayer(boardId : number){
        return axios.put(`${this.BACKEND_URL}/board/${boardId}/switchplayer`)
    }

    public createGame(name: String){
        return axios.post<String>(`${this.BACKEND_URL}/game`, {gameId: -1, name: name}).then(value => console.log(value.data))
    }

    public createBoard(game : Game){
        return axios.post<String>(`${this.BACKEND_URL}/board`, {gameId: game.id, name: game.name, height : 6, width : 6, users: game.users}).then(value => console.log(value.data))
    }

    public createUser(gameId : number){
        return axios.post<String>(`${this.BACKEND_URL}/game/${gameId}/user`)
    }
}

export default GameApi.getInstance()