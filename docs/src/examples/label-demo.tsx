import { Checkbox, CheckboxControl } from "@repo/tailwindcss/ui/checkbox";
import { Label } from "@repo/tailwindcss/ui/label";

const LabelDemo = () => {
	return (
		<div class="flex items-center space-x-2">
			<Checkbox>
				<CheckboxControl id="terms" />
			</Checkbox>
			<Label for="terms">Accept terms and conditions</Label>
		</div>
	);
};

export default LabelDemo;
