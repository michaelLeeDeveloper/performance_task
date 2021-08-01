import React, { FC, useState } from 'react';
import MaterialTable from "material-table";
import { useDispatch } from 'react-redux';
import { UserActionCreators } from '../../state/actionCreators/actionCreators';
import { bindActionCreators } from 'redux';
import PatchedPagination from "./PatchedPagination";
import UserForm from "./UserForm";

type Props = { users: { "id": number, key: string, "first_name": string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void }[], options: Option[] };

interface Option {
    value: number,
    label: string
}

interface User { "id": number, key: string, "first_name": string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void }

const MaterialUserTable: FC<Props> = ({ users, options }: Props) => {

    const dispatch = useDispatch();

    const { deleteUser } = bindActionCreators(UserActionCreators, dispatch);

    const [showModal, setShowModal] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>(users[0]);

    const handleDeleteUser = (key: string) => {
        deleteUser(key);
        toggleModal();
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            {showForm && <UserForm user={currentUser} toggleForm={toggleForm} options={options} />}
            <MaterialTable
                title=""
                columns={[
                    { title: '#', field: 'id', type: "numeric" },
                    { title: 'Last Name', field: 'last_name' },
                    { title: 'First Name', field: 'first_name' },
                    { title: 'M.I.', field: 'middle_initial' },
                    { title: 'District', field: 'district', type: "numeric" },
                    {
                        title: 'Verified',
                        field: 'verified',
                        render: (rowData: any) => {
                            if (rowData.verified) { return <><i className="bi bi-check2-circle"></i>Verified</>; } else return <i className="bi bi-x-lg"></i>;
                        }
                    },
                    {
                        title: 'Active', field: 'active', render: (rowData: any) => {
                            if (rowData.active) { return <><i className="bi bi-check2-circle"></i>Active</>; } else return <i className="bi bi-x-lg"></i>;
                        }
                    },
                    { title: 'Date Added', field: 'created_at' }
                ]}
                data={users}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData: any) => {
                            console.log(rowData);
                            setCurrentUser(users.filter((user) => user.id === rowData.id)[0]);
                            toggleForm();
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData: any) => {
                            toggleModal();
                            setCurrentUser(users.filter((user) => user.id === rowData.id)[0]);
                        }
                    }
                ]}
                components={{
                    Pagination: PatchedPagination,
                }}
                style={{ zIndex: 0 }}
            />
            {showModal ?
                <div className="modal-modal show">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure you want to delete {currentUser.first_name} {currentUser.last_name}</h5>

                                <button type="button" className="btn close" onClick={toggleModal}
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Go Back</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(currentUser.key)}>Yes, Delete</button>
                            </div>
                        </div>
                    </div>
                </div >
                : <></>}
        </>
    );
};

export default MaterialUserTable;

