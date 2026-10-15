const levelVersion = "c95be6712cb4a6dc40a68a4eea6f90b1ddfd84c0"
const serverUrl = `https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}`

const helpers = {
    reactive: `${serverUrl}/helpers/reactive.js`,
    tempo: `${serverUrl}/helpers/tempo.js`,
    viewPort: `${serverUrl}/helpers/viewPort.js`
}

const components = {
    statCard: `${serverUrl}/components/circularProgressCard.js`
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