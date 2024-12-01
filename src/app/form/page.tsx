"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import { Box, TextField, Button, Typography, Grid2, Grid } from "@mui/material";

const schema = yup.object({
  firstname: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "First Name only contains alphabets")
    .min(3, "Firstname must be atleast 3 characters")
    .max(20, "Firstname cannnot exceed 20 characters")
    .required("Firstname is required"),

  lastname: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Last Name only contains alphabets")
    .min(3, "Lastname must be atleast 3 characters")
    .max(20, "Firstname cannnot exceed 20 characters")
    .required("Lastname is required"),

  email: yup
    .string()
    .email("Email format is not vaid")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  message: yup
    .string()
    .min(20, "Message must be atleat 20 characters")
    .max(200, "Message cannot exceed 200 characters")
    .required("Message is required"),
});

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);

    reset();
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" align="center" color="black">
        Contact Us
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          {...register("firstname")}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          {...register("lastname")}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{ alignSelf: "center" }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Box>
      <DevTool control={control} />
    </Box>
  );
};

export default Page;
