import { cn } from "@/libs/cn";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";

// Breadcrumb navigation container
interface BreadcrumbProps extends ComponentProps<"nav"> {
	class?: string;
}

export const Breadcrumb: Component<BreadcrumbProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<nav
			aria-label="breadcrumb"
			data-slot="breadcrumb"
			class={local.class}
			{...rest}
		/>
	);
};

// Breadcrumb ordered list
interface BreadcrumbListProps extends ComponentProps<"ol"> {
	class?: string;
}

export const BreadcrumbList: Component<BreadcrumbListProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<ol
			data-slot="breadcrumb-list"
			class={cn(
				"text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
				local.class,
			)}
			{...rest}
		/>
	);
};

// Individual breadcrumb item
interface BreadcrumbItemProps extends ComponentProps<"li"> {
	class?: string;
}

export const BreadcrumbItem: Component<BreadcrumbItemProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<li
			data-slot="breadcrumb-item"
			class={cn("inline-flex items-center gap-1.5", local.class)}
			{...rest}
		/>
	);
};

// Breadcrumb link
interface BreadcrumbLinkProps extends ComponentProps<"a"> {
	class?: string;
}

export const BreadcrumbLink: Component<BreadcrumbLinkProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<a
			data-slot="breadcrumb-link"
			class={cn("hover:text-foreground transition-colors", local.class)}
			{...rest}
		/>
	);
};

// Current page (non-clickable)
interface BreadcrumbPageProps extends ComponentProps<"span"> {
	class?: string;
}

export const BreadcrumbPage: Component<BreadcrumbPageProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			class={cn("text-foreground font-normal", local.class)}
			{...rest}
		/>
	);
};

// Breadcrumb separator
interface BreadcrumbSeparatorProps extends ComponentProps<"li"> {
	class?: string;
	children?: JSX.Element;
}

export const BreadcrumbSeparator: Component<BreadcrumbSeparatorProps> = (
	props,
) => {
	const [local, rest] = splitProps(props, ["class", "children"]);

	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			class={cn("[&>svg]:size-3.5", local.class)}
			{...rest}
		>
			{local.children ?? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-4"
				>
					<path d="m9 18 6-6-6-6" />
				</svg>
			)}
		</li>
	);
};

// Breadcrumb ellipsis for collapsed breadcrumbs
interface BreadcrumbEllipsisProps extends ComponentProps<"span"> {
	class?: string;
}

export const BreadcrumbEllipsis: Component<BreadcrumbEllipsisProps> = (
	props,
) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			class={cn("flex size-9 items-center justify-center", local.class)}
			{...rest}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-4"
			>
				<circle cx="12" cy="12" r="1" />
				<circle cx="19" cy="12" r="1" />
				<circle cx="5" cy="12" r="1" />
			</svg>
			<span class="sr-only">More</span>
		</span>
	);
};
