export const animate = async (g, l) => {
    const cardBox = document.querySelectorAll(".cardBox")
    const instances = Object.values(g.static.components.section1)
    const progress = [98, 96, 94]

    for (let i = 0; i < cardBox.length; i++) {
        cardsIntro(cardBox[i])
        await l.helper.tempo.sleep(350)
    }
    await l.helper.tempo.sleepTempo(cardBox[0])

    /* better rendering engine performace  */
    hiddeBackLayers(l)

    for (let i = 0; i < progress.length; i++) {
        instances[i].progress(progress[i])
    }

    await l.helper.tempo.sleep(2200)
    instances.forEach(item => item.toggleExpand(true))
    await l.helper.tempo.sleep(350)
    return true
}


const cardsIntro = async (card) => card.classList.remove("cardBoxHidden")

const hiddeBackLayers = async (l) => {
    const bgLayers = document.querySelectorAll(".cardsCont .bgLayer")
    for (const item of bgLayers) {
        item.style.opacity = "0"
        await l.helper.tempo.sleep(500)
        item.classList.add("hidden")
    }
}