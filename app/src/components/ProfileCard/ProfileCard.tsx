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
import HalantSemiBold from "../../assets/fonts/halant/Halant-SemiBold.ttf";
import InterRegular from  "../../assets/fonts/inter/Inter-Regular.otf"



interface ProfileCardProps {
    UserName: string;
    name: string;
    Surname: string;
    Phone: string;
    Email: string;
    Gender: number;
    photoSrc: string;
    formBackgroundSrc: string;
}

const validationSchema = Yup.object().shape({
    photoFile: Yup.mixed<File>()
        .nullable()
        .optional()
        .test("fileSize", "File too large", (value) => {
            return !value || (value && value.size <= 5000000); // 5 MB file size limit
        })
        .test("fileType", "Unsupported File Format", (value) => {
            return (
                !value ||
                (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
            );
        }),
    formBackgroundFile: Yup.mixed<File>()
        .nullable()
        .optional()
        .test("fileSize", "File too large", (value) => {
            return !value || (value && value.size <= 5000000); // 5 MB file size limit
        })
        .test("fileType", "Unsupported File Format", (value) => {
            return (
                !value ||
                (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
            );
        }),
});

const ProfileCard: React.FC<ProfileCardProps> = ({
                                                     name,
                                                     Surname,
                                                     Phone,
                                                     Gender,
                                                     photoSrc,
                                                     formBackgroundSrc,
                                                     UserName
                                                 }) => {
    const [currentPhotoSrc, setCurrentPhotoSrc] = useState(photoSrc);
    const [currentBackgroundSrc, setCurrentBackgroundSrc] = useState(formBackgroundSrc);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

    console.log("photoSrc", photoSrc)
    console.log("photoFile", photoFile);
    console.log("formBackgroundSrc", formBackgroundSrc);

    const { token, updateUser } = useAuth();

    useEffect(() => {
        setCurrentPhotoSrc(photoSrc);
        setCurrentBackgroundSrc(formBackgroundSrc);
    }, [photoSrc, formBackgroundSrc]);

    const profileCardStyle: React.CSSProperties = {
        backgroundImage: `url(${currentBackgroundSrc})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '90%',
        borderRadius: '20px',
        background: '#D5D5D5',
        border : '1px solid white',
        color: 'white'

    };

    const { handleSubmit, formState: { errors } } = useForm<UserPhoto>({
        resolver: yupResolver(validationSchema),
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>, setUrl: React.Dispatch<React.SetStateAction<string>>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFile(file);
            const reader = new FileReader();
            reader.onload = (x) => {
                setUrl(x?.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoUpdate = async (formData: UserPhoto) => {
        if (!token) {
            toast.error("You must be logged in to update your profile");
            return;
        }
        console.log('Updating profile with data:', photoFile, backgroundFile);
        try {
            const response = await UpdatePhotoAPI(
                photoFile,
                backgroundFile,
                token
            );

            if (response && response.data) {
                updateUser(response.data);
                setCurrentPhotoSrc(response.data.photoSrc || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
                setCurrentBackgroundSrc(response.data.formBackgroundSrc || '');
                console.log('Profile updated successfully', response.data);
            }
        } catch (error) {
            console.error('Failed to update profile', error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    const handleDeletePhoto = () => {
        setCurrentPhotoSrc("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
        setPhotoFile(null);
    };

    const handleDeleteBackground = () => {
        setCurrentBackgroundSrc('');
        setBackgroundFile(null);
    };

    const [modalShow, setModalShow] = useState(false);

    interface MyVerticallyCenteredModalProps {
        show: boolean;
        onHide: () => void;
    }

    const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = ({ onHide, show }) => {
        const onSubmit = (data: UserPhoto) => {
            handlePhotoUpdate(data);
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
                        {/* Profile Photo Section */}
                        <div className="mb-3 text-center">
                            <label htmlFor="photoFile" className="form-label">Profile Photo</label>
                            <div
                                style={{
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '150px',
                                    height: '150px',
                                    margin: '0 auto',
                                    backgroundColor: '#f5f5f5'
                                }}>
                                {currentPhotoSrc ? (
                                    <img
                                        src={currentPhotoSrc}
                                        alt="Current Profile"
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <span style={{ fontSize: '48px', color: '#ccc' }}>+</span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="photoFile"
                                    className="form-control"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                    onChange={(e) => handleImageChange(e, setPhotoFile, setCurrentPhotoSrc)}
                                />
                            </div>
                            {errors.photoFile && <div className="invalid-feedback text-center">{errors.photoFile.message}</div>}
                            {currentPhotoSrc && (
                                <Button variant="danger" className="mt-2" onClick={handleDeletePhoto}>Delete Photo</Button>
                            )}
                        </div>

                        {/* Background Photo Section */}
                        <div className="mb-3 text-center">
                            <label htmlFor="backgroundFile" className="form-label">Background Photo</label>
                            <div
                                style={{
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '300px',
                                    height: '150px',
                                    margin: '0 auto',
                                    backgroundColor: '#f5f5f5'
                                }}>
                                {currentBackgroundSrc ? (
                                    <img
                                        src={currentBackgroundSrc}
                                        alt="Current Background"
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <span style={{ fontSize: '48px', color: '#ccc' }}>+</span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="backgroundFile"
                                    className="form-control"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                    onChange={(e) => handleImageChange(e, setBackgroundFile, setCurrentBackgroundSrc)}
                                />
                            </div>
                            {errors.formBackgroundFile && <div className="invalid-feedback text-center">{errors.formBackgroundFile.message}</div>}
                            {currentBackgroundSrc && (
                                <Button variant="danger" className="mt-2" onClick={handleDeleteBackground}>Delete Background</Button>
                            )}
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
                                border: '1px solid black',
                                borderRadius: '50%',  // This replaces the 'rounded-circle' class
                                width: '100px',
                                height: '100px'
                            }}
                            src={currentPhotoSrc}
                            alt="User Photo"
                        />
                    </button>
                    <h5 className="card-title"
                        style={{
                            borderRadius: '10px',
                            background: 'linear-gradient(90deg, #5C5C5C 16%, #353535 82%)', // Градієнт
                            padding: '5px 10px',
                            fontFamily: 'HalantSemiBold' // Застосовуємо шрифт
                        }}>
                        <style>
                            {`
                                @font-face {
                                    font-family: 'HalantSemiBold';
                                    src: url(${HalantSemiBold}) format('truetype');
                                }
                            `}
                        </style>
                        {UserName}
                    </h5>
                </div>
                <div className="d-flex flex-grow-1 flex-column">
                    <div className="d-flex justify-content-end">
                        <Link to={"/profile/edit"} style={{textDecoration: 'none'}}>
                            <button className="btn btn-primary btn-lg m-2"
                                    style={{
                                        background: '#D8DCE3',
                                        border: '1px solid white',
                                        fontFamily: 'HalantSemiBold', // Застосовуємо шрифт
                                        // Підключаємо імпортований шрифт
                                    }}>
                                <style>
                                    {`
                    @font-face {
                        font-family: 'HalantSemiBold';
                        src: url(${HalantSemiBold}) format('truetype');
                    }
                `}
                                </style>
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                    <ul className="list-unstyled" style={{ color: '#FFFFFF', padding: 0, fontFamily: 'InterRegular' }}>
                        <style>
                            {`
                                @font-face {
                                    font-family: 'InterRegular';
                                    src: url(${InterRegular}) format('truetype');
                                }
                    
                                .list-unstyled span {
                                    font-family: 'InterRegular';
                                }
                            `}
                        </style>
                        <li style={{ marginBottom: '10px' }}>
                            <span style={{
                                borderRadius: '10px',
                                background: 'linear-gradient(90deg, rgba(92, 92, 92, 0.8) 16%, rgba(53, 53, 53, 0.8) 82%)', // Градієнт
                                display: 'inline',
                                padding: '5px 10px',
                                color: '#FFFFFF' // Текст білий для контрасту на темному фоні
                            }}>Name :&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{name}</span>
                        </li>
                        <li style={{marginBottom: '10px'}}>
                            <span style={{
                                borderRadius: '10px',
                                background: 'linear-gradient(90deg, rgba(92, 92, 92, 0.8) 16%, rgba(53, 53, 53, 0.8) 82%)', // Градієнт
                                display: 'inline',
                                padding: '5px 10px',
                                color: '#FFFFFF' // Текст білий для контрасту на темному фоні
                            }}>Surname : {Surname}</span>
                        </li>
                        <li style={{marginBottom: '10px'}}>
                            <span style={{
                                borderRadius: '10px',
                                background: 'linear-gradient(90deg, rgba(92, 92, 92, 0.8) 16%, rgba(53, 53, 53, 0.8) 82%)', // Градієнт
                                display: 'inline',
                                padding: '5px 10px',
                                color: '#FFFFFF' // Текст білий для контрасту на темному фоні
                            }}>
                                Phone :&nbsp;&nbsp;&nbsp;&nbsp; {Phone}
                            </span>
                        </li>

                        <li>
                            <span style={{
                                borderRadius: '10px',
                                background: 'linear-gradient(90deg, rgba(92, 92, 92, 0.8) 16%, rgba(53, 53, 53, 0.8) 82%)',
                                display: 'inline',
                                padding: '5px 10px',
                                color: '#FFFFFF' // Текст білий для контрасту на темному фоні
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