export const getModules = async (modules) => {
    await Promise.all(Object.entries(modules).map(([key, value]) => import(value).then(mod => { modules[key] = mod })))
}
