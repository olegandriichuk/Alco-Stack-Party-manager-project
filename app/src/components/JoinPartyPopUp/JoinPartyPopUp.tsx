import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Modal, Button } from "rsuite";
import { JoinPartyAPI } from "../../Services/PartyService.tsx";
import 'rsuite/dist/rsuite.min.css';
import "./JoinPartyPopUp.css";
import { useEffect } from "react";

// Validation schema using yup
const validationSchema = yup.object().shape({
    partyId: yup.string().required("Party ID is required"),
});

interface CreatePartyPopUpProps {
    show: boolean;
    handleClose: () => void;
}

const JoinPartyPopUp: React.FC<CreatePartyPopUpProps> = ({ show, handleClose }) => {
    const { token } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
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

    const onSubmit = async (data: { partyId: string }) => {
        try {
            const response = await JoinPartyAPI(
                data.partyId,
                token
            );
            toast.success("Party joined successfully!");
            console.log(response);
            handleClose(); // Close the modal on success
        } catch (error) {
            console.error(error);
            toast.error("Failed to join party");
        }
    };

    return (
        <Modal open={show} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Join Party</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Party ID</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register("partyId")}
                        />
                        <span className="text-danger">{errors.partyId?.message}</span>
                    </div>
                    <Button type="submit" appearance="primary" className="mt-3">Join Party</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default JoinPartyPopUp;