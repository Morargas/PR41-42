import { createRemoteJWKSet, jwtVerify } from "jose";
import config from "../config.js";
import AppError from "../utils/appError.js";

const JWKS = createRemoteJWKSet(
    new URL(`${config.supabase.url}/auth/v1/.well-known/jwks.json`),
);

const ISSUER = `${config.supabase.url}/auth/v1`;
//Функция авторизации
export default async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return next(new AppError("Вы не авторизованы", 401));
    }

    const token = authHeader.slice(7).trim();
    //По токену
    try {
        const { payload } = await jwtVerify(token, JWKS, {
            issuer: ISSUER,
            audience: "authenticated",
        });

        req.user = payload;
        next(); 
    //При ошибке
    } catch (err) {
        console.error("JWT verify error:", err.message);
        return next(new AppError("Недействительный или истекший токен", 401));
    }
}
