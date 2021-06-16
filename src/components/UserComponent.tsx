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

    const onClickEditUser = async () => {
        setEditMode(true);
    }
    const onSubmit = async () => {
        user.playerName = name
        updateUser(user);
        setEditMode(false);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    return (
        editMode ?
            <li>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={onChange}/>
                    <input type="submit" value="Save edits"/>
                </form>
            </li>
            :
            <li> {user.playerName}
                <button onClick={onClickEditUser}>Edit</button>
            </li>
    )
}