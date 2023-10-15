import React from "react";
import { useState, useEffect } from 'react';

import axios from "axios"

import PokeModal from "./PokeModal";
import TypeBtn from "./TypeBtn";

import { convertTypeColor } from "../utils/convert";

import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

export default function PokeCard({ id }) {
    const [pokeData, setPokeData] = useState([])
    const [speciesData, setSpeciesData] = useState([])
    const [eggData, setEggData] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        P.getPokemonSpeciesByName(id)
        .then((response) => {
            setSpeciesData(response)
        })
        .catch((error) => {
            console.log('There was an ERROR: ', error)
            setLoading(false)
        })
    }, [id])

    useEffect(() => {
        P.getPokemonByName(id)
        .then((response) => {
            setPokeData(response)
        })
        .catch((error) => {
            console.log('There was an ERROR: ', error);
        })

        if(speciesData.length !== 0) {
            speciesData.egg_groups.map(v => {
                axios.get(v.url)
                .then((res) => {
                    const eggName = res.data.names.find((v, i) => {
                        return v.language.name === 'ko'
                    }).name
                    setEggData(cur => [...cur, eggName])
                    setLoading(false)
                })
            })
        }
    }, [speciesData, id])

    if(loading) {
        return(
            <div className="card w-72 h-40 bg-base-100 shadow-xl flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if(pokeData.length !== 0 && speciesData.length !== 0 && eggData.length !== 0) {
        const name = speciesData.names.find((node) => {
            return node.language.name === 'ko'
        }).name
        const imgSrc = pokeData.sprites.versions['generation-v']['black-white'].animated.front_default || pokeData.sprites.other.home.front_default || pokeData.sprites.other['official-artwork'].front_default || "https://via.placeholder.com/150/"
        const types = pokeData.types
        return(
            <div className="card w-72 bg-base-100 shadow-xl">
                <figure><img src={imgSrc} alt={name} className="h-20" /></figure>
                <div className="card-body p-3">
                    <h2 className="card-title justify-center">{`${name}`}</h2>
                    <div>
                        {
                            types.map((it, idx) => {
                                const color = convertTypeColor(it.type.name)
                                return(
                                    <TypeBtn key={idx} name={it.type.name} color={color} />
                                )
                            })
                        }
                    </div>
                    <div className="card-actions justify-center mt-5">
                        <button className="btn bg-base-300 hover:bg-[#94a3b8]" onClick={()=>document.getElementById(`modal_${id}`).showModal()}>자세히 보기</button>
                    </div>
                </div>
                <PokeModal key={id} modalId={id} pokeData={pokeData} speciesData={speciesData} eggData={eggData} />
            </div>
        )
    } else {
        return false
    }
}