import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import './LoginForm.scss'
import axios from "axios";
import {FormattedMessage} from 'react-intl'

interface Props {

    onSubmit: CallableFunction
    onChange: CallableFunction
    email: string
    password: string
    showInvalidCredentialsError: CallableFunction
    invalid: boolean
}

export default function LoginForm(props: Props) {
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit() {
        const formData = new FormData()
        formData.append("username", props.email);
        formData.append("password", props.password);
        axios.post('http://localhost:8080/login', formData,
            {
                withCredentials: true,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                }
            })
            .then((response) => {
                if (response.status !== 403 && response.status !== 401) {
                    navigate("/");
                    props.onSubmit()
                }
            }).catch((error) =>{
                if (error){
                    setError(true);
                }
        } );
    }

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-center align-items-center">
                <div className="w-50">
                    <div className=" login-container p-3 mb-5 rounded card">
                        <div className="m-2">
                            <h2 className="text-center mt-3 mb-5">Sign in</h2>
                            <div className="">
                                {error &&
                                <div className="alert alert-danger mt-3 mb-3">
                                    <strong>
                                        <FormattedMessage tagName={"label"} id={"login.error"}/>
                                    </strong>
                                </div>}
                                {props.invalid &&
                                <div className="alert alert-danger mt-3 mb-3">Invalid credentials</div>}
                                <div className="mb-3 form-group">
                                    <label htmlFor="email"><FormattedMessage id ={"user.email"}/></label>
                                    <input onChange={e => {
                                        props.onChange(e);
                                        setError(false)
                                    }} type="email" value={props.email} required={true} name="email"
                                           className="form-control" id="email"
                                           aria-describedby="emailHelp" placeholder="Enter your email here"/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your
                                        email with anyone
                                        else.</small>
                                </div>
                                <div className=" mb-3 form-group">
                                    <label htmlFor="password"><FormattedMessage tagName={"label"} id={"user.password"}/></label>
                                    <input required={true} onChange={e => {
                                        props.onChange(e);
                                        setError(false)
                                    }} type="password" name="password"
                                           className="form-control" id="password"
                                           placeholder="enter your password here"/>
                                </div>
                                <div className="form-check mb-5">
                                    <label>
                                        <input onChange={e => {
                                            props.onChange(e);
                                            setError(false)
                                        }} type="checkbox"
                                               className="form-check-input" name="_remember_me"/>Remember
                                        me
                                    </label>
                                </div>

                                <div className="mb-3 form-group">
                                    <button onClick={() => handleSubmit()} type="submit"
                                            className={"submit-btn btn btn-primary"}>Sign in
                                    </button>
                                </div>
                                <input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}"/>
                            </div>
                            <div className="mb-1 m-lg-1">
                                <Link to={"/register"}><a>No Account yet? Register now</a></Link>
                            </div>

                            <input type={"hidden"} name={"_csrf"}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}





