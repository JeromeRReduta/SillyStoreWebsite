import frontendLogger from "../../src/configs/frontendLogger";

export default async function wasteTime(ms: number) {
    // thanks https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
    frontendLogger.debug("Please wait", ms / 1000, "seconds");
    await new Promise((res) => setTimeout(res, ms));
}
