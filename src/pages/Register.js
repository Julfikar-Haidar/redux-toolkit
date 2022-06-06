import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};


export default function Register() {
    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password, firstName, lastName, confirmPassword } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Password should match");
        }
        if (email && password && firstName && lastName && confirmPassword) {
            dispatch(register({ formValue, navigate, toast }));
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-12 col-lg-11 col-xl-10">
                        <div className="card d-flex mx-auto my-5">
                            <div className="row">
                                <div className="col-md-5 col-sm-12 col-xs-12 c1 p-5">
                                    <div className="row mb-5 m-3"> <img src="https://i.imgur.com/pFfTOwy.jpg" width="70vw" height="55vh" alt="true" /> </div> <img src="https://i.imgur.com/kdE7GKw.jpg" width="120vw" height="210vh" className="mx-auto d-flex" alt="Teacher" />
                                    <div className="row justify-content-center">
                                        <div className="w-75 mx-md-5 mx-1 mx-sm-2 mb-5 mt-4 px-sm-5 px-md-2 px-xl-1 px-2">
                                            <h1 className="wlcm">Welcome to your blackboard</h1> <span className="sp1"> <span className="px-3 bg-danger rounded-pill" /> <span className="ml-2 px-1 rounded-circle" /> <span className="ml-2 px-1 rounded-circle" /> </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7 col-sm-12 col-xs-12 c2 px-5 pt-5">
                                    <div className="row">
                                        <nav className="nav font-weight-500 mb-1 mb-sm-2 mb-lg-5 px-sm-2 px-lg-5"> <a className="nav-link" href="#">Careers</a> <a className="nav-link ac" href="#">Students</a> <a className="nav-link" href="#">Admission</a> </nav>
                                    </div>
                                    <form name="myform" className="px-5 pb-5" onSubmit={handleSubmit} >
                                        <div className="d-flex"> <img src="https://i.imgur.com/oGcceAH.jpg" height="22px" width="22px" alt="true" className="mr-3 mt-2" />
                                            <h3 className="font-weight-bold"  >Register in</h3>
                                        </div>
                                        <input type="email" value={email} name="email" placeholder="Please provide your email" onChange={onInputChange} />
                                        <input type="password" name="password" value={password} placeholder="Password" onChange={onInputChange} />
                                        <input type="password" name="confirmPassword" value={confirmPassword} placeholder="confirmPassword" onChange={onInputChange} />
                                        <input type="text" name="firstName" value={firstName} placeholder="firstName" onChange={onInputChange} />
                                        <input type="text" name="lastName" value={lastName} placeholder="lastName" onChange={onInputChange} />

                                        <button className="text-white text-weight-bold bt" type='submit' >Register</button>
                                        <h5 className="ac" id="register">Login</h5>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
