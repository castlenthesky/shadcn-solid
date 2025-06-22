import { cn } from "@/libs/cn";
import { type ComponentProps, splitProps } from "solid-js";

export const Table = (props: ComponentProps<"table">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div data-slot="table-container" class="relative w-full overflow-x-auto">
			<table
				data-slot="table"
				class={cn("w-full caption-bottom text-sm", local.class)}
				{...rest}
			/>
		</div>
	);
};

export const TableHeader = (props: ComponentProps<"thead">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<thead
			data-slot="table-header"
			class={cn("[&_tr]:border-b", local.class)}
			{...rest}
		/>
	);
};

export const TableBody = (props: ComponentProps<"tbody">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<tbody
			data-slot="table-body"
			class={cn("[&_tr:last-child]:border-0", local.class)}
			{...rest}
		/>
	);
};

export const TableFooter = (props: ComponentProps<"tfoot">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<tfoot
			data-slot="table-footer"
			class={cn(
				"bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const TableRow = (props: ComponentProps<"tr">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<tr
			data-slot="table-row"
			class={cn(
				"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const TableHead = (props: ComponentProps<"th">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<th
			data-slot="table-head"
			class={cn(
				"text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const TableCell = (props: ComponentProps<"td">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<td
			data-slot="table-cell"
			class={cn(
				"p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const TableCaption = (props: ComponentProps<"caption">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<caption
			data-slot="table-caption"
			class={cn("mt-4 text-sm text-muted-foreground", local.class)}
			{...rest}
		/>
	);
};
