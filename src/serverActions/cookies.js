"use server";

import { cookies } from "next/headers";

const setCookie = (name, value, options = { httpOnly: true, secure: true, sameSite: "strict" }) => {
    cookies().set(name, value, options);
}

const deleteCookie = (name) => {
    cookies().delete(name);
}

export { setCookie, deleteCookie };