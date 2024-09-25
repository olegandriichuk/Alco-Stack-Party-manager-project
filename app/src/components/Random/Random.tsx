// import React, { useState, useEffect } from 'react';
//
// const defaultImageSrc = '/img/image_placeholder.png';
//
// interface EmployeeProps {
//     addOrEdit: (formData: FormData, resetForm: () => void) => void;
//     recordForEdit: EmployeeFormValues | null;
// }
//
// interface EmployeeFormValues {
//     employeeID: number;
//     employeeName: string;
//     occupation: string;
//     imageName: string;
//     imageSrc: string;
//     imageFile: File | null;
// }
//
// const initialFieldValues: EmployeeFormValues = {
//     employeeID: 0,
//     employeeName: '',
//     occupation: '',
//     imageName: '',
//     imageSrc: defaultImageSrc,
//     imageFile: null
// };
//
// export default function Employee(props: EmployeeProps) {
//     const { addOrEdit, recordForEdit } = props;
//
//     const [values, setValues] = useState<EmployeeFormValues>(initialFieldValues);
//     const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
//
//     useEffect(() => {
//         if (recordForEdit) setValues(recordForEdit);
//     }, [recordForEdit]);
//
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setValues({
//             ...values,
//             [name]: value
//         });
//     };
//
//     const showPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const imageFile = e.target.files[0];
//             const reader = new FileReader();
//             console.log(imageFile);
//             reader.onload = (x) => {
//                 setValues({
//                     ...values,
//                     imageFile,
//                     imageSrc: x?.target?.result as string
//                 });
//             };
//             reader.readAsDataURL(imageFile);
//         } else {
//             setValues({
//                 ...values,
//                 imageFile: null,
//                 imageSrc: defaultImageSrc
//             });
//         }
//     };
//
//     const validate = () => {
//         const temp: { [key: string]: boolean } = {};
//         temp.employeeName = values.employeeName !== '';
//         temp.imageSrc = values.imageSrc !== defaultImageSrc;
//         setErrors(temp);
//         return Object.values(temp).every((x) => x);
//     };
//
//     const resetForm = () => {
//         setValues(initialFieldValues);
//         const imageUploader = document.getElementById('image-uploader') as HTMLInputElement;
//         if (imageUploader) imageUploader.value = '';
//         setErrors({});
//     };
//
//     const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (validate()) {
//             const formData = new FormData();
//             formData.append('employeeID', values.employeeID.toString());
//             formData.append('employeeName', values.employeeName);
//             formData.append('occupation', values.occupation);
//             formData.append('imageName', values.imageName);
//             formData.append('imageFile', values.imageFile as Blob);
//             addOrEdit(formData, resetForm);
//         }
//     };
//
//     const applyErrorClass = (field: string) =>
//         field in errors && !errors[field] ? ' invalid-field' : '';
//
//     return (
//         <>
//             <div className="container text-center">
//                 <p className="lead">An Employee</p>
//             </div>
//             <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
//                 <div className="card">
//                     <img src={values.imageSrc} className="card-img-top" alt="Employee" />
//                     <div className="card-body">
//                         <div className="form-group">
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 className={`form-control-file${applyErrorClass('imageSrc')}`}
//                                 onChange={showPreview}
//                                 id="image-uploader"
//                             />
//                         </div>
//                         <div className="form-group">
//                             <input
//                                 className={`form-control${applyErrorClass('employeeName')}`}
//                                 placeholder="Employee Name"
//                                 name="employeeName"
//                                 value={values.employeeName}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 placeholder="Occupation"
//                                 name="occupation"
//                                 value={values.occupation}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="form-group text-center">
//                             <button type="submit" className="btn btn-light">
//                                 Submit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </>
//     );
// }
//
    // import React, { useState, useEffect } from 'react';
    // import 'bootstrap/dist/css/bootstrap.min.css';
    // import { Link } from "react-router-dom";
    // import { useAuth } from "../../Context/useAuth.tsx";
    // import { useForm } from "react-hook-form";
    // import { yupResolver } from "@hookform/resolvers/yup";
    // import * as Yup from "yup";
    // import { toast } from "react-toastify";
    // import Modal from "react-bootstrap/Modal";
    // import Button from "react-bootstrap/Button";
    // import { UpdatePhotoAPI } from "../../Services/UserService.tsx";
    // import { UserPhoto } from "../../Models/User.tsx";
    //
    // interface ProfileCardProps {
    //     UserName: string;
    //     name: string;
    //     Surname: string;
    //     Phone: string;
    //     Email: string;
    //     Gender: number;
    //     photoSrc: string;
    //     formBackgroundSrc: string;
    // }
    //
    // const validationSchema = Yup.object().shape({
    //     photoFile: Yup.mixed<File>()
    //         .nullable()
    //         .optional()
    //         .test("fileSize", "File too large", (value) => {
    //             return !value || (value && value.size <= 5000000); // 5 MB file size limit
    //         })
    //         .test("fileType", "Unsupported File Format", (value) => {
    //             return (
    //                 !value ||
    //                 (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    //             );
    //         }),
    //     formBackgroundFile: Yup.mixed<File>()
    //         .nullable()
    //         .optional()
    //         .test("fileSize", "File too large", (value) => {
    //             return !value || (value && value.size <= 5000000); // 5 MB file size limit
    //         })
    //         .test("fileType", "Unsupported File Format", (value) => {
    //             return (
    //                 !value ||
    //                 (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    //             );
    //         }),
    // });
    //
    // const ProfileCard: React.FC<ProfileCardProps> = ({
    //                                                      name,
    //                                                      Surname,
    //                                                      Phone,
    //                                                      Email,
    //                                                      Gender,
    //                                                      photoSrc,
    //                                                      formBackgroundSrc,
    //                                                      UserName
    //                                                  }) => {
    //     const [currentPhotoSrc, setCurrentPhotoSrc] = useState(photoSrc);
    //     const [currentBackgroundSrc, setCurrentBackgroundSrc] = useState(formBackgroundSrc);
    //     const [photoFile, setPhotoFile] = useState<File | null>(null);
    //     const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
    //
    //     console.log("photoSrc", photoSrc)
    //     console.log("photoFile", photoFile);
    //     console.log("formBackgroundSrc", formBackgroundSrc);
    //
    //     const { user, token, updateUser } = useAuth();
    //
    //     useEffect(() => {
    //         setCurrentPhotoSrc(photoSrc);
    //         setCurrentBackgroundSrc(formBackgroundSrc);
    //     }, [photoSrc, formBackgroundSrc]);
    //
    //     const profileCardStyle: React.CSSProperties = {
    //         backgroundImage: `url(${currentBackgroundSrc})`,
    //         backgroundSize: 'cover',
    //         backgroundRepeat: 'no-repeat',
    //         backgroundPosition: 'center',
    //         width: '90%',
    //         borderRadius: '20px',
    //     };
    //
    //     const { handleSubmit, formState: { errors } } = useForm<UserPhoto>({
    //         resolver: yupResolver(validationSchema),
    //     });
    //
    //     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>, setUrl: React.Dispatch<React.SetStateAction<string>>) => {
    //         if (e.target.files && e.target.files[0]) {
    //             const file = e.target.files[0];
    //             setFile(file);
    //             const reader = new FileReader();
    //             reader.onload = (x) => {
    //                 setUrl(x?.target?.result as string);
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     };
    //
    //     const handlePhotoUpdate = async (formData: UserPhoto) => {
    //         if (!token) {
    //             toast.error("You must be logged in to update your profile");
    //             return;
    //         }
    //         console.log('Updating profile with data:', photoFile, backgroundFile);
    //         try {
    //             const response = await UpdatePhotoAPI(
    //                 photoFile,
    //                 backgroundFile,
    //                 token
    //             );
    //
    //             if (response && response.data) {
    //                 updateUser(response.data);
    //                 setCurrentPhotoSrc(response.data.photoSrc || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    //                 setCurrentBackgroundSrc(response.data.formBackgroundSrc || '');
    //                 console.log('Profile updated successfully', response.data);
    //             }
    //         } catch (error) {
    //             console.error('Failed to update profile', error);
    //             toast.error('Failed to update profile. Please try again.');
    //         }
    //     };
    //
    //     const handleDeletePhoto = () => {
    //         setCurrentPhotoSrc("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    //         setPhotoFile(null);
    //     };
    //
    //     const handleDeleteBackground = () => {
    //         setCurrentBackgroundSrc('');
    //         setBackgroundFile(null);
    //     };
    //
    //     const [modalShow, setModalShow] = useState(false);
    //
    //     interface MyVerticallyCenteredModalProps {
    //         show: boolean;
    //         onHide: () => void;
    //     }
    //
    //     const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = ({ onHide, show }) => {
    //         const onSubmit = (data: UserPhoto) => {
    //             handlePhotoUpdate(data);
    //             setModalShow(false);
    //         };
    //
    //         return (
    //             <Modal
    //                 show={show}
    //                 onHide={onHide}
    //                 size="lg"
    //                 aria-labelledby="contained-modal-title-vcenter"
    //                 centered
    //             >
    //                 <Modal.Header closeButton>
    //                     <Modal.Title id="contained-modal-title-vcenter">
    //                         Update Profile Pictures
    //                     </Modal.Title>
    //                 </Modal.Header>
    //                 <form onSubmit={handleSubmit(onSubmit)}>
    //                     <Modal.Body>
    //                         {/* Profile Photo Section */}
    //                         <div className="mb-3 text-center">
    //                             <label htmlFor="photoFile" className="form-label">Profile Photo</label>
    //                             <div
    //                                 style={{
    //                                     border: '2px dashed #ccc',
    //                                     borderRadius: '8px',
    //                                     padding: '20px',
    //                                     position: 'relative',
    //                                     display: 'flex',
    //                                     alignItems: 'center',
    //                                     justifyContent: 'center',
    //                                     width: '150px',
    //                                     height: '150px',
    //                                     margin: '0 auto',
    //                                     backgroundColor: '#f5f5f5'
    //                                 }}>
    //                                 {currentPhotoSrc ? (
    //                                     <img
    //                                         src={currentPhotoSrc}
    //                                         alt="Current Profile"
    //                                         style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
    //                                     />
    //                                 ) : (
    //                                     <span style={{ fontSize: '48px', color: '#ccc' }}>+</span>
    //                                 )}
    //                                 <input
    //                                     type="file"
    //                                     accept="image/*"
//                                     id="photoFile"
//                                     className="form-control"
//                                     style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
//                                     onChange={(e) => handleImageChange(e, setPhotoFile, setCurrentPhotoSrc)}
//                                 />
//                             </div>
//                             {errors.photoFile && <div className="invalid-feedback text-center">{errors.photoFile.message}</div>}
//                             {currentPhotoSrc && (
//                                 <Button variant="danger" className="mt-2" onClick={handleDeletePhoto}>Delete Photo</Button>
//                             )}
//                         </div>
//
//                         {/* Background Photo Section */}
//                         <div className="mb-3 text-center">
//                             <label htmlFor="backgroundFile" className="form-label">Background Photo</label>
//                             <div
//                                 style={{
//                                     border: '2px dashed #ccc',
//                                     borderRadius: '8px',
//                                     padding: '20px',
//                                     position: 'relative',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     width: '300px',
//                                     height: '150px',
//                                     margin: '0 auto',
//                                     backgroundColor: '#f5f5f5'
//                                 }}>
//                                 {currentBackgroundSrc ? (
//                                     <img
//                                         src={currentBackgroundSrc}
//                                         alt="Current Background"
//                                         style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
//                                     />
//                                 ) : (
//                                     <span style={{ fontSize: '48px', color: '#ccc' }}>+</span>
//                                 )}
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     id="backgroundFile"
//                                     className="form-control"
//                                     style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
//                                     onChange={(e) => handleImageChange(e, setBackgroundFile, setCurrentBackgroundSrc)}
//                                 />
//                             </div>
//                             {errors.formBackgroundFile && <div className="invalid-feedback text-center">{errors.formBackgroundFile.message}</div>}
//                             {currentBackgroundSrc && (
//                                 <Button variant="danger" className="mt-2" onClick={handleDeleteBackground}>Delete Background</Button>
//                             )}
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button type="submit">Save Changes</Button>
//                         <Button onClick={onHide}>Close</Button>
//                     </Modal.Footer>
//                 </form>
//             </Modal>
//         );
//
//
//     };
//
//     return (
//         <div className="card" style={profileCardStyle}>
//             <div className="card-body d-flex flex-row">
//                 <div className={"p-3 d-flex flex-column justify-content-around align-items-center"}>
//                     <button onClick={() => setModalShow(true)}
//                             style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
//                         <img
//                             style={{
//                                 border: '1px solid black',
//                                 borderRadius: '50%',
//                                 width: '100px',
//                                 height: '100px'
//                             }}
//                             src={currentPhotoSrc}
//                             alt="User Photo"
//                         />
//                     </button>
//                     <h5 className="card-title">{UserName}</h5>
//                 </div>
//                 <div className="card-text">
//                     <Link to={"/profile/edit"} style={{ textDecoration: 'none', color: 'black' }}>
//                         <button className="btn btn-primary m-2 bg-dark">Edit Profile</button>
//                     </Link>
//                     <ul className="list-unstyled">
//                         <li>Name :&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{name}</li>
//                         <li>Surname : {Surname}</li>
//                         <li>Phone :&nbsp;&nbsp;&nbsp;&nbsp; {Phone}</li>
//                         <li>Email :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {Email}</li>
//                         <li>Gender: &nbsp;&nbsp;&nbsp; {Gender === 0 ? "Male" : Gender === 1 ? "Female" : Gender === 2 ? "Other" : "Unknown"}</li>
//                     </ul>
//                 </div>
//             </div>
//             <MyVerticallyCenteredModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </div>
//     );
// };
//
// export default ProfileCard;
//
