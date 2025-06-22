import { createSignal, onMount } from "solid-js";

export function createIsMac() {
	const [isMac, setIsMac] = createSignal(false);

	onMount(() => {
		setIsMac(navigator.platform.toUpperCase().includes("MAC"));
	});

	return isMac;
}
