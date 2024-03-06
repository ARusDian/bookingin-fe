import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

type Partner =
  | {
      name: string;
      description: string;
      type: "airline";
    }
  | {
      name: string;
      description: string;
      type: "hotel";
      address: string;
    };

const data: Partner[] = [
  {
    name: "Garuda Indonesia",
    description: "Maskapai penerbangan nasional",
    type: "airline",
  },
  {
    name: "Lion Air",
    description: "Maskapai penerbangan swasta",
    type: "airline",
  },
  {
    name: "Sriwijaya Air",
    description: "Maskapai penerbangan swasta",
    type: "airline",
  },
  {
    name: "Mandala Air",
    description: "Maskapai penerbangan swasta",
    type: "airline",
  },
  {
    name: "Hotel Indonesia",
    description: "Hotel bintang 5",
    type: "hotel",
    address: "Jl. Thamrin, Jakarta",
  },
  {
    name: "Hotel Surabaya",
    description: "Hotel bintang 4",
    type: "hotel",
    address: "Jl. Surabaya, Jakarta",
  },
  {
    name: "Hotel Bandung",
    description: "Hotel bintang 4",
    type: "hotel",
    address: "Jl. Bandung, Jakarta",
  },
  {
    name: "Hotel Bali",
    description: "Hotel bintang 5",
    type: "hotel",
    address: "Jl. Bali, Jakarta",
  },
];

const PartnerList = () => {
  const columns: MRT_ColumnDef<Partner>[] = useMemo(
    () => [
      {
        header: "Nama",
        accessorKey: "name",
      },
      {
        header: "Deskripsi",
        accessorKey: "description",
      },
      {
        header: "Tipe",
        accessorKey: "type",
        Cell: ({ cell }) => (
          <span>
            {cell.getValue<string>() === "airline" ? "Maskapai" : "Hotel"}
          </span>
        ),
      },
      {
        header: "Alamat",
        accessorKey: "address",
        Cell: ({ row }) => (
          <span>
            {row.original.type === "hotel" ? row.original.address : "-"}
          </span>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <div className="space-x-1">
        <Link
          to={`./edit/${row.index}`}
          relative="path"
          className="px-4 py-2 bg-purple-200 font-medium items-center space-x-1 rounded-lg hover:bg-purple-300"
        >
          <span>Edit</span>
        </Link>
        <button className="px-4 py-2 bg-red-200 font-medium items-center space-x-1 rounded-lg hover:bg-red-300">
          Delete
        </button>
      </div>
    ),
    positionActionsColumn: "last",
  });

  return (
    <div className="py-4 px-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-2xl font-medium">Daftar Mitra</p>
        <Link
          to="./create"
          relative="path"
          className="flex items-center space-x-1 bg-purple-200 font-medium px-4 py-2 rounded-lg hover:bg-purple-300"
        >
          <IoMdAdd className="text-xl" />
          <span>Tambah Mitra</span>
        </Link>
      </div>
      <div className="">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default PartnerList;
