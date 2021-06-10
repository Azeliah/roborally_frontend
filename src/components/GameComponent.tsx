import React, {FunctionComponent, useContext, useState} from 'react';
import {Game} from "../types/Game";
import GameContext from "../context/GameContext";



export type GameComponentProps = {
    game: Game
}
export const GameComponent: FunctionComponent<GameComponentProps> = ({game}) => {

    const {selectGame} = useContext(GameContext)
    const [createGame, setCreateGame] = useState(false)
    const [name, setName] = useState("Name of game")
    const [width, setWidth] = useState(0)
    const [heigth, setHeigth] = useState(0)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        setCreateGame(false)
    }

    const onClickGame = async () => {
        selectGame(game)
    }
    const onCreateGame = () => {
        setCreateGame(true)
        console.log("Going to create game mode")
    }
    //game.users.forEach((user)=> {console.log(user)} )
    return (
        <div>
            { !createGame ?
                <div>
                    <b>{game.id} : {game.name} <button onClick={onClickGame}>Play game</button></b>
                    <button onClick={onCreateGame}>Create game</button>
                </div>
                :
                <form onSubmit={onSubmit}>
                    <label>Name of the game</label>
                    <input
                        type="text"
                        value={name}
                        onChange={onChange}/>
                    <input type="submit" value={"Save game"}/>
                    <label>Width of the game</label>
                    <label>Heigth of the game</label>
                </form>
            }

            <ul>
                {game.users.map( (user, index) => <li key={index}> {user.playerName} </li>) }
            </ul>
        </div>
    )

}
