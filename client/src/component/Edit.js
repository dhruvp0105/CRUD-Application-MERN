import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { updateData } from './context/ContextProvider';

const Edit = () => {

    const { setUpdata } = useContext(updateData);
    const navigate = useNavigate();

    const [inpval, setInp] = useState({
        name: '',
        email: '',
        age: '',
        mobile: '',
        work: '',
        address: '',
        description: ''
    })

    const setdata = (e) => {
        const { name, value } = e.target;

        setInp((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

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
            setInp(data);
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const updateuser = async (e) => {
        e.preventDefault();
        const { name, email, age, mobile, work, address, description } = inpval;
        const res2 = await fetch(`/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, age, mobile, work, address, description
            })
        })

        const data2 = await res2.json();
        // console.log(data2);

        if (res2.status === 404 || !data2) {
            alert("fill the data");
        }
        else {
            alert("data updated");
            navigate('/');
            setUpdata(data2);
        }

    }

    return (
        <>
            <div className="container">
                <NavLink to='/'>Home</NavLink>
                <form className='mt-4'>
                    <div className="row">

                        <div className="mb-3 col-lg-6 col-md-6 col-12  ">
                            <label for="exampleName" className="form-label">Name</label>
                            <input type="text" name='name' value={inpval.name} onChange={setdata} className="form-control" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-6 col-12" >
                            <label for="exampleEmail" className="form-label">Email</label>
                            <input type="email" name='email' value={inpval.email} onChange={setdata} className="form-control" />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-6 col-12" >
                            <label for="exampleInputPassword1" className="form-label">Age</label>
                            <input type="text" name='age' value={inpval.age} onChange={setdata} className="form-control" />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-6 col-12" >
                            <label for="exampleInputPassword1" className="form-label">Mobile</label>
                            <input type="number" name='mobile' value={inpval.mobile} onChange={setdata} className="form-control" />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-6 col-12" >
                            <label for="exampleInputPassword1" className="form-label">Work</label>
                            <input type="text" name='work' value={inpval.work} onChange={setdata} className="form-control" />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-6 col-12" >
                            <label for="exampleInputPassword1" className="form-label">Address</label>
                            <input type="text" name='address' value={inpval.address} onChange={setdata} className="form-control" />
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                            <textarea name='description' value={inpval.description} onChange={setdata} className="form-control" rows="6"></textarea>
                        </div>

                        <button type="submit" onClick={updateuser} className="btn btn-primary">Edit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Edit