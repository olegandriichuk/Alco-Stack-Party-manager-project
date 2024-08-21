import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
// import { RegisterFormsInputs } from "../../Models/User.tsx";

// Define validation schema
export type RegisterFormsInputs = {
    email: string;
    userName: string;
    password: string;
    name?: string; // Optional if not required
    surname?: string; // Optional if not required
    phone?: string; // Optional if not required
    address: {
        Country?: string;
        Town?: string;
        Street?: string;
        ZipCode?: string;
    };
    photoUrl?: string; // Optional if not required
    formBackgroundUrl?: string; // Optional if not required
};

// Update validation schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().optional(),
    surname: Yup.string().optional(),
    phone: Yup.string().optional(),
    address: Yup.object().shape({
        Country: Yup.string().optional(),
        Town: Yup.string().optional(),
        Street: Yup.string().optional(),
        ZipCode: Yup.string().optional(),
    }),
    photoUrl: Yup.string().url("Invalid URL").optional(),
    formBackgroundUrl: Yup.string().url("Invalid URL").optional(),
});

const RegisterPage = () => {
    const { registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validationSchema) });

    const handleRegister = (form: RegisterFormsInputs) => {
        if (form.email && form.userName && form.password) {
            registerUser(
                form.email,
                form.userName,
                form.password,
                form.name || "", // Ensure default empty string for optional values
                form.surname || "",
                form.phone || "",
                form.address || { Country: "", Town: "", Street: "", ZipCode: "" },
                form.photoUrl || "",
                form.formBackgroundUrl || ""
            );
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card w-100 max-w-md">
                <div className="card-body p-5">
                    <h1 className="card-title mb-4 text-center">Create your account</h1>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email.message}</div>
                            )}
                        </div>
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
                                autoComplete="new-password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="••••••••"
                                {...register("password")}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                autoComplete="name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Name"
                                {...register("name")}
                            />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Surname</label>
                            <input
                                type="text"
                                id="surname"
                                autoComplete="surname"
                                className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                                placeholder="Surname"
                                {...register("surname")}
                            />
                            {errors.surname && (
                                <div className="invalid-feedback">{errors.surname.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                autoComplete="phone"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                placeholder="Phone"
                                {...register("phone")}
                            />
                            {errors.phone && (
                                <div className="invalid-feedback">{errors.phone.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input
                                type="text"
                                id="country"
                                autoComplete="country"
                                className={`form-control ${errors.address?.Country ? 'is-invalid' : ''}`}
                                placeholder="Country"
                                {...register("address.Country")}
                            />
                            {errors.address?.Country && (
                                <div className="invalid-feedback">{errors.address.Country.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="town" className="form-label">Town</label>
                            <input
                                type="text"
                                id="town"
                                autoComplete="town"
                                className={`form-control ${errors.address?.Town ? 'is-invalid' : ''}`}
                                placeholder="Town"
                                {...register("address.Town")}
                            />
                            {errors.address?.Town && (
                                <div className="invalid-feedback">{errors.address.Town.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="street" className="form-label">Street</label>
                            <input
                                type="text"
                                id="street"
                                autoComplete="street"
                                className={`form-control ${errors.address?.Street ? 'is-invalid' : ''}`}
                                placeholder="Street"
                                {...register("address.Street")}
                            />
                            {errors.address?.Street && (
                                <div className="invalid-feedback">{errors.address.Street.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="zipCode" className="form-label">Zip Code</label>
                            <input
                                type="text"
                                id="zipCode"
                                autoComplete="zipCode"
                                className={`form-control ${errors.address?.ZipCode ? 'is-invalid' : ''}`}
                                placeholder="Zip Code"
                                {...register("address.ZipCode")}
                            />
                            {errors.address?.ZipCode && (
                                <div className="invalid-feedback">{errors.address.ZipCode.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photoUrl" className="form-label">Photo URL</label>
                            <input
                                type="text"
                                id="photoUrl"
                                autoComplete="photoUrl"
                                className={`form-control ${errors.photoUrl ? 'is-invalid' : ''}`}
                                placeholder="Photo URL"
                                {...register("photoUrl")}
                            />
                            {errors.photoUrl && (
                                <div className="invalid-feedback">{errors.photoUrl.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formBackgroundUrl" className="form-label">Form Background URL</label>
                            <input
                                type="text"
                                id="formBackgroundUrl"
                                autoComplete="formBackgroundUrl"
                                className={`form-control ${errors.formBackgroundUrl ? 'is-invalid' : ''}`}
                                placeholder="Form Background URL"
                                {...register("formBackgroundUrl")}
                            />
                            {errors.formBackgroundUrl && (
                                <div className="invalid-feedback">{errors.formBackgroundUrl.message}</div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign up</button>
                        <p className="text-center mt-3">
                            Already have an account?{" "}
                            <Link to={"/"} className="text-primary">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;