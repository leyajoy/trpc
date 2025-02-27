import { AppRouter } from "@/server/routers/app";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
function getBaseUrl() {
	if (typeof window !== "undefined")
		// browser should use relative path
		return "";
	if (process.env.VERCEL_URL)
		// reference for vercel.com
		return `https://${process.env.VERCEL_URL}`;
	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
	config(opts) {
		return {
			links: [loggerLink(), httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
		};
	},
});
