const iface = {
    section1: "./iface/section1.js"
}

const controls = {
    scroll: "./controls/scroll.js",
    section1: "./controls/section1.js"
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