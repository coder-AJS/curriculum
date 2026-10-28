export const init = (g, l) => {
    g.reactive.components.add({
        name: "section1-cards",
        value: false,
        listeners: [
            section1Cards
        ]
    })

    console.log(g.reactive)
}

const section1Cards = () => {
    const cards = document.querySelectorAll(".stat3d") 
}