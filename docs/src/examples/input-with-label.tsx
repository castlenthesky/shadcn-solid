import { Label } from "@repo/tailwindcss/ui/label";
import { TextField, TextFieldInput } from "@repo/tailwindcss/ui/textfield";

const InputWithLabel = () => {
	return (
		<div class="grid w-full max-w-sm items-center gap-3">
			<Label for="email">Email</Label>
			<TextField>
				<TextFieldInput type="email" id="email" placeholder="Email" />
			</TextField>
		</div>
	);
};

export default InputWithLabel;
