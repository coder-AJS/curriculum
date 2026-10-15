const levelVersion = "2d4cfe1c1523757f89fa36ae3b3c729541c2167b"
const serverUrl = `https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}`

const getHelpers = async () => {
    const mods = await Promise.all([
        import(`${serverUrl}/helpers/reactive.js`).then(mod => ["reactive", mod]),
        import(`${serverUrl}/helpers/tempo.js`).then(mod => ["tempo", mod]),
        import(`${serverUrl}/helpers/viewPort.js`).then(mod => ["viewPort", mod])
    ])
    return Object.fromEntries(mods)
}

const getComponents = async () => {
    const mods = await Promise.all([
        import(`${serverUrl}/components/circularProgressCard.js`).then(mod => ["statCard", mod]),
    ])
    return Object.fromEntries(mods)
}


export const init = async () => {
    const [helpers, components] = await Promise.all([
        getHelpers(),
        getComponents(),
    ])

    return {
        "helpers" : helpers,
        "components": components,
    }
}