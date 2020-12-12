import { Injectable } from '@angular/core';
import { RpcClient } from 'js-json-rpc-client';
import { FetchTransport } from 'js-json-rpc-client';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RpcService {
    private client: RpcClient;

    constructor() {
        this.client = new RpcClient(
            new FetchTransport({
                url: environment.api,
                retryConfig: {
                    maxRetryAttempts: 1,
                    scalingDuration: 500,
                },
            }),
        );
    }

    call(method: string, params?: { [key: string]: any }) {
        return this.client.call(method, params ? [params] : []);
    }
}
