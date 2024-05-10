import api from "@lib/api";
import { User } from "@lib/model";
import FormModal from "@pages/dashboard/components/FormModal";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import Loading from "react-loading";

type Props = {
  open: number | null;
  onClose: () => void;
  role: string;
};

const ShowUser = ({ open, onClose, role }: Props) => {
  const id = open;
  const url = role == "ADMIN" ? `/admin/user/get/${id}` : `/user/get/${id}`;
  const [cookies] = useCookies(["token"]);

  const { data, isLoading } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => {
      return api
        .get(url, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => res.data.data);
    },
  });

  console.log(data);

  return (
    <FormModal open={!!open} onClose={onClose}>
      <>
        <button onClick={onClose} className="absolute top-0 right-0 bg-red-200 py-2 px-4 rounded-se-lg">
          X
        </button>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loading type="spin" color="#000" />
          </div>
        ) : (
          <div className="w-96 py-4 flex flex-col items-start gap-3 justify-center">
            <div className="flex flex-col w-full gap-1">
              <label className="font-semibold">Name</label>
              <input
                type="text"
                value={data?.name}
                readOnly
                className="border w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="font-semibold">Email</label>
              <input
                type="text"
                value={data?.email}
                readOnly
                className="border w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="font-semibold">Phone</label>
              <input
                type="text"
                value={data?.phone}
                readOnly
                className="border w-full p-2 rounded-lg"
              />
            </div>

            {/* <p className="text-xl">{data?.name}</p>
          <p className="text-xl">{data?.email}</p>
        <p className="text-xl">{data?.phone}</p> */}
          </div>
        )}
      </>
    </FormModal>
  );
};

export default ShowUser;
