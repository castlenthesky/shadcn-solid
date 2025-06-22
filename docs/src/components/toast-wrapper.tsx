import { Toaster } from "@repo/tailwindcss/ui/sonner";
import { ToastList, ToastRegion } from "@repo/tailwindcss/ui/toast";

const ToastWrapper = () => {
	return (
		<>
			<ToastRegion>
				<ToastList />
			</ToastRegion>
			<Toaster />
		</>
	);
};

export default ToastWrapper;
