import { Injectable } from '@angular/core';
import {Request } from './request.model';
import { Subject, from } from 'rxjs';
import {HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { del } from 'selenium-webdriver/http';
import { stringify } from 'querystring';

@Injectable({providedIn: 'root'})
export class RequestsService {
    private requests: Request[] = [];
    private requestUpdated = new Subject<{requests: Request[]}>();

    constructor(private http: HttpClient, private router: Router) {}
    getRequests() {
        this.http.get<{message: string, requests: any}>('http://localhost:4000/api/lrequest')
            .pipe(map(requestData => {
                return {requests: requestData.requests.map(request => {
                    return {
                        id: request._id,
                        FirstName: request.FirstName,
                        LastName: request.LastName,
                        Telephone: request.Telephone,
                        Address: request.Address,
                        email: request.email,
                        UserName: request.Username,
                        Password: request.Password
                    };
                })};
            }))
        .subscribe(transformedrequestsdata => {
            this.requests = transformedrequestsdata.requests;
            this.requestUpdated.next({requests: [...this.requests]});
            console.log(transformedrequestsdata);
        });
    }
    getHouseUpdateListener() {
        return this.requestUpdated.asObservable();
    }
    addRequest(firstName: string, lastName: string, telephone: number, address: string, email: string, UserName: string, PassWord: string) {
    const request: Request = {id: null, FirstName: firstName, LastName: lastName, Telephone: telephone,
        Address: address, Email: email,  Username: UserName, Password: PassWord };
    console.log(request);
    this.http.post<{message: string, request: any}>('http://localhost:4000/api/crequest', request)
       .subscribe(responseData => {
        //    console.log(responseData);
           this.router.navigate(['/']);
       });
    }
    getRequest(id: string) {
        // tslint:disable-next-line: max-line-length
        this.http.get<{message: string, request: any}>('http://localhost:4000/api/request/' + id)
        .subscribe(requestData => {
            console.log(requestData);
            const signData = {
                        firstName: requestData.request.FirstName,
                        lastName: requestData.request.LastName,
                        email: requestData.request.email,
                        username: requestData.request.Username,
                        password: requestData.request.Password

                    };
            console.log(signData);
            this.http.post<{message: string}>('http://localhost:4000/api/sign', signData )
                    .subscribe(responData => {
                        this.http.delete('http://localhost:4000/api/requestDel/' + id)
                        .subscribe(delData => {
                            console.log(delData);
                        });
                        this.router.navigate(['/']);
                    });
                });
                }
    }
