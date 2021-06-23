import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";
import styles from "../styling/GamesComponent.module.scss" //Import css module

import {UserComponent} from "./UserComponent";

export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {
    
    const MAX_NO_USERS = 4;
    const {games, selectGame, editGame, createBoard, createUser, startGame} = useContext(GameContext)
    const [editGameClicked, setEditGameClicked] = useState(false)
    const [newName,setNewName] = useState(game.name)
    const [newHeight,setNewHeight] = useState("Game height")
    const [newWidth,setNewWidth] = useState("Game Width")
    const [checkHValid, setCheckHValid] = useState(false)

    const onClickPlayGame = async (e: React.MouseEvent<HTMLButtonElement>, playerId: number) => {
        selectGame(game, playerId)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value)
    }
    
    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value)
    }

    const onChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.validity.valid ?
          setCheckHValid(true):
            console.log("This is not a number")
        setNewHeight(event.target.value)
    }

    const onChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.validity.valid ?
            setCheckHValid(true):
            console.log("This is not a number")
        setNewWidth(event.target.value)
    }

    const onClickGame = async () => {
        game.started = true
        startGame(game.id)
        createBoard(game).then(r => {})
    }

    const addUserToGame = async () => {
        createUser(game.id)

    }

    const onEditClicked = (event: React.FormEvent<HTMLFormElement>) =>{
        game.name = newName
        if (checkHValid){
            game.height = parseInt(newHeight)
            game.width = parseInt(newWidth)
        }

        editGame(game).then(t=>{})
        setEditGameClicked(false)
    }

    const onEditGame = () => {
        setEditGameClicked(true)
    }

    return (
        <div>
            <div>
                {editGameClicked ?
                    <form onSubmit={onEditClicked}>
                        <label> Edit the name of the game </label><br/>
                        <input
                            type="text"
                            value={newName}
                            onChange={onChangeName}/><br/>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            value={newWidth}
                            onChange={onChangeWidth}/><br/>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            value={newHeight}
                            onChange={onChangeHeight}/><br/>
                        <input type="submit" value={"Save new name"}/>
                    </form>
                    :
                    !game.started ? <button onClick={onEditGame}> Edit game </button>
                    :
                    ""
                }
            </div>
            <div>
                <b>
                    {game.id} : {game.name} {(!game.started && game.users.length < MAX_NO_USERS) ? <button onClick={addUserToGame}>Add user</button>: ""}
                    {!game.started && game.users.length > 0 ? <button onClick={onClickGame}>Start Game</button> : ""}
                </b>
            </div>
            <ul>
              {game.started ?
                game.users.map( (user, index) =>
                <li key={index}> {user.playerName} <button className={styles.buttonStyled} value={user.playerId} onClick={e => onClickPlayGame(e, user.playerId)}>Play</button>
                </li> )
                :
                game.users.map((user, index) => <UserComponent user={user} key={index}/>)
              }
            </ul>
        </div>
    )
}
