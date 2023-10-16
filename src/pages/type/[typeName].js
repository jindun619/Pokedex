import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import PokeCard from "../../components/PokeCard";

import { convertTypeColor } from "../../utils/convert";
import { translateType } from "../../utils/translate";
import { typeIcons } from "../../icons/typeIcons"

import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

export default function TypePage() {
    const router = useRouter()
    const { typeName } = router.query
    
    const [typeData, setTypeData] = useState([])

    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemLists, setItemLists] = useState();
    const [curCount, setCurCount] = useState()
    const [stop, setStop] = useState(false)

    // FETCHING TYPE DATA
    useEffect(() => {
        //reset states when url changes
        setCurCount(0)
        setItemLists([])
        setTypeData([])

        P.getTypeByName(typeName)
        .then((response) => {
            setTypeData(response)
        })
        .catch((error) => {
            console.log('There was an ERROR: ', error);
        });
    }, [typeName])

    useEffect(() => {
        if(!stop && isLoaded && typeData.length !== 0) {
            let Items = []
            for(let i = curCount; i < curCount + 10; i++) {
                if(typeData.pokemon[i] === undefined) {
                    setStop(true)
                    break
                }
                Items.push(typeData.pokemon[i].pokemon.name)
            }
            setCurCount(curCount => curCount+10)
            setItemLists((itemLists) => itemLists.concat(Items));
            setIsLoaded(false);
        }
    }, [isLoaded, curCount, stop, typeData])

    const getMoreItem = () => {
        setIsLoaded(true);
    };

    useEffect(() => {
        const onIntersect = async ([entry], observer) => {
            if (entry.isIntersecting && !isLoaded) {
                observer.unobserve(entry.target);
                getMoreItem();
                observer.observe(entry.target);
            }
        };

        let observer;
        if (target) {
            observer = new IntersectionObserver(onIntersect, {
            threshold: 0.4,
            });
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [target, isLoaded]);

    if(typeData.length !== 0) {
        const color = convertTypeColor(typeName)
        const name = translateType(typeName)

        return (
            <div>
                {/* CONTENTS WRAPPER */}
                <div>
                    {/* TYPE BANNER */}
                    <div className="m-10s text-5xl rounded-lg" style={{
                        backgroundColor: color,
                        color: '#FFF'
                    }}>
                        <div className="ml-3 py-3 text-center">
                            <div className="w-12 h-12 inline-block">
                                {typeIcons[typeName]()}
                            </div>
                            {name}
                        </div>
                    </div>
                    {/* CARDS AREA */}
                    <div className="flex flex-wrap gap-8 mt-10 justify-center">
                        {
                            // items.map((v, i) => (
                            //     <PokeCard key={i} id={v} />
                            // ))
                            itemLists.map((v, i) => (
                                <PokeCard key={i} id={v} />
                            ))
                        }
                    </div>
                </div>
                <div ref={setTarget} className="h-1"></div>
            </div>
        )
    }
}