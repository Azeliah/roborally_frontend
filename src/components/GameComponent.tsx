import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";



export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {

    const {games, selectGame, editGame} = useContext(GameContext)
    const [editGameClicked, setEditGameClicked] = useState(false)
    const [newName,setNewName] = useState("")
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value)}

    const onClickGame = async () => {
        selectGame(game)
    }

    const onEditClicked = (event: React.FormEvent<HTMLFormElement>) =>{
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
                <b>{game.id} : {game.name} <button onClick={onClickGame}>Edit game</button></b>
                <b>{game.id} : {game.name} <button onClick={onClickGame}>Play game</button></b>
            </div>
            <div>
                <button onClick={onEditGame}> Edit game </button>
                {editGameClicked ?
                    <form onSubmit={onEditClicked}>
                        <label> Edit the name of the game </label>
                        <input
                            type = "text"
                            value={newName}
                            onChange = {onChange}/>
                        <input type="submit" value={"Save new name"}/>
                    </form>
                    :
                    console.log("Done")
                }

                    {games.map((game, index) =>
                        <GameComponent key={"game" + index} game={game}/>
                        )
                    }
            </div>
            <ul>
                {game.users.map( (user, index) => <li key={index}> {user.playerName} </li>) }
            </ul>
        </div>
    )

}
