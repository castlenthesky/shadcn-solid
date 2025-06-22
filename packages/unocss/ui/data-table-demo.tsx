import { Badge } from "@/libs/ui/badge";
import { Checkbox } from "@/libs/ui/checkbox";
import { DataTable, DataTableColumnHeader } from "@/libs/ui/data-table";
import type { ColumnDef } from "@tanstack/solid-table";
import { createSignal } from "solid-js";

// Example data type
interface Task {
	id: string;
	title: string;
	status: "todo" | "in-progress" | "done" | "cancelled";
	priority: "low" | "medium" | "high";
}

// Demo columns configuration
const createColumns = (): ColumnDef<Task>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				indeterminate={table.getIsSomePageRowsSelected()}
				onChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Task ID" />
		),
		cell: ({ row }) => <div class="w-[80px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Title" />
		),
		cell: ({ row }) => {
			return (
				<div class="flex space-x-2">
					<span class="max-w-[500px] truncate font-medium">
						{row.getValue("title")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			return (
				<div class="flex w-[100px] items-center">
					<Badge
						variant={
							status === "done"
								? "default"
								: status === "in-progress"
									? "secondary"
									: status === "todo"
										? "outline"
										: "destructive"
						}
					>
						{status}
					</Badge>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "priority",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Priority" />
		),
		cell: ({ row }) => {
			const priority = row.getValue("priority") as string;
			return (
				<div class="flex items-center">
					<Badge
						variant={
							priority === "high"
								? "destructive"
								: priority === "medium"
									? "default"
									: "secondary"
						}
					>
						{priority}
					</Badge>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
];

// Demo data
const demoTasks: Task[] = [
	{
		id: "TASK-8782",
		title:
			"You can't compress the program without quantifying the open-source SSD pixel!",
		status: "in-progress",
		priority: "medium",
	},
	{
		id: "TASK-7878",
		title:
			"Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
		status: "cancelled",
		priority: "high",
	},
	{
		id: "TASK-7839",
		title: "We need to bypass the neural TCP card!",
		status: "todo",
		priority: "high",
	},
	{
		id: "TASK-5562",
		title:
			"The SAS interface is down, compress the multi-byte sensor so we can generate the SAS pixel!",
		status: "cancelled",
		priority: "medium",
	},
	{
		id: "TASK-8686",
		title:
			"I'll parse the wireless SSL protocol, that should driver the API panel!",
		status: "cancelled",
		priority: "low",
	},
	{
		id: "TASK-1280",
		title:
			"Use the digital TLS panel, then you can transmit the haptic system!",
		status: "done",
		priority: "high",
	},
	{
		id: "TASK-7262",
		title:
			"The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
		status: "done",
		priority: "high",
	},
	{
		id: "TASK-1138",
		title:
			"Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
		status: "in-progress",
		priority: "medium",
	},
	{
		id: "TASK-7184",
		title: "We need to program the back-end THX pixel!",
		status: "todo",
		priority: "low",
	},
	{
		id: "TASK-5160",
		title:
			"Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
		status: "in-progress",
		priority: "high",
	},
];

export function DataTableDemo() {
	const [data] = createSignal(demoTasks);
	const [columns] = createSignal(createColumns());

	return (
		<div class="container mx-auto py-10">
			<DataTable columns={columns()} data={data()} />
		</div>
	);
}
