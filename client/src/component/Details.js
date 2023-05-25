import React, { useEffect, useState } from 'react'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const Details = () => {

    const navigate = useNavigate();

    const [getuserData, setuserData] = useState([]);
    // console.log(getuserData);

    const { id } = useParams("")
    // console.log(id);

    const getdata = async () => {

        const res = await fetch(`/getuser/${id}`, {
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
        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const deletedata = await res2.json();
        // console.log(deletedata);

        if (res2.status === 404 || !deletedata) {
            alert("error");
        }
        else {
            alert("user deleted");
            navigate('/')
        }
    }

    return (
        <div className='container mt-5'>
            <h1 style={{ fontWeight: 400 }}>Welcome {getuserData.name}</h1>
            <Card sx={{ maxWidth: 800 }}>
                <CardContent>
                    <div className="row">
                        <div className="left-view col-lg-6 col-md-6 col-12">
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0YtOC-DWcKhaIbwJDRuAlgKJKugPwp5dfhKKgOJf_UDtKQdOeZq9CQEetxDF1jmntumU&usqp=CAU' style={{ width: 100, borderRadius: '40px' }} alt='profile'></img>
                            <h3 className='mt-3'>Name : <span style={{ fontWeight: 400 }}>{getuserData.name}</span></h3>
                            <h3 className='mt-3'>Age : <span style={{ fontWeight: 400 }}>{getuserData.age}</span></h3>
                            <h4 className='mt-3'><MailIcon />Email : <span style={{ fontWeight: 400 }} >{getuserData.email}</span></h4>
                            <h4 className='mt-3'><WorkIcon />Occupation : <span style={{ fontWeight: 400 }}>{getuserData.work}</span></h4>
                        </div>

                        <div className="right-view col-lg-6 col-md-6 col-12">
                            <div className="add_btn" style={{ marginRight: '20px' }}>
                                <NavLink to={`/edit/${getuserData._id}`}><button className='btn btn-primary mx-3'><ModeEditOutlineIcon /></button></NavLink>
                                <button className='btn btn-danger' onClick={() => deleteUser(getuserData._id)}><DeleteIcon /></button>
                            </div>
                            <h4 className='mt-5'><PhoneIphoneIcon />Mobile : <span style={{ fontWeight: 400 }} >+91 {getuserData.mobile}</span></h4>
                            <h4 className='mt-3'><LocationOnIcon />Location : <span style={{ fontWeight: 400 }}>{getuserData.address}</span></h4>
                            <h5 className='mt-4'>Description : <span style={{ fontWeight: 400 }}>{getuserData.description}</span></h5>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details