import { cn } from "@/libs/cn";
import { Label as LabelPrimitive } from "@kobalte/core/label";
import type { LabelRootProps } from "@kobalte/core/label";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

function Label<T extends ValidComponent = "label">(
	props: PolymorphicProps<T, LabelRootProps<T> & { class?: string }>,
) {
	const [local, rest] = splitProps(
		props as LabelRootProps<T> & { class?: string },
		["class"],
	);
	return (
		<LabelPrimitive.Root
			data-slot="label"
			class={cn(
				"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				local.class,
			)}
			{...rest}
		/>
	);
}

export { Label };
