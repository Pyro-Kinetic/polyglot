const BASE_URL = import.meta.env.BASE_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TRANSLATE = `${API_BASE_URL}/translate`

export const env = {
    BASE_URL,
    API_BASE_URL,
    TRANSLATE
}
