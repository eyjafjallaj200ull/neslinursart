import { createSafeActionClient } from "next-safe-action";
import { z } from "zod/v4";

export const actionClient = createSafeActionClient({
    defineMetadataSchema() {
        return z.object({
            actionName: z.string(),
        })
    },
    handleServerError(e) {
        return e.message
    }
})