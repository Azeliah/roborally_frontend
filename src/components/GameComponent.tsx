import React, {FunctionComponent, useContext} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";



export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {
    const {selectGame} = useContext(GameContext)

    const onClickGame = async () => {
        selectGame(game)
    }

    return (
        <div onClick={onClickGame}>
            <h1>{game.id} : {game.name}</h1>
            <ul>
                {game.users.map( (user, index) => <li key={index}> {user.userName} (this is tuff)</li> )}
            </ul>
        </div>
    )

}
