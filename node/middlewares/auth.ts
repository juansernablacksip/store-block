/**
 * permite validar que el consumo se haga directamente de una cuenta vtex y
 * no desde otro lugar como un postman u otro sitio que no sea directamente la tienda
 */
export async function auth(ctx: Context, next: () => Promise<any>) {
    const cookie = ctx.headers?.cookie;
    let auth;
    if (cookie == null) {
        ctx.status = 401;
        ctx.body = {
            error: 'Failed to authenticate',
        };
        return;
    } else {
        const values = cookie.split(';');
        values.map((item: string) => {
            const split = item.split('=');
            const key = split[0].trim();
            if (key == 'VtexIdclientAutCookie') {
                auth = split[1].trim();
            }
        });
        if (auth == null) {
            ctx.status = 401;
            ctx.body = {
                error: 'Failed to authenticate',
            };
            return;
        }
        /*
    se asigna desde el que llega del front, para garantizar que es un consumo legitimo
    el valor ctx.vtex.authToken es generado de forma automatica por el middelware en cada
    solicitud
    */
        ctx.vtex.authToken = auth;
    }
    await next();
}
