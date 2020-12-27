import { Component, OnInit } from '@angular/core';
import { NewSecret } from '../model/new-secret';
import { Share } from '../model/share';
import { RpcService } from '../service/rpc.service';
import { copy } from '../copy-to-clipboard';

@Component({
    selector: 'app-seal',
    templateUrl: './seal.component.html',
    styleUrls: ['./seal.component.scss'],
})
export class SealComponent implements OnInit {
    secret: NewSecret | undefined;
    shares: Share[] | undefined;
    lock = false;

    constructor(private rpc: RpcService) {
        this.cleanup();
    }

    ngOnInit(): void {}

    async create() {
        this.lock = true;
        this.shares = (await this.rpc.call('Secret.Seal', this.secret)).map((s: string) => {
            return {
                copied: false,
                hash: s,
            };
        });
    }

    copy(i: number) {
        if (!this.shares) {
            return;
        }

        const share = this.shares[i];
        if (!share) {
            return;
        }

        share.copied = true;
        copy(share.hash);
    }

    copyMarkdown(i: number) {
        if (!this.shares || !this.secret) {
            return;
        }

        const share = this.shares[i];
        if (!share) {
            return;
        }

        share.copied = true;

        const message = `Hello, I share with you my secret *${this.secret.Name}*.
To unseal the secret it is required to collect *${this.secret.KeepersRequired}* shares.
Here is your share:
\`${share.hash}\`
To start unsealing visit \`${location.origin}/unseal\`.`;

        copy(message);
    }

    cleanup() {
        this.secret = {
            Name: '',
            Secret: '',
            KeepersNum: 5,
            KeepersRequired: 3,
        };

        this.shares = undefined;
        this.lock = false;
    }
}
