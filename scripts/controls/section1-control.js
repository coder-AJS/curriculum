export const init = (g, l, iface) => {
    const section1 = g.static.components.section1 = {
        "html_card": null,
        "css_card": null,
        "js_card": null
    }

    let sectionChecked = false
    document.addEventListener("component", (e) => {
        if (e.detail.id in section1) section1[e.detail.id] = e.detail.instance
        !sectionChecked && checkComponents()
    })

    const checkComponents = () => {
        if (Object.values(section1).every(Boolean)) {
            sectionChecked = true
            g.components.section1.components = "ready"
        }
    }


    iface.init(l)
}