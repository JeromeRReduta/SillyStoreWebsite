import { ICartItemResponse } from "../SillyStoreCommon/dtos/cartItemDtos";
import { IProductResponse } from "../SillyStoreCommon/dtos/productDtos";
import { TokenResponse } from "../SillyStoreCommon/dtos/userDtos";

interface IMockData {
    products: IProductResponse[];
    token: TokenResponse;
    cart: ICartItemResponse[];
}

const NUM_MOCK_PRODUCTS = 10;
const MOCK_CART_SIZE = 7;
const ARBITRARY_ORDER_ID = 1;

const mockProducts = Array.from(
    { length: NUM_MOCK_PRODUCTS },
    (_, i): IProductResponse => {
        const moneyStr: string = (i * 1.11).toFixed(2);
        return {
            id: i,
            imageSrc: "/placeholder.webp",
            title: "title " + i.toString(),
            description: i.toString(),
            price: +moneyStr,
        };
    },
);

const mockToken: TokenResponse = "bababooey";

const mockCart = Array.from(
    { length: MOCK_CART_SIZE },
    (_, i): ICartItemResponse => {
        return {
            orderId: ARBITRARY_ORDER_ID,
            productId: i,
            quantity: i * 10,
        };
    },
);

const mockData: IMockData = {
    products: mockProducts,
    token: mockToken,
    cart: mockCart,
};

export default mockData;
