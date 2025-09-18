"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import React, {
  ChangeEvent,
  KeyboardEvent,
  Suspense,
  useRef,
  useState,
} from "react";

function ForgotPasswordChild() {
  const router=useRouter()
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const { value } = e.target;
    // Allow only single digit numbers
    if (!/^\d?$/.test(value)) return;

    const updated = [...code];
    updated[i] = value;
    setCode(updated);

    // Auto-focus next input
    if (value && i < 5) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    // Backspace focuses previous input if current is empty
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (!/^\d{6}$/.test(pastedData)) {
      setError("Please paste a 6-digit number.");
      return;
    }
    setError("");
    setCode(pastedData.split(""));
  };

  const handleVerify = async () => {
    setIsError("");
    try {
      const joinedCode = code.join("");
      if (joinedCode.length < 6) {
        setError("Please enter all 6 digits.");
      } else {
        const value = { email, otp: code.join("") };
        console.log(value);
         router.push("/new-password?email=julfiker755.bd@gmail.com")
        setError("");
      }
    } catch (err: any) {
      if (err?.data?.message) {
        setIsError(err?.data?.message);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative z-10">
      <div className="md:m-0 w-11/12 lg:w-0 lg:min-w-lg px-4 pt-4 pb-6 rounded-2xl bg-[#A7A7A7]/10 backdrop-blur-2xl">
        <div className="mb-6 space-y-2">
          <FavIcon className="w-[80px] h-[66px] mx-auto" name="logo" />
          <h1 className="text-2xl font-bold text-center">
            Verify Your Identity
          </h1>
          <h1 className="text-figma-gray text-center">
            Please provide valid information to access your account
          </h1>
        </div>
        <div className="flex justify-center space-x-3 my-10">
          {code.map((digit, i) => (
            <Input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              className="w-12 h-12 text-center text-lg font-medium border-none bg-figma-chart rounded-md"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        {isError && (
          <p className="text-red-500 text-sm text-center mb-4">{isError}</p>
        )}

        <div className="flex justify-center">
          <Button variant={"primary"} className="w-full" onClick={handleVerify}>
            Verify code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordParent() {
  return (
    <Suspense>
      <ForgotPasswordChild />
    </Suspense>
  );
}
