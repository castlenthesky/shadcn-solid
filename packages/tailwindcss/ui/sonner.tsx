import { useColorMode } from "@kobalte/core";
import { Toaster as Sonner, type ToasterProps } from "solid-sonner";

export type { ToasterProps };

export const Toaster = (props: ToasterProps) => {
	const { colorMode } = useColorMode();

	return (
		<Sonner
			theme={colorMode() as ToasterProps["theme"]}
			class="toaster group"
			style={{
				"--normal-bg": "hsl(var(--popover))",
				"--normal-text": "hsl(var(--popover-foreground))",
				"--normal-border": "hsl(var(--border))",
				"--success-bg": "hsl(var(--background))",
				"--success-text": "hsl(var(--foreground))",
				"--success-border": "hsl(var(--border))",
				"--info-bg": "hsl(var(--background))",
				"--info-text": "hsl(var(--foreground))",
				"--info-border": "hsl(var(--border))",
				"--warning-bg": "hsl(var(--background))",
				"--warning-text": "hsl(var(--foreground))",
				"--warning-border": "hsl(var(--border))",
				"--error-bg": "hsl(var(--destructive))",
				"--error-text": "hsl(var(--destructive-foreground))",
				"--error-border": "hsl(var(--destructive))",
			}}
			toastOptions={{
				classes: {
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:hover:bg-primary/90",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:hover:bg-muted/80",
				},
			}}
			{...props}
		/>
	);
};
