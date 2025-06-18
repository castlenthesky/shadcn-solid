import { cn } from "@/libs/cn";
import type {
	DialogContentProps,
	DialogDescriptionProps,
	DialogTitleProps,
} from "@kobalte/core/dialog";
import { Dialog as DialogPrimitive } from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Dialog = (props: ComponentProps<typeof DialogPrimitive>) => {
	return <DialogPrimitive data-slot="dialog" {...props} />;
};

export const DialogTrigger = (
	props: ComponentProps<typeof DialogPrimitive.Trigger>,
) => {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

export const DialogPortal = (
	props: ComponentProps<typeof DialogPrimitive.Portal>,
) => {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
};

export const DialogClose = (
	props: ComponentProps<typeof DialogPrimitive.CloseButton>,
) => {
	return <DialogPrimitive.CloseButton data-slot="dialog-close" {...props} />;
};

export const DialogOverlay = (
	props: ComponentProps<typeof DialogPrimitive.Overlay>,
) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			class={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
				local.class,
			)}
			{...rest}
		/>
	);
};

type dialogContentProps<T extends ValidComponent = "div"> = ParentProps<
	DialogContentProps<T> & {
		class?: string;
		showCloseButton?: boolean;
	}
>;

export const DialogContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, dialogContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as dialogContentProps, [
		"class",
		"children",
		"showCloseButton",
	]);
	const showCloseButton = local.showCloseButton ?? true;

	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				class={cn(
					"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
					local.class,
				)}
				{...rest}
			>
				{local.children}
				{showCloseButton && (
					<DialogPrimitive.CloseButton
						data-slot="dialog-close"
						class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
					>
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
							<title>Close</title>
						</svg>
						<span class="sr-only">Close</span>
					</DialogPrimitive.CloseButton>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
};

export const DialogHeader = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="dialog-header"
			class={cn("flex flex-col gap-2 text-center sm:text-left", local.class)}
			{...rest}
		/>
	);
};

export const DialogFooter = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="dialog-footer"
			class={cn(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				local.class,
			)}
			{...rest}
		/>
	);
};

type dialogTitleProps<T extends ValidComponent = "h2"> = DialogTitleProps<T> & {
	class?: string;
};

export const DialogTitle = <T extends ValidComponent = "h2">(
	props: PolymorphicProps<T, dialogTitleProps<T>>,
) => {
	const [local, rest] = splitProps(props as dialogTitleProps, ["class"]);

	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			class={cn("text-lg leading-none font-semibold", local.class)}
			{...rest}
		/>
	);
};

type dialogDescriptionProps<T extends ValidComponent = "p"> =
	DialogDescriptionProps<T> & {
		class?: string;
	};

export const DialogDescription = <T extends ValidComponent = "p">(
	props: PolymorphicProps<T, dialogDescriptionProps<T>>,
) => {
	const [local, rest] = splitProps(props as dialogDescriptionProps, ["class"]);

	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			class={cn("text-muted-foreground text-sm", local.class)}
			{...rest}
		/>
	);
};
