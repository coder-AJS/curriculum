const loading = document.querySelector(".titlesLayer")

const importModules = async () => {
    const [level, app] = await Promise.all([
        import("./level.js").then(mod => mod.init()),
        import("./app.js").then(mod => mod.init())
    ])
    return [level, app]
}

const addReactives = () => {
    const reactives = {}
    reactives["viewPort"] = null
    return reactives
}

const prepareApp = async (app, level, reactives) => {
    await Promise.all([
        app.controls.scroll.init(reactives, level.helpers)
    ])
}

const init = async () => {
    document.body.style.overflow = "hidden"
    const reactives = addReactives()
    const [level, app] = await importModules()
    await prepareApp(app, level, reactives)
}

init()