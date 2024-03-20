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
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import DeleteFromTable from "../../../components/DeleteFromTable";

const PlaneFlightList = () => {
  const [cookies] = useCookies(["token"]);
  const { plane_id } = useParams<{ plane_id: string }>();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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
      globalFilter,
    ],
    queryFn: () =>
      api
        .get("/partner/airline/plane/flight/get", {
          headers: { Authorization: `Bearer ${cookies.token}` },
          params: {
            plane_id,
            page: pagination.pageIndex + 1,
            item: pagination.pageSize,
            search: globalFilter,
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
    manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    renderRowActions: ({ row }) => (
      <div className="flex space-x-1">
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
        <TableListHead
          linkTo="../.."
          title="Flight List"
          button={{
            linkTo: "./create",
            text: "Add Flight",
          }}
        />
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default PlaneFlightList;
