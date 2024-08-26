// import React from 'react';
// import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
//
// interface FormInputProps {
//     label: string;
//     id: string;
//     type: string;
//     autoComplete: string;
//     placeholder: string;
//     register: UseFormRegister<FieldValues>;
//     errors: Record<string, FieldError | undefined>;
// }
//
// const FormInput: React.FC<FormInputProps> = ({ label, id, type, autoComplete, placeholder, register, errors }) => {
//     return (
//         <div className="mb-3">
//             <label htmlFor={id} className="form-label">{label}</label>
//             <input
//                 type={type}
//                 id={id}
//                 autoComplete={autoComplete}
//                 className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
//                 placeholder={placeholder}
//                 {...register(id)}
//             />
//             {errors[id] && (
//                 <div className="invalid-feedback">{errors[id]?.message}</div>
//             )}
//         </div>
//     );
// };
//
// export default FormInput;
