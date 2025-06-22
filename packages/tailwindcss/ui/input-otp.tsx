import { cn } from "@/libs/cn";
import type { DynamicProps, RootProps } from "@corvu/otp-field";
import OTPFieldPrimitive from "@corvu/otp-field";
import type { ComponentProps, ValidComponent } from "solid-js";
import { Show, splitProps } from "solid-js";

export const InputOTPInput = OTPFieldPrimitive.Input;

type InputOTPProps<T extends ValidComponent = "div"> = RootProps<T> & {
	class?: string;
	containerClassName?: string;
};

export const InputOTP = <T extends ValidComponent = "div">(
	props: DynamicProps<T, InputOTPProps<T>>,
) => {
	const [local, rest] = splitProps(props, ["class", "containerClassName"]);

	return (
		<OTPFieldPrimitive
			data-slot="input-otp"
			class={cn(
				"flex items-center gap-2 has-[:disabled]:opacity-50 disabled:cursor-not-allowed",
				local.containerClassName,
				local.class,
			)}
			{...rest}
		/>
	);
};

export const InputOTPGroup = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="input-otp-group"
			class={cn("flex items-center", local.class)}
			{...rest}
		/>
	);
};

export const InputOTPSeparator = (props: ComponentProps<"div">) => {
	return (
		<div role="separator" data-slot="input-otp-separator" {...props}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="size-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<title>Separator</title>
				<path d="M5 12h14" />
			</svg>
		</div>
	);
};

export const InputOTPSlot = (
	props: ComponentProps<"div"> & { index: number },
) => {
	const [local, rest] = splitProps(props, ["class", "index"]);
	const context = OTPFieldPrimitive.useContext();
	const char = () => context.value()[local.index];
	const hasFakeCaret = () =>
		context.value().length === local.index && context.isInserting();
	const isActive = () => context.activeSlots().includes(local.index);

	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive()}
			class={cn(
				// Base styles
				"relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-xs transition-all outline-none",
				// Border radius
				"first:rounded-l-md first:border-l last:rounded-r-md",
				// Active state styles
				"data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50",
				// Dark mode active background
				"dark:bg-input/30",
				// Invalid state styles
				"aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive",
				// Invalid ring styles
				"data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40",
				local.class,
			)}
			{...rest}
		>
			{char()}
			<Show when={hasFakeCaret()}>
				<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div class="h-4 w-px animate-caret-blink bg-foreground" />
				</div>
			</Show>
		</div>
	);
};
