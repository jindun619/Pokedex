import React from "react"

import { useState, useEffect } from "react";

import PokeCard from '../components/PokeCard';
import TypesArea from '../components/TypesArea';
import SearchBar from "@/components/SearchBar";

export default function IndexPage () {
    // INFINITE SCROLL STATES
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemLists, setItemLists] = useState([]);
    const [curCount, setCurCount] = useState(0)

    useEffect(() => {
        if(isLoaded) {
            setCurCount(curCount => curCount+10)
            let Items = Array(10).fill().map((v, i) => curCount + i + 1)
            setItemLists((itemLists) => itemLists.concat(Items));
            setIsLoaded(false);
        }
    }, [isLoaded, curCount])

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

    return (
        <div>
            {/* CONTENTS WRAPPER */}
            <div>
                {/* SEARCH BAR */}
                <SearchBar />
                {/* TYPES AREA */}
                <TypesArea />
                {/* CARDS AREA */}
                <div className="flex flex-wrap gap-8 mt-10 justify-center">
                    {/* {items} */}
                    {itemLists.map((v, i) => {
                        return <PokeCard id={v} key={i} />;
                    })}
                </div>
            </div>
            <div ref={setTarget} className="h-1"></div>
        </div>
    );
}