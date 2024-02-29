import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const UserList = () => {
  return (
    <div className="py-4 px-6">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium">User List</p>
        <Link
          to="./create"
          relative="path"
          className={`px-4 py-2 bg-purple-200 font-medium flex items-center space-x-1 rounded-lg hover:bg-purple-300`}
        >
          <IoMdAdd className="text-xl"/>
          <span>Add User</span>
        </Link>
      </div>
    </div>
  );
};

export default UserList;
