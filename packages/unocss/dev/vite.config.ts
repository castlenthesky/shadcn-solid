import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import unocss from "unocss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	plugins: [unocss(), solid()],
	build: {
		target: "esnext",
	},
	resolve: {
		alias: {
			"@/libs": resolve(__dirname, "../libs"),
		},
	},
});
