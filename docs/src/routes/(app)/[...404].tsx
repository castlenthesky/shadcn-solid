import { Button } from "@/registry/tailwindcss/ui/button"

const NotFound = () => {
  return (
    <div class="border-grid">
      <div class="container-wrapper">
        <div class="flex h-[calc(100dvh-57px-61px)] items-center justify-center">
          <div class="flex flex-col items-center justify-center gap-y-4">
            <span class="text-4xl font-bold">Page Not Found</span>
            <Button
              as="a"
              href="/"
              variant="link"
              class="gap-x-2 hover:no-underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-4"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                >
                  <path stroke-miterlimit="10" d="M4 12h16" />
                  <path
                    stroke-linejoin="round"
                    d="M11.033 4.34L4.46 10.911a1.53 1.53 0 0 0 0 2.176l6.573 6.573"
                  />
                </g>
              </svg>
              Back to home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
