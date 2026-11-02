const components = {
    "htmlCard": null,
    "cssCard": null,
    "jsCard": null
}

export const init = (g, l, iface) => {
    let componentsReady = false

    document.addEventListener("component", (e) => {
        if (e.detail.id in components) {
            components[e.detail.id] = e.detail.instance
            !componentsReady && checkComponents()
        }
    })

    const checkComponents = () => {
        if (Object.values(components).every(Boolean)) {
            componentsReady = true
            g.reactive.section1.state = true
        }
    }


    iface.init(l)
}