import { createSignal, createMemo, createContext, useContext, splitProps, createUniqueId } from "solid-js";
import type { Component, ComponentProps, JSX, Accessor } from "solid-js";
import { z } from "zod";

// Core types for form validation
export type ValidationRule<T = any> = {
	required?: boolean | string;
	min?: number | string;
	max?: number | string;
	pattern?: RegExp | string;
	custom?: (value: T) => boolean | string;
	schema?: z.ZodSchema<T>;
};

export type FieldState<T = any> = {
	value: T;
	error: string | undefined;
	touched: boolean;
	dirty: boolean;
	valid: boolean;
};

export type FormState<T extends Record<string, any> = Record<string, any>> = {
	values: T;
	errors: Partial<Record<keyof T, string>>;
	touched: Partial<Record<keyof T, boolean>>;
	dirty: Partial<Record<keyof T, boolean>>;
	valid: boolean;
	submitting: boolean;
	submitted: boolean;
};

// Form validation context
interface FormValidationContextValue<T extends Record<string, any> = Record<string, any>> {
	state: Accessor<FormState<T>>;
	getFieldState: <K extends keyof T>(name: K) => FieldState<T[K]>;
	setFieldValue: <K extends keyof T>(name: K, value: T[K]) => void;
	setFieldError: <K extends keyof T>(name: K, error: string | undefined) => void;
	setFieldTouched: <K extends keyof T>(name: K, touched: boolean) => void;
	validateField: <K extends keyof T>(name: K) => Promise<boolean>;
	validateForm: () => Promise<boolean>;
	resetForm: () => void;
	resetField: <K extends keyof T>(name: K) => void;
	submitForm: () => Promise<void>;
	isSubmitting: Accessor<boolean>;
	hasErrors: Accessor<boolean>;
}

const FormValidationContext = createContext<FormValidationContextValue>();

// Hook to use form validation context
export function useFormValidation<T extends Record<string, any> = Record<string, any>>(): FormValidationContextValue<T> {
	const context = useContext(FormValidationContext);
	if (!context) {
		throw new Error("useFormValidation must be used within a FormValidationProvider");
	}
	return context as FormValidationContextValue<T>;
}

// Individual field validation hook
export function useFieldValidation<T = any>(
	name: string,
	rules?: ValidationRule<T>,
	initialValue?: T
) {
	const [value, setValue] = createSignal<T>(initialValue as T);
	const [error, setError] = createSignal<string | undefined>();
	const [touched, setTouched] = createSignal(false);
	const [dirty, setDirty] = createSignal(false);

	const valid = createMemo(() => !error());

	const validate = async (val: T = value()): Promise<boolean> => {
		try {
			let errorMessage: string | undefined;

			// Required validation
			if (rules?.required && (!val || val === "")) {
				errorMessage = typeof rules.required === "string" ? rules.required : "This field is required";
			}

			// Min/Max validation for numbers and strings
			if (!errorMessage && rules?.min !== undefined) {
				if (typeof val === "number" && val < rules.min) {
					errorMessage = typeof rules.min === "string" ? rules.min : `Minimum value is ${rules.min}`;
				} else if (typeof val === "string" && val.length < rules.min) {
					errorMessage = typeof rules.min === "string" ? rules.min : `Minimum length is ${rules.min}`;
				}
			}

			if (!errorMessage && rules?.max !== undefined) {
				if (typeof val === "number" && val > rules.max) {
					errorMessage = typeof rules.max === "string" ? rules.max : `Maximum value is ${rules.max}`;
				} else if (typeof val === "string" && val.length > rules.max) {
					errorMessage = typeof rules.max === "string" ? rules.max : `Maximum length is ${rules.max}`;
				}
			}

			// Pattern validation
			if (!errorMessage && rules?.pattern && typeof val === "string") {
				const pattern = typeof rules.pattern === "string" ? new RegExp(rules.pattern) : rules.pattern;
				if (!pattern.test(val)) {
					errorMessage = "Invalid format";
				}
			}

			// Custom validation
			if (!errorMessage && rules?.custom) {
				const customResult = rules.custom(val);
				if (typeof customResult === "string") {
					errorMessage = customResult;
				} else if (!customResult) {
					errorMessage = "Validation failed";
				}
			}

			// Zod schema validation
			if (!errorMessage && rules?.schema) {
				const result = await rules.schema.safeParseAsync(val);
				if (!result.success) {
					errorMessage = result.error.errors[0]?.message || "Validation failed";
				}
			}

			setError(errorMessage);
			return !errorMessage;
		} catch (err) {
			setError("Validation error occurred");
			return false;
		}
	};

	const handleChange = (newValue: T) => {
		setValue(newValue);
		setDirty(true);
		if (touched()) {
			validate(newValue);
		}
	};

	const handleBlur = () => {
		setTouched(true);
		validate();
	};

	const reset = () => {
		setValue(initialValue as T);
		setError(undefined);
		setTouched(false);
		setDirty(false);
	};

	return {
		value,
		setValue: handleChange,
		error,
		setError,
		touched,
		setTouched,
		dirty,
		valid,
		validate,
		handleChange,
		handleBlur,
		reset,
		fieldState: createMemo(() => ({
			value: value(),
			error: error(),
			touched: touched(),
			dirty: dirty(),
			valid: valid(),
		})),
	};
}

