const levelVersion = "713fa13646c6ca17cfc9f5dda186e09270252b6d"

const addReactives = (modules) => {
    const reactive = {}
    reactive["viewPort"] = modules.reactive.default()
    return reactive
}

const getImports = async () => {
    const modules = {}
    await Promise.all([
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/helpers/reactive.js`).then(mod => modules["reactive"] = mod),
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/components/fallBack/textAppear.js`).then(mod => modules["textAppear"] = mod),
        import("./../card.js").then(mod => modules["card"] = mod),
    ])
    return modules
}

const loadIface = async () => {
    const iface = {}
    await Promise.all([

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
    const [modules, controls, iface] = await Promise.all([
        getImports(),
        loadControls(),
        loadIface()
    ])
    const reactive = addReactives(modules)
    Object.values(controls).forEach(control => control.init(reactive))
    Object.values(iface).forEach(iface => iface.init(modules))
}

init()