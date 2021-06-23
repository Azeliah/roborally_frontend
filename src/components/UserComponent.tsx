import React, {FunctionComponent, useContext, useState} from "react";
import {User} from "../types/User";
import GameContext from "../context/GameContext";

export type UserComponentProps = {
    user: User,
}
export const UserComponent: FunctionComponent<UserComponentProps> = ({user}) => {

    const {updateUser} = useContext(GameContext)

    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(user.playerName)
    const [color, setColor] = useState(user.playerColor)

    const onClickEditUser = async () => {
        setEditMode(true);
    }
    const onSubmit = async () => {
        user.playerName = name
        user.playerColor = color
        updateUser(user);
        setEditMode(false);
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const onChangeSelect = (event : React.ChangeEvent<HTMLSelectElement>) => {
        // @ts-ignore
        setColor(event.target.value)
    }

    return (
        editMode ?
            <li>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={onChangeInput}/>
                    <select name="color" onChange={onChangeSelect}>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="blue">Blue</option>
                    </select>
                    <input type="submit" value="Apply changes"/>
                </form>
            </li>
            :
            <li> <span style={{color: user.playerColor}}>{user.playerName}</span>
                <button onClick={onClickEditUser}>Edit</button>
            </li>
    )
}