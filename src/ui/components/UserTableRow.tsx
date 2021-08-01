import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActionCreators } from '../../state/actionCreators/actionCreators';
import "../stylesheets/UserTableRow.css";
import UserForm from './UserForm';

type Props = { user: { "id": number, "first_name": string, key: string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void } };

const UserTableRow: FC<Props> = ({ user }: Props) => {

    const dispatch = useDispatch();

    const { deleteUser } = bindActionCreators(UserActionCreators, dispatch);

    const [showModal, setShowModal] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const handleDeleteUser = (key: string) => {
        deleteUser(key);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <th scope="row" >{user.id}</th>
            <td >{user.last_name}</td>
            <td >{user.first_name}</td>
            <td>{user.middle_initial}</td>
            <td >{user.district}</td>
            <td >{user.verified ? <><i className="bi bi-check2-circle"></i>Verified</> : <i className="bi bi-x-lg"></i>}</td>
            <td >{user.active ? <><i className="bi bi-check2-circle"></i>Active</> : <i className="bi bi-x-lg"></i>}</td>
            <td >{user.created_at}</td>
            <button className="btn btn-secondary" onClick={toggleForm}>EDIT</button>
            <button className="btn btn-secondary" onClick={toggleModal} type="button">DELETE</button>
            {showModal ?
                <div className="modal-modal show">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure you want to delete {user.first_name} {user.last_name}</h5>

                                <button type="button" className="btn close" onClick={toggleModal}
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Go Back</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(user.key)}>Yes, Delete</button>
                            </div>
                        </div>
                    </div>
                </div >
                : <></>}
            {/* {showForm && <UserForm user={user} toggleForm={toggleForm} options={options} />} */}
        </>
    );
};



export default UserTableRow;

