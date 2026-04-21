import React from "react";
import type { JSX } from "react";
import css from "./flat-list.module.css"

/** Lovingly stolen from react native - credit to them */
export default function FlatList<TData>(
    { listClassName = css.flat_list, listItemClassName = css.flat_list_item, data, renderItem, keyExtractor }: {
        listClassName: string,
        listItemClassName: string
        data: TData[],
        renderItem: (elem: TData) => JSX.Element,
        keyExtractor: (elem: TData) => React.Key
    }
): JSX.Element {
    return <section className={listClassName}>
        {data.map((elem) => <div key={keyExtractor(elem)} className={listItemClassName}>{renderItem(elem)}</div>)}
    </section>
}