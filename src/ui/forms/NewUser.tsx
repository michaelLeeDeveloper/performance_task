import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActionCreators } from '../../state/actionCreators/actionCreators';
import Select from "react-select";

interface Option {
    value: number,
    label: string
}

type Props = { options: Option[] };

const NewUserForm: React.FC<Props> = ({ options }: Props) => {

    const dispatch = useDispatch();

    const { addUser } = bindActionCreators(UserActionCreators, dispatch);

    const [formValues, setFormValues] = useState({
        first_name: '',
        last_name: '',
        middle_initial: '',
        active: true,
        district: 1,
        key: "",
        email: "",
        id: -1,
        isEditing: false,
        created_at: new Date(),
        verified: false
    });

    const [showForm, setshowForm] = useState(false);

    const toggleForm = () => {
        setshowForm(!showForm);
    };

    const handleSave = (newUser: string) => {
        if (formValues.first_name && formValues.last_name && formValues.email) {
            setshowForm(!showForm);
            addUser(newUser);
        } else {
            alert("First Name, Last Name and E-mail are required.");
        }
    };

    const handleChange = (evt: ChangeEvent) => {
        if ((evt.target! as HTMLInputElement).type == "checkbox") {
            setFormValues({
                ...formValues,
                [(evt.target! as HTMLInputElement).name]: (evt.target! as HTMLInputElement).checked
            });
        } else {
            if ((evt.target! as HTMLInputElement).name === "middle_initial") {
                setFormValues({
                    ...formValues,
                    [(evt.target! as HTMLInputElement).name]: (evt.target! as HTMLInputElement).value.toUpperCase()
                });
            } else setFormValues({
                ...formValues,
                [(evt.target! as HTMLInputElement).name]: (evt.target! as HTMLInputElement).value
            });
        }
    };

    const [currDistrict, setCurrDistrict] = useState();

    const handleDistrictChange = (selectedOption: any) => {
        setCurrDistrict(selectedOption);
        setFormValues({
            ...formValues, "district": selectedOption.value
        });
    };

    return (
        <div>
            {showForm ? (
                <div className="modal-modal show" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add New User</h5>

                                <button type="button" className="close btn" onClick={toggleForm} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form className="admin-new-user-form">
                                <div className="modal-body">
                                    <div className="form-group row">
                                        <label className="col-3 col-form-label" htmlFor="last_name">Last Name</label>
                                        <div className="col-9">
                                            <input className="form-control" id="lastName" type="text" name="last_name" placeholder="Last Name"
                                                value={formValues["last_name"]} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-3 col-form-label" htmlFor="first_name">First Name</label>
                                        <div className="col-9">
                                            <input className="form-control" id="firstName" type="text" name="first_name" placeholder="First Name"
                                                value={formValues.first_name} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-3 col-form-label" htmlFor="middle_initial">Middle Initial</label>
                                        <div className="col-9">
                                            <input className="form-control" id="middleInitial" type="text" name="middle_initial"
                                                placeholder="Middle Initial" value={formValues.middle_initial} pattern="^[A-Za-z]$" title="Middle Initial"
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-3 col-form-label" htmlFor="email">E-Mail</label>
                                        <div className="col-9">
                                            <input className="form-control" id="email" type="email" name="email" value={formValues.email} placeholder="E-Mail" title="Email" onChange={handleChange} required />
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
                                        <div className="col-9">
                                            <input className="form-check-input" id="active" type="checkbox" name="active"
                                                defaultChecked={true} onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-success" onClick={() => handleSave(JSON.stringify(formValues))}>SAVE</button>

                                    <button type="button" className="btn btn-secondary" onClick={toggleForm}>Go Back</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >) : <button type="button" className="btn btn-secondary" onClick={toggleForm}>Add New User</button>
            }
        </div >);
};


export default NewUserForm;