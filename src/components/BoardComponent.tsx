import React, {FunctionComponent, useContext} from 'react';
import {SpaceComponent} from "./SpaceComponent";
import styles from "../styling/BoardComponent.module.scss" //Import css module
import GameContext from "../context/GameContext";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

/*
If the board component took any props/arguments they would be declared inside the type below
see the space component for an example.
 */

type BoardComponentProps = {}
const BoardComponent: FunctionComponent<BoardComponentProps> = () => {
    //{...} context is known as object destructuring
    const {board, loaded, unselectedGame, playedPlayer} = useContext(GameContext) //Hook form of Context.Consumer, used to access the context

    return (
        /*Apply css on div below*/
        loaded ?
        <div>

            <div >
                <Button  variant="contained" color="default" startIcon={<ArrowBackIcon/>} onClick={unselectedGame}/>
                <div className={styles.playerDescriptionContainer}>
                    <br/>
                    <h1 className={styles.inlineDisplay}>{playedPlayer.playerName} </h1>
                    <div className={styles[playedPlayer.playerColor + "Box"]}/>
                    <br/>
                </div>
            </div>
            <div className={styles.container}>
                { board.spaceDtos.map((spaceArray, index) =>
                    <div key={"spaceArray" + index}>
                        {
                            spaceArray.map((space, index) => <SpaceComponent key={"space" + index} space={space} currentPlayer={board.currentPlayerDto}/>)
                        }
                    </div>
                    )
                }
            </div>
        </div>
        :
        <div/>
    )
}

export default BoardComponent


