import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { Combobox as ComboboxPrimitive } from "@kobalte/core/combobox"

import { cx } from "@repo/tailwindcss/utils/cva"

export const ComboboxPortal = ComboboxPrimitive.Portal

export type ComboboxProps<
  Option,
  Group = never,
  T extends ValidComponent = "div",
> = ComponentProps<typeof ComboboxPrimitive<Option, Group, T>>

export const Combobox = <
  Option,
  Group = never,
  T extends ValidComponent = "div",
>(
  props: ComboboxProps<Option, Group, T>,
) => {
  const [local, rest] = splitProps(props as ComboboxProps<Option, Group>, [
    "class",
  ])

  return (
    <ComboboxPrimitive
      data-slot="combobox"
      class={cx("space-y-2", local.class)}
      {...rest}
    />
  )
}

export type ComboboxInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof ComboboxPrimitive.Input<T>>

export const ComboboxInput = <T extends ValidComponent = "input">(
  props: ComboboxInputProps<T>,
) => {
  const [local, rest] = splitProps(props as ComboboxInputProps, ["class"])

  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      class={cx(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground pr-3 outline-none",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof ComboboxPrimitive.Trigger<T>>

export const ComboboxTrigger = <T extends ValidComponent = "button">(
  props: ComboboxTriggerProps<T>,
) => {
  const [local, rest] = splitProps(props as ComboboxTriggerProps, ["class"])

  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      class={cx("[&>svg]:text-muted-foreground [&>svg]:size-3.5", local.class)}
      {...rest}
    >
      <ComboboxPrimitive.Icon
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m7 15l5 5l5-5M7 9l5-5l5 5"
        />
      </ComboboxPrimitive.Icon>
    </ComboboxPrimitive.Trigger>
  )
}

export type ComboboxControlProps<
  Option,
  T extends ValidComponent = "div",
> = ComponentProps<typeof ComboboxPrimitive.Control<Option, T>>

export const ComboboxControl = <Option, T extends ValidComponent = "div">(
  props: ComboboxControlProps<Option, T>,
) => {
  const [local, rest] = splitProps(props as ComboboxControlProps<Option>, [
    "class",
  ])

  return (
    <ComboboxPrimitive.Control
      data-slot="combobox-control"
      class={cx(
        "dark:bg-input/30 border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 md:text-sm",
        "data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40 data-[invalid]:border-destructive",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Content<T>>

export const ComboboxContent = <T extends ValidComponent = "div">(
  props: ComboboxContentProps<T>,
) => {
  const [local, rest] = splitProps(props as ComboboxContentProps, ["class"])

  return (
    <ComboboxPrimitive.Content
      data-slot="combobox-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--kb-combobox-content-transform-origin) relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md",
        local.class,
      )}
      {...rest}
    >
      <ComboboxPrimitive.Listbox data-slot="combobox-listbox" class="p-1" />
    </ComboboxPrimitive.Content>
  )
}

export type ComboboxItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Item<T>>

export const ComboboxItem = <T extends ValidComponent = "div">(
  props: ComboboxItemProps<T>,
) => {
  const [local, rest] = splitProps(props as ComboboxItemProps, [
    "class",
    "children",
  ])

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex w-full cursor-default select-none items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <ComboboxPrimitive.ItemIndicator>
        <ComboboxPrimitive.Icon
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
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
        </ComboboxPrimitive.Icon>
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

export type ComboboxItemLabelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.ItemLabel<T>>

export const ComboboxItemLabel = <T extends ValidComponent = "div">(
  props: ComboboxItemLabelProps<T>,
) => {
  return (
    <ComboboxPrimitive.ItemLabel data-slot="combobox-itemlabel" {...props} />
  )
}

export type ComboboxDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Description<T>>

export const ComboboxDescription = <T extends ValidComponent = "div">(
  props: ComboboxDescriptionProps<T>,
) => {
  const [local, rest] = splitProps(props as ComboboxDescriptionProps, ["class"])

  return (
    <ComboboxPrimitive.Description
      data-slot="combobox-description"
      class={cx(
        "text-muted-foreground text-sm data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof ComboboxPrimitive.Label<T>>

export const ComboboxLabel = <T extends ValidComponent = "label">(
  props: ComboboxLabelProps<T>,
) => {
  const [local, rest] = splitProps(props as ComboboxLabelProps, ["class"])

  return (
    <ComboboxPrimitive.Label
      data-slot="combobox-label"
      class={cx(
        "flex select-none items-center gap-2 text-sm font-medium leading-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxErrorMessageProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.ErrorMessage<T>>

export const ComboboxErrorMessage = <T extends ValidComponent = "div">(
  props: ComboboxErrorMessageProps<T>,
) => {
  const [local, rest] = splitProps(props as ComboboxErrorMessageProps, [
    "class",
  ])

  return (
    <ComboboxPrimitive.ErrorMessage
      data-slot="combobox-errormessage"
      class={cx(
        "text-destructive text-sm data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxSectionProps<T extends ValidComponent = "li"> =
  ComponentProps<typeof ComboboxPrimitive.Section<T>>

export const ComboboxSection = <T extends ValidComponent = "li">(
  props: ComboboxSectionProps<T>,
) => {
  const [local, rest] = splitProps(props as ComboboxSectionProps, ["class"])

  return (
    <ComboboxPrimitive.Section
      data-slot="combobox-section"
      class={cx(
        "text-muted-foreground not-first-of-type:mt-1 px-2 py-1.5 text-xs",
        local.class,
      )}
      {...rest}
    />
  )
}
