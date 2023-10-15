import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function SearchBar () {
    const [alert, setAlert] = useState(false)

    const router = useRouter()

    const handleKeyDown = (e) => {
        const content = document.querySelector(".searchInput").value
        if(e.key === 'Enter') {
            if(content === '' || content.includes(' ')) {
                console.log("empty")
                setAlert(true)
            } else {
                enterSearch()
            }
        }
    }

    const handleFocus = () => {
        setAlert(false)
    }

    const enterSearch = () => {
        const content = document.querySelector(".searchInput").value
        if(content === '' || content.includes(' ')) {
            console.log("empty")
            setAlert(true)
        } else {
            router.push(`/search/${content}`)
        }
    }

    const alertComp = () => (
        <div className="relative">
            <div className="alert alert-warning p-1 absolute top-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>올바르지 않은 형식입니다!</span>
            </div>
        </div>
    )

    useEffect(() => {
        if(alert === true) {
            setTimeout(() => {
                setAlert(false)
            }, 3000);
        }
    }, [alert])

    return (
        <div className="my-10 block mx-auto w-fulls max-w-2xl">
            <div className="relative">
                <input onKeyDown={handleKeyDown} onFocus={handleFocus} type="text" placeholder="포켓몬 검색" className="searchInput input focus:outline-none shadow-lg w-full"/>
                <button onClick={enterSearch}>
                    <svg className="w-6 h-6 absolute top-3 right-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </button>
            </div>
            {alert ? alertComp() : ""}
        </div>
    )
}