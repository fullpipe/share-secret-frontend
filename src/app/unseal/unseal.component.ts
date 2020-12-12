import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, throwError, timer } from 'rxjs';
import { catchError, delay, filter, retryWhen, shareReplay, switchMap, tap } from 'rxjs/operators';
import { copy } from '../copy-to-clipboard';
import { RpcService } from '../service/rpc.service';

@Component({
    selector: 'app-unseal',
    templateUrl: './unseal.component.html',
    styleUrls: ['./unseal.component.scss'],
})
export class UnsealComponent implements OnDestroy {
    id: string | undefined;
    share: string | undefined;
    secret: string | undefined;

    lock = false;
    waitingForOthers = false;

    secondsLeft: number | undefined;
    timer = new Subject();
    resendShare = new Subject();
    subscription = new Subscription();

    constructor(private location: Location, private activeRoute: ActivatedRoute, private rpc: RpcService) {
        this.activeRoute.params.pipe(filter((p) => p.id)).subscribe(({ id }) => {
            this.id = id;
        });

        this.subscription.add(
            this.timer
                .pipe(
                    tap((_) => (this.secondsLeft = 10 * 60)),
                    switchMap((_) => timer(0, 1000)),
                )
                .subscribe((_) => {
                    if (this.secondsLeft) this.secondsLeft--;
                }),
        );

        this.subscription.add(
            this.resendShare
                .pipe(
                    filter((_) => !!this.share),
                    shareReplay(),
                    switchMap((_) => this.rpc.call('Secret.Unseal', { Share: this.share })),
                    catchError((e) => {
                        this.waitingForOthers = true;

                        return throwError(e);
                    }),
                    retryWhen((errors) =>
                        errors.pipe(
                            // tap((val) => console.log('error', val)),
                            delay(2000),
                        ),
                    ),
                    filter((secret) => !!secret),
                )
                .subscribe((secret: string) => {
                    this.subscription.unsubscribe();
                    this.secret = secret;
                }),
        );
    }

    async start() {
        this.lock = true;
        this.id = await this.rpc.call('Secret.StartUnseal');

        this.location.go(`/unseal/${this.id}`);

        this.timer.next();
        this.lock = false;
    }

    get link() {
        return location.href;
    }

    copyLink() {
        copy(this.link);
    }

    copySecret() {
        copy(this.secret || '');
    }

    async unseal() {
        this.lock = true;

        this.resendShare.next();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
