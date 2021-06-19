import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";



export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {

    const {selectGame, editGame} = useContext(GameContext)
    const [editGameClicked, setEditGameClicked] = useState(false)
    const [newName,setNewName] = useState("Game name")
    const [newHeight,setNewHeight] = useState("Game height")
    const [newWidth,setNewWidth] = useState("Game Width")
    const [checkHValid, setCheckHValid] = useState(false)

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
        selectGame(game)
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
        console.log("Going to edit game mode")
    }

    return (
        <div>
            <div>
                <b>{game.id} : {game.name}<button onClick={onClickGame}>Play game</button></b>
                <button onClick={onEditGame}> Edit game </button>
                {editGameClicked ?
                    <form onSubmit={onEditClicked}>
                        <label> Edit the name of the game </label><br/>
                        <input
                            type = "text"
                            value={newName}
                            onChange = {onChangeName}/><br/>
                        <input
                            type = "text"
                            pattern="[0-9]*"
                            value={newWidth}
                            onChange = {onChangeWidth}/><br/>
                        <input
                            type = "text"
                            pattern="[0-9]*"
                            value={newHeight}
                            onChange = {onChangeHeight}/><br/>
                        <input type="submit" value={"Save new name"}/>
                    </form>
                    :
                    console.log("Done")
                }
            </div>
            <ul>
                {game.users.map( (user, index) => <li key={index}> {user.playerName} </li>) }
            </ul>
        </div>
    )
}
