import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";
import {UserComponent} from "./UserComponent";

export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {

    const {selectGame} = useContext(GameContext)

    const onClickGame = async () => {
        selectGame(game)
    }

    //game.users.forEach((user)=> {console.log(user)} )
    return (
        <div>
            <div>
                <b>{game.id} : {game.name} <button onClick={onClickGame}>Play game</button></b>
            </div>

            <ul>
                {game.users.map((user, index) => <UserComponent user={user} key={index}/>)}
            </ul>
        </div>
    )

}
