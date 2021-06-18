import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";
import {UserComponent} from "./UserComponent";

export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {

    const MAX_NO_USERS = 4;
    const {games, selectGame, editGame, createBoard, createUser} = useContext(GameContext)
    const [editGameClicked, setEditGameClicked] = useState(false)
    const [newName,setNewName] = useState(game.name)
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value)}


    const onClickGame = async () => {
        selectGame(game)
        createBoard(game).then(r => {})
        setBoardCreated(true)
    }

    const addUserToGame = async () => {
        createUser(game.id)
    }

    const [boardCreated, setBoardCreated] = useState(false)

    const onEditClicked = (event: React.FormEvent<HTMLFormElement>) =>{
        editGame(game).then(t=>{})
        setEditGameClicked(false)
    }

    const onEditGame = () => {
        setEditGameClicked(true)
    }

    return (
        <div>
            <div>
                <b>
                    {game.id} : {game.name} {(!boardCreated && game.users.length < MAX_NO_USERS) ? <button onClick={addUserToGame}>Add user</button>: ""}
                    {!boardCreated ? <button onClick={onClickGame}>Start Game</button> : ""}
                </b>
            </div>
            <div>
                {editGameClicked ?
                    <form onSubmit={onEditClicked}>
                        <input
                            type = "text"
                            value={newName}
                            onChange = {onChange}/>
                        <input type="submit" value={"Apply changes"}/>
                    </form>
                    :
                    <button onClick={onEditGame}> Edit game </button>
                }
            </div>
            <ul>
                {game.users.map((user, index) => <UserComponent user={user} key={index}/>)}
            </ul>
        </div>
    )

}
