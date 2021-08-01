import { UserActionType } from "../actionTypes/actionTypes";
import { Dispatch } from "redux";
import { UserAction } from "../actions/actions";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";


export const editUser = (userID: string) => {
    return (dispatch: Dispatch<UserAction>) => {
        return dispatch({
            type: UserActionType.EDITUSER,
            payload: userID
        });
    };
};

export const deleteUser = (userID: string) => {
    return (dispatch: Dispatch<UserAction>) => {
        return dispatch({
            type: UserActionType.DELETEUSER,
            payload: userID
        });
    };
};

interface User { "id": number, key: string, "first_name": string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void }


export const saveUser = (user: User) => {
    return (dispatch: Dispatch<UserAction>) => {
        return dispatch({
            type: UserActionType.SAVEUSER,
            payload: user
        });
    };
};

export const fetchPostsSuccess = (users: any) => ({
    type: UserActionType.FETCHUSERSSUCCESS,
    payload: users
});

export const addUser = (user: string) => {
    return (dispatch: Dispatch<UserAction>) => {
        return dispatch({
            type: UserActionType.ADDUSER,
            payload: user
        });
    };
};


export const fetchUsers = (): any => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const users = await axios.get("./users.json")
                .then((response) => {
                    return response.data.map((user: User) => {
                        return { ...user, key: uuidv4() };
                    });
                });
            dispatch(fetchPostsSuccess(users));
        }
        catch (e) {
            console.log(e);
        }
    };
};

