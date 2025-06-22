import { cn } from "@/libs/cn";
import { Button } from "@/libs/ui/button";
import { Input } from "@/libs/ui/input";
import { Separator } from "@/libs/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/libs/ui/sheet";
import { Skeleton } from "@/libs/ui/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/libs/ui/tooltip";
import { type VariantProps, cva } from "class-variance-authority";
import type { Accessor, Component, ComponentProps, JSX } from "solid-js";
import {
	createContext,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	onMount,
	children as resolveChildren,
	splitProps,
	useContext,
} from "solid-js";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const MOBILE_BREAKPOINT = 768;

// Mobile detection hook
function useIsMobile(): Accessor<boolean> {
	const [isMobile, setIsMobile] = createSignal<boolean>(false);

	onMount(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		onCleanup(() => mql.removeEventListener("change", onChange));
	});

	return isMobile;
}

interface SidebarContextProps {
	state: Accessor<"expanded" | "collapsed">;
	open: Accessor<boolean>;
	setOpen: (open: boolean) => void;
	openMobile: Accessor<boolean>;
	setOpenMobile: (open: boolean) => void;
	isMobile: Accessor<boolean>;
	toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps>();

export function useSidebar(): SidebarContextProps {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.");
	}
	return context;
}

interface SidebarProviderProps extends ComponentProps<"div"> {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	class?: string;
	children?: JSX.Element;
}

export const SidebarProvider: Component<SidebarProviderProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"defaultOpen",
		"open",
		"onOpenChange",
		"class",
		"children",
		"style",
	]);

	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = createSignal(false);

	// Internal state of the sidebar
	const [_open, _setOpen] = createSignal(local.defaultOpen ?? true);
	const open = () => local.open ?? _open();

	const setOpen = (value: boolean) => {
		if (local.onOpenChange) {
			local.onOpenChange(value);
		} else {
			_setOpen(value);
		}

		// Set cookie to keep sidebar state
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	};

	// Helper to toggle the sidebar
	const toggleSidebar = () => {
		return isMobile() ? setOpenMobile(!openMobile()) : setOpen(!open());
	};

	// Keyboard shortcut to toggle sidebar
	onMount(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
	});

	const state = createMemo(() => (open() ? "expanded" : "collapsed"));

	const contextValue: SidebarContextProps = {
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar,
	};

	return (
		<SidebarContext.Provider value={contextValue}>
			<TooltipProvider delayDuration={0}>
				<div
					data-slot="sidebar-wrapper"
					style={{
						"--sidebar-width": SIDEBAR_WIDTH,
						"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
						...local.style,
					}}
					class={cn(
						"group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
						local.class,
					)}
					{...rest}
				>
					{local.children}
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	);
};

interface SidebarProps extends ComponentProps<"div"> {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
	class?: string;
	children?: JSX.Element;
}

export const Sidebar: Component<SidebarProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"side",
		"variant",
		"collapsible",
		"class",
		"children",
	]);

	const side = () => local.side ?? "left";
	const variant = () => local.variant ?? "sidebar";
	const collapsible = () => local.collapsible ?? "offcanvas";

	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

	if (collapsible() === "none") {
		return (
			<div
				data-slot="sidebar"
				class={cn(
					"bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
					local.class,
				)}
				{...rest}
			>
				{local.children}
			</div>
		);
	}

	if (isMobile()) {
		return (
			<Sheet open={openMobile()} onOpenChange={setOpenMobile} {...rest}>
				<SheetContent
					data-sidebar="sidebar"
					data-slot="sidebar"
					data-mobile="true"
					class="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
					style={{
						"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
					}}
					side={side()}
				>
					<SheetHeader class="sr-only">
						<SheetTitle>Sidebar</SheetTitle>
						<SheetDescription>Displays the mobile sidebar.</SheetDescription>
					</SheetHeader>
					<div class="flex h-full w-full flex-col">{local.children}</div>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<div
			class="group peer text-sidebar-foreground hidden md:block"
			data-state={state()}
			data-collapsible={state() === "collapsed" ? collapsible() : ""}
			data-variant={variant()}
			data-side={side()}
			data-slot="sidebar"
		>
			{/* Sidebar gap on desktop */}
			<div
				data-slot="sidebar-gap"
				class={cn(
					"relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
					"group-data-[collapsible=offcanvas]:w-0",
					"group-data-[side=right]:rotate-180",
					variant() === "floating" || variant() === "inset"
						? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
				)}
			/>
			<div
				data-slot="sidebar-container"
				class={cn(
					"fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
					side() === "left"
						? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
						: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
					// Adjust padding for floating and inset variants
					variant() === "floating" || variant() === "inset"
						? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
					local.class,
				)}
				{...rest}
			>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
				>
					{local.children}
				</div>
			</div>
		</div>
	);
};

interface SidebarTriggerProps extends ComponentProps<typeof Button> {
	class?: string;
}