// Main form validation hook
export function useForm<T extends Record<string, any>>(options: {
	initialValues: T;
	validationSchema?: z.ZodSchema<T>;
	fieldRules?: Partial<Record<keyof T, ValidationRule>>;
	onSubmit?: (values: T) => Promise<void> | void;
	validateOnChange?: boolean;
	validateOnBlur?: boolean;
}) {
	const {
		initialValues,
		validationSchema,
		fieldRules = {},
		onSubmit,
		validateOnChange = true,
		validateOnBlur = true,
	} = options;

	// Form state signals
	const [values, setValues] = createSignal<T>(initialValues);
	const [errors, setErrors] = createSignal<Partial<Record<keyof T, string>>>({});
	const [touched, setTouched] = createSignal<Partial<Record<keyof T, boolean>>>({});
	const [dirty, setDirty] = createSignal<Partial<Record<keyof T, boolean>>>({});
	const [submitting, setSubmitting] = createSignal(false);
	const [submitted, setSubmitted] = createSignal(false);

	// Computed state
	const valid = createMemo(() => Object.keys(errors()).length === 0);
	const hasErrors = createMemo(() => !valid());

	// Combined form state
	const state = createMemo((): FormState<T> => ({
		values: values(),
		errors: errors(),
		touched: touched(),
		dirty: dirty(),
		valid: valid(),
		submitting: submitting(),
		submitted: submitted(),
	}));

	// Get individual field state
	const getFieldState = <K extends keyof T>(name: K): FieldState<T[K]> => {
		const currentValues = values();
		const currentErrors = errors();
		const currentTouched = touched();
		const currentDirty = dirty();

		return {
			value: currentValues[name],
			error: currentErrors[name],
			touched: !!currentTouched[name],
			dirty: !!currentDirty[name],
			valid: !currentErrors[name],
		};
	};

	// Set field value
	const setFieldValue = <K extends keyof T>(name: K, value: T[K]) => {
		setValues(prev => ({ ...prev, [name]: value }));
		setDirty(prev => ({ ...prev, [name]: true }));

		if (validateOnChange) {
			validateField(name);
		}
	};

	// Set field error
	const setFieldError = <K extends keyof T>(name: K, error: string | undefined) => {
		setErrors(prev => {
			if (error) {
				return { ...prev, [name]: error };
			} else {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			}
		});
	};

	// Set field touched
	const setFieldTouched = <K extends keyof T>(name: K, isTouched: boolean) => {
		setTouched(prev => ({ ...prev, [name]: isTouched }));

		if (isTouched && validateOnBlur) {
			validateField(name);
		}
	};

	// Validate individual field
	const validateField = async <K extends keyof T>(name: K): Promise<boolean> => {
		const currentValues = values();
		const fieldValue = currentValues[name];
		let errorMessage: string | undefined;

		try {
			// Use field-specific rules if available
			const rules = fieldRules[name];
			if (rules) {
				// Required validation
				if (rules.required && (!fieldValue || fieldValue === "")) {
					errorMessage = typeof rules.required === "string" ? rules.required : "This field is required";
				}

				// Min/Max validation
				if (!errorMessage && rules.min !== undefined) {
					if (typeof fieldValue === "number" && fieldValue < rules.min) {
						errorMessage = typeof rules.min === "string" ? rules.min : `Minimum value is ${rules.min}`;
					} else if (typeof fieldValue === "string" && fieldValue.length < rules.min) {
						errorMessage = typeof rules.min === "string" ? rules.min : `Minimum length is ${rules.min}`;
					}
				}

				if (!errorMessage && rules.max !== undefined) {
					if (typeof fieldValue === "number" && fieldValue > rules.max) {
						errorMessage = typeof rules.max === "string" ? rules.max : `Maximum value is ${rules.max}`;
					} else if (typeof fieldValue === "string" && fieldValue.length > rules.max) {
						errorMessage = typeof rules.max === "string" ? rules.max : `Maximum length is ${rules.max}`;
					}
				}

				// Pattern validation
				if (!errorMessage && rules.pattern && typeof fieldValue === "string") {
					const pattern = typeof rules.pattern === "string" ? new RegExp(rules.pattern) : rules.pattern;
					if (!pattern.test(fieldValue)) {
						errorMessage = "Invalid format";
					}
				}

				// Custom validation
				if (!errorMessage && rules.custom) {
					const customResult = rules.custom(fieldValue);
					if (typeof customResult === "string") {
						errorMessage = customResult;
					} else if (!customResult) {
						errorMessage = "Validation failed";
					}
				}

				// Field-specific Zod schema
				if (!errorMessage && rules.schema) {
					const result = await rules.schema.safeParseAsync(fieldValue);
					if (!result.success) {
						errorMessage = result.error.errors[0]?.message || "Validation failed";
					}
				}
			}

			// Form-level schema validation for this field
			if (!errorMessage && validationSchema) {
				const result = await validationSchema.safeParseAsync(currentValues);
				if (!result.success) {
					const fieldError = result.error.errors.find(err => err.path.includes(name as string));
					if (fieldError) {
						errorMessage = fieldError.message;
					}
				}
			}

			setFieldError(name, errorMessage);
			return !errorMessage;
		} catch (err) {
			setFieldError(name, "Validation error occurred");
			return false;
		}
	};

	// Validate entire form
	const validateForm = async (): Promise<boolean> => {
		const currentValues = values();
		let formValid = true;

		try {
			// Clear existing errors
			setErrors({});

			// Validate with schema if available
			if (validationSchema) {
				const result = await validationSchema.safeParseAsync(currentValues);
				if (!result.success) {
					const newErrors: Partial<Record<keyof T, string>> = {};
					result.error.errors.forEach(err => {
						if (err.path.length > 0) {
							const fieldName = err.path[0] as keyof T;
							newErrors[fieldName] = err.message;
						}
					});
					setErrors(newErrors);
					formValid = Object.keys(newErrors).length === 0;
				}
			} else {
				// Validate individual fields with their rules
				const fieldNames = Object.keys(currentValues) as (keyof T)[];
				const validationPromises = fieldNames.map(name => validateField(name));
				const results = await Promise.all(validationPromises);
				formValid = results.every(Boolean);
			}

			return formValid;
		} catch (err) {
			return false;
		}
	};

	// Reset form
	const resetForm = () => {
		setValues(initialValues);
		setErrors({});
		setTouched({});
		setDirty({});
		setSubmitting(false);
		setSubmitted(false);
	};

	// Reset individual field
	const resetField = <K extends keyof T>(name: K) => {
		setValues(prev => ({ ...prev, [name]: initialValues[name] }));
		setFieldError(name, undefined);
		setTouched(prev => ({ ...prev, [name]: false }));
		setDirty(prev => ({ ...prev, [name]: false }));
	};

	// Submit form
	const submitForm = async () => {
		if (submitting()) return;

		setSubmitting(true);
		setSubmitted(true);

		try {
			const isValid = await validateForm();
			if (isValid && onSubmit) {
				await onSubmit(values());
			}
		} catch (err) {
			console.error("Form submission error:", err);
		} finally {
			setSubmitting(false);
		}
	};

	// Context value
	const contextValue: FormValidationContextValue<T> = {
		state,
		getFieldState,
		setFieldValue,
		setFieldError,
		setFieldTouched,
		validateField,
		validateForm,
		resetForm,
		resetField,
		submitForm,
		isSubmitting: submitting,
		hasErrors,
	};

	return {
		...contextValue,
		// Additional direct access
		values,
		errors,
		touched,
		dirty,
		valid,
		submitting,
		submitted,
	};
}

