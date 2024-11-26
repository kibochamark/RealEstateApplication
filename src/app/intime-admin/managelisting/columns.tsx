"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "../../../components/admin/property/data-table-column-header"
import { DataTableRowActions } from "../../../components/admin/property/data-table-row-actions"

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

export type Property = {
    
        id: number;
        name: string;
        description: string;
        location: {
          id: number;
          longitude: string;
          latitude: string;
          locationname: string;
        },
        street_address: string;
        city: string;
        area: string;
        state: string;
        country: string;
        saleType: string;
        featured: boolean;
        propertytype: {
            name:string;
        };
        size: string;
        distance: string;
        price: number;
        pricepermonth: number;
        bedrooms: string;
        features: {
            name:string;
        },        
        images: {
            url:string;
        }
}





export const columns: ColumnDef<Property>[] = [
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
            <DataTableColumnHeader column={column} title="Property ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("name")}
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
        accessorKey: "location.locationname",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Location" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.original?.location?.locationname}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "propertytype.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Property type" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.original?.propertytype?.name}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "KES",
                        }).format(parseFloat(row.original?.price?.toString()))}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "saleType",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sale Type" />
        ),
        cell: ({ row }) => {

          

            return (
                <div className="flex w-[100px] items-center">
                
                    <span>{row.original.saleType}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "featured",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Featured" />
        ),
        cell: ({ row }) => {
            

            return (
                <div className="flex w-[100px] items-center">
                    <span>{row?.original?.featured}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} page={"properties"} />,
    },
]

