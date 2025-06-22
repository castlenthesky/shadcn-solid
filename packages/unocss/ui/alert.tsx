import { cn } from "@/libs/cn";
import type { AlertRootProps } from "@kobalte/core/alert";
import { Alert as AlertPrimitive } from "@kobalte/core/alert";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const alertVariants = cva(
	"relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:(size-4 translate-y-0.5 text-current)",
	{
		variants: {
			variant: {
				default: "bg-card text-card-foreground",
				destructive:
					"text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type alertProps<T extends ValidComponent = "div"> = AlertRootProps<T> &
	VariantProps<typeof alertVariants> & {
		class?: string;
	};

export const Alert = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, alertProps<T>>,
) => {
	const [local, rest] = splitProps(props as alertProps, ["class", "variant"]);

	return (
		<AlertPrimitive
			data-slot="alert"
			role="alert"
			class={cn(
				alertVariants({
					variant: local.variant,
				}),
				local.class,
			)}
			{...rest}
		/>
	);
};

export const AlertTitle = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="alert-title"
			class={cn(
				"col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const AlertDescription = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="alert-description"
			class={cn(
				"text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
				local.class,
			)}
			{...rest}
		/>
	);
};
