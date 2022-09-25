import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    //   const [data, setData] = useState({});
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        //    setData(data);
        try {
            let url = 'http://127.0.0.1:5000/signup';
            const res = await axios.post(url, data);
            if (res.data.msg) {
                alert(res.data.msg);
                navigate("/login");
            }
        } catch (error) {
            alert("Email ID already registered.");
        }
    }
    return (
        <div>
            <form className='w-50 m-auto p-4 mt-5' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-center'>Signup</h1>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Name :</label>
                    <input type="text" className="form-control"
                        {...register("name")}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email ID :</label>
                    <input type="email" className="form-control"
                        {...register("email")}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input type="password" className="form-control"
                        {...register("password")}
                    />
                </div>
                <div className="form-group submit-container">
                    <input type="submit" value="Submit" className="btn btn-dark" />
                    <Link to="/login">
                        Already have an account? Login here.
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Signup