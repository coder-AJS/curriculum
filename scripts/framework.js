import { newReactive } from "https://cdn.jsdelivr.net/gh/coder-ajs/lev@v1.0.0/helpers/reactive.js"
import * as scroll from "./scroll.js"

export const reactive = newReactive()

reactive.add({
    name: "scroll",
    value: window.scrollY,
    listeners: scroll.reactToScroll
})

window.addEventListener("scroll", () => {
    reactive.scroll = window.scrollY
})