// Form validation provider component
interface FormValidationProviderProps<T extends Record<string, any>> {
	children: JSX.Element;
	form: ReturnType<typeof useForm<T>>;
}

export function FormValidationProvider<T extends Record<string, any>>(
	props: FormValidationProviderProps<T>
) {
	const [local, rest] = splitProps(props, ["children", "form"]);

	return (
		<FormValidationContext.Provider value={local.form}>
			{local.children}
		</FormValidationContext.Provider>
	);
}

// Enhanced Form Field component with validation
interface ValidatedFormFieldProps<T = any> extends ComponentProps<"div"> {
	name: string;
	label?: string;
	rules?: ValidationRule<T>;
	children: (fieldProps: {
		value: T;
		onChange: (value: T) => void;
		onBlur: () => void;
		error: string | undefined;
		touched: boolean;
		dirty: boolean;
		valid: boolean;
		id: string;
		name: string;
		"aria-invalid": boolean;
		"aria-describedby": string;
	}) => JSX.Element;
	class?: string;
}

export function ValidatedFormField<T = any>(props: ValidatedFormFieldProps<T>) {
	const [local, rest] = splitProps(props, ["name", "label", "rules", "children", "class"]);
	const form = useFormValidation();
	const fieldId = createUniqueId();
	const errorId = `${fieldId}-error`;
	const descriptionId = `${fieldId}-description`;

	const fieldState = createMemo(() => form.getFieldState(local.name));

	const fieldProps = createMemo(() => ({
		value: fieldState().value,
		onChange: (value: T) => form.setFieldValue(local.name, value),
		onBlur: () => form.setFieldTouched(local.name, true),
		error: fieldState().error,
		touched: fieldState().touched,
		dirty: fieldState().dirty,
		valid: fieldState().valid,
		id: fieldId,
		name: local.name,
		"aria-invalid": !!fieldState().error,
		"aria-describedby": fieldState().error ? errorId : descriptionId,
	}));

	return (
		<div class={local.class} {...rest}>
			{local.label && (
				<label for={fieldId} class="block text-sm font-medium mb-1">
					{local.label}
				</label>
			)}
			{local.children(fieldProps())}
			{fieldState().error && (
				<p id={errorId} class="mt-1 text-sm text-destructive" role="alert">
					{fieldState().error}
				</p>
			)}
		</div>
	);
}

