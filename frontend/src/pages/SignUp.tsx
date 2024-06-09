import SignUpForm from "../Components/SignUpForm";
import Testimonial from "../Components/Testimonial";


 const SignUp = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <SignUpForm />
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <Testimonial />
      </div>
    </div>
  );
};

export default SignUp;