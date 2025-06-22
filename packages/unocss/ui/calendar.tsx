import { cn } from "@/libs/cn";
import * as Calendar from "@corvu/calendar";
import type { VariantProps } from "class-variance-authority";
import { type ComponentProps, type VoidComponent, splitProps } from "solid-js";
import { Button, type buttonVariants } from "./button";

export interface CalendarProps extends ComponentProps<typeof Calendar.Root> {
	class?: string;
	buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
	showOutsideDays?: boolean;
}

export function CalendarComponent(props: CalendarProps) {
	const [local, rest] = splitProps(props, [
		"class",
		"buttonVariant",
		"showOutsideDays",
	]);

	return (
		<Calendar.Root
			data-slot="calendar"
			class={cn(
				"bg-background text-foreground border border-border p-3 w-fit rounded-lg shadow-md group/calendar",
				"[--cell-size:theme(spacing.8)]",
				local.class,
			)}
			showOutsideDays={local.showOutsideDays ?? true}
			{...rest}
		>
			<CalendarNav buttonVariant={local.buttonVariant} />
			<Calendar.Label class="sr-only" />
			<CalendarTable />
		</Calendar.Root>
	);
}

interface CalendarNavProps {
	buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
}

function CalendarNav(props: CalendarNavProps) {
	return (
		<Calendar.Nav class="flex items-center justify-between p-2">
			<Calendar.PrevButton
				as={Button}
				variant={props.buttonVariant ?? "ghost"}
				size="sm"
				class={cn(
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
					"data-[disabled]:(pointer-events-none opacity-30)",
				)}
			>
				<ChevronLeft class="h-4 w-4" />
				<span class="sr-only">Previous month</span>
			</Calendar.PrevButton>

			<Calendar.Heading class="text-sm font-medium" />

			<Calendar.NextButton
				as={Button}
				variant={props.buttonVariant ?? "ghost"}
				size="sm"
				class={cn(
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
					"data-[disabled]:(pointer-events-none opacity-30)",
				)}
			>
				<ChevronRight class="h-4 w-4" />
				<span class="sr-only">Next month</span>
			</Calendar.NextButton>
		</Calendar.Nav>
	);
}

function CalendarTable() {
	return (
		<Calendar.Table class="w-full border-collapse space-y-1">
			<Calendar.TableHead>
				<Calendar.TableRow class="flex">
					<Calendar.HeadCell class="text-muted-foreground w-8 font-normal text-0.8rem">
						Mo
					</Calendar.HeadCell>
					<Calendar.HeadCell class="text-muted-foreground w-8 font-normal text-0.8rem">
						Tu
					</Calendar.HeadCell>
					<Calendar.HeadCell class="text-muted-foreground w-8 font-normal text-0.8rem">
						We
					</Calendar.HeadCell>
					<Calendar.HeadCell class="text-muted-foreground w-8 font-normal text-0.8rem">
						Th
					</Calendar.HeadCell>
					<Calendar.HeadCell class="text-muted-foreground w-8 font-normal text-0.8rem">
						Fr
					</Calendar.HeadCell>
					<Calendar.HeadCell class="text-muted-foreground w-8 font-normal text-0.8rem">
						Sa
					</Calendar.HeadCell>
					<Calendar.HeadCell class="text-muted-foreground w-8 font-normal text-0.8rem">
						Su
					</Calendar.HeadCell>
				</Calendar.TableRow>
			</Calendar.TableHead>
			<Calendar.TableBody>
				<Calendar.Week>
					{(week) => (
						<Calendar.TableRow class="flex w-full mt-2">
							{week().map((date) => (
								<Calendar.Cell class="relative p-0 text-center text-sm focus-within:(relative z-20)">
									<CalendarDayButton date={date} />
								</Calendar.Cell>
							))}
						</Calendar.TableRow>
					)}
				</Calendar.Week>
			</Calendar.TableBody>
		</Calendar.Table>
	);
}

interface CalendarDayButtonProps {
	date: Date;
}

function CalendarDayButton(props: CalendarDayButtonProps) {
	return (
		<Calendar.CellTrigger
			as={Button}
			variant="ghost"
			size="sm"
			date={props.date}
			class={cn(
				"h-8 w-8 p-0 font-normal",
				// Base hover styles
				"hover:(bg-accent text-accent-foreground)",
				// Selected single date
				"data-[selected=single]:(bg-primary text-primary-foreground) data-[selected=single]:hover:(bg-primary text-primary-foreground) data-[selected=single]:focus:(bg-primary text-primary-foreground)",
				// Range selection states
				"data-[selected=range]:(bg-accent text-accent-foreground)",
				"data-[selected=range-start]:(bg-primary text-primary-foreground) data-[selected=range-start]:hover:(bg-primary text-primary-foreground) data-[selected=range-start]:focus:(bg-primary text-primary-foreground)",
				"data-[selected=range-end]:(bg-primary text-primary-foreground) data-[selected=range-end]:hover:(bg-primary text-primary-foreground) data-[selected=range-end]:focus:(bg-primary text-primary-foreground)",
				"data-[selected=range-middle]:(bg-accent text-accent-foreground) data-[selected=range-middle]:hover:(bg-accent text-accent-foreground) data-[selected=range-middle]:focus:(bg-accent text-accent-foreground)",
				// Today
				"data-[today]:(bg-accent text-accent-foreground)",
				// Outside month
				"data-[outside-month]:(text-muted-foreground opacity-50) data-[outside-month]:hover:(bg-accent text-muted-foreground opacity-100)",
				// Disabled
				"data-[disabled]:(text-muted-foreground opacity-50 pointer-events-none)",
				// Focus styles
				"focus-visible:(outline-none ring-2 ring-ring ring-offset-2)",
			)}
		>
			{props.date.getDate()}
		</Calendar.CellTrigger>
	);
}

// Icon components for navigation
const ChevronLeft: VoidComponent<ComponentProps<"svg">> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		{...props}
	>
		<path d="m15 18-6-6 6-6" />
	</svg>
);

const ChevronRight: VoidComponent<ComponentProps<"svg">> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		{...props}
	>
		<path d="m9 18 6-6-6-6" />
	</svg>
);

// Export the main component as Calendar
export { CalendarComponent as Calendar };
