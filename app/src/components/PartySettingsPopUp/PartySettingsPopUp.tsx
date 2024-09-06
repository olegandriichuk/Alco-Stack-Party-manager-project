// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useAuth } from "../../Context/useAuth";
// import { toast } from "react-toastify";
// import * as yup from "yup";
// import { DatePicker, Modal, Button, Checkbox } from "rsuite";
// import { UpdatePartyAPI } from "../../Services/PartyService.tsx";
// import 'rsuite/dist/rsuite.min.css';
// import "./PartySettingsPopUp.css";
// import { useEffect } from "react";
//
// // Validation schema using yup
// const validationSchema = yup.object().shape({
//     name: yup.string().required("Name is required"),
//     description: yup.string().optional(),
//     date: yup.string().required("Date is required"),
//     photo: yup.string().optional(),
//     location: yup.string().optional(),
//     liquors: yup.boolean().required(),
//     lowAlcohol: yup.boolean().required(),
//     midAlcohol: yup.boolean().required(),
//     highAlcohol: yup.boolean().required(),
//     createdByMe: yup.boolean().required()
// });
//
// interface PartySettingsPopUpProps {
//     show: boolean;
//     handleClose: () => void;
//     partyId: string;
//     initialData: {
//         name: string;
//         description?: string;
//         date: string;
//         photo?: string;
//         location?: string;
//         liquors: boolean;
//         lowAlcohol: boolean;
//         midAlcohol: boolean;
//         highAlcohol: boolean;
//         createdByMe: boolean;
//     };
// }
//
// const PartySettingsPopUp: React.FC<PartySettingsPopUpProps> = ({ show, handleClose, partyId, initialData }) => {
//     const { token } = useAuth();
//     const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
//         resolver: yupResolver(validationSchema),
//         defaultValues: initialData
//     });
//
//     useEffect(() => {
//         if (show) {
//             const dropdown = document.querySelector('.rs-picker-dropdown');
//             if (dropdown) {
//                 document.getElementById('portal-root')?.appendChild(dropdown);
//             }
//         }
//     }, [show]);
//
//     useEffect(() => {
//         if (initialData) {
//             reset(initialData);
//         }
//     }, [initialData, reset]);
//
//     const onSubmit = async (data: {
//         name: string;
//         description?: string;
//         date: string;
//         photo?: string;
//         location?: string;
//         liquors: boolean;
//         lowAlcohol: boolean;
//         midAlcohol: boolean;
//         highAlcohol: boolean;
//         createdByMe: boolean;
//     }) => {
//         console.log("Update party form submitted");
//         try {
//             const response = await UpdatePartyAPI(
//                 partyId,
//                 data.name,
//                 data.description,
//                 data.date,
//                 data.photo,
//                 data.location,
//                 data.liquors,
//                 data.lowAlcohol,
//                 data.midAlcohol,
//                 data.highAlcohol,
//                 token
//             );
//             toast.success("Party updated successfully!");
//             console.log(response);
//             handleClose();
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to update party");
//         }
//     };
//
//     return (
//         <Modal open={show} onClose={handleClose}>
//             <Modal.Header>
//                 <Modal.Title>Update Party Details</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="mb-3">
//                         <label htmlFor="name" className="form-label">Party Name</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="name"
//                             {...register("name")}
//                         />
//                         <p className="text-danger">{errors.name?.message}</p>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="description" className="form-label">Description</label>
//                         <textarea
//                             className="form-control"
//                             id="description"
//                             {...register("description")}
//                         />
//                         <p className="text-danger">{errors.description?.message}</p>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="date" className="form-label">Date and Time</label>
//                         <DatePicker
//                             format="yyyy-MM-dd HH:mm"
//                             oneTap
//                             onChange={(value) => {
//                                 if (value) {
//                                     const localDate = new Date(value);
//                                     localDate.setHours(localDate.getHours() + 2);
//                                     setValue("date", localDate.toISOString());
//                                 } else {
//                                     setValue("date", "");
//                                 }
//                             }}
//                             placement="auto"
//                             block
//                             ranges={[]}
//                         />
//                         <p className="text-danger">{errors.date?.message}</p>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="photo" className="form-label">Photo URL</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="photo"
//                             {...register("photo")}
//                         />
//                         <p className="text-danger">{errors.photo?.message}</p>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="location" className="form-label">Location</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="location"
//                             {...register("location")}
//                         />
//                         <p className="text-danger">{errors.location?.message}</p>
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Liquors Available</label>
//                         <Checkbox {...register("liquors")}>Yes</Checkbox>
//                         <p className="text-danger">{errors.liquors?.message}</p>
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Low Alcohol</label>
//                         <Checkbox {...register("lowAlcohol")}>Yes</Checkbox>
//                         <p className="text-danger">{errors.lowAlcohol?.message}</p>
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Mid Alcohol</label>
//                         <Checkbox {...register("midAlcohol")}>Yes</Checkbox>
//                         <p className="text-danger">{errors.midAlcohol?.message}</p>
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">High Alcohol</label>
//                         <Checkbox {...register("highAlcohol")}>Yes</Checkbox>
//                         <p className="text-danger">{errors.highAlcohol?.message}</p>
//                     </div>
//                     <Button appearance="primary" type="submit">
//                         Update Party
//                     </Button>
//                     <Button onClick={handleClose} appearance="subtle">
//                         Cancel
//                     </Button>
//                 </form>
//             </Modal.Body>
//         </Modal>
//     );
// };
//
// export default PartySettingsPopUp;
