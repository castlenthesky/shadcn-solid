import { type Accessor, createEffect, onCleanup } from "solid-js";

export function createMutationObserver(
	target: Accessor<HTMLElement | undefined | null>,
	callback: MutationCallback,
	options: MutationObserverInit = {
		attributes: true,
		characterData: true,
		childList: true,
		subtree: true,
	},
) {
	createEffect(() => {
		const element = target();
		if (element) {
			const observer = new MutationObserver(callback);
			observer.observe(element, options);

			onCleanup(() => {
				observer.disconnect();
			});
		}
	});
}