// Common validation schemas using Zod
export const commonSchemas = {
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	strongPassword: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
	phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
	url: z.string().url("Please enter a valid URL"),
	positiveNumber: z.number().positive("Must be a positive number"),
	nonEmptyString: z.string().min(1, "This field is required"),
	zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
	creditCard: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Please enter a valid credit card number"),
};

// Utility functions for validation
export const validationUtils = {
	// Create a schema for confirming passwords match
	confirmPassword: (passwordField: string = "password") =>
		z.object({
			[passwordField]: z.string(),
			confirmPassword: z.string(),
		}).refine(
			(data) => data[passwordField as keyof typeof data] === data.confirmPassword,
			{
				message: "Passwords don't match",
				path: ["confirmPassword"],
			}
		),

	// Create a conditional required field
	conditionalRequired: <T>(condition: (data: any) => boolean, schema: z.ZodSchema<T>) =>
		z.union([
			z.literal("").transform(() => undefined),
			schema,
		]).refine((data) => {
			// This would need to be implemented with context from the form
			return true; // Simplified for now
		}),

	// Age validation
	ageRange: (min: number, max: number) =>
		z.number()
			.min(min, `Age must be at least ${min}`)
			.max(max, `Age must be no more than ${max}`),

	// Date validation
	dateRange: (start?: Date, end?: Date) => {
		let schema = z.date();
		if (start) schema = schema.min(start, `Date must be after ${start.toLocaleDateString()}`);
		if (end) schema = schema.max(end, `Date must be before ${end.toLocaleDateString()}`);
		return schema;
	},

	// File validation
	fileSize: (maxSizeInMB: number) =>
		z.instanceof(File).refine(
			(file) => file.size <= maxSizeInMB * 1024 * 1024,
			`File size must be less than ${maxSizeInMB}MB`
		),

	fileType: (allowedTypes: string[]) =>
		z.instanceof(File).refine(
			(file) => allowedTypes.includes(file.type),
			`File type must be one of: ${allowedTypes.join(", ")}`
		),
};

// Export commonly used types
export type { FieldState, FormState, ValidationRule };
export { z };