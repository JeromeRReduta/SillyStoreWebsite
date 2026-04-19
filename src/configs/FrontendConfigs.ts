import { requireNumber } from "../../SillyStoreCommon/configs/ConfigValidation";


export interface IFrontendConfigs {
    readonly minLogLevel: number;
    // readonly port: number; // is defining port useful here?
}

const frontendConfigs: IFrontendConfigs = {
    minLogLevel: requireNumber("MIN LOG LEVEL", import.meta.env.VITE_MIN_LOG_LEVEL);
}