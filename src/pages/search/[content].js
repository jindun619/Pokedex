import { useRouter } from "next/router"
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import PokeCard from "@/components/PokeCard";

import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

export default function SearchPage () {
    const router = useRouter()
    const { content } = router.query

    const [korNames, setKorNames] = useState([])
    // speciesData.count = 1017
    // https://pokeapi.co/api/v2/pokemon-species/1

    useEffect(() => {
        for(let i = 1; i <= 1017; i++) {
            P.getPokemonSpeciesByName(i)
            .then((response) => {
                const name = response.names.find((node) => {
                    return node.language.name === 'ko'
                }).name

                const obj = {
                    id: i,
                    name: name
                }
                setKorNames(current => [...current, obj])
            })
            .catch((error) => {
                console.log('There was an ERROR: ', error);
            });
        }
    }, [])

    return (
        <div>
            <Navbar />
            {/* CONTENTS WRAPPER */}
            <div>
                {/* SEARCH BAR */}
                <SearchBar />
                {/* SEARCH RESULT */}
                <div>
                    <p className="text-4xl text-center font-bold">Search result for '<span className="underline underline-offset-8">{content}</span>':</p>
                </div>
                {/* CARDS AREA */}
                <div className="flex flex-wrap gap-8 mt-10 justify-center">
                    {
                        korNames.map((v, i) => {
                            if(v.name.includes(content)) {
                                return (
                                    <PokeCard key={v.id} id={v.id} />
                                )   
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )

}