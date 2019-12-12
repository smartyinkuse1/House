import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestsService } from '../requests.service';
import { Request } from '../request.model';
import { SignUp } from '../requestData.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-request-list',
    templateUrl: './requests-list.component.html',
    styleUrls: ['./requests-list.componenet.css']
})
export class RequestListComponent implements OnInit, OnDestroy {
    requests: Request[] = [];
    request: Request;
    requestSub: Subscription;
    requestId: string;
    public mode = 'request';
    public RequestData: SignUp[] = [];
    constructor(public requestServices: RequestsService, public route: ActivatedRoute) {
    }
    ngOnInit() {

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('requestId')) {
                this.mode = 'view';
                this.requestId = paramMap.get('requestId');
            } else {
                this.mode = 'request';
                this.requestId = null;
            }
        });
        if (this.mode === 'view') {
            this.requestServices.getRequest(this.requestId);
        } else {
            this.requestServices.getRequests();
            this.requestSub = this.requestServices.getHouseUpdateListener()
            .subscribe((requestData: {requests: Request[]}) => {
                this.requests = requestData.requests;
            });
        }

    }
    ngOnDestroy() {
        if (this.mode === 'request') {
            this.requestSub.unsubscribe();
        }
    }
}
