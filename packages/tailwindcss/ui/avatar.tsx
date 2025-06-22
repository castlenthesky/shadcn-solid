import { cn } from "@/libs/cn";
import type {
	ImageFallbackProps,
	ImageImgProps,
	ImageRootProps,
} from "@kobalte/core/image";
import { Image as ImagePrimitive } from "@kobalte/core/image";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type AvatarProps<T extends ValidComponent = "span"> = ImageRootProps<T> & {
	class?: string;
};

export const Avatar = <T extends ValidComponent = "span">(
	props: PolymorphicProps<T, AvatarProps<T>>,
) => {
	const [local, rest] = splitProps(props as AvatarProps, ["class"]);

	return (
		<ImagePrimitive
			data-slot="avatar"
			class={cn(
				"relative flex size-8 shrink-0 overflow-hidden rounded-full",
				local.class,
			)}
			{...rest}
		/>
	);
};

type AvatarImageProps<T extends ValidComponent = "img"> = ImageImgProps<T> & {
	class?: string;
};

export const AvatarImage = <T extends ValidComponent = "img">(
	props: PolymorphicProps<T, AvatarImageProps<T>>,
) => {
	const [local, rest] = splitProps(props as AvatarImageProps, ["class"]);

	return (
		<ImagePrimitive.Img
			data-slot="avatar-image"
			class={cn("aspect-square size-full", local.class)}
			{...rest}
		/>
	);
};

type AvatarFallbackProps<T extends ValidComponent = "span"> =
	ImageFallbackProps<T> & {
		class?: string;
	};

export const AvatarFallback = <T extends ValidComponent = "span">(
	props: PolymorphicProps<T, AvatarFallbackProps<T>>,
) => {
	const [local, rest] = splitProps(props as AvatarFallbackProps, ["class"]);

	return (
		<ImagePrimitive.Fallback
			data-slot="avatar-fallback"
			class={cn(
				"bg-muted flex size-full items-center justify-center rounded-full",
				local.class,
			)}
			{...rest}
		/>
	);
};
