import { cn } from "@/libs/cn";
import type {
	ContextMenuCheckboxItemProps,
	ContextMenuContentProps,
	ContextMenuGroupLabelProps,
	ContextMenuGroupProps,
	ContextMenuItemLabelProps,
	ContextMenuItemProps,
	ContextMenuRadioGroupProps,
	ContextMenuRadioItemProps,
	ContextMenuRootProps,
	ContextMenuSeparatorProps,
	ContextMenuSubContentProps,
	ContextMenuSubProps,
	ContextMenuSubTriggerProps,
	ContextMenuTriggerProps,
} from "@kobalte/core/context-menu";
import { ContextMenu as ContextMenuPrimitive } from "@kobalte/core/context-menu";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type {
	ComponentProps,
	ParentProps,
	ValidComponent,
	VoidProps,
} from "solid-js";
import { splitProps } from "solid-js";

type contextMenuProps<T extends ValidComponent = "div"> =
	ContextMenuRootProps<T> & {
		class?: string;
	};

export const ContextMenu = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuProps, ["class"]);

	return (
		<ContextMenuPrimitive
			data-slot="context-menu"
			class={local.class}
			{...rest}
		/>
	);
};

type contextMenuTriggerProps<T extends ValidComponent = "div"> =
	ContextMenuTriggerProps<T> & {
		class?: string;
	};

export const ContextMenuTrigger = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuTriggerProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuTriggerProps, ["class"]);

	return (
		<ContextMenuPrimitive.Trigger
			data-slot="context-menu-trigger"
			class={local.class}
			{...rest}
		/>
	);
};

type contextMenuGroupProps<T extends ValidComponent = "div"> =
	ContextMenuGroupProps<T> & {
		class?: string;
	};

export const ContextMenuGroup = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuGroupProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuGroupProps, ["class"]);

	return (
		<ContextMenuPrimitive.Group
			data-slot="context-menu-group"
			class={local.class}
			{...rest}
		/>
	);
};

export const ContextMenuPortal = ContextMenuPrimitive.Portal;

type contextMenuSubProps<T extends ValidComponent = "div"> =
	ContextMenuSubProps<T> & {
		class?: string;
	};

export const ContextMenuSub = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuSubProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuSubProps, ["class"]);

	return (
		<ContextMenuPrimitive.Sub
			data-slot="context-menu-sub"
			class={local.class}
			{...rest}
		/>
	);
};

type contextMenuRadioGroupProps<T extends ValidComponent = "div"> =
	ContextMenuRadioGroupProps<T> & {
		class?: string;
	};

export const ContextMenuRadioGroup = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuRadioGroupProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuRadioGroupProps, [
		"class",
	]);

	return (
		<ContextMenuPrimitive.RadioGroup
			data-slot="context-menu-radio-group"
			class={local.class}
			{...rest}
		/>
	);
};

type contextMenuSubTriggerProps<T extends ValidComponent = "div"> = ParentProps<
	ContextMenuSubTriggerProps<T> & {
		class?: string;
		inset?: boolean;
	}
>;

export const ContextMenuSubTrigger = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuSubTriggerProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuSubTriggerProps, [
		"class",
		"children",
		"inset",
	]);

	return (
		<ContextMenuPrimitive.SubTrigger
			data-slot="context-menu-sub-trigger"
			data-inset={local.inset}
			class={cn(
				"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
					d="m9 6l6 6l-6 6"
				/>
				<title>Arrow</title>
			</svg>
		</ContextMenuPrimitive.SubTrigger>
	);
};

type contextMenuSubContentProps<T extends ValidComponent = "div"> =
	ContextMenuSubContentProps<T> & {
		class?: string;
	};

export const ContextMenuSubContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuSubContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuSubContentProps, [
		"class",
	]);

	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.SubContent
				data-slot="context-menu-sub-content"
				class={cn(
					"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
					local.class,
				)}
				{...rest}
			/>
		</ContextMenuPrimitive.Portal>
	);
};

