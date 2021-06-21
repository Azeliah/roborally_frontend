import React, {FunctionComponent, useContext, useState} from 'react';
import GameContext from "../context/GameContext";
import {GameComponent} from "./GameComponent";



type GamesComponentProps = {}
const GamesComponent : FunctionComponent<GamesComponentProps> = () => {

    const {games, loaded, createGame} = useContext(GameContext)
    const [createGameClicked, setCreateGameClicked] = useState(false)
    const [name, setName] = useState("")
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        createGame(name).then(r => {})
        setName("")
        setCreateGameClicked(false)
    }

    const onCreateGame = () => {
        setCreateGameClicked(true)
    }
    return (
        !loaded ?
            <div>
                { createGameClicked ?
                    <form onSubmit={onSubmit}>
                        <label>Name of the game</label>
                        <input
                            type="text"
                            value={name}
                            onChange={onChange}/>
                        <input type="submit" value={"Save game"}/>
                    </form>
                    :
                    <button onClick={onCreateGame}>Create game</button>
                }

                {games.map((game, index) =>
                    <GameComponent key={"game" + index} game={game}/>
                    )
                }
            </div>
            :
            <div/>
    )
}

export default GamesComponent