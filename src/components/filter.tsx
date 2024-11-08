'use client'

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"

export default function Filter() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [isRent, setIsRent] = React.useState(false)

  const areas = [
    {
      value: "westlands",
      label: "Westlands",
    },
    {
      value: "kilimani",
      label: "Kilimani",
    },
    {
      value: "karen",
      label: "Karen",
    },
    {
      value: "lavington",
      label: "Lavington",
    },
    {
      value: "kileleshwa",
      label: "Kileleshwa",
    },
    {
      value: "runda",
      label: "Runda",
    },
    {
      value: "muthaiga",
      label: "Muthaiga",
    },
    {
      value: "spring-valley",
      label: "Spring Valley",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        <Popover open={open} onOpenChange={setOpen} modal={true}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between min-w-[200px] md:flex-1"
            >
              {value
                ? areas?.find((area) => area?.value === value)?.label
                : "All Areas"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] md:w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search area..." className="h-9" />
              <CommandEmpty>No area found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {areas?.map((area) => (
                  <CommandItem
                    key={area.value}
                    value={area.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === area.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {area.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Select>
          <SelectTrigger className="min-w-[120px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="land">Land</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex rounded-md border bg-background">
          <Toggle
            pressed={!isRent}
            onPressedChange={() => setIsRent(false)}
            className="rounded-none rounded-l-md"
          >
            For Sale
          </Toggle>
          <Toggle
            pressed={isRent}
            onPressedChange={() => setIsRent(true)}
            className="rounded-none rounded-r-md"
          >
            For Rent
          </Toggle>
        </div>

        <Select>
          <SelectTrigger className="min-w-[100px]">
            <SelectValue placeholder="Beds" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Your Budget"
            className="pr-8"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            Kshs
          </span>
        </div>

        <Button className="bg-[#B5A887] hover:bg-[#A39775] text-white">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  )
}