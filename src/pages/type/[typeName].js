import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import PokeCard from "../../components/PokeCard";

import { convertTypeColor } from "../../utils/convert";
import { translateType } from "../../utils/translate";
import { typeIcons } from "../../icons/typeIcons"

import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

export default function typeName() {
    const router = useRouter()
    const { typeName } = router.query
    
    const [typeData, setTypeData] = useState([])

    const [items, setItems] = useState([])

    // FETCHING TYPE DATA
    useEffect(() => {
        P.getTypeByName(typeName)
        .then((response) => {
            setTypeData(response)
        })
        .catch((error) => {
            console.log('There was an ERROR: ', error);
        });
    }, [typeName])

    useEffect(() => {
        console.log(items)
    }, [items])

    useEffect(() => {
        if(typeData.length !== 0) {
            const newItems = []
            typeData.pokemon.forEach((v, i) => {
                newItems.push(v.pokemon.name)
            })
            setItems(newItems)
        }
    }, [typeData])

    if(typeData.length !== 0) {
        const color = convertTypeColor(typeName)
        const name = translateType(typeName)

        return (
            <div>
                <Navbar />
                {/* CONTENTS WRAPPER */}
                <div>
                    {/* TYPE BANNER */}
                    <div className="m-10s text-5xl rounded-lg" style={{
                        backgroundColor: color,
                        color: '#FFF'
                    }}>
                        <div className="ml-3 py-3 text-center">
                            <div className="w-12 h-12 mr-4 inline-block">
                                {typeIcons[typeName]()}
                            </div>
                            {name}
                        </div>
                    </div>
                    {/* CARDS AREA */}
                    <div className="flex flex-wrap gap-8 mt-10 justify-center">
                        {
                            items.map((v, i) => (
                                <PokeCard key={i} id={v} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}