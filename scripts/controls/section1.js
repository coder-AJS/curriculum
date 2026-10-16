export const animate = async (level) => {
    const cards = document.querySelectorAll(".stat3d")
    const bgLayers = document.querySelectorAll(".cardsCont .bgLayer")

    for (let i = 0; i < cards.length; i++) {
        cardsIntro(cards[i])
        await level.helpers.tempo.sleep(350)
    }
    
      /* better rendering engine performace  */
    for (const item of bgLayers) { 
        item.style.opacity = "0"
        await level.helpers.tempo.sleep(500)
        item.classList.add("hidden")
    }
}

const cardsIntro = async (card) => card.classList.remove("stat3dHidden")