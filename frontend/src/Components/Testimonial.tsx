

const Testimonial = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <blockquote className="text-xl italic font-semibold text-gray-900">
          “The customer service I received was exceptional. The support team went above and beyond to address my concerns.”
        </blockquote>
        <p className="mt-4 text-gray-700">
          <strong>Jules Winnfield</strong><br />
          CEO, Acme Inc
        </p>
      </div>
    </div>
  );
};

export default Testimonial;