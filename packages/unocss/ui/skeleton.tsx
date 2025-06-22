import { cn } from "@/libs/cn";
import { type ComponentProps, splitProps } from "solid-js";

export function Skeleton(props: ComponentProps<"div">) {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="skeleton"
			class={cn("bg-accent animate-pulse rounded-md", local.class)}
			{...rest}
		/>
	);
}
