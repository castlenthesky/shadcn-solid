import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type {
	ToggleGroupItemProps,
	ToggleGroupRootProps,
} from "@kobalte/core/toggle-group";
import { ToggleGroup as ToggleGroupPrimitive } from "@kobalte/core/toggle-group";
import type { VariantProps } from "class-variance-authority";
import type { Accessor, ParentProps, ValidComponent } from "solid-js";
import { createContext, createMemo, splitProps, useContext } from "solid-js";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = createContext<
	Accessor<VariantProps<typeof toggleVariants>>
>(() => ({
	size: "default",
	variant: "default",
}));

type toggleGroupProps<T extends ValidComponent = "div"> = ParentProps<
	ToggleGroupRootProps<T> &
		VariantProps<typeof toggleVariants> & {
			class?: string;
		}
>;

export const ToggleGroup = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, toggleGroupProps<T>>,
) => {
	const [local, rest] = splitProps(props as toggleGroupProps, [
		"class",
		"children",
		"size",
		"variant",
	]);

	const value = createMemo<VariantProps<typeof toggleVariants>>(() => ({
		size: local.size,
		variant: local.variant,
	}));

	return (
		<ToggleGroupPrimitive
			data-slot="toggle-group"
			data-variant={local.variant}
			data-size={local.size}
			class={cn(
				"group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
				local.class,
			)}
			{...rest}
		>
			<ToggleGroupContext.Provider value={value}>
				{local.children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive>
	);
};

type toggleGroupItemProps<T extends ValidComponent = "button"> =
	ToggleGroupItemProps<T> &
		VariantProps<typeof toggleVariants> & {
			class?: string;
		};

export const ToggleGroupItem = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, toggleGroupItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as toggleGroupItemProps, [
		"class",
		"variant",
		"size",
	]);
	const context = useContext(ToggleGroupContext);

	return (
		<ToggleGroupPrimitive.Item
			data-slot="toggle-group-item"
			data-variant={context().variant || local.variant}
			data-size={context().size || local.size}
			class={cn(
				toggleVariants({
					variant: context().variant || local.variant,
					size: context().size || local.size,
				}),
				"min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
				local.class,
			)}
			{...rest}
		/>
	);
};
