import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ICartItemResponse } from "../../SillyStoreCommon/dtos/cartItemDtos";
import frontendConfigs from "../../src/configs/FrontendConfigs";
import frontendLogger from "../../src/configs/frontendLogger";
import { useCookies } from "react-cookie";
import wasteTime from "../utils/wasteTime";

const acornUrl =
    "https://i.etsystatic.com/17321049/r/il/b3bed3/4245092906/il_570xN.4245092906_9caz.jpg";
const MOCK_CART_SIZE = 7;
const ARBITRARY_ORDER_ID = 1;
const mockCart = Array.from(
    { length: MOCK_CART_SIZE },
    (_, i): ICartItemResponse => {
        return {
            orderId: ARBITRARY_ORDER_ID,
            productId: i,
            quantity: i * 10,
            description: `description ${i.toString()}`,
            imageSrc: acornUrl,
            price: i * 10,
            title: `Title ${i.toString()}`,
        };
    },
);

export default function useMockGetPendingCart(): UseQueryResult<
    ICartItemResponse[]
> {
    const [cookies, _setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);

    async function queryFn(): Promise<ICartItemResponse[]> {
        frontendLogger.debug("Getting cart items...");
        frontendLogger.debug("Logged in?", !!cookies.token);
        const isSignedOutAtStart = !!cookies.token;
        if (isSignedOutAtStart) {
            return [];
        }
        await wasteTime(3000);
        return mockCart;
    }
    return useQuery({
        queryKey: [frontendConfigs.queryKeys.cart],
        queryFn,
    });
}
