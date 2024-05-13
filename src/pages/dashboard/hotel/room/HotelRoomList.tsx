import api from "@lib/api";
import { HotelWithRoomResponse, Room } from "@lib/model";
import FormModal from "@pages/dashboard/components/FormModal";
import { useQuery } from "@tanstack/react-query";
import { useAdminStore } from "@zustand/admin_access_partner";
import { useAuthStore } from "@zustand/auth";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { IoMdAdd, IoMdArrowBack } from "react-icons/io";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const HotelRoomList = () => {
  const { hotel_id } = useParams();
  const [cookies] = useCookies(["token"]);
  const role = useAuthStore((state) => state.user!.role);
  const { partner } = useAdminStore((state) => state);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: { rooms = [] } = {},
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useQuery<HotelWithRoomResponse>({
    queryKey: ["hotel_by_id", hotel_id],
    queryFn: () =>
      api
        .get(`/hotel/get/${hotel_id}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            page: pagination.pageIndex + 1,
            item: pagination.pageSize,
            search: globalFilter,
          },
        })
        .then((res) => res.data.data),
  });

  const columns: MRT_ColumnDef<Room>[] = useMemo(
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
      // {
      //   header: "Total Rooms",
      //   accessorKey: "rooms[]",
      //   Cell: ({ row }) => row.original.rooms.length,
      // },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: rooms || [],
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
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    rowCount: rooms?.length || 0,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <div className="flex space-x-1">
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
    renderTopToolbarCustomActions: () => (
      <button
        onClick={() => refetch()}
        className="px-4 py-2 bg-green-200 font-medium items-center space-x-1 rounded-lg hover:bg-green-300"
      >
        Refresh
      </button>
    ),
  });

  const deleteRoom = (id: number) => {
    setDeleteLoading(true);
    const url =
      role === "PARTNER"
        ? `/partner/hotel/room/delete/${id}`
        : `/admin/partner/${partner?.id}/hotel/room/delete/${id}`;
    api
      .delete(url, {
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
    <div className="px-4 py-6 h-dashboard-outlet">
      <FormModal open={!!selectedRowId} onClose={() => setSelectedRowId(null)}>
        <div className="flex flex-col space-y-4 w-96">
          <p className="text-lg font-medium">
            Are you sure want to delete room with id {selectedRowId}?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setSelectedRowId(null)}
              className="px-4 py-2 bg-red-200 font-medium items-center space-x-1 rounded-lg hover:bg-red-300"
            >
              No
            </button>
            <button
              disabled={deleteLoading}
              onClick={() => {
                deleteRoom(selectedRowId!);
                refetch();
              }}
              className="px-4 py-2 bg-green-200 font-medium items-center space-x-1 rounded-lg hover:bg-green-300"
            >
              Yes
            </button>
          </div>
        </div>
      </FormModal>
      <div className="flex justify-between items-center mb-2">
        <Link
          to={"../.."}
          relative="path"
          className="text-2xl font-medium flex items-center gap-2 hover:text-purple-800"
        >
          <IoMdArrowBack />
          Room List
        </Link>
        {role === "PARTNER" && (
          <Link
            to="./add"
            relative="path"
            className="flex items-center space-x-1 bg-purple-200 font-medium px-4 py-2 rounded-lg hover:bg-purple-300"
          >
            <IoMdAdd className="text-xl" />
            <span>Add Room</span>
          </Link>
        )}
      </div>
      <div className="">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default HotelRoomList;
