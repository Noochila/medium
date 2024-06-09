import SignInForm from "../Components/SignInForm";
import Testimonial from "../Components/Testimonial";


 const SignIn = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <SignInForm />
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <Testimonial />
      </div>
    </div>
  );
};

export default SignIn;