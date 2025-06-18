import { cn } from "@/libs/cn";
import type { DynamicProps, RootProps } from "@corvu/otp-field";
import OTPFieldPrimitive from "@corvu/otp-field";
import type { ComponentProps, ValidComponent } from "solid-js";
import { Show, splitProps } from "solid-js";

// Root input component
function InputOTP<T extends ValidComponent = "div">({
	containerClassName,
	class: className,
	...props
}: DynamicProps<
	T,
	RootProps<T> & { containerClassName?: string; class?: string }
>) {
	return (
		<OTPFieldPrimitive
			data-slot="input-otp"
			class={cn(
				"flex items-center gap-2 has-[:disabled]:opacity-50",
				containerClassName,
			)}
			inputClass={cn("disabled:cursor-not-allowed", className)}
			{...props}
		/>
	);
}

// Group wrapper
function InputOTPGroup(props: ComponentProps<"div">) {
	const [local, rest] = splitProps(props, ["class"]);
	return (
		<div
			data-slot="input-otp-group"
			class={cn("flex items-center", local.class)}
			{...rest}
		/>
	);
}

// Slot (individual input cell)
function InputOTPSlot(props: ComponentProps<"div"> & { index: number }) {
	const [local, rest] = splitProps(props, ["class", "index", "aria-invalid"]);
	const context = OTPFieldPrimitive.useContext();
	const char = () => context.value()[local.index];
	const hasFakeCaret = () =>
		context.value().length === local.index && context.isInserting();
	const isActive = () => context.activeSlots().includes(local.index);
	const ariaInvalid = local["aria-invalid"] ?? undefined;

	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive() ? "true" : undefined}
			aria-invalid={ariaInvalid}
			class={cn(
				"data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
				local.class,
			)}
			{...rest}
		>
			{char()}
			<Show when={hasFakeCaret()}>
				<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div class="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
				</div>
			</Show>
		</div>
	);
}

// Separator (minus icon)
function InputOTPSeparator(props: ComponentProps<"hr">) {
	return (
		<>
			<hr
				data-slot="input-otp-separator"
				style={{
					border: "none",
					clip: "rect(0 0 0 0)",
					height: "1px",
					margin: "-1px",
					overflow: "hidden",
					padding: "0",
					position: "absolute",
					width: "1px",
				}}
				{...props}
			/>
			<div aria-hidden="true">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-4"
					viewBox="0 0 15 15"
				>
					<title>Separator</title>
					<path
						fill="currentColor"
						fill-rule="evenodd"
						d="M5 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</>
	);
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
