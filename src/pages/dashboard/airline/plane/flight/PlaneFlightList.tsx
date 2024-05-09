import api from "@lib/api";
import { PlaneFlight, PlaneFlightResponse } from "@lib/model";
import TableListHead from "@pages/dashboard/components/TableListHead";
import { useQuery } from "@tanstack/react-query";
import { currencyFormatter } from "@utils/currency_formatter";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { MdDelete, MdOutlineEventSeat } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import DeleteFromTable from "../../../components/DeleteFromTable";
import { useAuthStore } from "@zustand/auth";
import { useAdminStore } from "@zustand/admin_access_partner";

const PlaneFlightList = () => {
  const [cookies] = useCookies(["token"]);
  const { plane_id } = useParams<{ plane_id: string }>();
  const user = useAuthStore((state) => state.user);
  const partner = useAdminStore((state) => state.partner);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchUrl =
    user?.role == "ADMIN"
      ? `/admin/partner/${partner?.id}/airline/plane/flight/get`
      : "/partner/airline/plane/flight/get";

  const {
    data: { data = [], meta } = {},
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<PlaneFlightResponse>({
    queryKey: [
      "users",
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: () =>
      api
        .get(fetchUrl, {
          headers: { Authorization: `Bearer ${cookies.token}` },
          params: {
            plane_id,
            page: pagination.pageIndex + 1,
            item: pagination.pageSize,
          },
        })
        .then((res) => res.data),
  });

  const columns: MRT_ColumnDef<PlaneFlight>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Last Check In",
        accessorKey: "last_check_in",
      },
      {
        header: "Departure Time",
        accessorKey: "departure_time",
      },
      {
        header: "Departure Airport",
        accessorKey: "departure_airport",
      },
      {
        header: "Arrival Time",
        accessorKey: "arrival_time",
      },
      {
        header: "Arrival Airport",
        accessorKey: "arrival_airport",
      },
      {
        header: "Price",
        accessorKey: "price",
        Cell: ({ row }) => <span>{currencyFormatter(row.original.price)}</span>,
      },
    ],
    []
  );

  const deleteFlight = () => {
    setDeleteLoading(true);
    api
      .delete(`/partner/airline/plane/flight/delete/${selectedRowId}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(() => refetch())
      .catch((err) => console.error(err))
      .finally(() => {
        setDeleteLoading(false);
        setSelectedRowId(null);
      });
  };

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
    enableGlobalFilter: false,
    manualPagination: true,
    onPaginationChange: setPagination,
    renderRowActions: ({ row }) => (
      <div className="flex space-x-1">
        <Link
          to={`./${row.original.id}/booked-ticket`}
          relative="path"
          className="px-3 py-1 bg-blue-200 font-medium items-center space-x-1 rounded-lg hover:bg-blue-300"
        >
          <MdOutlineEventSeat className="text-2xl" />
        </Link>

        <button
          className="px-3 py-1 bg-red-200 font-medium items-center space-x-1 rounded-lg hover:bg-red-300"
          onClick={() => {
            setSelectedRowId(row.original.id);
          }}
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
      <DeleteFromTable
        open={selectedRowId}
        deleteHandler={deleteFlight}
        state={{ id: selectedRowId!, isLoading: deleteLoading, name: "Plane" }}
        onClose={() => setSelectedRowId(null)}
      />
      <div className="px-4 py-6 h-dashboard-outlet">
        {user!.role === "PARTNER" ? (
          <TableListHead
            linkTo="../.."
            title="Flight List"
            button={{
              linkTo: "./create",
              text: "Add Flight",
            }}
          />
        ) : (
          <TableListHead linkTo="../.." title="Flight List" />
        )}
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default PlaneFlightList;
