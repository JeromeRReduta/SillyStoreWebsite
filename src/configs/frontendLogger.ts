import { type ILogObj, Logger } from "tslog";
import frontendConfigs from "./FrontendConfigs";

const frontendLogger = new Logger<ILogObj>({
    minLevel: frontendConfigs.logging.minLogLevel,
    maskValuesOfKeys: ["password", "pw", "pw_hash"],
    maskValuesOfKeysCaseInsensitive: true,
});

export default frontendLogger;
