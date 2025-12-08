"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../styles/style";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setActivationToken } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please Enter Your Name"),
  email: Yup.string().email("Invalid Email!").required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, isSuccess }] = useSignupMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      // Save activation token & code in Redux & localStorage
      dispatch(setActivationToken(data.activation_token));
      localStorage.setItem("activationToken", data.activation_token);
      localStorage.setItem("activationCode", data.activation_code);

      toast.success("Registration Successful!");
      setRoute("verification"); // Switch to OTP screen
    }
  }, [isSuccess, data, dispatch, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values) => await register(values),
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className={styles.label}>Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={values.name}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.name && touched.name ? "border-red-500" : "border-gray-300"
            } focus:border-purple-500`}
          />
          {errors.name && touched.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="yourmail@gmail.com"
            value={values.email}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.email && touched.email ? "border-red-500" : "border-gray-300"
            } focus:border-purple-500`}
          />
          {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <label className={styles.label}>Password</label>
          <input
            type={show ? "text" : "password"}
            id="password"
            name="password"
            placeholder="•••••••"
            value={values.password}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.password && touched.password ? "border-red-500" : "border-gray-300"
            } focus:border-purple-500`}
          />
          {show ? (
            <AiOutlineEye
              size={22}
              className="absolute right-3 bottom-10 cursor-pointer text-gray-600"
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={22}
              className="absolute right-3 bottom-10 cursor-pointer text-gray-600"
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
          Sign Up
        </button>

        {/* Social */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">OR continue with</div>
        <div className="flex items-center justify-center gap-4">
          <FcGoogle size={32} />
          <AiFillGithub size={32} />
        </div>

        {/* Switch */}
        <p className="text-center text-sm mt-4">
          Already have an account?
          <span
            className="text-purple-600 font-semibold cursor-pointer ml-1"
            onClick={() => setRoute("Login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
