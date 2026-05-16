import { useMutation, UseMutationResult } from "@tanstack/react-query";
import wasteTime from "../utils/wasteTime";
import frontendLogger from "../../src/configs/frontendLogger";

export default function useMockFinalizeOrder(): UseMutationResult<void> {
    async function mutationFn(): Promise<void> {
        frontendLogger.debug("Finalizing order!");
        await wasteTime(3000);
        frontendLogger.debug("Done! Order status is now 'complete'");
    }

    return useMutation({ mutationFn });
}
