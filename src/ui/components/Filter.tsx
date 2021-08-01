import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserTable from './UserTable';
import Select from 'react-select';
import NewUserForm from '../forms/NewUser';
import Loading from './Loading';
import MaterialUserTable from './MaterialTable';
import "../stylesheets/Filter.css";


const Filter: React.FC = () => {

    interface IState { districts: District[], user: { "id": number, key: string, "first_name": string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void }[] }

    interface District { "id": number, key: string, "name": string, "city": string }

    const users = useSelector((state: IState) => state.user);

    const districts = useSelector((state: IState) => state.districts);


    const [state, setState] = useState({
        district: null,
        activeToggle: false
    });

    const [usersShowing, setUsersShowing] = useState(users);

    const [currFilter, setCurrFilter] = useState({
        value: "all"
    });


    const renderNewUsers = (filter: { value: string }, active: void | boolean) => {
        if (active === true) {
            return users.filter((user) => {
                if (active === true) {
                    if (filter.value == "all") {
                        return user.active === true;
                    } else return user.active === true && user.district.toString() == filter.value;
                } else return user;
            });
        } else return users.filter((user) => {
            if (filter.value == "all") {
                return user;
            } else return user.district.toString() == filter.value;
        });
    };

    const handleChangeSelect = (selectedOption: any) => {
        setState({
            ...state,
            ["district"]: selectedOption
        });
        setCurrFilter({
            value: selectedOption.value
        });
        setUsersShowing(renderNewUsers(selectedOption));
    };

    const handleChangeActive = (evt: ChangeEvent) => {
        setState({
            ...state,
            [(evt.target! as HTMLInputElement).name]: (evt.target! as HTMLInputElement).checked
        });
        setUsersShowing(renderNewUsers(currFilter, (evt.target! as HTMLInputElement).checked));
    };

    interface Option {
        value: number,
        label: string
    }

    const [options, setOptions] = useState<Option[]>(districts.map((district) => {
        const option = {
            value: district.id,
            label: district.name
        };
        return option;
    }));


    const [isLoading, setisLoading] = useState(true);

    setTimeout(() => {
        setisLoading(false);
    }, 1000);

    useEffect(() => {
        setUsersShowing(users);
    }, [isLoading]);

    useEffect(() => {
        setUsersShowing(renderNewUsers(currFilter));
        setOptions(districts.map((district) => {
            const option = {
                value: district.id,
                label: district.name
            };
            return option;
        }));
    }, [users]);

    return (
        <div>
            <div className="container">
                <div className="form-group container row d-flex justify-content-center align-content-center">
                    <label className="col-2" htmlFor="district">Filter by District: </label>
                    <div className="col">
                        <Select
                            className="Select"
                            value={state.district}
                            onChange={handleChangeSelect}
                            options={options}
                        />
                    </div>
                    <div className="form-group col d-flex flex-column justify-content-center align-content-center">
                        <label className="mx-auto" htmlFor="activeUsers">Active Users Only: </label>
                        <input type="checkbox" className="mx-auto" name="activeUsers" defaultChecked={state.activeToggle} value={state.activeToggle.toString()} onChange={handleChangeActive} />
                    </div>
                </div>
            </div>

            <br />
            <div className="col text-center">
                <NewUserForm options={options} />
            </div>
            <br />
            {isLoading ? <Loading /> : <MaterialUserTable users={usersShowing} options={options} />/*<UserTable users-{usersShowing} /> */}
        </div>
    );
};

export default Filter;
