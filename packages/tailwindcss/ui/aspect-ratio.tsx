import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type aspectRatioProps<T extends ValidComponent = "div"> = ParentProps<
	ComponentProps<"div"> & {
		class?: string;
		ratio?: number;
	}
>;

export const AspectRatio = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, aspectRatioProps<T>>,
) => {
	const [local, rest] = splitProps(props as aspectRatioProps, [
		"class",
		"children",
		"ratio",
	]);

	const aspectRatio = local.ratio || 16 / 9;

	return (
		<div
			data-slot="aspect-ratio"
			class={cn("relative w-full", local.class)}
			style={{
				"aspect-ratio": aspectRatio.toString(),
			}}
			{...rest}
		>
			{local.children}
		</div>
	);
};
