import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "../../../components/admin/property/data-table-column-header"
import DataTableCheckBox from "@/components/globalcomponents/DataTableCheckBox"
import { removefeature } from "@/actions/feature"
import { DataTableRowActions } from "../property/data-table-row-actions"





export type PropertyType = {

    id: number;
    name: string;

}





export const columns: ColumnDef<PropertyType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <DataTableCheckBox table={table} deletefunc={removefeature} />
        ),
        cell: ({ row }) => (
            <DataTableCheckBox row={row} deletefunc={removefeature} />

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
            <DataTableColumnHeader column={column} title="Property Type" />
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
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} page={"propertytypes"} />,
    },

]


