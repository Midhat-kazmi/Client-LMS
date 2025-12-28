"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../styles/style";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (route: boolean) => void;
  refetch: () => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email!")
    .required("Please Enter Your Email!"),
  password: Yup.string().required("Please Enter Your Password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  const { errors, handleChange, touched, values, handleSubmit } = formik;

useEffect(() => {
  if (isSuccess) {
    toast.success("Login Successfully!");
    setOpen(false); // Header updates automatically
  }

  if (error && "data" in error) {
    const err = error as any;
    toast.error(err.data.message);
  }
}, [isSuccess, error, setOpen]);


  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
        Login to E-Learning
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            value={values.email}
            name="email"
            onChange={handleChange}
            placeholder="yourmail@gmail.com"
            className={`${styles.input} ${
              errors.email && touched.email ? "border-red-500" : "border-gray-300"
            } focus:border-purple-500`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
       <div className="relative">
  <label className={styles.label}>Password</label>

  <input
    type={show ? "text" : "password"}
    id="password"
    value={values.password}
    name="password"
    onChange={handleChange}
    placeholder="•••••••"
    className={`${styles.input} ${
      errors.password && touched.password ? "border-red-500" : "border-gray-300"
    } focus:border-purple-500`}
  />

  {show ? (
    <AiOutlineEye
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
      size={22}
      onClick={() => setShow(false)}
    />
  ) : (
    <AiOutlineEyeInvisible
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
      size={22}
      onClick={() => setShow(true)}
    />
  )}

  {errors.password && touched.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
  )}
</div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
        >
          Login
        </button>

        {/* Social Login */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          OR continue with
        </div>

        <div className="flex items-center justify-center gap-4">
          <FcGoogle
            size={32}
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={32}
            className="cursor-pointer hover:scale-110 transition-transform text-gray-800 dark:text-white"
            onClick={() => signIn("github")}
          />
        </div>

        {/* Switch Route */}
        <p className="text-center text-sm mt-4">
          Don't have an account?
          <span
            className="text-purple-600 font-semibold cursor-pointer ml-1"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
