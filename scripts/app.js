const iface = {
    section1: "./iface/section1.js"
}

const controls = {
    components: "./controls/components.js",
    scroll: "./controls/scroll.js"
}

const getModules = async (modules) => {
    return Object.fromEntries(await Promise.all(
        Object.entries(modules).map(async ([key, value]) => [key, await import(value)])

    ))
}

export const init = async () => {
    const modules = { iface, controls }
    return Object.fromEntries(await Promise.all(
        Object.entries(modules).map(async ([key, value]) => [key, await getModules(value)])
    ))
}