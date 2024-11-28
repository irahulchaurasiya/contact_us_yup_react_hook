'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {DevTool} from "@hookform/devtools";

const schema = yup.object({
    firstname: yup.string()
    .min(3, "Firstname must be atleast 3 characters")
    .required("Firstname is required"),

    lastname: yup.string()
    .min(3, "Lastname must be atleast 3 characters")
    .required("Lastname is required"),

    email: yup.string().email("Email format is not vaid").required("Email is required"),
    
    phone: yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
   
    message: yup.string()
    .min(20 , "Message must be atleat 20 characters")
    .max(200 , "Message cannot exceed 200 characters")
    .required("Message is required")
})

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
};

const Page = () => {
  const { register, handleSubmit,control,  formState: { errors } } = useForm<Inputs>({
    defaultValues : {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message : ""
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <h2 className="text-center text-4xl font-bold mt-8">
        Contact Us
      </h2>
      <form
        className="flex flex-col justify-center items-center mt-4 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex space-x-8">
          <div className="flex flex-col">
            <label htmlFor="firstname" className="pl-1">First Name</label>
            <input
              className="text-black border-2 border-black rounded-lg p-2"
              type="text"
              id="firstname"
              placeholder="Enter your first name"
              {...register("firstname")}
            />
            {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="pl-1">Last Name</label>
            <input
              className="text-black border-2 border-black rounded-lg p-2"
              type="text"
              placeholder="Enter your last name"
              {...register("lastname")}
            />
            {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname.message}</span>}
          </div>
        </div>

        <div className="flex space-x-8">
          <div className="flex flex-col">
            <label className="pl-1">Email</label>
            <input
              className="text-black border-2 border-black rounded-lg p-2"
              type="text"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="pl-1">Phone</label>
            <input
              className="text-black border-2 border-black rounded-lg p-2"
              type="number"
              placeholder="Enter your phone number"
              {...register("phone")}
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="">Message</label>
          <textarea
            className="text-black border-2 border-black rounded-lg p-2"
            placeholder="Enter your message"
            rows={3}
            {...register("message")}
          />
        </div>
        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}

        <button className="text-black border-2 border-gray-600 bg-white mt-4 p-1 rounded-md"
         type="submit"
         >
          Submit
        </button>

        <DevTool control={control} />
      </form>
    </>
  );
};

export default Page;
