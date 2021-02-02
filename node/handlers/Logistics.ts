async function getInventoryBySKU(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
            route: { params },
        },
        clients: { logistics },
    } = ctx;
    const { id } = params;
    ctx.status = 200;
    await logistics
        .getInventoryBySKU(id as string)
        .then((response) => {
            ctx.status = 200;
            ctx.body = {
                SellerId: response?.SellerId,
                Name: response?.Name,
                Email: response?.Email,
                Description: response?.Description,
                ExchangeReturnPolicy: response?.ExchangeReturnPolicy,
                DeliveryPolicy: response?.DeliveryPolicy,
                UrlLogo: response?.UrlLogo,
                SellerType: response?.SellerType,
            };
        })
        .catch((error) => {
            console.log('error ', error);
            ctx.status = 400;
            ctx.body = {
                error: 'Internal error data could not be retrieved',
            };
        });
    ctx.set('cache-control', 'no-cache');
    await next();
}

async function getPickupPointById(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
            route: { params },
        },
        clients: { logistics },
    } = ctx;
    const { id } = params;
    ctx.status = 200;
    await logistics
        .getPickupPointById(id as string)
        .then((response) => {
            ctx.status = 200;
            ctx.body = {
                SellerId: response?.SellerId,
                Name: response?.Name,
                Email: response?.Email,
                Description: response?.Description,
                ExchangeReturnPolicy: response?.ExchangeReturnPolicy,
                DeliveryPolicy: response?.DeliveryPolicy,
                UrlLogo: response?.UrlLogo,
                SellerType: response?.SellerType,
            };
        })
        .catch((error) => {
            console.log('error ', error);
            ctx.status = 400;
            ctx.body = {
                error: 'Internal error data could not be retrieved',
            };
        });
    ctx.set('cache-control', 'no-cache');
    await next();
}

async function getListPickupPoint(ctx: Context, next: () => Promise<any>) {
    const { clients: { logistics } } = ctx;
    ctx.status = 200;
    await logistics
        .getListPickupPoint()
        .then((response) => {
            ctx.status = 200;
            ctx.body = {
                SellerId: response?.SellerId,
                Name: response?.Name,
                Email: response?.Email,
                Description: response?.Description,
                ExchangeReturnPolicy: response?.ExchangeReturnPolicy,
                DeliveryPolicy: response?.DeliveryPolicy,
                UrlLogo: response?.UrlLogo,
                SellerType: response?.SellerType,
            };
        })
        .catch((error) => {
            console.log('error ', error);
            ctx.status = 400;
            ctx.body = {
                error: 'Internal error data could not be retrieved',
            };
        });
    ctx.set('cache-control', 'no-cache');
    await next();
}

async function getWarehouseById(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
            route: { params },
        },
        clients: { logistics },
    } = ctx;
    const { id } = params;
    ctx.status = 200;
    await logistics
        .getWarehouseById(id as string)
        .then((response) => {
            ctx.status = 200;
            ctx.body = {
                SellerId: response?.SellerId,
                Name: response?.Name,
                Email: response?.Email,
                Description: response?.Description,
                ExchangeReturnPolicy: response?.ExchangeReturnPolicy,
                DeliveryPolicy: response?.DeliveryPolicy,
                UrlLogo: response?.UrlLogo,
                SellerType: response?.SellerType,
            };
        })
        .catch((error) => {
            console.log('error ', error);
            ctx.status = 400;
            ctx.body = {
                error: 'Internal error data could not be retrieved',
            };
        });
    ctx.set('cache-control', 'no-cache');
    await next();
}

export default { getInventoryBySKU, getPickupPointById, getListPickupPoint, getWarehouseById }