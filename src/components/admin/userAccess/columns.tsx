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
import { DataTableRowActions } from "../property/data-table-row-actions";
import { DataTableColumnHeader } from "../property/data-table-column-header";
import axios from "axios";
import { baseUrl } from "@/lib/globalvariables";
import toast from "react-hot-toast";
import { RevalidatePath } from "@/components/globalcomponents/RevalidateCustomPath";

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

export type accessdata = {
  id: number;
  email: string;
  reason: string;
  createdAt: string;
  status: string;

  images: {
    url: string;
  };
};

export const columns: ColumnDef<accessdata>[] = [
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
      <DataTableColumnHeader column={column} title="Blog ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  // {
  //     accessorKey: "description",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="Description" />
  //     ),
  //     cell: ({ row }) => {
  //         return (
  //             <div className="flex space-x-2">
  //                 <span className="max-w-[500px] truncate font-medium">
  //                     {row.getValue("description")}
  //                 </span>
  //             </div>
  //         )
  //     },
  // },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original?.status}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const handleStatusUpdate = async (status: string) => {
            try {
                const payload = {
                    id: row.original.id,
                    status: status.toUpperCase(), // Convert to uppercase
                };
        
        
                const response = await axios.patch(baseUrl + "/requestuseraccess", payload);
        
                if (response.status === 201) {
                    toast.success(`Access ${status.toLowerCase()} successfully!`);
                    RevalidatePath("/intime-admin/requestaccess");
                    // alert(`Access ${status.toLowerCase()} successfully!`);
                    row.original.status = status.toUpperCase(); // Update the row status locally
                } else {
                    toast.error(`Failed to update access status`);
                    // alert(`Unexpected response: ${response.status}`);
                }
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.error?.[0] || // Log specific error details if available
                    "Failed to update access status. Please try again later.";
                console.error("Error updating access status:", error);
                alert(errorMessage);
            }
        };
        
        return (
            <div className="flex gap-2">
                <button
                    onClick={() => handleStatusUpdate("approved")} // Uppercase
                    disabled={row.original.status === "APPROVED" || row.original.status === "REJECTED"}
                    className={`px-3 py-1 rounded ${
                        row.original.status === "APPROVED" || row.original.status === "REJECTED"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "text-white bg-green-500 hover:bg-green-600"
                    }`}
                >
                    Approve
                </button>
                <button
                    onClick={() => handleStatusUpdate("rejected")} // Uppercase
                    disabled={row.original.status === "APPROVED" || row.original.status === "REJECTED"}
                    className={`px-3 py-1 rounded ${
                        row.original.status === "APPROVED" || row.original.status === "REJECTED"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "text-white bg-red-500 hover:bg-red-600"
                    }`}
                >
                    Reject
                </button>
            </div>
        );
        

      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusUpdate("approved")}
            disabled={
              row.original.status === "APPROVED" ||
              row.original.status === "REJECTED"
            }
            className={`px-3 py-1 rounded ${
              row.original.status === "APPROVED" ||
              row.original.status === "REJECTED"
                ? "bg-gray-400 cursor-not-allowed"
                : "text-white bg-green-500 hover:bg-green-600"
            }`}
          >
            Approve
          </button>
          <button
            onClick={() => handleStatusUpdate("rejected")} // Uppercase
            disabled={
              row.original.status === "APPROVED" ||
              row.original.status === "REJECTED"
            }
            className={`px-3 py-1 rounded ${
              row.original.status === "APPROVED" ||
              row.original.status === "REJECTED"
                ? "bg-gray-400 cursor-not-allowed"
                : "text-white bg-red-500 hover:bg-red-600"
            }`}
          >
            Reject
          </button>
        </div>
      );
    },
  },
];
