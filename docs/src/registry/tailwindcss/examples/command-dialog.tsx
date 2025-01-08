import { For, createEffect, createSignal, onCleanup } from "solid-js"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/tailwindcss/ui/command"

import { commandData } from "./command-demo"

const CommandDialogDemo = () => {
  const [open, setOpen] = createSignal(false)

  createEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)

    onCleanup(() => {
      document.removeEventListener("keydown", down)
    })
  })

  return (
    <>
      <p class="text-muted-foreground text-sm">
        Press{" "}
        <kbd class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span class="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog
        class="rounded-lg border shadow-md"
        open={open()}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <For each={commandData}>
            {(item) => (
              <CommandGroup heading={item.label}>
                <For each={item.options}>
                  {(item) => (
                    <CommandItem disabled={item.disabled}>
                      {item.icon}
                      <span>{item.label}</span>
                      {item.shortcut}
                    </CommandItem>
                  )}
                </For>
              </CommandGroup>
            )}
          </For>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandDialogDemo
