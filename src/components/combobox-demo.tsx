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

export type ComboBoxDemoProps<itemType extends ComboBoxItem> = {
  options: itemType[]
  value: itemType | undefined
  setValue: React.Dispatch<React.SetStateAction<itemType | undefined>>
  caption: string
  onAdd?: (name: string) => Promise<itemType>
}

export function ComboboxDemo<itemType extends ComboBoxItem>({
  options,
  value,
  setValue,
  caption,
  onAdd,
}: ComboBoxDemoProps<itemType>) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  async function addOption() {
    if (!onAdd) return
    const newOption = await onAdd(searchValue)
    setValue(newOption)
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
          {value ? value?.name : `Select ${caption}...`}
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
                  onSelect={(selectedId) => {
                    const currentValue = options.find(
                      (option) => option.id === selectedId
                    )
                    setValue(currentValue === value ? undefined : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value?.id === option.id ? 'opacity-100' : 'opacity-0'
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
