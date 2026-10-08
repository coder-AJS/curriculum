const levelVersion = "481fb19026eb1558818fae32a1e0e94935ca38f9"

const getImports = async () => {
    const modules = {}
    await Promise.all([
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/helpers/reactive.js`).then(mod => modules["reactive"] = mod),
        import(`https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}/components/fallBack/textAppear.js`).then(mod => modules["textAppear"] = mod)
    ])
    return modules
}

const addReactives = (modules) => {
    const reactives = {}
    reactives["scroll"] = modules.reactive.reactive() /* nombres redundante añadir default en modulo */
    return reactives
}

const init = async () => {
    const modules = await getImports()
    return addReactives(modules)
}

export const reactives = await init()