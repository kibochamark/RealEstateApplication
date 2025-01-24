"use client"
import type { ColumnDef } from "@tanstack/react-table"
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
import { DataTableRowActions } from "../property/data-table-row-actions"
import { DataTableColumnHeader } from "../property/data-table-column-header"
import axios from "axios"
import { baseUrl } from "@/lib/globalvariables"
import toast from "react-hot-toast"
import { RevalidatePath } from "@/components/globalcomponents/RevalidateCustomPath"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { postUserData } from '@/actions/Users';


// Helper function to generate random string
function generateRandomString(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Helper function to generate random phone number
function generateRandomPhoneNumber() {
  return `+1${Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, "0")}`
}

const defaultPassword = "Welcome123!"

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

export type accessdata = {
  id: number
  email: string
  reason: string
  createdAt: string
  status: string

  images: {
    url: string
  }
}

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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Blog ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="email" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{row.getValue("email")}</span>
        </div>
      )
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="status" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span
            className={`${
              row.original.status === "PENDING"
                ? "text-orange-400"
                : row.original.status === "REJECTED"
                  ? "text-red-500"
                  : row.original.status === "APPROVED"
                    ? "text-green-500"
                    : ""
            } 
                      max-w-[500px] truncate font-medium shadow-lg p-2 rounded-md`}
          >
            {row.original?.status}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {new Date(row.original?.createdAt).toLocaleDateString()}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false)
      const [createdUser, setCreatedUser] = useState<any>(null)

      const handleStatusUpdate = async (status: string) => {
        try {
          const payload = {
            id: row.original.id,
            status: status.toUpperCase(),
          }

          const response = await axios.patch(baseUrl + "requestuseraccess", payload)

          if (response.status === 201) {
            toast.success(`Access ${status.toLowerCase()} successfully!`)
            RevalidatePath("/intime-admin/requestaccess")
            row.original.status = status.toUpperCase()

            if (status.toUpperCase() === "APPROVED") {
              const updatedValues = {
                username: generateRandomString(8),
                firstname: generateRandomString(6),
                lastname: generateRandomString(6),
                email: row.original.email,
                contact: generateRandomPhoneNumber(),
                password: defaultPassword,
                confimpassword: defaultPassword,
              }

              try {
                // Assuming you have a postUserData function defined elsewhere
                await postUserData(updatedValues)
                setCreatedUser(updatedValues)
                alert(updatedValues)
                setIsDialogOpen(true)
              } catch (error) {
                console.error("Error creating user:", error)
                toast.error("Failed to create user account")
              }
            }
          } else {
            toast.error(`Failed to update access status`)
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.error?.[0] || "Failed to update access status. Please try again later."
          console.error("Error updating access status:", error)
          alert(errorMessage)
        }
      }

      return (
        <>
          <div className="flex gap-2">
            <button
              onClick={() => handleStatusUpdate("approved")}
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
              onClick={() => handleStatusUpdate("rejected")}
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Account Created</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <p>
                  <strong>Username:</strong> {createdUser?.username}
                </p>
                <p>
                  <strong>Email:</strong> {createdUser?.email}
                </p>
                <p>
                  <strong>Password:</strong> {createdUser?.password}
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Please copy these details and share them securely with the user.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]

// Placeholder for postUserData function.  You'll need to implement this.
// const postUserData = async (userData: any) => {
//   // Your code to send userData to the server goes here.  Example using axios:
//   // try {
//   //   const response = await axios.post(baseUrl + "/users", userData);
//   //   // Handle the response
//   // } catch (error) {
//   //   throw error; // Re-throw the error to be handled by the calling function
//   // }
// }

