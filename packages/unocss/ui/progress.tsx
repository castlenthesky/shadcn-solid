import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ProgressRootProps } from "@kobalte/core/progress";
import { Progress as ProgressPrimitive } from "@kobalte/core/progress";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type progressProps<T extends ValidComponent = "div"> = ProgressRootProps<T> & {
	class?: string;
	value?: number;
};

export const Progress = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, progressProps<T>>,
) => {
	const [local, rest] = splitProps(props as progressProps, ["class", "value"]);

	return (
		<ProgressPrimitive
			data-slot="progress"
			class={cn(
				"bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
				local.class,
			)}
			value={local.value}
			{...rest}
		>
			<ProgressPrimitive.Fill
				data-slot="progress-indicator"
				class="bg-primary h-full w-full flex-1 transition-all"
				style={{
					transform: `translateX(-${100 - (local.value || 0)}%)`,
				}}
			/>
		</ProgressPrimitive>
	);
};

export { Progress };
