import { Index } from "@/__registry__";
import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@repo/tailwindcss/ui/tabs";
import { frameworks } from "scripts/utils/framework";
import { type JSX, type ParentComponent, Show, createMemo } from "solid-js";

type Props = {
	name: string;
	code: JSX.Element;
};

const ComponentPreview: ParentComponent<Props> = (props) => {
	const Component = createMemo(
		// @ts-expect-error
		() => Index[frameworks[0].name][props.name].component as JSX.Element,
	);

	return (
		<div class="group relative my-4 flex flex-col space-y-2 [&_.preview>div:not(:has(table))]:sm:max-w-[70%]">
			<Tabs defaultValue="preview">
				<div class="pb-3">
					<TabsList class="bg-transparent border-b rounded-none">
						<TabsTrigger value="preview" class="w-fit">
							Preview
						</TabsTrigger>
						<TabsTrigger value="code" class="w-fit">
							Code
						</TabsTrigger>
						<TabsIndicator variant="underline" />
					</TabsList>
				</div>
				<TabsContent
					value="preview"
					class="relative rounded-md preview flex min-h-[350px] w-full justify-center p-10 items-center border has-[table:not([data-scope=date-picker])]:border-none has-[table:not([data-scope=date-picker])]:p-0"
				>
					<Show
						when={Component()}
						fallback={
							<p class="text-sm text-muted-foreground">
								Component{" "}
								<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
									{props.name}
								</code>{" "}
								not found in registry.
							</p>
						}
					>
						{Component()}
					</Show>
				</TabsContent>
				<TabsContent value="code">
					<div class="flex flex-col space-y-4">
						<div class="w-full rounded-md [&_pre]:!my-0 [&_pre]:!max-h-[350px] [&_pre]:overflow-auto relative [&>[data-raw-code]]:mt-0">
							{props.code}
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ComponentPreview;
