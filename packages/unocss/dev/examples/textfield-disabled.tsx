import { TextField, TextFieldRoot } from "../../ui/textfield";

const TextFieldDisabled = () => {
	return (
		<TextFieldRoot disabled class="w-full max-w-xs">
			<TextField type="email" placeholder="Email" />
		</TextFieldRoot>
	);
};

export default TextFieldDisabled;
