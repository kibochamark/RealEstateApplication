"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { DataTableColumnHeader } from "../property/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"


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
]

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
]

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
]

export type UserData = {
    
        id: number;
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        street_address: string;
        shortDescription: string;
        description: string;
               
        images: {
            url:string;
        }
}





export const columns: ColumnDef<UserData>[] = [
    
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
            <DataTableColumnHeader column={column} title="User ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "username",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="user Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("username")}
                    </span>
                </div>
            )
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
        accessorKey: "firstname",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="firstname" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.original?.firstname}
                    </span>
                </div>
            )
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
                    <span className="max-w-[500px] truncate font-medium">
                        {row.original?.email}
                    </span>
                </div>
            )
        },
    },
    // {
    //     accessorKey: "price",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Price" />
    //     ),
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex space-x-2">
    //                 <span className="max-w-[500px] truncate font-medium">
    //                     {new Intl.NumberFormat("en-US", {
    //                         style: "currency",
    //                         currency: "KES",
    //                     }).format(parseFloat(row.original?.price?.toString()))}
    //                 </span>
    //             </div>
    //         )
    //     },
    // },
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
        cell: ({ row }) => <DataTableRowActions row={row} page={"users"} />,
    },
]

