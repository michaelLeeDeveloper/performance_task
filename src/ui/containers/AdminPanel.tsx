import React, { useEffect } from 'react';
import { fetchUsers } from "../../state/actionCreators/userActionCreators";
import { fetchDistricts } from "../../state/actionCreators/districtActionCreators";
import { store } from '../../state/store';
import Filter from '../components/Filter';



const AdminPanel: React.FC = () => {

    const localState = localStorage.getItem("users");

    useEffect(() => {
        store.dispatch(fetchDistricts());
        store.dispatch(fetchUsers());
    }, [localState]);

    return (
        <div className="app-admin-panel">
            <Filter />
        </div>
    );
};

export default AdminPanel;
