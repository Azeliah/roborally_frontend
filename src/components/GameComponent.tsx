import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";



export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {

    const {selectGame, createBoard} = useContext(GameContext)

    const onClickGame = async () => {
        selectGame(game)
        createBoard(game.name).then(r => {})
        setBoardCreated(true)
    }

    const [boardCreated, setBoardCreated] = useState(false)

    //game.users.forEach((user)=> {console.log(user)} )
    return (
        !boardCreated ?
        <div>
            <div>
                <b>{game.id} : {game.name} <button onClick={onClickGame}>Start Game</button></b>
            </div>

            <ul>
                {game.users.map( (user, index) => <li key={index}> {user.playerName} </li>) }
            </ul>
        </div>

        :
        <div>
            <div>
                <b>{game.id} : {game.name}</b>
            </div>
            <ul>
                {game.users.map( (user, index) => <li key={index}> {user.playerName} </li>) }
            </ul>
        </div>
    )

}
