import { createCookie } from "@remix-run/node";
export const SESH = createCookie("$SESH", {
    maxAge: 3600,
    path: "/tools/ftp"
})
export const G_AUTH = createCookie("G_AUTH", {
    path: "/tools/ftp"
}
);