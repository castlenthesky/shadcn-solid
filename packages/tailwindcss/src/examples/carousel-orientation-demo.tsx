import { Index } from "solid-js"

import { Card, CardContent } from "@repo/tailwindcss/ui/v4/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/tailwindcss/ui/v4/carousel"

const CarouselOrientationDemo = () => {
  return (
    <Carousel
      orientation="vertical"
      options={() => ({
        align: "start",
      })}
      class="w-full max-w-xs"
    >
      <CarouselContent class="-mt-1 h-[150px] md:h-[300px]">
        <Index each={Array.from({ length: 5 })}>
          {(_, index) => (
            <CarouselItem class="pt-1 md:basis-1/2">
              <div class="p-1">
                <Card>
                  <CardContent class="flex items-center justify-center p-6">
                    <span class="text-3xl font-semibold">{index + 1}</span>
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
  )
}

export default CarouselOrientationDemo
