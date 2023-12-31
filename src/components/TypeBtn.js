import React from "react";

import Link from 'next/link'

import { translateType } from "../utils/translate";
import { typeIcons } from "../icons/typeIcons";

export default function TypeBtn ({ name, color }) {
    return (
        // <a href={`/type/${name}`}>
        <Link href={`/type/${name}`}>
            <span className={`inline-block text-center font-bold border w-24 mr-1 p-1 rounded-lg`} style={{
                backgroundColor: color,
                color: '#FFF'
            }}>
                <div className="w-5 h-5 mr-2 inline-block">
                    {typeIcons[name]()}
                </div>
                {translateType(name)}
            </span>
        </Link>
        // </a>
    )
}