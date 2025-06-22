import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

/**
 * AspectRatio component that maintains consistent proportional dimensions
 * for responsive content regardless of container size.
 *
 * @example
 * <AspectRatio ratio={16 / 9}>
 *   <img src="image.jpg" alt="Example" />
 * </AspectRatio>
 */

interface AspectRatioProps extends ComponentProps<"div"> {
	/**
	 * The desired aspect ratio as a number (width/height).
	 * @default 1
	 * @example
	 * - 16/9 for widescreen
	 * - 4/3 for standard
	 * - 1 for square
	 */
	ratio?: number;
}

export function AspectRatio(props: AspectRatioProps) {
	const [local, rest] = splitProps(props, ["ratio", "style", "children"]);
	const ratio = local.ratio ?? 1;

	return (
		<div
			data-slot="aspect-ratio"
			style={{
				position: "relative",
				width: "100%",
				"padding-bottom": `${(1 / ratio) * 100}%`,
				...local.style,
			}}
			{...rest}
		>
			<div
				style={{
					position: "absolute",
					top: "0",
					right: "0",
					bottom: "0",
					left: "0",
				}}
			>
				{local.children}
			</div>
		</div>
	);
}
