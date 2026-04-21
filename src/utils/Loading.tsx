import css from "./loading.module.css";

export default function Loading({ message = "Loading..." }: { message: string }) {
    return <section className={css.loading}>{message}</section>
}