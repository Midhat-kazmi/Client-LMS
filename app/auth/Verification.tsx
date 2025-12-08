"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useVerifyAccountMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  activationCode: Yup.string()
    .length(6, "Activation code must be 6 digits")
    .required("Please enter the activation code"),
});

const Verification: FC<Props> = ({ setRoute }) => {
  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { activationCode: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      setError("");
      try {
        const activationToken = localStorage.getItem("activationToken");
        if (!activationToken) {
          setError("No activation token found. Please sign up again.");
          return;
        }

        await verifyAccount({
          activation_token: activationToken,
          activation_code: values.activationCode,
        }).unwrap();

        toast.success("Account activated successfully!");
        localStorage.removeItem("activationToken");
        setRoute("Login");
      } catch (err: any) {
        setError(err?.data?.message || "Activation failed. Try again.");
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-purple-600">Account Verification</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Activation Code</label>
          <input
            type="text"
            name="activationCode"
            placeholder="Enter 6-digit code"
            value={values.activationCode}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.activationCode && touched.activationCode ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
          />
          {errors.activationCode && touched.activationCode && (
            <p className="text-red-500 text-sm mt-1">{errors.activationCode}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
        >
          {isLoading ? "Verifying..." : "Verify Account"}
        </button>

        <p className="text-center text-sm mt-4">
          Didn't receive the code?{" "}
          <span
            className="text-purple-600 font-semibold cursor-pointer"
            onClick={() => setRoute("SignUp")}
          >
            Resend
          </span>
        </p>
      </form>
    </div>
  );
};

export default Verification;
