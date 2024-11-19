import { TextField, TextFieldRoot } from "@repo/tailwindcss/ui/textfield";

const TextFieldDisabled = () => {
	return (
		<TextFieldRoot disabled class="w-full max-w-xs">
			<TextField type="email" placeholder="Email" />
		</TextFieldRoot>
	);
};

export default TextFieldDisabled;
