System.register(["./index-legacy-43e80283.js"],(function(s,e){"use strict";var n;return{setters:[s=>{n=s.W}],execute:function(){class e extends n{constructor(){super(),this._lastWindow=null}async open(s){this._lastWindow=window.open(s.url,s.windowName||"_blank")}async close(){return new Promise(((s,e)=>{null!=this._lastWindow?(this._lastWindow.close(),this._lastWindow=null,s()):e("No active window to close!")}))}}s("BrowserWeb",e),s("Browser",new e)}}}));
