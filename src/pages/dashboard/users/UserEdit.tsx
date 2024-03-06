import { useParams } from "react-router-dom";

const UserEdit = () => {
  const { user_id } = useParams();

  return (
    <div className="px-6 py-4">
      <p className="text-2xl font-semibold text-center mb-4">
        Edit User {user_id}
      </p>
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <form className="flex flex-col p-4 space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border p-2 rounded-lg"
              disabled
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border p-2 rounded-lg"
              disabled
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="role" className="text-lg font-medium">
              Role
            </label>
            <select id="role" className="border p-2 rounded-lg" disabled>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-lg font-medium">
              Currency Amount
            </label>
            <input
              type="number"
              id="currency"
              className="border p-2 rounded-lg"
              defaultValue={0}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-purple-200 font-medium flex justify-center items-center space-x-1 rounded-lg hover:bg-purple-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
