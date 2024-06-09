import { useState } from "react";
import { Link } from "react-router-dom";
import SimpleAlert from "./Alert"; // Updated import to use the correct Alert component
import { useNavigate } from "react-router-dom";
import { SignupSchema, signupSchema } from "@manojnoochila/medium-common";
import axios from "axios";
import Skeleton from "./Skeleton";

function SignUpForm() {
    const navigate = useNavigate();

    const [signup, setSignup] = useState<SignupSchema>({
        email: "",
        password: "",
        name: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    // Corrected individual setters for each field
    const setEmail = (email: string) => {
        setSignup(prevState => ({ ...prevState, email }));
    };
    const setPassword = (password: string) => {
        setSignup(prevState => ({ ...prevState, password }));
    };
    const setName = (name: string) => {
        setSignup(prevState => ({ ...prevState, name }));
    };

    const handleSignUp = async () => {
        setIsLoading(true);
        const result = signupSchema.safeParse(signup);

        if (!result.success) {
            const errors = result.error.issues.map(issue => issue.message).join(", ");
            setAlertMessage(errors);
            setIsLoading(false);
            return; // Return early if validation fails
        }
        // Here you would typically handle the POST request to your backend
        try {
            const res = await axios.post("https://backend.manojnoochila.workers.dev/api/v1/user/signup", signup);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userName", res.data.name);
            setAlertMessage(null); // Clear any previous error messages
            navigate("/");
        } catch (error) {
            setAlertMessage("Failed to sign up. Please try again.");
        }
        setIsLoading(false);
    };
    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
                <p className="text-center mb-6">
                    Already have an account? <Link to="/signin" className="text-blue-500">Login</Link>
                </p>
                {alertMessage && <SimpleAlert message={alertMessage} />}
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                        type="button"
                        onClick={handleSignUp}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;