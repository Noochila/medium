import { useState } from "react";
import { Link } from "react-router-dom";
import SimpleAlert from "./Alert";
import { SigninSchema, signinSchema } from "@manojnoochila/medium-common";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const SignInForm = () => {
  const navigate = useNavigate();
  const [signin, setSignin] = useState<SigninSchema>({
    email: "",
    password: ""
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setEmail = (email: string) => {
    setSignin(prevState => ({ ...prevState, email }));
  };

  const setPassword = (password: string) => {
    setSignin(prevState => ({ ...prevState, password }));
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    const result = signinSchema.safeParse(signin);

    if (!result.success) {
      const errors = result.error.issues.map(issue => issue.message).join(", ");
      setAlertMessage(errors);
      setIsLoading(false);
      return; // Return early if validation fails
    }
    // Here you would typically handle the POST request to your backend
    // console.log("Sign in data is valid:", result.data);
    try {
      const res = await axios.post("https://backend.manojnoochila.workers.dev/api/v1/user/signin", result.data);
      localStorage.setItem("token", (res.data.token));
      localStorage.setItem("userName", res.data.name);
      setAlertMessage(null); // Clear any previous error messages
      navigate("/");
    } catch (error) {
      setAlertMessage("Failed to sign in. Please try again.");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <p className="text-center mb-6">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
        {alertMessage && <SimpleAlert message={alertMessage} />}
        <form onSubmit={e => { e.preventDefault(); handleSignIn(); }}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;