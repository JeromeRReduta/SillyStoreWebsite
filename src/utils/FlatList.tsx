import React from "react";
import type { JSX } from "react";
import css from "./flat-list.module.css"

/** Lovingly stolen from react native - credit to them */
export default function FlatList<TData>(
    { data, renderItem, keyExtractor }: {
        data: TData[],
        renderItem: (elem: TData) => JSX.Element,
        keyExtractor: (elem: TData) => React.Key
    }
): JSX.Element {
    return <section className={css.flat_list}>
        {data.map((elem) => <div key={keyExtractor(elem)} className={css.flat_list_item}>{renderItem(elem)}</div>)}
    </section>
}