import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { ContextMenu as ContextMenuPrimitive } from "@kobalte/core/context-menu"

import { cx } from "@repo/tailwindcss/utils/cva"

export const ContextMenuPortal = ContextMenuPrimitive.Portal

export type ContextMenuProps = ComponentProps<typeof ContextMenuPrimitive>

export const ContextMenu = (props: ContextMenuProps) => {
  return <ContextMenuPrimitive data-slot="context-menu" {...props} />
}

export type ContextMenuTriggerProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.Trigger<T>>

export const ContextMenuTrigger = <T extends ValidComponent = "div">(
  props: ContextMenuTriggerProps<T>,
) => {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  )
}

export type ContextMenuGroupProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.Group<T>>

export const ContextMenuGroup = <T extends ValidComponent = "div">(
  props: ContextMenuGroupProps<T>,
) => {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

export type ContextMenuSubProps = ComponentProps<
  typeof ContextMenuPrimitive.Sub
>

export const ContextMenuSub = (props: ContextMenuSubProps) => {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

export type ContextMenuRadioGroupProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.RadioGroup<T>>

export const ContextMenuRadioGroup = <T extends ValidComponent = "div">(
  props: ContextMenuRadioGroupProps<T>,
) => {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

export type ContextMenuSubTriggerProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.SubTrigger<T>> & {
    inset?: boolean
  }

export const ContextMenuSubTrigger = <T extends ValidComponent = "div">(
  props: ContextMenuSubTriggerProps<T>,
) => {
  const [local, rest] = splitProps(props as ContextMenuSubTriggerProps, [
    "class",
    "children",
    "inset",
  ])

  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={local.inset}
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[expanded]:bg-accent data-[expanded]:text-accent-foreground outline-hidden flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-auto"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 18l6-6l-6-6"
        />
      </svg>
    </ContextMenuPrimitive.SubTrigger>
  )
}

export type ContextMenuSubContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.SubContent<T>>

export const ContextMenuSubContent = <T extends ValidComponent = "div">(
  props: ContextMenuSubContentProps<T>,
) => {
  const [local, rest] = splitProps(props as ContextMenuSubContentProps, [
    "class",
  ])

  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[expanded]:slide-in-from-left-2 origin-(--kb-menu-content-transform-origin) z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg outline-none",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ContextMenuContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.Content<T>>

export const ContextMenuContent = <T extends ValidComponent = "div">(
  props: ContextMenuContentProps<T>,
) => {
  const [local, rest] = splitProps(props as ContextMenuContentProps, ["class"])

  return (
    <ContextMenuPrimitive.Content
      data-slot="context-menu-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 origin-(--kb-menu-content-transform-origin) z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border p-1 shadow-md outline-none",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ContextMenuItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.Item<T>> & {
    inset?: boolean
    variant?: "default" | "destructive"
  }

export const ContextMenuItem = <T extends ValidComponent = "div">(
  props: ContextMenuItemProps<T>,
) => {
  const [local, rest] = splitProps(props as ContextMenuItemProps, [
    "class",
    "inset",
    "variant",
  ])

  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={local.inset}
      data-variant={local.variant}
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 dark:data-[variant=destructive]:data-[highlighted]:bg-destructive/20 data-[variant=destructive]:data-[highlighted]:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ContextMenuCheckboxItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.CheckboxItem<T>>

export const ContextMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: ContextMenuCheckboxItemProps<T>,
) => {
  const [local, rest] = splitProps(props as ContextMenuCheckboxItemProps, [
    "class",
    "children",
  ])

  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 6L9 17l-5-5"
          />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

export type ContextMenuRadioItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.RadioItem<T>>

export const ContextMenuRadioItem = <T extends ValidComponent = "div">(
  props: ContextMenuRadioItemProps<T>,
) => {
  const [local, rest] = splitProps(props as ContextMenuRadioItemProps, [
    "class",
    "children",
  ])

  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          class="size-2"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="currentColor"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.RadioItem>
  )
}

export type ContextMenuGroupLabelProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof ContextMenuPrimitive.GroupLabel<T>> & {
    inset?: boolean
  }

export const ContextMenuGroupLabel = <T extends ValidComponent = "span">(
  props: ContextMenuGroupLabelProps<T>,
) => {
  const [local, rest] = splitProps(props as ContextMenuGroupLabelProps, [
    "class",
    "inset",
  ])

  return (
    <ContextMenuPrimitive.GroupLabel
      as="div"
      data-slot="context-menu-group-label"
      data-inset={local.inset}
      class={cx(
        "text-foreground my-1.5 px-2 text-sm font-medium data-[inset]:pl-8",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ContextMenuItemLabelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ContextMenuPrimitive.ItemLabel<T>> & {
    inset?: boolean
  }

export const ContextMenuItemLabel = <T extends ValidComponent = "div">(
  props: ContextMenuItemLabelProps<T>,
) => {
  const [local, rest] = splitProps(props as ContextMenuItemLabelProps, [
    "class",
    "inset",
  ])

  return (
    <ContextMenuPrimitive.ItemLabel
      data-slot="context-menu-item-label"
      data-inset={local.inset}
      class={cx(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ContextMenuSeparatorProps<T extends ValidComponent = "hr"> =
  ComponentProps<typeof ContextMenuPrimitive.Separator<T>>

export const ContextMenuSeparator = <T extends ValidComponent = "hr">(
  props: ContextMenuSeparatorProps<T>,
) => {
  const [local, rest] = splitProps(props as ContextMenuSeparatorProps, [
    "class",
  ])

  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      class={cx("bg-border -mx-1 my-1 h-px", local.class)}
      {...rest}
    />
  )
}

export type ContextMenuShortcutProps = ComponentProps<"span">

export const ContextMenuShortcut = (props: ContextMenuShortcutProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <span
      data-slot="context-menu-shortcut"
      class={cx(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        local.class,
      )}
      {...rest}
    />
  )
}
