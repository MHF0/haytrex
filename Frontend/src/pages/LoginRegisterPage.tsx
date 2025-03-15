import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormDataType {
  mobileNumber: string;
  fullName: string;
  otp: string;
}

const LoginRegisterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    mobileNumber: "",
    fullName: "",
    otp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [otpTimer, setOtpTimer] = useState<number>(0);

  const handleTabChange = (tab: "login" | "register"): void => {
    setActiveTab(tab);
    setShowOtpField(false);
    setOtpTimer(0);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    // If mobile number input, only allow digits
    if (name === "mobileNumber") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: onlyDigits });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const startOtpTimer = (): void => {
    setOtpTimer(30);
    const timer = setInterval(() => {
      setOtpTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleRequestOtp = (): void => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real application, this would send an API request to get an OTP
      console.log("Requesting OTP for:", formData.mobileNumber);
      setShowOtpField(true);
      setIsSubmitting(false);
      startOtpTimer();
    }, 1000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!showOtpField) {
      handleRequestOtp();
      return;
    }

    setIsSubmitting(true);
    // Simulate API call for OTP verification
    setTimeout(() => {
      // Final submission with OTP
      console.log("Form submitted:", formData);
      setIsSubmitting(false);

      // In a real application, redirect to home page or show success message
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-900">
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="mb-2">
            <svg
              className="w-12 h-12 mx-auto text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {activeTab === "login" ? "Welcome Back!" : "Join Us Today!"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {activeTab === "login"
              ? "Login with your mobile number"
              : "Register with your mobile number"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            type="button"
            disabled={isSubmitting}
            className={`flex-1 py-2 font-medium text-sm transition-colors duration-300 ${
              activeTab === "login"
                ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            className={`flex-1 py-2 font-medium text-sm transition-colors duration-300 ${
              activeTab === "register"
                ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => handleTabChange("register")}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {activeTab === "register" && !showOtpField && (
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Enter your full name"
                required={activeTab === "register"}
                disabled={showOtpField || isSubmitting}
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Mobile Number
            </label>
            <div className="flex">
              <div className="bg-gray-100 border border-gray-300 rounded-l-lg px-3 py-2 text-gray-600 flex items-center dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                +1
              </div>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Enter your mobile number"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                disabled={showOtpField || isSubmitting}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Format: 10-digit number without spaces
            </p>
          </div>

          {showOtpField && (
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Verification Code (OTP)
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Enter 6-digit OTP"
                required
                pattern="[0-9]{6}"
                maxLength={6}
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  OTP sent to +1 {formData.mobileNumber}
                </p>
                {otpTimer > 0 ? (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Resend in {otpTimer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    onClick={handleRequestOtp}
                    disabled={isSubmitting}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:bg-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:disabled:bg-indigo-700 dark:disabled:opacity-60"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {!showOtpField ? "Sending OTP..." : "Verifying..."}
              </div>
            ) : !showOtpField ? (
              activeTab === "login" ? (
                "Get OTP"
              ) : (
                "Create Account"
              )
            ) : (
              "Verify & Continue"
            )}
          </button>

          {showOtpField && (
            <button
              type="button"
              onClick={() => setShowOtpField(false)}
              className="w-full mt-3 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              disabled={isSubmitting}
            >
              Back
            </button>
          )}
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {activeTab === "login" ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => handleTabChange("register")}
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors dark:text-indigo-400 dark:hover:text-indigo-300"
                disabled={isSubmitting}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => handleTabChange("login")}
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors dark:text-indigo-400 dark:hover:text-indigo-300"
                disabled={isSubmitting}
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
