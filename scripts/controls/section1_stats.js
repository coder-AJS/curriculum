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
        statsOpened = true
        for (const box of statBoxes) {
            box.classList.remove("stat_hidden")

            await new Promise(resolve => setTimeout(resolve, 160))
        }
    }
}

const alertSection = () => {
    console.log(vp.onSection)
}
