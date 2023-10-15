import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <Link href="/">
            <div className="navbar bg-base-100">
                <div className="btn btn-ghost normal-case text-xl">가랏 조성몬!(ㅋㅋ)</div>
            </div>
        </Link>
    )
}