export const SidebarTrigger: Component<SidebarTriggerProps> = (props) => {
	const [local, rest] = splitProps(props, ["class", "onClick"]);
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="icon"
			class={cn("size-7", local.class)}
			onClick={(event) => {
				local.onClick?.(event);
				toggleSidebar();
			}}
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
				class="size-4"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
				<line x1="9" x2="9" y1="3" y2="21" />
			</svg>
			<span class="sr-only">Toggle Sidebar</span>
		</Button>
	);
};

interface SidebarRailProps extends ComponentProps<"button"> {
	class?: string;
}

export const SidebarRail: Component<SidebarRailProps> = (props) => {
	const [local, rest] = splitProps(props, ["class", "onClick"]);
	const { toggleSidebar } = useSidebar();

	return (
		<button
			data-sidebar="rail"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			onClick={(event) => {
				local.onClick?.(event);
				toggleSidebar();
			}}
			title="Toggle Sidebar"
			class={cn(
				"hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
				"in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
				"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
				"hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
				"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
				"[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
				local.class,
			)}
			{...rest}
		/>
	);
};

interface SidebarInsetProps extends ComponentProps<"main"> {
	class?: string;
}

export const SidebarInset: Component<SidebarInsetProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<main
			data-slot="sidebar-inset"
			class={cn(
				"bg-background relative flex w-full flex-1 flex-col",
				"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
				local.class,
			)}
			{...rest}
		/>
	);
};

interface SidebarInputProps extends ComponentProps<typeof Input> {
	class?: string;
}

export const SidebarInput: Component<SidebarInputProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			class={cn("bg-background h-8 w-full shadow-none", local.class)}
			{...rest}
		/>
	);
};

interface SidebarHeaderProps extends ComponentProps<"div"> {
	class?: string;
}

export const SidebarHeader: Component<SidebarHeaderProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			class={cn("flex flex-col gap-2 p-2", local.class)}
			{...rest}
		/>
	);
};

interface SidebarFooterProps extends ComponentProps<"div"> {
	class?: string;
}

export const SidebarFooter: Component<SidebarFooterProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			class={cn("flex flex-col gap-2 p-2", local.class)}
			{...rest}
		/>
	);
};

interface SidebarSeparatorProps extends ComponentProps<typeof Separator> {
	class?: string;
}

export const SidebarSeparator: Component<SidebarSeparatorProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			class={cn("bg-sidebar-border mx-2 w-auto", local.class)}
			{...rest}
		/>
	);
};

interface SidebarContentProps extends ComponentProps<"div"> {
	class?: string;
}

export const SidebarContent: Component<SidebarContentProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			class={cn(
				"flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
				local.class,
			)}
			{...rest}
		/>
	);
};

interface SidebarGroupProps extends ComponentProps<"div"> {
	class?: string;
}

export const SidebarGroup: Component<SidebarGroupProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			class={cn("relative flex w-full min-w-0 flex-col p-2", local.class)}
			{...rest}
		/>
	);
};

interface SidebarGroupLabelProps extends ComponentProps<"div"> {
	class?: string;
	asChild?: boolean;
}

export const SidebarGroupLabel: Component<SidebarGroupLabelProps> = (props) => {
	const [local, rest] = splitProps(props, ["class", "asChild"]);

	return (
		<div
			data-slot="sidebar-group-label"
			data-sidebar="group-label"
			class={cn(
				"text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				"group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
				local.class,
			)}
			{...rest}
		/>
	);
};

interface SidebarGroupActionProps extends ComponentProps<"button"> {
	class?: string;
	asChild?: boolean;
}

export const SidebarGroupAction: Component<SidebarGroupActionProps> = (
	props,
) => {
	const [local, rest] = splitProps(props, ["class", "asChild"]);

	return (
		<button
			data-slot="sidebar-group-action"
			data-sidebar="group-action"
			class={cn(
				"text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				// Increases the hit area of the button on mobile
				"after:absolute after:-inset-2 md:after:hidden",
				"group-data-[collapsible=icon]:hidden",
				local.class,
			)}
			{...rest}
		/>
	);
};

interface SidebarGroupContentProps extends ComponentProps<"div"> {
	class?: string;
}

export const SidebarGroupContent: Component<SidebarGroupContentProps> = (
	props,
) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			class={cn("w-full text-sm", local.class)}
			{...rest}
		/>
	);
};

interface SidebarMenuProps extends ComponentProps<"ul"> {
	class?: string;
}

export const SidebarMenu: Component<SidebarMenuProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			class={cn("flex w-full min-w-0 flex-col gap-1", local.class)}
			{...rest}
		/>
	);
};

interface SidebarMenuItemProps extends ComponentProps<"li"> {
	class?: string;
}

export const SidebarMenuItem: Component<SidebarMenuItemProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			class={cn("group/menu-item relative", local.class)}
			{...rest}
		/>
	);
};

