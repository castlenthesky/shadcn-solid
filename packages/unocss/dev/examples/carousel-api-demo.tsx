import { Index, createEffect, createSignal } from "solid-js";
import { Card, CardContent } from "../../ui/card";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../../ui/carousel";

const CarouselApiDemo = () => {
	const [api, setApi] = createSignal<ReturnType<CarouselApi>>();
	const [current, setCurrent] = createSignal(0);
	const [count, setCount] = createSignal(0);

	const onSelect = () => {
		setCurrent(api()?.selectedScrollSnap() + 1);
	};

	createEffect(() => {
		if (!api()) {
			return;
		}

		setCount(api()?.scrollSnapList().length);
		setCurrent(api()?.selectedScrollSnap() + 1);

		api()?.on("select", onSelect);
	});

	return (
		<div>
			<Carousel setApi={setApi} class="w-full max-w-xs">
				<CarouselContent>
					<Index each={Array.from({ length: 5 })}>
						{(_, index) => (
							<CarouselItem>
								<Card>
									<CardContent class="flex aspect-square items-center justify-center p-6">
										<span class="text-4xl font-semibold">{index + 1}</span>
									</CardContent>
								</Card>
							</CarouselItem>
						)}
					</Index>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div class="py-2 text-center text-sm text-muted-foreground">
				Slide {current()} of {count()}
			</div>
		</div>
	);
};

export default CarouselApiDemo;
