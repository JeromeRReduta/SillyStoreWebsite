import { type ILogObj, Logger } from "tslog";

const frontendLogger: Logger<ILogObj> = new Logger({
    minLevel: frontendConfigs.minLogLevel,
    maskValuesOfKeys: ["password", "pw", "pw_hash"],
    maskValuesOfKeysCaseInsensitive: true,
});

export default frontendLogger;
