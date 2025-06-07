import type { ComponentProps } from "solid-js"
import {
  For,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  splitProps,
} from "solid-js"
import { useNavigate } from "@tanstack/solid-router"
import { createMutationObserver } from "@solid-primitives/mutation-observer"

import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/tailwindcss/ui/v4/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@repo/tailwindcss/ui/v4/dialog"
import { Separator } from "@repo/tailwindcss/ui/v4/separator"
import { cx } from "@repo/tailwindcss/utils/cva"

import { docsConfig } from "@/config/docs"
import { useConfig } from "@/hooks/use-config"

const CommandKbd = (props: ComponentProps<"kbd">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <kbd
      class={cx(
        "bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
        local.class,
      )}
      {...rest}
    />
  )
}

const CommandMenuItem = (
  props: ComponentProps<typeof CommandItem> & {
    onHighlight?: () => void
  },
) => {
  const [local, rest] = splitProps(props, ["class", "onHighlight"])

  const [itemRef, setItemRef] = createSignal<HTMLDivElement>()
  createMutationObserver(
    () => itemRef()!,
    { attributes: true },
    (mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-selected" &&
          itemRef()?.getAttribute("aria-selected") === "true"
        ) {
          local.onHighlight?.()
        }
      })
    },
  )

  return (
    <CommandItem
      ref={setItemRef}
      class={cx(
        "data-[selected=true]:border-input data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent !px-3 font-medium",
        local.class,
      )}
      {...rest}
    />
  )
}

const CommandMenu = () => {
  const { config } = useConfig()

  const navigate = useNavigate()

  const [open, setOpen] = createSignal(false)
  const [selectedType, setSelectedType] = createSignal<
    "color" | "page" | "component"
  >()
  const [copyPayload, setCopyPayload] = createSignal("")

  const runCommand = (command: () => unknown) => {
    setOpen(false)
    command()
  }

  const handlePageHighlight = (isComponent: boolean, name: string) => {
    if (isComponent) {
      setSelectedType("component")
      setCopyPayload(
        `${
          config().packageManager === "npm"
            ? "npx"
            : config().packageManager === "pnpm"
              ? "pnpx"
              : config().packageManager === "yarn"
                ? "yarn dlx"
                : "bunx --bun"
        } shadcn-solid@latest add ${name}`,
      )
    } else {
      setSelectedType("page")
      setCopyPayload("")
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
      if (
        (e.target instanceof HTMLElement && e.target.isContentEditable) ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      e.preventDefault()
      setOpen((open) => !open)
    }

    if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
      runCommand(async () => {
        if (selectedType() === "page" || selectedType() === "component") {
          await navigator.clipboard.writeText(copyPayload())
        }
      })
    }
  }

  createEffect(() => {
    document.addEventListener("keydown", handleKeyDown)

    onCleanup(() => {
      document.removeEventListener("keydown", handleKeyDown)
    })
  })

  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      <DialogTrigger<typeof Button>
        as={(props) => (
          <Button
            variant="secondary"
            class="bg-surface text-surface-foreground/60 dark:bg-card relative h-8 w-full justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
            {...props}
          >
            <span class="hidden lg:inline-flex">Search documentation...</span>
            <span class="inline-flex lg:hidden">Search...</span>
            <div class="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
              <CommandKbd>Ctrl</CommandKbd>
              <CommandKbd class="aspect-square">K</CommandKbd>
            </div>
          </Button>
        )}
      />
      <DialogPortal>
        <DialogContent
          showCloseButton={false}
          class="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
        >
          <DialogHeader class="sr-only">
            <DialogTitle>Search documentation...</DialogTitle>
            <DialogDescription>
              Search for a command to run...
            </DialogDescription>
          </DialogHeader>
          <Command class="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input rounded-none bg-transparent **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border">
            <CommandInput placeholder="Search documentation..." />
            <CommandList class="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
              <CommandEmpty class="text-muted-foreground py-12 text-center text-sm">
                No results found.
              </CommandEmpty>
              <For each={docsConfig.sidebarNav}>
                {(item) => (
                  <CommandGroup
                    heading={item.title}
                    class="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
                  >
                    <For each={item.items}>
                      {(item) => {
                        const isComponent = () =>
                          /^\/docs\/components\/(.*)?$/gm.test(item.href!)

                        return (
                          <CommandMenuItem
                            onSelect={() => {
                              runCommand(async () => {
                                await navigate({ to: item.href! })
                              })
                            }}
                            onHighlight={() => {
                              handlePageHighlight(
                                isComponent(),
                                item.title
                                  .toLocaleLowerCase()
                                  .split(" ")
                                  .join("-"),
                              )
                            }}
                          >
                            <Show
                              when={isComponent()}
                              fallback={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 12h14m-7-7l7 7l-7 7"
                                  />
                                </svg>
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0zm-13.239 0a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0zm6.619 6.619a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0zm0-13.238a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"
                                />
                              </svg>
                            </Show>

                            {item.title}
                          </CommandMenuItem>
                        )
                      }}
                    </For>
                  </CommandGroup>
                )}
              </For>
            </CommandList>
          </Command>
          <div class="text-muted-foreground absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800">
            <div class="flex items-center gap-2">
              <CommandKbd>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                    <path d="m9 10l-5 5l5 5" />
                  </g>
                </svg>
              </CommandKbd>{" "}
              Go to Page
            </div>
            <Show when={copyPayload()}>
              <Separator
                orientation="vertical"
                class="data-[orientation=vertical]:h-4"
              />
              <div class="flex items-center gap-1">
                <CommandKbd>Ctrl</CommandKbd>
                <CommandKbd>C</CommandKbd>
                {copyPayload()}
              </div>
            </Show>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default CommandMenu
