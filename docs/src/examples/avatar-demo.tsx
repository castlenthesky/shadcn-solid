import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@repo/tailwindcss/ui/avatar";

const AvatarDemo = () => {
	return (
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
};

export default AvatarDemo;
