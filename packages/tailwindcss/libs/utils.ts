/**
 * Constructs an absolute URL from a relative path
 * @param path - The relative path to append to the base URL
 * @returns The absolute URL
 */
export function absoluteUrl(path: string): string {
	const baseUrl =
		typeof window !== "undefined"
			? window.location.origin
			: process.env.PUBLIC_APP_URL || "";
	return `${baseUrl}${path}`;
}

/**
 * Formats a date input into a localized string
 * @param input - Date string or timestamp
 * @returns Formatted date string
 */
export function formatDate(input: string | number): string {
	const date = new Date(input);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}
