import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    //   const [data, setData] = useState({});
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        //    setData(data);
        try {
            let url = 'http://127.0.0.1:5000/login';
            const res = await axios.post(url, data);
            console.log(res.data);
            alert("Logged In successfully.");
            sessionStorage.setItem("user", JSON.stringify(res.data));
            navigate("/");
        } catch (error) {
            alert(error.response.data.msg);
            // alert(error);
        }
    }
    React.useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        if (userData) {
            navigate("/");
        }
    }, []);
    return (
        <div>
            <form className='w-50 m-auto p-4 mt-5' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-center'>Login</h1>
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
                    <Link to="/signup">Don't have an account? Create One</Link>
                </div>
            </form>
        </div>
    )
}

export default Login