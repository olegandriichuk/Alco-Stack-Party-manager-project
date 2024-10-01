import React, {  useState } from 'react';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import backgroundImage from '../../assets/backcov1.svg';
import Disco from '../../assets/disco.svg';
import video from '../../assets/viddd2.mp4';
import './LoginPage.css';
type LoginFormsInputs = {
    userName: string;
    password: string;
};

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
    const { loginUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.userName, form.password);
    };

    // To detect mobile view
    const isMobile = window.innerWidth <= 768;

    // Shake effect state
    const [isShaking, setIsShaking] = useState(false);

    // Handle click event for shake animation
    const handleIconClick = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500); // Stop shaking after 500ms
    };

    // Define the shake animation using CSS
    const shakeAnimation = `
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }
    `;

    return (
        <div className="container-fluid d-flex p-0 full-height-login">
            <div className="video-left flex-grow-1">
                <video className="background-video-login left" autoPlay loop muted>
                    <source src={video} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
            <div
                className="container-fluid p-0 d-flex flex-column align-items-center custom-background square-container-login flex-grow-7"
                style={{
                    backgroundColor: '#DDE4EE',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: isMobile ? '-2px 10px' : '16px 10px',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <style>{shakeAnimation}</style>


                <div style={{position: 'absolute', top: '-1.5px', left: '5px', zIndex: 1000}}>
                    <img
                        src={Disco}
                        alt="Disco Icon"
                        width="80"
                        height="80"
                        style={{
                            cursor: 'pointer',
                            animation: isShaking ? 'shake 0.5s' : 'none',
                        }}
                        onClick={handleIconClick} // Запуск анимации при клике
                    />
                </div>
                <div className="card w-100 max-w-md"
                     style={{maxWidth: '1000px', backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
                    <div className="card-body p-5">
                        <h1 className="card-title mb-4 text-center">Sign in to your account</h1>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    autoComplete="username"
                                    className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                                    placeholder="Username"
                                    {...register("userName")}
                                />
                                {errors.userName && (
                                    <div className="invalid-feedback">{errors.userName.message}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="••••••••"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password.message}</div>
                                )}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <a href="#" className="text-primary">Forgot password?</a>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Sign in</button>
                            <p className="text-center mt-3">
                                Don't have an account yet?{" "}
                                <Link to={"/register"} className="text-primary">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="video-right flex-grow-1">
                <video className="background-video_r-login right" autoPlay loop muted>
                    <source src={video} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default LoginPage;