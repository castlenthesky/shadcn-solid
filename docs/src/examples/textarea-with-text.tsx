import { TextArea } from "@repo/tailwindcss/ui/textarea";
import {
	TextFieldDescription,
	TextFieldLabel,
	TextFieldRoot,
} from "@repo/tailwindcss/ui/textfield";

const TextareaWithText = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs">
			<TextFieldLabel>Your message</TextFieldLabel>
			<TextArea placeholder="Type your message here." />
			<TextFieldDescription>Enter your email address.</TextFieldDescription>
		</TextFieldRoot>
	);
};

export default TextareaWithText;
