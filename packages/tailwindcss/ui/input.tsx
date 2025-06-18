import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

// Accept all input props, including type and class
function Input<T extends ValidComponent = "input">(
	props: PolymorphicProps<T, { class?: string; type?: string }>,
) {
	const [local, rest] = splitProps(props as { class?: string; type?: string }, [
		"class",
		"type",
	]);
	return (
		<input
			data-slot="input"
			type={local.type}
			class={cn(
				"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				local.class,
			)}
			{...rest}
		/>
	);
}

export { Input };
