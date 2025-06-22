import { cn } from "@/libs/cn";
import type {
	SliderRootProps,
	SliderValueChangeDetails,
} from "@kobalte/core/slider";
import { Slider as SliderPrimitive } from "@kobalte/core/slider";
import { For, createMemo, splitProps } from "solid-js";
import type { ComponentProps } from "solid-js";

export interface SliderProps extends SliderRootProps {
	class?: string;
}

export function Slider(props: SliderProps) {
	const [local, rest] = splitProps(props, [
		"class",
		"value",
		"defaultValue",
		"min",
		"max",
	]);

	const min = () => local.min ?? 0;
	const max = () => local.max ?? 100;

	// Calculate values array for thumb generation, matching React v4 logic
	const values = createMemo(() => {
		if (local.value) {
			return Array.isArray(local.value) ? local.value : [local.value];
		}
		if (local.defaultValue) {
			return Array.isArray(local.defaultValue)
				? local.defaultValue
				: [local.defaultValue];
		}
		return [min(), max()];
	});

	return (
		<SliderPrimitive
			data-slot="slider"
			class={cn(
				"relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
				local.class,
			)}
			value={local.value}
			defaultValue={local.defaultValue}
			min={min()}
			max={max()}
			{...rest}
		>
			<SliderPrimitive.Track
				data-slot="slider-track"
				class="bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
			>
				<SliderPrimitive.Fill
					data-slot="slider-range"
					class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
				/>
			</SliderPrimitive.Track>
			<For each={values()}>
				{(_, index) => (
					<SliderPrimitive.Thumb
						data-slot="slider-thumb"
						class="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
					>
						<SliderPrimitive.Input />
					</SliderPrimitive.Thumb>
				)}
			</For>
		</SliderPrimitive>
	);
}
