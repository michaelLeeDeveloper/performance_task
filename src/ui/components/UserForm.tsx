import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActionCreators } from '../../state/actionCreators/actionCreators';
import Select from "react-select";

type ToggleForm = () => void;

type Props = { user: { "id": number, key: string, "first_name": string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void }, toggleForm: ToggleForm, options: Option[] };

interface Option {
    value: number,
    label: string
}

const UserForm: FC<Props> = (props: Props) => {
    const { user, toggleForm } = props;

    const { options } = props;

    const [currDistrict, setCurrDistrict] = useState();


    const dispatch = useDispatch();

    const { deleteUser, saveUser, editUser } = bindActionCreators(UserActionCreators, dispatch);

    const [userData, setUserData] = useState(user);


    const handleDeleteUser = (key: string) => {
        deleteUser(key);
    };

    interface User { "id": number, "first_name": string, key: string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void }

    const handleSave = (userToSave: User) => {
        saveUser(userToSave);
    };

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleDistrictChange = (selectedOption: any) => {
        setCurrDistrict(selectedOption);
        setUserData({
            ...userData, "district": selectedOption.value
        });
    };

    return (
        <div className="modal-modal show">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit User</h5>
                        <button type="button" className="btn close" onClick={() => {
                            editUser(user.key);
                            toggleForm();
                        }}
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form className="admin-new-user-form">
                        <div className="modal-body">
                            <div className="form-group row">
                                <label className="col-3 col-form-label" htmlFor="last_name">Last Name</label>
                                <div className="col-9">
                                    <input className="form-control" required id="lastName" type="text" name="last_name" placeholder={user.last_name} data-sb-validations="required" value={userData.last_name} onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })} />

                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label" htmlFor="first_name">First Name</label>
                                <div className="col-9">
                                    <input className="form-control" required id="firstName" type="text" name="first_name" placeholder={user.first_name} data-sb-validations="required" value={userData.first_name} onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label" htmlFor="middle_initial">Middle Initial</label>
                                <div className="col-9">
                                    <input className="form-control" id="middleInitial" type="text" name="middle_initial" placeholder={(user.middle_initial != null) ? user.middle_initial : "M.I."} value={(userData.middle_initial != null) ? userData.middle_initial : undefined} pattern="^[A-Za-z]$" title="Middle Initial" onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value.toUpperCase() })} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label" htmlFor="email">E-Mail</label>
                                <div className="col-9">
                                    <input className="form-control" required id="email" type="email" name="email" value={userData.email} placeholder={user.email} onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })} />

                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label" htmlFor="District">District</label>
                                <div className="col-9">
                                    <Select
                                        value={currDistrict}
                                        onChange={handleDistrictChange}
                                        options={options}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label form-check-label" htmlFor="active">Active</label>
                                <div className="col-9 text-center">
                                    <input className="form-check-input" id="active" type="checkbox" name="active" data-sb-validations="" checked={userData.active} onChange={e => setUserData({ ...userData, [e.target.name]: e.target.checked })} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label form-check-label" htmlFor="verified">Verified</label>
                                <div className="col-9 text-center">
                                    <input className="form-check-input" id="verified" type="checkbox" name="verified" data-sb-validations="" checked={userData.verified} onChange={e => setUserData({ ...userData, [e.target.name]: e.target.checked })} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label" htmlFor="District">Date Added</label>
                                <div className="col-9">
                                    <input className="form-control" id="createdAt" type="date" name="created_at" placeholder={userData.created_at.toString().slice(0, 10)} data-sb-validations="required" value={userData.created_at.toString().slice(0, 10)} onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={() => handleSave(userData)}>SAVE</button>
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                editUser(user.key);
                                toggleForm();
                            }}>Go Back</button>
                            <button className="btn btn-danger" onClick={toggleModal} type="button">DELETE</button>
                        </div>
                        {showModal ?
                            <div className="modal-container">
                                <div className="modal-modal show">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title text-dark" id="exampleModalLongTitle">Are you sure you want to delete {user.first_name} {user.last_name}</h5>

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
                            </div>
                            : <></>}
                    </form>
                </div >
            </div>
        </div>
    );
};

export default UserForm;