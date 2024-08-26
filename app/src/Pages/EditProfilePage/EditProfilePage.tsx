import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProfile } from "../../Models/User";
import { UpdateProfileAPI } from "../../Services/UserService";
import Disco from '../../assets/disco.svg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {DatePicker} from "rsuite";


const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    userName: Yup.string().required("Username is required"),
    firstName: Yup.string().optional(),
    lastName: Yup.string().optional(),
    phoneNumber: Yup.string().optional(),
    bio: Yup.string().optional(),
    photo: Yup.string().optional(),
    formBackgroundUrl: Yup.string().optional(),
    gender: Yup.number().optional(),
    dateOfBirth: Yup.string().matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Date of Birth must be in YYYY-MM-DD format"
    ).optional(),
    address: Yup.object().shape({
        streetAddress: Yup.string().optional(),
        city: Yup.string().optional(),
        postalCode: Yup.string().optional(),
        country: Yup.string().optional()
    }).optional(),
});

const EditProfilePage: React.FC = () => {
    const { user, token, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<UserProfile>({
        resolver: yupResolver(validationSchema),
    });


    useEffect(() => {
        if (user) {
            console.log('User data:', user);
            Object.keys(user).forEach((key) => {
                setValue(key as keyof UserProfile, user[key as keyof UserProfile]);
            });
        }
    }, [user, setValue]);

    const handleUpdate = async (formData: UserProfile) => {
        // console.log("Token:", token);
        console.log("Form data:", formData);
        if (!token) {
            toast.error("You must be logged in to update your profile");
            return;
        }
        try {
            const response = await UpdateProfileAPI(
                formData.email,
                formData.userName,
                formData.firstName || "",
                formData.lastName || "",
                formData.bio || "",
                formData.dateOfBirth || "",
                formData.photo || "",
                formData.phoneNumber || "",
                formData.address || { streetAddress: "", city: "", postalCode: "", country: "" },
                formData.formBackgroundUrl || "",
                formData.gender,
                token
            );
            if (response && response.data) {
                console.log('Profile updated:', response.data);
                // toast.success('Profile updated successfully');

                updateUser(response.data);

                navigate('/profile');
            }
        } catch (error) {
            console.error('Failed to update profile', error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    const dateOfBirth = watch('dateOfBirth');
    // Convert dateOfBirth to a Date object if it's a valid date string
    const dateOfBirthValue = dateOfBirth ? new Date(dateOfBirth) : null;

    return (
        <div className="container-fluid p-0 d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between align-items-center w-100 p-3">
                <div>
                    <img src={Disco} alt="Party Icon" width="80" height="80" />
                </div>
                <Link to="/profile" className="p-2" aria-label="Go to Profile">
                    <FontAwesomeIcon icon={faUser} size="2x" color="black" />
                </Link>
            </div>
            <div className="card shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '80%', maxWidth: '600px', marginTop: '50px', backgroundImage: `url(${user?.formBackgroundUrl})`, backgroundSize: 'cover', minHeight: '100vh' }}>
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center">
                        <img
                            src={user?.photo}
                            alt={`${user?.userName}'s profile`}
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <h3 className="card-title mt-3">{user?.userName}</h3>
                    </div>
                    <form className="mt-4" onSubmit={handleSubmit(handleUpdate)}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                   id="firstName" {...register("firstName")} />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                   id="lastName" {...register("lastName")} />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="tel" className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                   id="phone" {...register("phoneNumber")} />
                            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                   id="email" {...register("email")} />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                            <DatePicker
                                format="yyyy-MM-dd"
                                value={dateOfBirthValue}
                                onChange={(date) => setValue('dateOfBirth', date ? date.toISOString().split('T')[0] : undefined)}
                                placeholder="Select Date"
                                style={{width: '100%'}}
                            />
                            {errors.dateOfBirth && (
                                <div className="invalid-feedback">{errors.dateOfBirth.message}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                id="gender"
                                autoComplete="gender"
                                className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                                {...register("gender", {
                                    required: "Gender is required",
                                    valueAsNumber: true // Ensure the value is parsed as a number
                                })}
                            >
                                <option value="">Select Gender</option>
                                <option value={0}>Male</option>
                                <option value={1}>Female</option>
                                <option value={2}>Other</option>
                            </select>
                            {errors.gender && (
                                <div className="invalid-feedback">{errors.gender.message}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address.streetAddress" className="form-label">Street</label>
                            <input type="text"
                                   className={`form-control ${errors.address?.streetAddress ? 'is-invalid' : ''}`}
                                   id="address.streetAddress" {...register("address.streetAddress")} />
                            {errors.address?.streetAddress &&
                                <div className="invalid-feedback">{errors.address.streetAddress.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address.city" className="form-label">City</label>
                            <input type="text" className={`form-control ${errors.address?.city ? 'is-invalid' : ''}`}
                                   id="address.city" {...register("address.city")} />
                            {errors.address?.city &&
                                <div className="invalid-feedback">{errors.address.city.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address.country" className="form-label">Country</label>
                            <input type="text" className={`form-control ${errors.address?.country ? 'is-invalid' : ''}`}
                                   id="address.country" {...register("address.country")} />
                            {errors.address?.country &&
                                <div className="invalid-feedback">{errors.address.country.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address.postalCode" className="form-label">Zip Code</label>
                            <input type="text"
                                   className={`form-control ${errors.address?.postalCode ? 'is-invalid' : ''}`}
                                   id="address.postalCode" {...register("address.postalCode")} />
                            {errors.address?.postalCode &&
                                <div className="invalid-feedback">{errors.address.postalCode.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="bio" className="form-label">Bio</label>
                            <textarea className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                                      id="bio" {...register("bio")} />
                            {errors.bio && <div className="invalid-feedback">{errors.bio.message}</div>}
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                            <button type="button" className="btn btn-secondary" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
