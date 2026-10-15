const getIface = async () => {
    const iface = {}
    await Promise.all([
        import("./iface/section1.js").then(mod => iface["section1"] = mod),
    ])
    return iface
}

const getControls = async () => {
    const controls = {}
    await Promise.all([
        import("./controls/components.js").then(mod => controls["components"] = mod),
        import("./controls/scroll.js").then(mod => controls["scroll"] = mod),
    ])
    return controls
}

export const init = async () => {
    const [iface, controls] = await Promise.all([
        getIface(),
        getControls()
    ])
    
    return {
        "iface": iface,
        "controls": controls
    }
}