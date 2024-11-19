import { Card, CardContent } from "@repo/tailwindcss/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@repo/tailwindcss/ui/carousel";
import { Index } from "solid-js";

const CarouselDemo = () => {
	return (
		<Carousel class="w-full max-w-xs">
			<CarouselContent>
				<Index each={Array.from({ length: 5 })}>
					{(_, index) => (
						<CarouselItem>
							<div class="p-1">
								<Card>
									<CardContent class="flex aspect-square items-center justify-center p-6">
										<span class="text-4xl font-semibold">{index + 1}</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					)}
				</Index>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

export default CarouselDemo;
