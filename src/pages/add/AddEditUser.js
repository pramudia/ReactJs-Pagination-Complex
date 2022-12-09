import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./AddEditUser.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';

const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    status: ""
}



const AddEditUser = () => {
    const [state, setState] = useState(initialState);

    const { name, email, phone, address, status } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id])


    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`)
        if (response.status === 200) {
            setState(response.data);

        }
    }

    const addUser = async (data) => {
        const response = await axios.post("http://localhost:5000/user", data);
        if (response.status === 201) {
            toast.success("User Added Successfully");
            navigate("/");
        }
    }

    const updateUser = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/user/${id}`, data);
        if (response.status === 200) {
            toast.success("User Updated Successfully");
            navigate("/");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id) {
            addUser(state);
        } else {
            updateUser(state, id);
        }
        navigate("/");
    }

    const handelInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }


    const backToHome = () => {
        navigate("/")
    }



    return (
        <>
            <div className='divForm'>
                <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type="text" name="name" id='name' placeholder='your name..' onChange={handelInputChange} value={name} required />

                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" id='email' placeholder='your email..' onChange={handelInputChange} value={email} required />

                    <label htmlFor='phone'>Phone</label>
                    <input type="number" name="phone" id='phone' placeholder='your phone..' onChange={handelInputChange} value={phone} required />

                    <label htmlFor='address'>Address</label>
                    <input type="text" name="address" id='address' placeholder='your city..' onChange={handelInputChange} value={address} required />

                    <label htmlFor='status'>Status</label>
                    <select id="status" name="status" onChange={handelInputChange} value={status}>
                        <option value="Active">Aktive</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <input type="submit" color='info' style={{ marginTop: "45px" }} value={id ? "Update" : "Add User"} ></input>

                </form>
                <MDBBtn onClick={backToHome} style={{ maxWidth: "100%" }}>Back to Home</MDBBtn>
            </div>
        </>
    )
}

export default AddEditUser