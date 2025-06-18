import { cn } from "@/libs/cn";
import type {
	CommandDialogProps,
	CommandEmptyProps,
	CommandGroupProps,
	CommandInputProps,
	CommandItemProps,
	CommandListProps,
	CommandRootProps,
} from "cmdk-solid";
import { Command as CommandPrimitive } from "cmdk-solid";
import type { ComponentProps, VoidProps } from "solid-js";
import { splitProps } from "solid-js";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./dialog";

export const Command = (props: CommandRootProps) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<CommandPrimitive
			data-slot="command"
			class={cn(
				"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const CommandDialog = (
	props: CommandDialogProps & {
		title?: string;
		description?: string;
		className?: string;
	},
) => {
	const [local, rest] = splitProps(props, [
		"children",
		"title",
		"description",
		"className",
	]);
	const title = local.title ?? "Command Palette";
	const description = local.description ?? "Search for a command to run...";

	return (
		<Dialog {...rest}>
			<DialogHeader class="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent class={cn("overflow-hidden p-0", local.className)}>
				<Command class="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{local.children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};

export const CommandInput = (props: VoidProps<CommandInputProps>) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="command-input-wrapper"
			class="flex h-9 items-center gap-2 border-b px-3"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="size-4 shrink-0 opacity-50"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
				/>
				<title>Search</title>
			</svg>
			<CommandPrimitive.Input
				data-slot="command-input"
				class={cn(
					"placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
					local.class,
				)}
				{...rest}
			/>
		</div>
	);
};

export const CommandList = (props: CommandListProps) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<CommandPrimitive.List
			data-slot="command-list"
			class={cn(
				"max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const CommandEmpty = (props: CommandEmptyProps) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			class={cn("py-6 text-center text-sm", local.class)}
			{...rest}
		/>
	);
};

export const CommandGroup = (props: CommandGroupProps) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			class={cn(
				"text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const CommandSeparator = (props: CommandEmptyProps) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			class={cn("bg-border -mx-1 h-px", local.class)}
			{...rest}
		/>
	);
};

export const CommandItem = (props: CommandItemProps) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			class={cn(
				"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const CommandShortcut = (props: ComponentProps<"span">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<span
			data-slot="command-shortcut"
			class={cn(
				"text-muted-foreground ml-auto text-xs tracking-widest",
				local.class,
			)}
			{...rest}
		/>
	);
};
