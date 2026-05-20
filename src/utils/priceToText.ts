export default function priceToText(price: number): string {
    return `$${price.toFixed(2)}`;
}
