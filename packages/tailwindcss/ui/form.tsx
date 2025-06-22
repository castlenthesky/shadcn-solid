import { cn } from "@/libs/cn";
import { Label } from "@/libs/ui/label";
import type { Component, ComponentProps, JSX } from "solid-js";
import {
	type Accessor,
	createContext,
	createUniqueId,
	splitProps,
	useContext,
} from "solid-js";

// Form field context types
interface FormFieldContextValue {
	name: string;
	error: Accessor<string | undefined>;
	isValid: Accessor<boolean>;
}

interface FormItemContextValue {
	id: string;
}

// Create contexts
const FormFieldContext = createContext<FormFieldContextValue>();
const FormItemContext = createContext<FormItemContextValue>();

// Hook to access form field state
export const useFormField = () => {
	const fieldContext = useContext(FormFieldContext);
	const itemContext = useContext(FormItemContext);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	if (!itemContext) {
		throw new Error("useFormField should be used within <FormItem>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		error: fieldContext.error,
		isValid: fieldContext.isValid,
	};
};

// Form field wrapper
interface FormFieldProps {
	name: string;
	error?: Accessor<string | undefined>;
	isValid?: Accessor<boolean>;
	children: JSX.Element;
}

export const FormField: Component<FormFieldProps> = (props) => {
	const contextValue = {
		name: props.name,
		error: props.error || (() => undefined),
		isValid: props.isValid || (() => true),
	};

	return (
		<FormFieldContext.Provider value={contextValue}>
			{props.children}
		</FormFieldContext.Provider>
	);
};

// Form item container
interface FormItemProps extends ComponentProps<"div"> {
	class?: string;
}

export const FormItem: Component<FormItemProps> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const id = createUniqueId();

	const contextValue = { id };

	return (
		<FormItemContext.Provider value={contextValue}>
			<div
				data-slot="form-item"
				class={cn("grid gap-2", local.class)}
				{...rest}
			>
				{local.children}
			</div>
		</FormItemContext.Provider>
	);
};

// Form label
interface FormLabelProps extends ComponentProps<typeof Label> {
	class?: string;
}

export const FormLabel: Component<FormLabelProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			data-error={!!error()}
			class={cn("data-[error=true]:text-destructive", local.class)}
			for={formItemId}
			{...rest}
		/>
	);
};

// Form control wrapper - acts like Radix Slot for composition
interface FormControlProps extends ComponentProps<"div"> {
	class?: string;
	children: JSX.Element;
}

export const FormControl: Component<FormControlProps> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	// Clone the child element and add form-specific props
	const childWithProps = () => {
		const child = local.children as any;
		if (typeof child === "function") {
			return child();
		}
		return child;
	};

	return (
		<div data-slot="form-control" class={local.class} {...rest}>
			<div
				id={formItemId}
				aria-describedby={
					!error() ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
				}
				aria-invalid={!!error()}
			>
				{childWithProps()}
			</div>
		</div>
	);
};

// Form description
interface FormDescriptionProps extends ComponentProps<"p"> {
	class?: string;
}

export const FormDescription: Component<FormDescriptionProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			class={cn("text-muted-foreground text-sm", local.class)}
			{...rest}
		/>
	);
};

// Form message (error display)
interface FormMessageProps extends ComponentProps<"p"> {
	class?: string;
}

export const FormMessage: Component<FormMessageProps> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const { error, formMessageId } = useFormField();

	const body = () => error() || local.children;

	if (!body()) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			class={cn("text-destructive text-sm", local.class)}
			{...rest}
		>
			{body()}
		</p>
	);
};

// Main form component
interface FormProps extends ComponentProps<"form"> {
	class?: string;
}

export const Form: Component<FormProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<form data-slot="form" class={cn("space-y-6", local.class)} {...rest} />
	);
};
