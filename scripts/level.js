const levelVersion = "e5a86d29df1585baffc0f1f106794096b9782351"

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
        import("./iface/section1.js").then(mod => iface["section1"] = mod),
    ])
    return iface
}

const loadControls = async () => {
    const controls = {}
    await Promise.all([
        import("./controls/components.js").then(mod => controls["components"] = mod),
        import("./controls/scroll.js").then(mod => controls["scroll"] = mod),
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

    const reactive = {} /* reactive global object */
    Object.values(controls).forEach(control => control.init(reactive, helpers))
    Object.values(iface).forEach(iface => iface.init(helpers, components))
}

init()