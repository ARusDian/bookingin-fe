import api from "@lib/api";
import { AxiosErrorResponse, UserForm } from "@lib/model";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormHead from "../../components/FormHead";
// import {
//   currencyDeformatter,
//   currencyFormatter,
// } from "@utils/currency_formatter";
// import { useQuery } from "@tanstack/react-query";

type EditUserForm = Omit<UserForm, "password">;

const putUser = async (user_id: string, data: EditUserForm, token: string) => {
  const { data: response } = await api.put(
    `/admin/user/edit/${user_id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const UserEdit = () => {
  const [cookies] = useCookies(["token"]);
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<EditUserForm>({
    name: "",
    email: "",
    phone: "",
    role: "user",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EditUserForm) => putUser(user_id!, data, cookies.token),
    onError: (error: AxiosError) => {
      const errorData: AxiosErrorResponse = error.response
        ?.data as AxiosErrorResponse;
      toast.error(errorData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onSuccess: (data) => {
      navigate("../..", { relative: "path" });
      setTimeout(() => {
        toast.success(data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div className="px-6 py-4">
      <FormHead title="Edit User" linkBack="../.." />
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <form className="flex flex-col p-4 space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border p-2 rounded-lg"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
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
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-lg font-medium">
              Phone Number
            </label>
            <input
              type="number"
              className="border p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="role" className="text-lg font-medium">
              Role
            </label>
            <select
              id="role"
              className="border p-2 rounded-lg"
              value={data.role}
              onChange={(e) =>
                setData({
                  ...data,
                  role: e.target.value as "admin" | "user" | "partner",
                })
              }
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="partner">Partner</option>
            </select>
          </div>
          {/* <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-lg font-medium">
              Currency Amount
            </label>
            <input
              type="text"
              id="currency"
              className="border p-2 rounded-lg"
              value={currencyFormatter(data.currency as number)}
              onChange={(e) => {
                setData({
                  ...data,
                  currency: currencyDeformatter(e.target.value),
                });
              }}
            />
          </div> */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 w-full bg-purple-200 font-medium flex justify-center items-center space-x-1 rounded-lg hover:bg-purple-300 disabled:bg-purple-100 disabled:cursor-not-allowed"
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
