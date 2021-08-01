import { UserAction } from "../actions/actions";
import { UserActionType } from "../actionTypes/actionTypes";
import { v4 as uuidv4 } from "uuid";


interface IState { "id": number, "first_name": string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, key: string, isEditing: boolean | void }




export const userReducer = (state: IState[] = [], action: UserAction) => {
    switch (action.type) {
        case UserActionType.FETCHUSERSSUCCESS: {
            const users: any = localStorage.getItem("users");
            if (users) {
                return JSON.parse(users);
            }
            return action.payload;
        }
        case UserActionType.EDITUSER:
            {
                const userToEdit = state.filter(user => user.key == action.payload)[0];
                const newState = [...state.slice(0, state.indexOf(userToEdit))];
                userToEdit.isEditing = !userToEdit.isEditing;
                newState.push(userToEdit);
                const editingState = [
                    ...newState,
                    ...state.slice(state.indexOf(userToEdit) + 1)
                ];
                localStorage.setItem("users", JSON.stringify(editingState));
                return editingState;
            }
        case UserActionType.DELETEUSER: {
            const newState = state.filter(user => {
                return user.key != action.payload;
            });
            localStorage.setItem("users", JSON.stringify(newState));
            return newState;
        }
        case UserActionType.SAVEUSER: {
            const userToEdit = action.payload;
            const newState = [...state.slice(0, state.indexOf(state.filter(user => user.key == userToEdit.key)[0]))];
            userToEdit["isEditing"] = false;
            newState.push(userToEdit);
            const updatedState = [
                ...newState,
                ...state.slice(state.indexOf(state.filter(user => user.key == userToEdit.key)[0]) + 1)
            ];
            localStorage.setItem("users", JSON.stringify(updatedState));
            return updatedState;
        }
        case UserActionType.ADDUSER: {
            const userToAdd = JSON.parse(action.payload);
            userToAdd["key"] = uuidv4();
            userToAdd["id"] = state[state.length - 1].id + 1;
            userToAdd["verified"] = false;
            const newState = [...state, userToAdd];
            localStorage.setItem("users", JSON.stringify(newState));
            return newState;
        }
        default:
            return state;
    }
};

