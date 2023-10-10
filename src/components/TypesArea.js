import React from "react";

import TypeBtn from "./TypeBtn";

import { convertTypeColor } from "../utils/convert"

export default function TypesArea() {
    const types = [
        'normal',
        'fighting',
        'flying',
        'poison',
        'ground',
        'rock',
        'bug',
        'ghost',
        'steel',
        'fire',
        'water',
        'grass',
        'electric',
        'psychic',
        'ice',
        'dragon',
        'dark',
        'fairy',
        'unknown',
        'shadow'
    ]

    const typesObj = types.map((node) => {
        const color = convertTypeColor(node)
        return (
            <TypeBtn key={node} name={node} color={color} />
        )
    })

    return (
        <div className="flex flex-wrap ml-3 gap-3 justify-center">
            {typesObj}
        </div>
    )
}