type contextMenuContentProps<T extends ValidComponent = "div"> =
	ContextMenuContentProps<T> & {
		class?: string;
	};

export const ContextMenuContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuContentProps, ["class"]);

	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Content
				data-slot="context-menu-content"
				class={cn(
					"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
					local.class,
				)}
				{...rest}
			/>
		</ContextMenuPrimitive.Portal>
	);
};

type contextMenuItemProps<T extends ValidComponent = "div"> =
	ContextMenuItemProps<T> & {
		class?: string;
		inset?: boolean;
		variant?: "default" | "destructive";
	};

export const ContextMenuItem = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuItemProps, [
		"class",
		"inset",
		"variant",
	]);

	return (
		<ContextMenuPrimitive.Item
			data-slot="context-menu-item"
			data-inset={local.inset}
			data-variant={local.variant || "default"}
			class={cn(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				local.class,
			)}
			{...rest}
		/>
	);
};

type contextMenuCheckboxItemProps<T extends ValidComponent = "div"> =
	ParentProps<
		ContextMenuCheckboxItemProps<T> & {
			class?: string;
		}
	>;

export const ContextMenuCheckboxItem = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuCheckboxItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuCheckboxItemProps, [
		"class",
		"children",
	]);

	return (
		<ContextMenuPrimitive.CheckboxItem
			data-slot="context-menu-checkbox-item"
			class={cn(
				"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				local.class,
			)}
			{...rest}
		>
			<span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<ContextMenuPrimitive.ItemIndicator>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="size-4"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m5 12l5 5L20 7"
						/>
						<title>Checkbox</title>
					</svg>
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{local.children}
		</ContextMenuPrimitive.CheckboxItem>
	);
};

type contextMenuRadioItemProps<T extends ValidComponent = "div"> = ParentProps<
	ContextMenuRadioItemProps<T> & {
		class?: string;
	}
>;

export const ContextMenuRadioItem = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuRadioItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuRadioItemProps, [
		"class",
		"children",
	]);

	return (
		<ContextMenuPrimitive.RadioItem
			data-slot="context-menu-radio-item"
			class={cn(
				"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				local.class,
			)}
			{...rest}
		>
			<span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<ContextMenuPrimitive.ItemIndicator>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="size-2 fill-current"
					>
						<circle cx="12" cy="12" r="10" />
						<title>Radio</title>
					</svg>
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{local.children}
		</ContextMenuPrimitive.RadioItem>
	);
};

type contextMenuLabelProps<T extends ValidComponent = "div"> =
	ContextMenuItemLabelProps<T> & {
		class?: string;
		inset?: boolean;
	};

export const ContextMenuLabel = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, contextMenuLabelProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuLabelProps, [
		"class",
		"inset",
	]);

	return (
		<ContextMenuPrimitive.ItemLabel
			data-slot="context-menu-label"
			data-inset={local.inset}
			class={cn(
				"text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
				local.class,
			)}
			{...rest}
		/>
	);
};

type contextMenuSeparatorProps<T extends ValidComponent = "hr"> = VoidProps<
	ContextMenuSeparatorProps<T> & {
		class?: string;
	}
>;

export const ContextMenuSeparator = <T extends ValidComponent = "hr">(
	props: PolymorphicProps<T, contextMenuSeparatorProps<T>>,
) => {
	const [local, rest] = splitProps(props as contextMenuSeparatorProps, [
		"class",
	]);

	return (
		<ContextMenuPrimitive.Separator
			data-slot="context-menu-separator"
			class={cn("bg-border -mx-1 my-1 h-px", local.class)}
			{...rest}
		/>
	);
};

export const ContextMenuShortcut = (props: ComponentProps<"span">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<span
			data-slot="context-menu-shortcut"
			class={cn(
				"text-muted-foreground ml-auto text-xs tracking-widest",
				local.class,
			)}
			{...rest}
		/>
	);
};

export {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuCheckboxItem,
	ContextMenuRadioItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuGroup,
	ContextMenuPortal,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuRadioGroup,
};
