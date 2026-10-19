const levelVersion = "24f6f9d2ce7222cefe0394d0aae9f8999871c987"
const serverUrl = `https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}`

const helpers = {
    dom: `${serverUrl}/helpers/dom.js`,
    reactive: `${serverUrl}/helpers/reactive.js`,
    tempo: `${serverUrl}/helpers/tempo.js`
}

const components = {
    statCard: `${serverUrl}/components/avancedProgressCard001.js`,
    statCard: `./../card.js`,
}

const getModules = async (modules) => {
    return Object.fromEntries(await Promise.all(
        Object.entries(modules).map(async ([key, value]) => [key, await import(value)])
    ))
}

export const init = async () => {
    const modules = { helpers, components }
    return Object.fromEntries(await Promise.all(
        Object.entries(modules).map(async ([key, value]) => [key, await getModules(value)])
    ))
}