const levelVersion = "265881972e1f77adb2b1aeb2651e1e0731c5e67b"

const addReactive = (reactiveMod) => {
    const reactive = {}
    reactive["viewPort"] = reactiveMod.reactive()
    return reactive.viewPort
}

const getHelpers = async () => {
    const helpers = {}
    await Promise.all([
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/helpers/reactive.js`).then(mod => helpers["reactiveMod"] = mod),
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/helpers/tempo.js`).then(mod => helpers["tempo"] = mod),
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/helpers/viewPort.js`).then(mod => helpers["viewPort"] = mod)
    ])
    return helpers
}

const getComponents = async () => {
    const components = {}
    await Promise.all([
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/components/circularProgressCard.js`).then(mod => components["statCard"] = mod),
    ])
    return components
}


const getIface = async () => {
    const iface = {}
    await Promise.all([
        await import("./iface/section1.js").then(mod => iface["section1"] = mod)
    ])
    return iface
}

const loadControls = async () => {
    const controls = {}
    await Promise.all([
        import("./controls/scroll.js").then(mod => controls["scroll"] = mod),
        import("./controls/section1_stats.js").then(mod => controls["section1"] = mod),
    ])
    return controls
}

const init = async () => {
    const [helpers, components, iface, controls] = await Promise.all([
        getHelpers(),
        getComponents(),
        getIface(),
        loadControls(),
    ])

    const reactive = addReactive(helpers.reactiveMod)
    Object.values(controls).forEach(control => control.init(reactive, helpers))
    Object.values(iface).forEach(iface => iface.init(helpers, components))
}

init()