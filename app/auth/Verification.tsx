"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { useVerifyAccountMutation } from "../../redux/features/auth/authApi";
import { styles } from "../styles/style";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const { token } = useSelector((state: any) => state.auth);
  const [verifyAccount, { isSuccess, error }] = useVerifyAccountMutation();

  const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  // Handle API response
  useEffect(() => {
    if (isSuccess) {
      toast.success("Account Activated Successfully!");
      setRoute("Login");
    }
    if (error && "data" in error) {
      toast.error((error as any).data.message);
      setInvalidError(true);
    }
  }, [isSuccess, error, setRoute]);

  // Handle OTP verification
  const verificationHandler = async () => {
    const verificationCode = Object.values(verifyNumber).join("");
    if (verificationCode.length !== 6 || Object.values(verifyNumber).some((v) => v === "")) {
      setInvalidError(true);
      return;
    }
    if (!token) {
      toast.error("Activation token missing. Please resend OTP.");
      return;
    }

    await verifyAccount({
      activation_code: verificationCode,
      activation_token: token,
    });
  };

  // Handle input change and focus
  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // allow only single digit numbers

    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle backspace to move focus backward
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verifyNumber[index as keyof VerifyNumber] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-20 h-20 rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={30} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => {
          const k = key as keyof VerifyNumber; // <-- fix TypeScript key issue
          return (
            <input
              key={k}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              ref={inputRefs[index]}
              value={verifyNumber[k]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                invalidError
                  ? "shake border-red-500"
                  : "dark:border-white border-[#0000004a]"
              }`}
            />
          );
        })}
      </div>
      <br />
      <div className="w-full flex justify-center">
        <button className={`${styles.button}`} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go Back to sign in?
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          SignIn
        </span>
      </h5>
    </div>
  );
};

export default Verification;
