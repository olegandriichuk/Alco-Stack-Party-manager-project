import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ProfileCard.css";
import {Link} from "react-router-dom";
import {useAuth} from "../../Context/useAuth.tsx";
import {useForm} from "react-hook-form";
import {UserPhoto} from "../../Models/User.tsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "react-toastify";
import {UpdatePhotoAPI} from "../../Services/UserService.tsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";



interface ProfileCardProps {
    UserName: string;
    name: string;
    Surname: string;
    Phone: string;
    Email: string;
    Gender: number;
    photoUrl: string;
    formBackgroundUrl: string;
}

const validationSchema = Yup.object().shape({
    photo: Yup.string().optional().url(),
    formBackgroundUrl: Yup.string().optional().url(),
});



const ProfileCard: React.FC<ProfileCardProps> = ({ name, Surname, Phone, Email, Gender , photoUrl, formBackgroundUrl, UserName }) => {
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState(photoUrl);
    const [currentBackgroundUrl, setCurrentBackgroundUrl] = useState(formBackgroundUrl);

    useEffect(() => {
        setCurrentPhotoUrl(photoUrl);
        setCurrentBackgroundUrl(formBackgroundUrl);
    }, [photoUrl, formBackgroundUrl]);

    const profileCardStyle: React.CSSProperties = {
        backgroundImage: `url(${currentBackgroundUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '90%',
        borderRadius: '20px',
        background: '#D5D5D5',
        border : '1px solid white',
        color: 'white'

    };
    // const LinkStyle: React.CSSProperties = {
    //     textDecoration: 'none',
    //     color: 'black',
    // }



    const { user, token, updateUser } = useAuth();


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<UserPhoto>({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (user) {
            Object.keys(user).forEach((key) => {
                setValue(key as keyof UserPhoto, user[key as keyof UserPhoto]);
            });
        }
    }, [user, setValue]);

    const HandlePhotoChange = async (formData: UserPhoto) => {
        if (!token) {
            toast.error("You must be logged in to update your profile");
            return;
        }
        try {
            const response = await UpdatePhotoAPI(
                formData.photo || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
                formData.formBackgroundUrl,
                token
            );
            if (response && response.data) {
                updateUser(response.data);
                setCurrentPhotoUrl(response.data.photo || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
                setCurrentBackgroundUrl(response.data.formBackgroundUrl || '');
                console.log('Profile updated successfully' , response.data);
            }
        } catch (error) {
            console.error('Failed to update profile', error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    const [modalShow, setModalShow] = useState(false);

    interface MyVerticallyCenteredModalProps {
        show: boolean;
        onHide: () => void;
    }

    const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = ({ onHide, show }) => {
        const onSubmit = (data: UserPhoto) => {
            HandlePhotoChange(data);
            setModalShow(false);
        };

        return (
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Profile Pictures
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Profile Photo URL</label>
                            <input
                                type="text"
                                id="photo"
                                className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
                                placeholder="Enter your photo URL"
                                {...register('photo')}
                            />
                            {errors.photo && <div className="invalid-feedback">{errors.photo.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formBackgroundUrl" className="form-label">Background Photo URL</label>
                            <input
                                type="text"
                                id="formBackgroundUrl"
                                className={`form-control ${errors.formBackgroundUrl ? 'is-invalid' : ''}`}
                                placeholder="Enter your background photo URL"
                                {...register('formBackgroundUrl')}
                            />
                            {errors.formBackgroundUrl && <div className="invalid-feedback">{errors.formBackgroundUrl.message}</div>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Save Changes</Button>
                        <Button onClick={onHide}>Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    };

    return (
        <div className="card" style={profileCardStyle}>
            <div className="card-body d-flex flex-row">
                <div className={"p-3 d-flex flex-column justify-content-around align-items-center"}>
                    <button onClick={() => setModalShow(true)}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                        <img
                            style={{
                                border: '1px solid white',
                                borderRadius: '50%',  // This replaces the 'rounded-circle' class
                                width: '100px',
                                height: '100px'
                            }}
                            src={currentPhotoUrl}
                            alt="User Photo"
                        />
                    </button>
                    <h5 className="card-title" style={{borderRadius: '10px',
                        backgroundColor: '#000000',
                        padding: '5px 10px'}}>{UserName}</h5>
                </div>
                <div className="d-flex flex-grow-1 flex-column">
                    <div className="d-flex justify-content-end">
                        <Link to={"/profile/edit"} style={{textDecoration: 'none'}}>
                            <button className="btn btn-primary btn-lg m-2 "
                                    style={{background: '#D8DCE3', border: '1px solid white'}}>Edit Profile
                            </button>
                        </Link>
                    </div>
                    <ul className="list-unstyled" style={{color: '#FFFFFF', padding: 0}}>
                        <li style={{marginBottom: '10px'}}>
                        <span style={{
                            borderRadius: '10px',
                            backgroundColor: '#000000',
                            display: 'inline',
                            padding: '5px 10px'
                        }}>Name :&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{name}</span>
                        </li>
                        <li style={{marginBottom: '10px'}}>
                        <span style={{
                            borderRadius: '10px',
                            backgroundColor: '#000000',
                            display: 'inline',
                            padding: '5px 10px'
                        }}>Surname : {Surname}</span>
                        </li>
                        <li style={{marginBottom: '10px'}}>
                        <span style={{
                            borderRadius: '10px',
                            backgroundColor: '#000000',
                            display: 'inline',
                            padding: '5px 10px'
                        }}>Phone :&nbsp;&nbsp;&nbsp;&nbsp; {Phone}</span>
                        </li>
                        {/*<li style={{marginBottom: '10px'}}>*/}
                        {/*<span style={{*/}

                        {/*    borderRadius: '20px',*/}
                        {/*    backgroundColor: '#000000',*/}
                        {/*    display: 'inline',*/}
                        {/*    padding: '5px 10px',*/}
                        {/*    whiteSpace: 'nowrap',*/}
                        {/*    overflow: 'hidden',*/}
                        {/*    textOverflow: 'ellipsis'*/}
                        {/*}}>Email :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {Email}</span>*/}
                        {/*</li>*/}
                        <li>
                        <span style={{
                            borderRadius: '10px',
                            backgroundColor: '#000000',
                            display: 'inline',
                            padding: '5px 10px'
                        }}>Gender: &nbsp;&nbsp;&nbsp; {Gender === 0 ? "Male" : Gender === 1 ? "Female" : Gender === 2 ? "Other" : "Unknown"}</span>
                        </li>
                    </ul>


                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default ProfileCard;