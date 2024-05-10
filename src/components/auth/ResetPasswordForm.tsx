const ResetPasswordForm = () => {
  return (
    <>
      <form className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 p-2 border rounded w-full"

        />
        <button
            className="bg-pink-400 mt-4 w-full hover:bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Kirim !
          </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
