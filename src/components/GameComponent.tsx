import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";
import {User} from "../types/User";



export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {

    const {selectGame, board} = useContext(GameContext)

    const onClickGame = async (e: React.MouseEvent<HTMLButtonElement>, playerId: number) => {
        selectGame(game, playerId)

    }

    return (
        <div>
            <div>
                <b>{game.id} : {game.name} </b>
            </div>

            <ul>
                {game.users.map( (user, index) =>
                <li key={index}> {user.playerName} {board.playerDtos.map( (player, index) =>
                                                    player.playerId === user.playerId ?
                                                        <button value={user.playerId} onClick={e => onClickGame(e, user.playerId)}>Play</button>
                :
                                                        <button value={user.playerId} onClick={e => onClickGame(e, user.playerId)}>Play not</button>)}

                </li> ) }
            </ul>
        </div>
    )

}
