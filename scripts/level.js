const levelVersion = "a64392dba26f71998e39d4ec4c33ada8833b3416"
const serverUrl = `https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}`

const helpers = {
    reactive: `${serverUrl}/helpers/reactive.js`,
    tempo: `${serverUrl}/helpers/tempo.js`
}

const components = {
/*     statCard: `${serverUrl}/components/circularProgressCard.js`
 */    statCard: "./../card.js"
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