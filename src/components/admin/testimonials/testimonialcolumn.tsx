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

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  salt: string;
  firstname: string;
  lastname: string;
  contact: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  companyId: number;
}

interface testimonial {
  id: number;
  name: string;
  imageUrl: string;
  public_id: string;
  description: string;
  userId: number;
  onBehalfOf: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export const testimonialcolumn: ColumnDef<testimonial>[] = [
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
      <DataTableColumnHeader column={column} title="Testimony ID" />
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
            dangerouslySetInnerHTML={{ __html: row.getValue("name") }}
          ></span>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("rating")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "area",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
         <span
  className="max-w-[500px] truncate font-medium"
  dangerouslySetInnerHTML={{
    __html: row.original?.description.length > 18 
      ? row.original.description.slice(0, 18) + "..."
      : row.original.description,
  }}
></span>

        </div>
      );
    },
  },
  {
    accessorKey: "onBehalfOf",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="onBehalfOf" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span
            className="max-w-[500px] truncate font-medium"
            dangerouslySetInnerHTML={{ __html: row.original?.onBehalfOf }}
          ></span>
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
    cell: ({ row }) => <DataTableRowActions row={row} page={"properties"} />,
  },
];
