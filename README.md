
# ABOUT

<!-- ## Homepage -->


## Description
A simple and lightweight LitElement router.  
This was originally a fork of `https://github.com/hamedasemi/lit-element-router.git` before I made it a stand alone repository mainly because forked repositories do not display contributions to the profile page and I really like my profile green(preferably dark green) :laughing: .

<!-- ## Features -->


<!-- ## Core Dependancies -->


<!-- ## Inspirations -->


<!-- ## Screen Shots -->


# INSTALLATION


<!-- ## Prerequisites -->


## Install
I do not intend to publish this package to the `npm` package registry. If you have `verdaccio` installed in your system simply:

```bash
    git clone -b forked_dev https://github.com/kilisio/lit_router.git
    cd lit_router
    npm install
    npm run build
    npm run pub_lib
```

The above will publish the package to `verdaccio` if you have it configured as your default package publishing registry.  
Then simply install and add it to your lit-element script:

```bash
    npm install @kilisio/lit_router_lib
```

```javascript
    import { router, route_link, route_slot } from '@kilisio/lit_router_lib';
```

The package scope `@kilisio` may be changed in the `lib_build.config.js` script.

## Usage
```javascript
    import { LitElement, html } from 'lit-element';
    import { router, route_link, route_slot } from '@kilisio/lit_router_lib';

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
```

## Demo

```bash
    git clone -b forked_dev https://github.com/kilisio/lit_router.git
    cd lit_router
    npm install
    npm run build_app
    npm run serve_demo
```

<!-- # DOCUMENTATION -->


<!-- # CONTRIBUTION -->


<!-- ## Features, Issues and Fixes -->


<!-- ## Author -->


<!-- ## Contributors -->


<!-- ## Backers -->


<!-- ## Sponsors -->


<!-- # ATTRIBUTION -->


<!-- # SUPPORT -->


# LICENSE
This project is MIT licensed.

