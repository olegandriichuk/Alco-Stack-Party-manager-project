import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { toast } from "react-toastify";
import * as yup from "yup";
import { DatePicker, Modal, Button } from "rsuite";
import { CreatePartyAPI } from "../../Services/PartyService.tsx";
import 'rsuite/dist/rsuite.min.css';
import "./CreatePartyPopUp.css";
import { useEffect } from "react";

// Validation schema using yup
const validationSchema = yup.object().shape({
    name: yup.string().optional(),
    description: yup.string().optional(),
    date: yup.string().required("Date is required"),
    photo: yup.string().optional(),
    location: yup.string().optional(),
});

interface CreatePartyPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const CreatePartyPopUp: React.FC<CreatePartyPopUpProps> = ({ show, handleClose }) => {
    const { user, token } = useAuth();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if (show) {
            const dropdown = document.querySelector('.rs-picker-dropdown');
            if (dropdown) {
                document.getElementById('portal-root')?.appendChild(dropdown);
            }
        }
    }, [show]);

    const onSubmit = async (data: { name?: string; description?: string; date: string; photo?: string; location?: string; }) => {
        console.log("Create party form submitted");
        console.log(data.date);
        try {
            const response = await CreatePartyAPI(
                data.name || "",
                data.description || "",
                data.date,
                data.photo || "",
                data.location || "",
                user?.userName,
                token
            );
            toast.success("Party created successfully!");
            console.log(response);
            handleClose(); // Close the modal on success
        } catch (error) {
            console.error(error);
            toast.error("Failed to create party");
        }
    };

    return (
        <>
            {show && <div className="modal-backdrop create-party" />} {/* Add this backdrop */}
            <Modal open={show} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create New Party</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Party Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                {...register("name")}
                            />
                            <p className="text-danger">{errors.name?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                {...register("description")}
                            />
                            <p className="text-danger">{errors.description?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date and Time</label>
                            <DatePicker
                                format="yyyy-MM-dd HH:mm"
                                oneTap
                                onChange={(value) => {
                                    if (value) {
                                        const localDate = new Date(value);
                                        console.log("Local Date:", localDate);
                                        localDate.setHours(localDate.getHours() + 2);
                                        setValue("date", localDate.toISOString());
                                    } else {
                                        setValue("date", "");
                                    }
                                }}
                                placement="auto"
                                block
                                ranges={[]}  // Remove preset ranges if any
                            />
                            <p className="text-danger">{errors.date?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Photo URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="photo"
                                {...register("photo")}
                            />
                            <p className="text-danger">{errors.photo?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                id="location"
                                {...register("location")}
                            />
                            <p className="text-danger">{errors.location?.message}</p>
                        </div>
                        <Button appearance="primary" type="submit">
                            Create Party
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                            Cancel
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreatePartyPopUp;