const sidebarMenuButtonVariants = cva(
	"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				outline:
					"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "h-8 text-sm",
				sm: "h-7 text-xs",
				lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface SidebarMenuButtonProps extends ComponentProps<"button"> {
	asChild?: boolean;
	isActive?: boolean;
	tooltip?: string | ComponentProps<typeof TooltipContent>;
	class?: string;
}

export const SidebarMenuButton: Component<
	SidebarMenuButtonProps & VariantProps<typeof sidebarMenuButtonVariants>
> = (props) => {
	const [local, rest] = splitProps(props, [
		"asChild",
		"isActive",
		"variant",
		"size",
		"tooltip",
		"class",
	]);

	const variant = () => local.variant ?? "default";
	const size = () => local.size ?? "default";
	const isActive = () => local.isActive ?? false;

	const { isMobile, state } = useSidebar();

	const button = (
		<button
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={size()}
			data-active={isActive()}
			class={cn(
				sidebarMenuButtonVariants({ variant: variant(), size: size() }),
				local.class,
			)}
			{...rest}
		/>
	);

	if (!local.tooltip) {
		return button;
	}

	const tooltipProps = () => {
		if (typeof local.tooltip === "string") {
			return { children: local.tooltip };
		}
		return local.tooltip;
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent
				side="right"
				align="center"
				hidden={state() !== "collapsed" || isMobile()}
				{...(tooltipProps() as any)}
			/>
		</Tooltip>
	);
};

interface SidebarMenuActionProps extends ComponentProps<"button"> {
	class?: string;
	asChild?: boolean;
	showOnHover?: boolean;
}

export const SidebarMenuAction: Component<SidebarMenuActionProps> = (props) => {
	const [local, rest] = splitProps(props, ["class", "asChild", "showOnHover"]);

	return (
		<button
			data-slot="sidebar-menu-action"
			data-sidebar="menu-action"
			class={cn(
				"text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				// Increases the hit area of the button on mobile
				"after:absolute after:-inset-2 md:after:hidden",
				"peer-data-[size=sm]/menu-button:top-1",
				"peer-data-[size=default]/menu-button:top-1.5",
				"peer-data-[size=lg]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:hidden",
				local.showOnHover &&
					"peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
				local.class,
			)}
			{...rest}
		/>
	);
};

interface SidebarMenuBadgeProps extends ComponentProps<"div"> {
	class?: string;
}

export const SidebarMenuBadge: Component<SidebarMenuBadgeProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			data-slot="sidebar-menu-badge"
			data-sidebar="menu-badge"
			class={cn(
				"text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
				"peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
				"peer-data-[size=sm]/menu-button:top-1",
				"peer-data-[size=default]/menu-button:top-1.5",
				"peer-data-[size=lg]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:hidden",
				local.class,
			)}
			{...rest}
		/>
	);
};

interface SidebarMenuSkeletonProps extends ComponentProps<"div"> {
	class?: string;
	showIcon?: boolean;
}

export const SidebarMenuSkeleton: Component<SidebarMenuSkeletonProps> = (
	props,
) => {
	const [local, rest] = splitProps(props, ["class", "showIcon"]);

	// Random width between 50 to 90%
	const width = createMemo(() => `${Math.floor(Math.random() * 40) + 50}%`);

	return (
		<div
			data-slot="sidebar-menu-skeleton"
			data-sidebar="menu-skeleton"
			class={cn("flex h-8 items-center gap-2 rounded-md px-2", local.class)}
			{...rest}
		>
			{local.showIcon && (
				<Skeleton class="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />
			)}
			<Skeleton
				class="h-4 max-w-(--skeleton-width) flex-1"
				data-sidebar="menu-skeleton-text"
				style={{
					"--skeleton-width": width(),
				}}
			/>
		</div>
	);
};

interface SidebarMenuSubProps extends ComponentProps<"ul"> {
	class?: string;
}

export const SidebarMenuSub: Component<SidebarMenuSubProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			class={cn(
				"border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
				"group-data-[collapsible=icon]:hidden",
				local.class,
			)}
			{...rest}
		/>
	);
};

interface SidebarMenuSubItemProps extends ComponentProps<"li"> {
	class?: string;
}

export const SidebarMenuSubItem: Component<SidebarMenuSubItemProps> = (
	props,
) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<li
			data-slot="sidebar-menu-sub-item"
			data-sidebar="menu-sub-item"
			class={cn("group/menu-sub-item relative", local.class)}
			{...rest}
		/>
	);
};

interface SidebarMenuSubButtonProps extends ComponentProps<"a"> {
	asChild?: boolean;
	size?: "sm" | "md";
	isActive?: boolean;
	class?: string;
}

export const SidebarMenuSubButton: Component<SidebarMenuSubButtonProps> = (
	props,
) => {
	const [local, rest] = splitProps(props, [
		"asChild",
		"size",
		"isActive",
		"class",
	]);

	const size = () => local.size ?? "md";
	const isActive = () => local.isActive ?? false;

	return (
		<a
			data-slot="sidebar-menu-sub-button"
			data-sidebar="menu-sub-button"
			data-size={size()}
			data-active={isActive()}
			class={cn(
				"text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
				"data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
				size() === "sm" && "text-xs",
				size() === "md" && "text-sm",
				"group-data-[collapsible=icon]:hidden",
				local.class,
			)}
			{...rest}
		/>
	);
};
