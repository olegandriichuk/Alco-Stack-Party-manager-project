import { faUser } from '@fortawesome/free-solid-svg-icons';
import Disco from '../../assets/disco.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../Context/useAuth";

interface Address {
    Country: string;
    Town: string;
    Street: string;
    ZipCode: string;
}

interface ProfileCardProps {
    UserName: string;
    name: string;
    Surname: string;
    Phone: string;
    Email: string;
    Address: Address;
    photoUrl: string;
    formBackgroundUrl: string;
}

const EditProfilePage: React.FC<ProfileCardProps> = (props) => {
    const { logout } = useAuth(); // Get the logout function from context

    return (
        <div className="container-fluid p-0 d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between align-items-center w-100 p-3">
                <div>
                    <img
                        src={Disco}
                        alt="Party Icon"
                        width="80"
                        height="80"
                    />
                </div>
                <Link
                    to="/profile"
                    className="p-2"
                    aria-label="Go to Profile"
                >
                    <FontAwesomeIcon icon={faUser} size="2x" color="black" />
                </Link>
            </div>
            <div className="card shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '80%', maxWidth: '600px', marginTop: '50px', backgroundImage: `url(${props.formBackgroundUrl})`, backgroundSize: 'cover', minHeight: '100vh' }}>
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center">
                        <img
                            src={props.photoUrl}
                            alt={`${props.UserName}'s profile`}
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <h3 className="card-title mt-3">{props.UserName}</h3>
                    </div>
                    <form className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="name" value={props.name} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Surname</label>
                            <input type="text" className="form-control" id="surname" value={props.Surname} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="tel" className="form-control" id="phone" value={props.Phone} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" value={props.Email} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="street" className="form-label">Street</label>
                            <input type="text" className="form-control" id="street" value={props.Address.Street} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="town" className="form-label">Town</label>
                            <input type="text" className="form-control" id="town" value={props.Address.Town} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="country" value={props.Address.Country} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="zipcode" className="form-label">Zip Code</label>
                            <input type="text" className="form-control" id="zipcode" value={props.Address.ZipCode} />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={logout} // Trigger the logout function on click
                            >
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
