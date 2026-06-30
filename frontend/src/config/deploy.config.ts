export const isProduction = import.meta.env.PROD

export const setBaseUrl = (platformName: "render" | "github") => {
    if (platformName === "render") return "/"
    if (platformName === "github") return import.meta.env.BASE_URL
}