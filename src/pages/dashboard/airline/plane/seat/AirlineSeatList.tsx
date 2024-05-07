import api from "@lib/api";
import { PlaneSeat, PlaneSeatResponse } from "@lib/model";
import TableListHead from "@pages/dashboard/components/TableListHead";
import { useQuery } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import DeleteFromTable from "../../../components/DeleteFromTable";
import { useAdminStore } from "../../../../../zustand/admin_access_partner";
import { useAuthStore } from "../../../../../zustand/auth";

const AirlineSeatList = () => {
  const [cookies] = useCookies(["token"]);
  const { plane_id } = useParams<{ plane_id: string }>();
  const { user } = useAuthStore((state) => state);
  const { partner } = useAdminStore((state) => state);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchUrl =
    user?.role == "ADMIN"
      ? `/admin/partner/${partner?.id}/airline/plane/seat/get`
      : "/partner/airline/plane/seat/get";

  const {
    data: { data: planeSeats = [], meta } = {},
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<PlaneSeatResponse>({
    queryKey: [
      "plane",
      plane_id,
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
    ],
    queryFn: () =>
      api
        .get(fetchUrl, {
          params: {
            plane_id,
            page: pagination.pageIndex + 1,
            item: pagination.pageSize,
            search: globalFilter,
          },
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => res.data),
  });

  const columns: MRT_ColumnDef<PlaneSeat>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: planeSeats,
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

  const deleteSeat = () => {
    setDeleteLoading(true);
    api
      .delete(`/partner/airline/plane/seat/delete/${selectedRowId}`, {
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
      {/* Modal Form */}
      <DeleteFromTable
        deleteHandler={deleteSeat}
        onClose={() => setSelectedRowId(null)}
        open={selectedRowId}
        state={{
          id: selectedRowId!,
          isLoading: deleteLoading,
          name: "seat",
        }}
      />

      {/* Table */}
      <div className="px-4 py-6 h-dashboard-outlet">
        <TableListHead
          linkTo="../.."
          title="Plane Seat List"
          button={{
            linkTo: "./create",
            text: "Add Seat",
          }}
        />
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default AirlineSeatList;
