import { cn } from "@/libs/cn";
import type {
	ContentProps,
	DescriptionProps,
	DynamicProps,
	LabelProps,
} from "@corvu/drawer";
import DrawerPrimitive from "@corvu/drawer";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Drawer = (props: ComponentProps<typeof DrawerPrimitive>) => {
	return <DrawerPrimitive data-slot="drawer" {...props} />;
};

export const DrawerTrigger = (
	props: ComponentProps<typeof DrawerPrimitive.Trigger>,
) => {
	return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
};

export const DrawerPortal = (
	props: ComponentProps<typeof DrawerPrimitive.Portal>,
) => {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
};

export const DrawerClose = (
	props: ComponentProps<typeof DrawerPrimitive.Close>,
) => {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
};

export const DrawerOverlay = (
	props: ComponentProps<typeof DrawerPrimitive.Overlay>,
) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<DrawerPrimitive.Overlay
			data-slot="drawer-overlay"
			class={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
				local.class,
			)}
			{...rest}
		/>
	);
};

type drawerContentProps<T extends ValidComponent = "div"> = ParentProps<
	ContentProps<T> & {
		class?: string;
	}
>;

export const DrawerContent = <T extends ValidComponent = "div">(
	props: DynamicProps<T, drawerContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as drawerContentProps, [
		"class",
		"children",
	]);

	return (
		<DrawerPortal data-slot="drawer-portal">
			<DrawerOverlay />
			<DrawerPrimitive.Content
				data-slot="drawer-content"
				class={cn(
					"group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
					"data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
					"data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
					"data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
					"data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
					local.class,
				)}
				{...rest}
			>
				<div class="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
				{local.children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
};

export const DrawerHeader = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="drawer-header"
			class={cn(
				"flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const DrawerFooter = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="drawer-footer"
			class={cn("mt-auto flex flex-col gap-2 p-4", local.class)}
			{...rest}
		/>
	);
};

type DrawerTitleProps = LabelProps & {
	class?: string;
};

export const DrawerTitle = <T extends ValidComponent = "h2">(
	props: DynamicProps<T, DrawerTitleProps>,
) => {
	const [local, rest] = splitProps(props as DrawerTitleProps, ["class"]);

	return (
		<DrawerPrimitive.Label
			data-slot="drawer-title"
			class={cn("text-foreground font-semibold", local.class)}
			{...rest}
		/>
	);
};

type DrawerDescriptionProps = DescriptionProps & {
	class?: string;
};

export const DrawerDescription = <T extends ValidComponent = "p">(
	props: DynamicProps<T, DrawerDescriptionProps>,
) => {
	const [local, rest] = splitProps(props as DrawerDescriptionProps, ["class"]);

	return (
		<DrawerPrimitive.Description
			data-slot="drawer-description"
			class={cn("text-muted-foreground text-sm", local.class)}
			{...rest}
		/>
	);
};
