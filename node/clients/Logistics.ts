import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api';

export class Logistics extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`http://${context.account}.vtexcommercestable.com.br`, context, {
            ...(options ?? {}),
            headers: {
                ...(options?.headers ?? {}),
                'Content-Type': 'application/json; charset=utf-8',
                VtexIdclientAutCookie: context.authToken,
                'X-Vtex-Use-Https': 'true',
            },
        });
    }

    public getInventoryBySKU(id: string | number) {
        return this.http.get(`/api/logistics/pvt/inventory/skus/${id}`, {
            metric: 'getInventoryBySKU',
        });
    }

    public getPickupPointById(id: string | number) {
        return this.http.get(`/api/logistics/pvt/configuration/pickuppoints/${id}`, {
            metric: 'getPickupPointById',
        });
    }

    public getListPickupPoint() {
        return this.http.get('/api/logistics/pvt/configuration/pickuppoints/', {
            metric: 'getListPickupPoint',
        });
    }

    public getWarehouseById(id: string | number) {
        return this.http.get(`/api/logistics/pvt/configuration/warehouses/${id}`, {
            metric: 'getWarehouseById',
        });
    }
}
