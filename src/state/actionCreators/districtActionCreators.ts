import { DistrictActionType } from "../actionTypes/actionTypes";
import { Dispatch } from "redux";
import { DistrictAction } from "../actions/actions";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const fetchDistrictsSuccess = (districts: any) => ({
    type: DistrictActionType.FETCHDISTRICTSUCCESS,
    payload: districts
});

interface District { "id": number, key: string, "name": string, "city": string }

export const fetchDistricts = (): any => {
    return async (dispatch: Dispatch<DistrictAction>) => {
        try {
            const districts = await axios.get("./districts.json")
                .then((response) => {
                    return response.data.map((district: District) => {
                        return { ...district, key: uuidv4() };
                    });
                });
            dispatch(fetchDistrictsSuccess(districts));
        }
        catch (e) {
            console.log(e);
        }
    };
};