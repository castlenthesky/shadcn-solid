import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type avatarProps<T extends ValidComponent = "span"> = ParentProps<
	ComponentProps<"span"> & {
		class?: string;
	}
>;

export const Avatar = <T extends ValidComponent = "span">(
	props: PolymorphicProps<T, avatarProps<T>>,
) => {
	const [local, rest] = splitProps(props as avatarProps, ["class", "children"]);

	return (
		<span
			data-slot="avatar"
			class={cn(
				"relative flex size-8 shrink-0 overflow-hidden rounded-full",
				local.class,
			)}
			{...rest}
		>
			{local.children}
		</span>
	);
};

type avatarImageProps<T extends ValidComponent = "img"> = ParentProps<
	ComponentProps<"img"> & {
		class?: string;
	}
>;

export const AvatarImage = <T extends ValidComponent = "img">(
	props: PolymorphicProps<T, avatarImageProps<T>>,
) => {
	const [local, rest] = splitProps(props as avatarImageProps, ["class"]);

	return (
		<img
			data-slot="avatar-image"
			class={cn("aspect-square size-full", local.class)}
			{...rest}
		/>
	);
};

type avatarFallbackProps<T extends ValidComponent = "span"> = ParentProps<
	ComponentProps<"span"> & {
		class?: string;
	}
>;

export const AvatarFallback = <T extends ValidComponent = "span">(
	props: PolymorphicProps<T, avatarFallbackProps<T>>,
) => {
	const [local, rest] = splitProps(props as avatarFallbackProps, [
		"class",
		"children",
	]);

	return (
		<span
			data-slot="avatar-fallback"
			class={cn(
				"bg-muted flex size-full items-center justify-center rounded-full",
				local.class,
			)}
			{...rest}
		>
			{local.children}
		</span>
	);
}; 