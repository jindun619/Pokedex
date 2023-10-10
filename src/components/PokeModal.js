import React from "react";

import TypeBtn from "./TypeBtn";

import { convertTypeColor } from "../utils/convert";
import { translateStat } from "@/utils/translate";

export default function PokeModal({ modalId, pokeData, speciesData, eggData }) {
    const name = speciesData.names.find((node) => {
        return node.language.name === 'ko'
    }).name
    const imgSrc = pokeData.sprites.versions['generation-v']['black-white'].animated.front_default || pokeData.sprites.other.home.front_default || pokeData.sprites.other['official-artwork'].front_default || "https://via.placeholder.com/150/"
    const types = pokeData.types
    const genus = speciesData.genera.find((node) => {
        return node.language.name === 'ko'
    })?.genus || ""
    const flavorTexts = speciesData.flavor_text_entries.filter((node) => {
        return node.language.name === 'ko'
    })
    const flavorText = flavorTexts !== undefined ? flavorTexts[0]?.flavor_text : ""
    const height = pokeData.height * 0.1
    const weight = pokeData.weight * 0.1

    return (
        <dialog id={`modal_${modalId}`} className="modal">
            <div className="modal-box">
                {/* MAIN .GIF IMAGE */}
                <figure className="h-36"><img src={imgSrc} className="h-full" alt={name} /></figure>
                {/* KOREAN NAME */}
                <p className="font-bold text-3xl mb-3 text-center">{name}</p>
                {/* GENUS */}
                <p className="text-center mb-3 text-slate-400 text-lg font-bold">{genus}</p>
                {/* TYPES */}
                <div className="text-center mb-4">
                    {
                        types.map((it, idx) => {
                            const color = convertTypeColor(it.type.name)
                            return (
                                <TypeBtn key={idx} name={it.type?.name} color={color} />
                            )
                        })
                    }
                </div>
                {/* FLAVOR TEXT */}
                <p className="mb-2 font-bold text-base">{flavorText}</p>
                {/* SPECS */}
                <div className="text-center">
                    <div className="stats shadow mb-2">
                        <div className="stat place-items-center">
                            <div className="stat-title">신장</div>
                            <div className="stat-value">{`${height.toFixed(1)}m`}</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">체중</div>
                            <div className="stat-value">{`${weight.toFixed(1)}kg`}</div>
                        </div>
                    </div>
                </div>
                {/* STATS */}
                <div className="autoflow-x-auto">
                    <table className="table table-lg table-zebra">
                        <thead>
                            <tr>
                                <th>스탯</th>
                                <th>수치</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pokeData.stats.map((v, i) => (
                                    <tr key={i}>
                                        <td>{translateStat(v.stat.name)}</td>
                                        <td>{v.base_stat}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">닫기</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}