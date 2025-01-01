"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Property } from "../../../app/intime-admin/managelisting/columns"
import { useAppDispatch } from "@/store/hooks"
import { setEditData } from "@/store/slices/PropertySlice"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  page:string
}

export function DataTableRowActions<TData>({
  row,
  page
}: DataTableRowActionsProps<TData>) {
  const userData = row.original as any

  const dispatch = useAppDispatch()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={()=>{
          dispatch(setEditData({data:userData, page}))
        }} className="text-center text-primary300">Edit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

