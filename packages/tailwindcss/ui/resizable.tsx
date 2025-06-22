import { cn } from "@/libs/cn";
import type {
	DynamicProps,
	HandleProps,
	PanelProps,
	RootProps,
} from "@corvu/resizable";
import ResizablePrimitive from "@corvu/resizable";
import type { ValidComponent, VoidProps } from "solid-js";
import { Show, splitProps } from "solid-js";

type resizablePanelGroupProps<T extends ValidComponent = "div"> =
	RootProps<T> & {
		class?: string;
	};

export const ResizablePanelGroup = <T extends ValidComponent = "div">(
	props: DynamicProps<T, resizablePanelGroupProps<T>>,
) => {
	const [local, rest] = splitProps(props as resizablePanelGroupProps, [
		"class",
	]);

	return (
		<ResizablePrimitive
			data-slot="resizable-panel-group"
			class={cn(
				"flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
				local.class,
			)}
			{...rest}
		/>
	);
};

type resizablePanelProps<T extends ValidComponent = "div"> = PanelProps<T> & {
	class?: string;
};

export const ResizablePanel = <T extends ValidComponent = "div">(
	props: DynamicProps<T, resizablePanelProps<T>>,
) => {
	const [local, rest] = splitProps(props as resizablePanelProps, ["class"]);

	return (
		<ResizablePrimitive.Panel
			data-slot="resizable-panel"
			class={local.class}
			{...rest}
		/>
	);
};

type resizableHandleProps<T extends ValidComponent = "button"> = VoidProps<
	HandleProps<T> & {
		class?: string;
		withHandle?: boolean;
	}
>;

export const ResizableHandle = <T extends ValidComponent = "button">(
	props: DynamicProps<T, resizableHandleProps<T>>,
) => {
	const [local, rest] = splitProps(props as resizableHandleProps, [
		"class",
		"withHandle",
	]);

	return (
		<ResizablePrimitive.Handle
			data-slot="resizable-handle"
			class={cn(
				"bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
				local.class,
			)}
			{...rest}
		>
			<Show when={local.withHandle}>
				<div class="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="size-2.5"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 9v6m4-6v6m4-6v6"
						/>
						<title>Grip Vertical</title>
					</svg>
				</div>
			</Show>
		</ResizablePrimitive.Handle>
	);
};

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
