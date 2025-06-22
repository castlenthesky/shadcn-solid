import { Button } from "@repo/tailwindcss/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@repo/tailwindcss/ui/form";
import { TextField, TextFieldInput } from "@repo/tailwindcss/ui/textfield";
import { createSignal } from "solid-js";

const FormDemo = () => {
	const [username, setUsername] = createSignal("");
	const [email, setEmail] = createSignal("");
	const [usernameError, setUsernameError] = createSignal<string>();
	const [emailError, setEmailError] = createSignal<string>();

	const validateUsername = (value: string) => {
		if (value.length < 2) {
			setUsernameError("Username must be at least 2 characters.");
			return false;
		}
		setUsernameError(undefined);
		return true;
	};

	const validateEmail = (value: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			setEmailError("Please enter a valid email address.");
			return false;
		}
		setEmailError(undefined);
		return true;
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();

		const isUsernameValid = validateUsername(username());
		const isEmailValid = validateEmail(email());

		if (isUsernameValid && isEmailValid) {
			console.log("Form submitted:", { username: username(), email: email() });
		}
	};

	return (
		<Form onSubmit={handleSubmit} class="w-full max-w-sm space-y-6">
			<FormField name="username" error={usernameError}>
				<FormItem>
					<FormLabel>Username</FormLabel>
					<FormControl>
						<TextField>
							<TextFieldInput
								placeholder="shadcn"
								value={username()}
								onInput={(e) => {
									const value = e.currentTarget.value;
									setUsername(value);
									if (value) validateUsername(value);
								}}
								onBlur={() => validateUsername(username())}
							/>
						</TextField>
					</FormControl>
					<FormDescription>This is your public display name.</FormDescription>
					<FormMessage />
				</FormItem>
			</FormField>

			<FormField name="email" error={emailError}>
				<FormItem>
					<FormLabel>Email</FormLabel>
					<FormControl>
						<TextField>
							<TextFieldInput
								type="email"
								placeholder="you@example.com"
								value={email()}
								onInput={(e) => {
									const value = e.currentTarget.value;
									setEmail(value);
									if (value) validateEmail(value);
								}}
								onBlur={() => validateEmail(email())}
							/>
						</TextField>
					</FormControl>
					<FormDescription>
						We'll never share your email with anyone else.
					</FormDescription>
					<FormMessage />
				</FormItem>
			</FormField>

			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default FormDemo;
