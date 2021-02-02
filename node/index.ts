import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api';
import { LRUCache, method, Service } from '@vtex/api';

import { Clients } from './clients';
import { getSellerById } from './handlers/catalog';
import logistics from './handlers/Logistics';

import { auth } from './middlewares/auth';

const { getInventoryBySKU, getPickupPointById, getListPickupPoint, getWarehouseById } = logistics

const TIMEOUT_MS = 800;

const memoryCache = new LRUCache<string, any>({ max: 5000 });

metrics.trackCache('status', memoryCache);

const clients: ClientsConfig<Clients> = {
    implementation: Clients,
    options: {
        default: {
            retries: 2,
            timeout: TIMEOUT_MS,
        },
        status: {
            memoryCache,
        },
    },
};

declare global {
    type Context = ServiceContext<Clients, State>;
    interface State extends RecorderState {}
}

export default new Service({
    clients,
    routes: {
        seller: method({
            GET: [auth, getSellerById],
        }),
        inventory: method({
            GET: [auth, getInventoryBySKU],
        }),
        pickupPoint: method({
            GET: [auth, getPickupPointById],
        }),
        pickupPoints: method({
            GET: [auth, getListPickupPoint],
        }),
        warehouse: method({
            GET: [auth, getWarehouseById],
        }),
    },
});
