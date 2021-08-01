import { DistrictAction } from "../actions/actions";
import { DistrictActionType } from "../actionTypes/actionTypes";


interface District { "id": number, key: string, "name": string, "city": string }




export const districtsReducer = (state: District[] = [], action: DistrictAction) => {
    switch (action.type) {
        case DistrictActionType.FETCHDISTRICTSUCCESS:
            return action.payload;
        default:
            return state;
    }
};
