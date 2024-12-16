"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store/store"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Ellipsis } from "lucide-react"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const deletefunc = useAppSelector((state: RootState) => state.datatable.deletefunc)
  const deletedata = useAppSelector((state) => state.datatable.deletedata)

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await deletefunc(deletedata as any[])
      return res
    },
    onSuccess(data: any, variables, context) {
      if (data[1] == 204) {
        toast.success("data deleted successfully")
      } else {
        toast.error("Something went wrong")
      }
    },
    onError() {
      toast.error("Something went wrong")

    }
  })
  return (

    <div className="flex gap-2 items-center justify-center">
      <div>
        <Button onClick={() => {
          mutation.mutateAsync()
        }} disabled={(!table.getIsSomeRowsSelected() && !table.getIsAllPageRowsSelected()) || mutation.isPending} className="bg-red-700 cursor-pointer text-white" >
          {mutation.isPending ? <Ellipsis className="animate animate-spin" /> : "delete"}
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

