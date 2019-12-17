import { Injectable } from '@angular/core';
import { AuthData } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
// import { Token } from '@angular/compiler/src/ml_parser/lexer';
@Injectable({providedIn: 'root'})
export class AuthService {
    isAuthenticated = false;
    private userId: string;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router) {}
    getToken() {
        return this.token;
    }
    getAuth() {
        return this.isAuthenticated;
    }
    getUserId() {
        return this.userId;
    }
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
    login(Username: string, Password: string) {
        const loginData: AuthData = { username: Username, password: Password};
        this.http.post<{token: string, expiresIn: number, userId: string}>('http://localhost:4000/api/login', loginData)
        .subscribe((response) => {
            // console.log(response);
            const token = response.token;
            this.token = token;
            if (token) {
                const expiresIndur = response.expiresIn;
                this.setAuthTimer(expiresIndur);
                this.isAuthenticated = true;
                this.userId = response.userId;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresIndur * 1000);
                console.log(expirationDate);
                this.saveAuthData(token, expirationDate, this.userId);
                this.router.navigate(['/']);
            }
        });
    }
    autoAutUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.Token;
            this.userId = authInformation.userId;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }

    }
    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }
    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
    private saveAuthData(token: string, expirationDate: Date, UserId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('UserId', UserId);
    }
    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('UserId');
    }
    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const UserId = localStorage.getItem('UserId');
        if (!token || !expirationDate) {
            return;
        }
        return {
            Token: token,
            expirationDate: new Date(expirationDate),
            userId: UserId
        };
    }
}

