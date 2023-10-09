import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

import PokeModal from "./PokeModal";
import TypeBtn from "./TypeBtn";

import { convertTypeColor } from "../utils/convert";

import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

export default function PokeCard({ id }) {  //id or name(english)
    const [pokeData, setPokeData] = useState([])
    const [speciesData, setSpeciesData] = useState([])
    
    useEffect(()=>{
        P.getPokemonByName(id)
        .then((response) => {
          setPokeData(response)
        })
        .catch((error) => {
          console.log('There was an ERROR: ', error);
        });
    }, [id])

    useEffect(() => {
        if(pokeData.length !== 0) {
                axios.get(pokeData.species.url)
                .then((response) => {
                    setSpeciesData(response.data)
                })
                .catch((error) => {
                    console.log('There was an ERROR: ', error)
                })
        }
    }, [pokeData])

    if(pokeData.length !== 0 && speciesData.length !== 0) {
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
                <PokeModal modalId={id} pokeData={pokeData} speciesData={speciesData} />
            </div>
        )
    } else {
        return (
            <div className="card w-72 bg-base-100 shadow-xl">
                <figure><img src={"https://via.placeholder.com/150/"} alt={"placeholder"} className="h-20" /></figure>
                <div className="card-body p-3">
                    <h2 className="card-title justify-center">Loading..</h2>
                    <div className="card-actions justify-center mt-5">
                        <button className="btn bg-base-300 hover:bg-[#94a3b8]">자세히 보기</button>
                    </div>
                </div>
            </div>
        )
        // return false
    }
}