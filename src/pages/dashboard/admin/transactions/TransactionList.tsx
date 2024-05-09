import api from "@lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { currencyFormatter } from "@utils/currency_formatter";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_PaginationState,
  useMaterialReactTable,
} from "material-react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";

type Transaction = {
  id: number;
  user_id: number;
  type: string;
  amount: number;
  description: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
};

type TransactionResponse = {
  data: Transaction[];
  meta: {
    currentPage: number;
    items: number;
    totalItems: number;
    totalPages: number;
  };
};

const TransactionList = () => {
  const [cookies] = useCookies(["token"]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [role, setRole] = useState<string>("all");

  const {
    data: { data = [], meta } = {},
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<TransactionResponse>({
    queryKey: [
      "users",
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
      role,
    ],
    queryFn: () =>
      api
        .get("/admin/transaction/get", {
          headers: { Authorization: `Bearer ${cookies.token}` },
          params: {
            page: pagination.pageIndex + 1,
            item: pagination.pageSize,
            search: globalFilter,
            role: role === "all" ? undefined : role,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });

  const columns: MRT_ColumnDef<Transaction>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        size: 20,
        grow: false,
      },
      {
        header: "User ID",
        accessorKey: "user_id",
        size: 20,
        grow: false,
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Amount",
        accessorKey: "amount",
        Cell: ({ row }) => (
          <span>{currencyFormatter(row.original.amount)}</span>
        ),
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Transaction Date",
        accessorKey: "created_at",
        Cell: ({ row }) => {
          return moment(row.original.created_at).format(
            "DD-MMMM-YYYY - hh:mm:ss"
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    manualPagination: true,
    onPaginationChange: setPagination,
    enableGlobalFilter: true,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      sorting: [{ id: "id", desc: true }],
    },
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    rowCount: meta?.totalItems,
    positionActionsColumn: "last",
    renderTopToolbarCustomActions: () => (
      <div className="space-x-2 flex">
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-green-200 font-medium items-center space-x-1 rounded-lg hover:bg-green-300"
        >
          Refresh
        </button>
        <select
          value={role}
          className="w-32 px-2 rounded-lg border border-gray-300"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value={"all"}>All</option>
          <option value={"partner"}>Partner</option>
          <option value={"user"}>User</option>
        </select>
      </div>
    ),
  });

  return (
    <div className="py-4 px-6 h-dashboard-outlet">
      <div className="flex justify-between items-center mb-2">
        <p className="text-2xl font-medium">Transactions List</p>
      </div>
      <div className="">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default TransactionList;
