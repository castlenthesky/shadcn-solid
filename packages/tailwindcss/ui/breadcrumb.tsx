import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type breadcrumbProps<T extends ValidComponent = "nav"> = ParentProps<
	ComponentProps<"nav"> & {
		class?: string;
	}
>;

export const Breadcrumb = <T extends ValidComponent = "nav">(
	props: PolymorphicProps<T, breadcrumbProps<T>>,
) => {
	const [local, rest] = splitProps(props as breadcrumbProps, [
		"class",
		"children",
	]);

	return (
		<nav
			aria-label="breadcrumb"
			data-slot="breadcrumb"
			class={local.class}
			{...rest}
		>
			{local.children}
		</nav>
	);
};

type breadcrumbListProps<T extends ValidComponent = "ol"> = ParentProps<
	ComponentProps<"ol"> & {
		class?: string;
	}
>;

export const BreadcrumbList = <T extends ValidComponent = "ol">(
	props: PolymorphicProps<T, breadcrumbListProps<T>>,
) => {
	const [local, rest] = splitProps(props as breadcrumbListProps, [
		"class",
		"children",
	]);

	return (
		<ol
			data-slot="breadcrumb-list"
			class={cn(
				"text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
				local.class,
			)}
			{...rest}
		>
			{local.children}
		</ol>
	);
};

type breadcrumbItemProps<T extends ValidComponent = "li"> = ParentProps<
	ComponentProps<"li"> & {
		class?: string;
	}
>;

export const BreadcrumbItem = <T extends ValidComponent = "li">(
	props: PolymorphicProps<T, breadcrumbItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as breadcrumbItemProps, [
		"class",
		"children",
	]);

	return (
		<li
			data-slot="breadcrumb-item"
			class={cn("inline-flex items-center gap-1.5", local.class)}
			{...rest}
		>
			{local.children}
		</li>
	);
};

type breadcrumbLinkProps<T extends ValidComponent = "a"> = ParentProps<
	ComponentProps<"a"> & {
		class?: string;
		asChild?: boolean;
	}
>;

export const BreadcrumbLink = <T extends ValidComponent = "a">(
	props: PolymorphicProps<T, breadcrumbLinkProps<T>>,
) => {
	const [local, rest] = splitProps(props as breadcrumbLinkProps, [
		"class",
		"children",
		"asChild",
	]);

	return (
		<a
			data-slot="breadcrumb-link"
			class={cn("hover:text-foreground transition-colors", local.class)}
			{...rest}
		>
			{local.children}
		</a>
	);
};

type breadcrumbPageProps<T extends ValidComponent = "a"> = ParentProps<
	ComponentProps<"a"> & {
		class?: string;
	}
>;

export const BreadcrumbPage = <T extends ValidComponent = "a">(
	props: PolymorphicProps<T, breadcrumbPageProps<T>>,
) => {
	const [local, rest] = splitProps(props as breadcrumbPageProps, [
		"class",
		"children",
	]);

	return (
		<a
			data-slot="breadcrumb-page"
			aria-disabled="true"
			aria-current="page"
			tabindex="0"
			class={cn("text-foreground font-normal", local.class)}
			{...rest}
		>
			{local.children}
		</a>
	);
};

type breadcrumbSeparatorProps<T extends ValidComponent = "li"> = ParentProps<
	ComponentProps<"li"> & {
		class?: string;
	}
>;

export const BreadcrumbSeparator = <T extends ValidComponent = "li">(
	props: PolymorphicProps<T, breadcrumbSeparatorProps<T>>,
) => {
	const [local, rest] = splitProps(props as breadcrumbSeparatorProps, [
		"class",
		"children",
	]);

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
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-3.5"
				>
					<title>Chevron right</title>
					<path d="m9 18l6-6-6-6" />
				</svg>
			)}
		</li>
	);
};

type breadcrumbEllipsisProps<T extends ValidComponent = "span"> = ParentProps<
	ComponentProps<"span"> & {
		class?: string;
	}
>;

export const BreadcrumbEllipsis = <T extends ValidComponent = "span">(
	props: PolymorphicProps<T, breadcrumbEllipsisProps<T>>,
) => {
	const [local, rest] = splitProps(props as breadcrumbEllipsisProps, [
		"class",
		"children",
	]);

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
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-4"
			>
				<title>More</title>
				<circle cx="12" cy="12" r="1" />
				<circle cx="19" cy="12" r="1" />
				<circle cx="5" cy="12" r="1" />
			</svg>
			<span class="sr-only">More</span>
		</span>
	);
};
 