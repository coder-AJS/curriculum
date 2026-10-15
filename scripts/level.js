const levelVersion = "2d4cfe1c1523757f89fa36ae3b3c729541c2167b"
const serverUrl = `https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}`

const helpers = {
    reactive: `${serverUrl}/helpers/reactive.js`,
    tempo: `${serverUrl}/helpers/tempo.js`,
    viewPort: `${serverUrl}/helpers/viewPort.js`
}

const components = {
    statCard: `${serverUrl}/helpers/reactive.js`
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