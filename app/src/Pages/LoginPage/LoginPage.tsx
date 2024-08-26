import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

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

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card w-100 max-w-md">
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
    );
};

export default LoginPage;