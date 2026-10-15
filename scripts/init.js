const loading = document.querySelector(".titlesLayer")

const importModules = async () => {
    const [level, app] = await Promise.all([
        import("./level.js").then(mod => mod.init()),
        import("./app.js").then(mod => mod.init())
    ])
    return {
        "level": level, 
        "app": app
    }
}

const addReactives = () => {
    const reactives = {}
    reactives["viewPort"] = null
    return reactives
}

const prepareApp = async (modules, reactives) => {
    await Promise.all([
        modules.app.controls.scroll.init(reactives, modules.level.helpers)
    ])
}

const init = async () => {
    document.body.style.overflow = "hidden"
    const reactives = addReactives()
    const modules = await importModules()
    console.log(modules)
    await prepareApp(modules, reactives)
}

init()