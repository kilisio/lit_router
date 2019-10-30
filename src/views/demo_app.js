import { LitElement, html } from 'lit-element';
import { router } from '../lib/router.js';

class demo_app extends LitElement {

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
                <route-link href="/">Home</route-link>
                <route-link href="/info">Info</route-link>
                <route-link href="/user/14">user 14</route-link>
                <route-link href="/user/16">user 16</route-link>
                <route-link href="/user/23/blahblahblah">not found</route-link>
            </nav>
            <route-slot route='${this.route}'>
                <div slot='home'>Home</div>
                <div slot='info'>Info</div>
                <div slot='user'>User ${this.params.id}</div>
                <div slot='not-authorized'>Not Authorized</div>
                <div slot='not-found'>Not Found</div>
            </route-slot>
        `;
    }
}

customElements.define('demo-app', demo_app);
