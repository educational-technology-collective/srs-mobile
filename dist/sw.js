if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const u=s=>l(s,r),t={module:{uri:r},exports:a,require:u};e[r]=Promise.all(i.map((s=>t[s]||u(s)))).then((s=>(n(...s),a)))}}define(["./workbox-fa446783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/focus-visible-9c13edeb.js",revision:null},{url:"assets/focus-visible-legacy-b3e947fe.js",revision:null},{url:"assets/hardware-back-button-77fd2980.js",revision:null},{url:"assets/hardware-back-button-legacy-7391e573.js",revision:null},{url:"assets/index-3a4e1ffd.css",revision:null},{url:"assets/index-dbe83307.js",revision:null},{url:"assets/index-legacy-eb823dca.js",revision:null},{url:"assets/index9-0c0dea80.js",revision:null},{url:"assets/index9-legacy-35b2838d.js",revision:null},{url:"assets/input-shims-3ca98bac.js",revision:null},{url:"assets/input-shims-legacy-736ff496.js",revision:null},{url:"assets/ios.transition-e2e17564.js",revision:null},{url:"assets/ios.transition-legacy-e6821297.js",revision:null},{url:"assets/keyboard2-398e3344.js",revision:null},{url:"assets/keyboard2-legacy-6d7130f0.js",revision:null},{url:"assets/md.transition-73006ed2.js",revision:null},{url:"assets/md.transition-legacy-b95d0005.js",revision:null},{url:"assets/polyfills-legacy-a51acb07.js",revision:null},{url:"assets/status-tap-a15f6119.js",revision:null},{url:"assets/status-tap-legacy-defb2f09.js",revision:null},{url:"assets/swipe-back-54fe1d1d.js",revision:null},{url:"assets/swipe-back-legacy-daa6ee0f.js",revision:null},{url:"assets/web-83b82eb3.js",revision:null},{url:"assets/web-8702f21a.js",revision:null},{url:"assets/web-fcaf0a35.js",revision:null},{url:"assets/web-legacy-4867b64d.js",revision:null},{url:"assets/web-legacy-ed15bd15.js",revision:null},{url:"assets/web-legacy-f5f5e7a9.js",revision:null},{url:"index.html",revision:"d511757694aa460a9104d27ab2b3d6f6"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"025802405221653609315f47d520050b"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
