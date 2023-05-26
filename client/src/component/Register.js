import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { addData } from './context/ContextProvider';

const Register = () => {

    const { setUdata } = useContext(addData);

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

    const submitdata = async (e) => {
        e.preventDefault();

        const { name, email, age, mobile, work, address, description } = inpval;

        const res = await fetch("https://crud-application-7iah.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, age, mobile, work, address, description
            })
        })

        const data = await res.json();
        // console.log(data);

        if (res.status === 404 || !data) {
            alert("error");
        }
        else {
            alert("Register successfull")
            navigate('/')
            setUdata(data);
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
                            <input type="text" name='mobile' value={inpval.mobile} onChange={setdata} className="form-control" />
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

                        <button type="submit" onClick={submitdata} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Register