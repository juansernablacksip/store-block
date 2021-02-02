import { IOClients } from '@vtex/api';

import { Logistics } from './logistics';

export class Clients extends IOClients {
    public get logistics() {
        return this.getOrSet('logistics', Logistics);
    }
}
