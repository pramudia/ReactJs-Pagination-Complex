import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBBtnGroup,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
} from 'mdb-react-ui-kit';

import { toast } from 'react-toastify';

function AllUser() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLimit] = useState(4);
    const [sortFilterValue, setSortFilterValue] = useState("");
    const [operation, setOperation] = useState("");

    const sortOption = ["name", "email", "phone", "address", "status"];

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        loadUserData(0, 4, 0);

    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    const loadUserData = async (start, end, increase, optType = null, filterOrSortValue) => {
        switch (optType) {
            case "search":
                setOperation(optType)
                setSortValue("")
                return await axios.get(`http://localhost:5000/user?q=${value}&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                        setCurrentPage(currentPage + increase);
                    })
                    .catch((error) => console.log(error));

            case "sort":
                setOperation(optType)
                setSortFilterValue(filterOrSortValue)
                return await axios.get(`http://localhost:5000/user?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                        setCurrentPage(currentPage + increase);
                    })
                    .catch((error) => console.log(error));

            case "filter":
                setOperation(optType)
                setSortFilterValue(filterOrSortValue)
                return await axios.get(`http://localhost:5000/user?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                        setCurrentPage(currentPage + increase);
                    })
                    .catch((error) => console.log(error));

            default:
                return await axios.get(`http://localhost:5000/user?_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data)
                        setCurrentPage(currentPage + increase)
                    })
                    .catch((error) => console.log(error));
        }

    };

    const handleSeacrh = async (e) => {
        e.preventDefault();
        loadUserData(0, 4, 0, "search");
    }

    const handleReset = () => {
        setOperation("");
        setValue("");
        setSortFilterValue("");
        setSortValue("");
        loadUserData(0, 4, 0);
    }

    const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value);
        loadUserData(0, 4, 0, "sort", value);
    }

    const handleFilter = async (value) => {

        loadUserData(0, 4, 0, "filter", value);

        // return axios.get(`http://localhost:5000/user?status=${value}`)
        //   .then((response) => {
        //     setData(response.data);
        //   })
        //   .catch((error) => console.log(error));

    }

    const renderPagination = () => {
        if (data.length < 4 && currentPage === 0) return null;
        if (currentPage === 0) {
            return (
                <MDBPagination className='mb-0'>

                    <MDBPaginationItem>
                        <MDBPaginationLink>1</MDBPaginationLink>
                    </MDBPaginationItem>

                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUserData(4, 8, 1, operation, sortFilterValue)}>Next</MDBBtn>
                    </MDBPaginationItem>

                </MDBPagination>
            )
        } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
            return (
                <MDBPagination className='mb-0'>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUserData((currentPage - 1) * 4, currentPage * 4, -1, operation, sortFilterValue)}>Prev</MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>

                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUserData((currentPage + 1) * 4, (currentPage + 2) * 4, 1, operation, sortFilterValue)}>Next</MDBBtn>
                    </MDBPaginationItem>

                </MDBPagination>
            )
        } else {
            return (
                <MDBPagination className='mb-0'>

                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUserData((currentPage - 1) * 4, currentPage * 4, -1, operation, sortFilterValue)}>prev</MDBBtn>
                    </MDBPaginationItem>

                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }
    }

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure to delete this user.?")) {
            const response = await axios.delete(`http://localhost:5000/user/${id}`);
            if (response.status === 200) {
                toast.success("User deleted successfully");
                loadUserData(0, 4, 0, operation, sortFilterValue)
            }
        }
    };


    return (
        <MDBContainer>
            <h2 className='text-center' style={{ marginTop: '30px' }}>Search, Filter, Sort, and Pagination using JSON SERVER  Fake Rest API</h2>

            <form style={{
                margin: 'auto',
                marginTop: '40px',
                padding: '15px',
                maxwidth: '40px',
                alignContent: 'center',
            }}
                className='d-flex input-group w-auto'
                onSubmit={handleSeacrh}>
                <input type="text" className='form-control' placeholder='Search Name ...' value={value} onChange={(e) => setValue(e.target.value)} />

                <MDBBtn type='submit' color='dark' style={{ height: "40px", marginTop: "5px" }} >Search</MDBBtn>
                <MDBBtn className='mx-2' color='info' onClick={() => handleReset()} style={{ height: "40px", marginTop: "5px" }}>Reset</MDBBtn>
                <Link to='/add' >
                    <MDBBtn style={{ height: "40px", marginTop: "5px" }}>Add User</MDBBtn>
                </Link>


            </form>
            <div style={{ marginTop: "20px" }}>

                <MDBRow>
                    <MDBCol size="12">
                        <MDBTable>
                            <MDBTableHead dark>
                                <tr className='text-center'>
                                    <th scope='col'>No . </th>
                                    <th scope='col'>Name </th>
                                    <th scope='col'>Email </th>
                                    <th scope='col'>Phone </th>
                                    <th scope='col'>Adress </th>
                                    <th scope='col'>Status </th>
                                    <th scope='col'>Action </th>
                                </tr>
                            </MDBTableHead>
                            {
                                data.length === 0 ? (
                                    <MDBTableBody className='align-center mb-0'>
                                        <tr>
                                            <td className='text-center mb-0' colSpan={8}>No Data Found</td>
                                        </tr>
                                    </MDBTableBody>
                                ) : (
                                    data.map((item, index) => (
                                        <MDBTableBody key={index}>
                                            <tr className='text-center'>
                                                <th scope='row'>{index + 1}</th>
                                                <th>{item.name}</th>
                                                <th>{item.email}</th>
                                                <th>{item.phone}</th>
                                                <th>{item.address}</th>
                                                <th>{item.status}</th>
                                                <th>
                                                    <Link to={`/edit/${item.id}`}>
                                                        <MDBBtn color='info' size='sm'>Edit</MDBBtn>
                                                    </Link>
                                                    <MDBBtn color='danger' size='sm' onClick={() => handleDeleteUser(item.id)}>Delete</MDBBtn>
                                                </th>
                                            </tr>
                                        </MDBTableBody>
                                    ))
                                )
                            }
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
                <div style={{
                    margin: 'auto',
                    marginTop: '25px',
                    padding: '15px',
                    maxwidth: '400px',
                    alignContent: 'center',
                    marginLeft: '525px',
                }}>{renderPagination()}</div>
            </div>

            {data.length > 0 && (
                <MDBRow>
                    <MDBCol size="8" >
                        <h5>Sort By : </h5>
                        <select style={{ width: "25%", borderRadius: "2px", height: "45px", marginBottom: "80px" }} onChange={handleSort} value={sortValue}>

                            <option>Please Select Value</option>
                            {
                                sortOption.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </MDBCol>
                    <MDBCol size="4">
                        <h5>Filter By Status</h5>
                        <MDBBtnGroup>
                            <MDBBtn color='success' onClick={() => handleFilter("Active")}>Active</MDBBtn>
                            <MDBBtn color='danger' style={{ margin: "auto" }} onClick={() => handleFilter("Inactive")}>InActive</MDBBtn>
                        </MDBBtnGroup>
                    </MDBCol>
                </MDBRow>
            )}
        </MDBContainer>
    );
}

export default AllUser;
