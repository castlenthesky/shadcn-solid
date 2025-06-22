import { createEffect, createSignal, onCleanup } from "solid-js";

export function createMediaQuery(query: string) {
	const [matches, setMatches] = createSignal(false);

	createEffect(() => {
		const mediaQuery = window.matchMedia(query);

		const onChange = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		mediaQuery.addEventListener("change", onChange);
		setMatches(mediaQuery.matches);

		onCleanup(() => {
			mediaQuery.removeEventListener("change", onChange);
		});
	});

	return matches;
}

export function createIsMobile(mobileBreakpoint = 768) {
	const [isMobile, setIsMobile] = createSignal<boolean | undefined>(undefined);

	createEffect(() => {
		const mediaQuery = window.matchMedia(
			`(max-width: ${mobileBreakpoint - 1}px)`,
		);

		const onChange = () => {
			setIsMobile(window.innerWidth < mobileBreakpoint);
		};

		mediaQuery.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < mobileBreakpoint);

		onCleanup(() => {
			mediaQuery.removeEventListener("change", onChange);
		});
	});

	return () => !!isMobile();
}
