import api from "@lib/api";
import { FlightTicketResponse, PlaneSeat, PlaneSeatResponse } from "@lib/model";
import TableListHead from "@pages/dashboard/components/TableListHead";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useParams } from "react-router-dom";
import { useAdminStore } from "../../../../../zustand/admin_access_partner";
import { useAuthStore } from "../../../../../zustand/auth";
import ShowUser from "@pages/dashboard/components/ShowUser";

const TicketTransactionList = () => {
  const [cookies] = useCookies(["token"]);
  const { user } = useAuthStore((state) => state);
  const { partner } = useAdminStore((state) => state);
  const { plane_id, flight_id } = useParams<{
    plane_id: string;
    flight_id: string;
  }>();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const seatUrl =
    user?.role == "ADMIN"
      ? `/admin/partner/${partner?.id}/airline/plane/seat/get`
      : "/partner/airline/plane/seat/get";
  const reservedTicketUrl =
    user?.role == "ADMIN"
      ? `/admin/partner/${partner?.id}/transaction/ticket`
      : "/partner/transaction/ticket";

  const {
    data: { data: seatData = [], meta: seatMeta } = {},
    isError: isSeatError,
    isRefetching: isSeatRefetching,
    isLoading: isSeatLoading,
    refetch: seatRefetch,
  } = useQuery<PlaneSeatResponse>({
    queryKey: [
      "plane",
      "ticket",
      plane_id,
      flight_id,
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
    ],
    queryFn: () =>
      api
        .get(seatUrl, {
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

  const {
    data: { data: ticketData = [] } = {},
    isError: isTicketError,
    isRefetching: isTicketRefetching,
    isLoading: isTicketLoading,
    refetch: ticketRefetch,
  } = useQuery<FlightTicketResponse>({
    queryKey: [
      "ticket",
      plane_id,
      flight_id,
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
    ],
    queryFn: () =>
      api
        .get(reservedTicketUrl, {
          params: {
            plane_id,
            page: pagination.pageIndex + 1,
            item: pagination.pageSize,
            search: globalFilter,
            plane_flight_id: flight_id,
          },
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => res.data),
  });

  // console.log(ticketData)

  const seatWithMarkedTicket = useMemo(() => {
    return seatData.map((seat) => {
      const ticket = ticketData.find(
        (ticket) => ticket.plane_seat_id == seat.id
      );
      if (ticket) {
        return {
          ...seat,
          available: false,
          code: ticket.code,
          user: {
            id: ticket.user.id,
            name: ticket.user.name,
          },
        };
      }
      return { ...seat, available: true };
    });
  }, [seatData, ticketData]);

  const columns: MRT_ColumnDef<PlaneSeat>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Available",
      accessorKey: "available",
      Cell: ({ row }) => {
        return row.original.available ? (
          <label className="text-green-600">Available</label>
        ) : (
          <label className="text-red-600">Unavailable</label>
        );
      },
    },
    {
      header: "Booked by",
      accessorKey: "user.name",
      Cell: ({ row }) => {
        return row.original.user ? (
          <label
            className="font-bold cursor-pointer hover:underline"
            onClick={() => setSelectedUserId(row.original.user!.id)}
          >
            {row.original.user.name}
          </label>
        ) : (
          "N/A"
        );
      },
    },
    {
      header: "Code",
      accessorKey: "code",
      Cell: ({ row }) => {
        return row.original.code ? (
          <label className="font-bold">{row.original.code}</label>
        ) : (
          "N/A"
        );
      },
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: seatWithMarkedTicket,
    muiToolbarAlertBannerProps:
      isSeatError || isTicketError
        ? {
            color: "error",
            children: "Error loading data",
          }
        : undefined,
    manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      isLoading: isSeatLoading || isTicketLoading,
      pagination,
      showAlertBanner: isSeatError || isTicketError,
      showProgressBars: isSeatRefetching || isTicketRefetching,
    },
    rowCount: seatMeta?.totalItems,
    positionActionsColumn: "last",
    renderTopToolbarCustomActions: () => (
      <button
        onClick={() => {
          seatRefetch();
          ticketRefetch();
        }}
        className="px-4 py-2 bg-green-200 font-medium items-center space-x-1 rounded-lg hover:bg-green-300"
      >
        Refresh
      </button>
    ),
  });

  return (
    <div className="px-4 py-6 h-dashboard-outlet">
      {selectedUserId && (
        <ShowUser
          role={user!.role}
          open={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
      <TableListHead
        linkTo="../.."
        title="Booked Ticket List"
        // button={{
        //   linkTo: "./create",
        //   text: "Add Flight",
        // }}
      />
      <MaterialReactTable table={table} />
    </div>
  );
};

export default TicketTransactionList;
