// // utils/registerUser.js

// import axios from "axios";
// import toast from "react-hot-toast";
// import { generateRandomPassword } from './passwordGenerator';
// import { baseUrl } from "@/lib/globalvariables";

// export const registerUser = async (user) => {
//   const randomPassword = generateRandomPassword();
//   const userData = {
//     email: user.email,
//     password: randomPassword,
//     firstname: user.firstname,
//     lastname: user.lastname,
//   };

//   try {
//     const response = await axios.post(`${baseUrl}/createUser`, userData);
//     if (response.status === 201) {
//       toast.success(`User successfully created. Password: ${randomPassword}`);
//       return randomPassword;
//     } else {
//       toast.error("Error creating user");
//       return null;
//     }
//   } catch (error) {
//     toast.error("Error creating user");
//     return null;
//   }
// };