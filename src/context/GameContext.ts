import {createContext} from "react";
import {Board} from "../types/Board";
import {Space} from "../types/Space";
import {Game} from "../types/Game";
import {User} from "../types/User";

export type GameContextType = {
    games: Game[],
    selectGame: (game: Game, playerId: number) => Promise<void>,
    unselectedGame: () => Promise<void>,
    createGame: (name: String) => Promise<void>,
    createBoard: (game: Game) => Promise<void>,
    createUser: (gameId : number) => Promise<void>,
    startGame: (gameId : number) => Promise<void>,
    editGame: (game: Game) => Promise<void>,
    updateUser: (user: User) => Promise<void>

    playedPlayer: User,
    loaded : boolean,
    board: Board,
    setCurrentPlayerOnSpace: (space: Space) => Promise<void>,
    switchCurrentPlayer: (board : Board) => Promise<void>
}
//Define a new context of type GameContextType
//Below we define the "default" values which are set upon initialization of the context

const GameContext = createContext<GameContextType>({
    games: [],
    selectGame: async () => {},
    unselectedGame: async () => {},
    createGame: async () => {},
    editGame: async  () => {},
    createBoard: async () => {},
    createUser: async () => {},
    startGame: async () => {},
    updateUser: async () => {},

    playedPlayer: {
        playerId: -1,
        playerName: "",
        playerColor: "green",
        gameId : -1
    },

    loaded: false,
    board: {
        playerDtos: [],
        spaceDtos: [],
        boardId: -1,
        boardName: "",
        currentPlayerDto: undefined,
        height: 0,
        width: 0
    },
    setCurrentPlayerOnSpace: async () => {
    },
    switchCurrentPlayer: async (board : Board) => {
    }
});

export default GameContext