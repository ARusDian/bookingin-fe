import api from "@lib/api";
import { RoomTransaction, RoomTransactionResponse } from "@lib/model";
import { useQuery } from "@tanstack/react-query";
import { useAdminStore } from "@zustand/admin_access_partner";
import { useAuthStore } from "@zustand/auth";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_PaginationState,
  useMaterialReactTable,
} from "material-react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import ShowUser from "../../components/ShowUser";

const RoomTransactionList = () => {
  const [cookies] = useCookies(["token"]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const role = useAuthStore((state) => state.user!.role);
  const { hotel_id } = useParams<{ hotel_id: string }>();
  const partner = useAdminStore((state) => state.partner);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchUrl =
    role == "ADMIN"
      ? `/admin/partner/${partner?.id}/transaction/reservation`
      : "/partner/transaction/reservation";

  const {
    data: { data = [], meta } = {},
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<RoomTransactionResponse>({
    queryKey: [
      "hotel",
      "transaction",
      "room",
      pagination.pageIndex,
      pagination.pageSize,
      hotel_id,
    ],
    queryFn: () =>
      api
        .get(fetchUrl, {
          params: {
            hotel_id,
            page: pagination.pageIndex + 1,
            item: pagination.pageSize,
          },
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => res.data),
  });

  const columns: MRT_ColumnDef<RoomTransaction>[] = useMemo(
    () => [
      {
        header: "Code",
        accessorKey: "code",
      },
      {
        header: "Room",
        accessorKey: "room.name",
      },
      {
        header: "Booked By",
        accessorKey: "user.name",
        Cell: ({ row }) => (
          <label
            className="font-bold cursor-pointer hover:underline"
            onClick={() => setSelectedUserId(row.original.user.id)}
          >
            {row.original.user.name}
          </label>
        ),
      },
      {
        header: "Check In",
        accessorKey: "check_in",
      },
      {
        header: "Check Out",
        accessorKey: "check_out",
      },
      {
        header: "Booked At",
        accessorKey: "created_at",
        Cell: ({ row }) => moment(row.original.created_at).format("YYYY-MM-DD"),
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
      {selectedUserId && (
        <ShowUser
          role={role}
          open={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
      <div className="px-4 py-6 h-dashboard-outlet">
        <div className="flex justify-between items-center mb-2">
          <Link
            to={"../.."}
            relative="path"
            className="text-2xl font-medium flex items-center gap-2 hover:text-purple-800"
          >
            <IoMdArrowBack />
            Booked List
          </Link>
        </div>
        <div className="">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </>
  );
};

export default RoomTransactionList;
