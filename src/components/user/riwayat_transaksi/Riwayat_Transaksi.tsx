import api from "@lib/api";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

interface Transaction {
  id: number;
  user_id: number;
  type: string;
  amount: number;
  description: string;
  created_at: string;
  updated_at: string;
}

interface TransactionResponse {
  code: number;
  status: string;
  data: Transaction[];
}


const RiwayatTransaksi: React.FC = () => {
  const [cookies] = useCookies(["token"]);

  const { data: transactionData, isError, isLoading } = useQuery<TransactionResponse>({
    queryKey: ["transactions"],
    queryFn: () => api.get(`/transaction`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    }).then((res) => res.data),
  });

  const transactions = transactionData?.data || [];

  return (
    <div className="w-full my-4">
      {transactions.map(transaction => (
        <div key={transaction.id} className="bg-white shadow-md rounded-lg overflow-hidden my-2">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Transaction Details</h3>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>ID Transaksi: {transaction.id}</p>
              <p>Jumlah: Rp {transaction.amount.toLocaleString()}</p>
            </div>
            <p>{transaction.description}</p>
            <p>Created at: {new Date(transaction.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
      {isLoading && <p>Loading transactions...</p>}
      {isError && <p>Error fetching transactions.</p>}
    </div>
  );
};

export default RiwayatTransaksi;