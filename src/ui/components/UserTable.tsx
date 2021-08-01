import React from 'react';
import UserTableRow from './UserTableRow';
import { v4 as uuidv4 } from 'uuid';
import { Table } from "react-bootstrap";

type Props = { users: { "id": number, "first_name": string, key: string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void }[], options: Option[] };
interface Option {
    value: number,
    label: string
}
const UserTable: React.FC<Props> = ({ users, options }: Props) => {



    interface User { "id": number, key: string, "first_name": string, "last_name": string, "email": string, "verified": boolean, "middle_initial": string | null, "created_at": Date, "district": number, "active": boolean, isEditing: boolean | void }

    console.log(users);

    const renderUserListItems = () => users.map((user: User) => {
        const keyUUID = uuidv4();
        return (
            <tr key={keyUUID}>
                <UserTableRow user={user} key={keyUUID} />
            </tr>
        );
    });


    return (
        <div className="admin-user-table ">
            <h2 className="text-center my-5">Users</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">First Name</th>
                        <th scope="col">M. I.</th>
                        <th scope="col">District</th>
                        <th scope="col">Verified</th>
                        <th scope="col">Active</th>
                        <th scope="col">Date Added</th>
                        <th scope="col">Admin Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderUserListItems()}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;