import React, {ReactNode, useCallback, useEffect, useMemo, useState} from "react"
import GameContext from "./GameContext"
import {Player} from "../types/Player";
import {Board} from "../types/Board";
import {Space} from "../types/Space";
import GameApi from "../api/GameApi";
import {Game} from "../types/Game";
import {User} from "../types/User";

type GameContextProviderPropsType = {
    children: ReactNode
}


const GameContextProvider = ({children}: GameContextProviderPropsType) => {
    const [games, setGames] = useState<Game[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    const [playingPlayer, setPlayingPlayer] = useState<User>({playerId: -1, playerName:"", playerColor:"green", gameId: -1})
    /*useEffect(() => {
        GameApi.getBoard(1).then(board => {
            setSpaces(board.spaceDtos)
            setPlayers(board.playerDtos)
            setWidth(board.width)
            setHeight(board.height)
            setGameId(board.boardId)
            setGameName(board.boardName)
            if (board.currentPlayerDto) {
                setCurrentPlayer(board.currentPlayerDto)
                board.playerDtos.forEach((player,index)=>{
                    if(player.playerId === board.currentPlayerDto?.playerId){
                        setCurrentPlayerIndex(index)
                    }
                })

            }

            setLoaded(true)
        }).catch(() => {
            console.error("Error while fetching board from backend")
        })
    }, []) */
    //The code below is executed when the provider is rendered (inside App.tsx)
    //The code should fetch the data from the API instead of using a static assignment
    //Define a useState variable, note that useState returns an array, containing that state itself aswell as
    // a function to set a new state value, here we use array destructuring (the [..., ...] notation).
    // we also declare that the state variable and setter should be of type /take type Player[]
    const [players, setPlayers] = useState<Player[]>([])
    const playerCount = useMemo(() => players.length, [players])
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0)
    const [currentPlayer, setCurrentPlayer] = useState<Player>({
        playerId: -1,
        playerColor: "red",
        boardId: -1,
        playerName: ""
    })
    const [spaces, setSpaces] = useState<Space[][]>([])
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [gameId, setGameId] = useState<number>(0)
    const [gameName, setGameName] = useState<string>("hi")

    //Define a function used to set a player ona  specific space
    const setPlayerOnSpace = useCallback(async (space: Space) => {
        //Check if space already has a player standing on it
        if (!space.playerId) {
            await GameApi.moveCurrentPlayer(gameId, {...space, playerId: currentPlayer.playerId}).then(() => {
                let tempSpaces = [...spaces] //Use spread operator to copy spaces array, needed for making immutable changes
                //See https://bit.ly/2My8Bfz, until the section about Immutable.js
                tempSpaces[space.x][space.y].playerId = currentPlayer.playerId //Set the player on the new space they clicked on

                if (currentPlayer.x !== undefined && currentPlayer.y !== undefined) { //If the player was standing on a space previously, remove them from that space
                    tempSpaces[currentPlayer.x][currentPlayer.y].playerId = undefined
                }
                setSpaces(tempSpaces)
                let tempPlayers = [...players]
                tempPlayers[currentPlayerIndex].x = space.x; //Update the players array to reflect the changes
                tempPlayers[currentPlayerIndex].y = space.y; //Update the players array to reflect the changes
                setPlayers(tempPlayers)
                setCurrentPlayer({...currentPlayer, x: space.x, y: space.y}) //Update current player

            }).catch(() => {
                console.error("Error while moving player")
            })

        }

    }, [currentPlayer, currentPlayerIndex, gameId, players, spaces])

    const switchToNextPlayer = useCallback(async (board : Board) => {

            await GameApi.switchPlayer(gameId, board.currentPlayerDto?.playerId).then(() => {
                const newPlayerIndex = (currentPlayerIndex + 1) % playerCount
                console.log("old player index", currentPlayerIndex, "new player index", newPlayerIndex)
                setCurrentPlayer(players[newPlayerIndex])
                setCurrentPlayerIndex(newPlayerIndex)
            }).catch(() => console.error("Error while switching player"))

    }, [currentPlayerIndex, gameId, playerCount, players])
    const board = useMemo<Board>(() => {
        return ({
            spaceDtos: spaces,
            playerDtos: players,
            currentPlayerDto: currentPlayer,
            currentPlayerIndex: currentPlayerIndex,
            width: width,
            height: height,
            boardName: gameName,
            boardId: gameId
        })
    }, [currentPlayer, currentPlayerIndex, gameId, gameName, height, players, spaces, width])

    const playedPlayer = useMemo<User>(() => {
        return ({
            playerId: playingPlayer.playerId,
            playerName: playingPlayer.playerName,
            playerColor: playingPlayer.playerColor,
            gameId: playingPlayer.gameId
        })
    }, [playingPlayer.playerId, playingPlayer.playerName, playingPlayer.playerColor, playingPlayer.gameId])

    const createGame = useCallback(async (name: String) => {
        await GameApi.createGame(name)
    }, [])

    const editGame = useCallback(async (game : Game) => {
        await GameApi.editGame(game, gameId)
    }, [])

    const createBoard = useCallback(async (game: Game) => {
        await GameApi.createBoard(game)
    }, [])

    const startGame = useCallback(async (gameId : number) => {
        await GameApi.startGame(gameId)
    }, [])

    const createUser = useCallback(async (gameId: number) => {
        await GameApi.createUser(gameId).catch(() => {
            console.error("User could not be created")
        })
    }, [])

    const selectGame = useCallback(async (game: Game, playerId: number) => {
        if (game.started) {
            GameApi.getBoard(game.id).then(board => {
                if (board.playerDtos.length > 0) {
                    setSpaces(board.spaceDtos)
                    setPlayers(board.playerDtos)
                    setWidth(board.width)
                    setHeight(board.height)
                    setGameId(board.boardId)
                    setGameName(board.boardName)
                    if (board.currentPlayerDto) {
                        setCurrentPlayer(board.currentPlayerDto)
                        board.playerDtos.forEach((player, index) => {
                            if (player.playerId === board.currentPlayerDto?.playerId) {
                                setCurrentPlayerIndex(index)
                            }
                            if(player.playerId === playerId){
                                playedPlayer.gameId = player.boardId
                                playedPlayer.playerName = player.playerName
                                playedPlayer.playerId = player.playerId
                                playedPlayer.playerColor = player.playerColor
                                setPlayingPlayer(playedPlayer)
                            }
                        })
                    }
                    setLoaded(true) /*The board is now loaded*/
                }
            }).catch(() => {
                console.error("Error while fetching board from backend")
            })
        } else {
            console.error("Selected game " + game.name + " is not started yet!")
        }
    }, [])

    const unselectedGame = useCallback(async () => {
        setGameId(-1)
        setLoaded(false)
    }, [])

    const updateUser = useCallback(async (user: User) => {
        await GameApi.updateUser(user);
    }, [])

    useEffect(() => {
        const interval = setInterval(async () => {
            if (loaded && gameId >= 0) {
                GameApi.getBoard(gameId).then(board => {
                    if (gameId === board.boardId) {
                        setSpaces(board.spaceDtos)
                        setPlayers(board.playerDtos)
                        setWidth(board.width)
                        setHeight(board.height)
                        setGameId(board.boardId)
                        setGameName(board.boardName)
                        if (board.currentPlayerDto) {
                            setCurrentPlayer(board.currentPlayerDto)
                            board.playerDtos.forEach((player, index) => {
                                if (player.playerId === board.currentPlayerDto?.playerId) {
                                    setCurrentPlayerIndex(index)
                                }
                            })
                        } else {
                            console.log("Load outdated.")
                        }
                    }
                }).catch(() => {
                    console.error("Board could not be loaded.")
                })
            } else {
                GameApi.getGames().then(games => {
                    setGames(games)
                }).catch(() => {
                    console.error("Games could not be loaded")
                });
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [loaded, gameId])

    return (
        <GameContext.Provider
            value={
                {
                    playedPlayer: playedPlayer,
                    updateUser: updateUser,
                    games: games,
                    selectGame: selectGame,
                    unselectedGame: unselectedGame,
                    createGame: createGame,
                    createBoard: createBoard,
                    createUser: createUser,
                    startGame: startGame,
                    loaded: loaded,
                    board: board,
                    setCurrentPlayerOnSpace: setPlayerOnSpace,
                    switchCurrentPlayer: switchToNextPlayer,
                    editGame: editGame
                }
            }>
            {children} {/*See: https://reactjs.org/docs/composition-vs-inheritance.html*/}
        </GameContext.Provider>
    )
}

export default GameContextProvider