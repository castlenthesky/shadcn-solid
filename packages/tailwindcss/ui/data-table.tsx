import { cn } from "@/libs/cn";
import { Button } from "@/libs/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/libs/ui/dropdown-menu";
import { Input } from "@/libs/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/libs/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/libs/ui/table";
import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type Table as TanStackTable,
	type VisibilityState,
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/solid-table";
import type { Accessor, Component, ComponentProps, JSX } from "solid-js";
import { For, Show, createMemo, createSignal, splitProps } from "solid-js";

// Main DataTable component
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	class?: string;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
	const [local, rest] = splitProps(props, ["columns", "data", "class"]);

	const [rowSelection, setRowSelection] = createSignal({});
	const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>(
		{},
	);
	const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
		[],
	);
	const [sorting, setSorting] = createSignal<SortingState>([]);

	const table = createSolidTable({
		get data() {
			return local.data;
		},
		get columns() {
			return local.columns;
		},
		state: {
			get sorting() {
				return sorting();
			},
			get columnVisibility() {
				return columnVisibility();
			},
			get rowSelection() {
				return rowSelection();
			},
			get columnFilters() {
				return columnFilters();
			},
		},
		initialState: {
			pagination: {
				pageSize: 25,
			},
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div class={cn("flex flex-col gap-4", local.class)} {...rest}>
			<DataTableToolbar table={table} />
			<div class="rounded-md border" data-slot="data-table-container">
				<Table>
					<TableHeader>
						<For each={table.getHeaderGroups()}>
							{(headerGroup) => (
								<TableRow>
									<For each={headerGroup.headers}>
										{(header) => (
											<TableHead colSpan={header.colSpan}>
												<Show when={!header.isPlaceholder}>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
												</Show>
											</TableHead>
										)}
									</For>
								</TableRow>
							)}
						</For>
					</TableHeader>
					<TableBody>
						<Show
							when={table.getRowModel().rows?.length}
							fallback={
								<TableRow>
									<TableCell
										colSpan={local.columns.length}
										class="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							}
						>
							<For each={table.getRowModel().rows}>
								{(row) => (
									<TableRow
										data-state={row.getIsSelected() ? "selected" : undefined}
									>
										<For each={row.getVisibleCells()}>
											{(cell) => (
												<TableCell>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											)}
										</For>
									</TableRow>
								)}
							</For>
						</Show>
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}

// DataTable Pagination Component
interface DataTablePaginationProps<TData> {
	table: TanStackTable<TData>;
	class?: string;
}

export function DataTablePagination<TData>(
	props: DataTablePaginationProps<TData>,
) {
	const [local, rest] = splitProps(props, ["table", "class"]);

	return (
		<div
			class={cn("flex items-center justify-between px-2", local.class)}
			data-slot="data-table-pagination"
			{...rest}
		>
			<div class="text-muted-foreground flex-1 text-sm">
				{local.table.getFilteredSelectedRowModel().rows.length} of{" "}
				{local.table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
			<div class="flex items-center space-x-6 lg:space-x-8">
				<div class="flex items-center space-x-2">
					<p class="text-sm font-medium">Rows per page</p>
					<Select
						value={`${local.table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							local.table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger class="h-8 w-[70px]">
							<SelectValue
								placeholder={local.table.getState().pagination.pageSize}
							/>
						</SelectTrigger>
						<SelectContent side="top">
							<For each={[10, 20, 25, 30, 40, 50]}>
								{(pageSize) => (
									<SelectItem value={`${pageSize}`}>{pageSize}</SelectItem>
								)}
							</For>
						</SelectContent>
					</Select>
				</div>
				<div class="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {local.table.getState().pagination.pageIndex + 1} of{" "}
					{local.table.getPageCount()}
				</div>
				<div class="flex items-center space-x-2">
					<Button
						variant="outline"
						size="icon"
						class="hidden size-8 lg:flex"
						onClick={() => local.table.setPageIndex(0)}
						disabled={!local.table.getCanPreviousPage()}
					>
						<span class="sr-only">Go to first page</span>
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
							class="size-4"
						>
							<path d="m11 17-5-5 5-5" />
							<path d="m18 17-5-5 5-5" />
						</svg>
					</Button>
					<Button
						variant="outline"
						size="icon"
						class="size-8"
						onClick={() => local.table.previousPage()}
						disabled={!local.table.getCanPreviousPage()}
					>
						<span class="sr-only">Go to previous page</span>
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
							class="size-4"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
					</Button>
					<Button
						variant="outline"
						size="icon"
						class="size-8"
						onClick={() => local.table.nextPage()}
						disabled={!local.table.getCanNextPage()}
					>
						<span class="sr-only">Go to next page</span>
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
							class="size-4"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</Button>
					<Button
						variant="outline"
						size="icon"
						class="hidden size-8 lg:flex"
						onClick={() =>
							local.table.setPageIndex(local.table.getPageCount() - 1)
						}
						disabled={!local.table.getCanNextPage()}
					>
						<span class="sr-only">Go to last page</span>
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
							class="size-4"
						>
							<path d="m7 17 5-5-5-5" />
							<path d="m13 17 5-5-5-5" />
						</svg>
					</Button>
				</div>
			</div>
		</div>
	);
}

// DataTable Toolbar Component
interface DataTableToolbarProps<TData> {
	table: TanStackTable<TData>;
	class?: string;
}

export function DataTableToolbar<TData>(props: DataTableToolbarProps<TData>) {
	const [local, rest] = splitProps(props, ["table", "class"]);

	const isFiltered = createMemo(
		() => local.table.getState().columnFilters.length > 0,
	);

	return (
		<div
			class={cn("flex items-center justify-between", local.class)}
			data-slot="data-table-toolbar"
			{...rest}
		>
			<div class="flex flex-1 items-center gap-2">
				<Input
					placeholder="Filter..."
					value={
						(local.table.getColumn("title")?.getFilterValue() as string) ?? ""
					}
					onInput={(e) =>
						local.table
							.getColumn("title")
							?.setFilterValue(e.currentTarget.value)
					}
					class="h-8 w-[150px] lg:w-[250px]"
				/>
				<Show when={isFiltered()}>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => local.table.resetColumnFilters()}
					>
						Reset
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
							class="ml-2 size-4"
						>
							<path d="M18 6L6 18" />
							<path d="M6 6l12 12" />
						</svg>
					</Button>
				</Show>
			</div>
			<div class="flex items-center gap-2">
				<DataTableViewOptions table={local.table} />
			</div>
		</div>
	);
}

// DataTable View Options Component
interface DataTableViewOptionsProps<TData> {
	table: TanStackTable<TData>;
	class?: string;
}

export function DataTableViewOptions<TData>(
	props: DataTableViewOptionsProps<TData>,
) {
	const [local, rest] = splitProps(props, ["table", "class"]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					class={cn("ml-auto hidden h-8 lg:flex", local.class)}
					data-slot="data-table-view-options"
					{...rest}
				>
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
						class="mr-2 size-4"
					>
						<path d="M3 6h18" />
						<path d="M7 12h10" />
						<path d="M10 18h4" />
					</svg>
					View
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" class="w-[150px]">
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<For
					each={local.table
						.getAllColumns()
						.filter(
							(column) =>
								typeof column.accessorFn !== "undefined" && column.getCanHide(),
						)}
				>
					{(column) => (
						<DropdownMenuCheckboxItem
							class="capitalize"
							checked={column.getIsVisible()}
							onCheckedChange={(value) => column.toggleVisibility(!!value)}
						>
							{column.id}
						</DropdownMenuCheckboxItem>
					)}
				</For>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// DataTable Column Header Component
interface DataTableColumnHeaderProps<TData, TValue>
	extends ComponentProps<"div"> {
	column: import("@tanstack/solid-table").Column<TData, TValue>;
	title: string;
	class?: string;
}

export function DataTableColumnHeader<TData, TValue>(
	props: DataTableColumnHeaderProps<TData, TValue>,
) {
	const [local, rest] = splitProps(props, ["column", "title", "class"]);

	const canSort = () => local.column.getCanSort();
	const sortDirection = () => local.column.getIsSorted();

	return (
		<Show
			when={canSort()}
			fallback={<div class={cn(local.class)}>{local.title}</div>}
		>
			<div class={cn("flex items-center gap-2", local.class)} {...rest}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							class="data-[state=open]:bg-accent -ml-3 h-8"
							data-slot="data-table-column-header"
						>
							<span>{local.title}</span>
							<Show
								when={sortDirection() === "desc"}
								fallback={
									<Show
										when={sortDirection() === "asc"}
										fallback={
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
												class="size-4"
											>
												<path d="m7 15 5 5 5-5" />
												<path d="m7 9 5-5 5 5" />
											</svg>
										}
									>
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
											class="size-4"
										>
											<path d="m21 16-4 4-4-4" />
											<path d="M17 20V4" />
										</svg>
									</Show>
								}
							>
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
									class="size-4"
								>
									<path d="m3 16 4 4 4-4" />
									<path d="M7 20V4" />
								</svg>
							</Show>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem onClick={() => local.column.toggleSorting(false)}>
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
								class="mr-2 size-4"
							>
								<path d="m21 16-4 4-4-4" />
								<path d="M17 20V4" />
							</svg>
							Asc
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => local.column.toggleSorting(true)}>
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
								class="mr-2 size-4"
							>
								<path d="m3 16 4 4 4-4" />
								<path d="M7 20V4" />
							</svg>
							Desc
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => local.column.toggleVisibility(false)}
						>
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
								class="mr-2 size-4"
							>
								<path d="m9.88 9.88a3 3 0 1 0 4.24 4.24" />
								<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
								<path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
								<line x1="2" x2="22" y1="2" y2="22" />
							</svg>
							Hide
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</Show>
	);
}
