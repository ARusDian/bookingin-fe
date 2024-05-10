import api from "@lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { IoMdAdd } from "react-icons/io";
import { MdFlight } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../zustand/auth";
import { Airline, AirlineResponse } from "@lib/model";
import DeleteFromTable from "../components/DeleteFromTable";
import { useAdminStore } from "../../../zustand/admin_access_partner";

const AirlineList = () => {
  const [cookies] = useCookies(["token"]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const role = useAuthStore((state) => state.user?.role);
  const { setPartner, deletePartner } = useAdminStore((state) => state);

  useEffect(() => {
    deletePartner();
  }, [deletePartner]);

  const {
    data: { data = [], meta } = {},
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<AirlineResponse>({
    queryKey: [
      "users",
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
    ],
    queryFn: () =>
      api
        .get(role === "PARTNER" ? "/partner/airline/get" : "/airline/get", {
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

  const columns: MRT_ColumnDef<Airline>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Address",
        accessorKey: "address",
      },
      {
        header: "Description",
        accessorKey: "description",
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
          to={`./${row.original.id}/plane`}
          relative="path"
          className="px-3 py-1 bg-yellow-200 font-medium items-center space-x-1 rounded-lg hover:bg-yellow-300"
          onClick={() => {
            if (role === "ADMIN" && row.original.user)
              setPartner({
                id: row.original.user.id,
                name: row.original.user.name,
              });
          }}
        >
          <MdFlight className="text-2xl" />
        </Link>
        <Link
          to={`./edit/${row.original.id}`}
          relative="path"
          className="px-3 py-1 bg-blue-200 font-medium items-center space-x-1 rounded-lg hover:bg-blue-300"
          onClick={() => {
            if (role === "ADMIN" && row.original.user)
              setPartner({
                id: row.original.user.id,
                name: row.original.user.name,
              });
          }}
        >
          <MdOutlineEdit className="text-2xl" />
        </Link>
        {role === "ADMIN" && (
          <button
            className="px-3 py-1 bg-red-200 font-medium items-center space-x-1 rounded-lg hover:bg-red-300"
            onClick={() => {
              setSelectedRowId(row.original.id);
            }}
          >
            <MdDelete className="text-2xl" />
          </button>
        )}
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

  const deleteAirline = () => {
    setDeleteLoading(true);
    api
      .delete(`/partner/airline/delete/${selectedRowId}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(() => {
        refetch();
        setSelectedRowId(null);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  return (
    <>
      <DeleteFromTable
        open={selectedRowId}
        onClose={() => setSelectedRowId(null)}
        state={{
          id: selectedRowId!,
          name: "Airline",
          isLoading: deleteLoading,
        }}
        deleteHandler={deleteAirline}
      />
      <div className="px-4 py-6 h-dashboard-outlet">
        <div className="flex justify-between items-center mb-2">
          <p className="text-2xl font-medium">Airline List</p>
          {role !== "ADMIN" && (
            <Link
              to="./create"
              relative="path"
              className="flex items-center space-x-1 bg-purple-200 font-medium px-4 py-2 rounded-lg hover:bg-purple-300"
            >
              <IoMdAdd className="text-xl" />
              <span>Add Airline</span>
            </Link>
          )}
        </div>
        <div className="">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </>
  );
};

export default AirlineList;
