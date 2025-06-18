import { cn } from "@/libs/cn";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { Button } from "./button";

// Consider using the corvu/calendar package to finish implementation

// TODO: Implement full calendar functionality to match React version
// Outstanding items:
// • Core calendar rendering with date grid
// • Month/year navigation (previous/next buttons)
// • Month/year dropdown selectors
// • Weekday headers
// • Day selection logic (single and range)
// • Outside days handling
// • Week numbers support
// • Keyboard navigation and focus management
// • Accessibility features (ARIA attributes, screen reader support)
// • RTL support
// • Localization and date formatting
// • Custom components (Chevron, WeekNumber, DayButton)
// • Range selection with visual indicators
// • Today highlighting
// • Disabled dates support
// • Formatters for month/year display
// • Integration with a proper day picker library for SolidJS

// Note: This is a simplified calendar implementation since there's no direct SolidJS equivalent to react-day-picker
// The React version uses react-day-picker with extensive customization
// For now, we'll create a basic calendar structure that matches the styling and API

export const Calendar = (
	props: ComponentProps<"div"> & {
		class?: string;
		classNames?: Record<string, string>;
		showOutsideDays?: boolean;
		captionLayout?: "label" | "dropdown";
		buttonVariant?: ComponentProps<typeof Button>["variant"];
		formatters?: Record<string, unknown>;
		components?: Record<string, unknown>;
	},
) => {
	const [local, rest] = splitProps(props, [
		"class",
		"classNames",
		"showOutsideDays",
		"captionLayout",
		"buttonVariant",
		"formatters",
		"components",
	]);

	return (
		<div
			data-slot="calendar"
			class={cn(
				"bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
				local.class,
			)}
			{...rest}
		>
			{/* Calendar content would go here */}
			{/* This is a placeholder since we need a proper day picker library for SolidJS */}
			<div class="text-center text-muted-foreground p-4">
				Calendar component requires a day picker library for SolidJS
			</div>
		</div>
	);
};

export const CalendarDayButton = (
	props: ComponentProps<typeof Button> & {
		day?: Date;
		modifiers?: Record<string, boolean>;
	},
) => {
	const [local, rest] = splitProps(props, ["class", "day", "modifiers"]);

	return (
		<Button
			variant="ghost"
			size="icon"
			data-day={local.day?.toLocaleDateString()}
			data-selected-single={
				local.modifiers?.selected &&
				!local.modifiers?.range_start &&
				!local.modifiers?.range_end &&
				!local.modifiers?.range_middle
			}
			data-range-start={local.modifiers?.range_start}
			data-range-end={local.modifiers?.range_end}
			data-range-middle={local.modifiers?.range_middle}
			class={cn(
				"data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
				local.class,
			)}
			{...rest}
		/>
	);
};
