import React from "react";
import Link from "next/link";

import { useEffect } from "react";

export default function Navbar() {
    useEffect(() => {
        var prevScrollpos = window.scrollY;
        window.onscroll = function() {
          var currentScrollPos = window.scrollY;
          if (prevScrollpos > currentScrollPos) {
            document.querySelector(".navbar").style.top = "0";
          } else {
            document.querySelector(".navbar").style.top = "-100px";
          }
          prevScrollpos = currentScrollPos;
        }
    })

    return (
        <Link href="/">
            <div className="navbar bg-base-100 sticky top-0 z-10">
                <div className="btn btn-ghost normal-case text-xl">가랏 조성몬!(ㅋㅋ)</div>
            </div>
        </Link>
    )
}