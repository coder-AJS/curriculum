/* import { reactiveScroll } from "../framework.js"
console.log(reactiveScroll)
 */
/* reactiveScroll.add({
    name: "scroll",
    value: window.scrollY,
    listeners: scroll.reactToScroll
})

window.addEventListener("scroll", () => {
    reactiveScroll.scroll = window.scrollY
})


const wellcomeHeight = document.querySelector("#wellcome").offsetHeight


let section = null

export const reactToScroll = (scroll) => {
    if (scroll === 0) {
        if (section === "wellcome") return
        section = "wellcome"
        console.log("wellcome")
    }

    if (scroll >= wellcomeHeight) {
        if (section === "section-1") return
        section = "section-1"
        console.log("section-1")
    }
}

reactToScroll(window.scrollY) */