import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Address, UserProfile } from "../../Models/User";
import { UpdateProfileAPI } from "../../Services/UserService";
import Disco from '../../assets/disco.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "rsuite";
import Button from 'react-bootstrap/Button';

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    userName: Yup.string().required("Username is required"),
    firstName: Yup.string().optional(),
    lastName: Yup.string().optional(),
    phoneNumber: Yup.string().optional(),
    bio: Yup.string().optional(),
    gender: Yup.number().optional(),
    dateOfBirth: Yup.string()
        .nullable()
        .test(
            'is-valid-date-or-empty',
            'Date of Birth must be in YYYY-MM-DD format',
            value => {
                // Allow empty string or undefined
                if (value === '' || value === undefined || value === null) return true;

                // Check if value matches YYYY-MM-DD format
                return /^\d{4}-\d{2}-\d{2}$/.test(value);
            }
        )
        .optional(),

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

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserProfile>({
        resolver: yupResolver(validationSchema),
    });


    console.log("errors", errors);
    console.log("watch", watch());

    useEffect(() => {
        if (user) {
            Object.keys(user).forEach((key) => {
                setValue(key as keyof UserProfile, user[key as keyof UserProfile]);
            });
        }
    }, [user, setValue]);

    useEffect(() => {
        console.log("Date of Birth watched value:", watch('dateOfBirth'));
    }, [watch('dateOfBirth')]);

    const handleUpdate = async (formData: UserProfile) => {
        console.log("handleUpdate called with:", formData);
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
                formData.phoneNumber || "",
                formData.address || { streetAddress: "", city: "", postalCode: "", country: "" },
                formData.gender,
                token
            );
            if (response && response.data) {
                updateUser(response.data);
                navigate('/profile');
            }
        } catch (error) {
            console.error('Failed to update profile', error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    const dateOfBirth = watch('dateOfBirth');
    const dateOfBirthValue = dateOfBirth ? new Date(dateOfBirth) : null;

    const renderInput = (label: string, id: string, type: string, placeholder: string, registerName: keyof UserProfile) => (
        <div className="mb-3" key={id}>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type={type}
                id={id}
                autoComplete={id}
                className={`form-control ${errors[registerName] ? 'is-invalid' : ''}`}
                placeholder={placeholder}
                {...register(registerName)}
            />
            {errors[registerName] && <div className="invalid-feedback">{errors[registerName]?.message}</div>}
        </div>
    );

    const renderAddressInput = (label: string, id: string, placeholder: string, registerName: keyof Address) => (
        <div className="mb-3" key={id}>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type="text"
                id={id}
                autoComplete={id}
                className={`form-control ${errors.address?.[registerName] ? 'is-invalid' : ''}`}
                placeholder={placeholder}
                {...register(`address.${registerName}` as const)}
            />
            {errors.address?.[registerName] && <div className="invalid-feedback">{errors.address[registerName]?.message}</div>}
        </div>
    );

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
            <div className="card shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '80%', maxWidth: '600px', marginTop: '50px', backgroundImage: `url(${user?.formBackgroundSrc})`, backgroundSize: 'cover', minHeight: '100vh' }}>
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center">
                        <Button
                            variant="link"
                            style={{
                                padding: 0,
                                border: 'none',
                                background: 'none',
                                display: 'inline-block',
                            }}
                            className="p-0"
                        >
                            <img
                                src={user?.photoSrc || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                                alt={`${user?.userName}'s profile`}
                                className="rounded-circle"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                }}
                            />
                        </Button>
                    </div>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        {renderInput('Email', 'email', 'email', 'Email', 'email')}
                        {renderInput('Username', 'userName', 'text', 'Username', 'userName')}
                        {renderInput('First Name', 'firstName', 'text', 'First Name', 'firstName')}
                        {renderInput('Last Name', 'lastName', 'text', 'Last Name', 'lastName')}
                        {renderInput('Phone Number', 'phoneNumber', 'text', 'Phone Number', 'phoneNumber')}
                        {renderInput('Bio', 'bio', 'text', 'Bio', 'bio')}
                        <div className="mb-3">
                            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                            <DatePicker
                                format="yyyy-MM-dd"
                                value={dateOfBirthValue}
                                onChange={(date) => setValue('dateOfBirth', date ? date.toISOString().split('T')[0] : null)}
                                placeholder="Select Date"
                                style={{width: '100%'}}
                            />
                            {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                id="gender"
                                autoComplete="gender"
                                className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                                {...register("gender", {
                                    required: "Gender is required",
                                    valueAsNumber: true
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
                        {renderAddressInput("Street", "address.streetAddress", "Enter your street address", "streetAddress")}
                        {renderAddressInput("City", "address.city", "Enter your city", "city")}
                        {renderAddressInput("Country", "address.country", "Enter your country", "country")}
                        {renderAddressInput("Zip Code", "address.postalCode", "Enter your zip code", "postalCode")}
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                            <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
