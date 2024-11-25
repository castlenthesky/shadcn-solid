import {
	RadioGroup,
	RadioGroupItem,
	RadioGroupItemControl,
	RadioGroupItemLabel,
} from "@repo/tailwindcss/ui/radio-group";
import { For } from "solid-js";

const RadioGroupDemo = () => {
	return (
		<RadioGroup defaultValue="Orange" class="grid gap-2">
			<For each={["Apple", "Orange", "Watermelon"]}>
				{(fruit) => (
					<RadioGroupItem value={fruit} class="flex items-center gap-2">
						<RadioGroupItemControl />
						<RadioGroupItemLabel class="text-sm">{fruit}</RadioGroupItemLabel>
					</RadioGroupItem>
				)}
			</For>
		</RadioGroup>
	);
};

export default RadioGroupDemo;
