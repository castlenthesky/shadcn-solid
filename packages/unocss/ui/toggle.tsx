import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ToggleButtonRootProps } from "@kobalte/core/toggle-button";
import { ToggleButton as ToggleButtonPrimitive } from "@kobalte/core/toggle-button";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const toggleVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-9 px-2 min-w-9",
				sm: "h-8 px-1.5 min-w-8",
				lg: "h-10 px-2.5 min-w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type toggleProps<T extends ValidComponent = "button"> =
	ToggleButtonRootProps<T> &
		VariantProps<typeof toggleVariants> & {
			class?: string;
		};

export const Toggle = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, toggleProps<T>>,
) => {
	const [local, rest] = splitProps(props as toggleProps, [
		"class",
		"variant",
		"size",
	]);

	return (
		<ToggleButtonPrimitive
			data-slot="toggle"
			class={cn(
				toggleVariants({
					variant: local.variant,
					size: local.size,
					class: local.class,
				}),
			)}
			{...rest}
		/>
	);
};

export { Toggle, toggleVariants };
