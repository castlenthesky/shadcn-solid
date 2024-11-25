import type { TooltipTriggerProps } from "@kobalte/core/tooltip";
import { Button } from "@repo/tailwindcss/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@repo/tailwindcss/ui/tooltip";

const TooltipDemo = () => {
	return (
		<Tooltip>
			<TooltipTrigger
				as={(props: TooltipTriggerProps) => (
					<Button variant="outline" {...props}>
						Hover
					</Button>
				)}
			/>
			<TooltipContent>
				<p>Add to library</p>
			</TooltipContent>
		</Tooltip>
	);
};

export default TooltipDemo;
