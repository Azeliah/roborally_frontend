import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";



export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {

    const {selectGame, createBoard, createUser} = useContext(GameContext)

    const onClickGame = async () => {
        selectGame(game)
        createBoard(game).then(r => {})
        setBoardCreated(true)
    }

    const addUserToGame = async () => {
        createUser(game.id)
    }

    const [boardCreated, setBoardCreated] = useState(false)

    //game.users.forEach((user)=> {console.log(user)} )
    return (
        <div>
            <div>
                <b>{game.id} : {game.name} {!boardCreated ? <button onClick={addUserToGame}>Add user</button>: ""}
                    {!boardCreated ? <button onClick={onClickGame}>Start Game</button> : ""}
                </b>
            </div>

            <ul>
                {game.users.map( (user, index) => <li key={index}> {user.playerName} </li>) }
            </ul>
        </div>

    )

}
