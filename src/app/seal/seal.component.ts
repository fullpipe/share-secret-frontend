import { Component, OnInit } from '@angular/core';
import { RpcService } from '../service/rpc.service';

@Component({
    selector: 'app-seal',
    templateUrl: './seal.component.html',
    styleUrls: ['./seal.component.scss'],
})
export class SealComponent implements OnInit {
    secret: NewSecret = {
        Name: 'qwe',
        Secret: '',
        KeepersNum: 5,
        KeepersRequired: 3,
    };

    shares: Share[] | undefined;

    lock = false;
    constructor(private rpc: RpcService) {}

    ngOnInit(): void {}

    async create() {
        this.lock = true;
        this.shares = (await this.rpc.call('Secret.Seal', this.secret)).map((s: string) => {
            return {
                copied: false,
                hash: s,
            };
        });

        console.log(this.shares);
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
        if (!this.shares) {
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
To start unsealing visit \`/unseal\`.`;

        copy(message);
    }
}

interface Share {
    copied: boolean;
    hash: string;
}

interface NewSecret {
    Name: string;
    Secret: string;
    KeepersNum: number;
    KeepersRequired: number;
}

function copy(text: string) {
    const copyBox = document.createElement('textarea');
    copyBox.style.position = 'fixed';
    copyBox.style.left = '0';
    copyBox.style.top = '0';
    copyBox.style.opacity = '0';
    copyBox.readOnly = true;
    copyBox.value = text;
    document.body.appendChild(copyBox);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(copyBox);

        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        copyBox.setSelectionRange(0, 999999);
    } else {
        copyBox.focus();
        copyBox.select();
    }

    document.execCommand('copy');
    document.body.removeChild(copyBox);
}
