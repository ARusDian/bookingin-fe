import api from "@lib/api";
import { AxiosErrorResponse } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useMutation } from "@tanstack/react-query";
import {
  currencyDeformatter,
  currencyFormatter,
} from "@utils/currency_formatter";
import { showErrorToast, showSuccessToast } from "@utils/toast";
import { AxiosError } from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

const submitTopup = async (
  user_id: string,
  data: { amount: number; type: "topup" | "withdraw" },
  token: string
) => {
  const type_url = data.type === "topup" ? "topup" : "withdraw";

  const { data: response } = await api.post(
    `/admin/user/${type_url}/${user_id}`,
    { amount: data.amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const Topup = () => {
  const [cookies] = useCookies(["token"]);
  const { user_id } = useParams();
  const [type, setType] = useState<"topup" | "withdraw">("topup");
  const [amount, setAmount] = useState<number>(0);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { amount: number; type: "topup" | "withdraw" }) =>
      submitTopup(user_id!, data, cookies.token),
    onError: (error: AxiosError) => {
      const errorData: AxiosErrorResponse = error.response
        ?.data as AxiosErrorResponse;
      showErrorToast(errorData.message);
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("../..", { relative: "path" });
      setTimeout(() => showSuccessToast(data), 1);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ amount, type });
  };

  return (
    <div className="px-6 py-4">
      <FormHead title="Topup" linkBack="../.." />
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <form className="flex flex-col p-4 space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="type" className="text-lg font-medium">
              Type
            </label>
            <select
              id="type"
              className="border p-2 rounded-lg"
              value={type}
              onChange={(e) => setType(e.target.value as "topup" | "withdraw")}
            >
              <option value="topup">Topup</option>
              <option value="withdraw">Withdraw</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="amount" className="text-lg font-medium">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              className="border p-2 rounded-lg"
              value={currencyFormatter(amount)}
              onChange={(e) => setAmount(currencyDeformatter(e.target.value))}
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 w-full bg-purple-200 font-medium flex justify-center items-center space-x-1 rounded-lg hover:bg-purple-300 disabled:bg-purple-100 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Topup;
