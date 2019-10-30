import { LitElement, html } from 'lit-element';
import { router } from './router/router.js';

class MyApp extends LitElement {

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object }
        };
    }

    constructor() {
        super();
        this.route = '';
        this.params = {};
        router(
            [
                {
                    name: 'home',
                    pattern: '',
                    callback: (route, params, query)=>{ 
                        console.log('callback', route, params, query);
                    },
                    guard: () => { 
                        return true; 
                    }
                }, 
                {
                    name: 'info',
                    pattern: 'info'
                }, 
                {
                    name: 'user',
                    pattern: 'user/:id',
                    guard: () => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(true);
                            }, 1000);
                        });
                    }
                }, 
                {
                    name: 'not-found',
                    pattern: '*'
                }
            ], 
            (route, params, query, data) => {
                this.route = route;
                this.params = params;
                console.log(route, params, query, data);
            }
        );
    }

    render() {
        return html`
            <nav>
                <route-link href="/">Home</router-link>
                <route-link href="/info"><span>Info</span></router-link>
                <route-link href="/user/14">user/14</router-link>
                <route-link href="/user/16">user/16</router-link>
                <route-link href="/user/16/not/found">user/16/not/found</router-link>
            </nav>
            <router-slot route='${this.route}'>
                <div slot='home'>Home</div>
                <div slot='info'>Info</div>
                <div slot='user'>User ${this.params.id}</div>
                <div slot='not-authorized'>Not Authorized</div>
                <div slot='not-found'>Not Found</div>
            </router-slot>
        `;
    }
}

customElements.define('my-app', MyApp);
