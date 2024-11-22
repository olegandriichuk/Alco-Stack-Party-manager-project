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
    date: yup
        .string()
        .required("Date is required"),
        // .test(
        //     "is-future-date",
        //     "Date must be today or in the future",
        //     function (value) {
        //         if (!value) return false; // Ensure value is provided
        //         const selectedDate = new Date(value);
        //         const today = new Date();
        //         today.setHours(0, 0, 0, 0); // Reset today's time to midnight for comparison
        //         return selectedDate >= today;
        //     }
        // ),
    preparationDate: yup
        .string()
        .required("Preparation Date is required")
        // .test(
        //     "is-before-date",
        //     "Preparation Date must be earlier than the event date",
        //     function (value) {
        //         const { date } = this.parent;
        //         if (!value || !date) return true; // Skip if either is missing
        //         const preparationDate = new Date(value);
        //         const eventDate = new Date(date);
        //         return preparationDate < eventDate;
        //     }
        // )
        // .test(
        //     "not-today",
        //     "Preparation Date cannot be today",
        //     function (value) {
        //         if (!value) return true;
        //         const preparationDate = new Date(value).toISOString().split("T")[0];
        //         const today = new Date().toISOString().split("T")[0];
        //         return preparationDate !== today;
        //     }
        // )
    ,
    location: yup.string().optional(),
    liquors: yup.boolean().required(),
    lowAlcohol: yup.boolean().required(),
    midAlcohol: yup.boolean().required(),
    highAlcohol: yup.boolean().required(),
    rankLimit: yup.number().required("Rank limit is required").min(1, "Rank limit must be at least 1")
});

interface PartySettingsPopUpProps {
    name: string;
    description: string;
    date: string; // date passed as a string (ISO format)
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
        defaultValues: { name, description, date, preparationDate, photo, location, liquors, lowAlcohol, midAlcohol, highAlcohol, rankLimit }
    });

    const watchLiquors = watch("liquors", liquors);
    const watchLowAlcohol = watch("lowAlcohol", lowAlcohol);
    const watchMidAlcohol = watch("midAlcohol", midAlcohol);
    const watchHighAlcohol = watch("highAlcohol", highAlcohol);

    const onSubmit: SubmitHandler<PartyDetailPut> = async (data) => {
        try {
            // console.log("Data in party settings:", data);
            // await onSave(data); // Use the onSave callback
            // // toast.success("Party updated successfully!");
            // onClose();
            data.date = new Date(data.date).toISOString();
            data.preparationDate = new Date(data.preparationDate).toISOString();
            await onSave(data);
            onClose();
        } catch (error) {
            console.error("Failed to update party", error);
            toast.error("Failed to update party");
        }
    };

    // useEffect(() => {
    //     if (show) {
    //         // Set initial date when modal opens
    //         if (date) {
    //             setValue('date', new Date(date).toISOString());
    //         }
    //         if (preparationDate) {
    //             setValue('preparationDate', new Date(preparationDate).toISOString());
    //         }
    //         const dropdown = document.querySelector('.rs-picker-dropdown');
    //         if (dropdown) {
    //             document.getElementById('portal-root')?.appendChild(dropdown);
    //         }
    //     }
    // }, [show, date, preparationDate, setValue]);

    useEffect(() => {
        if (show) {
            if (date) {
                // Конвертуємо дату з UTC у локальний час
                const localDate = new Date(date).toLocaleString('sv-SE').replace(' ', 'T');
                setValue('date', localDate);
            }
            if (preparationDate) {
                const localPreparationDate = new Date(preparationDate).toLocaleString('sv-SE').replace(' ', 'T');
                setValue('preparationDate', localPreparationDate);
            }
        }
    }, [show, date, preparationDate, setValue]);



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
                                        setValue("date", localDate.toLocaleString('sv-SE').replace(' ', 'T')); // Зберегти у локальному форматі ISO
                                    } else {
                                        setValue("date", "");
                                    }
                                }}
                                placement="auto"
                                block
                                ranges={[]} // Remove preset ranges if any
                            />
                            <p className="text-danger">{errors.date?.message}</p>
                        </div>

                        {/* Preparation Date Section */}
                        <div className="mb-3">
                            <label htmlFor="preparationDate" className="form-label">Preparation Date and Time</label>
                            <DatePicker
                                format="yyyy-MM-dd HH:mm"
                                oneTap
                                value={new Date(watch('preparationDate'))} // Watch the preparationDate value
                                onChange={(value) => {
                                    if (value) {
                                        const localDate = new Date(value);
                                        setValue("preparationDate", localDate.toLocaleString('sv-SE').replace(' ', 'T')); // Локальний час
                                    } else {
                                        setValue("preparationDate", "");
                                    }
                                }}
                                placement="auto"
                                block
                                ranges={[]} // Remove preset ranges if any
                            />

                            <p className="text-danger">{errors.preparationDate?.message}</p>
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
                        <div className="mb-3">
                            <label htmlFor="rankLimit" className="form-label">Rank Limit</label>
                            <Input
                                id="rankLimit"
                                type="number"
                                {...register("rankLimit")}
                                onChange={(value) => setValue("rankLimit", parseInt(value))}
                            />
                            {errors.rankLimit && <p className="text-danger">{errors.rankLimit.message}</p>}
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
