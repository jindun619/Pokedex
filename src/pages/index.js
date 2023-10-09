import React from "react"

import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import PokeCard from '../components/PokeCard';
import TypesArea from '../components/TypesArea';

export default function IndexPage () {
    // INFINITE SCROLL STATES
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemLists, setItemLists] = useState([]);
    const [curCount, setCurCount] = useState(0)

    useEffect(() => {
        console.log(itemLists);
      }, [itemLists]);

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
            <Navbar />
            {/* CONTENTS WRAPPER */}
            <div>
                {/* SEARCH BAR */}
                <div className="my-10 block mx-auto w-fulls max-w-2xl">
                    <div className="relative">
                        <input type="text" placeholder="Type here" className="input focus:outline-none shadow-lg w-full"/>
                        <button>
                        <svg className="w-6 h-6 absolute top-3 right-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                        </button>
                    </div>
                </div>
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
            <div ref={setTarget}>target</div>
        </div>
    );
}