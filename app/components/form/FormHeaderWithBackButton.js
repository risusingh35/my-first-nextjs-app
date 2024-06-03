import { useRouter } from 'next/navigation';

const FormHeaderWithBackButton = ({ title ,backUrl }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push(backUrl);
  };

  return (
    <div className="flex items-center justify-between py-2 px-4 bg-gray-500">
      <div className="text-white text-lg font-semibold">
        {title}
      </div>
      <div>
        <button
          className="ml-3 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default FormHeaderWithBackButton;
