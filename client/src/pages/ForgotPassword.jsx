import React, { useState } from "react";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { createApiUrl } from "../utils/apiConfig";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: verify, 2: new password, 3: success
  const [error, setError] = useState(null);
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !username) {
      setError("Please enter both email and username.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(createApiUrl("api/auth/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username }),
      });
      const data = await res.json();
      if (
        res.ok &&
        data.resetLink &&
        data.resetLink.includes("/reset-password/")
      ) {
        // Extract token from resetLink
        const token = data.resetLink.split("/reset-password/")[1];
        setResetToken(token);
        setStep(2);
      } else {
        setError(data.message || "Invalid email or username.");
      }
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(createApiUrl("api/auth/reset-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("Password reset successful! You can now sign in.");
        setStep(3);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        {step === 1 && (
          <form className="flex flex-col gap-4" onSubmit={handleVerifySubmit}>
            <div>
              <Label value="Enter your email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label value="Enter your username" />
              <TextInput
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Verifying...</span>
                </>
              ) : (
                "Verify"
              )}
            </Button>
            {error && <Alert color="failure">{error}</Alert>}
          </form>
        )}
        {step === 2 && (
          <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
            <div>
              <Label value="New Password" />
              <TextInput
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label value="Confirm New Password" />
              <TextInput
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Resetting...</span>
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
            {error && <Alert color="failure">{error}</Alert>}
          </form>
        )}
        {step === 3 && (
          <Alert color="success" className="mt-4 text-center">
            {successMsg}
            <div className="mt-4">
              <Link to="/sign-in" className="text-blue-500 hover:underline">
                Back to Sign In
              </Link>
            </div>
          </Alert>
        )}
        {step !== 3 && (
          <div className="mt-4 text-center">
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
