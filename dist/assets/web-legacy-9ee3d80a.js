System.register(["./index-legacy-fab32188.js"],(function(e,t){"use strict";var n;return{setters:[e=>{n=e.W}],execute:function(){e("ToastWeb",class extends n{async show(e){if("undefined"!=typeof document){let t=2e3;e.duration&&(t="long"===e.duration?3500:2e3);const n=document.createElement("pwa-toast");n.duration=t,n.message=e.text,document.body.appendChild(n)}}})}}}));
