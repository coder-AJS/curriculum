export const animate = async (scenes, l) => {
    const progress = [98, 96, 94]

    await l.helper.tempo.sleep(500)
    for (let i = 0; i < scenes.length; i++) {
        l.helper.css.set("opacity", 1, scenes[i])
        l.helper.css.set("blur", 0, scenes[i])
        l.helper.css.set("scale", 1, scenes[i])
        await l.helper.tempo.sleep(500)
    }

    await l.helper.tempo.sleepTempo(scenes[0].querySelector(".cardBox"))

    hiddeBackLayers(l)
    for (let i = 0; i < progress.length; i++) scenes[i].querySelector(".card-component").updateProgress(progress[i])
    await l.helper.tempo.sleep(2000)

    for (let i = 0; i < progress.length; i++) scenes[i].querySelector(".card-component").toggleExpand(true)
    await l.helper.tempo.sleep(350)
    return true
}

    /* better rendering engine performace  */
const hiddeBackLayers = async (l) => {
    const bgLayers = document.querySelectorAll(".bgLayer")
    bgLayers.forEach(item => item.classList.add("hidden"))
}