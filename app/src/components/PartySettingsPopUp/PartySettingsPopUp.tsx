import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal, Button, DatePicker, Input, Toggle } from 'rsuite';
import { PartyDetailPut } from '../../Models/Party.tsx';
import './PartySettingsPopUp.css';
import { toast } from 'react-toastify';

// Define validation schema with Yup
const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().optional(),
    photo: yup.string().optional(),
    date: yup.string().required("Date is required"),
    location: yup.string().optional(),
    liquors: yup.boolean().required(),
    lowAlcohol: yup.boolean().required(),
    midAlcohol: yup.boolean().required(),
    highAlcohol: yup.boolean().required()
});

interface PartySettingsPopUpProps {
    name: string;
    description: string;
    date: string; // date passed as a string (ISO format)
    photo: string;
    location: string;
    liquors: boolean;
    lowAlcohol: boolean;
    midAlcohol: boolean;
    highAlcohol: boolean;
    show: boolean;
    onClose: () => void;
    onSave: (updatedParty: PartyDetailPut) => Promise<void>;
}

const PartySettingsPopUp: React.FC<PartySettingsPopUpProps> = ({
                                                                   name,
                                                                   description,
                                                                   date,
                                                                   photo,
                                                                   location,
                                                                   liquors,
                                                                   lowAlcohol,
                                                                   midAlcohol,
                                                                   highAlcohol,
                                                                   show,
                                                                   onClose,
                                                                   onSave
                                                               }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<PartyDetailPut>({
        resolver: yupResolver(validationSchema),
        defaultValues: { name, description, date, photo, location, liquors, lowAlcohol, midAlcohol, highAlcohol }
    });

    const watchLiquors = watch("liquors", liquors);
    const watchLowAlcohol = watch("lowAlcohol", lowAlcohol);
    const watchMidAlcohol = watch("midAlcohol", midAlcohol);
    const watchHighAlcohol = watch("highAlcohol", highAlcohol);

    const onSubmit: SubmitHandler<PartyDetailPut> = async (data) => {
        try {
            await onSave(data); // Use the onSave callback
            // toast.success("Party updated successfully!");
            onClose();
        } catch (error) {
            console.error("Failed to update party", error);
            toast.error("Failed to update party");
        }
    };

    useEffect(() => {
        if (show) {
            // Set initial date when modal opens
            if (date) {
                setValue('date', new Date(date).toISOString());
            }
            const dropdown = document.querySelector('.rs-picker-dropdown');
            if (dropdown) {
                document.getElementById('portal-root')?.appendChild(dropdown);
            }
        }
    }, [show, date, setValue]);

    return (
        <>
            {show && <div className="modal-backdrop" />} {/* Add this backdrop */}
            <Modal open={show} onClose={onClose} size="md">
                <Modal.Header>
                    <Modal.Title>Edit Party Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Party Name</label>
                            <Input
                                id="name"
                                {...register("name")}
                                className={errors.name ? "is-invalid" : ""}
                                onChange={(value) => setValue("name", value)}
                            />
                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <Input
                                id="description"
                                {...register("description")}
                                onChange={(value) => setValue("description", value)}
                            />
                            {errors.description && <p className="text-danger">{errors.description.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date and Time</label>
                            <DatePicker
                                format="yyyy-MM-dd HH:mm"
                                oneTap
                                value={new Date(watch('date'))} // Watch the date value
                                onChange={(value) => {
                                    if (value) {
                                        const localDate = new Date(value);
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
                            <Input
                                id="photo"
                                {...register("photo")}
                                onChange={(value) => setValue("photo", value)}
                            />
                            {errors.photo && <p className="text-danger">{errors.photo.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <Input
                                id="location"
                                {...register("location")}
                                onChange={(value) => setValue("location", value)}
                            />
                            {errors.location && <p className="text-danger">{errors.location.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="liquors" className="form-label">Liquors</label>
                            <Toggle
                                id="liquors"
                                checked={watchLiquors}
                                onChange={(checked) => setValue("liquors", checked)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lowAlcohol" className="form-label">Low Alcohol</label>
                            <Toggle
                                id="lowAlcohol"
                                checked={watchLowAlcohol}
                                onChange={(checked) => setValue("lowAlcohol", checked)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="midAlcohol" className="form-label">Mid Alcohol</label>
                            <Toggle
                                id="midAlcohol"
                                checked={watchMidAlcohol}
                                onChange={(checked) => setValue("midAlcohol", checked)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="highAlcohol" className="form-label">High Alcohol</label>
                            <Toggle
                                id="highAlcohol"
                                checked={watchHighAlcohol}
                                onChange={(checked) => setValue("highAlcohol", checked)}
                            />
                        </div>
                        <Button appearance="primary" type="submit">
                            Save Changes
                        </Button>
                        <Button onClick={onClose} appearance="subtle">
                            Cancel
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PartySettingsPopUp;
