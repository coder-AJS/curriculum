export const animate = async (level) => {
    const cards = document.querySelectorAll(".stat3d")
    const components = document.querySelectorAll("avanced-progress-card-001")
    const progress = [98, 96, 94]

    for (let i = 0; i < cards.length; i++) {
        cardsIntro(cards[i])
        await level.helpers.tempo.sleep(350)
    }
    await level.helpers.tempo.sleepTempo(cards[0])

    /* better rendering engine performace  */
    hiddeBackLayers(level)

    for (let i = 0; i < progress.length; i++) {
       components[i].progress(progress[i])
    }

    await level.helpers.tempo.sleep(2200)
    components.forEach(item => item.toggleExpand(true))
    return true
}


const cardsIntro = async (card) => card.classList.remove("stat3dHidden")

const hiddeBackLayers = async (level) => {
    const bgLayers = document.querySelectorAll(".cardsCont .bgLayer")
    for (const item of bgLayers) {
        item.style.opacity = "0"
        await level.helpers.tempo.sleep(500)
        item.classList.add("hidden")
    }
}