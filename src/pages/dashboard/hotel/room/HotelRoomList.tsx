import api from "@lib/api";
import { HotelWithRoomResponse, Room } from "@lib/model";
import { useQuery } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { IoMdAdd, IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const HotelRoomList = () => {
  const { hotel_id } = useParams();
  const [cookies] = useCookies(["token"]);
  // const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  // const [deleteLoading, setDeleteLoading] = useState(false);
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

  console.log(rooms);

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
    // enableRowActions: true,
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
    <div className="px-4 py-6 h-dashboard-outlet">
      <div className="flex justify-between items-center mb-2">
        <Link
          to={"../.."}
          relative="path"
          className="text-2xl font-medium flex items-center gap-2 hover:text-purple-800"
        >
          <IoMdArrowBack />
          Room List
        </Link>
        <Link
          to="./add"
          relative="path"
          className="flex items-center space-x-1 bg-purple-200 font-medium px-4 py-2 rounded-lg hover:bg-purple-300"
        >
          <IoMdAdd className="text-xl" />
          <span>Add Room</span>
        </Link>
      </div>
      <div className="">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default HotelRoomList;
