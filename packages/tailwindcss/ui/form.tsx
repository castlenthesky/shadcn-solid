import {
	createContext,
	useContext,
	splitProps,
	ParentProps,
	JSX,
} from "solid-js";
import {
	Form as ModularForm,
	Field,
	type FormStore,
	type FieldValues,
} from "@modular-forms/solid";
import { cn } from "@/libs/cn";

// Contexts for field and item IDs
const FormFieldContext = createContext<{
	name: string;
	error: string | undefined;
	value: unknown;
}>();
const FormItemContext = createContext<{ id: string }>();

export function Form<T extends FieldValues>(props: {
	of: FormStore<T>;
	children: JSX.Element;
}) {
	return <ModularForm of={props.of}>{props.children}</ModularForm>;
}

export function FormField<T extends FieldValues>(props: any) {
	return (
		<Field {...props}>
			{(field: any, inputProps: any) => (
				<FormFieldContext.Provider
					value={{
						name: String(props.name),
						error: field.error,
						value: field.value,
					}}
				>
					{props.children(field, inputProps)}
				</FormFieldContext.Provider>
			)}
		</Field>
	);
}

export function useFormField() {
	const fieldContext = useContext(FormFieldContext);
	const itemContext = useContext(FormItemContext);
	if (!fieldContext)
		throw new Error("useFormField should be used within <FormField>");
	if (!itemContext)
		throw new Error("useFormField should be used within <FormItem>");
	const { name, error, value } = fieldContext;
	const { id } = itemContext;
	return {
		id,
		name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		error,
		value,
	};
}

export function FormItem(props: ParentProps<{ class?: string }>) {
	const id = Math.random().toString(36).slice(2, 10);
	const [local, rest] = splitProps(props, ["class", "children"]);
	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				class={cn("grid gap-2", local.class)}
				{...rest}
			>
				{local.children}
			</div>
		</FormItemContext.Provider>
	);
}

export function FormLabel(props: ParentProps<{ class?: string }>) {
	const { error, formItemId } = useFormField();
	const [local, rest] = splitProps(props, ["class", "children"]);
	return (
		<label
			data-slot="form-label"
			data-error={!!error}
			class={cn("data-[error=true]:text-destructive", local.class)}
			for={formItemId}
			{...rest}
		>
			{local.children}
		</label>
	);
}

export function FormControl(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();
	return (
		<input
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
}

export function FormDescription(props: ParentProps<{ class?: string }>) {
	const { formDescriptionId } = useFormField();
	const [local, rest] = splitProps(props, ["class", "children"]);
	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			class={cn("text-muted-foreground text-sm", local.class)}
			{...rest}
		>
			{local.children}
		</p>
	);
}

export function FormMessage(props: ParentProps<{ class?: string }>) {
	const { error, formMessageId } = useFormField();
	const [local, rest] = splitProps(props, ["class", "children"]);
	const body = error ? String(error ?? "") : local.children;
	if (!body) return null;
	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			class={cn("text-destructive text-sm", local.class)}
			{...rest}
		>
			{body}
		</p>
	);
}
