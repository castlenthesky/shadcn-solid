import { cn } from "@/libs/cn";
import type {
	CollapsibleContentProps,
	CollapsibleRootProps,
	CollapsibleTriggerProps,
} from "@kobalte/core/collapsible";
import { Collapsible as CollapsiblePrimitive } from "@kobalte/core/collapsible";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type collapsibleProps<T extends ValidComponent = "div"> =
	CollapsibleRootProps<T> & {
		class?: string;
	};

export const Collapsible = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, collapsibleProps<T>>,
) => {
	const [local, rest] = splitProps(props as collapsibleProps, ["class"]);

	return (
		<CollapsiblePrimitive
			data-slot="collapsible"
			class={local.class}
			{...rest}
		/>
	);
};

type collapsibleTriggerProps<T extends ValidComponent = "button"> =
	CollapsibleTriggerProps<T> & {
		class?: string;
	};

export const CollapsibleTrigger = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, collapsibleTriggerProps<T>>,
) => {
	const [local, rest] = splitProps(props as collapsibleTriggerProps, ["class"]);

	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			class={local.class}
			{...rest}
		/>
	);
};

type collapsibleContentProps<T extends ValidComponent = "div"> =
	CollapsibleContentProps<T> & {
		class?: string;
	};

export const CollapsibleContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, collapsibleContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as collapsibleContentProps, ["class"]);

	return (
		<CollapsiblePrimitive.Content
			data-slot="collapsible-content"
			class={cn(
				"animate-collapsible-up data-[expanded]:animate-collapsible-down",
				local.class,
			)}
			{...rest}
		/>
	);
};
