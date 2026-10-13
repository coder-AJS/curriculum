import * as scroll from "./scroll.js"

let vp = null
let statsOpened = false

export const init = (reactive) => {
    vp = reactive.viewPort

    reactive.viewPort.addTo({
        name: "onSection",
        listeners: [
            alertSection,
            animateStats
        ]
    })

    alertSection()
    animateStats()
}


const animateStats = async () => {
    const statBoxes = document.querySelectorAll(".statBox")

    if (!statsOpened && vp.onSection === "section1") {
        scroll.block(true)
        statsOpened = true
        for (const box of statBoxes) {
            box.classList.remove("stat_hidden")

            await new Promise(resolve => setTimeout(resolve, 160))
        }
        scroll.block(false)
    }
}

const alertSection = () => {
    console.log(vp.onSection)
}
