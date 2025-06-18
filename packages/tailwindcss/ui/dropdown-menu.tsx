import { cn } from "@/libs/cn";
import type {
	DropdownMenuCheckboxItemProps,
	DropdownMenuContentProps,
	DropdownMenuGroupLabelProps,
	DropdownMenuItemProps,
	DropdownMenuRadioItemProps,
	DropdownMenuSeparatorProps,
	DropdownMenuSubTriggerProps,
} from "@kobalte/core/dropdown-menu";
import { DropdownMenu as DropdownMenuPrimitive } from "@kobalte/core/dropdown-menu";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const DropdownMenu = (
	props: ComponentProps<typeof DropdownMenuPrimitive>,
) => {
	return <DropdownMenuPrimitive data-slot="dropdown-menu" {...props} />;
};

export const DropdownMenuPortal = (
	props: ComponentProps<typeof DropdownMenuPrimitive.Portal>,
) => {
	return (
		<DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
	);
};

export const DropdownMenuTrigger = (
	props: ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) => {
	return (
		<DropdownMenuPrimitive.Trigger
			data-slot="dropdown-menu-trigger"
			{...props}
		/>
	);
};

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

type dropdownMenuContentProps<T extends ValidComponent = "div"> =
	DropdownMenuContentProps<T> & {
		class?: string;
		sideOffset?: number;
	};

export const DropdownMenuContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, dropdownMenuContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as dropdownMenuContentProps, [
		"class",
		"sideOffset",
	]);
	const sideOffset = local.sideOffset ?? 4;

	return (
		<DropdownMenuPortal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				sideOffset={sideOffset}
				class={cn(
					"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
					local.class,
				)}
				{...rest}
			/>
		</DropdownMenuPortal>
	);
};

type dropdownMenuItemProps<T extends ValidComponent = "div"> =
	DropdownMenuItemProps<T> & {
		class?: string;
		inset?: boolean;
		variant?: "default" | "destructive";
	};

export const DropdownMenuItem = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, dropdownMenuItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as dropdownMenuItemProps, [
		"class",
		"inset",
		"variant",
	]);
	const variant = local.variant ?? "default";

	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={local.inset}
			data-variant={variant}
			class={cn(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				local.class,
			)}
			{...rest}
		/>
	);
};

type dropdownMenuLabelProps<T extends ValidComponent = "div"> =
	DropdownMenuGroupLabelProps<T> & {
		class?: string;
		inset?: boolean;
	};

export const DropdownMenuLabel = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, dropdownMenuLabelProps<T>>,
) => {
	const [local, rest] = splitProps(props as dropdownMenuLabelProps, [
		"class",
		"inset",
	]);

	return (
		<DropdownMenuPrimitive.GroupLabel
			data-slot="dropdown-menu-label"
			data-inset={local.inset}
			class={cn(
				"px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
				local.class,
			)}
			{...rest}
		/>
	);
};

type dropdownMenuSeparatorProps<T extends ValidComponent = "hr"> =
	DropdownMenuSeparatorProps<T> & {
		class?: string;
	};

export const DropdownMenuSeparator = <T extends ValidComponent = "hr">(
	props: PolymorphicProps<T, dropdownMenuSeparatorProps<T>>,
) => {
	const [local, rest] = splitProps(props as dropdownMenuSeparatorProps, [
		"class",
	]);

	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			class={cn("bg-border -mx-1 my-1 h-px", local.class)}
			{...rest}
		/>
	);
};

export const DropdownMenuShortcut = (props: ComponentProps<"span">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<span
			data-slot="dropdown-menu-shortcut"
			class={cn(
				"text-muted-foreground ml-auto text-xs tracking-widest",
				local.class,
			)}
			{...rest}
		/>
	);
};

type dropdownMenuSubTriggerProps<T extends ValidComponent = "div"> =
	ParentProps<
		DropdownMenuSubTriggerProps<T> & {
			class?: string;
			inset?: boolean;
		}
	>;

export const DropdownMenuSubTrigger = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, dropdownMenuSubTriggerProps<T>>,
) => {
	const [local, rest] = splitProps(props as dropdownMenuSubTriggerProps, [
		"class",
		"children",
		"inset",
	]);

	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={local.inset}
			class={cn(
				"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
				local.class,
			)}
			{...rest}
		>
			{local.children}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="ml-auto size-4"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m9 6l6 6l-6 6"
				/>
				<title>Chevron Right</title>
			</svg>
		</DropdownMenuPrimitive.SubTrigger>
	);
};

type dropdownMenuSubContentProps<T extends ValidComponent = "div"> =
	DropdownMenuSubTriggerProps<T> & {
		class?: string;
	};

export const DropdownMenuSubContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, dropdownMenuSubContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as dropdownMenuSubContentProps, [
		"class",
	]);

	return (
		<DropdownMenuPrimitive.SubContent
			data-slot="dropdown-menu-sub-content"
			class={cn(
				"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
				local.class,
			)}
			{...rest}
		/>
	);
};

type dropdownMenuCheckboxItemProps<T extends ValidComponent = "div"> =
	ParentProps<
		DropdownMenuCheckboxItemProps<T> & {
			class?: string;
		}
	>;

export const DropdownMenuCheckboxItem = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, dropdownMenuCheckboxItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as dropdownMenuCheckboxItemProps, [
		"class",
		"children",
	]);

	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			class={cn(
				"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				local.class,
			)}
			{...rest}
		>
			<span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
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
						<title>Check</title>
					</svg>
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{local.children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
};

type dropdownMenuRadioItemProps<T extends ValidComponent = "div"> = ParentProps<
	DropdownMenuRadioItemProps<T> & {
		class?: string;
	}
>;

export const DropdownMenuRadioItem = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, dropdownMenuRadioItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as dropdownMenuRadioItemProps, [
		"class",
		"children",
	]);

	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			class={cn(
				"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				local.class,
			)}
			{...rest}
		>
			<span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="size-2 fill-current"
					>
						<circle cx="12" cy="12" r="10" />
						<title>Circle</title>
					</svg>
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{local.children}
		</DropdownMenuPrimitive.RadioItem>
	);
};
