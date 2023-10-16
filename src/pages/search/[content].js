import { useRouter } from "next/router"
import { useState, useEffect } from "react";

import SearchBar from "@/components/SearchBar"
import PokeCard from "@/components/PokeCard";

import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

export default function SearchPage () {
    const router = useRouter()
    const { content } = router.query

    const [korNames, setKorNames] = useState([])

    // INFINITE SCROLL STATES
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemLists, setItemLists] = useState([]);
    const [curCount, setCurCount] = useState(0)
    const [stop, setStop] = useState(false)

    useEffect(() => {
        //states reset when url changes
        setItemLists([])
        setCurCount(0)
        setKorNames([])

        for(let i = 1; i <= 1017; i++) {
            P.getPokemonSpeciesByName(i)
            .then((response) => {
                const name = response.names.find((node) => {
                    return node.language.name === 'ko'
                }).name

                if(name.includes(content)) {
                    const obj = {
                        id: i,
                        name: name
                    }
                    setKorNames(current => [...current, obj])
                }
            })
            .catch((error) => {
                console.log('There was an ERROR: ', error);
            });
        }
    }, [content])

    useEffect(() => {
        if(isLoaded && korNames.length !== 0 && !stop) {
            setCurCount(curCount => curCount+10)
            let Items = []
            for(let i = curCount; i < curCount + 10; i++) {
                if(korNames[i] === undefined) {
                    setStop(true)
                    break
                }
                Items.push({
                    id: korNames[i].id,
                    name: korNames[i].name
                })
            }
            setItemLists((itemLists) => itemLists.concat(Items));
            setIsLoaded(false);
        }
    }, [isLoaded, curCount, korNames])

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

    const items = itemLists.map(v => {
        return (
            <PokeCard key={v.id} id={v.id} />
        )   
    })

    return (
        <div>
            {/* CONTENTS WRAPPER */}
            <div>
                {/* SEARCH BAR */}
                <SearchBar />
                {/* SEARCH RESULT */}
                <div>
                    <p className="text-4xl text-center font-bold">&apos;<span className="underline underline-offset-8">{content}</span>&apos;에 대한 검색결과</p>
                </div>
                {/* CARDS AREA */}
                <div className="flex flex-wrap gap-8 mt-10 justify-center">
                    {items}
                </div>
            </div>
            <div ref={setTarget} className="h-1"></div>
        </div>
    )

}