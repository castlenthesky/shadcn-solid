import type { CollapsibleContentProps } from "@kobalte/core/collapsible";
import { Collapsible as CollapsiblePrimitive } from "@kobalte/core/collapsible";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Collapsible = (
	props: ComponentProps<typeof CollapsiblePrimitive>,
) => {
	return <CollapsiblePrimitive data-slot="collapsible" {...props} />;
};

export const CollapsibleTrigger = (
	props: ComponentProps<typeof CollapsiblePrimitive.Trigger>,
) => {
	return (
		<CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
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
			class={local.class}
			{...rest}
		/>
	);
};
