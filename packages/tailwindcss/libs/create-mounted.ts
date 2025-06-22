import { createSignal, onMount } from "solid-js";

export function createMounted() {
	const [mounted, setMounted] = createSignal(false);

	onMount(() => {
		setMounted(true);
	});

	return mounted;
}
