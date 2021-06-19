import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";
import styles from "../styling/GamesComponent.module.scss" //Import css module




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
                <br/>
                <b>{game.id} : {game.name} </b>
            </div>

            <ul>
                {game.users.map( (user, index) =>
                <li key={index}> {user.playerName} <button className={styles.buttonStyled} value={user.playerId} onClick={e => onClickGame(e, user.playerId)}>Play</button>


                </li> ) }
            </ul>
        </div>
    )

}
