import { cn } from "@/libs/cn";
import type {
	AccordionContentProps,
	AccordionItemProps,
	AccordionTriggerProps,
} from "@kobalte/core/accordion";
import { Accordion as AccordionPrimitive } from "@kobalte/core/accordion";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { type ParentProps, type ValidComponent, splitProps } from "solid-js";

export const Accordion = AccordionPrimitive;

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
					"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-expanded]>svg]:rotate-180",
					local.class,
				)}
				{...rest}
			>
				{local.children}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
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
			class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
			{...rest}
		>
			<div class={cn("pt-0 pb-4", local.class)}>{local.children}</div>
		</AccordionPrimitive.Content>
	);
};
