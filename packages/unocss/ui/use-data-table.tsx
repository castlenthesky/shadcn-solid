import {
	type ColumnDef,
	type ColumnFiltersState,
	type PaginationState,
	type SortingState,
	type TableOptions,
	type VisibilityState,
	createSolidTable,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/solid-table";
import { createMemo, createSignal } from "solid-js";

export interface UseDataTableOptions<TData> {
	data: () => TData[];
	columns: () => ColumnDef<TData>[];
	initialPageSize?: number;
	initialSorting?: SortingState;
	initialFilters?: ColumnFiltersState;
	initialColumnVisibility?: VisibilityState;
	enableRowSelection?: boolean;
	enableMultiRowSelection?: boolean;
	enableSubRowSelection?: boolean;
	onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void;
	onSortingChange?: (sorting: SortingState) => void;
	onFiltersChange?: (filters: ColumnFiltersState) => void;
	onColumnVisibilityChange?: (visibility: VisibilityState) => void;
	onPaginationChange?: (pagination: PaginationState) => void;
}

export function useDataTable<TData>(options: UseDataTableOptions<TData>) {
	// Internal state signals
	const [rowSelection, setRowSelection] = createSignal(
		{} as Record<string, boolean>,
	);
	const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>(
		options.initialColumnVisibility || {},
	);
	const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
		options.initialFilters || [],
	);
	const [sorting, setSorting] = createSignal<SortingState>(
		options.initialSorting || [],
	);
	const [pagination, setPagination] = createSignal<PaginationState>({
		pageIndex: 0,
		pageSize: options.initialPageSize || 25,
	});

	// Enhanced setters that call optional callbacks
	const handleRowSelectionChange = (value: Record<string, boolean>) => {
		setRowSelection(value);
		options.onRowSelectionChange?.(value);
	};

	const handleSortingChange = (value: SortingState) => {
		setSorting(value);
		options.onSortingChange?.(value);
	};

	const handleFiltersChange = (value: ColumnFiltersState) => {
		setColumnFilters(value);
		options.onFiltersChange?.(value);
	};

	const handleColumnVisibilityChange = (value: VisibilityState) => {
		setColumnVisibility(value);
		options.onColumnVisibilityChange?.(value);
	};

	const handlePaginationChange = (value: PaginationState) => {
		setPagination(value);
		options.onPaginationChange?.(value);
	};

	// Create the table instance
	const table = createSolidTable({
		get data() {
			return options.data();
		},
		get columns() {
			return options.columns();
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
			get pagination() {
				return pagination();
			},
		},
		enableRowSelection: options.enableRowSelection ?? true,
		enableMultiRowSelection: options.enableMultiRowSelection ?? true,
		enableSubRowSelection: options.enableSubRowSelection ?? true,
		onRowSelectionChange: handleRowSelectionChange,
		onSortingChange: handleSortingChange,
		onColumnFiltersChange: handleFiltersChange,
		onColumnVisibilityChange: handleColumnVisibilityChange,
		onPaginationChange: handlePaginationChange,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	// Computed values for easy access
	const selectedRows = createMemo(() => rowSelection());
	const selectedRowsCount = createMemo(
		() => Object.keys(rowSelection()).length,
	);
	const isAllRowsSelected = createMemo(() => table.getIsAllRowsSelected());
	const isSomeRowsSelected = createMemo(() => table.getIsSomeRowsSelected());
	const totalRows = createMemo(() => table.getFilteredRowModel().rows.length);
	const visibleRows = createMemo(() => table.getRowModel().rows);
	const pageCount = createMemo(() => table.getPageCount());
	const currentPage = createMemo(() => pagination().pageIndex + 1);
	const pageSize = createMemo(() => pagination().pageSize);
	const hasNextPage = createMemo(() => table.getCanNextPage());
	const hasPreviousPage = createMemo(() => table.getCanPreviousPage());

	// Helper functions
	const resetFilters = () => table.resetColumnFilters();
	const resetSorting = () => table.resetSorting();
	const resetSelection = () => setRowSelection({});
	const selectAllRows = () => table.toggleAllRowsSelected(true);
	const deselectAllRows = () => table.toggleAllRowsSelected(false);
	const toggleAllRows = () => table.toggleAllRowsSelected();

	const goToFirstPage = () => table.setPageIndex(0);
	const goToLastPage = () => table.setPageIndex(table.getPageCount() - 1);
	const goToNextPage = () => table.nextPage();
	const goToPreviousPage = () => table.previousPage();
	const goToPage = (pageIndex: number) => table.setPageIndex(pageIndex);
	const setPageSizeValue = (size: number) => table.setPageSize(size);

	// Global filter helper
	const setGlobalFilter = (filterValue: string) => {
		table.setGlobalFilter(filterValue);
	};

	// Column filter helpers
	const setColumnFilter = (columnId: string, filterValue: any) => {
		table.getColumn(columnId)?.setFilterValue(filterValue);
	};

	const getColumnFilter = (columnId: string) => {
		return table.getColumn(columnId)?.getFilterValue();
	};

	return {
		// Table instance
		table,

		// State
		rowSelection,
		columnVisibility,
		columnFilters,
		sorting,
		pagination,

		// Computed values
		selectedRows,
		selectedRowsCount,
		isAllRowsSelected,
		isSomeRowsSelected,
		totalRows,
		visibleRows,
		pageCount,
		currentPage,
		pageSize,
		hasNextPage,
		hasPreviousPage,

		// Helper functions
		resetFilters,
		resetSorting,
		resetSelection,
		selectAllRows,
		deselectAllRows,
		toggleAllRows,

		// Pagination helpers
		goToFirstPage,
		goToLastPage,
		goToNextPage,
		goToPreviousPage,
		goToPage,
		setPageSizeValue,

		// Filter helpers
		setGlobalFilter,
		setColumnFilter,
		getColumnFilter,
	};
}

// Type exports for convenience
export type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	PaginationState,
} from "@tanstack/solid-table";
