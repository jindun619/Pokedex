import { useRouter } from "next/router"

export default function SearchBar ({ value }) {
    const router = useRouter()

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            enterSearch()
        }
    }

    const enterSearch = () => {
        const content = document.querySelector(".searchInput").value
        router.push(`/search/${content}`)
    }

    return (
        <div className="my-10 block mx-auto w-fulls max-w-2xl">
            <div className="relative">
                <input onKeyDown={handleKeyDown} type="text" placeholder="포켓몬 검색" className="searchInput input focus:outline-none shadow-lg w-full"/>
                <button onClick={enterSearch}>
                    <svg className="w-6 h-6 absolute top-3 right-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </button>
            </div>
        </div>
    )
}