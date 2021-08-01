import { UserActionType, DistrictActionType } from "../actionTypes/actionTypes"

interface EditUserAction {
    type: UserActionType.EDITUSER,
    payload: string
}

interface DeleteUserAction {
    type: UserActionType.DELETEUSER,
    payload: string
}

interface FetchUsersAction {
    type: UserActionType.FETCHUSERSSUCCESS,
    payload: User[]
}

interface User { "id": number, key: string, "first_name": string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void }

interface SaveUserAction {
    type: UserActionType.SAVEUSER,
    payload: User
}


interface AddUserAction {
    type: UserActionType.ADDUSER,
    payload: string
}

interface District { "id": number, key: string, "name": string, "city": string }

interface FetchDistrictAction {
    type: DistrictActionType.FETCHDISTRICTSUCCESS,
    payload: District[]
}

export type DistrictAction = FetchDistrictAction;


export type UserAction = DeleteUserAction | EditUserAction | FetchUsersAction | SaveUserAction | AddUserAction;

