import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal, Button, DatePicker, Input} from 'rsuite';
import { PartyDetailPut } from '../../Models/Party.tsx';
import './PartySettingsPopUp.css';
import backpop from '../../assets/signUp_card.svg';
import { toast } from 'react-toastify';

// Validation schema with Yup
const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().optional(),
    photo: yup.string().optional(),
    date: yup.string().required("Date is required"),
    preparationDate: yup.string().required("Preparation Date is required"),
    location: yup.string().optional(),
    liquors: yup.boolean().required(),
    lowAlcohol: yup.boolean().required(),
    midAlcohol: yup.boolean().required(),
    highAlcohol: yup.boolean().required(),
    rankLimit: yup.number().required("Rank limit is required").min(1, "Rank limit must be at least 1"),
});

interface PartySettingsPopUpProps {
    name: string;
    description: string;
    date: string;
    preparationDate: string;
    photo: string;
    location: string;
    liquors: boolean;
    lowAlcohol: boolean;
    midAlcohol: boolean;
    highAlcohol: boolean;
    rankLimit: number;
    show: boolean;
    onClose: () => void;
    onSave: (updatedParty: PartyDetailPut) => Promise<void>;
}

const PartySettingsPopUp: React.FC<PartySettingsPopUpProps> = ({
                                                                   name,
                                                                   description,
                                                                   date,
                                                                   preparationDate,
                                                                   photo,
                                                                   location,
                                                                   liquors,
                                                                   lowAlcohol,
                                                                   midAlcohol,
                                                                   highAlcohol,
                                                                   rankLimit,
                                                                   show,
                                                                   onClose,
                                                                   onSave,
                                                               }) => {
    const {

        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PartyDetailPut>({
        resolver: yupResolver(validationSchema),
        defaultValues: { name, description, date, preparationDate, photo, location, liquors, lowAlcohol, midAlcohol, highAlcohol, rankLimit },
    });

    useEffect(() => {
        if (show) {
            if (date) setValue('date', date);
            if (preparationDate) setValue('preparationDate', preparationDate);
        }
    }, [show, date, preparationDate, setValue]);

    const onSubmit: SubmitHandler<PartyDetailPut> = async (data) => {
        try {
            await onSave(data);
            toast.success("Party updated successfully!");
            onClose();
        } catch (error) {
            toast.error("Failed to update party");
        }
    };

    return (
        <>
            {show && <div className="modal-backdrop" />}
            <Modal
                open={show}
                onClose={onClose}
                size="sm" /* Установите меньший размер окна */
                className="party-settings-modal"
            >
                <div
                    className="party-setings-popup-container"
                    style={{
                        backgroundImage: `url(${backpop})`,
                        backgroundSize: 'cover',

                        borderRadius: '15px', /* Уменьшите радиус для компактности */
                        padding: '15px', /* Уменьшите внутренние отступы */
                    }}
                >
                    <Modal.Header>
                        <Modal.Title className="modal-title-bold">Edit Party Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Party Name</label>
                                <Input
                                    id="name"
                                    value={watch("name")}
                                    onChange={(value) => setValue("name", value)}
                                    className={`custom-input ${errors.name ? "is-invalid" : ""}`}
                                />
                                {errors.name && <p className="text-danger">{errors.name.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <Input
                                    id="description"
                                    value={watch("description")}
                                    onChange={(value) => setValue("description", value)}
                                    className="custom-input"
                                />
                                {errors.description && <p className="text-danger">{errors.description.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date and Time</label>
                                <DatePicker
                                    format="yyyy-MM-dd HH:mm"
                                    value={new Date(watch('date'))}
                                    onChange={(value) => setValue("date", value ? value.toISOString() : "")}
                                    className="custom-input-datepicker"
                                />
                                {errors.date && <p className="text-danger">{errors.date.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="preparationDate" className="form-label">Preparation Date</label>
                                <DatePicker
                                    format="yyyy-MM-dd HH:mm"
                                    value={new Date(watch('preparationDate'))}
                                    onChange={(value) => setValue("preparationDate", value ? value.toISOString() : "")}
                                    className="custom-input-datepicker"
                                />
                                {errors.preparationDate && <p className="text-danger">{errors.preparationDate.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">Photo URL</label>
                                <Input
                                    id="photo"
                                    value={watch("photo")}
                                    onChange={(value) => setValue("photo", value)}
                                    className="custom-input"
                                />
                                {errors.photo && <p className="text-danger">{errors.photo.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <Input
                                    id="location"
                                    value={watch("location")}
                                    onChange={(value) => setValue("location", value)}
                                    className="custom-input"
                                />
                                {errors.location && <p className="text-danger">{errors.location.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rankLimit" className="form-label">Rank Limit</label>
                                <Input
                                    id="rankLimit"
                                    type="number"
                                    value={watch("rankLimit")?.toString()}
                                    onChange={(value) => setValue("rankLimit", parseInt(value))}
                                    className="custom-input"
                                />
                                {errors.rankLimit && <p className="text-danger">{errors.rankLimit.message}</p>}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button type="submit" appearance="primary">Save Changes</Button>
                                <Button onClick={onClose} appearance="subtle">Cancel</Button>
                            </div>
                        </form>
                    </Modal.Body>
                </div>
            </Modal>

        </>
    );
};

export default PartySettingsPopUp;
