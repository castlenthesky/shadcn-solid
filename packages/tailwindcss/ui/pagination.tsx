import { cn } from "@/libs/cn";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { buttonVariants } from "./button";

export const Pagination = (props: ComponentProps<"nav">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<nav
			aria-label="pagination"
			data-slot="pagination"
			class={cn("mx-auto flex w-full justify-center", local.class)}
			{...rest}
		/>
	);
};

export const PaginationContent = (props: ComponentProps<"ul">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<ul
			data-slot="pagination-content"
			class={cn("flex flex-row items-center gap-1", local.class)}
			{...rest}
		/>
	);
};

export const PaginationItem = (props: ComponentProps<"li">) => {
	return <li data-slot="pagination-item" {...props} />;
};

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<VariantProps<typeof buttonVariants>, "size"> &
	ComponentProps<"a">;

export const PaginationLink = (props: PaginationLinkProps) => {
	const merged = mergeProps({ size: "icon" as const }, props);
	const [local, rest] = splitProps(merged, ["class", "isActive", "size"]);

	return (
		<a
			aria-current={local.isActive ? "page" : undefined}
			data-slot="pagination-link"
			data-active={local.isActive}
			class={cn(
				buttonVariants({
					variant: local.isActive ? "outline" : "ghost",
					size: local.size,
				}),
				local.class,
			)}
			{...rest}
		/>
	);
};

export const PaginationPrevious = (
	props: ComponentProps<typeof PaginationLink>,
) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			class={cn("gap-1 px-2.5 sm:pl-2.5", local.class)}
			{...rest}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="h-4 w-4"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m15 6l-6 6l6 6"
				/>
			</svg>
			<span class="hidden sm:block">Previous</span>
		</PaginationLink>
	);
};

export const PaginationNext = (
	props: ComponentProps<typeof PaginationLink>,
) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			class={cn("gap-1 px-2.5 sm:pr-2.5", local.class)}
			{...rest}
		>
			<span class="hidden sm:block">Next</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="h-4 w-4"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m9 6l6 6l-6 6"
				/>
			</svg>
		</PaginationLink>
	);
};

export const PaginationEllipsis = (props: ComponentProps<"span">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			class={cn("flex size-9 items-center justify-center", local.class)}
			{...rest}
		>
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
					d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
				/>
			</svg>
			<span class="sr-only">More pages</span>
		</span>
	);
};

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
};
