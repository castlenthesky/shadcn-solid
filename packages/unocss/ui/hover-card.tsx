import { cn } from "@/libs/cn";
import type {
	HoverCardContentProps,
	HoverCardRootProps,
	HoverCardTriggerProps,
} from "@kobalte/core/hover-card";
import { HoverCard as HoverCardPrimitive } from "@kobalte/core/hover-card";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type hoverCardProps<T extends ValidComponent = "div"> =
	HoverCardRootProps<T> & {
		class?: string;
	};

export const HoverCard = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, hoverCardProps<T>>,
) => {
	const [local, rest] = splitProps(props as hoverCardProps, ["class"]);

	return (
		<HoverCardPrimitive data-slot="hover-card" class={local.class} {...rest} />
	);
};

type hoverCardTriggerProps<T extends ValidComponent = "button"> =
	HoverCardTriggerProps<T> & {
		class?: string;
	};

export const HoverCardTrigger = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, hoverCardTriggerProps<T>>,
) => {
	const [local, rest] = splitProps(props as hoverCardTriggerProps, ["class"]);

	return (
		<HoverCardPrimitive.Trigger
			data-slot="hover-card-trigger"
			class={local.class}
			{...rest}
		/>
	);
};

type hoverCardContentProps<T extends ValidComponent = "div"> =
	HoverCardContentProps<T> & {
		class?: string;
	};

export const HoverCardContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, hoverCardContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as hoverCardContentProps, ["class"]);

	return (
		<HoverCardPrimitive.Portal data-slot="hover-card-portal">
			<HoverCardPrimitive.Content
				data-slot="hover-card-content"
				class={cn(
					"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
					local.class,
				)}
				{...rest}
			/>
		</HoverCardPrimitive.Portal>
	);
};

export { HoverCard, HoverCardTrigger, HoverCardContent };
