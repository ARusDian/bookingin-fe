import api from "@lib/api";
import { AirlinePlane, AirlinePlaneResponse } from "@lib/model";
import TableListHead from "@pages/dashboard/components/TableListHead";
import { useQuery } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { MdOutlineEventSeat } from "react-icons/md";
import DeleteFromTable from "./components/DeleteFromTable";

const PlaneList = () => {
  const [cookies] = useCookies(["token"]);
  const { airline_id } = useParams<{ airline_id: string }>();
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
  } = useQuery<AirlinePlaneResponse>({
    queryKey: [
      "users",
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
    ],
    queryFn: () =>
      api
        .get("/partner/airline/plane/get", {
          headers: { Authorization: `Bearer ${cookies.token}` },
          params: {
            airline_id,
            page: pagination.pageIndex + 1,
            item: pagination.pageSize,
            search: globalFilter,
          },
        })
        .then((res) => res.data),
  });

  const columns: MRT_ColumnDef<AirlinePlane>[] = useMemo(
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
          to={`./${row.original.id}/seat`}
          relative="path"
          className="px-3 py-1 bg-green-200 font-medium items-center space-x-1 rounded-lg hover:bg-green-300"
        >
          <MdOutlineEventSeat className="text-2xl" />
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

  const deletePlane = () => {
    setDeleteLoading(true);
    api
      .delete(`/partner/airline/plane/delete/${selectedRowId}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(() => refetch())
      .catch((err) => console.error(err))
      .finally(() => {
        setDeleteLoading(false);
        setSelectedRowId(null);
      });
  };

  return (
    <>
      <DeleteFromTable
        open={selectedRowId}
        deleteHandler={deletePlane}
        state={{ id: selectedRowId!, isLoading: deleteLoading, name: "Plane" }}
        onClose={() => setSelectedRowId(null)}
      />
      <div className="px-4 py-6 h-dashboard-outlet">
        <TableListHead
          linkTo="../.."
          title="Plane List"
          button={{
            linkTo: "./create",
            text: "Create Plane",
          }}
        />
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default PlaneList;
