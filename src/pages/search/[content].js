import { useRouter } from "next/router"
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"

import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

export default function SearchPage () {
    const router = useRouter()
    const { content } = router.query

    const [korNames, setKorNames] = useState([])
    const [items, setItems] = useState([])
    // speciesData.count = 1017
    // https://pokeapi.co/api/v2/pokemon-species/1

    useEffect(() => {
        // for(let i = 0; i < 1017; i++) {
        //     P.getPokemonSpeciesByName(i)
        //     .then((response) => {
        //         const name = response.names.find((node) => {
        //             return node.language.name === 'ko'
        //         }).name

        //         setKorNames(korNames.concat(name))
        //         console.log(name)
        //     })
        //     .catch((error) => {
        //         console.log('There was an ERROR: ', error);
        //     });
        // }
    }, [])

    return (
        <div>
            <Navbar />
            {/* CONTENTS WRAPPER */}
            <div>
                <h1>{content}</h1>
                {/* SEARCH BAR */}
                <SearchBar />
                {/* CARDS AREA */}
                <div className="flex flex-wrap gap-8 mt-10 justify-center">
                    {/* {items} */}
                    {/* {itemLists.map((v, i) => {
                        return <PokeCard id={v} key={i} />;
                    })} */}
                    {
                        korNames.map((node) => (
                            <h1>{node}</h1>
                        ))
                    }
                    <h1>{korNames.length}</h1>
                </div>
            </div>
        </div>
    )
}