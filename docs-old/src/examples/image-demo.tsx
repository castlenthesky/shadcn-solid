import { Image, ImageFallback, ImageRoot } from "@repo/tailwindcss/ui/image";

const ImageDemo = () => {
	return (
		<ImageRoot>
			<Image src="https://github.com/hngngn.png" alt="hngngn" />
			<ImageFallback>HN</ImageFallback>
		</ImageRoot>
	);
};

export default ImageDemo;
