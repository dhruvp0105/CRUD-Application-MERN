import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { addData, delData, updateData } from './context/ContextProvider';
import AddIcon from '@mui/icons-material/Add';

const Home = () => {

    const { udata } = useContext(addData);
    const { updata } = useContext(updateData);
    const { deletedata, setDeletedata } = useContext(delData);


    const [getuserData, setuserData] = useState([]);
    // console.log(getuserData);

    const getdata = async () => {

        const res = await fetch("https://crud-application-7iah.onrender.com/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json();
        // console.log(data);

        if (res.status === 404 || !data) {
            console.log("error");
        }
        else {
            setuserData(data);
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteUser = async (id) => {
        const res2 = await fetch(`https://crud-application-7iah.onrender.com/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const deldata = await res2.json();
        // console.log(deldata);

        if (res2.status === 404 || !deldata) {
            alert("error");
        }
        else {
            alert("user deleted");
            getdata();
            setDeletedata(deldata);
        }
    }

    return (
        <>
            {
                udata ? <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> User added Successfully
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> : ""
            }

            {
                updata ? <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> User updated Successfully
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> : ""
            }

            {
                deletedata ? <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> User deleted Successfully
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> : ""
            }


            <div className='mt-5'>
                <div className='container'>
                    <div className='add_btn mt-2'>
                        <NavLink to='/register'><button className='btn btn-primary'><AddIcon className='mx-1' />Add data</button></NavLink>
                    </div>
                    <table className="table mt-2">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserData.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className='d-flex justify-content-between'>
                                                    <NavLink to={`/view/${element._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`/edit/${element._id}`}><button className='btn btn-primary'><ModeEditOutlineIcon /></button></NavLink>
                                                    <button className='btn btn-danger' onClick={() => deleteUser(element._id)}><DeleteIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home