// // Input.tsx
// import React from 'react';
// import { UseFormRegister } from 'react-hook-form';
// import { UserProfile } from "../../Models/User";
//
// interface InputProps {
//     label: string;
//     id: string;
//     type?: string;
//     placeholder: string;
//     registerName: keyof UserProfile | `address.${keyof UserProfile['address']}`;
//     register: UseFormRegister<UserProfile>;
//     error?: string;
//     isAddressField?: boolean;
// }
//
// const Input: React.FC<InputProps> = ({
//                                          label,
//                                          id,
//                                          type = "text",
//                                          placeholder,
//                                          // registerName,
//                                          // register,
//                                          error,
//                                      }) => (
//     <div className="mb-3">
//         <label htmlFor={id} className="form-label">{label}</label>
//         <input
//             type={type}
//             id={id}
//             autoComplete={id}
//             className={`form-control ${error ? 'is-invalid' : ''}`}
//             placeholder={placeholder}
//             {...register(registerName as keyof UserProfile)}
//         />
//         {error && <div className="invalid-feedback">{error}</div>}
//     </div>
// );
//
// export default Input;
