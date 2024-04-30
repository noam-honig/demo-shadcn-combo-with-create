'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CommandList } from 'cmdk'

export type ComboBoxItem = { id: string; name: string }

export type ComboBoxDemoProps = {
  options: ComboBoxItem[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  caption: string
  onAdd?: (name: string) => Promise<ComboBoxItem>
}

export function ComboboxDemo({
  options,
  value,
  setValue,
  caption,
  onAdd,
}: ComboBoxDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  async function addOption() {
    if (!onAdd) return
    const newOption = await onAdd(searchValue)
    setValue(newOption.id)
    setSearchValue('')
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.id === value)?.name
            : `Select ${caption}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${caption}...`}
            value={searchValue}
            onInput={(e) => setSearchValue(e.currentTarget.value)}
          />
          <CommandList>
            <CommandEmpty onClick={() => addOption()}>
              No {caption} found. {onAdd && `Add "${searchValue}"?`}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
