import { createSignal } from "solid-js";

export function createCopyToClipboard({
	timeout = 2000,
	onCopy,
}: {
	timeout?: number;
	onCopy?: () => void;
} = {}) {
	const [isCopied, setIsCopied] = createSignal(false);

	const copyToClipboard = (value: string) => {
		if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
			return;
		}

		if (!value) return;

		navigator.clipboard.writeText(value).then(() => {
			setIsCopied(true);

			if (onCopy) {
				onCopy();
			}

			if (timeout !== 0) {
				setTimeout(() => {
					setIsCopied(false);
				}, timeout);
			}
		}, console.error);
	};

	return { isCopied, copyToClipboard };
}
