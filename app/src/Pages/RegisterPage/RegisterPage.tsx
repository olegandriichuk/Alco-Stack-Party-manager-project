import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {Address, DateOfBirth} from "../../Models/User";


export type RegisterFormsInputs = {
    email: string;
    userName: string;
    password: string;
    firstName?: string;
    lastName?: string;
    gender?: number; // Assuming gender is an enum or a number
    dateOfBirth?: DateOfBirth;
    address?: Address;
    phone?: string;
    photo?: string;
    formBackgroundUrl?: string;
    bio?: string;
};


// Update validation schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    firstName: Yup.string().optional(),
    lastName: Yup.string().optional(),
    gender: Yup.number().optional(),
    dateOfBirth: Yup.object().shape({
        year: Yup.number().required("Year is required"),
        month: Yup.number().required("Month is required"),
        day: Yup.number().required("Day is required"),
        dayOfWeek: Yup.string().required("Day of week is required")
    }).optional(),
    address: Yup.object().shape({
        StreetAddress: Yup.string().optional(),
        City: Yup.string().optional(),
        PostalCode: Yup.string().optional(),
        Country: Yup.string().optional()
    }).optional(),
    phone: Yup.string().optional(),
    photo: Yup.string().optional(),
    formBackgroundUrl: Yup.string().optional(),
    bio: Yup.string().optional()
});



const RegisterPage = () => {
    const { registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validationSchema) });

    const handleRegister = (form: RegisterFormsInputs) => {
        registerUser(
            form.email,
            form.userName,
            form.password,
            form.firstName || "",
            form.lastName || "",
            form.phone || "",
            form.address || { StreetAddress: "", City: "", PostalCode: "", Country: "" },
            form.photo || "",
            form.bio || "",
            form.formBackgroundUrl || "",
            form.gender || 0,
            form.dateOfBirth || { year: 0, month: 0, day: 0, dayOfWeek: "" }
        );
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card w-100 max-w-md m-3">
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
                            <label htmlFor="userName" className="form-label">Username</label>
                            <input
                                type="text"
                                id="userName"
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
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                autoComplete="given-name"
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                placeholder="First Name"
                                {...register("firstName")}
                            />
                            {errors.firstName && (
                                <div className="invalid-feedback">{errors.firstName.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                autoComplete="family-name"
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                placeholder="Last Name"
                                {...register("lastName")}
                            />
                            {errors.lastName && (
                                <div className="invalid-feedback">{errors.lastName.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <input
                                type="number"
                                id="gender"
                                autoComplete="gender"
                                className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                                placeholder="Gender"
                                {...register("gender")}
                            />
                            {errors.gender && (
                                <div className="invalid-feedback">{errors.gender.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                            <div className="d-flex gap-2">
                                <input
                                    type="number"
                                    id="dateOfBirthYear"
                                    autoComplete="bday-year"
                                    className={`form-control ${errors.dateOfBirth?.year ? 'is-invalid' : ''}`}
                                    placeholder="Year"
                                    {...register("dateOfBirth.year")}
                                />
                                <input
                                    type="number"
                                    id="dateOfBirthMonth"
                                    autoComplete="bday-month"
                                    className={`form-control ${errors.dateOfBirth?.month ? 'is-invalid' : ''}`}
                                    placeholder="Month"
                                    {...register("dateOfBirth.month")}
                                />
                                <input
                                    type="number"
                                    id="dateOfBirthDay"
                                    autoComplete="bday-day"
                                    className={`form-control ${errors.dateOfBirth?.day ? 'is-invalid' : ''}`}
                                    placeholder="Day"
                                    {...register("dateOfBirth.day")}
                                />
                                <input
                                    type="number"
                                    id="dateOfBirthDayOfWeek"
                                    autoComplete="bday-dayOfWeek"
                                    className={`form-control ${errors.dateOfBirth?.dayOfWeek ? 'is-invalid' : ''}`}
                                    placeholder="Day of Week"
                                    {...register("dateOfBirth.dayOfWeek")}
                                />
                            </div>
                            {errors.dateOfBirth && (
                                <div className="invalid-feedback">
                                    {errors.dateOfBirth.year?.message || errors.dateOfBirth.month?.message || errors.dateOfBirth.day?.message || errors.dateOfBirth.dayOfWeek?.message}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressStreetAddress" className="form-label">Street Address</label>
                            <input
                                type="text"
                                id="addressStreetAddress"
                                autoComplete="addressStreetAddress"
                                className={`form-control ${errors.address?.StreetAddress ? 'is-invalid' : ''}`}
                                placeholder="Street Address"
                                {...register("address.StreetAddress")}
                            />
                            {errors.address?.StreetAddress && (
                                <div className="invalid-feedback">{errors.address.StreetAddress.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressCity" className="form-label">City</label>
                            <input
                                type="text"
                                id="addressCity"
                                autoComplete="addressCity"
                                className={`form-control ${errors.address?.City ? 'is-invalid' : ''}`}
                                placeholder="City"
                                {...register("address.City")}
                            />
                            {errors.address?.City && (
                                <div className="invalid-feedback">{errors.address.City.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressPostalCode" className="form-label">Postal Code</label>
                            <input
                                type="text"
                                id="addressPostalCode"
                                autoComplete="addressPostalCode"
                                className={`form-control ${errors.address?.PostalCode ? 'is-invalid' : ''}`}
                                placeholder="Postal Code"
                                {...register("address.PostalCode")}
                            />
                            {errors.address?.PostalCode && (
                                <div className="invalid-feedback">{errors.address.PostalCode.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressCountry" className="form-label">Country</label>
                            <input
                                type="text"
                                id="addressCountry"
                                autoComplete="addressCountry"
                                className={`form-control ${errors.address?.Country ? 'is-invalid' : ''}`}
                                placeholder="Country"
                                {...register("address.Country")}
                            />
                            {errors.address?.Country && (
                                <div className="invalid-feedback">{errors.address.Country.message}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Photo URL</label>
                            <input
                                type="text"
                                id="photo"
                                autoComplete="photo"
                                className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
                                placeholder="Photo URL"
                                {...register("photo")}
                            />
                            {errors.photo && (
                                <div className="invalid-feedback">{errors.photo.message}</div>
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
                        <div className="mb-3">
                            <label htmlFor="bio" className="form-label">Bio</label>
                            <input
                                type="text"
                                id="bio"
                                autoComplete="bio"
                                className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                                placeholder="Bio"
                                {...register("bio")}
                            />
                            {errors.bio && (
                                <div className="invalid-feedback">{errors.bio.message}</div>
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
