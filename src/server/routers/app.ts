import { z } from "zod";
import { router, procedure } from "../trpc";

export const appRouter = router({
	getName: procedure
		.input(z.object({ firstName: z.string(), lastName: z.string() }))
		.query((opts) => {
			return {
				fullName: `${opts.input.firstName} ${opts.input.lastName}`,
			};
		}),
});
export type AppRouter = typeof appRouter;
