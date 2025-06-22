import { cn } from "@/libs/cn";
import type {
	AccordionContentProps,
	AccordionItemProps,
	AccordionTriggerProps,
} from "@kobalte/core/accordion";
import { Accordion as AccordionPrimitive } from "@kobalte/core/accordion";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { type ParentProps, type ValidComponent, splitProps } from "solid-js";

type accordionProps<T extends ValidComponent = "div"> =
	AccordionItemProps<T> & {
		class?: string;
	};

export const Accordion = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, accordionProps<T>>,
) => {
	const [local, rest] = splitProps(props as accordionProps, ["class"]);

	return (
		<AccordionPrimitive data-slot="accordion" class={local.class} {...rest} />
	);
};

type accordionItemProps<T extends ValidComponent = "div"> =
	AccordionItemProps<T> & {
		class?: string;
	};

export const AccordionItem = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, accordionItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as accordionItemProps, ["class"]);

	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			class={cn("border-b last:border-b-0", local.class)}
			{...rest}
		/>
	);
};

type accordionTriggerProps<T extends ValidComponent = "button"> = ParentProps<
	AccordionTriggerProps<T> & {
		class?: string;
	}
>;

export const AccordionTrigger = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, accordionTriggerProps<T>>,
) => {
	const [local, rest] = splitProps(props as accordionTriggerProps, [
		"class",
		"children",
	]);

	return (
		<AccordionPrimitive.Header class="flex" as="div">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				class={cn(
					"flex flex-1 items-start justify-between gap-4 py-4 text-sm font-medium transition-shadow hover:underline [&[data-expanded]>svg]:rotate-180 bg-inherit rounded-md focus-visible:(outline-none border-ring ring-ring/50 ring-3)",
					local.class,
				)}
				{...rest}
			>
				{local.children}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-4 w-4 text-muted-foreground transition-transform duration-200 translate-y-0.5"
				>
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m6 9l6 6l6-6"
					/>
					<title>Arrow</title>
				</svg>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
};

type accordionContentProps<T extends ValidComponent = "div"> = ParentProps<
	AccordionContentProps<T> & {
		class?: string;
	}
>;

export const AccordionContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, accordionContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as accordionContentProps, [
		"class",
		"children",
	]);

	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			class={cn(
				"animate-accordion-up overflow-hidden text-sm data-[expanded]:animate-accordion-down",
				local.class,
			)}
			{...rest}
		>
			<div class="pb-4 pt-0">{local.children}</div>
		</AccordionPrimitive.Content>
	);
};
