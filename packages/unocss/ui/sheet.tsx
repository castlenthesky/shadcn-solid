import { cn } from "@/libs/cn";
import type {
	DialogCloseProps,
	DialogContentProps,
	DialogDescriptionProps,
	DialogRootProps,
	DialogTitleProps,
	DialogTriggerProps,
} from "@kobalte/core/dialog";
import { Dialog as DialogPrimitive } from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

type sheetProps<T extends ValidComponent = "div"> = DialogRootProps<T> & {
	class?: string;
};

export const Sheet = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, sheetProps<T>>,
) => {
	const [local, rest] = splitProps(props as sheetProps, ["class"]);

	return <DialogPrimitive data-slot="sheet" class={local.class} {...rest} />;
};

type sheetTriggerProps<T extends ValidComponent = "button"> =
	DialogTriggerProps<T> & {
		class?: string;
	};

export const SheetTrigger = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, sheetTriggerProps<T>>,
) => {
	const [local, rest] = splitProps(props as sheetTriggerProps, ["class"]);

	return (
		<DialogPrimitive.Trigger
			data-slot="sheet-trigger"
			class={local.class}
			{...rest}
		/>
	);
};

type sheetCloseProps<T extends ValidComponent = "button"> =
	DialogCloseProps<T> & {
		class?: string;
	};

export const SheetClose = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, sheetCloseProps<T>>,
) => {
	const [local, rest] = splitProps(props as sheetCloseProps, ["class"]);

	return (
		<DialogPrimitive.CloseButton
			data-slot="sheet-close"
			class={local.class}
			{...rest}
		/>
	);
};

export const SheetPortal = DialogPrimitive.Portal;

export const SheetOverlay = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<DialogPrimitive.Overlay
			data-slot="sheet-overlay"
			class={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
				local.class,
			)}
			{...rest}
		/>
	);
};

type sheetContentProps<T extends ValidComponent = "div"> = ParentProps<
	DialogContentProps<T> & {
		class?: string;
		side?: "top" | "right" | "bottom" | "left";
	}
>;

export const SheetContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, sheetContentProps<T>>,
) => {
	const merged = mergeProps({ side: "right" as const }, props);
	const [local, rest] = splitProps(merged as sheetContentProps, [
		"class",
		"children",
		"side",
	]);

	return (
		<SheetPortal>
			<SheetOverlay />
			<DialogPrimitive.Content
				data-slot="sheet-content"
				class={cn(
					"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
					local.side === "right" &&
						"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
					local.side === "left" &&
						"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
					local.side === "top" &&
						"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
					local.side === "bottom" &&
						"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
					local.class,
				)}
				{...rest}
			>
				{local.children}
				<DialogPrimitive.CloseButton class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="size-4"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M18 6L6 18M6 6l12 12"
						/>
					</svg>
					<span class="sr-only">Close</span>
				</DialogPrimitive.CloseButton>
			</DialogPrimitive.Content>
		</SheetPortal>
	);
};

export const SheetHeader = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="sheet-header"
			class={cn("flex flex-col gap-1.5 p-4", local.class)}
			{...rest}
		/>
	);
};

export const SheetFooter = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="sheet-footer"
			class={cn("mt-auto flex flex-col gap-2 p-4", local.class)}
			{...rest}
		/>
	);
};

type sheetTitleProps<T extends ValidComponent = "h2"> = DialogTitleProps<T> & {
	class?: string;
};

export const SheetTitle = <T extends ValidComponent = "h2">(
	props: PolymorphicProps<T, sheetTitleProps<T>>,
) => {
	const [local, rest] = splitProps(props as sheetTitleProps, ["class"]);

	return (
		<DialogPrimitive.Title
			data-slot="sheet-title"
			class={cn("text-foreground font-semibold", local.class)}
			{...rest}
		/>
	);
};

type sheetDescriptionProps<T extends ValidComponent = "p"> =
	DialogDescriptionProps<T> & {
		class?: string;
	};

export const SheetDescription = <T extends ValidComponent = "p">(
	props: PolymorphicProps<T, sheetDescriptionProps<T>>,
) => {
	const [local, rest] = splitProps(props as sheetDescriptionProps, ["class"]);

	return (
		<DialogPrimitive.Description
			data-slot="sheet-description"
			class={cn("text-muted-foreground text-sm", local.class)}
			{...rest}
		/>
	);
};

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
