import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_PaginationState,
} from "material-react-table";
import { useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@lib/api";
import { useCookies } from "react-cookie";
import { currencyFormatter } from "@utils/currency_formatter";
import { CiMoneyBill } from "react-icons/ci";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import FormModal from "../components/FormModal";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  balance: number;
  role: string;
};

type UserResponse = {
  data: User[];
  meta: {
    currentPage: number;
    items: number;
    totalItems: number;
    totalPages: number;
  };
};

const UserList = () => {
  const [cookies] = useCookies(["token"]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const {
    data: { data = [], meta } = {},
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<UserResponse>({
    queryKey: [
      "users",
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
    ],
    queryFn: () =>
      api
        .get("/admin/user/get", {
          headers: { Authorization: `Bearer ${cookies.token}` },
          params: {
            page: pagination.pageIndex + 1,
            item: pagination.pageSize,
            search: globalFilter,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });

  const columns: MRT_ColumnDef<User>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        size: 20,
        grow: false,
      },
      {
        header: "Nama",
        accessorKey: "name",
        grow: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        grow: false,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        size: 20,
        grow: false,
      },
      {
        header: "Balance",
        accessorKey: "balance",
        size: 30,
        grow: false,
        Cell: ({ row }) => (
          <span>{currencyFormatter(row.original.balance)}</span>
        ),
      },
      {
        header: "Role",
        accessorKey: "role",
        size: 20,
        grow: false,
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
    enableRowActions: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    renderRowActions: ({ row }) => (
      <div className="flex space-x-1">
        <Link
          to={`./top-up/${row.original.id}`}
          relative="path"
          className="px-3 py-1 bg-green-200 font-medium rounded-lg hover:bg-green-300"
        >
          <CiMoneyBill className="text-2xl" />
        </Link>
        <Link
          to={`./edit/${row.original.id}`}
          relative="path"
          className="px-3 py-1 bg-blue-200 font-medium items-center space-x-1 rounded-lg hover:bg-blue-300"
        >
          <MdOutlineEdit className="text-2xl" />
        </Link>
        <button
          className="px-3 py-1 bg-red-200 font-medium items-center space-x-1 rounded-lg hover:bg-red-300"
          onClick={() => setSelectedRowId(row.original.id)}
        >
          <MdDelete className="text-2xl" />
        </button>
      </div>
    ),
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    rowCount: meta?.totalItems,
    positionActionsColumn: "last",
    renderTopToolbarCustomActions: () => (
      <button
        onClick={() => refetch()}
        className="px-4 py-2 bg-green-200 font-medium items-center space-x-1 rounded-lg hover:bg-green-300"
      >
        Refresh
      </button>
    ),
  });

  return (
    <>
      <FormModal open={!!selectedRowId} onClose={() => setSelectedRowId(null)}>
        <div className="flex flex-col space-y-4 w-96">
          <p className="text-lg font-medium">Are you sure want to delete user with id {selectedRowId}?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setSelectedRowId(null)}
              className="px-4 py-2 bg-red-200 font-medium items-center space-x-1 rounded-lg hover:bg-red-300"
            >
              No
            </button>
            <button
              onClick={() => {
                setSelectedRowId(null);
                refetch();
              }}
              className="px-4 py-2 bg-green-200 font-medium items-center space-x-1 rounded-lg hover:bg-green-300"
            >
              Yes
            </button>
          </div>
        </div>
      </FormModal>
      <div className="py-4 px-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-2xl font-medium">User List</p>
          <Link
            to="./create"
            relative="path"
            className="flex items-center space-x-1 bg-purple-200 font-medium px-4 py-2 rounded-lg hover:bg-purple-300"
          >
            <IoMdAdd className="text-xl" />
            <span>Add User</span>
          </Link>
        </div>
        <div className="">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </>
  );
};

export default UserList;
