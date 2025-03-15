"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { DataTableColumnHeader } from "../property/data-table-column-header";
import { DataTableRowActions } from "../property/data-table-row-actions";



interface connection {
  id: number;
  name: string;
  email:string;
  phone:string;
  message:string;
  createdAt: string;
  updatedAt: string;
}

export const connectioncolumn: ColumnDef<connection>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Connection ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span
            className="max-w-[500px] truncate font-medium"
          >{row.original.name}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
         <span
  className="max-w-[500px] truncate font-medium"
  
>

{row.original.email}
</span>

        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
         <span
  className="max-w-[500px] truncate font-medium"
  
>

{row.original.message}
</span>

        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span
            className="max-w-[500px] truncate font-medium"
            
          >

{row.original.phone}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {new Date(row.original?.createdAt).toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  // {
  //     accessorKey: "saleType",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="Sale Type" />
  //     ),
  //     cell: ({ row }) => {

  //         return (
  //             <div className="flex w-[100px] items-center">

  //                 <span>{row.original.saleType}</span>
  //             </div>
  //         )
  //     },
  //     filterFn: (row, id, value) => {
  //         return value.includes(row.getValue(id))
  //     },
  // },
  // {
  //     accessorKey: "featured",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="Featured" />
  //     ),
  //     cell: ({ row }) => {

  //         return (
  //             <div className="flex w-[100px] items-center">
  //                 <span>{row?.original?.featured}</span>
  //             </div>
  //         )
  //     },
  //     filterFn: (row, id, value) => {
  //         return value.includes(row.getValue(id))
  //     },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} page={"connection"} />,
  },
];
