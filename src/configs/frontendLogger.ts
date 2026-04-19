import { type ILogObj, Logger } from "tslog";

const frontendLogger: Logger<ILogObj> = new Logger({
    minLevel: frontendConfigs.minLogLevel,
    maskValuesofKeys: ["password", "pw", "pw_hash"],
    maskValuesOfKeysCaseInsensitive: true,
});
