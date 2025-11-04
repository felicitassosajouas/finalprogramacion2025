import axios from "axios";

const API = import.meta.env.VITE_API_URL;


export async function login(email: string, password: string) {
    const { data } = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem("token", data.accessToken);
    return data;
}

// Registrarse
export async function register(fullname: string, email: string, password: string) {
    const { data } = await axios.post(`${API}/auth/register`, {
        fullname,
        email,
        password,
    });
    return data;
}

// Ruta privada
export async function getProfile() {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${API}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}
export async function getAuthMe() {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${API}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}
