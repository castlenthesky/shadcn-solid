import type { ComponentProps, VoidComponent } from "solid-js";

const Logo: VoidComponent<ComponentProps<"svg">> = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
			<rect width="256" height="256" fill="none" />
			<line
				x1="208"
				y1="128"
				x2="128"
				y2="208"
				fill="none"
				stroke="#446b9e"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/>
			<line
				x1="192"
				y1="40"
				x2="40"
				y2="192"
				fill="none"
				stroke="#446b9e"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/>
			<title>Logo</title>
		</svg>
	);
};

export default Logo;
