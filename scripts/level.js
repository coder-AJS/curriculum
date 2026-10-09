const levelVersion = "713fa13646c6ca17cfc9f5dda186e09270252b6d"

const getImports = async () => {
    const modules = {}
    await Promise.all([
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/helpers/reactive.js`).then(mod => modules["reactive"] = mod),
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/components/fallBack/textAppear.js`).then(mod => modules["textAppear"] = mod),
    ])
    return modules
}

const addReactives = (modules) => {
    const reactives = {}
    reactives["viewPort"] = modules.reactive.default()
    return reactives
}

const loadIface = async () => {
    const iface = {}
    await Promise.all([
        import("./iface/wellcome.js").then(mod => iface["wellcome"] = mod),
    ])
    return iface
}

const loadControls = async () => {
    const controls = {}
    await Promise.all([
        import("./controls/scroll.js").then(mod => controls["scroll"] = mod),
    ])
    return controls
}

const init = async () => {
    const [modules, controls, iface] = await Promise.all([
        getImports(),
        loadControls(),
        loadIface()
    ])
    const reactives = addReactives(modules)
    Object.values(controls).forEach(control => control.init(reactives))
    Object.values(iface).forEach(iface => iface.init(modules))
}

init()