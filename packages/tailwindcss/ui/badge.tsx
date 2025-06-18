import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
				destructive:
					"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type badgeProps<T extends ValidComponent = "span"> = ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & {
		class?: string;
		asChild?: boolean;
	};

export const Badge = <T extends ValidComponent = "span">(
	props: PolymorphicProps<T, badgeProps<T>>,
) => {
	const [local, rest] = splitProps(props as badgeProps, [
		"class",
		"variant",
		"asChild",
	]);

	return (
		<span
			data-slot="badge"
			class={cn(
				badgeVariants({
					variant: local.variant,
				}),
				local.class,
			)}
			{...rest}
		/>
	);
};
