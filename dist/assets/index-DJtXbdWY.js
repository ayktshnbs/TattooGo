var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.provider`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.iterator;function p(e){return typeof e!=`object`||!e?null:(e=f&&e[f]||e[`@@iterator`],typeof e==`function`?e:null)}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h=Object.assign,g={};function _(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`setState(...): takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function v(){}v.prototype=_.prototype;function y(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}var b=y.prototype=new v;b.constructor=y,h(b,_.prototype),b.isPureReactComponent=!0;var x=Array.isArray,S=Object.prototype.hasOwnProperty,C={current:null},w={key:!0,ref:!0,__self:!0,__source:!0};function T(e,n,r){var i,a={},o=null,s=null;if(n!=null)for(i in n.ref!==void 0&&(s=n.ref),n.key!==void 0&&(o=``+n.key),n)S.call(n,i)&&!w.hasOwnProperty(i)&&(a[i]=n[i]);var c=arguments.length-2;if(c===1)a.children=r;else if(1<c){for(var l=Array(c),u=0;u<c;u++)l[u]=arguments[u+2];a.children=l}if(e&&e.defaultProps)for(i in c=e.defaultProps,c)a[i]===void 0&&(a[i]=c[i]);return{$$typeof:t,type:e,key:o,ref:s,props:a,_owner:C.current}}function E(e,n){return{$$typeof:t,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function O(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var k=/\/+/g;function A(e,t){return typeof e==`object`&&e&&e.key!=null?O(``+e.key):t.toString(36)}function ee(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0}}if(c)return c=e,o=o(c),e=a===``?`.`+A(c,0):a,x(o)?(i=``,e!=null&&(i=e.replace(k,`$&/`)+`/`),ee(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=E(o,i+(!o.key||c&&c.key===o.key?``:(``+o.key).replace(k,`$&/`)+`/`)+e)),r.push(o)),1;if(c=0,a=a===``?`.`:a+`:`,x(e))for(var l=0;l<e.length;l++){s=e[l];var u=a+A(s,l);c+=ee(s,r,i,u,o)}else if(u=p(e),typeof u==`function`)for(e=u.call(e),l=0;!(s=e.next()).done;)s=s.value,u=a+A(s,l++),c+=ee(s,r,i,u,o);else if(s===`object`)throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`);return c}function te(e,t,n){if(e==null)return e;var r=[],i=0;return ee(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function j(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var M={current:null},N={transition:null},ne={ReactCurrentDispatcher:M,ReactCurrentBatchConfig:N,ReactCurrentOwner:C};function re(){throw Error(`act(...) is not supported in production builds of React.`)}e.Children={map:te,forEach:function(e,t,n){te(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return te(e,function(){t++}),t},toArray:function(e){return te(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}},e.Component=_,e.Fragment=r,e.Profiler=a,e.PureComponent=y,e.StrictMode=i,e.Suspense=l,e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ne,e.act=re,e.cloneElement=function(e,n,r){if(e==null)throw Error(`React.cloneElement(...): The argument must be a React element, but you passed `+e+`.`);var i=h({},e.props),a=e.key,o=e.ref,s=e._owner;if(n!=null){if(n.ref!==void 0&&(o=n.ref,s=C.current),n.key!==void 0&&(a=``+n.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in n)S.call(n,l)&&!w.hasOwnProperty(l)&&(i[l]=n[l]===void 0&&c!==void 0?c[l]:n[l])}var l=arguments.length-2;if(l===1)i.children=r;else if(1<l){c=Array(l);for(var u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}return{$$typeof:t,type:e.type,key:a,ref:o,props:i,_owner:s}},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:o,_context:e},e.Consumer=e},e.createElement=T,e.createFactory=function(e){var t=T.bind(null,e);return t.type=e,t},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:j}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=N.transition;N.transition={};try{e()}finally{N.transition=t}},e.unstable_act=re,e.useCallback=function(e,t){return M.current.useCallback(e,t)},e.useContext=function(e){return M.current.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e){return M.current.useDeferredValue(e)},e.useEffect=function(e,t){return M.current.useEffect(e,t)},e.useId=function(){return M.current.useId()},e.useImperativeHandle=function(e,t,n){return M.current.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return M.current.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return M.current.useLayoutEffect(e,t)},e.useMemo=function(e,t){return M.current.useMemo(e,t)},e.useReducer=function(e,t,n){return M.current.useReducer(e,t,n)},e.useRef=function(e){return M.current.useRef(e)},e.useState=function(e){return M.current.useState(e)},e.useSyncExternalStore=function(e,t,n){return M.current.useSyncExternalStore(e,t,n)},e.useTransition=function(){return M.current.useTransition()},e.version=`18.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=typeof setTimeout==`function`?setTimeout:null,_=typeof clearTimeout==`function`?clearTimeout:null,v=typeof setImmediate<`u`?setImmediate:null;typeof navigator<`u`&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function b(e){if(h=!1,y(e),!m)if(n(c)!==null)m=!0,te(x);else{var t=n(l);t!==null&&j(b,t.startTime-e)}}function x(t,i){m=!1,h&&(h=!1,_(w),w=-1),p=!0;var a=f;try{for(y(i),d=n(c);d!==null&&(!(d.expirationTime>i)||t&&!D());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=i);i=e.unstable_now(),typeof s==`function`?d.callback=s:d===n(c)&&r(c),y(i)}else r(c);d=n(c)}if(d!==null)var u=!0;else{var g=n(l);g!==null&&j(b,g.startTime-i),u=!1}return u}finally{d=null,f=a,p=!1}}var S=!1,C=null,w=-1,T=5,E=-1;function D(){return!(e.unstable_now()-E<T)}function O(){if(C!==null){var t=e.unstable_now();E=t;var n=!0;try{n=C(!0,t)}finally{n?k():(S=!1,C=null)}}else S=!1}var k;if(typeof v==`function`)k=function(){v(O)};else if(typeof MessageChannel<`u`){var A=new MessageChannel,ee=A.port2;A.port1.onmessage=O,k=function(){ee.postMessage(null)}}else k=function(){g(O,0)};function te(e){C=e,S||(S=!0,k())}function j(t,n){w=g(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_continueExecution=function(){m||p||(m=!0,te(x))},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):T=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(_(w),w=-1):h=!0,j(b,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,te(x))),r},e.unstable_shouldYield=D,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u(),n=f();function r(e){for(var t=`https://reactjs.org/docs/error-decoder.html?invariant=`+e,n=1;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n]);return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}var i=new Set,a={};function o(e,t){s(e,t),s(e+`Capture`,t)}function s(e,t){for(a[e]=t,e=0;e<t.length;e++)i.add(t[e])}var c=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),l=Object.prototype.hasOwnProperty,d=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p={},m={};function h(e){return l.call(m,e)?!0:l.call(p,e)?!1:d.test(e)?m[e]=!0:(p[e]=!0,!1)}function g(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case`function`:case`symbol`:return!0;case`boolean`:return r?!1:n===null?(e=e.toLowerCase().slice(0,5),e!==`data-`&&e!==`aria-`):!n.acceptsBooleans;default:return!1}}function _(e,t,n,r){if(t==null||g(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function v(e,t,n,r,i,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var y={};`children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style`.split(` `).forEach(function(e){y[e]=new v(e,0,!1,e,null,!1,!1)}),[[`acceptCharset`,`accept-charset`],[`className`,`class`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`]].forEach(function(e){var t=e[0];y[t]=new v(t,1,!1,e[1],null,!1,!1)}),[`contentEditable`,`draggable`,`spellCheck`,`value`].forEach(function(e){y[e]=new v(e,2,!1,e.toLowerCase(),null,!1,!1)}),[`autoReverse`,`externalResourcesRequired`,`focusable`,`preserveAlpha`].forEach(function(e){y[e]=new v(e,2,!1,e,null,!1,!1)}),`allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope`.split(` `).forEach(function(e){y[e]=new v(e,3,!1,e.toLowerCase(),null,!1,!1)}),[`checked`,`multiple`,`muted`,`selected`].forEach(function(e){y[e]=new v(e,3,!0,e,null,!1,!1)}),[`capture`,`download`].forEach(function(e){y[e]=new v(e,4,!1,e,null,!1,!1)}),[`cols`,`rows`,`size`,`span`].forEach(function(e){y[e]=new v(e,6,!1,e,null,!1,!1)}),[`rowSpan`,`start`].forEach(function(e){y[e]=new v(e,5,!1,e.toLowerCase(),null,!1,!1)});var b=/[\-:]([a-z])/g;function x(e){return e[1].toUpperCase()}`accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height`.split(` `).forEach(function(e){var t=e.replace(b,x);y[t]=new v(t,1,!1,e,null,!1,!1)}),`xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type`.split(` `).forEach(function(e){var t=e.replace(b,x);y[t]=new v(t,1,!1,e,`http://www.w3.org/1999/xlink`,!1,!1)}),[`xml:base`,`xml:lang`,`xml:space`].forEach(function(e){var t=e.replace(b,x);y[t]=new v(t,1,!1,e,`http://www.w3.org/XML/1998/namespace`,!1,!1)}),[`tabIndex`,`crossOrigin`].forEach(function(e){y[e]=new v(e,1,!1,e.toLowerCase(),null,!1,!1)}),y.xlinkHref=new v(`xlinkHref`,1,!1,`xlink:href`,`http://www.w3.org/1999/xlink`,!0,!1),[`src`,`href`,`action`,`formAction`].forEach(function(e){y[e]=new v(e,1,!1,e.toLowerCase(),null,!0,!0)});function S(e,t,n,r){var i=y.hasOwnProperty(t)?y[t]:null;(i===null?r||!(2<t.length)||t[0]!==`o`&&t[0]!==`O`||t[1]!==`n`&&t[1]!==`N`:i.type!==0)&&(_(t,n,i,r)&&(n=null),r||i===null?h(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,``+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:``:n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&!0===n?``:``+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var C=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,w=Symbol.for(`react.element`),T=Symbol.for(`react.portal`),E=Symbol.for(`react.fragment`),D=Symbol.for(`react.strict_mode`),O=Symbol.for(`react.profiler`),k=Symbol.for(`react.provider`),A=Symbol.for(`react.context`),ee=Symbol.for(`react.forward_ref`),te=Symbol.for(`react.suspense`),j=Symbol.for(`react.suspense_list`),M=Symbol.for(`react.memo`),N=Symbol.for(`react.lazy`),ne=Symbol.for(`react.offscreen`),re=Symbol.iterator;function ie(e){return typeof e!=`object`||!e?null:(e=re&&e[re]||e[`@@iterator`],typeof e==`function`?e:null)}var ae=Object.assign,oe;function se(e){if(oe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);oe=t&&t[1]||``}return`
`+oe+e}var ce=!1;function le(e,t){if(!e||ce)return``;ce=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(t,[])}catch(e){var r=e}Reflect.construct(e,[],t)}else{try{t.call()}catch(e){r=e}e.call(t.prototype)}else{try{throw Error()}catch(e){r=e}e()}}catch(t){if(t&&r&&typeof t.stack==`string`){for(var i=t.stack.split(`
`),a=r.stack.split(`
`),o=i.length-1,s=a.length-1;1<=o&&0<=s&&i[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(i[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||i[o]!==a[s]){var c=`
`+i[o].replace(` at new `,` at `);return e.displayName&&c.includes(`<anonymous>`)&&(c=c.replace(`<anonymous>`,e.displayName)),c}while(1<=o&&0<=s);break}}}finally{ce=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:``)?se(e):``}function ue(e){switch(e.tag){case 5:return se(e.type);case 16:return se(`Lazy`);case 13:return se(`Suspense`);case 19:return se(`SuspenseList`);case 0:case 2:case 15:return e=le(e.type,!1),e;case 11:return e=le(e.type.render,!1),e;case 1:return e=le(e.type,!0),e;default:return``}}function de(e){if(e==null)return null;if(typeof e==`function`)return e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case E:return`Fragment`;case T:return`Portal`;case O:return`Profiler`;case D:return`StrictMode`;case te:return`Suspense`;case j:return`SuspenseList`}if(typeof e==`object`)switch(e.$$typeof){case A:return(e.displayName||`Context`)+`.Consumer`;case k:return(e._context.displayName||`Context`)+`.Provider`;case ee:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case M:return t=e.displayName||null,t===null?de(e.type)||`Memo`:t;case N:t=e._payload,e=e._init;try{return de(e(t))}catch{}}return null}function fe(e){var t=e.type;switch(e.tag){case 24:return`Cache`;case 9:return(t.displayName||`Context`)+`.Consumer`;case 10:return(t._context.displayName||`Context`)+`.Provider`;case 18:return`DehydratedFragment`;case 11:return e=t.render,e=e.displayName||e.name||``,t.displayName||(e===``?`ForwardRef`:`ForwardRef(`+e+`)`);case 7:return`Fragment`;case 5:return t;case 4:return`Portal`;case 3:return`Root`;case 6:return`Text`;case 16:return de(t);case 8:return t===D?`StrictMode`:`Mode`;case 22:return`Offscreen`;case 12:return`Profiler`;case 21:return`Scope`;case 13:return`Suspense`;case 19:return`SuspenseList`;case 25:return`TracingMarker`;case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t==`function`)return t.displayName||t.name||null;if(typeof t==`string`)return t}return null}function pe(e){switch(typeof e){case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function me(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function he(e){var t=me(e)?`checked`:`value`,n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=``+e[t];if(!e.hasOwnProperty(t)&&n!==void 0&&typeof n.get==`function`&&typeof n.set==`function`){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ge(e){e._valueTracker||=he(e)}function _e(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=me(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function ve(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function ye(e,t){var n=t.checked;return ae({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function be(e,t){var n=t.defaultValue==null?``:t.defaultValue,r=t.checked==null?t.defaultChecked:t.checked;n=pe(t.value==null?n:t.value),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type===`checkbox`||t.type===`radio`?t.checked!=null:t.value!=null}}function xe(e,t){t=t.checked,t!=null&&S(e,`checked`,t,!1)}function Se(e,t){xe(e,t);var n=pe(t.value),r=t.type;if(n!=null)r===`number`?(n===0&&e.value===``||e.value!=n)&&(e.value=``+n):e.value!==``+n&&(e.value=``+n);else if(r===`submit`||r===`reset`){e.removeAttribute(`value`);return}t.hasOwnProperty(`value`)?P(e,t.type,n):t.hasOwnProperty(`defaultValue`)&&P(e,t.type,pe(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ce(e,t,n){if(t.hasOwnProperty(`value`)||t.hasOwnProperty(`defaultValue`)){var r=t.type;if(!(r!==`submit`&&r!==`reset`||t.value!==void 0&&t.value!==null))return;t=``+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==``&&(e.name=``),e.defaultChecked=!!e._wrapperState.initialChecked,n!==``&&(e.name=n)}function P(e,t,n){(t!==`number`||ve(e.ownerDocument)!==e)&&(n==null?e.defaultValue=``+e._wrapperState.initialValue:e.defaultValue!==``+n&&(e.defaultValue=``+n))}var we=Array.isArray;function Te(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+pe(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ee(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(r(91));return ae({},t,{value:void 0,defaultValue:void 0,children:``+e._wrapperState.initialValue})}function F(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(r(92));if(we(n)){if(1<n.length)throw Error(r(93));n=n[0]}t=n}t??=``,n=t}e._wrapperState={initialValue:pe(n)}}function De(e,t){var n=pe(t.value),r=pe(t.defaultValue);n!=null&&(n=``+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=``+r)}function I(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==``&&t!==null&&(e.value=t)}function L(e){switch(e){case`svg`:return`http://www.w3.org/2000/svg`;case`math`:return`http://www.w3.org/1998/Math/MathML`;default:return`http://www.w3.org/1999/xhtml`}}function Oe(e,t){return e==null||e===`http://www.w3.org/1999/xhtml`?L(t):e===`http://www.w3.org/2000/svg`&&t===`foreignObject`?`http://www.w3.org/1999/xhtml`:e}var ke,Ae=function(e){return typeof MSApp<`u`&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!==`http://www.w3.org/2000/svg`||`innerHTML`in e)e.innerHTML=t;else{for(ke||=document.createElement(`div`),ke.innerHTML=`<svg>`+t.valueOf().toString()+`</svg>`,t=ke.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function je(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Me={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ne=[`Webkit`,`ms`,`Moz`,`O`];Object.keys(Me).forEach(function(e){Ne.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Me[t]=Me[e]})});function Pe(e,t,n){return t==null||typeof t==`boolean`||t===``?``:n||typeof t!=`number`||t===0||Me.hasOwnProperty(e)&&Me[e]?(``+t).trim():t+`px`}function Fe(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=n.indexOf(`--`)===0,i=Pe(n,t[n],r);n===`float`&&(n=`cssFloat`),r?e.setProperty(n,i):e[n]=i}}var Ie=ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Le(e,t){if(t){if(Ie[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(r(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(r(60));if(typeof t.dangerouslySetInnerHTML!=`object`||!(`__html`in t.dangerouslySetInnerHTML))throw Error(r(61))}if(t.style!=null&&typeof t.style!=`object`)throw Error(r(62))}}function Re(e,t){if(e.indexOf(`-`)===-1)return typeof t.is==`string`;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var ze=null;function Be(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ve=null,He=null,Ue=null;function We(e){if(e=Fi(e)){if(typeof Ve!=`function`)throw Error(r(280));var t=e.stateNode;t&&(t=Li(t),Ve(e.stateNode,e.type,t))}}function Ge(e){He?Ue?Ue.push(e):Ue=[e]:He=e}function Ke(){if(He){var e=He,t=Ue;if(Ue=He=null,We(e),t)for(e=0;e<t.length;e++)We(t[e])}}function qe(e,t){return e(t)}function Je(){}var Ye=!1;function Xe(e,t,n){if(Ye)return e(t,n);Ye=!0;try{return qe(e,t,n)}finally{Ye=!1,(He!==null||Ue!==null)&&(Je(),Ke())}}function Ze(e,t){var n=e.stateNode;if(n===null)return null;var i=Li(n);if(i===null)return null;n=i[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(i=!i.disabled)||(e=e.type,i=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!i;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(r(231,t,typeof n));return n}var Qe=!1;if(c)try{var $e={};Object.defineProperty($e,"passive",{get:function(){Qe=!0}}),window.addEventListener(`test`,$e,$e),window.removeEventListener(`test`,$e,$e)}catch{Qe=!1}function et(e,t,n,r,i,a,o,s,c){var l=Array.prototype.slice.call(arguments,3);try{t.apply(n,l)}catch(e){this.onError(e)}}var tt=!1,nt=null,rt=!1,it=null,at={onError:function(e){tt=!0,nt=e}};function ot(e,t,n,r,i,a,o,s,c){tt=!1,nt=null,et.apply(at,arguments)}function R(e,t,n,i,a,o,s,c,l){if(ot.apply(this,arguments),tt){if(tt){var u=nt;tt=!1,nt=null}else throw Error(r(198));rt||(rt=!0,it=u)}}function st(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ct(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function lt(e){if(st(e)!==e)throw Error(r(188))}function ut(e){var t=e.alternate;if(!t){if(t=st(e),t===null)throw Error(r(188));return t===e?e:null}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return lt(a),e;if(o===i)return lt(a),t;o=o.sibling}throw Error(r(188))}if(n.return!==i.return)n=a,i=o;else{for(var s=!1,c=a.child;c;){if(c===n){s=!0,n=a,i=o;break}if(c===i){s=!0,i=a,n=o;break}c=c.sibling}if(!s){for(c=o.child;c;){if(c===n){s=!0,n=o,i=a;break}if(c===i){s=!0,i=o,n=a;break}c=c.sibling}if(!s)throw Error(r(189))}}if(n.alternate!==i)throw Error(r(190))}if(n.tag!==3)throw Error(r(188));return n.stateNode.current===n?e:t}function dt(e){return e=ut(e),e===null?null:ft(e)}function ft(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=ft(e);if(t!==null)return t;e=e.sibling}return null}var pt=n.unstable_scheduleCallback,mt=n.unstable_cancelCallback,ht=n.unstable_shouldYield,gt=n.unstable_requestPaint,_t=n.unstable_now,vt=n.unstable_getCurrentPriorityLevel,yt=n.unstable_ImmediatePriority,bt=n.unstable_UserBlockingPriority,xt=n.unstable_NormalPriority,St=n.unstable_LowPriority,z=n.unstable_IdlePriority,Ct=null,wt=null;function Tt(e){if(wt&&typeof wt.onCommitFiberRoot==`function`)try{wt.onCommitFiberRoot(Ct,e,void 0,(e.current.flags&128)==128)}catch{}}var Et=Math.clz32?Math.clz32:kt,Dt=Math.log,Ot=Math.LN2;function kt(e){return e>>>=0,e===0?32:31-(Dt(e)/Ot|0)|0}var At=64,jt=4194304;function B(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Mt(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~i;s===0?(a&=o,a!==0&&(r=B(a))):r=B(s)}else o=n&~i,o===0?a!==0&&(r=B(a)):r=B(o);if(r===0)return 0;if(t!==0&&t!==r&&(t&i)===0&&(i=r&-r,a=t&-t,i>=a||i===16&&a&4194240))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Et(t),i=1<<n,r|=e[n],t&=~i;return r}function Nt(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function V(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-Et(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Nt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}}function Pt(e){return e=e.pendingLanes&-1073741825,e===0?e&1073741824?1073741824:0:e}function Ft(){var e=At;return At<<=1,!(At&4194240)&&(At=64),e}function It(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Lt(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Et(t),e[t]=n}function Rt(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Et(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}function zt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Et(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var Bt=0;function Vt(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Ht,Ut,Wt,Gt,Kt,qt=!1,Jt=[],Yt=null,Xt=null,Zt=null,Qt=new Map,$t=new Map,en=[],tn=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit`.split(` `);function nn(e,t){switch(e){case`focusin`:case`focusout`:Yt=null;break;case`dragenter`:case`dragleave`:Xt=null;break;case`mouseover`:case`mouseout`:Zt=null;break;case`pointerover`:case`pointerout`:Qt.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:$t.delete(t.pointerId)}}function rn(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Fi(t),t!==null&&Ut(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function an(e,t,n,r,i){switch(t){case`focusin`:return Yt=rn(Yt,e,t,n,r,i),!0;case`dragenter`:return Xt=rn(Xt,e,t,n,r,i),!0;case`mouseover`:return Zt=rn(Zt,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Qt.set(a,rn(Qt.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,$t.set(a,rn($t.get(a)||null,e,t,n,r,i)),!0}return!1}function on(e){var t=Pi(e.target);if(t!==null){var n=st(t);if(n!==null){if(t=n.tag,t===13){if(t=ct(n),t!==null){e.blockedOn=t,Kt(e.priority,function(){Wt(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function sn(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=vn(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ze=r,n.target.dispatchEvent(r),ze=null}else return t=Fi(n),t!==null&&Ut(t),e.blockedOn=n,!1;t.shift()}return!0}function cn(e,t,n){sn(e)&&n.delete(t)}function ln(){qt=!1,Yt!==null&&sn(Yt)&&(Yt=null),Xt!==null&&sn(Xt)&&(Xt=null),Zt!==null&&sn(Zt)&&(Zt=null),Qt.forEach(cn),$t.forEach(cn)}function un(e,t){e.blockedOn===t&&(e.blockedOn=null,qt||(qt=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,ln)))}function dn(e){function t(t){return un(t,e)}if(0<Jt.length){un(Jt[0],e);for(var n=1;n<Jt.length;n++){var r=Jt[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Yt!==null&&un(Yt,e),Xt!==null&&un(Xt,e),Zt!==null&&un(Zt,e),Qt.forEach(t),$t.forEach(t),n=0;n<en.length;n++)r=en[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<en.length&&(n=en[0],n.blockedOn===null);)on(n),n.blockedOn===null&&en.shift()}var fn=C.ReactCurrentBatchConfig,pn=!0;function mn(e,t,n,r){var i=Bt,a=fn.transition;fn.transition=null;try{Bt=1,gn(e,t,n,r)}finally{Bt=i,fn.transition=a}}function hn(e,t,n,r){var i=Bt,a=fn.transition;fn.transition=null;try{Bt=4,gn(e,t,n,r)}finally{Bt=i,fn.transition=a}}function gn(e,t,n,r){if(pn){var i=vn(e,t,n,r);if(i===null)ui(e,t,r,_n,n),nn(e,r);else if(an(i,e,t,n,r))r.stopPropagation();else if(nn(e,r),t&4&&-1<tn.indexOf(e)){for(;i!==null;){var a=Fi(i);if(a!==null&&Ht(a),a=vn(e,t,n,r),a===null&&ui(e,t,r,_n,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else ui(e,t,r,null,n)}}var _n=null;function vn(e,t,n,r){if(_n=null,e=Be(r),e=Pi(e),e!==null)if(t=st(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ct(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return _n=e,null}function yn(e){switch(e){case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 1;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`toggle`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 4;case`message`:switch(vt()){case yt:return 1;case bt:return 4;case xt:case St:return 16;case z:return 536870912;default:return 16}default:return 16}}var bn=null,xn=null,Sn=null;function Cn(){if(Sn)return Sn;var e,t=xn,n=t.length,r,i=`value`in bn?bn.value:bn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Sn=i.slice(e,1<r?1-r:void 0)}function wn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Tn(){return!0}function En(){return!1}function Dn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Tn:En,this.isPropagationStopped=En,this}return ae(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Tn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Tn)},persist:function(){},isPersistent:Tn}),t}var On={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kn=Dn(On),An=ae({},On,{view:0,detail:0}),jn=Dn(An),Mn,Nn,Pn,Fn=ae({},An,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Pn&&(Pn&&e.type===`mousemove`?(Mn=e.screenX-Pn.screenX,Nn=e.screenY-Pn.screenY):Nn=Mn=0,Pn=e),Mn)},movementY:function(e){return`movementY`in e?e.movementY:Nn}}),In=Dn(Fn),Ln=Dn(ae({},Fn,{dataTransfer:0})),Rn=Dn(ae({},An,{relatedTarget:0})),zn=Dn(ae({},On,{animationName:0,elapsedTime:0,pseudoElement:0})),Bn=Dn(ae({},On,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Vn=Dn(ae({},On,{data:0})),Hn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Un={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Wn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Gn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Wn[e])?!!t[e]:!1}function Kn(){return Gn}var qn=Dn(ae({},An,{key:function(e){if(e.key){var t=Hn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=wn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Un[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kn,charCode:function(e){return e.type===`keypress`?wn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?wn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Jn=Dn(ae({},Fn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Yn=Dn(ae({},An,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kn})),Xn=Dn(ae({},On,{propertyName:0,elapsedTime:0,pseudoElement:0})),Zn=Dn(ae({},Fn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Qn=[9,13,27,32],$n=c&&`CompositionEvent`in window,er=null;c&&`documentMode`in document&&(er=document.documentMode);var tr=c&&`TextEvent`in window&&!er,nr=c&&(!$n||er&&8<er&&11>=er),rr=` `,ir=!1;function ar(e,t){switch(e){case`keyup`:return Qn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function or(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var sr=!1;function cr(e,t){switch(e){case`compositionend`:return or(t);case`keypress`:return t.which===32?(ir=!0,rr):null;case`textInput`:return e=t.data,e===rr&&ir?null:e;default:return null}}function lr(e,t){if(sr)return e===`compositionend`||!$n&&ar(e,t)?(e=Cn(),Sn=xn=bn=null,sr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return nr&&t.locale!==`ko`?null:t.data;default:return null}}var ur={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!ur[e.type]:t===`textarea`}function fr(e,t,n,r){Ge(r),t=W(t,`onChange`),0<t.length&&(n=new kn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var pr=null,mr=null;function hr(e){ii(e,0)}function gr(e){if(_e(Ii(e)))return e}function _r(e,t){if(e===`change`)return t}var vr=!1;if(c){var yr;if(c){var br=`oninput`in document;if(!br){var xr=document.createElement(`div`);xr.setAttribute(`oninput`,`return;`),br=typeof xr.oninput==`function`}yr=br}else yr=!1;vr=yr&&(!document.documentMode||9<document.documentMode)}function Sr(){pr&&(pr.detachEvent(`onpropertychange`,Cr),mr=pr=null)}function Cr(e){if(e.propertyName===`value`&&gr(mr)){var t=[];fr(t,mr,e,Be(e)),Xe(hr,t)}}function wr(e,t,n){e===`focusin`?(Sr(),pr=t,mr=n,pr.attachEvent(`onpropertychange`,Cr)):e===`focusout`&&Sr()}function Tr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return gr(mr)}function Er(e,t){if(e===`click`)return gr(t)}function Dr(e,t){if(e===`input`||e===`change`)return gr(t)}function Or(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var kr=typeof Object.is==`function`?Object.is:Or;function Ar(e,t){if(kr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!l.call(t,i)||!kr(e[i],t[i]))return!1}return!0}function jr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Mr(e,t){var n=jr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=jr(n)}}function Nr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Nr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Pr(){for(var e=window,t=ve();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=ve(e.document)}return t}function Fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}function Ir(e){var t=Pr(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Nr(n.ownerDocument.documentElement,n)){if(r!==null&&Fr(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),`selectionStart`in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=r.end===void 0?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=Mr(n,a);var o=Mr(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus==`function`&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Lr=c&&`documentMode`in document&&11>=document.documentMode,Rr=null,zr=null,Br=null,Vr=!1;function Hr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Vr||Rr==null||Rr!==ve(r)||(r=Rr,`selectionStart`in r&&Fr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Br&&Ar(Br,r)||(Br=r,r=W(zr,`onSelect`),0<r.length&&(t=new kn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Rr)))}function Ur(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Wr={animationend:Ur(`Animation`,`AnimationEnd`),animationiteration:Ur(`Animation`,`AnimationIteration`),animationstart:Ur(`Animation`,`AnimationStart`),transitionend:Ur(`Transition`,`TransitionEnd`)},Gr={},Kr={};c&&(Kr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Wr.animationend.animation,delete Wr.animationiteration.animation,delete Wr.animationstart.animation),`TransitionEvent`in window||delete Wr.transitionend.transition);function qr(e){if(Gr[e])return Gr[e];if(!Wr[e])return e;var t=Wr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Kr)return Gr[e]=t[n];return e}var Jr=qr(`animationend`),Yr=qr(`animationiteration`),Xr=qr(`animationstart`),Zr=qr(`transitionend`),Qr=new Map,$r=`abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);function ei(e,t){Qr.set(e,t),o(t,[e])}for(var ti=0;ti<$r.length;ti++){var ni=$r[ti];ei(ni.toLowerCase(),`on`+(ni[0].toUpperCase()+ni.slice(1)))}ei(Jr,`onAnimationEnd`),ei(Yr,`onAnimationIteration`),ei(Xr,`onAnimationStart`),ei(`dblclick`,`onDoubleClick`),ei(`focusin`,`onFocus`),ei(`focusout`,`onBlur`),ei(Zr,`onTransitionEnd`),s(`onMouseEnter`,[`mouseout`,`mouseover`]),s(`onMouseLeave`,[`mouseout`,`mouseover`]),s(`onPointerEnter`,[`pointerout`,`pointerover`]),s(`onPointerLeave`,[`pointerout`,`pointerover`]),o(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),o(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),o(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),o(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),o(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),o(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var ri=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),H=new Set(`cancel close invalid load scroll toggle`.split(` `).concat(ri));function U(e,t,n){var r=e.type||`unknown-event`;e.currentTarget=n,R(r,t,void 0,e),e.currentTarget=null}function ii(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;U(i,s,l),a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;U(i,s,l),a=c}}}if(rt)throw e=it,rt=!1,it=null,e}function ai(e,t){var n=t[ji];n===void 0&&(n=t[ji]=new Set);var r=e+`__bubble`;n.has(r)||(li(t,e,2,!1),n.add(r))}function oi(e,t,n){var r=0;t&&(r|=4),li(n,e,r,t)}var si=`_reactListening`+Math.random().toString(36).slice(2);function ci(e){if(!e[si]){e[si]=!0,i.forEach(function(t){t!==`selectionchange`&&(H.has(t)||oi(t,!1,e),oi(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[si]||(t[si]=!0,oi(`selectionchange`,!1,t))}}function li(e,t,n,r){switch(yn(t)){case 1:var i=mn;break;case 4:i=hn;break;default:i=gn}n=i.bind(null,t,n,e),i=void 0,!Qe||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function ui(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;o=o.return}for(;s!==null;){if(o=Pi(s),o===null)return;if(c=o.tag,c===5||c===6){r=a=o;continue a}s=s.parentNode}}r=r.return}Xe(function(){var r=a,i=Be(n),o=[];a:{var s=Qr.get(e);if(s!==void 0){var c=kn,l=e;switch(e){case`keypress`:if(wn(n)===0)break a;case`keydown`:case`keyup`:c=qn;break;case`focusin`:l=`focus`,c=Rn;break;case`focusout`:l=`blur`,c=Rn;break;case`beforeblur`:case`afterblur`:c=Rn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=In;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=Ln;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=Yn;break;case Jr:case Yr:case Xr:c=zn;break;case Zr:c=Xn;break;case`scroll`:c=jn;break;case`wheel`:c=Zn;break;case`copy`:case`cut`:case`paste`:c=Bn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=Jn}var u=(t&4)!=0,d=!u&&e===`scroll`,f=u?s===null?null:s+`Capture`:s;u=[];for(var p=r,m;p!==null;){m=p;var h=m.stateNode;if(m.tag===5&&h!==null&&(m=h,f!==null&&(h=Ze(p,f),h!=null&&u.push(di(p,h,m)))),d)break;p=p.return}0<u.length&&(s=new c(s,l,null,n,i),o.push({event:s,listeners:u}))}}if(!(t&7)){a:{if(s=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,s&&n!==ze&&(l=n.relatedTarget||n.fromElement)&&(Pi(l)||l[Ai]))break a;if((c||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Pi(l):null,l!==null&&(d=st(l),l!==d||l.tag!==5&&l.tag!==6)&&(l=null)):(c=null,l=r),c!==l)){if(u=In,h=`onMouseLeave`,f=`onMouseEnter`,p=`mouse`,(e===`pointerout`||e===`pointerover`)&&(u=Jn,h=`onPointerLeave`,f=`onPointerEnter`,p=`pointer`),d=c==null?s:Ii(c),m=l==null?s:Ii(l),s=new u(h,p+`leave`,c,n,i),s.target=d,s.relatedTarget=m,h=null,Pi(i)===r&&(u=new u(f,p+`enter`,l,n,i),u.target=m,u.relatedTarget=d,h=u),d=h,c&&l)b:{for(u=c,f=l,p=0,m=u;m;m=fi(m))p++;for(m=0,h=f;h;h=fi(h))m++;for(;0<p-m;)u=fi(u),p--;for(;0<m-p;)f=fi(f),m--;for(;p--;){if(u===f||f!==null&&u===f.alternate)break b;u=fi(u),f=fi(f)}u=null}else u=null;c!==null&&pi(o,s,c,u,!1),l!==null&&d!==null&&pi(o,d,l,u,!0)}}a:{if(s=r?Ii(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var g=_r;else if(dr(s))if(vr)g=Dr;else{g=Tr;var _=wr}else(c=s.nodeName)&&c.toLowerCase()===`input`&&(s.type===`checkbox`||s.type===`radio`)&&(g=Er);if(g&&=g(e,r)){fr(o,g,n,i);break a}_&&_(e,s,r),e===`focusout`&&(_=s._wrapperState)&&_.controlled&&s.type===`number`&&P(s,`number`,s.value)}switch(_=r?Ii(r):window,e){case`focusin`:(dr(_)||_.contentEditable===`true`)&&(Rr=_,zr=r,Br=null);break;case`focusout`:Br=zr=Rr=null;break;case`mousedown`:Vr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Vr=!1,Hr(o,n,i);break;case`selectionchange`:if(Lr)break;case`keydown`:case`keyup`:Hr(o,n,i)}var v;if($n)b:{switch(e){case`compositionstart`:var y=`onCompositionStart`;break b;case`compositionend`:y=`onCompositionEnd`;break b;case`compositionupdate`:y=`onCompositionUpdate`;break b}y=void 0}else sr?ar(e,n)&&(y=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(y=`onCompositionStart`);y&&(nr&&n.locale!==`ko`&&(sr||y!==`onCompositionStart`?y===`onCompositionEnd`&&sr&&(v=Cn()):(bn=i,xn=`value`in bn?bn.value:bn.textContent,sr=!0)),_=W(r,y),0<_.length&&(y=new Vn(y,e,null,n,i),o.push({event:y,listeners:_}),v?y.data=v:(v=or(n),v!==null&&(y.data=v)))),(v=tr?cr(e,n):lr(e,n))&&(r=W(r,`onBeforeInput`),0<r.length&&(i=new Vn(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:i,listeners:r}),i.data=v))}ii(o,t)})}function di(e,t,n){return{instance:e,listener:t,currentTarget:n}}function W(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=Ze(e,n),a!=null&&r.unshift(di(e,a,i)),a=Ze(e,t),a!=null&&r.push(di(e,a,i))),e=e.return}return r}function fi(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function pi(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(c!==null&&c===r)break;s.tag===5&&l!==null&&(s=l,i?(c=Ze(n,a),c!=null&&o.unshift(di(n,c,s))):i||(c=Ze(n,a),c!=null&&o.push(di(n,c,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var mi=/\r\n?/g,hi=/\u0000|\uFFFD/g;function G(e){return(typeof e==`string`?e:``+e).replace(mi,`
`).replace(hi,``)}function gi(e,t,n){if(t=G(t),G(e)!==t&&n)throw Error(r(425))}function K(){}var _i=null,vi=null;function q(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var yi=typeof setTimeout==`function`?setTimeout:void 0,bi=typeof clearTimeout==`function`?clearTimeout:void 0,xi=typeof Promise==`function`?Promise:void 0,Si=typeof queueMicrotask==`function`?queueMicrotask:xi===void 0?yi:function(e){return xi.resolve(null).then(e).catch(Ci)};function Ci(e){setTimeout(function(){throw e})}function wi(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`){if(r===0){e.removeChild(i),dn(t);return}r--}else n!==`$`&&n!==`$?`&&n!==`$!`||r++;n=i}while(n);dn(t)}function Ti(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`)break;if(t===`/$`)return null}}return e}function Ei(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`){if(t===0)return e;t--}else n===`/$`&&t++}e=e.previousSibling}return null}var Di=Math.random().toString(36).slice(2),Oi=`__reactFiber$`+Di,ki=`__reactProps$`+Di,Ai=`__reactContainer$`+Di,ji=`__reactEvents$`+Di,Mi=`__reactListeners$`+Di,Ni=`__reactHandles$`+Di;function Pi(e){var t=e[Oi];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ai]||n[Oi]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ei(e);e!==null;){if(n=e[Oi])return n;e=Ei(e)}return t}e=n,n=e.parentNode}return null}function Fi(e){return e=e[Oi]||e[Ai],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ii(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(r(33))}function Li(e){return e[ki]||null}var Ri=[],zi=-1;function Bi(e){return{current:e}}function Vi(e){0>zi||(e.current=Ri[zi],Ri[zi]=null,zi--)}function Hi(e,t){zi++,Ri[zi]=e.current,e.current=t}var Ui={},Wi=Bi(Ui),Gi=Bi(!1),Ki=Ui;function qi(e,t){var n=e.type.contextTypes;if(!n)return Ui;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ji(e){return e=e.childContextTypes,e!=null}function Yi(){Vi(Gi),Vi(Wi)}function Xi(e,t,n){if(Wi.current!==Ui)throw Error(r(168));Hi(Wi,t),Hi(Gi,n)}function Zi(e,t,n){var i=e.stateNode;if(t=t.childContextTypes,typeof i.getChildContext!=`function`)return n;for(var a in i=i.getChildContext(),i)if(!(a in t))throw Error(r(108,fe(e)||`Unknown`,a));return ae({},n,i)}function Qi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ui,Ki=Wi.current,Hi(Wi,e),Hi(Gi,Gi.current),!0}function $i(e,t,n){var i=e.stateNode;if(!i)throw Error(r(169));n?(e=Zi(e,t,Ki),i.__reactInternalMemoizedMergedChildContext=e,Vi(Gi),Vi(Wi),Hi(Wi,e)):Vi(Gi),Hi(Gi,n)}var ea=null,ta=!1,na=!1;function ra(e){ea===null?ea=[e]:ea.push(e)}function ia(e){ta=!0,ra(e)}function aa(){if(!na&&ea!==null){na=!0;var e=0,t=Bt;try{var n=ea;for(Bt=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ea=null,ta=!1}catch(t){throw ea!==null&&(ea=ea.slice(e+1)),pt(yt,aa),t}finally{Bt=t,na=!1}}return null}var oa=[],sa=0,ca=null,la=0,ua=[],da=0,fa=null,pa=1,ma=``;function ha(e,t){oa[sa++]=la,oa[sa++]=ca,ca=e,la=t}function ga(e,t,n){ua[da++]=pa,ua[da++]=ma,ua[da++]=fa,fa=e;var r=pa;e=ma;var i=32-Et(r)-1;r&=~(1<<i),n+=1;var a=32-Et(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,pa=1<<32-Et(t)+i|n<<i|r,ma=a+e}else pa=1<<a|n<<i|r,ma=e}function _a(e){e.return!==null&&(ha(e,1),ga(e,1,0))}function va(e){for(;e===ca;)ca=oa[--sa],oa[sa]=null,la=oa[--sa],oa[sa]=null;for(;e===fa;)fa=ua[--da],ua[da]=null,ma=ua[--da],ua[da]=null,pa=ua[--da],ua[da]=null}var ya=null,J=null,Y=!1,ba=null;function xa(e,t){var n=ql(5,null,null,0);n.elementType=`DELETED`,n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Sa(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t===null?!1:(e.stateNode=t,ya=e,J=Ti(t.firstChild),!0);case 6:return t=e.pendingProps===``||t.nodeType!==3?null:t,t===null?!1:(e.stateNode=t,ya=e,J=null,!0);case 13:return t=t.nodeType===8?t:null,t===null?!1:(n=fa===null?null:{id:pa,overflow:ma},e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ql(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ya=e,J=null,!0);default:return!1}}function Ca(e){return(e.mode&1)!=0&&(e.flags&128)==0}function wa(e){if(Y){var t=J;if(t){var n=t;if(!Sa(e,t)){if(Ca(e))throw Error(r(418));t=Ti(n.nextSibling);var i=ya;t&&Sa(e,t)?xa(i,n):(e.flags=e.flags&-4097|2,Y=!1,ya=e)}}else{if(Ca(e))throw Error(r(418));e.flags=e.flags&-4097|2,Y=!1,ya=e}}}function Ta(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ya=e}function Ea(e){if(e!==ya)return!1;if(!Y)return Ta(e),Y=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!==`head`&&t!==`body`&&!q(e.type,e.memoizedProps)),t&&=J){if(Ca(e))throw Da(),Error(r(418));for(;t;)xa(e,t),t=Ti(t.nextSibling)}if(Ta(e),e.tag===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(r(317));a:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`){if(t===0){J=Ti(e.nextSibling);break a}t--}else n!==`$`&&n!==`$!`&&n!==`$?`||t++}e=e.nextSibling}J=null}}else J=ya?Ti(e.stateNode.nextSibling):null;return!0}function Da(){for(var e=J;e;)e=Ti(e.nextSibling)}function Oa(){J=ya=null,Y=!1}function ka(e){ba===null?ba=[e]:ba.push(e)}var Aa=C.ReactCurrentBatchConfig;function ja(e,t,n){if(e=n.ref,e!==null&&typeof e!=`function`&&typeof e!=`object`){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(r(309));var i=n.stateNode}if(!i)throw Error(r(147,e));var a=i,o=``+e;return t!==null&&t.ref!==null&&typeof t.ref==`function`&&t.ref._stringRef===o?t.ref:(t=function(e){var t=a.refs;e===null?delete t[o]:t[o]=e},t._stringRef=o,t)}if(typeof e!=`string`)throw Error(r(284));if(!n._owner)throw Error(r(290,e))}return e}function Ma(e,t){throw e=Object.prototype.toString.call(t),Error(r(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e))}function Na(e){var t=e._init;return t(e._payload)}function Pa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function i(e,t){for(e=new Map;t!==null;)t.key===null?e.set(t.index,t):e.set(t.key,t),t=t.sibling;return e}function a(e,t){return e=Xl(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=2,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=2),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=eu(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===E?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===N&&Na(i)===t.type)?(r=a(t,n.props),r.ref=ja(e,t,n),r.return=e,r):(r=Zl(n.type,n.key,n.props,null,e.mode,r),r.ref=ja(e,t,n),r.return=e,r)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=tu(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Ql(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`)return t=eu(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case w:return n=Zl(t.type,t.key,t.props,null,e.mode,n),n.ref=ja(e,null,t),n.return=e,n;case T:return t=tu(t,e.mode,n),t.return=e,t;case N:var r=t._init;return f(e,r(t._payload),n)}if(we(t)||ie(t))return t=Ql(t,e.mode,n,null),t.return=e,t;Ma(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case w:return n.key===i?l(e,t,n,r):null;case T:return n.key===i?u(e,t,n,r):null;case N:return i=n._init,p(e,t,i(n._payload),r)}if(we(n)||ie(n))return i===null?d(e,t,n,r,null):null;Ma(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case w:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case T:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case N:var a=r._init;return m(e,t,n,a(r._payload),i)}if(we(r)||ie(r))return e=e.get(n)||null,d(t,e,r,i,null);Ma(t,r)}return null}function h(r,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(r,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(r,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(r,d),Y&&ha(r,h),l;if(d===null){for(;h<s.length;h++)d=f(r,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return Y&&ha(r,h),l}for(d=i(r,d);h<s.length;h++)g=m(d,r,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(r,e)}),Y&&ha(r,h),l}function g(a,s,c,l){var u=ie(c);if(typeof u!=`function`)throw Error(r(150));if(c=u.call(c),c==null)throw Error(r(151));for(var d=u=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),Y&&ha(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return Y&&ha(a,g),u}for(h=i(a,h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),Y&&ha(a,g),u}function _(e,r,i,o){if(typeof i==`object`&&i&&i.type===E&&i.key===null&&(i=i.props.children),typeof i==`object`&&i){switch(i.$$typeof){case w:a:{for(var c=i.key,l=r;l!==null;){if(l.key===c){if(c=i.type,c===E){if(l.tag===7){n(e,l.sibling),r=a(l,i.props.children),r.return=e,e=r;break a}}else if(l.elementType===c||typeof c==`object`&&c&&c.$$typeof===N&&Na(c)===l.type){n(e,l.sibling),r=a(l,i.props),r.ref=ja(e,l,i),r.return=e,e=r;break a}n(e,l);break}else t(e,l);l=l.sibling}i.type===E?(r=Ql(i.props.children,e.mode,o,i.key),r.return=e,e=r):(o=Zl(i.type,i.key,i.props,null,e.mode,o),o.ref=ja(e,r,i),o.return=e,e=o)}return s(e);case T:a:{for(l=i.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===i.containerInfo&&r.stateNode.implementation===i.implementation){n(e,r.sibling),r=a(r,i.children||[]),r.return=e,e=r;break a}else{n(e,r);break}else t(e,r);r=r.sibling}r=tu(i,e.mode,o),r.return=e,e=r}return s(e);case N:return l=i._init,_(e,r,l(i._payload),o)}if(we(i))return h(e,r,i,o);if(ie(i))return g(e,r,i,o);Ma(e,i)}return typeof i==`string`&&i!==``||typeof i==`number`?(i=``+i,r!==null&&r.tag===6?(n(e,r.sibling),r=a(r,i),r.return=e,e=r):(n(e,r),r=eu(i,e.mode,o),r.return=e,e=r),s(e)):n(e,r)}return _}var Fa=Pa(!0),Ia=Pa(!1),La=Bi(null),Ra=null,za=null,Ba=null;function Va(){Ba=za=Ra=null}function Ha(e){var t=La.current;Vi(La),e._currentValue=t}function Ua(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Wa(e,t){Ra=e,Ba=za=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Ps=!0),e.firstContext=null)}function Ga(e){var t=e._currentValue;if(Ba!==e)if(e={context:e,memoizedValue:t,next:null},za===null){if(Ra===null)throw Error(r(308));za=e,Ra.dependencies={lanes:0,firstContext:e}}else za=za.next=e;return t}var Ka=null;function qa(e){Ka===null?Ka=[e]:Ka.push(e)}function Ja(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,qa(t)):(n.next=i.next,i.next=n),t.interleaved=n,Ya(e,r)}function Ya(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Xa=!1;function Za(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Qa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function $a(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function eo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Vc&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Ya(e,n)}return i=r.interleaved,i===null?(t.next=t,qa(r)):(t.next=i.next,i.next=t),r.interleaved=t,Ya(e,n)}function to(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194240)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,zt(e,n)}}function no(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ro(e,t,n,r){var i=e.updateQueue;Xa=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane,p=s.eventTime;if((r&f)===f){u!==null&&(u=u.next={eventTime:p,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});a:{var m=e,h=s;switch(f=t,p=n,h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(p,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(p,d,f):m,f==null)break a;d=ae({},d,f);break a;case 2:Xa=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,f=i.effects,f===null?i.effects=[s]:f.push(s))}else p={eventTime:p,lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;f=s,s=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(1);if(u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);Yc|=o,e.lanes=o,e.memoizedState=d}}function io(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var i=e[t],a=i.callback;if(a!==null){if(i.callback=null,i=n,typeof a!=`function`)throw Error(r(191,a));a.call(i)}}}var ao={},oo=Bi(ao),so=Bi(ao),co=Bi(ao);function lo(e){if(e===ao)throw Error(r(174));return e}function uo(e,t){switch(Hi(co,t),Hi(so,e),Hi(oo,ao),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Oe(null,``);break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Oe(t,e)}Vi(oo),Hi(oo,t)}function fo(){Vi(oo),Vi(so),Vi(co)}function po(e){lo(co.current);var t=lo(oo.current),n=Oe(t,e.type);t!==n&&(Hi(so,e),Hi(oo,n))}function mo(e){so.current===e&&(Vi(oo),Vi(so))}var ho=Bi(0);function go(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data===`$?`||n.data===`$!`))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var _o=[];function vo(){for(var e=0;e<_o.length;e++)_o[e]._workInProgressVersionPrimary=null;_o.length=0}var yo=C.ReactCurrentDispatcher,bo=C.ReactCurrentBatchConfig,xo=0,So=null,Co=null,wo=null,To=!1,Eo=!1,Do=0,Oo=0;function ko(){throw Error(r(321))}function Ao(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!kr(e[n],t[n]))return!1;return!0}function jo(e,t,n,i,a,o){if(xo=o,So=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,yo.current=e===null||e.memoizedState===null?ms:hs,e=n(i,a),Eo){o=0;do{if(Eo=!1,Do=0,25<=o)throw Error(r(301));o+=1,wo=Co=null,t.updateQueue=null,yo.current=gs,e=n(i,a)}while(Eo)}if(yo.current=ps,t=Co!==null&&Co.next!==null,xo=0,wo=Co=So=null,To=!1,t)throw Error(r(300));return e}function Mo(){var e=Do!==0;return Do=0,e}function No(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return wo===null?So.memoizedState=wo=e:wo=wo.next=e,wo}function Po(){if(Co===null){var e=So.alternate;e=e===null?null:e.memoizedState}else e=Co.next;var t=wo===null?So.memoizedState:wo.next;if(t!==null)wo=t,Co=e;else{if(e===null)throw Error(r(310));Co=e,e={memoizedState:Co.memoizedState,baseState:Co.baseState,baseQueue:Co.baseQueue,queue:Co.queue,next:null},wo===null?So.memoizedState=wo=e:wo=wo.next=e}return wo}function Fo(e,t){return typeof t==`function`?t(e):t}function Io(e){var t=Po(),n=t.queue;if(n===null)throw Error(r(311));n.lastRenderedReducer=e;var i=Co,a=i.baseQueue,o=n.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}i.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,i=i.baseState;var c=s=null,l=null,u=o;do{var d=u.lane;if((xo&d)===d)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:e(i,u.action);else{var f={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(c=l=f,s=i):l=l.next=f,So.lanes|=d,Yc|=d}u=u.next}while(u!==null&&u!==o);l===null?s=i:l.next=c,kr(i,t.memoizedState)||(Ps=!0),t.memoizedState=i,t.baseState=s,t.baseQueue=l,n.lastRenderedState=i}if(e=n.interleaved,e!==null){a=e;do o=a.lane,So.lanes|=o,Yc|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Lo(e){var t=Po(),n=t.queue;if(n===null)throw Error(r(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);kr(o,t.memoizedState)||(Ps=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,i]}function Ro(){}function zo(e,t){var n=So,i=Po(),a=t(),o=!kr(i.memoizedState,a);if(o&&(i.memoizedState=a,Ps=!0),i=i.queue,Zo(Ho.bind(null,n,i,e),[e]),i.getSnapshot!==t||o||wo!==null&&wo.memoizedState.tag&1){if(n.flags|=2048,Ko(9,Vo.bind(null,n,i,a,t),void 0,null),Hc===null)throw Error(r(349));xo&30||Bo(n,t,a)}return a}function Bo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=So.updateQueue,t===null?(t={lastEffect:null,stores:null},So.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Vo(e,t,n,r){t.value=n,t.getSnapshot=r,Uo(t)&&Wo(e)}function Ho(e,t,n){return n(function(){Uo(t)&&Wo(e)})}function Uo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!kr(e,n)}catch{return!0}}function Wo(e){var t=Ya(e,1);t!==null&&hl(t,e,1,-1)}function Go(e){var t=No();return typeof e==`function`&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Fo,lastRenderedState:e},t.queue=e,e=e.dispatch=ls.bind(null,So,e),[t.memoizedState,e]}function Ko(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=So.updateQueue,t===null?(t={lastEffect:null,stores:null},So.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function qo(){return Po().memoizedState}function Jo(e,t,n,r){var i=No();So.flags|=e,i.memoizedState=Ko(1|t,n,void 0,r===void 0?null:r)}function Yo(e,t,n,r){var i=Po();r=r===void 0?null:r;var a=void 0;if(Co!==null){var o=Co.memoizedState;if(a=o.destroy,r!==null&&Ao(r,o.deps)){i.memoizedState=Ko(t,n,a,r);return}}So.flags|=e,i.memoizedState=Ko(1|t,n,a,r)}function Xo(e,t){return Jo(8390656,8,e,t)}function Zo(e,t){return Yo(2048,8,e,t)}function Qo(e,t){return Yo(4,2,e,t)}function $o(e,t){return Yo(4,4,e,t)}function es(e,t){if(typeof t==`function`)return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ts(e,t,n){return n=n==null?null:n.concat([e]),Yo(4,4,es.bind(null,t,e),n)}function ns(){}function rs(e,t){var n=Po();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ao(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function is(e,t){var n=Po();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ao(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function as(e,t,n){return xo&21?(kr(n,t)||(n=Ft(),So.lanes|=n,Yc|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ps=!0),e.memoizedState=n)}function os(e,t){var n=Bt;Bt=n!==0&&4>n?n:4,e(!0);var r=bo.transition;bo.transition={};try{e(!1),t()}finally{Bt=n,bo.transition=r}}function ss(){return Po().memoizedState}function cs(e,t,n){var r=ml(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},us(e))ds(t,n);else if(n=Ja(e,t,n,r),n!==null){var i=pl();hl(n,e,r,i),fs(n,t,r)}}function ls(e,t,n){var r=ml(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(us(e))ds(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,kr(s,o)){var c=t.interleaved;c===null?(i.next=i,qa(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}n=Ja(e,t,i,r),n!==null&&(i=pl(),hl(n,e,r,i),fs(n,t,r))}}function us(e){var t=e.alternate;return e===So||t!==null&&t===So}function ds(e,t){Eo=To=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function fs(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,zt(e,n)}}var ps={readContext:Ga,useCallback:ko,useContext:ko,useEffect:ko,useImperativeHandle:ko,useInsertionEffect:ko,useLayoutEffect:ko,useMemo:ko,useReducer:ko,useRef:ko,useState:ko,useDebugValue:ko,useDeferredValue:ko,useTransition:ko,useMutableSource:ko,useSyncExternalStore:ko,useId:ko,unstable_isNewReconciler:!1},ms={readContext:Ga,useCallback:function(e,t){return No().memoizedState=[e,t===void 0?null:t],e},useContext:Ga,useEffect:Xo,useImperativeHandle:function(e,t,n){return n=n==null?null:n.concat([e]),Jo(4194308,4,es.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Jo(4194308,4,e,t)},useInsertionEffect:function(e,t){return Jo(4,2,e,t)},useMemo:function(e,t){var n=No();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=No();return t=n===void 0?t:n(t),r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=cs.bind(null,So,e),[r.memoizedState,e]},useRef:function(e){var t=No();return e={current:e},t.memoizedState=e},useState:Go,useDebugValue:ns,useDeferredValue:function(e){return No().memoizedState=e},useTransition:function(){var e=Go(!1),t=e[0];return e=os.bind(null,e[1]),No().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var i=So,a=No();if(Y){if(n===void 0)throw Error(r(407));n=n()}else{if(n=t(),Hc===null)throw Error(r(349));xo&30||Bo(i,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Xo(Ho.bind(null,i,o,e),[e]),i.flags|=2048,Ko(9,Vo.bind(null,i,o,n,t),void 0,null),n},useId:function(){var e=No(),t=Hc.identifierPrefix;if(Y){var n=ma,r=pa;n=(r&~(1<<32-Et(r)-1)).toString(32)+n,t=`:`+t+`R`+n,n=Do++,0<n&&(t+=`H`+n.toString(32)),t+=`:`}else n=Oo++,t=`:`+t+`r`+n.toString(32)+`:`;return e.memoizedState=t},unstable_isNewReconciler:!1},hs={readContext:Ga,useCallback:rs,useContext:Ga,useEffect:Zo,useImperativeHandle:ts,useInsertionEffect:Qo,useLayoutEffect:$o,useMemo:is,useReducer:Io,useRef:qo,useState:function(){return Io(Fo)},useDebugValue:ns,useDeferredValue:function(e){return as(Po(),Co.memoizedState,e)},useTransition:function(){return[Io(Fo)[0],Po().memoizedState]},useMutableSource:Ro,useSyncExternalStore:zo,useId:ss,unstable_isNewReconciler:!1},gs={readContext:Ga,useCallback:rs,useContext:Ga,useEffect:Zo,useImperativeHandle:ts,useInsertionEffect:Qo,useLayoutEffect:$o,useMemo:is,useReducer:Lo,useRef:qo,useState:function(){return Lo(Fo)},useDebugValue:ns,useDeferredValue:function(e){var t=Po();return Co===null?t.memoizedState=e:as(t,Co.memoizedState,e)},useTransition:function(){return[Lo(Fo)[0],Po().memoizedState]},useMutableSource:Ro,useSyncExternalStore:zo,useId:ss,unstable_isNewReconciler:!1};function _s(e,t){if(e&&e.defaultProps){for(var n in t=ae({},t),e=e.defaultProps,e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function vs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ae({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ys={isMounted:function(e){return(e=e._reactInternals)?st(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pl(),i=ml(e),a=$a(r,i);a.payload=t,n!=null&&(a.callback=n),t=eo(e,a,i),t!==null&&(hl(t,e,i,r),to(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pl(),i=ml(e),a=$a(r,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=eo(e,a,i),t!==null&&(hl(t,e,i,r),to(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pl(),r=ml(e),i=$a(n,r);i.tag=2,t!=null&&(i.callback=t),t=eo(e,i,r),t!==null&&(hl(t,e,r,n),to(t,e,r))}};function bs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Ar(n,r)||!Ar(i,a):!0}function xs(e,t,n){var r=!1,i=Ui,a=t.contextType;return typeof a==`object`&&a?a=Ga(a):(i=Ji(t)?Ki:Wi.current,r=t.contextTypes,a=(r=r!=null)?qi(e,i):Ui),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ys,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function Ss(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ys.enqueueReplaceState(t,t.state,null)}function Cs(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Za(e);var a=t.contextType;typeof a==`object`&&a?i.context=Ga(a):(a=Ji(t)?Ki:Wi.current,i.context=qi(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a==`function`&&(vs(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps==`function`||typeof i.getSnapshotBeforeUpdate==`function`||typeof i.UNSAFE_componentWillMount!=`function`&&typeof i.componentWillMount!=`function`||(t=i.state,typeof i.componentWillMount==`function`&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount==`function`&&i.UNSAFE_componentWillMount(),t!==i.state&&ys.enqueueReplaceState(i,i.state,null),ro(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount==`function`&&(e.flags|=4194308)}function ws(e,t){try{var n=``,r=t;do n+=ue(r),r=r.return;while(r);var i=n}catch(e){i=`
Error generating stack: `+e.message+`
`+e.stack}return{value:e,source:t,stack:i,digest:null}}function Ts(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Es(e,t){try{console.error(t.value)}catch(e){setTimeout(function(){throw e})}}var Ds=typeof WeakMap==`function`?WeakMap:Map;function Os(e,t,n){n=$a(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){rl||(rl=!0,il=r),Es(e,t)},n}function ks(e,t,n){n=$a(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r==`function`){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Es(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch==`function`&&(n.callback=function(){Es(e,t),typeof r!=`function`&&(al===null?al=new Set([this]):al.add(this));var n=t.stack;this.componentDidCatch(t.value,{componentStack:n===null?``:n})}),n}function As(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ds;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=Bl.bind(null,e,t,n),t.then(e,e))}function js(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t===null?!0:t.dehydrated!==null),t)return e;e=e.return}while(e!==null);return null}function Ms(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=$a(-1,1),t.tag=2,eo(n,t,1))),n.lanes|=1),e)}var Ns=C.ReactCurrentOwner,Ps=!1;function Fs(e,t,n,r){t.child=e===null?Ia(t,null,n,r):Fa(t,e.child,n,r)}function Is(e,t,n,r,i){n=n.render;var a=t.ref;return Wa(t,i),r=jo(e,t,n,r,a,i),n=Mo(),e!==null&&!Ps?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,nc(e,t,i)):(Y&&n&&_a(t),t.flags|=1,Fs(e,t,r,i),t.child)}function Ls(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Jl(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,Rs(e,t,a,r,i)):(e=Zl(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,(e.lanes&i)===0){var o=a.memoizedProps;if(n=n.compare,n=n===null?Ar:n,n(o,r)&&e.ref===t.ref)return nc(e,t,i)}return t.flags|=1,e=Xl(a,r),e.ref=t.ref,e.return=t,t.child=e}function Rs(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Ar(a,r)&&e.ref===t.ref)if(Ps=!1,t.pendingProps=r=a,(e.lanes&i)!==0)e.flags&131072&&(Ps=!0);else return t.lanes=e.lanes,nc(e,t,i)}return Vs(e,t,n,r,i)}function zs(e,t,n){var r=t.pendingProps,i=r.children,a=e===null?null:e.memoizedState;if(r.mode===`hidden`)if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Hi(Kc,Gc),Gc|=n;else{if(!(n&1073741824))return e=a===null?n:a.baseLanes|n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Hi(Kc,Gc),Gc|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a===null?n:a.baseLanes,Hi(Kc,Gc),Gc|=r}else a===null?r=n:(r=a.baseLanes|n,t.memoizedState=null),Hi(Kc,Gc),Gc|=r;return Fs(e,t,i,n),t.child}function Bs(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Vs(e,t,n,r,i){var a=Ji(n)?Ki:Wi.current;return a=qi(t,a),Wa(t,i),n=jo(e,t,n,r,a,i),r=Mo(),e!==null&&!Ps?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,nc(e,t,i)):(Y&&r&&_a(t),t.flags|=1,Fs(e,t,n,i),t.child)}function Hs(e,t,n,r,i){if(Ji(n)){var a=!0;Qi(t)}else a=!1;if(Wa(t,i),t.stateNode===null)tc(e,t),xs(t,n,r),Cs(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var c=o.context,l=n.contextType;typeof l==`object`&&l?l=Ga(l):(l=Ji(n)?Ki:Wi.current,l=qi(t,l));var u=n.getDerivedStateFromProps,d=typeof u==`function`||typeof o.getSnapshotBeforeUpdate==`function`;d||typeof o.UNSAFE_componentWillReceiveProps!=`function`&&typeof o.componentWillReceiveProps!=`function`||(s!==r||c!==l)&&Ss(t,o,r,l),Xa=!1;var f=t.memoizedState;o.state=f,ro(t,r,o,i),c=t.memoizedState,s!==r||f!==c||Gi.current||Xa?(typeof u==`function`&&(vs(t,n,u,r),c=t.memoizedState),(s=Xa||bs(t,n,s,r,f,c,l))?(d||typeof o.UNSAFE_componentWillMount!=`function`&&typeof o.componentWillMount!=`function`||(typeof o.componentWillMount==`function`&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount==`function`&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount==`function`&&(t.flags|=4194308)):(typeof o.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=l,r=s):(typeof o.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Qa(e,t),s=t.memoizedProps,l=t.type===t.elementType?s:_s(t.type,s),o.props=l,d=t.pendingProps,f=o.context,c=n.contextType,typeof c==`object`&&c?c=Ga(c):(c=Ji(n)?Ki:Wi.current,c=qi(t,c));var p=n.getDerivedStateFromProps;(u=typeof p==`function`||typeof o.getSnapshotBeforeUpdate==`function`)||typeof o.UNSAFE_componentWillReceiveProps!=`function`&&typeof o.componentWillReceiveProps!=`function`||(s!==d||f!==c)&&Ss(t,o,r,c),Xa=!1,f=t.memoizedState,o.state=f,ro(t,r,o,i);var m=t.memoizedState;s!==d||f!==m||Gi.current||Xa?(typeof p==`function`&&(vs(t,n,p,r),m=t.memoizedState),(l=Xa||bs(t,n,l,r,f,m,c)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!=`function`&&typeof o.componentWillUpdate!=`function`||(typeof o.componentWillUpdate==`function`&&o.componentWillUpdate(r,m,c),typeof o.UNSAFE_componentWillUpdate==`function`&&o.UNSAFE_componentWillUpdate(r,m,c)),typeof o.componentDidUpdate==`function`&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof o.componentDidUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),o.props=r,o.state=m,o.context=c,r=l):(typeof o.componentDidUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Us(e,t,n,r,a,i)}function Us(e,t,n,r,i,a){Bs(e,t);var o=(t.flags&128)!=0;if(!r&&!o)return i&&$i(t,n,!1),nc(e,t,a);r=t.stateNode,Ns.current=t;var s=o&&typeof n.getDerivedStateFromError!=`function`?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Fa(t,e.child,null,a),t.child=Fa(t,null,s,a)):Fs(e,t,s,a),t.memoizedState=r.state,i&&$i(t,n,!0),t.child}function Ws(e){var t=e.stateNode;t.pendingContext?Xi(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Xi(e,t.context,!1),uo(e,t.containerInfo)}function Gs(e,t,n,r,i){return Oa(),ka(i),t.flags|=256,Fs(e,t,n,r),t.child}var Ks={dehydrated:null,treeContext:null,retryLane:0};function qs(e){return{baseLanes:e,cachePool:null,transitions:null}}function Js(e,t,n){var r=t.pendingProps,i=ho.current,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!=0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),Hi(ho,i&1),e===null)return wa(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data===`$!`?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:`hidden`,children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=$l(o,r,0,null),e=Ql(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=qs(n),t.memoizedState=Ks,e):Ys(t,o));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return Zs(e,t,o,r,s,i,n);if(a){a=r.fallback,o=t.mode,i=e.child,s=i.sibling;var c={mode:`hidden`,children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Xl(i,c),r.subtreeFlags=i.subtreeFlags&14680064),s===null?(a=Ql(a,o,n,null),a.flags|=2):a=Xl(s,a),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?qs(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=Ks,r}return a=e.child,e=a.sibling,r=Xl(a,{mode:`visible`,children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ys(e,t){return t=$l({mode:`visible`,children:t},e.mode,0,null),t.return=e,e.child=t}function Xs(e,t,n,r){return r!==null&&ka(r),Fa(t,e.child,null,n),e=Ys(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Zs(e,t,n,i,a,o,s){if(n)return t.flags&256?(t.flags&=-257,i=Ts(Error(r(422))),Xs(e,t,s,i)):t.memoizedState===null?(o=i.fallback,a=t.mode,i=$l({mode:`visible`,children:i.children},a,0,null),o=Ql(o,a,s,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,t.mode&1&&Fa(t,e.child,null,s),t.child.memoizedState=qs(s),t.memoizedState=Ks,o):(t.child=e.child,t.flags|=128,null);if(!(t.mode&1))return Xs(e,t,s,null);if(a.data===`$!`){if(i=a.nextSibling&&a.nextSibling.dataset,i)var c=i.dgst;return i=c,o=Error(r(419)),i=Ts(o,i,void 0),Xs(e,t,s,i)}if(c=(s&e.childLanes)!==0,Ps||c){if(i=Hc,i!==null){switch(s&-s){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(i.suspendedLanes|s))===0?a:0,a!==0&&a!==o.retryLane&&(o.retryLane=a,Ya(e,a),hl(i,e,a,-1))}return kl(),i=Ts(Error(r(421))),Xs(e,t,s,i)}return a.data===`$?`?(t.flags|=128,t.child=e.child,t=Hl.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,J=Ti(a.nextSibling),ya=t,Y=!0,ba=null,e!==null&&(ua[da++]=pa,ua[da++]=ma,ua[da++]=fa,pa=e.id,ma=e.overflow,fa=t),t=Ys(t,i.children),t.flags|=4096,t)}function Qs(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ua(e.return,t,n)}function $s(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function ec(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(Fs(e,t,r.children,n),r=ho.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Qs(e,n,t);else if(e.tag===19)Qs(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Hi(ho,r),!(t.mode&1))t.memoizedState=null;else switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&go(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),$s(t,!1,i,n,a);break;case`backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&go(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}$s(t,!0,n,null,a);break;case`together`:$s(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function tc(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function nc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Yc|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(r(153));if(t.child!==null){for(e=t.child,n=Xl(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Xl(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function rc(e,t,n){switch(t.tag){case 3:Ws(t),Oa();break;case 5:po(t);break;case 1:Ji(t.type)&&Qi(t);break;case 4:uo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;Hi(La,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(Hi(ho,ho.current&1),e=nc(e,t,n),e===null?null:e.sibling):Js(e,t,n):(Hi(ho,ho.current&1),t.flags|=128,null);Hi(ho,ho.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return ec(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Hi(ho,ho.current),r)break;return null;case 22:case 23:return t.lanes=0,zs(e,t,n)}return nc(e,t,n)}var ic=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},ac=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,lo(oo.current);var o=null;switch(n){case`input`:i=ye(e,i),r=ye(e,r),o=[];break;case`select`:i=ae({},i,{value:void 0}),r=ae({},r,{value:void 0}),o=[];break;case`textarea`:i=Ee(e,i),r=Ee(e,r),o=[];break;default:typeof i.onClick!=`function`&&typeof r.onClick==`function`&&(e.onclick=K)}Le(n,r);var s;for(u in n=null,i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u===`style`){var c=i[u];for(s in c)c.hasOwnProperty(s)&&(n||={},n[s]=``)}else u!==`dangerouslySetInnerHTML`&&u!==`children`&&u!==`suppressContentEditableWarning`&&u!==`suppressHydrationWarning`&&u!==`autoFocus`&&(a.hasOwnProperty(u)?o||=[]:(o||=[]).push(u,null));for(u in r){var l=r[u];if(c=i?.[u],r.hasOwnProperty(u)&&l!==c&&(l!=null||c!=null))if(u===`style`)if(c){for(s in c)!c.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(n||={},n[s]=``);for(s in l)l.hasOwnProperty(s)&&c[s]!==l[s]&&(n||={},n[s]=l[s])}else n||(o||=[],o.push(u,n)),n=l;else u===`dangerouslySetInnerHTML`?(l=l?l.__html:void 0,c=c?c.__html:void 0,l!=null&&c!==l&&(o||=[]).push(u,l)):u===`children`?typeof l!=`string`&&typeof l!=`number`||(o||=[]).push(u,``+l):u!==`suppressContentEditableWarning`&&u!==`suppressHydrationWarning`&&(a.hasOwnProperty(u)?(l!=null&&u===`onScroll`&&ai(`scroll`,e),o||c===l||(o=[])):(o||=[]).push(u,l))}n&&(o||=[]).push(`style`,n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}},X=function(e,t,n,r){n!==r&&(t.flags|=4)};function Z(e,t){if(!Y)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function sc(e,t,n){var i=t.pendingProps;switch(va(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oc(t),null;case 1:return Ji(t.type)&&Yi(),oc(t),null;case 3:return i=t.stateNode,fo(),Vi(Gi),Vi(Wi),vo(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(Ea(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ba!==null&&(yl(ba),ba=null))),oc(t),null;case 5:mo(t);var o=lo(co.current);if(n=t.type,e!==null&&t.stateNode!=null)ac(e,t,n,i,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!i){if(t.stateNode===null)throw Error(r(166));return oc(t),null}if(e=lo(oo.current),Ea(t)){i=t.stateNode,n=t.type;var s=t.memoizedProps;switch(i[Oi]=t,i[ki]=s,e=(t.mode&1)!=0,n){case`dialog`:ai(`cancel`,i),ai(`close`,i);break;case`iframe`:case`object`:case`embed`:ai(`load`,i);break;case`video`:case`audio`:for(o=0;o<ri.length;o++)ai(ri[o],i);break;case`source`:ai(`error`,i);break;case`img`:case`image`:case`link`:ai(`error`,i),ai(`load`,i);break;case`details`:ai(`toggle`,i);break;case`input`:be(i,s),ai(`invalid`,i);break;case`select`:i._wrapperState={wasMultiple:!!s.multiple},ai(`invalid`,i);break;case`textarea`:F(i,s),ai(`invalid`,i)}for(var c in Le(n,s),o=null,s)if(s.hasOwnProperty(c)){var l=s[c];c===`children`?typeof l==`string`?i.textContent!==l&&(!0!==s.suppressHydrationWarning&&gi(i.textContent,l,e),o=[`children`,l]):typeof l==`number`&&i.textContent!==``+l&&(!0!==s.suppressHydrationWarning&&gi(i.textContent,l,e),o=[`children`,``+l]):a.hasOwnProperty(c)&&l!=null&&c===`onScroll`&&ai(`scroll`,i)}switch(n){case`input`:ge(i),Ce(i,s,!0);break;case`textarea`:ge(i),I(i);break;case`select`:case`option`:break;default:typeof s.onClick==`function`&&(i.onclick=K)}i=o,t.updateQueue=i,i!==null&&(t.flags|=4)}else{c=o.nodeType===9?o:o.ownerDocument,e===`http://www.w3.org/1999/xhtml`&&(e=L(n)),e===`http://www.w3.org/1999/xhtml`?n===`script`?(e=c.createElement(`div`),e.innerHTML=`<script><\/script>`,e=e.removeChild(e.firstChild)):typeof i.is==`string`?e=c.createElement(n,{is:i.is}):(e=c.createElement(n),n===`select`&&(c=e,i.multiple?c.multiple=!0:i.size&&(c.size=i.size))):e=c.createElementNS(e,n),e[Oi]=t,e[ki]=i,ic(e,t,!1,!1),t.stateNode=e;a:{switch(c=Re(n,i),n){case`dialog`:ai(`cancel`,e),ai(`close`,e),o=i;break;case`iframe`:case`object`:case`embed`:ai(`load`,e),o=i;break;case`video`:case`audio`:for(o=0;o<ri.length;o++)ai(ri[o],e);o=i;break;case`source`:ai(`error`,e),o=i;break;case`img`:case`image`:case`link`:ai(`error`,e),ai(`load`,e),o=i;break;case`details`:ai(`toggle`,e),o=i;break;case`input`:be(e,i),o=ye(e,i),ai(`invalid`,e);break;case`option`:o=i;break;case`select`:e._wrapperState={wasMultiple:!!i.multiple},o=ae({},i,{value:void 0}),ai(`invalid`,e);break;case`textarea`:F(e,i),o=Ee(e,i),ai(`invalid`,e);break;default:o=i}for(s in Le(n,o),l=o,l)if(l.hasOwnProperty(s)){var u=l[s];s===`style`?Fe(e,u):s===`dangerouslySetInnerHTML`?(u=u?u.__html:void 0,u!=null&&Ae(e,u)):s===`children`?typeof u==`string`?(n!==`textarea`||u!==``)&&je(e,u):typeof u==`number`&&je(e,``+u):s!==`suppressContentEditableWarning`&&s!==`suppressHydrationWarning`&&s!==`autoFocus`&&(a.hasOwnProperty(s)?u!=null&&s===`onScroll`&&ai(`scroll`,e):u!=null&&S(e,s,u,c))}switch(n){case`input`:ge(e),Ce(e,i,!1);break;case`textarea`:ge(e),I(e);break;case`option`:i.value!=null&&e.setAttribute(`value`,``+pe(i.value));break;case`select`:e.multiple=!!i.multiple,s=i.value,s==null?i.defaultValue!=null&&Te(e,!!i.multiple,i.defaultValue,!0):Te(e,!!i.multiple,s,!1);break;default:typeof o.onClick==`function`&&(e.onclick=K)}switch(n){case`button`:case`input`:case`select`:case`textarea`:i=!!i.autoFocus;break a;case`img`:i=!0;break a;default:i=!1}}i&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return oc(t),null;case 6:if(e&&t.stateNode!=null)X(e,t,e.memoizedProps,i);else{if(typeof i!=`string`&&t.stateNode===null)throw Error(r(166));if(n=lo(co.current),lo(oo.current),Ea(t)){if(i=t.stateNode,n=t.memoizedProps,i[Oi]=t,(s=i.nodeValue!==n)&&(e=ya,e!==null))switch(e.tag){case 3:gi(i.nodeValue,n,(e.mode&1)!=0);break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&gi(i.nodeValue,n,(e.mode&1)!=0)}s&&(t.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Oi]=t,t.stateNode=i}return oc(t),null;case 13:if(Vi(ho),i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Y&&J!==null&&t.mode&1&&!(t.flags&128))Da(),Oa(),t.flags|=98560,s=!1;else if(s=Ea(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(r(318));if(s=t.memoizedState,s=s===null?null:s.dehydrated,!s)throw Error(r(317));s[Oi]=t}else Oa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;oc(t),s=!1}else ba!==null&&(yl(ba),ba=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(t.child.flags|=8192,t.mode&1&&(e===null||ho.current&1?qc===0&&(qc=3):kl())),t.updateQueue!==null&&(t.flags|=4),oc(t),null);case 4:return fo(),e===null&&ci(t.stateNode.containerInfo),oc(t),null;case 10:return Ha(t.type._context),oc(t),null;case 17:return Ji(t.type)&&Yi(),oc(t),null;case 19:if(Vi(ho),s=t.memoizedState,s===null)return oc(t),null;if(i=(t.flags&128)!=0,c=s.rendering,c===null)if(i)Z(s,!1);else{if(qc!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(c=go(e),c!==null){for(t.flags|=128,Z(s,!1),i=c.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),t.subtreeFlags=0,i=n,n=t.child;n!==null;)s=n,e=i,s.flags&=14680066,c=s.alternate,c===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=c.childLanes,s.lanes=c.lanes,s.child=c.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=c.memoizedProps,s.memoizedState=c.memoizedState,s.updateQueue=c.updateQueue,s.type=c.type,e=c.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Hi(ho,ho.current&1|2),t.child}e=e.sibling}s.tail!==null&&_t()>tl&&(t.flags|=128,i=!0,Z(s,!1),t.lanes=4194304)}else{if(!i)if(e=go(c),e!==null){if(t.flags|=128,i=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Z(s,!0),s.tail===null&&s.tailMode===`hidden`&&!c.alternate&&!Y)return oc(t),null}else 2*_t()-s.renderingStartTime>tl&&n!==1073741824&&(t.flags|=128,i=!0,Z(s,!1),t.lanes=4194304);s.isBackwards?(c.sibling=t.child,t.child=c):(n=s.last,n===null?t.child=c:n.sibling=c,s.last=c)}return s.tail===null?(oc(t),null):(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=_t(),t.sibling=null,n=ho.current,Hi(ho,i?n&1|2:n&1),t);case 22:case 23:return Tl(),i=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(t.flags|=8192),i&&t.mode&1?Gc&1073741824&&(oc(t),t.subtreeFlags&6&&(t.flags|=8192)):oc(t),null;case 24:return null;case 25:return null}throw Error(r(156,t.tag))}function cc(e,t){switch(va(t),t.tag){case 1:return Ji(t.type)&&Yi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return fo(),Vi(Gi),Vi(Wi),vo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return mo(t),null;case 13:if(Vi(ho),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(r(340));Oa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Vi(ho),null;case 4:return fo(),null;case 10:return Ha(t.type._context),null;case 22:case 23:return Tl(),null;case 24:return null;default:return null}}var lc=!1,uc=!1,dc=typeof WeakSet==`function`?WeakSet:Set,Q=null;function fc(e,t){var n=e.ref;if(n!==null)if(typeof n==`function`)try{n(null)}catch(n){zl(e,t,n)}else n.current=null}function pc(e,t,n){try{n()}catch(n){zl(e,t,n)}}var mc=!1;function hc(e,t){if(_i=pn,e=Pr(),Fr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(vi={focusedElem:e,selectionRange:n},pn=!1,Q=t;Q!==null;)if(t=Q,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,Q=e;else for(;Q!==null;){t=Q;try{var h=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(h!==null){var g=h.memoizedProps,_=h.memoizedState,v=t.stateNode;v.__reactInternalSnapshotBeforeUpdate=v.getSnapshotBeforeUpdate(t.elementType===t.type?g:_s(t.type,g),_)}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent=``:y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(r(163))}}catch(e){zl(t,t.return,e)}if(e=t.sibling,e!==null){e.return=t.return,Q=e;break}Q=t.return}return h=mc,mc=!1,h}function gc(e,t,n){var r=t.updateQueue;if(r=r===null?null:r.lastEffect,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&pc(t,n,a)}i=i.next}while(i!==r)}}function _c(e,t){if(t=t.updateQueue,t=t===null?null:t.lastEffect,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function vc(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t==`function`?t(e):t.current=e}}function yc(e){var t=e.alternate;t!==null&&(e.alternate=null,yc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Oi],delete t[ki],delete t[ji],delete t[Mi],delete t[Ni])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function bc(e){return e.tag===5||e.tag===3||e.tag===4}function xc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||bc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Sc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=K));else if(r!==4&&(e=e.child,e!==null))for(Sc(e,t,n),e=e.sibling;e!==null;)Sc(e,t,n),e=e.sibling}function Cc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Cc(e,t,n),e=e.sibling;e!==null;)Cc(e,t,n),e=e.sibling}var wc=null,Tc=!1;function Ec(e,t,n){for(n=n.child;n!==null;)Dc(e,t,n),n=n.sibling}function Dc(e,t,n){if(wt&&typeof wt.onCommitFiberUnmount==`function`)try{wt.onCommitFiberUnmount(Ct,n)}catch{}switch(n.tag){case 5:uc||fc(n,t);case 6:var r=wc,i=Tc;wc=null,Ec(e,t,n),wc=r,Tc=i,wc!==null&&(Tc?(e=wc,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):wc.removeChild(n.stateNode));break;case 18:wc!==null&&(Tc?(e=wc,n=n.stateNode,e.nodeType===8?wi(e.parentNode,n):e.nodeType===1&&wi(e,n),dn(e)):wi(wc,n.stateNode));break;case 4:r=wc,i=Tc,wc=n.stateNode.containerInfo,Tc=!0,Ec(e,t,n),wc=r,Tc=i;break;case 0:case 11:case 14:case 15:if(!uc&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var a=i,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&pc(n,t,o),i=i.next}while(i!==r)}Ec(e,t,n);break;case 1:if(!uc&&(fc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(e){zl(n,t,e)}Ec(e,t,n);break;case 21:Ec(e,t,n);break;case 22:n.mode&1?(uc=(r=uc)||n.memoizedState!==null,Ec(e,t,n),uc=r):Ec(e,t,n);break;default:Ec(e,t,n)}}function Oc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new dc),t.forEach(function(t){var r=Ul.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}}function kc(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];try{var o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 5:wc=c.stateNode,Tc=!1;break a;case 3:wc=c.stateNode.containerInfo,Tc=!0;break a;case 4:wc=c.stateNode.containerInfo,Tc=!0;break a}c=c.return}if(wc===null)throw Error(r(160));Dc(o,s,a),wc=null,Tc=!1;var l=a.alternate;l!==null&&(l.return=null),a.return=null}catch(e){zl(a,t,e)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ac(t,e),t=t.sibling}function Ac(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(kc(t,e),jc(e),i&4){try{gc(3,e,e.return),_c(3,e)}catch(t){zl(e,e.return,t)}try{gc(5,e,e.return)}catch(t){zl(e,e.return,t)}}break;case 1:kc(t,e),jc(e),i&512&&n!==null&&fc(n,n.return);break;case 5:if(kc(t,e),jc(e),i&512&&n!==null&&fc(n,n.return),e.flags&32){var a=e.stateNode;try{je(a,``)}catch(t){zl(e,e.return,t)}}if(i&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,s=n===null?o:n.memoizedProps,c=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{c===`input`&&o.type===`radio`&&o.name!=null&&xe(a,o),Re(c,s);var u=Re(c,o);for(s=0;s<l.length;s+=2){var d=l[s],f=l[s+1];d===`style`?Fe(a,f):d===`dangerouslySetInnerHTML`?Ae(a,f):d===`children`?je(a,f):S(a,d,f,u)}switch(c){case`input`:Se(a,o);break;case`textarea`:De(a,o);break;case`select`:var p=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var m=o.value;m==null?p!==!!o.multiple&&(o.defaultValue==null?Te(a,!!o.multiple,o.multiple?[]:``,!1):Te(a,!!o.multiple,o.defaultValue,!0)):Te(a,!!o.multiple,m,!1)}a[ki]=o}catch(t){zl(e,e.return,t)}}break;case 6:if(kc(t,e),jc(e),i&4){if(e.stateNode===null)throw Error(r(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(t){zl(e,e.return,t)}}break;case 3:if(kc(t,e),jc(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{dn(t.containerInfo)}catch(t){zl(e,e.return,t)}break;case 4:kc(t,e),jc(e);break;case 13:kc(t,e),jc(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(el=_t())),i&4&&Oc(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(uc=(u=uc)||d,kc(t,e),uc=u):kc(t,e),jc(e),i&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(Q=e,d=e.child;d!==null;){for(f=Q=d;Q!==null;){switch(p=Q,m=p.child,p.tag){case 0:case 11:case 14:case 15:gc(4,p,p.return);break;case 1:fc(p,p.return);var h=p.stateNode;if(typeof h.componentWillUnmount==`function`){i=p,n=p.return;try{t=i,h.props=t.memoizedProps,h.state=t.memoizedState,h.componentWillUnmount()}catch(e){zl(i,n,e)}}break;case 5:fc(p,p.return);break;case 22:if(p.memoizedState!==null){Fc(f);continue}}m===null?Fc(f):(m.return=p,Q=m)}d=d.sibling}a:for(d=null,f=e;;){if(f.tag===5){if(d===null){d=f;try{a=f.stateNode,u?(o=a.style,typeof o.setProperty==`function`?o.setProperty(`display`,`none`,`important`):o.display=`none`):(c=f.stateNode,l=f.memoizedProps.style,s=l!=null&&l.hasOwnProperty(`display`)?l.display:null,c.style.display=Pe(`display`,s))}catch(t){zl(e,e.return,t)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=u?``:f.memoizedProps}catch(t){zl(e,e.return,t)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break a;for(;f.sibling===null;){if(f.return===null||f.return===e)break a;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:kc(t,e),jc(e),i&4&&Oc(e);break;case 21:break;default:kc(t,e),jc(e)}}function jc(e){var t=e.flags;if(t&2){try{a:{for(var n=e.return;n!==null;){if(bc(n)){var i=n;break a}n=n.return}throw Error(r(160))}switch(i.tag){case 5:var a=i.stateNode;i.flags&32&&(je(a,``),i.flags&=-33),Cc(e,xc(e),a);break;case 3:case 4:var o=i.stateNode.containerInfo;Sc(e,xc(e),o);break;default:throw Error(r(161))}}catch(t){zl(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Mc(e,t,n){Q=e,Nc(e,t,n)}function Nc(e,t,n){for(var r=(e.mode&1)!=0;Q!==null;){var i=Q,a=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||lc;if(!o){var s=i.alternate,c=s!==null&&s.memoizedState!==null||uc;s=lc;var l=uc;if(lc=o,(uc=c)&&!l)for(Q=i;Q!==null;)o=Q,c=o.child,o.tag===22&&o.memoizedState!==null||c===null?Ic(i):(c.return=o,Q=c);for(;a!==null;)Q=a,Nc(a,t,n),a=a.sibling;Q=i,lc=s,uc=l}Pc(e,t,n)}else i.subtreeFlags&8772&&a!==null?(a.return=i,Q=a):Pc(e,t,n)}}function Pc(e){for(;Q!==null;){var t=Q;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:uc||_c(5,t);break;case 1:var i=t.stateNode;if(t.flags&4&&!uc)if(n===null)i.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:_s(t.type,n.memoizedProps);i.componentDidUpdate(a,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&io(t,o,i);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}io(t,s,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var l=t.memoizedProps;switch(t.type){case`button`:case`input`:case`select`:case`textarea`:l.autoFocus&&n.focus();break;case`img`:l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&dn(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(r(163))}uc||t.flags&512&&vc(t)}catch(e){zl(t,t.return,e)}}if(t===e){Q=null;break}if(n=t.sibling,n!==null){n.return=t.return,Q=n;break}Q=t.return}}function Fc(e){for(;Q!==null;){var t=Q;if(t===e){Q=null;break}var n=t.sibling;if(n!==null){n.return=t.return,Q=n;break}Q=t.return}}function Ic(e){for(;Q!==null;){var t=Q;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{_c(4,t)}catch(e){zl(t,n,e)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount==`function`){var i=t.return;try{r.componentDidMount()}catch(e){zl(t,i,e)}}var a=t.return;try{vc(t)}catch(e){zl(t,a,e)}break;case 5:var o=t.return;try{vc(t)}catch(e){zl(t,o,e)}}}catch(e){zl(t,t.return,e)}if(t===e){Q=null;break}var s=t.sibling;if(s!==null){s.return=t.return,Q=s;break}Q=t.return}}var Lc=Math.ceil,Rc=C.ReactCurrentDispatcher,zc=C.ReactCurrentOwner,Bc=C.ReactCurrentBatchConfig,Vc=0,Hc=null,Uc=null,Wc=0,Gc=0,Kc=Bi(0),qc=0,Jc=null,Yc=0,Xc=0,Zc=0,Qc=null,$c=null,el=0,tl=1/0,nl=null,rl=!1,il=null,al=null,ol=!1,sl=null,cl=0,ll=0,ul=null,dl=-1,fl=0;function pl(){return Vc&6?_t():dl===-1?dl=_t():dl}function ml(e){return e.mode&1?Vc&2&&Wc!==0?Wc&-Wc:Aa.transition===null?(e=Bt,e===0?(e=window.event,e=e===void 0?16:yn(e.type),e):e):(fl===0&&(fl=Ft()),fl):1}function hl(e,t,n,i){if(50<ll)throw ll=0,ul=null,Error(r(185));Lt(e,n,i),(!(Vc&2)||e!==Hc)&&(e===Hc&&(!(Vc&2)&&(Xc|=n),qc===4&&xl(e,Wc)),gl(e,i),n===1&&Vc===0&&!(t.mode&1)&&(tl=_t()+500,ta&&aa()))}function gl(e,t){var n=e.callbackNode;V(e,t);var r=Mt(e,e===Hc?Wc:0);if(r===0)n!==null&&mt(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&mt(n),t===1)e.tag===0?ia(Sl.bind(null,e)):ra(Sl.bind(null,e)),Si(function(){!(Vc&6)&&aa()}),n=null;else{switch(Vt(r)){case 1:n=yt;break;case 4:n=bt;break;case 16:n=xt;break;case 536870912:n=z;break;default:n=xt}n=Gl(n,_l.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function _l(e,t){if(dl=-1,fl=0,Vc&6)throw Error(r(327));var n=e.callbackNode;if(Ll()&&e.callbackNode!==n)return null;var i=Mt(e,e===Hc?Wc:0);if(i===0)return null;if(i&30||(i&e.expiredLanes)!==0||t)t=Al(e,i);else{t=i;var a=Vc;Vc|=2;var o=Ol();(Hc!==e||Wc!==t)&&(nl=null,tl=_t()+500,El(e,t));do try{Ml();break}catch(t){Dl(e,t)}while(1);Va(),Rc.current=o,Vc=a,Uc===null?(Hc=null,Wc=0,t=qc):t=0}if(t!==0){if(t===2&&(a=Pt(e),a!==0&&(i=a,t=vl(e,a))),t===1)throw n=Jc,El(e,0),xl(e,i),gl(e,_t()),n;if(t===6)xl(e,i);else{if(a=e.current.alternate,!(i&30)&&!bl(a)&&(t=Al(e,i),t===2&&(o=Pt(e),o!==0&&(i=o,t=vl(e,o))),t===1))throw n=Jc,El(e,0),xl(e,i),gl(e,_t()),n;switch(e.finishedWork=a,e.finishedLanes=i,t){case 0:case 1:throw Error(r(345));case 2:Fl(e,$c,nl);break;case 3:if(xl(e,i),(i&130023424)===i&&(t=el+500-_t(),10<t)){if(Mt(e,0)!==0)break;if(a=e.suspendedLanes,(a&i)!==i){pl(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=yi(Fl.bind(null,e,$c,nl),t);break}Fl(e,$c,nl);break;case 4:if(xl(e,i),(i&4194240)===i)break;for(t=e.eventTimes,a=-1;0<i;){var s=31-Et(i);o=1<<s,s=t[s],s>a&&(a=s),i&=~o}if(i=a,i=_t()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Lc(i/1960))-i,10<i){e.timeoutHandle=yi(Fl.bind(null,e,$c,nl),i);break}Fl(e,$c,nl);break;case 5:Fl(e,$c,nl);break;default:throw Error(r(329))}}}return gl(e,_t()),e.callbackNode===n?_l.bind(null,e):null}function vl(e,t){var n=Qc;return e.current.memoizedState.isDehydrated&&(El(e,t).flags|=256),e=Al(e,t),e!==2&&(t=$c,$c=n,t!==null&&yl(t)),e}function yl(e){$c===null?$c=e:$c.push.apply($c,e)}function bl(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!kr(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function xl(e,t){for(t&=~Zc,t&=~Xc,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Et(t),r=1<<n;e[n]=-1,t&=~r}}function Sl(e){if(Vc&6)throw Error(r(327));Ll();var t=Mt(e,0);if(!(t&1))return gl(e,_t()),null;var n=Al(e,t);if(e.tag!==0&&n===2){var i=Pt(e);i!==0&&(t=i,n=vl(e,i))}if(n===1)throw n=Jc,El(e,0),xl(e,t),gl(e,_t()),n;if(n===6)throw Error(r(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Fl(e,$c,nl),gl(e,_t()),null}function Cl(e,t){var n=Vc;Vc|=1;try{return e(t)}finally{Vc=n,Vc===0&&(tl=_t()+500,ta&&aa())}}function wl(e){sl!==null&&sl.tag===0&&!(Vc&6)&&Ll();var t=Vc;Vc|=1;var n=Bc.transition,r=Bt;try{if(Bc.transition=null,Bt=1,e)return e()}finally{Bt=r,Bc.transition=n,Vc=t,!(Vc&6)&&aa()}}function Tl(){Gc=Kc.current,Vi(Kc)}function El(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,bi(n)),Uc!==null)for(n=Uc.return;n!==null;){var r=n;switch(va(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Yi();break;case 3:fo(),Vi(Gi),Vi(Wi),vo();break;case 5:mo(r);break;case 4:fo();break;case 13:Vi(ho);break;case 19:Vi(ho);break;case 10:Ha(r.type._context);break;case 22:case 23:Tl()}n=n.return}if(Hc=e,Uc=e=Xl(e.current,null),Wc=Gc=t,qc=0,Jc=null,Zc=Xc=Yc=0,$c=Qc=null,Ka!==null){for(t=0;t<Ka.length;t++)if(n=Ka[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=i,r.next=o}n.pending=r}Ka=null}return e}function Dl(e,t){do{var n=Uc;try{if(Va(),yo.current=ps,To){for(var i=So.memoizedState;i!==null;){var a=i.queue;a!==null&&(a.pending=null),i=i.next}To=!1}if(xo=0,wo=Co=So=null,Eo=!1,Do=0,zc.current=null,n===null||n.return===null){qc=1,Jc=t,Uc=null;break}a:{var o=e,s=n.return,c=n,l=t;if(t=Wc,c.flags|=32768,typeof l==`object`&&l&&typeof l.then==`function`){var u=l,d=c,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var m=js(s);if(m!==null){m.flags&=-257,Ms(m,s,c,o,t),m.mode&1&&As(o,u,t),t=m,l=u;var h=t.updateQueue;if(h===null){var g=new Set;g.add(l),t.updateQueue=g}else h.add(l);break a}else{if(!(t&1)){As(o,u,t),kl();break a}l=Error(r(426))}}else if(Y&&c.mode&1){var _=js(s);if(_!==null){!(_.flags&65536)&&(_.flags|=256),Ms(_,s,c,o,t),ka(ws(l,c));break a}}o=l=ws(l,c),qc!==4&&(qc=2),Qc===null?Qc=[o]:Qc.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var v=Os(o,l,t);no(o,v);break a;case 1:c=l;var y=o.type,b=o.stateNode;if(!(o.flags&128)&&(typeof y.getDerivedStateFromError==`function`||b!==null&&typeof b.componentDidCatch==`function`&&(al===null||!al.has(b)))){o.flags|=65536,t&=-t,o.lanes|=t;var x=ks(o,c,t);no(o,x);break a}}o=o.return}while(o!==null)}Pl(n)}catch(e){t=e,Uc===n&&n!==null&&(Uc=n=n.return);continue}break}while(1)}function Ol(){var e=Rc.current;return Rc.current=ps,e===null?ps:e}function kl(){(qc===0||qc===3||qc===2)&&(qc=4),Hc===null||!(Yc&268435455)&&!(Xc&268435455)||xl(Hc,Wc)}function Al(e,t){var n=Vc;Vc|=2;var i=Ol();(Hc!==e||Wc!==t)&&(nl=null,El(e,t));do try{jl();break}catch(t){Dl(e,t)}while(1);if(Va(),Vc=n,Rc.current=i,Uc!==null)throw Error(r(261));return Hc=null,Wc=0,qc}function jl(){for(;Uc!==null;)Nl(Uc)}function Ml(){for(;Uc!==null&&!ht();)Nl(Uc)}function Nl(e){var t=Wl(e.alternate,e,Gc);e.memoizedProps=e.pendingProps,t===null?Pl(e):Uc=t,zc.current=null}function Pl(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=cc(n,t),n!==null){n.flags&=32767,Uc=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{qc=6,Uc=null;return}}else if(n=sc(n,t,Gc),n!==null){Uc=n;return}if(t=t.sibling,t!==null){Uc=t;return}Uc=t=e}while(t!==null);qc===0&&(qc=5)}function Fl(e,t,n){var r=Bt,i=Bc.transition;try{Bc.transition=null,Bt=1,Il(e,t,n,r)}finally{Bc.transition=i,Bt=r}return null}function Il(e,t,n,i){do Ll();while(sl!==null);if(Vc&6)throw Error(r(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(r(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Rt(e,o),e===Hc&&(Uc=Hc=null,Wc=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ol||(ol=!0,Gl(xt,function(){return Ll(),null})),o=(n.flags&15990)!=0,n.subtreeFlags&15990||o){o=Bc.transition,Bc.transition=null;var s=Bt;Bt=1;var c=Vc;Vc|=4,zc.current=null,hc(e,n),Ac(n,e),Ir(vi),pn=!!_i,vi=_i=null,e.current=n,Mc(n,e,a),gt(),Vc=c,Bt=s,Bc.transition=o}else e.current=n;if(ol&&(ol=!1,sl=e,cl=a),o=e.pendingLanes,o===0&&(al=null),Tt(n.stateNode,i),gl(e,_t()),t!==null)for(i=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],i(a.value,{componentStack:a.stack,digest:a.digest});if(rl)throw rl=!1,e=il,il=null,e;return cl&1&&e.tag!==0&&Ll(),o=e.pendingLanes,o&1?e===ul?ll++:(ll=0,ul=e):ll=0,aa(),null}function Ll(){if(sl!==null){var e=Vt(cl),t=Bc.transition,n=Bt;try{if(Bc.transition=null,Bt=16>e?16:e,sl===null)var i=!1;else{if(e=sl,sl=null,cl=0,Vc&6)throw Error(r(331));var a=Vc;for(Vc|=4,Q=e.current;Q!==null;){var o=Q,s=o.child;if(Q.flags&16){var c=o.deletions;if(c!==null){for(var l=0;l<c.length;l++){var u=c[l];for(Q=u;Q!==null;){var d=Q;switch(d.tag){case 0:case 11:case 15:gc(8,d,o)}var f=d.child;if(f!==null)f.return=d,Q=f;else for(;Q!==null;){d=Q;var p=d.sibling,m=d.return;if(yc(d),d===u){Q=null;break}if(p!==null){p.return=m,Q=p;break}Q=m}}}var h=o.alternate;if(h!==null){var g=h.child;if(g!==null){h.child=null;do{var _=g.sibling;g.sibling=null,g=_}while(g!==null)}}Q=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,Q=s;else b:for(;Q!==null;){if(o=Q,o.flags&2048)switch(o.tag){case 0:case 11:case 15:gc(9,o,o.return)}var v=o.sibling;if(v!==null){v.return=o.return,Q=v;break b}Q=o.return}}var y=e.current;for(Q=y;Q!==null;){s=Q;var b=s.child;if(s.subtreeFlags&2064&&b!==null)b.return=s,Q=b;else b:for(s=y;Q!==null;){if(c=Q,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:_c(9,c)}}catch(e){zl(c,c.return,e)}if(c===s){Q=null;break b}var x=c.sibling;if(x!==null){x.return=c.return,Q=x;break b}Q=c.return}}if(Vc=a,aa(),wt&&typeof wt.onPostCommitFiberRoot==`function`)try{wt.onPostCommitFiberRoot(Ct,e)}catch{}i=!0}return i}finally{Bt=n,Bc.transition=t}}return!1}function Rl(e,t,n){t=ws(n,t),t=Os(e,t,1),e=eo(e,t,1),t=pl(),e!==null&&(Lt(e,1,t),gl(e,t))}function zl(e,t,n){if(e.tag===3)Rl(e,e,n);else for(;t!==null;){if(t.tag===3){Rl(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(al===null||!al.has(r))){e=ws(n,e),e=ks(t,e,1),t=eo(t,e,1),e=pl(),t!==null&&(Lt(t,1,e),gl(t,e));break}}t=t.return}}function Bl(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=pl(),e.pingedLanes|=e.suspendedLanes&n,Hc===e&&(Wc&n)===n&&(qc===4||qc===3&&(Wc&130023424)===Wc&&500>_t()-el?El(e,0):Zc|=n),gl(e,t)}function Vl(e,t){t===0&&(e.mode&1?(t=jt,jt<<=1,!(jt&130023424)&&(jt=4194304)):t=1);var n=pl();e=Ya(e,t),e!==null&&(Lt(e,t,n),gl(e,n))}function Hl(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Vl(e,n)}function Ul(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(r(314))}i!==null&&i.delete(t),Vl(e,n)}var Wl=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Gi.current)Ps=!0;else{if((e.lanes&n)===0&&!(t.flags&128))return Ps=!1,rc(e,t,n);Ps=!!(e.flags&131072)}else Ps=!1,Y&&t.flags&1048576&&ga(t,la,t.index);switch(t.lanes=0,t.tag){case 2:var i=t.type;tc(e,t),e=t.pendingProps;var a=qi(t,Wi.current);Wa(t,n),a=jo(null,t,i,e,a,n);var o=Mo();return t.flags|=1,typeof a==`object`&&a&&typeof a.render==`function`&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ji(i)?(o=!0,Qi(t)):o=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Za(t),a.updater=ys,t.stateNode=a,a._reactInternals=t,Cs(t,i,e,n),t=Us(null,t,i,!0,o,n)):(t.tag=0,Y&&o&&_a(t),Fs(null,t,a,n),t=t.child),t;case 16:i=t.elementType;a:{switch(tc(e,t),e=t.pendingProps,a=i._init,i=a(i._payload),t.type=i,a=t.tag=Yl(i),e=_s(i,e),a){case 0:t=Vs(null,t,i,e,n);break a;case 1:t=Hs(null,t,i,e,n);break a;case 11:t=Is(null,t,i,e,n);break a;case 14:t=Ls(null,t,i,_s(i.type,e),n);break a}throw Error(r(306,i,``))}return t;case 0:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:_s(i,a),Vs(e,t,i,a,n);case 1:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:_s(i,a),Hs(e,t,i,a,n);case 3:a:{if(Ws(t),e===null)throw Error(r(387));i=t.pendingProps,o=t.memoizedState,a=o.element,Qa(e,t),ro(t,i,null,n);var s=t.memoizedState;if(i=s.element,o.isDehydrated)if(o={element:i,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){a=ws(Error(r(423)),t),t=Gs(e,t,i,n,a);break a}else if(i!==a){a=ws(Error(r(424)),t),t=Gs(e,t,i,n,a);break a}else for(J=Ti(t.stateNode.containerInfo.firstChild),ya=t,Y=!0,ba=null,n=Ia(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Oa(),i===a){t=nc(e,t,n);break a}Fs(e,t,i,n)}t=t.child}return t;case 5:return po(t),e===null&&wa(t),i=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,s=a.children,q(i,a)?s=null:o!==null&&q(i,o)&&(t.flags|=32),Bs(e,t),Fs(e,t,s,n),t.child;case 6:return e===null&&wa(t),null;case 13:return Js(e,t,n);case 4:return uo(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Fa(t,null,i,n):Fs(e,t,i,n),t.child;case 11:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:_s(i,a),Is(e,t,i,a,n);case 7:return Fs(e,t,t.pendingProps,n),t.child;case 8:return Fs(e,t,t.pendingProps.children,n),t.child;case 12:return Fs(e,t,t.pendingProps.children,n),t.child;case 10:a:{if(i=t.type._context,a=t.pendingProps,o=t.memoizedProps,s=a.value,Hi(La,i._currentValue),i._currentValue=s,o!==null)if(kr(o.value,s)){if(o.children===a.children&&!Gi.current){t=nc(e,t,n);break a}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){s=o.child;for(var l=c.firstContext;l!==null;){if(l.context===i){if(o.tag===1){l=$a(-1,n&-n),l.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?l.next=l:(l.next=d.next,d.next=l),u.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Ua(o.return,n,t),c.lanes|=n;break}l=l.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(r(341));s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),Ua(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}Fs(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,i=t.pendingProps.children,Wa(t,n),a=Ga(a),i=i(a),t.flags|=1,Fs(e,t,i,n),t.child;case 14:return i=t.type,a=_s(i,t.pendingProps),a=_s(i.type,a),Ls(e,t,i,a,n);case 15:return Rs(e,t,t.type,t.pendingProps,n);case 17:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:_s(i,a),tc(e,t),t.tag=1,Ji(i)?(e=!0,Qi(t)):e=!1,Wa(t,n),xs(t,i,a),Cs(t,i,a,n),Us(null,t,i,!0,e,n);case 19:return ec(e,t,n);case 22:return zs(e,t,n)}throw Error(r(156,t.tag))};function Gl(e,t){return pt(e,t)}function Kl(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ql(e,t,n,r){return new Kl(e,t,n,r)}function Jl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Yl(e){if(typeof e==`function`)return+!!Jl(e);if(e!=null){if(e=e.$$typeof,e===ee)return 11;if(e===M)return 14}return 2}function Xl(e,t){var n=e.alternate;return n===null?(n=ql(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Zl(e,t,n,i,a,o){var s=2;if(i=e,typeof e==`function`)Jl(e)&&(s=1);else if(typeof e==`string`)s=5;else a:switch(e){case E:return Ql(n.children,a,o,t);case D:s=8,a|=8;break;case O:return e=ql(12,n,t,a|2),e.elementType=O,e.lanes=o,e;case te:return e=ql(13,n,t,a),e.elementType=te,e.lanes=o,e;case j:return e=ql(19,n,t,a),e.elementType=j,e.lanes=o,e;case ne:return $l(n,a,o,t);default:if(typeof e==`object`&&e)switch(e.$$typeof){case k:s=10;break a;case A:s=9;break a;case ee:s=11;break a;case M:s=14;break a;case N:s=16,i=null;break a}throw Error(r(130,e==null?e:typeof e,``))}return t=ql(s,n,t,a),t.elementType=e,t.type=i,t.lanes=o,t}function Ql(e,t,n,r){return e=ql(7,e,r,t),e.lanes=n,e}function $l(e,t,n,r){return e=ql(22,e,r,t),e.elementType=ne,e.lanes=n,e.stateNode={isHidden:!1},e}function eu(e,t,n){return e=ql(6,e,null,t),e.lanes=n,e}function tu(e,t,n){return t=ql(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function nu(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=It(0),this.expirationTimes=It(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=It(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function ru(e,t,n,r,i,a,o,s,c){return e=new nu(e,t,n,s,c),t===1?(t=1,!0===a&&(t|=8)):t=0,a=ql(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Za(a),e}function iu(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:T,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}function au(e){if(!e)return Ui;e=e._reactInternals;a:{if(st(e)!==e||e.tag!==1)throw Error(r(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break a;case 1:if(Ji(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break a}}t=t.return}while(t!==null);throw Error(r(171))}if(e.tag===1){var n=e.type;if(Ji(n))return Zi(e,n,t)}return t}function ou(e,t,n,r,i,a,o,s,c){return e=ru(n,r,!0,e,i,a,o,s,c),e.context=au(null),n=e.current,r=pl(),i=ml(n),a=$a(r,i),a.callback=t??null,eo(n,a,i),e.current.lanes=i,Lt(e,i,r),gl(e,r),e}function su(e,t,n,r){var i=t.current,a=pl(),o=ml(i);return n=au(n),t.context===null?t.context=n:t.pendingContext=n,t=$a(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=eo(i,t,o),e!==null&&(hl(e,i,o,a),to(e,i,o)),o}function cu(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function lu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function uu(e,t){lu(e,t),(e=e.alternate)&&lu(e,t)}function du(){return null}var fu=typeof reportError==`function`?reportError:function(e){console.error(e)};function pu(e){this._internalRoot=e}mu.prototype.render=pu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(r(409));su(e,t,null,null)},mu.prototype.unmount=pu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;wl(function(){su(null,e,null,null)}),t[Ai]=null}};function mu(e){this._internalRoot=e}mu.prototype.unstable_scheduleHydration=function(e){if(e){var t=Gt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<en.length&&t!==0&&t<en[n].priority;n++);en.splice(n,0,e),n===0&&on(e)}};function hu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function gu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==` react-mount-point-unstable `))}function _u(){}function vu(e,t,n,r,i){if(i){if(typeof r==`function`){var a=r;r=function(){var e=cu(o);a.call(e)}}var o=ou(t,r,e,0,null,!1,!1,``,_u);return e._reactRootContainer=o,e[Ai]=o.current,ci(e.nodeType===8?e.parentNode:e),wl(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r==`function`){var s=r;r=function(){var e=cu(c);s.call(e)}}var c=ru(e,0,!1,null,null,!1,!1,``,_u);return e._reactRootContainer=c,e[Ai]=c.current,ci(e.nodeType===8?e.parentNode:e),wl(function(){su(t,c,n,r)}),c}function yu(e,t,n,r,i){var a=n._reactRootContainer;if(a){var o=a;if(typeof i==`function`){var s=i;i=function(){var e=cu(o);s.call(e)}}su(t,o,e,i)}else o=vu(n,t,e,i,r);return cu(o)}Ht=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=B(t.pendingLanes);n!==0&&(zt(t,n|1),gl(t,_t()),!(Vc&6)&&(tl=_t()+500,aa()))}break;case 13:wl(function(){var t=Ya(e,1);t!==null&&hl(t,e,1,pl())}),uu(e,1)}},Ut=function(e){if(e.tag===13){var t=Ya(e,134217728);t!==null&&hl(t,e,134217728,pl()),uu(e,134217728)}},Wt=function(e){if(e.tag===13){var t=ml(e),n=Ya(e,t);n!==null&&hl(n,e,t,pl()),uu(e,t)}},Gt=function(){return Bt},Kt=function(e,t){var n=Bt;try{return Bt=e,t()}finally{Bt=n}},Ve=function(e,t,n){switch(t){case`input`:if(Se(e,n),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name=`+JSON.stringify(``+t)+`][type="radio"]`),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=Li(i);if(!a)throw Error(r(90));_e(i),Se(i,a)}}}break;case`textarea`:De(e,n);break;case`select`:t=n.value,t!=null&&Te(e,!!n.multiple,t,!1)}},qe=Cl,Je=wl;var bu={usingClientEntryPoint:!1,Events:[Fi,Ii,Li,Ge,Ke,Cl]},xu={findFiberByHostInstance:Pi,bundleType:0,version:`18.3.1`,rendererPackageName:`react-dom`},Su={bundleType:xu.bundleType,version:xu.version,rendererPackageName:xu.rendererPackageName,rendererConfig:xu.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=dt(e),e===null?null:e.stateNode},findFiberByHostInstance:xu.findFiberByHostInstance||du,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:`18.3.1-next-f1338f8080-20240426`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Cu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Cu.isDisabled&&Cu.supportsFiber)try{Ct=Cu.inject(Su),wt=Cu}catch{}}e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bu,e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!hu(t))throw Error(r(200));return iu(e,t,null,n)},e.createRoot=function(e,t){if(!hu(e))throw Error(r(299));var n=!1,i=``,a=fu;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=ru(e,1,!1,null,null,n,!1,i,a),e[Ai]=t.current,ci(e.nodeType===8?e.parentNode:e),new pu(t)},e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(r(188)):(e=Object.keys(e).join(`,`),Error(r(268,e)));return e=dt(t),e=e===null?null:e.stateNode,e},e.flushSync=function(e){return wl(e)},e.hydrate=function(e,t,n){if(!gu(t))throw Error(r(200));return yu(null,e,t,!0,n)},e.hydrateRoot=function(e,t,n){if(!hu(e))throw Error(r(405));var i=n!=null&&n.hydratedSources||null,a=!1,o=``,s=fu;if(n!=null&&(!0===n.unstable_strictMode&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=ou(t,null,e,1,n??null,a,!1,o,s),e[Ai]=t.current,ci(e),i)for(e=0;e<i.length;e++)n=i[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new mu(t)},e.render=function(e,t,n){if(!gu(t))throw Error(r(200));return yu(null,e,t,!1,n)},e.unmountComponentAtNode=function(e){if(!gu(e))throw Error(r(40));return e._reactRootContainer?(wl(function(){yu(null,null,e,!1,function(){e._reactRootContainer=null,e[Ai]=null})}),!0):!1},e.unstable_batchedUpdates=Cl,e.unstable_renderSubtreeIntoContainer=function(e,t,n,i){if(!gu(n))throw Error(r(200));if(e==null||e._reactInternals===void 0)throw Error(r(38));return yu(e,t,n,!1,i)},e.version=`18.3.1-next-f1338f8080-20240426`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=m();e.createRoot=t.createRoot,e.hydrateRoot=t.hydrateRoot})),g=c(u());m();var _=h();function v(){return v=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v.apply(null,arguments)}var y;(function(e){e.Pop=`POP`,e.Push=`PUSH`,e.Replace=`REPLACE`})(y||={});var b=`popstate`;function x(e){e===void 0&&(e={});function t(e,t){let{pathname:n,search:r,hash:i}=e.location;return E(``,{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||`default`)}function n(e,t){return typeof t==`string`?t:D(t)}return k(t,n,null,e)}function S(e,t){if(e===!1||e==null)throw Error(t)}function C(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function w(){return Math.random().toString(36).substr(2,8)}function T(e,t){return{usr:e.state,key:e.key,idx:t}}function E(e,t,n,r){return n===void 0&&(n=null),v({pathname:typeof e==`string`?e:e.pathname,search:``,hash:``},typeof t==`string`?O(t):t,{state:n,key:t&&t.key||r||w()})}function D(e){let{pathname:t=`/`,search:n=``,hash:r=``}=e;return n&&n!==`?`&&(t+=n.charAt(0)===`?`?n:`?`+n),r&&r!==`#`&&(t+=r.charAt(0)===`#`?r:`#`+r),t}function O(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function k(e,t,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=y.Pop,c=null,l=u();l??(l=0,o.replaceState(v({},o.state,{idx:l}),``));function u(){return(o.state||{idx:null}).idx}function d(){s=y.Pop;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=y.Push;let r=E(h.location,e,t);n&&n(r,e),l=u()+1;let d=T(r,l),f=h.createHref(r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=y.Replace;let r=E(h.location,e,t);n&&n(r,e),l=u();let i=T(r,l),d=h.createHref(r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){let t=i.location.origin===`null`?i.location.href:i.location.origin,n=typeof e==`string`?e:D(e);return n=n.replace(/ $/,`%20`),S(t,`No window.location.(origin|href) available to create URL for href: `+n),new URL(n,t)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(b,d),c=e,()=>{i.removeEventListener(b,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}var A;(function(e){e.data=`data`,e.deferred=`deferred`,e.redirect=`redirect`,e.error=`error`})(A||={});function ee(e,t,n){return n===void 0&&(n=`/`),te(e,t,n,!1)}function te(e,t,n,r){let i=he((typeof t==`string`?O(t):t).pathname||`/`,n);if(i==null)return null;let a=j(e);N(a);let o=null,s=me(i);for(let e=0;o==null&&e<a.length;++e)o=de(a[e],s,r);return o}function j(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r=``);let i=(e,i,a)=>{let o={relativePath:a===void 0?e.path||``:a,caseSensitive:e.caseSensitive===!0,childrenIndex:i,route:e};o.relativePath.startsWith(`/`)&&(S(o.relativePath.startsWith(r),`Absolute route path "`+o.relativePath+`" nested under path `+(`"`+r+`" is not valid. An absolute child route path `)+`must start with the combined path of all its parent routes.`),o.relativePath=o.relativePath.slice(r.length));let s=we([r,o.relativePath]),c=n.concat(o);e.children&&e.children.length>0&&(S(e.index!==!0,`Index routes must not have child routes. Please remove `+(`all child routes from route path "`+s+`".`)),j(e.children,t,c,s)),!(e.path==null&&!e.index)&&t.push({path:s,score:le(s,e.index),routesMeta:c})};return e.forEach((e,t)=>{var n;if(e.path===``||!((n=e.path)!=null&&n.includes(`?`)))i(e,t);else for(let n of M(e.path))i(e,t,n)}),t}function M(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=M(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function N(e){e.sort((e,t)=>e.score===t.score?ue(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var ne=/^:[\w-]+$/,re=3,ie=2,ae=1,oe=10,se=-2,ce=e=>e===`*`;function le(e,t){let n=e.split(`/`),r=n.length;return n.some(ce)&&(r+=se),t&&(r+=ie),n.filter(e=>!ce(e)).reduce((e,t)=>e+(ne.test(t)?re:t===``?ae:oe),r)}function ue(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function de(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=fe({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=fe({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:we([a,u.pathname]),pathnameBase:Te(we([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=we([a,u.pathnameBase]))}return o}function fe(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=pe(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:i}=t;if(r===`*`){let e=s[n]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let c=s[n];return i&&!c?e[r]=void 0:e[r]=(c||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function pe(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),C(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "`+e+`" will be treated as if it were `+(`"`+e.replace(/\*$/,`/*`)+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+(`please change the route path to "`+e.replace(/\*$/,`/*`)+`".`));let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n)=>(r.push({paramName:t,isOptional:n!=null}),n?`/?([^\\/]+)?`:`/([^\\/]+)`));return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function me(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return C(!1,`The URL path "`+e+`" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent `+(`encoding (`+t+`).`)),e}}function he(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var ge=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,_e=e=>ge.test(e);function ve(e,t){t===void 0&&(t=`/`);let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?O(e):e,a;if(n)if(_e(n))a=n;else{if(n.includes(`//`)){let e=n;n=P(n),C(!1,`Pathnames cannot have embedded double slashes - normalizing `+(e+` -> `+n))}a=n.startsWith(`/`)?ye(n.substring(1),`/`):ye(n,t)}else a=t;return{pathname:a,search:Ee(r),hash:F(i)}}function ye(e,t){let n=t.replace(/\/+$/,``).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function be(e,t,n,r){return`Cannot include a '`+e+`' character in a manually specified `+("`to."+t+"` field ["+JSON.stringify(r)+`].  Please separate it out to the `)+("`to."+n+"` field. Alternatively you may provide the full path as ")+`a string in <Link to="..."> and the router will parse it for you.`}function xe(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Se(e,t){let n=xe(e);return t?n.map((e,t)=>t===n.length-1?e.pathname:e.pathnameBase):n.map(e=>e.pathnameBase)}function Ce(e,t,n,r){r===void 0&&(r=!1);let i;typeof e==`string`?i=O(e):(i=v({},e),S(!i.pathname||!i.pathname.includes(`?`),be(`?`,`pathname`,`search`,i)),S(!i.pathname||!i.pathname.includes(`#`),be(`#`,`pathname`,`hash`,i)),S(!i.search||!i.search.includes(`#`),be(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=ve(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var P=e=>e.replace(/\/\/+/g,`/`),we=e=>P(e.join(`/`)),Te=e=>e.replace(/\/+$/,``).replace(/^\/*/,`/`),Ee=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,F=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e;function De(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}var I=[`post`,`put`,`patch`,`delete`];new Set(I);var L=[`get`,...I];new Set(L);function Oe(){return Oe=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Oe.apply(null,arguments)}var ke=g.createContext(null),Ae=g.createContext(null),je=g.createContext(null),Me=g.createContext(null),Ne=g.createContext({outlet:null,matches:[],isDataRoute:!1}),Pe=g.createContext(null);function Fe(e,t){let{relative:n}=t===void 0?{}:t;!Ie()&&S(!1);let{basename:r,navigator:i}=g.useContext(je),{hash:a,pathname:o,search:s}=Ve(e,{relative:n}),c=o;return r!==`/`&&(c=o===`/`?r:we([r,o])),i.createHref({pathname:c,search:s,hash:a})}function Ie(){return g.useContext(Me)!=null}function Le(){return!Ie()&&S(!1),g.useContext(Me).location}function Re(e){g.useContext(je).static||g.useLayoutEffect(e)}function ze(){let{isDataRoute:e}=g.useContext(Ne);return e?nt():Be()}function Be(){!Ie()&&S(!1);let e=g.useContext(ke),{basename:t,future:n,navigator:r}=g.useContext(je),{matches:i}=g.useContext(Ne),{pathname:a}=Le(),o=JSON.stringify(Se(i,n.v7_relativeSplatPath)),s=g.useRef(!1);return Re(()=>{s.current=!0}),g.useCallback(function(n,i){if(i===void 0&&(i={}),!s.current)return;if(typeof n==`number`){r.go(n);return}let c=Ce(n,JSON.parse(o),a,i.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:we([t,c.pathname])),(i.replace?r.replace:r.push)(c,i.state,i)},[t,r,o,a,e])}function Ve(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=g.useContext(je),{matches:i}=g.useContext(Ne),{pathname:a}=Le(),o=JSON.stringify(Se(i,r.v7_relativeSplatPath));return g.useMemo(()=>Ce(e,JSON.parse(o),a,n===`path`),[e,o,a,n])}function He(e,t){return Ue(e,t)}function Ue(e,t,n,r){!Ie()&&S(!1);let{navigator:i}=g.useContext(je),{matches:a}=g.useContext(Ne),o=a[a.length-1],s=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:`/`;o&&o.route;let l=Le(),u;if(t){let e=typeof t==`string`?O(t):t;!(c===`/`||e.pathname?.startsWith(c))&&S(!1),u=e}else u=l;let d=u.pathname||`/`,f=d;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);f=`/`+d.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let p=ee(e,{pathname:f}),m=Je(p&&p.map(e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:we([c,i.encodeLocation?i.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:we([c,i.encodeLocation?i.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])})),a,n,r);return t&&m?g.createElement(Me.Provider,{value:{location:Oe({pathname:`/`,search:``,hash:``,state:null,key:`default`},u),navigationType:y.Pop}},m):m}function We(){let e=tt(),t=De(e)?e.status+` `+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null;return g.createElement(g.Fragment,null,g.createElement(`h2`,null,`Unexpected Application Error!`),g.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?g.createElement(`pre`,{style:{padding:`0.5rem`,backgroundColor:`rgba(200,200,200, 0.5)`}},n):null,null)}var Ge=g.createElement(We,null),Ke=class extends g.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error(`React Router caught the following error during render`,e,t)}render(){return this.state.error===void 0?this.props.children:g.createElement(Ne.Provider,{value:this.props.routeContext},g.createElement(Pe.Provider,{value:this.state.error,children:this.props.component}))}};function qe(e){let{routeContext:t,match:n,children:r}=e,i=g.useContext(ke);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),g.createElement(Ne.Provider,{value:t},r)}function Je(e,t,n,r){if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,o=n?.errors;if(o!=null){let e=a.findIndex(e=>e.route.id&&o?.[e.route.id]!==void 0);!(e>=0)&&S(!1),a=a.slice(0,Math.min(a.length,e+1))}let s=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let e=0;e<a.length;e++){let t=a[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(c=e),t.route.id){let{loaderData:e,errors:r}=n,i=t.route.loader&&e[t.route.id]===void 0&&(!r||r[t.route.id]===void 0);if(t.route.lazy||i){s=!0,a=c>=0?a.slice(0,c+1):[a[0]];break}}}return a.reduceRight((e,r,i)=>{let l,u=!1,d=null,f=null;n&&(l=o&&r.route.id?o[r.route.id]:void 0,d=r.route.errorElement||Ge,s&&(c<0&&i===0?(it(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),u=!0,f=null):c===i&&(u=!0,f=r.route.hydrateFallbackElement||null)));let p=t.concat(a.slice(0,i+1)),m=()=>{let t;return t=l?d:u?f:r.route.Component?g.createElement(r.route.Component,null):r.route.element?r.route.element:e,g.createElement(qe,{match:r,routeContext:{outlet:e,matches:p,isDataRoute:n!=null},children:t})};return n&&(r.route.ErrorBoundary||r.route.errorElement||i===0)?g.createElement(Ke,{location:n.location,revalidation:n.revalidation,component:d,error:l,children:m(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):m()},null)}var Ye=function(e){return e.UseBlocker=`useBlocker`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e}(Ye||{}),Xe=function(e){return e.UseBlocker=`useBlocker`,e.UseLoaderData=`useLoaderData`,e.UseActionData=`useActionData`,e.UseRouteError=`useRouteError`,e.UseNavigation=`useNavigation`,e.UseRouteLoaderData=`useRouteLoaderData`,e.UseMatches=`useMatches`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e.UseRouteId=`useRouteId`,e}(Xe||{});function Ze(e){let t=g.useContext(ke);return!t&&S(!1),t}function Qe(e){let t=g.useContext(Ae);return!t&&S(!1),t}function $e(e){let t=g.useContext(Ne);return!t&&S(!1),t}function et(e){let t=$e(e),n=t.matches[t.matches.length-1];return!n.route.id&&S(!1),n.route.id}function tt(){let e=g.useContext(Pe),t=Qe(Xe.UseRouteError),n=et(Xe.UseRouteError);return e===void 0?t.errors?.[n]:e}function nt(){let{router:e}=Ze(Ye.UseNavigateStable),t=et(Xe.UseNavigateStable),n=g.useRef(!1);return Re(()=>{n.current=!0}),g.useCallback(function(r,i){i===void 0&&(i={}),n.current&&(typeof r==`number`?e.navigate(r):e.navigate(r,Oe({fromRouteId:t},i)))},[e,t])}var rt={};function it(e,t,n){!t&&!rt[e]&&(rt[e]=!0)}var at=(e,t,n)=>(``+t+("You can use the `"+e+"` future flag to opt-in early. ")+(`For more information, see `+n+`.`),void 0);function ot(e,t){e?.v7_startTransition===void 0&&at(`v7_startTransition`,"React Router will begin wrapping state updates in `React.startTransition` in v7",`https://reactrouter.com/v6/upgrading/future#v7_starttransition`),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&at(`v7_relativeSplatPath`,`Relative route resolution within Splat routes is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath`),t&&(t.v7_fetcherPersist===void 0&&at(`v7_fetcherPersist`,`The persistence behavior of fetchers is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist`),t.v7_normalizeFormMethod===void 0&&at(`v7_normalizeFormMethod`,"Casing of `formMethod` fields is being normalized to uppercase in v7",`https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod`),t.v7_partialHydration===void 0&&at(`v7_partialHydration`,"`RouterProvider` hydration behavior is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_partialhydration`),t.v7_skipActionErrorRevalidation===void 0&&at(`v7_skipActionErrorRevalidation`,"The revalidation behavior after 4xx/5xx `action` responses is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation`))}function R(e){S(!1)}function st(e){let{basename:t=`/`,children:n=null,location:r,navigationType:i=y.Pop,navigator:a,static:o=!1,future:s}=e;Ie()&&S(!1);let c=t.replace(/^\/*/,`/`),l=g.useMemo(()=>({basename:c,navigator:a,static:o,future:Oe({v7_relativeSplatPath:!1},s)}),[c,s,a,o]);typeof r==`string`&&(r=O(r));let{pathname:u=`/`,search:d=``,hash:f=``,state:p=null,key:m=`default`}=r,h=g.useMemo(()=>{let e=he(u,c);return e==null?null:{location:{pathname:e,search:d,hash:f,state:p,key:m},navigationType:i}},[c,u,d,f,p,m,i]);return h==null?null:g.createElement(je.Provider,{value:l},g.createElement(Me.Provider,{children:n,value:h}))}function ct(e){let{children:t,location:n}=e;return He(ut(t),n)}var lt=function(e){return e[e.pending=0]=`pending`,e[e.success=1]=`success`,e[e.error=2]=`error`,e}(lt||{});new Promise(()=>{}),g.Component;function ut(e,t){t===void 0&&(t=[]);let n=[];return g.Children.forEach(e,(e,r)=>{if(!g.isValidElement(e))return;let i=[...t,r];if(e.type===g.Fragment){n.push.apply(n,ut(e.props.children,i));return}e.type!==R&&S(!1),!(!e.props.index||!e.props.children)&&S(!1);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=ut(e.props.children,i)),n.push(a)}),n}function dt(){return dt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},dt.apply(null,arguments)}function ft(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function pt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function mt(e,t){return e.button===0&&(!t||t===`_self`)&&!pt(e)}var ht=[`onClick`,`relative`,`reloadDocument`,`replace`,`state`,`target`,`to`,`preventScrollReset`,`viewTransition`],gt=[`aria-current`,`caseSensitive`,`className`,`end`,`style`,`to`,`viewTransition`,`children`],_t=`6`;try{window.__reactRouterVersion=_t}catch{}var vt=g.createContext({isTransitioning:!1}),yt=g.startTransition;function bt(e){let{basename:t,children:n,future:r,window:i}=e,a=g.useRef();a.current??=x({window:i,v5Compat:!0});let o=a.current,[s,c]=g.useState({action:o.action,location:o.location}),{v7_startTransition:l}=r||{},u=g.useCallback(e=>{l&&yt?yt(()=>c(e)):c(e)},[c,l]);return g.useLayoutEffect(()=>o.listen(u),[o,u]),g.useEffect(()=>ot(r),[r]),g.createElement(st,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:o,future:r})}var xt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,St=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,z=g.forwardRef(function(e,t){let{onClick:n,relative:r,reloadDocument:i,replace:a,state:o,target:s,to:c,preventScrollReset:l,viewTransition:u}=e,d=ft(e,ht),{basename:f}=g.useContext(je),p,m=!1;if(typeof c==`string`&&St.test(c)&&(p=c,xt))try{let e=new URL(window.location.href),t=c.startsWith(`//`)?new URL(e.protocol+c):new URL(c),n=he(t.pathname,f);t.origin===e.origin&&n!=null?c=n+t.search+t.hash:m=!0}catch{}let h=Fe(c,{relative:r}),_=Dt(c,{replace:a,state:o,target:s,preventScrollReset:l,relative:r,viewTransition:u});function v(e){n&&n(e),e.defaultPrevented||_(e)}return g.createElement(`a`,dt({},d,{href:p||h,onClick:m||i?n:v,ref:t,target:s}))}),Ct=g.forwardRef(function(e,t){let{"aria-current":n=`page`,caseSensitive:r=!1,className:i=``,end:a=!1,style:o,to:s,viewTransition:c,children:l}=e,u=ft(e,gt),d=Ve(s,{relative:u.relative}),f=Le(),p=g.useContext(Ae),{navigator:m,basename:h}=g.useContext(je),_=p!=null&&Ot(d)&&c===!0,v=m.encodeLocation?m.encodeLocation(d).pathname:d.pathname,y=f.pathname,b=p&&p.navigation&&p.navigation.location?p.navigation.location.pathname:null;r||(y=y.toLowerCase(),b=b?b.toLowerCase():null,v=v.toLowerCase()),b&&h&&(b=he(b,h)||b);let x=v!==`/`&&v.endsWith(`/`)?v.length-1:v.length,S=y===v||!a&&y.startsWith(v)&&y.charAt(x)===`/`,C=b!=null&&(b===v||!a&&b.startsWith(v)&&b.charAt(v.length)===`/`),w={isActive:S,isPending:C,isTransitioning:_},T=S?n:void 0,E;E=typeof i==`function`?i(w):[i,S?`active`:null,C?`pending`:null,_?`transitioning`:null].filter(Boolean).join(` `);let D=typeof o==`function`?o(w):o;return g.createElement(z,dt({},u,{"aria-current":T,className:E,ref:t,style:D,to:s,viewTransition:c}),typeof l==`function`?l(w):l)}),wt;(function(e){e.UseScrollRestoration=`useScrollRestoration`,e.UseSubmit=`useSubmit`,e.UseSubmitFetcher=`useSubmitFetcher`,e.UseFetcher=`useFetcher`,e.useViewTransitionState=`useViewTransitionState`})(wt||={});var Tt;(function(e){e.UseFetcher=`useFetcher`,e.UseFetchers=`useFetchers`,e.UseScrollRestoration=`useScrollRestoration`})(Tt||={});function Et(e){let t=g.useContext(ke);return!t&&S(!1),t}function Dt(e,t){let{target:n,replace:r,state:i,preventScrollReset:a,relative:o,viewTransition:s}=t===void 0?{}:t,c=ze(),l=Le(),u=Ve(e,{relative:o});return g.useCallback(t=>{mt(t,n)&&(t.preventDefault(),c(e,{replace:r===void 0?D(l)===D(u):r,state:i,preventScrollReset:a,relative:o,viewTransition:s}))},[l,c,u,r,i,n,e,a,o,s])}function Ot(e,t){t===void 0&&(t={});let n=g.useContext(vt);n??S(!1);let{basename:r}=Et(wt.useViewTransitionState),i=Ve(e,{relative:t.relative});if(!n.isTransitioning)return!1;let a=he(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=he(n.nextLocation.pathname,r)||n.nextLocation.pathname;return fe(i.pathname,o)!=null||fe(i.pathname,a)!=null}var kt={"brand.tagline":{en:`Find the right hand`,tr:`Doğru eli bulun`},"brand.tagline.sub":{en:`for permanent stories`,tr:`kalıcı hikâyeler için`},"brand.intro":{en:`A premium tattoo marketplace where customers share ideas and verified artists send custom offers.`,tr:`Müşterilerin fikirlerini paylaştığı, onaylı sanatçıların özel teklif gönderdiği premium dövme pazarı.`},"nav.howItWorks":{en:`How it works`,tr:`Nasıl çalışır`},"nav.artists":{en:`Artists`,tr:`Sanatçılar`},"nav.designs":{en:`Designs`,tr:`Tasarımlar`},"nav.categories":{en:`Categories`,tr:`Kategoriler`},"nav.login":{en:`Log in`,tr:`Giriş`},"nav.signup":{en:`Sign up`,tr:`Kayıt`},"nav.index":{en:`Index`,tr:`İçindekiler`},"nav.dashboard":{en:`Dashboard`,tr:`Panel`},"cta.createRequest":{en:`Create tattoo request`,tr:`Dövme isteği oluştur`},"cta.joinAsArtist":{en:`Join as artist`,tr:`Sanatçı olarak katıl`},"cta.sendOffer":{en:`Send offer`,tr:`Teklif gönder`},"cta.viewProfile":{en:`View profile`,tr:`Profili gör`},"cta.openRequest":{en:`Open request`,tr:`İsteği aç`},"cta.compareOffers":{en:`Compare offers`,tr:`Teklifleri karşılaştır`},"badge.verified":{en:`Verified artists`,tr:`Onaylı sanatçılar`},"badge.custom":{en:`Custom offers`,tr:`Özel teklifler`},"badge.booking":{en:`Appointment booking`,tr:`Randevu yönetimi`},"section.about":{en:`A curated tattoo marketplace`,tr:`Seçilmiş bir dövme pazarı`},"section.about.body":{en:`TattooGo connects considered clients with verified artists and studios. No bidding wars, no sponsored noise — only the offers that match your brief.`,tr:`TattooGo, özenli müşterileri onaylı sanatçı ve stüdyolarla buluşturur. Açık artırmalar ya da sponsorlu gürültü yok — yalnızca brief’inize uyan teklifler.`},"section.how":{en:`How it works`,tr:`Nasıl çalışır`},"how.01.title":{en:`Create request`,tr:`İstek oluştur`},"how.01.body":{en:`Describe the idea, choose style, placement and size, and share your references.`,tr:`Fikrinizi anlatın; stil, yerleşim ve boyut seçin, referanslarınızı paylaşın.`},"how.02.title":{en:`Receive offers`,tr:`Teklif alın`},"how.02.body":{en:`Verified artists and studios review your brief and send tailored offers with sketches.`,tr:`Onaylı sanatçı ve stüdyolar brief’inizi inceler ve eskizlerle özel teklif gönderir.`},"how.03.title":{en:`Compare artists`,tr:`Sanatçıları karşılaştırın`},"how.03.body":{en:`Read reviews, browse portfolios and message before choosing.`,tr:`Yorumları okuyun, portföyleri inceleyin ve seçmeden önce mesajlaşın.`},"how.04.title":{en:`Book appointment`,tr:`Randevu alın`},"how.04.body":{en:`Confirm the offer, agree on the date and walk into the studio prepared.`,tr:`Teklifi onaylayın, tarihte anlaşın ve stüdyoya hazır gidin.`},"section.styles":{en:`Tattoo styles`,tr:`Dövme stilleri`},"section.artists":{en:`Selected artists & studios`,tr:`Seçili sanatçılar ve stüdyolar`},"section.requests":{en:`Recent customer requests`,tr:`Güncel müşteri istekleri`},"section.trust":{en:`Trust the room you walk into`,tr:`Adım attığınız odaya güvenin`},"section.cta":{en:`Two ways to start`,tr:`Başlamanın iki yolu`},"trust.verified.title":{en:`Verified artists`,tr:`Onaylı sanatçılar`},"trust.verified.body":{en:`Identity and portfolio review before any artist can publish a profile.`,tr:`Profilini yayınlayan her sanatçı için kimlik ve portföy incelemesi.`},"trust.reviews.title":{en:`Honest reviews`,tr:`Dürüst yorumlar`},"trust.reviews.body":{en:`Only customers with confirmed appointments can leave a review.`,tr:`Yalnızca randevusu onaylanmış müşteriler yorum bırakabilir.`},"trust.booking.title":{en:`Tracked bookings`,tr:`Takip edilen randevular`},"trust.booking.body":{en:`Every offer, sketch and appointment lives in one timeline.`,tr:`Her teklif, eskiz ve randevu tek bir zaman çizelgesinde.`},"trust.hygiene.title":{en:`Hygiene & licensing`,tr:`Hijyen ve lisans`},"trust.hygiene.body":{en:`Studios publish their licensing and aftercare protocols.`,tr:`Stüdyolar lisans ve bakım protokollerini yayınlar.`},"footer.lockup":{en:`TattooGo · Permanent, considered.`,tr:`TattooGo · Kalıcı, özenli.`},"cust.home":{en:`Home`,tr:`Anasayfa`},"cust.requests":{en:`My requests`,tr:`İsteklerim`},"cust.offers":{en:`Offers received`,tr:`Alınan teklifler`},"cust.messages":{en:`Messages`,tr:`Mesajlar`},"cust.notifications":{en:`Notifications`,tr:`Bildirimler`},"cust.favorites":{en:`Favorites`,tr:`Favoriler`},"cust.appointments":{en:`Appointments`,tr:`Randevular`},"cust.tracking":{en:`Order tracking`,tr:`Sipariş takibi`},"cust.reviews":{en:`Reviews`,tr:`Yorumlar`},"cust.profile":{en:`Profile`,tr:`Profil`},"cust.createRequest":{en:`Create request`,tr:`İstek oluştur`},"art.home":{en:`Home`,tr:`Anasayfa`},"art.stats":{en:`Statistics`,tr:`İstatistik`},"art.addTattoo":{en:`Add tattoo`,tr:`Dövme ekle`},"art.giveOffer":{en:`Give offer`,tr:`Teklif ver`},"art.profile":{en:`Profile`,tr:`Profil`},"art.myTattoos":{en:`My tattoos`,tr:`Dövmelerim`},"art.reviews":{en:`Reviews`,tr:`Yorumlar`},"art.tracking":{en:`Order tracking`,tr:`Sipariş takibi`},"art.myOffers":{en:`My offers`,tr:`Tekliflerim`},"art.materials":{en:`Tattoo materials`,tr:`Dövme malzemeleri`},"art.myArtists":{en:`My artists`,tr:`Sanatçılarım`},"art.campaigns":{en:`My campaigns`,tr:`Kampanyalarım`},"art.calendar":{en:`Appointment calendar`,tr:`Randevu takvimi`},"art.messages":{en:`Messages`,tr:`Mesajlar`},"art.notifications":{en:`Notifications`,tr:`Bildirimler`},"common.viewAll":{en:`View all`,tr:`Tümünü gör`},"common.search":{en:`Search`,tr:`Ara`},"common.save":{en:`Save`,tr:`Kaydet`},"common.cancel":{en:`Cancel`,tr:`İptal`},"common.accept":{en:`Accept`,tr:`Kabul et`},"common.reject":{en:`Reject`,tr:`Reddet`},"common.message":{en:`Message`,tr:`Mesaj`},"common.delete":{en:`Delete`,tr:`Sil`},"common.edit":{en:`Edit`,tr:`Düzenle`},"common.add":{en:`Add`,tr:`Ekle`},"common.from":{en:`from`,tr:`başlangıç`},"common.status":{en:`Status`,tr:`Durum`},"common.budget":{en:`Budget`,tr:`Bütçe`},"common.style":{en:`Style`,tr:`Stil`},"common.city":{en:`City`,tr:`Şehir`},"common.placement":{en:`Placement`,tr:`Yerleşim`},"common.size":{en:`Size`,tr:`Boyut`},"common.color":{en:`Color`,tr:`Renk`},"common.date":{en:`Date`,tr:`Tarih`},"common.price":{en:`Price`,tr:`Fiyat`},"common.duration":{en:`Duration`,tr:`Süre`},"common.validUntil":{en:`Valid until`,tr:`Geçerli`},"common.references":{en:`References`,tr:`Referans`},"common.upload":{en:`Upload`,tr:`Yükle`},"common.notes":{en:`Notes`,tr:`Notlar`},"common.uploadImage":{en:`Upload image`,tr:`Görsel yükle`},"common.selectImage":{en:`Select image`,tr:`Görsel seç`},"common.tagsHint":{en:`At least 3 tags`,tr:`En az 3 etiket`}};function At(e,t){let n=kt[e];return n?n[t]??n.en:e}var jt=o((e=>{var t=u(),n=Symbol.for(`react.element`),r=Symbol.for(`react.fragment`),i=Object.prototype.hasOwnProperty,a=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,r){var s,c={},l=null,u=null;for(s in r!==void 0&&(l=``+r),t.key!==void 0&&(l=``+t.key),t.ref!==void 0&&(u=t.ref),t)i.call(t,s)&&!o.hasOwnProperty(s)&&(c[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)c[s]===void 0&&(c[s]=t[s]);return{$$typeof:n,type:e,key:l,ref:u,props:c,_owner:a.current}}e.Fragment=r,e.jsx=s,e.jsxs=s})),B=o(((e,t)=>{t.exports=jt()}))(),Mt=(0,g.createContext)(null);function Nt({children:e}){let[t,n]=(0,g.useState)(()=>{let e=typeof window<`u`?localStorage.getItem(`tg.lang`):null;return e===`tr`||e===`en`?e:`en`}),r=(0,g.useCallback)(e=>{n(e);try{localStorage.setItem(`tg.lang`,e)}catch{}document.documentElement.lang=e},[]);(0,g.useEffect)(()=>{document.documentElement.lang=t},[t]);let i=(0,g.useMemo)(()=>({lang:t,setLang:r,toggle:()=>r(t===`en`?`tr`:`en`),t:e=>At(e,t)}),[t,r]);return(0,B.jsx)(Mt.Provider,{value:i,children:e})}function V(){let e=(0,g.useContext)(Mt);if(!e)throw Error(`useLang must be used inside LangProvider`);return e}var Pt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<path class="st5" d="M471.31,413.9c0-58.98,0-117.97,0-176.95c-42.55-22.29,0-51.33,0-51.33l-24.99-68.21
	c-7.08,15.29-14.4,34.11-20.18,56.14c-5.23,19.94-8.06,38.14-9.54,53.72c0,62.21,0,124.42,0,186.63H471.31z"/>
<path class="st6" d="M485.79,368.4h-83.67c-3.92,0-7.12-3.21-7.12-7.12v-39.9c0-3.92,3.21-7.12,7.12-7.12h83.67
	c3.92,0,7.12,3.21,7.12,7.12v39.9C492.91,365.2,489.71,368.4,485.79,368.4z"/>
<path class="st6" d="M485.79,314.26h-83.67c-3.92,0-7.12-3.21-7.12-7.12v-39.9c0-3.92,3.21-7.12,7.12-7.12h83.67
	c3.92,0,7.12,3.21,7.12,7.12v39.9C492.91,311.05,489.71,314.26,485.79,314.26z"/>
<path class="st7" d="M471.31,185.62c0,0-23.85,32.83,0,51.33"/>
<path class="st8" d="M380.6,192.99c-6.19-2.37-47.19-17.73-55.86-4.37c-2.15,3.31-4.09,11.1,9.78,33.5
	c13.66,22.07,45.62,63.07,124.29,107.77c54.74,23.77,97.44,33.13,104.74,20.39c9.64-16.83-44.89-67.98-51.67-74.27"/>
<path class="st8" d="M507.31,192.99c6.19-2.37,47.19-17.73,55.86-4.37c2.15,3.31,4.09,11.1-9.78,33.5
	c-13.66,22.07-45.62,63.07-124.29,107.77c-54.74,23.77-97.44,33.13-104.74,20.39c-9.64-16.83,44.89-67.98,51.67-74.27"/>
<path class="st9" d="M345.86,153.74h-3.75c-0.37,0-0.67-0.3-0.67-0.67v-3.75c0-0.37,0.3-0.67,0.67-0.67h3.75
	c0.37,0,0.67,0.3,0.67,0.67v3.75C346.53,153.44,346.23,153.74,345.86,153.74z"/>
<path class="st10" d="M393.45,163.62h-3.9c-0.38,0-0.7-0.31-0.7-0.7v-8.48c0-0.38,0.31-0.7,0.7-0.7h3.9c0.38,0,0.7,0.31,0.7,0.7
	v8.48C394.15,163.31,393.84,163.62,393.45,163.62z"/>
<path class="st10" d="M378.18,167.84v-3.9c0-0.38,0.31-0.7,0.7-0.7h8.48c0.38,0,0.7,0.31,0.7,0.7v3.9c0,0.38-0.31,0.7-0.7,0.7h-8.48
	C378.5,168.53,378.18,168.22,378.18,167.84z"/>
<path class="st10" d="M394.75,167.84v-3.9c0-0.38,0.31-0.7,0.7-0.7h8.48c0.38,0,0.7,0.31,0.7,0.7v3.9c0,0.38-0.31,0.7-0.7,0.7h-8.48
	C395.06,168.53,394.75,168.22,394.75,167.84z"/>
<path class="st10" d="M393.45,178.41h-3.9c-0.38,0-0.7-0.31-0.7-0.7v-8.48c0-0.38,0.31-0.7,0.7-0.7h3.9c0.38,0,0.7,0.31,0.7,0.7
	v8.48C394.15,178.09,393.84,178.41,393.45,178.41z"/>
<g>
	<path class="st10" d="M506.16,390.61h-3.9c-0.38,0-0.7-0.31-0.7-0.7v-8.48c0-0.38,0.31-0.7,0.7-0.7h3.9c0.38,0,0.7,0.31,0.7,0.7
		v8.48C506.86,390.3,506.54,390.61,506.16,390.61z"/>
	<path class="st10" d="M490.89,394.83v-3.9c0-0.38,0.31-0.7,0.7-0.7h8.48c0.38,0,0.7,0.31,0.7,0.7v3.9c0,0.38-0.31,0.7-0.7,0.7
		h-8.48C491.2,395.52,490.89,395.21,490.89,394.83z"/>
	<path class="st10" d="M507.45,394.83v-3.9c0-0.38,0.31-0.7,0.7-0.7h8.48c0.38,0,0.7,0.31,0.7,0.7v3.9c0,0.38-0.31,0.7-0.7,0.7
		h-8.48C507.77,395.52,507.45,395.21,507.45,394.83z"/>
	<path class="st10" d="M506.16,405.4h-3.9c-0.38,0-0.7-0.31-0.7-0.7v-8.48c0-0.38,0.31-0.7,0.7-0.7h3.9c0.38,0,0.7,0.31,0.7,0.7
		v8.48C506.86,405.08,506.54,405.4,506.16,405.4z"/>
</g>
<path class="st9" d="M497.7,175.9h-3.75c-0.37,0-0.67-0.3-0.67-0.67v-3.75c0-0.37,0.3-0.67,0.67-0.67h3.75
	c0.37,0,0.67,0.3,0.67,0.67v3.75C498.37,175.59,498.07,175.9,497.7,175.9z"/>
<path class="st9" d="M366.69,383.28h-3.75c-0.37,0-0.67-0.3-0.67-0.67v-3.75c0-0.37,0.3-0.67,0.67-0.67h3.75
	c0.37,0,0.67,0.3,0.67,0.67v3.75C367.36,382.98,367.06,383.28,366.69,383.28z"/>
</svg>
`,Ft=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{font-family:'Arial-Black';}
	.st42{font-size:20px;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<path d="M447,106.82c0,0-10.55,4.54-11.2,10.37c-0.65,5.83,0,18.48,0,18.48c-8.26,1.44-19.5,4.56-31.08,11.67
		c-28.65,17.6-38.06,46.61-40.56,55.43c-0.33,22.46-0.66,44.93-1,67.39c-0.96,5.24-2.59,11.3-5.36,17.73
		c-7.75,17.97-20.21,29.06-27.81,34.74c-0.9,1.3-5.06,7.64-3.49,15.83c2.22,11.6,13.82,15.83,14.33,16l107.3,1.3L447,106.82z"/>
	<path d="M446.1,106.82c0,0,10.55,4.54,11.2,10.37c0.65,5.83,0,18.48,0,18.48c8.26,1.44,19.5,4.56,31.08,11.67
		c28.65,17.6,38.06,46.61,40.56,55.43c0.33,22.46,0.66,44.93,1,67.39c0.96,5.24,2.59,11.3,5.36,17.73
		c7.75,17.97,20.21,29.06,27.81,34.74c0.9,1.3,5.06,7.64,3.49,15.83c-2.22,11.6-13.82,15.83-14.33,16l-107.3,1.3L446.1,106.82z"/>
	<path d="M403.54,362.98h89.18c0,0-3.45,37.28-43.63,38.18C449.09,401.16,409.21,403.54,403.54,362.98z"/>
	<path class="st11" d="M381.1,134.13c0,0-42.12,29.55-42.12,71.08"/>
	<path class="st11" d="M509.3,131.46c0,0,42.12,29.55,42.12,71.08"/>
</g>
<text transform="matrix(1 0 0 1 36.2816 52.3447)" class="st41 st42">BİLDİRİMLER</text>
</svg>
`,It=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{font-family:'Arial-Black';}
	.st42{font-size:20px;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<path class="st12" d="M481.32,380.51H306.98c-6.6,0-12-5.4-12-12V194.18c0-6.6,5.4-12,12-12h174.33c6.6,0,12,5.4,12,12v174.33
	C493.32,375.11,487.92,380.51,481.32,380.51z"/>
<path class="st13" d="M454.53,250.61H334.24c-5.9,0-10.73-4.83-10.73-10.73v0c0-5.9,4.83-10.73,10.73-10.73h120.29
	c5.9,0,10.73,4.83,10.73,10.73v0C465.26,245.78,460.43,250.61,454.53,250.61z"/>
<polygon class="st3" points="340.47,231.09 316.07,331.6 472.69,331.6 449.76,231.09 "/>
<polyline class="st14" points="371.1,230.85 412.57,257.68 318.89,331.84 "/>
<text transform="matrix(1 0 0 1 23.9719 52.1053)" class="st41 st42">MESAJ KUTUSU</text>
</svg>
`,Lt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{font-family:'Arial-Black';}
	.st42{font-size:20px;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<g>
		<polyline class="st18" points="330.58,277.84 435.84,177.33 537.4,277.84 		"/>
	</g>
	<polygon points="355.44,280.35 436.37,199.55 515.19,280.35 515.19,374.64 355.44,374.64 	"/>
	<path class="st3" d="M456.62,385.36h-20.71c-6.6,0-12-5.4-12-12v-59.98c0-6.6,5.4-12,12-12h20.71c6.6,0,12,5.4,12,12v59.98
		C468.62,379.96,463.22,385.36,456.62,385.36z"/>
	<line class="st19" x1="498.06" y1="238.9" x2="498.06" y2="201.67"/>
</g>
<text transform="matrix(1 0 0 1 26.3012 52.1048)" class="st41 st42">ANA SAYFA</text>
</svg>
`,Rt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{font-family:'Arial-Black';}
	.st42{font-size:20px;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<g>
		<path class="st15" d="M504.23,209.89c-83.93,3.32-180.74,5.21-264.92,6.37c0,0,6.21-7.77,6.21-7.77l5.5,22.84
			c11.75,49.47,26,110.5,37.36,160.14c0,0-7.72-6.17-7.72-6.17l58.55-0.09c52.16-0.02,123.49,0.33,175.64,0.8
			c0,0-7.02,5.63-7.02,5.63c13.32-57.09,28.56-121.03,42.56-177.96c4.97-20.54,10.19-41.03,15.3-61.54
			c12.12,0.32,34.28,0.97,46.41,1.37c13.17,0.34,30.91,1.12,44.15,1.6c-28.13,1.15-60.14,2.16-88.31,2.91c0,0,2.84-2.28,2.84-2.28
			c-15.63,80.43-33.06,164.4-50.09,244.61c-32.06,0.29-90.85,0.67-122.94,0.76c-32.31,0.01-91.15,0.14-123.45-0.01
			c0,0-1.36-6.16-1.36-6.16c-13.48-61.1-28.76-130.43-41.51-191.55c0,0,7.87,0.12,7.87,0.12
			C323.57,204.71,420.24,206.54,504.23,209.89L504.23,209.89z"/>
	</g>
	<circle class="st15" cx="320.43" cy="436.88" r="24.62"/>
	<circle class="st15" cx="470.81" cy="436.88" r="24.62"/>
	<g>
		<path class="st15" d="M361.61,274.16c81.28-13.4,163.13-21.68,244.68-32.71c14.04-2.04,28.16-3.87,41.9-7.25
			c2.15-0.59,4.18-1.15,5.81-2.03c0.02-0.01,0.06-0.03,0.04-0.02c0,0-0.01,0.02-0.07,0.08c-1.2,1.28-0.95,3.82,0.28,4.76
			c0.25,0.18,0.08,0.01-0.16-0.1c-5.21-2.07-11.06-2.54-16.74-3.42c-24.44-3.03-49.09-4.42-73.68-6.7
			c24.78-1.55,49.56-2.37,74.42-1.15c5.25,0.32,10.68,0.72,15.99,1.84c3.42,0.71,8.27,2.39,8.35,7c-0.14,5.77-7.3,7.57-11.48,9.08
			c-6.08,1.94-12.28,3.31-18.45,4.63c-16.27,3.4-32.61,5.89-49.02,8.26C509.89,266.39,435.88,272.7,361.61,274.16L361.61,274.16z"/>
	</g>
	<g>
		<path class="st15" d="M361.61,332.98c75.09-12.83,150.75-20.52,226.16-30.66c11.19-1.57,22.38-3.14,33.39-5.41
			c3.62-0.72,7.78-1.78,10.51-2.94c-1.25,1.32-1,3.93,0.28,4.91c-3.87-1.72-10.4-2.45-15.42-3.21c-7.44-0.98-14.99-1.73-22.55-2.43
			c-15.13-1.47-30.33-2.55-45.54-4.06c15.24-1.15,30.5-1.65,45.8-1.82c7.65-0.03,15.31,0.04,23.03,0.47
			c4.86,0.28,9.91,0.64,14.84,1.67c2.01,0.51,3.87,0.87,5.85,2.43c2.2,1.68,2.91,5.31,1.05,7.75c-2.32,3.07-6.59,4.23-9.77,5.36
			c-13,4-26.43,6.21-39.75,8.53C514.08,325.31,437.92,331.73,361.61,332.98L361.61,332.98z"/>
	</g>
</g>
<text transform="matrix(1 0 0 1 40.4598 39.8774)" class="st41 st42">SEPET</text>
</svg>
`,zt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<path d="M528.89,406.82H326.58c-6.6,0-12-5.4-12-12V192.51c0-6.6,5.4-12,12-12h202.31c6.6,0,12,5.4,12,12v202.31
	C540.89,401.42,535.49,406.82,528.89,406.82z"/>
<circle class="st25" cx="430.92" cy="247.79" r="33.55"/>
<circle class="st25" cx="430.92" cy="315.93" r="56.25"/>
</svg>
`,Bt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{font-family:'Arial-Black';}
	.st42{font-size:20px;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<circle class="st21" cx="449.47" cy="216.24" r="75.96"/>
	<path class="st21" d="M389.73,263.16c11.43,16.8,22.98,34.76,34.46,53.88c9.25,15.41,17.8,30.49,25.7,45.15
		c20.04-33.36,40.07-66.72,60.11-100.08"/>
	<circle class="st3" cx="449.47" cy="213.82" r="41.79"/>
	<g>
		<path class="st22" d="M425.49,328.34c-4.1,0.89-8.18,1.85-12.25,2.84c-4.08,0.97-8.14,1.98-12.19,3.03
			c-8.1,2.12-16.17,4.32-24.09,6.92c-3.96,1.28-7.9,2.63-11.74,4.15c-3.84,1.51-7.63,3.17-11.1,5.16c-1.72,1-3.37,2.1-4.74,3.31
			c-0.66,0.61-1.28,1.24-1.66,1.87c-0.24,0.31-0.33,0.61-0.48,0.89c-0.06,0.27-0.15,0.52-0.13,0.74c0.02,0.44,0.11,0.88,0.51,1.43
			c0.06,0.13,0.23,0.27,0.33,0.41c0.13,0.14,0.2,0.28,0.38,0.41c0.33,0.26,0.56,0.56,0.95,0.81c1.39,1.05,3.1,1.97,4.91,2.75
			c3.59,1.6,7.56,2.76,11.48,3.81c0.97,0.24,1.93,0.5,2.9,0.73l2.99,0.51l6.17,1c8.23,1.27,16.49,2.33,24.77,3.14
			c8.28,0.82,16.58,1.5,24.89,1.91c8.31,0.42,16.64,0.62,24.97,0.64c16.66,0.13,33.34-0.43,49.92-1.83
			c8.29-0.68,16.55-1.58,24.7-2.94c4.07-0.67,8.11-1.49,12.05-2.5c1.97-0.5,3.91-1.06,5.78-1.71c1.86-0.65,3.68-1.41,5.22-2.32
			c0.76-0.46,1.44-0.96,1.91-1.45c0.47-0.5,0.67-0.9,0.68-1.13c0.03-0.23-0.06-0.69-0.47-1.29c-0.4-0.59-1.01-1.21-1.68-1.81
			c-2.83-2.38-6.55-4.28-10.21-6.05c-7.45-3.48-15.32-6.3-23.22-8.96c-15.83-5.34-31.98-9.88-48.12-14.48
			c16.5,3.09,32.89,6.73,49.13,11.19c8.1,2.3,16.16,4.79,24.08,8.05c3.95,1.69,7.87,3.47,11.58,6.36c0.92,0.77,1.83,1.6,2.66,2.72
			c0.8,1.09,1.57,2.67,1.5,4.55c-0.05,0.91-0.3,1.81-0.67,2.54c-0.18,0.38-0.38,0.72-0.61,1.02c-0.22,0.33-0.45,0.6-0.68,0.87
			c-0.95,1.06-1.96,1.81-2.98,2.47c-2.03,1.3-4.09,2.2-6.15,3.01c-2.06,0.8-4.13,1.47-6.21,2.07c-4.16,1.18-8.33,2.08-12.51,2.87
			c-8.37,1.56-16.76,2.65-25.17,3.5c-16.82,1.62-33.69,2.24-50.56,2.22c-16.86-0.16-33.76-1.02-50.54-2.98
			c-8.39-0.99-16.74-2.23-25.05-3.68l-6.23-1.13l-3.2-0.62c-1.07-0.26-2.12-0.59-3.17-0.88c-4.13-1.25-8.2-2.58-12.22-4.51
			c-2.01-0.95-4-2.06-5.91-3.6c-0.48-0.34-0.94-0.85-1.39-1.28c-0.23-0.21-0.44-0.51-0.66-0.77c-0.21-0.28-0.44-0.51-0.62-0.84
			c-0.8-1.18-1.35-2.84-1.25-4.49c0.02-0.84,0.26-1.59,0.51-2.32c0.31-0.66,0.64-1.33,1.04-1.85c0.78-1.13,1.68-1.96,2.58-2.74
			c1.83-1.51,3.76-2.63,5.7-3.66c3.9-2,7.89-3.53,11.91-4.91c4.02-1.37,8.08-2.58,12.15-3.67c8.16-2.15,16.38-3.96,24.64-5.52
			c4.13-0.78,8.26-1.51,12.41-2.18C417.17,329.49,421.33,328.88,425.49,328.34z"/>
	</g>
</g>
<text transform="matrix(1 0 0 1 31.7055 52.668)" class="st41 st42">KONUM</text>
</svg>
`,Vt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{font-family:'Arial-Black';}
	.st42{font-size:20px;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<circle class="st11" cx="449.05" cy="273.96" r="64.57"/>
<path class="st23" d="M489.54,272.24c0,0-1.46-32.89-35.55-33.56"/>
<line class="st24" x1="410.92" y1="322.03" x2="338.98" y2="394.18"/>
<text transform="matrix(1 0 0 1 33.5729 51.3917)" class="st41 st42">ARAMA</text>
</svg>
`,Ht=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{font-family:'Arial-Black';}
	.st42{font-size:20px;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<g>
		<circle cx="443.71" cy="297.27" r="83.1"/>
		<g>
			<path d="M444.05,184.24l-0.65,47.58l-23.07-13.87l4.18-29.05c0,0,1.43-4.66,6.34-4.66S444.05,184.24,444.05,184.24z"/>
			<path d="M443.38,184.24l0.65,47.58l23.07-13.87l-4.18-29.05c0,0-1.43-4.66-6.34-4.66S443.38,184.24,443.38,184.24z"/>
			<polygon points="439.48,208.03 451.63,208.76 444.02,231.81 443.4,231.81 			"/>
		</g>
		<g>
			<path d="M445.78,410.72l-0.55-47.58l23.41,13.28l-3.45,29.14c0,0-1.32,4.7-6.22,4.82C454.08,410.51,445.78,410.72,445.78,410.72z
				"/>
			<path d="M446.45,410.7l-1.85-47.55l-22.71,14.44l4.91,28.93c0,0,1.55,4.62,6.45,4.5C438.16,410.91,446.45,410.7,446.45,410.7z"/>
			<polygon points="449.75,386.82 437.58,386.4 444.61,363.16 445.23,363.14 			"/>
		</g>
		<g>
			<path d="M557.08,294.7l-47.57,0.85l13.13-23.5l29.17,3.27c0,0,4.7,1.29,4.86,6.19C556.82,286.41,557.08,294.7,557.08,294.7z"/>
			<path d="M557.06,294.03l-47.53,2.14l14.58,22.62l28.9-5.09c0,0,4.61-1.58,4.46-6.48C557.32,302.33,557.06,294.03,557.06,294.03z"
				/>
			<polygon points="533.16,290.88 532.81,303.05 509.53,296.17 509.51,295.55 			"/>
		</g>
		<g>
			<path d="M330.82,293.43l47.57,0.85l-13.13-23.5l-29.17,3.27c0,0-4.7,1.29-4.86,6.19C331.09,285.14,330.82,293.43,330.82,293.43z"
				/>
			<path d="M330.85,292.76l47.53,2.14l-14.59,22.62l-28.9-5.09c0,0-4.61-1.58-4.46-6.48C330.59,301.05,330.85,292.76,330.85,292.76z
				"/>
			<polygon points="354.75,289.61 355.1,301.78 378.38,294.9 378.4,294.28 			"/>
		</g>
		<g>
			<path d="M524.05,217.22l-33.5,33.79l26.06,6.75l17.8-23.33c0,0,2.32-4.29-1.11-7.79C529.86,223.15,524.05,217.22,524.05,217.22z"
				/>
			<path d="M524.52,217.71l-34.41,32.86l-6.26-26.18l23.66-17.36c0,0,4.33-2.24,7.77,1.26
				C518.71,211.78,524.52,217.71,524.52,217.71z"/>
			<polygon points="510.27,237.15 501.23,228.99 490.11,250.57 490.54,251.01 			"/>
		</g>
		<g>
			<path d="M361.76,375.88l34.93-32.3l5.84,26.28l-23.94,16.98c0,0-4.37,2.17-7.74-1.38C367.48,381.89,361.76,375.88,361.76,375.88z
				"/>
			<path d="M362.22,376.37l34.04-33.25l-25.95-7.17l-18.17,23.04c0,0-2.39,4.25,0.99,7.8C356.51,370.35,362.22,376.37,362.22,376.37
				z"/>
			<polygon points="382.15,362.81 374.31,353.49 396.26,343.12 396.69,343.57 			"/>
		</g>
		<g>
			<path d="M526.24,375.05l-34.2-33.08l25.91-7.3l18.29,22.95c0,0,2.41,4.24-0.95,7.81S526.24,375.05,526.24,375.05z"/>
			<path d="M526.7,374.56l-35.09-32.13l-5.71,26.3l24.02,16.86c0,0,4.38,2.15,7.74-1.42C521.01,380.6,526.7,374.56,526.7,374.56z"/>
			<polygon points="512.05,355.41 503.18,363.76 491.61,342.42 492.03,341.97 			"/>
		</g>
		<g>
			<path d="M367.65,213.24l31.51,35.65l-26.4,5.25l-16.43-24.31c0,0-2.07-4.42,1.55-7.71S367.65,213.24,367.65,213.24z"/>
			<path d="M367.15,213.7l32.47,34.78l7.75-25.78l-22.63-18.69c0,0-4.2-2.49-7.82,0.81S367.15,213.7,367.15,213.7z"/>
			<polygon points="380.26,233.93 389.75,226.3 399.62,248.48 399.16,248.9 			"/>
		</g>
	</g>
	<circle class="st3" cx="444.05" cy="295.69" r="25.1"/>
</g>
<text transform="matrix(1 0 0 1 40.9763 51.3921)" class="st41 st42">AYARLAR</text>
</svg>
`,Ut=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{font-family:'Arial-Black';}
	.st27{font-size:20px;}
	.st28{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st29{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st30{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st31{fill:#A5A4A4;}
	.st32{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st33{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st34{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st37{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st38{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st39{fill:#070404;}
	.st40{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st41{fill:#ED1940;}
	.st42{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<text transform="matrix(1 0 0 1 34.2205 36.8582)" class="st26 st27">PROFİL DÜZENLE</text>
</g>
<circle class="st29" cx="441.02" cy="210" r="77.51"/>
<path class="st29" d="M537.14,329.17c-8.34-8.38-30.07-27.93-64.41-35.04c-3.31-0.69-43.37-8.43-82.08,10.7
	c-47.32,23.39-76.36,78.91-75.36,141.27c51.45,0,102.91,0,154.36,0"/>
<g>
	
		<rect x="513.06" y="312.17" transform="matrix(-0.8411 -0.5409 0.5409 -0.8411 783.9515 996.267)" class="st33" width="50.52" height="141.62"/>
	<line class="st33" x1="574.37" y1="374.32" x2="532.45" y2="347.37"/>
	<path class="st33" d="M520.51,457.95c-17.2,10.86-34.41,21.71-51.61,32.57c2.85-20.07,5.71-40.14,8.56-60.22"/>
</g>
</svg>
`,Wt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{font-family:'Arial-Black';}
	.st33{font-size:20px;}
	.st34{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st37{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st38{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st39{fill:#070404;}
	.st40{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st41{fill:#ED1940;}
	.st42{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<circle class="st27" cx="457.84" cy="211.78" r="77.51"/>
<path class="st27" d="M553.95,330.96c-8.34-8.38-30.07-27.93-64.41-35.04c-3.31-0.69-43.37-8.43-82.08,10.7
	c-47.32,23.39-76.36,78.91-75.36,141.27c51.45,0,102.91,0,154.36,0"/>
<g>
	<path class="st30" d="M564.55,461h-0.07c-0.2,0-0.37-0.17-0.37-0.37V356.86c0-0.2,0.17-0.37,0.37-0.37h0.07
		c0.2,0,0.37,0.17,0.37,0.37v103.77C564.92,460.84,564.76,461,564.55,461z"/>
	<path class="st30" d="M511.61,410.03v-0.07c0-0.2,0.17-0.37,0.37-0.37h103.77c0.2,0,0.37,0.17,0.37,0.37v0.07
		c0,0.2-0.17,0.37-0.37,0.37H511.99C511.78,410.4,511.61,410.23,511.61,410.03z"/>
</g>
<g>
	<text transform="matrix(1 0 0 1 31.7872 48.5001)" class="st32 st33">KİŞİ EKLEME</text>
</g>
</svg>
`,Gt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;}
	.st28{font-family:'Arial-Black';}
	.st29{font-size:20px;}
	.st30{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st31{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#A5A4A4;}
	.st33{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st34{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st35{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st37{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st38{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st39{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st40{fill:#070404;}
	.st41{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st42{fill:#ED1940;}
	.st43{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st44{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<rect x="51.05" y="51.2" class="st27" width="2" height="0"/>
</g>
<g>
	<text transform="matrix(1 0 0 1 24.7798 51.201)" class="st28 st29"> PAYLAŞ</text>
</g>
<g>
	<line class="st31" x1="208.77" y1="254.39" x2="281.59" y2="209.95"/>
	<line class="st31" x1="209.87" y1="294.5" x2="280.63" y2="331.57"/>
	<circle class="st31" cx="172.81" cy="278.23" r="39.05"/>
	<circle class="st31" cx="317.43" cy="350.8" r="39.05"/>
	<circle class="st31" cx="317.7" cy="189.82" r="39.05"/>
</g>
<g>
	<line class="st44" x1="538.88" y1="258.86" x2="611.7" y2="214.43"/>
	<line class="st44" x1="539.98" y1="298.98" x2="610.74" y2="336.04"/>
	<circle cx="510.61" cy="281.93" r="39.05"/>
	<circle cx="642.97" cy="355.67" r="39.05"/>
	<circle cx="639.49" cy="197.59" r="39.05"/>
</g>
</svg>
`,Kt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{font-family:'Arial-Black';}
	.st29{font-size:20px;}
	.st30{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st31{fill:#A5A4A4;}
	.st32{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st33{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st34{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st37{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st38{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st39{fill:#070404;}
	.st40{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st41{fill:#ED1940;}
	.st42{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<path d="M481.56,349.33H367.73c-6.6,0-12-5.4-12-12v-57.69c0-6.6,5.4-12,12-12h113.83c6.6,0,12,5.4,12,12v57.69
		C493.56,343.93,488.16,349.33,481.56,349.33z"/>
	<path class="st27" d="M379.1,270.31c0,0-3.48-47.62,47.62-48.4c1.53-0.07,30.1-1.07,40.27,17.51c1.39,2.54,2.78,6.07,3.26,10.76"/>
</g>
<g>
	<text transform="matrix(1 0 0 1 40.9764 66.4635)" class="st28 st29">GİZLİLİK</text>
</g>
<ellipse class="st3" cx="425.65" cy="308.48" rx="2.4" ry="14.6"/>
</svg>
`,qt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{font-family:'Arial-Black';}
	.st40{font-size:20px;}
	.st41{fill:#ED1940;}
	.st42{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<text transform="matrix(1 0 0 1 35.74 51.201)" class="st39 st40">BEĞENME</text>
<g>
	<g>
		<path class="st41" d="M60.08,470.21c-0.18-0.56-0.34-1.04-0.62-1.48c-0.38-0.68-0.68-0.84-1.8-0.84h-2.14
			c-0.58,0-0.64,0.06-0.64,0.64v4.62h2.48c1.44,0,1.54-0.24,1.84-1.64h0.6v4.18h-0.62c-0.26-1.4-0.4-1.72-1.82-1.72h-2.48v3.58
			c0,1.74,0.2,1.82,2.02,1.98v0.56h-5.56v-0.56c1.62-0.12,1.8-0.26,1.8-1.98v-7.92c0-1.74-0.2-1.82-1.8-1.98v-0.56h6.34
			c1.8,0,2.48-0.02,2.82-0.04c0.02,0.72,0.1,2.12,0.2,3.08L60.08,470.21z"/>
		<path class="st41" d="M69.1,466.81c3.42,0,6.48,2.62,6.48,6.6c0,4.3-2.92,6.98-6.6,6.98c-3.84,0-6.64-2.92-6.64-6.68
			C62.33,470.13,64.87,466.81,69.1,466.81z M68.69,467.55c-2.24,0-4.28,1.88-4.28,5.62c0,3.72,2.04,6.46,4.88,6.46
			c2.42,0,4.24-1.8,4.24-5.66C73.54,469.77,71.32,467.55,68.69,467.55z"/>
		<path class="st41" d="M87.96,470.23c-0.18-0.64-0.42-1.3-0.64-1.66c-0.32-0.54-0.52-0.68-1.62-0.68h-2v9.74
			c0,1.56,0.16,1.78,2.06,1.9v0.56h-5.82v-0.56c1.86-0.12,2.02-0.32,2.02-1.9v-9.74h-1.82c-1.1,0-1.42,0.12-1.76,0.72
			c-0.24,0.4-0.4,0.88-0.66,1.62h-0.6c0.12-1.22,0.24-2.48,0.3-3.6h0.46c0.3,0.48,0.52,0.46,1.08,0.46h7.92
			c0.56,0,0.72-0.08,1.02-0.46h0.48c0,0.94,0.08,2.38,0.18,3.54L87.96,470.23z"/>
		<path class="st41" d="M96.86,466.81c3.42,0,6.48,2.62,6.48,6.6c0,4.3-2.92,6.98-6.6,6.98c-3.84,0-6.64-2.92-6.64-6.68
			C90.09,470.13,92.63,466.81,96.86,466.81z M96.45,467.55c-2.24,0-4.28,1.88-4.28,5.62c0,3.72,2.04,6.46,4.88,6.46
			c2.42,0,4.24-1.8,4.24-5.66C101.3,469.77,99.08,467.55,96.45,467.55z"/>
		<path class="st41" d="M112.94,474.9v-2.98h6.84v6.1c-1.31,0.89-2.47,1.5-3.47,1.82s-2.2,0.48-3.58,0.48
			c-1.7,0-3.08-0.29-4.16-0.87s-1.9-1.44-2.49-2.59s-0.88-2.46-0.88-3.95c0-1.56,0.32-2.92,0.97-4.08s1.59-2.03,2.83-2.63
			c0.97-0.46,2.28-0.69,3.92-0.69c1.58,0,2.77,0.14,3.55,0.43s1.44,0.73,1.95,1.33s0.91,1.37,1.17,2.29l-4.27,0.76
			c-0.18-0.54-0.47-0.95-0.89-1.24s-0.96-0.43-1.61-0.43c-0.97,0-1.74,0.34-2.32,1.01s-0.86,1.74-0.86,3.2
			c0,1.55,0.29,2.66,0.87,3.32s1.39,1,2.44,1c0.5,0,0.97-0.07,1.42-0.21s0.96-0.39,1.54-0.73v-1.35H112.94z M114.32,461.98h1.61
			c-0.04,0.62-0.19,1.14-0.44,1.56s-0.64,0.76-1.15,1.01s-1.07,0.38-1.67,0.38c-0.99,0-1.78-0.26-2.37-0.78s-0.94-1.24-1.04-2.17
			h1.68c0.13,0.38,0.32,0.65,0.56,0.81s0.6,0.24,1.08,0.24c0.57,0,0.97-0.08,1.22-0.24S114.22,462.36,114.32,461.98z"/>
		<path class="st41" d="M133.7,480.25c-0.26,0-0.48-0.02-0.74-0.04c-1.46-0.1-2.24-0.48-3.12-1.72c-0.74-1.02-1.46-2.28-2.1-3.3
			c-0.4-0.64-0.66-0.76-1.68-0.76h-0.7v3.14c0,1.7,0.22,1.8,1.82,1.96v0.56h-5.34v-0.56c1.66-0.18,1.8-0.26,1.8-1.96v-7.98
			c0-1.7-0.22-1.76-1.8-1.94v-0.56h5.1c1.46,0,2.44,0.18,3.2,0.68c0.82,0.52,1.36,1.42,1.36,2.64c0,1.72-1.1,2.8-2.58,3.44
			c0.36,0.62,1.22,1.96,1.82,2.86c0.74,1.06,1.12,1.56,1.58,2.06c0.54,0.58,1,0.8,1.46,0.92L133.7,480.25z M126.32,473.75
			c1.04,0,1.7-0.16,2.2-0.58c0.78-0.58,1.1-1.38,1.1-2.46c0-2.14-1.42-2.92-2.96-2.92c-0.58,0-0.92,0.08-1.06,0.2
			c-0.18,0.14-0.24,0.34-0.24,0.86v4.9H126.32z"/>
		<path class="st41" d="M140.84,480.09v-0.56c1.3-0.16,1.46-0.36,1.18-1.12c-0.26-0.78-0.66-1.78-1.08-3.04h-4.32
			c-0.32,0.9-0.62,1.68-0.9,2.5c-0.44,1.3-0.16,1.46,1.48,1.66v0.56h-4.62v-0.56c1.26-0.16,1.58-0.3,2.28-2.1l4.14-10.5l0.64-0.12
			c1.26,3.42,2.64,7.2,3.9,10.66c0.64,1.74,0.82,1.9,2.24,2.06v0.56H140.84z M138.84,469.43c-0.64,1.72-1.32,3.54-1.92,5.12h3.74
			L138.84,469.43z"/>
		<path class="st41" d="M155.02,470.21c-0.18-0.56-0.34-1.04-0.62-1.48c-0.38-0.68-0.68-0.84-1.8-0.84h-2.14
			c-0.58,0-0.64,0.06-0.64,0.64v4.62h2.48c1.44,0,1.54-0.24,1.84-1.64h0.6v4.18h-0.62c-0.26-1.4-0.4-1.72-1.82-1.72h-2.48v3.58
			c0,1.74,0.2,1.82,2.02,1.98v0.56h-5.56v-0.56c1.62-0.12,1.8-0.26,1.8-1.98v-7.92c0-1.74-0.2-1.82-1.8-1.98v-0.56h6.34
			c1.8,0,2.48-0.02,2.82-0.04c0.02,0.72,0.1,2.12,0.2,3.08L155.02,470.21z"/>
		<path class="st41" d="M167.3,476.77c-0.12,0.62-0.72,2.7-0.92,3.32h-9.3v-0.56c1.82-0.18,1.98-0.28,1.98-1.98v-7.94
			c0-1.7-0.2-1.8-1.8-1.96v-0.56h5.36v0.56c-1.6,0.16-1.82,0.24-1.82,1.96v8.14c0,1.22,0.16,1.5,1.3,1.52
			c0.02,0,1.46,0.02,1.58,0.02c1.02,0,1.32-0.12,1.78-0.62c0.5-0.52,0.92-1.32,1.22-2.06L167.3,476.77z"/>
		<path class="st41" d="M175.36,480.09v-0.56c1.3-0.16,1.46-0.36,1.18-1.12c-0.26-0.78-0.66-1.78-1.08-3.04h-4.32
			c-0.32,0.9-0.62,1.68-0.9,2.5c-0.44,1.3-0.16,1.46,1.48,1.66v0.56h-4.62v-0.56c1.26-0.16,1.58-0.3,2.28-2.1l4.14-10.5l0.64-0.12
			c1.26,3.42,2.64,7.2,3.9,10.66c0.64,1.74,0.82,1.9,2.24,2.06v0.56H175.36z M173.36,469.43c-0.64,1.72-1.32,3.54-1.92,5.12h3.74
			L173.36,469.43z"/>
		<path class="st41" d="M192.66,480.25c-0.26,0-0.48-0.02-0.74-0.04c-1.46-0.1-2.24-0.48-3.12-1.72c-0.74-1.02-1.46-2.28-2.1-3.3
			c-0.4-0.64-0.66-0.76-1.68-0.76h-0.7v3.14c0,1.7,0.22,1.8,1.82,1.96v0.56h-5.34v-0.56c1.66-0.18,1.8-0.26,1.8-1.96v-7.98
			c0-1.7-0.22-1.76-1.8-1.94v-0.56h5.1c1.46,0,2.44,0.18,3.2,0.68c0.82,0.52,1.36,1.42,1.36,2.64c0,1.72-1.1,2.8-2.58,3.44
			c0.36,0.62,1.22,1.96,1.82,2.86c0.74,1.06,1.12,1.56,1.58,2.06c0.54,0.58,1,0.8,1.46,0.92L192.66,480.25z M185.27,473.75
			c1.04,0,1.7-0.16,2.2-0.58c0.78-0.58,1.1-1.38,1.1-2.46c0-2.14-1.42-2.92-2.96-2.92c-0.58,0-0.92,0.08-1.06,0.2
			c-0.18,0.14-0.24,0.34-0.24,0.86v4.9H185.27z"/>
		<path class="st41" d="M193.05,480.09v-0.56c1.64-0.18,1.8-0.26,1.8-1.96v-7.94c0-1.72-0.16-1.8-1.8-1.98v-0.56h5.36v0.56
			c-1.66,0.18-1.82,0.26-1.82,1.98v7.94c0,1.72,0.16,1.78,1.82,1.96v0.56H193.05z"/>
		<path class="st41" d="M214.02,467.65c-1.28,0.14-1.7,0.34-1.76,1.26c-0.02,0.64-0.06,1.48-0.06,3.34v8.02h-0.76l-8.56-10.46v5
			c0,1.8,0.06,2.7,0.1,3.28c0.04,1.02,0.54,1.32,1.98,1.44v0.56h-4.86v-0.56c1.24-0.1,1.72-0.4,1.8-1.38
			c0.06-0.64,0.1-1.54,0.1-3.36v-5.1c0-0.56-0.04-0.88-0.4-1.32c-0.38-0.5-0.8-0.62-1.78-0.72v-0.56h3l8.48,10.06v-4.9
			c0-1.86-0.04-2.72-0.1-3.32c-0.06-0.9-0.52-1.18-2.12-1.28v-0.56h4.94V467.65z"/>
		<path class="st41" d="M220.09,467.09h5.34v0.56c-1.56,0.14-1.84,0.28-1.84,2.06v3.44c0.4-0.04,0.86-0.36,1.44-0.92
			c1.12-1.06,2.46-2.42,3.38-3.46c0.6-0.68,0.54-0.94-0.32-1.06l-0.56-0.06v-0.56h4.86v0.56c-1.5,0.18-2.02,0.28-3.36,1.66
			c-0.6,0.58-2.16,2.1-3.44,3.36c1.52,1.8,3.74,4.36,4.78,5.46c1.02,1.1,1.28,1.26,2.52,1.4v0.56h-3.2
			c-1.54-1.74-3.16-3.68-4.98-5.8c-0.46-0.56-0.8-0.6-1.12-0.58v3.8c0,1.74,0.18,1.88,1.84,2.02v0.56h-5.34v-0.56
			c1.64-0.14,1.8-0.28,1.8-2.02v-7.8c0-1.8-0.14-1.94-1.8-2.06V467.09z"/>
		<path class="st41" d="M243.53,476.91c-0.12,0.52-0.66,2.58-0.86,3.18h-9.72v-0.56c1.86-0.14,2-0.32,2-1.96v-7.9
			c0-1.78-0.22-1.88-1.72-2.02v-0.56h6.12c1.88,0,2.66-0.02,2.9-0.04c0.02,0.5,0.1,2,0.18,3.06l-0.6,0.1
			c-0.18-0.68-0.38-1.1-0.6-1.52c-0.32-0.66-0.78-0.8-1.98-0.8h-1.9c-0.62,0-0.66,0.06-0.66,0.64v4.42h2.22c1.5,0,1.6-0.3,1.84-1.66
			h0.62v4.12h-0.62c-0.26-1.44-0.42-1.64-1.86-1.64h-2.2v3.98c0,1.4,0.44,1.52,1.44,1.54h1.86c1.22,0,1.42-0.18,1.86-0.7
			c0.38-0.42,0.8-1.24,1.08-1.84L243.53,476.91z"/>
		<path class="st41" d="M258.75,467.65c-1.28,0.14-1.7,0.34-1.76,1.26c-0.02,0.64-0.06,1.48-0.06,3.34v8.02h-0.76l-8.56-10.46v5
			c0,1.8,0.06,2.7,0.1,3.28c0.04,1.02,0.54,1.32,1.98,1.44v0.56h-4.86v-0.56c1.24-0.1,1.72-0.4,1.8-1.38
			c0.06-0.64,0.1-1.54,0.1-3.36v-5.1c0-0.56-0.04-0.88-0.4-1.32c-0.38-0.5-0.8-0.62-1.78-0.72v-0.56h3l8.48,10.06v-4.9
			c0-1.86-0.04-2.72-0.1-3.32c-0.06-0.9-0.52-1.18-2.12-1.28v-0.56h4.94V467.65z"/>
		<path class="st41" d="M266.91,480.09v-0.56c1.3-0.16,1.46-0.36,1.18-1.12c-0.26-0.78-0.66-1.78-1.08-3.04h-4.32
			c-0.32,0.9-0.62,1.68-0.9,2.5c-0.44,1.3-0.16,1.46,1.48,1.66v0.56h-4.62v-0.56c1.26-0.16,1.58-0.3,2.28-2.1l4.14-10.5l0.64-0.12
			c1.26,3.42,2.64,7.2,3.9,10.66c0.64,1.74,0.82,1.9,2.24,2.06v0.56H266.91z M264.91,469.43c-0.64,1.72-1.32,3.54-1.92,5.12h3.74
			L264.91,469.43z"/>
		<path class="st41" d="M284.21,480.25c-0.26,0-0.48-0.02-0.74-0.04c-1.46-0.1-2.24-0.48-3.12-1.72c-0.74-1.02-1.46-2.28-2.1-3.3
			c-0.4-0.64-0.66-0.76-1.68-0.76h-0.7v3.14c0,1.7,0.22,1.8,1.82,1.96v0.56h-5.34v-0.56c1.66-0.18,1.8-0.26,1.8-1.96v-7.98
			c0-1.7-0.22-1.76-1.8-1.94v-0.56h5.1c1.46,0,2.44,0.18,3.2,0.68c0.82,0.52,1.36,1.42,1.36,2.64c0,1.72-1.1,2.8-2.58,3.44
			c0.36,0.62,1.22,1.96,1.82,2.86c0.74,1.06,1.12,1.56,1.58,2.06c0.54,0.58,1,0.8,1.46,0.92L284.21,480.25z M276.83,473.75
			c1.04,0,1.7-0.16,2.2-0.58c0.78-0.58,1.1-1.38,1.1-2.46c0-2.14-1.42-2.92-2.96-2.92c-0.58,0-0.92,0.08-1.06,0.2
			c-0.18,0.14-0.24,0.34-0.24,0.86v4.9H276.83z"/>
		<path class="st41" d="M284.61,480.09v-0.56c1.64-0.18,1.8-0.26,1.8-1.96v-7.94c0-1.72-0.16-1.8-1.8-1.98v-0.56h5.36v0.56
			c-1.66,0.18-1.82,0.26-1.82,1.98v7.94c0,1.72,0.16,1.78,1.82,1.96v0.56H284.61z"/>
		<path class="st41" d="M305.57,467.65c-1.28,0.14-1.7,0.34-1.76,1.26c-0.02,0.64-0.06,1.48-0.06,3.34v8.02h-0.76l-8.56-10.46v5
			c0,1.8,0.06,2.7,0.1,3.28c0.04,1.02,0.54,1.32,1.98,1.44v0.56h-4.86v-0.56c1.24-0.1,1.72-0.4,1.8-1.38
			c0.06-0.64,0.1-1.54,0.1-3.36v-5.1c0-0.56-0.04-0.88-0.4-1.32c-0.38-0.5-0.8-0.62-1.78-0.72v-0.56h3l8.48,10.06v-4.9
			c0-1.86-0.04-2.72-0.1-3.32c-0.06-0.9-0.52-1.18-2.12-1.28v-0.56h4.94V467.65z"/>
		<path class="st41" d="M312.55,467.09c2.82,0,4.6,0.56,5.84,1.74c0.98,0.96,1.7,2.36,1.7,4.28c0,2.34-0.96,4.24-2.5,5.4
			c-1.52,1.14-3.46,1.58-5.92,1.58h-4.68v-0.56c1.72-0.16,1.8-0.3,1.8-1.94v-7.98c0-1.72-0.24-1.8-1.8-1.96v-0.56H312.55z
			 M310.53,477.43c0,1.5,0.64,1.92,2.14,1.92c3.6,0,5.44-2.46,5.44-5.96c0-2.18-0.74-3.84-2.32-4.8c-0.92-0.58-2.08-0.8-3.42-0.8
			c-0.9,0-1.38,0.12-1.58,0.28c-0.18,0.12-0.26,0.34-0.26,1.12V477.43z"/>
		<path class="st41" d="M328.67,480.09v-0.56c1.3-0.16,1.46-0.36,1.18-1.12c-0.26-0.78-0.66-1.78-1.08-3.04h-4.32
			c-0.32,0.9-0.62,1.68-0.9,2.5c-0.44,1.3-0.16,1.46,1.48,1.66v0.56h-4.62v-0.56c1.26-0.16,1.58-0.3,2.28-2.1l4.14-10.5l0.64-0.12
			c1.26,3.42,2.64,7.2,3.9,10.66c0.64,1.74,0.82,1.9,2.24,2.06v0.56H328.67z M326.67,469.43c-0.64,1.72-1.32,3.54-1.92,5.12h3.74
			L326.67,469.43z"/>
		<path class="st41" d="M345.55,466.81c3.42,0,6.48,2.62,6.48,6.6c0,4.3-2.92,6.98-6.6,6.98c-3.84,0-6.64-2.92-6.64-6.68
			C338.79,470.13,341.33,466.81,345.55,466.81z M345.15,467.55c-2.24,0-4.28,1.88-4.28,5.62c0,3.72,2.04,6.46,4.88,6.46
			c2.42,0,4.24-1.8,4.24-5.66C349.99,469.77,347.77,467.55,345.15,467.55z"/>
		<path class="st41" d="M363.91,476.77c-0.12,0.62-0.72,2.7-0.92,3.32h-9.3v-0.56c1.82-0.18,1.98-0.28,1.98-1.98v-7.94
			c0-1.7-0.2-1.8-1.8-1.96v-0.56h5.36v0.56c-1.6,0.16-1.82,0.24-1.82,1.96v8.14c0,1.22,0.16,1.5,1.3,1.52
			c0.02,0,1.46,0.02,1.58,0.02c1.02,0,1.32-0.12,1.78-0.62c0.5-0.52,0.92-1.32,1.22-2.06L363.91,476.77z"/>
		<path class="st41" d="M371.97,480.09v-0.56c1.3-0.16,1.46-0.36,1.18-1.12c-0.26-0.78-0.66-1.78-1.08-3.04h-4.32
			c-0.32,0.9-0.62,1.68-0.9,2.5c-0.44,1.3-0.16,1.46,1.48,1.66v0.56h-4.62v-0.56c1.26-0.16,1.58-0.3,2.28-2.1l4.14-10.5l0.64-0.12
			c1.26,3.42,2.64,7.2,3.9,10.66c0.64,1.74,0.82,1.9,2.24,2.06v0.56H371.97z M369.97,469.43c-0.64,1.72-1.32,3.54-1.92,5.12h3.74
			L369.97,469.43z"/>
		<path class="st41" d="M389.41,476.89c-0.28,0.96-0.8,2.4-1.1,3.02c-0.58,0.12-2.14,0.48-3.66,0.48c-4.78,0-7.22-3.18-7.22-6.68
			c0-4.08,3.1-6.9,7.58-6.9c1.72,0,3.12,0.36,3.78,0.46c0.08,0.9,0.22,2.1,0.38,3.1l-0.62,0.14c-0.4-1.34-0.88-2.16-1.9-2.58
			c-0.52-0.24-1.34-0.38-2.1-0.38c-3.3,0-5.04,2.44-5.04,5.74c0,3.86,2,6.34,5.24,6.34c2.04,0,3.04-0.94,4.06-2.94L389.41,476.89z"
			/>
		<path class="st41" d="M397.91,480.09v-0.56c1.3-0.16,1.46-0.36,1.18-1.12c-0.26-0.78-0.66-1.78-1.08-3.04h-4.32
			c-0.32,0.9-0.62,1.68-0.9,2.5c-0.44,1.3-0.16,1.46,1.48,1.66v0.56h-4.62v-0.56c1.26-0.16,1.58-0.3,2.28-2.1l4.14-10.5l0.64-0.12
			c1.26,3.42,2.64,7.2,3.9,10.66c0.64,1.74,0.82,1.9,2.24,2.06v0.56H397.91z M395.91,469.43c-0.64,1.72-1.32,3.54-1.92,5.12h3.74
			L395.91,469.43z"/>
		<path class="st41" d="M403.35,467.09h5.34v0.56c-1.56,0.14-1.84,0.28-1.84,2.06v3.44c0.4-0.04,0.86-0.36,1.44-0.92
			c1.12-1.06,2.46-2.42,3.38-3.46c0.6-0.68,0.54-0.94-0.32-1.06l-0.56-0.06v-0.56h4.86v0.56c-1.5,0.18-2.02,0.28-3.36,1.66
			c-0.6,0.58-2.16,2.1-3.44,3.36c1.52,1.8,3.74,4.36,4.78,5.46c1.02,1.1,1.28,1.26,2.52,1.4v0.56h-3.2
			c-1.54-1.74-3.16-3.68-4.98-5.8c-0.46-0.56-0.8-0.6-1.12-0.58v3.8c0,1.74,0.18,1.88,1.84,2.02v0.56h-5.34v-0.56
			c1.64-0.14,1.8-0.28,1.8-2.02v-7.8c0-1.8-0.14-1.94-1.8-2.06V467.09z"/>
	</g>
</g>
<g>
	<path class="st42" d="M222.14,190.87c0,0-43.35-60.87-96.77-12.96c-1.82,1.64-3.81,3.68-5.78,6.16c-2.92,3.67-4.93,7.22-6.32,10.17
		c-1.55,4.04-3.53,10.11-4.66,17.67c-4.56,30.31,8.93,54.81,16.76,69.02c27.6,50.12,81.37,77.1,96.77,84.34"/>
	<path class="st42" d="M218.14,190.87c0,0,43.35-60.87,96.77-12.96c1.82,1.64,3.81,3.68,5.78,6.16c2.92,3.67,4.93,7.22,6.32,10.17
		c1.55,4.04,3.53,10.11,4.66,17.67c4.56,30.31-8.93,54.81-16.76,69.02c-27.6,50.12-81.37,77.1-96.77,84.34"/>
</g>
<g>
	<path d="M630.27,198.79c0,0-43.35-60.87-96.77-12.96c-1.82,1.64-3.81,3.68-5.78,6.16c-2.92,3.67-4.93,7.22-6.32,10.17
		c-1.55,4.04-3.53,10.11-4.66,17.67c-4.56,30.31,8.93,54.81,16.76,69.02c27.6,50.12,81.37,77.1,96.77,84.34"/>
	<path d="M626.27,198.79c0,0,43.35-60.87,96.77-12.96c1.82,1.64,3.81,3.68,5.78,6.16c2.92,3.67,4.93,7.22,6.32,10.17
		c1.55,4.04,3.53,10.11,4.66,17.67c4.56,30.31-8.93,54.81-16.76,69.02c-27.6,50.12-81.37,77.1-96.77,84.34"/>
</g>
<g>
	<g>
		<path class="st41" d="M540.19,472.83c1.92,0.32,3.48,1.24,3.48,3.18c0,1.36-0.76,2.44-1.94,3.08c-1.04,0.58-2.06,0.78-3.46,0.78
			h-4.92v-0.56c1.7-0.16,1.8-0.34,1.8-1.92v-8.02c0-1.66-0.18-1.8-1.8-1.94v-0.56h5.24c1.5,0,2.44,0.26,3.08,0.7
			c0.7,0.48,1.18,1.22,1.18,2.24C542.85,471.69,541.31,472.55,540.19,472.83z M537.89,472.59c2.2,0,3.1-0.88,3.1-2.52
			c0-1.4-0.86-2.48-2.78-2.48c-0.56,0-0.92,0.06-1.12,0.2c-0.16,0.12-0.22,0.34-0.22,0.98v3.82H537.89z M536.87,477.35
			c0,1.44,0.34,1.8,1.76,1.8c1.56,0,3.08-0.84,3.08-2.94c0-2.04-1.44-2.92-3.88-2.92h-0.96V477.35z"/>
		<path class="st41" d="M555.69,476.69c-0.12,0.52-0.66,2.58-0.86,3.18h-9.72v-0.56c1.86-0.14,2-0.32,2-1.96v-7.9
			c0-1.78-0.22-1.88-1.72-2.02v-0.56h6.12c1.88,0,2.66-0.02,2.9-0.04c0.02,0.5,0.1,2,0.18,3.06l-0.6,0.1
			c-0.18-0.68-0.38-1.1-0.6-1.52c-0.32-0.66-0.78-0.8-1.98-0.8h-1.9c-0.62,0-0.66,0.06-0.66,0.64v4.42h2.22c1.5,0,1.6-0.3,1.84-1.66
			h0.62v4.12h-0.62c-0.26-1.44-0.42-1.64-1.86-1.64h-2.2v3.98c0,1.4,0.44,1.52,1.44,1.54h1.86c1.22,0,1.42-0.18,1.86-0.7
			c0.38-0.42,0.8-1.24,1.08-1.84L555.69,476.69z"/>
		<path class="st41" d="M567.97,479.27c-0.78,0.28-2.32,0.74-4.14,0.74c-2.04,0-3.72-0.52-5.04-1.78c-1.16-1.12-1.88-2.92-1.88-5.02
			c0.02-4.02,2.78-6.96,7.3-6.96c1.56,0,2.78,0.34,3.36,0.62l-0.42,1.42c-0.72-0.32-1.62-0.58-2.98-0.58
			c-3.28,0-5.42,2.04-5.42,5.42c0,3.42,2.06,5.44,5.2,5.44c1.14,0,1.92-0.16,2.32-0.36v-4.02h-2.74v-1.4h4.44V479.27z
			 M562.01,463.33c0.1,0.46,0.44,0.98,1.42,0.98c0.98,0,1.36-0.46,1.46-0.98h1.02c-0.02,1.18-0.78,2.12-2.5,2.12
			c-1.7,0-2.42-0.92-2.46-2.12H562.01z"/>
		<path class="st41" d="M577.61,473.55h-5.24v4.86h5.84v1.46h-7.58v-13.48h7.28v1.46h-5.54v4.26h5.24V473.55z"/>
		<path class="st41" d="M580.47,479.87v-13.48h1.9l4.32,6.82c1,1.58,1.78,3,2.42,4.38l0.04-0.02c-0.16-1.8-0.2-3.44-0.2-5.54v-5.64
			h1.64v13.48h-1.76l-4.28-6.84c-0.94-1.5-1.84-3.04-2.52-4.5l-0.06,0.02c0.1,1.7,0.14,3.32,0.14,5.56v5.76H580.47z"/>
		<path class="st41" d="M593.63,466.57c1.06-0.16,2.32-0.28,3.7-0.28c2.5,0,4.28,0.58,5.46,1.68c1.2,1.1,1.9,2.66,1.9,4.84
			c0,2.2-0.68,4-1.94,5.24c-1.26,1.26-3.34,1.94-5.96,1.94c-1.24,0-2.28-0.06-3.16-0.16V466.57z M595.37,478.49
			c0.44,0.08,1.08,0.1,1.76,0.1c3.72,0,5.74-2.08,5.74-5.72c0.02-3.18-1.78-5.2-5.46-5.2c-0.9,0-1.58,0.08-2.04,0.18V478.49z"/>
		<path class="st41" d="M606.85,464.43c0-0.52,0.44-1,1-1c0.54,0,0.96,0.48,0.96,1s-0.42,1.02-0.96,1.02
			C607.27,465.45,606.85,464.95,606.85,464.43z M608.69,466.39v13.48h-1.74v-13.48H608.69z"/>
		<path class="st41" d="M611.73,466.39h1.74v6.5h0.06c0.36-0.52,0.72-1,1.06-1.44l4.12-5.06h2.16l-4.88,5.72l5.26,7.76h-2.06
			l-4.44-6.62l-1.28,1.48v5.14h-1.74V466.39z"/>
		<path class="st41" d="M625.13,467.87h-4.1v-1.48h9.98v1.48h-4.12v12h-1.76V467.87z"/>
		<path class="st41" d="M639.49,473.55h-5.24v4.86h5.84v1.46h-7.58v-13.48h7.28v1.46h-5.54v4.26h5.24V473.55z"/>
		<path class="st41" d="M642.35,479.87v-13.48h1.9l4.32,6.82c1,1.58,1.78,3,2.42,4.38l0.04-0.02c-0.16-1.8-0.2-3.44-0.2-5.54v-5.64
			h1.64v13.48h-1.76l-4.28-6.84c-0.94-1.5-1.84-3.04-2.52-4.5l-0.06,0.02c0.1,1.7,0.14,3.32,0.14,5.56v5.76H642.35z"/>
		<path class="st41" d="M659.51,477.75c0.78,0.48,1.92,0.88,3.12,0.88c1.78,0,2.82-0.94,2.82-2.3c0-1.26-0.72-1.98-2.54-2.68
			c-2.2-0.78-3.56-1.92-3.56-3.82c0-2.1,1.74-3.66,4.36-3.66c1.38,0,2.38,0.32,2.98,0.66l-0.48,1.42c-0.44-0.24-1.34-0.64-2.56-0.64
			c-1.84,0-2.54,1.1-2.54,2.02c0,1.26,0.82,1.88,2.68,2.6c2.28,0.88,3.44,1.98,3.44,3.96c0,2.08-1.54,3.88-4.72,3.88
			c-1.3,0-2.72-0.38-3.44-0.86L659.51,477.75z"/>
		<path class="st41" d="M681.13,472.99c0,4.64-2.82,7.1-6.26,7.1c-3.56,0-6.06-2.76-6.06-6.84c0-4.28,2.66-7.08,6.26-7.08
			C678.75,466.17,681.13,468.99,681.13,472.99z M670.67,473.21c0,2.88,1.56,5.46,4.3,5.46c2.76,0,4.32-2.54,4.32-5.6
			c0-2.68-1.4-5.48-4.3-5.48C672.11,467.59,670.67,470.25,670.67,473.21z"/>
		<path class="st41" d="M683.39,479.87v-13.48h1.9l4.32,6.82c1,1.58,1.78,3,2.42,4.38l0.04-0.02c-0.16-1.8-0.2-3.44-0.2-5.54v-5.64
			h1.64v13.48h-1.76l-4.28-6.84c-0.94-1.5-1.84-3.04-2.52-4.5l-0.06,0.02c0.1,1.7,0.14,3.32,0.14,5.56v5.76H683.39z"/>
		<path class="st41" d="M696.55,466.57c0.88-0.18,2.14-0.28,3.34-0.28c1.86,0,3.06,0.34,3.9,1.1c0.68,0.6,1.06,1.52,1.06,2.56
			c0,1.78-1.12,2.96-2.54,3.44v0.06c1.04,0.36,1.66,1.32,1.98,2.72c0.44,1.88,0.76,3.18,1.04,3.7h-1.8
			c-0.22-0.38-0.52-1.54-0.9-3.22c-0.4-1.86-1.12-2.56-2.7-2.62h-1.64v5.84h-1.74V466.57z M698.29,472.71h1.78
			c1.86,0,3.04-1.02,3.04-2.56c0-1.74-1.26-2.5-3.1-2.52c-0.84,0-1.44,0.08-1.72,0.16V472.71z"/>
		<path class="st41" d="M709.49,475.63l-1.4,4.24h-1.8l4.58-13.48h2.1l4.6,13.48h-1.86l-1.44-4.24H709.49z M713.91,474.27
			l-1.32-3.88c-0.3-0.88-0.5-1.68-0.7-2.46h-0.04c-0.2,0.8-0.42,1.62-0.68,2.44l-1.32,3.9H713.91z"/>
	</g>
</g>
</svg>
`,Jt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{font-family:'Arial-Black';}
	.st35{font-size:54.1714px;}
	.st36{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st37{font-size:20px;}
	.st38{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st39{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st40{fill:#070404;}
	.st41{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st42{fill:#ED1940;}
	.st43{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st44{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<ellipse transform="matrix(0.9676 -0.2527 0.2527 0.9676 -79.403 113.2065)" class="st0" cx="401.07" cy="365.76" rx="11.05" ry="33.14"/>
<g>
	<path class="st33" d="M547.66,283.03H308.19c-6.6,0-12-5.4-12-12v-63.12c0-6.6,5.4-12,12-12h239.47c6.6,0,12,5.4,12,12v63.12
		C559.66,277.63,554.26,283.03,547.66,283.03z"/>
	<path d="M432.6,441.14h-9.35c-6.6,0-12-5.4-12-12V295.03c0-6.6,5.4-12,12-12h9.35c6.6,0,12,5.4,12,12v134.11
		C444.6,435.74,439.2,441.14,432.6,441.14z"/>
	<text transform="matrix(1 0 0 1 407.9196 262.3943)" class="st34 st35">T</text>
</g>
<ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -139.8499 423.9855)" class="st0" cx="441.87" cy="380.81" rx="30.17" ry="11.05"/>
<ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -154.9869 435.0875)" class="st0" cx="447.7" cy="404.63" rx="30.17" ry="11.05"/>
<ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -170.2746 445.7714)" class="st0" cx="452.96" cy="428.43" rx="30.17" ry="11.05"/>
<path class="st36" d="M395.49,383.24c-6.16,31.28,3.86,58.08,21.78,65.99c3.66,1.61,10.76,3.81,21.45,1.48"/>
<text transform="matrix(1 0 0 1 27.2436 55.4616)" class="st34 st37">TEKLİF VER</text>
<polygon class="st3" points="410.96,386.3 397.31,394.31 398.86,411.64 411.25,413.94 "/>
</svg>
`,Yt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{font-family:'Arial-Black';}
	.st30{font-size:20px;}
	.st31{fill:#A5A4A4;}
	.st32{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st33{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st34{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st37{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st38{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st39{fill:#070404;}
	.st40{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st41{fill:#ED1940;}
	.st42{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<path class="st28" d="M335.38,265.04H174.76c-6.6,0-12-5.4-12-12v-117.6c0-6.6,5.4-12,12-12h160.62c6.6,0,12,5.4,12,12v117.6
	C347.38,259.64,341.98,265.04,335.38,265.04z"/>
<polygon points="185.54,243.59 185.54,225.66 217.06,193.72 233.13,210.83 283.73,159.53 324.6,201.56 324.6,243.59 "/>
<circle cx="201.8" cy="161.61" r="16.25"/>
<g>
	<text transform="matrix(1 0 0 1 24.7796 42.0584)" class="st29 st30">FOTOĞRAF, YÜKLEME, ALBÜM V</text>
</g>
<path class="st28" d="M692.7,265.04H532.08c-6.6,0-12-5.4-12-12v-117.6c0-6.6,5.4-12,12-12H692.7c6.6,0,12,5.4,12,12v117.6
	C704.7,259.64,699.3,265.04,692.7,265.04z"/>
<polygon points="542.86,243.59 542.86,225.66 574.38,193.72 590.45,210.83 641.05,159.53 681.92,201.56 681.92,243.59 "/>
<circle cx="559.12" cy="161.61" r="16.25"/>
<path class="st3" d="M733.22,280.85h-59.03c-6.6,0-12-5.4-12-12v-54.28c0-6.6,5.4-12,12-12h59.03c6.6,0,12,5.4,12,12v54.28
	C745.22,275.45,739.82,280.85,733.22,280.85z"/>
<g>
	<path d="M704.25,279.85h-1.28c-2.82,0-5.12-2.31-5.12-5.12v-60.23c0-2.82,2.31-5.12,5.12-5.12h1.28c2.82,0,5.12,2.31,5.12,5.12
		v60.23C709.37,277.54,707.07,279.85,704.25,279.85z"/>
	<path d="M668.38,245.25v-1.28c0-2.82,2.31-5.12,5.12-5.12h60.23c2.82,0,5.12,2.31,5.12,5.12v1.28c0,2.82-2.31,5.12-5.12,5.12H673.5
		C670.68,250.37,668.38,248.06,668.38,245.25z"/>
</g>
<path class="st34" d="M492.44,459.64l-155.76,39.21c-6.4,1.61-12.96-2.31-14.57-8.71L293.4,376.09c-1.61-6.4,2.31-12.96,8.71-14.57
	l155.76-39.21c6.4-1.61,12.96,2.31,14.57,8.71l28.71,114.05C502.76,451.47,498.84,458.03,492.44,459.64z"/>
<path class="st34" d="M530.86,516.09H370.24c-6.6,0-12-5.4-12-12v-117.6c0-6.6,5.4-12,12-12h160.62c6.6,0,12,5.4,12,12v117.6
	C542.86,510.69,537.46,516.09,530.86,516.09z"/>
<polygon points="381.02,494.63 381.02,476.71 412.54,444.76 428.61,461.88 479.21,410.58 520.08,452.61 520.08,494.63 "/>
<circle cx="397.28" cy="412.66" r="16.25"/>
</svg>
`,Xt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{font-family:'Arial-Black';}
	.st31{font-size:20px;}
	.st32{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st33{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st34{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st37{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st38{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st39{fill:#070404;}
	.st40{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st41{fill:#ED1940;}
	.st42{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<path d="M339.89,390.2h-32.54c-6.6,0-12-5.4-12-12v-42.29c0-6.6,5.4-12,12-12h32.54c6.6,0,12,5.4,12,12v42.29
		C351.89,384.8,346.49,390.2,339.89,390.2z"/>
	<path d="M421.45,390.2h-32.54c-6.6,0-12-5.4-12-12v-92.33c0-6.6,5.4-12,12-12h32.54c6.6,0,12,5.4,12,12v92.33
		C433.45,384.8,428.05,390.2,421.45,390.2z"/>
	<path d="M501.38,390.2h-32.54c-6.6,0-12-5.4-12-12V152.65c0-6.6,5.4-12,12-12h32.54c6.6,0,12,5.4,12,12V378.2
		C513.38,384.8,507.98,390.2,501.38,390.2z"/>
	<path d="M579.02,390.2h-32.54c-6.6,0-12-5.4-12-12V215.69c0-6.6,5.4-12,12-12h32.54c6.6,0,12,5.4,12,12V378.2
		C591.02,384.8,585.62,390.2,579.02,390.2z"/>
	<path d="M584.87,426.6h-280.1c-5.18,0-9.42-4.24-9.42-9.42v0c0-5.18,4.24-9.42,9.42-9.42h280.1c5.18,0,9.42,4.24,9.42,9.42v0
		C594.29,422.36,590.05,426.6,584.87,426.6z"/>
</g>
<g>
	<text transform="matrix(1 0 0 1 55.1834 71.7021)" class="st30 st31">VERİ</text>
</g>
</svg>
`,Zt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{font-family:'Arial-Black';}
	.st31{font-size:20px;}
	.st32{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st33{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st34{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st35{font-family:'MyriadPro-Regular';}
	.st36{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st37{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st38{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st39{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st40{fill:#070404;}
	.st41{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st42{fill:#ED1940;}
	.st43{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st44{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<path class="st1" d="M331.32,381.75H97.34c-6.6,0-12-5.4-12-12V210.84c0-6.6,5.4-12,12-12h233.98c6.6,0,12,5.4,12,12v158.91
	C343.32,376.35,337.92,381.75,331.32,381.75z"/>
<path class="st1" d="M380.92,417.51H146.94c-6.6,0-12-5.4-12-12V246.6c0-6.6,5.4-12,12-12h233.98c6.6,0,12,5.4,12,12v158.91
	C392.92,412.11,387.52,417.51,380.92,417.51z"/>
<line class="st1" x1="137.59" y1="290.29" x2="390.28" y2="290.29"/>
<line class="st1" x1="163.69" y1="375.2" x2="253.09" y2="375.2"/>
<g>
	<circle class="st29" cx="311.08" cy="366.71" r="20.03"/>
	<circle class="st29" cx="342.57" cy="366.71" r="20.03"/>
</g>
<g>
	<text transform="matrix(1 0 0 1 34.2205 42.0584)"><tspan x="0" y="0" class="st30 st31">KREDİ KARTI</tspan><tspan x="0" y="24" class="st30 st31">VE CÜZDAN</tspan></text>
</g>
<text transform="matrix(1 0 0 1 148.5702 158.5854)" class="st35 st31">KREDİ KARTI</text>
<g>
	<path class="st1" d="M754.18,426.55H502.36c-6.6,0-12-5.4-12-12v-201.1c0-6.6,5.4-12,12-12h251.82c6.6,0,12,5.4,12,12v201.1
		C766.18,421.15,760.78,426.55,754.18,426.55z"/>
	<path class="st1" d="M754.18,426.55H502.36c-6.6,0-12-5.4-12-12V251.81c0-6.6,5.4-12,12-12h251.82c6.6,0,12,5.4,12,12v162.75
		C766.18,421.15,760.78,426.55,754.18,426.55z"/>
	<path class="st1" d="M754.18,426.55H502.36c-6.6,0-12-5.4-12-12V291.84c0-6.6,5.4-12,12-12h251.82c6.6,0,12,5.4,12,12v122.71
		C766.18,421.15,760.78,426.55,754.18,426.55z"/>
	<path class="st1" d="M490.82,334.02l68.45-0.84c5.36,0.47,14.1,1.94,23.5,7.01c12.87,6.95,19.88,16.82,22.91,21.73
		c7.46,10.18,19.81,15.38,31.82,13.33c15.46-2.63,22.56-15.92,23.34-17.44c1.01-2.29,2.17-4.29,3.41-6.03
		c12.3-17.34,37.43-17.83,44.06-17.77c19.14,0,38.27,0,57.41,0"/>
	<text transform="matrix(1 0 0 1 591.7753 167.339)" class="st35 st31">CÜZDAN</text>
</g>
<line class="st1" x1="90.76" y1="252.86" x2="128.62" y2="252.86"/>
</svg>
`,Qt=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{font-family:'Arial-Black';}
	.st28{font-size:20px;}
	.st29{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st30{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st31{fill:#A5A4A4;}
	.st32{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st33{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st34{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st37{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st38{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st39{fill:#070404;}
	.st40{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st41{fill:#ED1940;}
	.st42{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<path class="st26" d="M426.18,264.71l-91.8,84.28c-14.65,15.51,2.69,37.76,22.61,24.63l186.65-164.12
	c32.04-44.88-13.23-93.07-56.01-61.02L264.49,348.15c-52.72,55.33,17.47,144.88,88.39,96.28l215.75-190.85"/>
<g>
	<text transform="matrix(1 0 0 1 54.4487 52.9042)" class="st27 st28">EKLEME</text>
</g>
</svg>
`,$t=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<polygon class="st35" points="370.52,217.86 474.97,217.86 526.88,280.4 420.94,405.49 317.36,281.65 	"/>
	<line class="st35" x1="317.36" y1="280.78" x2="526.88" y2="280.4"/>
	<path class="st36" d="M379.15,280.4l41.8-58.05c13.12,18.89,26.25,37.78,39.37,56.66c-12.73,39.82-25.46,79.63-38.19,119.45
		L379.15,280.4z"/>
	<path class="st36" d="M353.42,199.56L353.42,199.56c-0.9,0.77-2.26,0.66-3.02-0.24l-27.6-32.25c-0.77-0.9-0.66-2.26,0.24-3.02l0,0
		c0.9-0.77,2.26-0.66,3.02,0.24l27.6,32.25C354.42,197.43,354.31,198.79,353.42,199.56z"/>
	<path class="st36" d="M480.7,199.56L480.7,199.56c0.9,0.77,2.26,0.66,3.02-0.24l27.6-32.25c0.77-0.9,0.66-2.26-0.24-3.02v0
		c-0.9-0.77-2.26-0.66-3.02,0.24l-27.6,32.25C479.7,197.43,479.8,198.79,480.7,199.56z"/>
	<path class="st37" d="M396.22,199.56L396.22,199.56c-0.9,0.77-2.26,0.66-3.02-0.24l-27.6-32.25c-0.77-0.9-0.66-2.26,0.24-3.02v0
		c0.9-0.77,2.26-0.66,3.02,0.24l27.6,32.25C397.22,197.43,397.11,198.79,396.22,199.56z"/>
	<path class="st37" d="M445.12,199.56L445.12,199.56c0.9,0.77,2.26,0.66,3.02-0.24l27.6-32.25c0.77-0.9,0.66-2.26-0.24-3.02v0
		c-0.9-0.77-2.26-0.66-3.02,0.24l-27.6,32.25C444.12,197.43,444.22,198.79,445.12,199.56z"/>
</g>
<g>
	<g>
		<g>
			<path class="st39" d="M63.49,511.31c-0.18-0.76-0.34-1.4-0.63-2c-0.38-0.92-0.69-1.13-1.82-1.13h-2.17
				c-0.59,0-0.65,0.08-0.65,0.86v6.24h2.51c1.46,0,1.56-0.32,1.86-2.21h0.61v5.65h-0.63c-0.26-1.89-0.41-2.32-1.84-2.32h-2.51v4.83
				c0,2.35,0.2,2.46,2.04,2.67v0.76h-5.63v-0.76c1.64-0.16,1.82-0.35,1.82-2.67v-10.7c0-2.35-0.2-2.46-1.82-2.67v-0.76h6.42
				c1.82,0,2.51-0.03,2.85-0.05c0.02,0.97,0.1,2.86,0.2,4.16L63.49,511.31z"/>
			<path class="st39" d="M72.59,524.65v-0.76c1.32-0.22,1.48-0.49,1.19-1.51c-0.26-1.05-0.67-2.4-1.09-4.11h-4.37
				c-0.32,1.22-0.63,2.27-0.91,3.38c-0.45,1.76-0.16,1.97,1.5,2.24v0.76h-4.68v-0.76c1.28-0.22,1.6-0.41,2.31-2.84l4.19-14.18
				l0.65-0.16c1.28,4.62,2.67,9.72,3.95,14.4c0.65,2.35,0.83,2.57,2.27,2.78v0.76H72.59z M70.56,510.26
				c-0.65,2.32-1.34,4.78-1.94,6.91h3.79L70.56,510.26z"/>
			<path class="st39" d="M90.47,507.85c-1.36,0.24-1.7,0.49-2.43,2.92c-0.55,1.78-3.34,10.83-4.33,14.18h-0.67
				c-1.19-4.35-2.94-10.67-4.09-14.67c-0.57-2-0.91-2.27-2.15-2.43v-0.76h5.14v0.76c-1.5,0.22-1.58,0.54-1.3,1.54
				c0.51,1.97,1.98,7.35,3.26,11.83c1.07-3.48,2.41-7.89,3.36-11.29c0.45-1.57,0.2-1.81-1.46-2.08v-0.76h4.66V507.85z"/>
			<path class="st39" d="M97.54,506.72c3.46,0,6.56,3.54,6.56,8.91c0,5.81-2.96,9.43-6.68,9.43c-3.89,0-6.72-3.94-6.72-9.02
				C90.7,511.2,93.27,506.72,97.54,506.72z M97.14,507.72c-2.27,0-4.33,2.54-4.33,7.59c0,5.02,2.07,8.72,4.94,8.72
				c2.45,0,4.29-2.43,4.29-7.64C102.04,510.72,99.79,507.72,97.14,507.72z"/>
			<path class="st39" d="M117.98,524.87c-0.26,0-0.49-0.03-0.75-0.05c-1.48-0.13-2.27-0.65-3.16-2.32
				c-0.75-1.38-1.48-3.08-2.13-4.46c-0.4-0.86-0.67-1.03-1.7-1.03h-0.71v4.24c0,2.3,0.22,2.43,1.84,2.65v0.76h-5.41v-0.76
				c1.68-0.24,1.82-0.35,1.82-2.65v-10.78c0-2.29-0.22-2.38-1.82-2.62v-0.76h5.16c1.48,0,2.47,0.24,3.24,0.92
				c0.83,0.7,1.38,1.92,1.38,3.56c0,2.32-1.11,3.78-2.61,4.65c0.36,0.84,1.24,2.65,1.84,3.86c0.75,1.43,1.13,2.11,1.6,2.78
				c0.55,0.78,1.01,1.08,1.48,1.24L117.98,524.87z M110.5,516.09c1.05,0,1.72-0.22,2.23-0.78c0.79-0.78,1.11-1.86,1.11-3.32
				c0-2.89-1.44-3.94-3-3.94c-0.59,0-0.93,0.11-1.07,0.27c-0.18,0.19-0.24,0.46-0.24,1.16v6.62H110.5z"/>
			<path class="st39" d="M118.91,503.8c0-0.7,0.45-1.35,1.01-1.35c0.55,0,0.97,0.65,0.97,1.35s-0.43,1.38-0.97,1.38
				C119.34,505.18,118.91,504.5,118.91,503.8z M120.77,506.45v18.2h-1.76v-18.2H120.77z"/>
		</g>
	</g>
</g>
</svg>
`,en=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.6.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9F9FA;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;stroke:#A5A4A4;stroke-width:16;stroke-miterlimit:10;}
	.st2{fill:#020203;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#020202;}
	.st5{fill:none;stroke:#030403;stroke-width:3;stroke-miterlimit:10;}
	.st6{fill:#FFFFFF;stroke:#070A07;stroke-width:3;stroke-miterlimit:10;}
	.st7{fill:#FFFFFF;stroke:#070A07;stroke-width:0.25;stroke-miterlimit:10;}
	.st8{fill:none;stroke:#0B0E0A;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#0B0E0A;stroke:#0B0E0A;stroke-width:0.25;stroke-miterlimit:10;}
	.st10{fill:#040504;}
	.st11{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st12{fill:#090706;}
	.st13{fill:#777777;}
	.st14{fill:none;stroke:#0A0807;stroke-miterlimit:10;}
	.st15{fill:#070605;}
	.st16{fill:none;stroke:#070605;stroke-miterlimit:10;}
	.st17{fill:none;stroke:#070605;stroke-width:10;stroke-miterlimit:10;}
	.st18{fill:none;stroke:#ED1C3D;stroke-width:9;stroke-miterlimit:10;}
	.st19{stroke:#ED1C3D;stroke-width:11;stroke-miterlimit:10;}
	.st20{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st21{fill:#080808;}
	.st22{fill:#ED1C26;}
	.st23{fill:none;stroke:#000000;stroke-width:4;stroke-miterlimit:10;}
	.st24{fill:none;stroke:#000000;stroke-width:13;stroke-miterlimit:10;}
	.st25{fill:none;stroke:#F4F4F5;stroke-width:3;stroke-miterlimit:10;}
	.st26{fill:none;stroke:#0A0505;stroke-width:19;stroke-miterlimit:10;}
	.st27{fill:none;stroke:#000000;stroke-width:14;stroke-miterlimit:10;}
	.st28{fill:none;stroke:#000000;stroke-width:11;stroke-miterlimit:10;}
	.st29{fill:#A5A4A4;}
	.st30{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
	.st31{fill:#FFFFFF;stroke:#030202;stroke-width:11;stroke-miterlimit:10;}
	.st32{fill:#FFFFFF;stroke:#070505;stroke-width:10;stroke-miterlimit:10;}
	.st33{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;}
	.st34{fill:none;stroke:#000000;stroke-width:7;stroke-miterlimit:10;}
	.st35{fill:none;stroke:#070404;stroke-width:8;stroke-miterlimit:10;}
	.st36{fill:none;stroke:#070404;stroke-width:6;stroke-miterlimit:10;}
	.st37{fill:#070404;}
	.st38{fill:none;stroke:#070404;stroke-width:11;stroke-miterlimit:10;}
	.st39{fill:#ED1940;}
	.st40{fill:none;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
	.st41{font-family:'Arial-Black';}
	.st42{font-size:20px;}
	.st43{fill:none;stroke:#000000;stroke-width:15;stroke-miterlimit:10;}
</style>
<g>
	<circle class="st2" cx="410.72" cy="297.64" r="100.3"/>
	<circle class="st3" cx="410.72" cy="297.64" r="77.87"/>
	<path class="st4" d="M378.61,246.54c7.57-4.43,15.14-8.85,22.72-13.28c0,0,57.42-32.41,92.61-23.61c0,0,43.06,4.17,30.1,50.93
		c-0.79,3.1-2.09,6.94-4.28,11.05c-3.37,6.31-7.48,10.69-10.53,13.45c-0.07-2.88-0.35-6.24-1.07-9.94c-1-5.14-2.55-9.44-4.03-12.77
		c0.85-1.1,7.45-9.9,4.61-19.94c-2.89-10.2-14.35-17.53-27.4-16.01c-2.36-0.24-6.07-0.45-10.57,0.05c0,0-4.48,0.5-9.34,1.95
		c-7.05,2.1-24.34,9.38-46.72,20.25c-7.39,4.28-14.78,8.56-22.17,12.84c-2.44,1.37-15.53,9.04-20.11,25.68
		c-4.45,16.19,2.37,29.15,3.79,31.71c1.32,2.06,11.73,17.65,30.32,18.92c8.77,0.6,15.71-2.24,19.34-4.08c0,0,31.25-10.19,22.8-48.16
		l-34.38,21.76c0,0-16.21-0.18-10.65-16.07l22.23-16.35l22.8-14.35c0,0,7.29-4.63,11.46,3.24c0,0,17.13,24.08,9.26,52.79
		c0,0-10.47,25-35.1,39.36c-24.63,14.35-81.59,38.9-102.42,34.26c0,0-33.34,0-38.43-25.47c0,0-8.8-25,17.6-57.42l6.95,29.63
		c0,0-17.6,31.49,16.67,31.49c0,0,30.56-0.93,53.25-12.96c-2.28-0.95-31.59-13.79-37.54-45.3
		C345.78,285.94,356.94,260.65,378.61,246.54z"/>
</g>
<text transform="matrix(1 0 0 1 45.0421 52.9079)" class="st41 st42">LOGO</text>
</svg>
`,tn=Object.assign({"../assets/icons/icon-02.svg":Pt,"../assets/icons/icon-03.svg":Ft,"../assets/icons/icon-04.svg":It,"../assets/icons/icon-05.svg":Lt,"../assets/icons/icon-06.svg":Rt,"../assets/icons/icon-07.svg":zt,"../assets/icons/icon-08.svg":Bt,"../assets/icons/icon-09.svg":Vt,"../assets/icons/icon-10.svg":Ht,"../assets/icons/icon-11.svg":Ut,"../assets/icons/icon-12.svg":Wt,"../assets/icons/icon-13.svg":Gt,"../assets/icons/icon-14.svg":Kt,"../assets/icons/icon-15.svg":qt,"../assets/icons/icon-16.svg":Jt,"../assets/icons/icon-17.svg":Yt,"../assets/icons/icon-18.svg":Xt,"../assets/icons/icon-19.svg":Zt,"../assets/icons/icon-20.svg":Qt,"../assets/icons/icon-21.svg":$t}),nn=Object.assign({"../assets/icons/logo.svg":en}),rn=Object.keys(nn)[0]??``,an=rn?nn[rn]:``,on={home:5,notifications:3,messages:4,cart:6,location:8,search:9,settings:10,editProfile:11,addPerson:12,share:13,privacy:14,like:15,giveOffer:16,upload:17,data:18,wallet:19,add:20,general1:2,general2:7,general3:21,logo:null};function sn(e){let t=e;return t=t.replace(/<\?xml[^>]*\?>/g,``),t=t.replace(/<!--[\s\S]*?-->/g,``),t=t.replace(/<text[\s\S]*?<\/text>/g,``),t=t.replace(/<style[\s\S]*?<\/style>/g,``),t=t.replace(/\sclass="[^"]*"/g,``),t=t.replace(/#ED1C3D|#ED1940|#ED1C26/gi,`currentColor`),t=t.replace(/#020203|#020202|#030403|#070A07|#0B0E0A|#040504|#080808|#090706|#070605|#0A0807|#0A0505|#070404|#030202|#070505|#040406|#0A0807|#040407/gi,`currentColor`),t=t.replace(/#A5A4A4|#777777|#F4F4F5|#F9F9FA/gi,`currentColor`),t=t.replace(/(stroke|fill)="#000000"/gi,`$1="currentColor"`),t=t.replace(/(stroke|fill)="#FFFFFF"/gi,`$1="transparent"`),t=t.replace(/viewBox="[^"]+"/,`viewBox="240 100 380 360"`),t=t.replace(/<svg([^>]*)\swidth="[^"]*"/,`<svg$1`),t=t.replace(/<svg([^>]*)\sheight="[^"]*"/,`<svg$1`),t=t.replace(/<svg/,`<svg fill="currentColor" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" preserveAspectRatio="xMidYMid meet"`),t}function cn(e){let t=Object.keys(tn).find(t=>t.endsWith(`icon-${String(e).padStart(2,`0`)}.svg`));return t?tn[t]:``}function ln({name:e,size:t=22,inheritColor:n=!0,style:r}){let i=(0,g.useMemo)(()=>{if(e===`logo`)return un(an);let t=on[e];return t==null?``:sn(cn(t))},[e]),a=typeof t==`number`?`${t}px`:t;return(0,B.jsx)(`span`,{"aria-hidden":!0,style:{display:`inline-block`,width:a,height:a,lineHeight:0,color:n?`currentColor`:`var(--ink)`,...r},dangerouslySetInnerHTML:{__html:i}})}function un(e){let t=e;return t=t.replace(/<\?xml[^>]*\?>/g,``),t=t.replace(/<!--[\s\S]*?-->/g,``),t=t.replace(/<text[\s\S]*?<\/text>/g,``),t=t.replace(/<style[\s\S]*?<\/style>/g,``),t=t.replace(/\sclass="[^"]*"/g,``),t=t.replace(/#020203|#020202|#040504|#070A07|#0B0E0A|#080808|#090706|#070605|#0A0807|#0A0505|#070404|#030202|#070505/gi,`currentColor`),t=t.replace(/(stroke|fill)="#000000"/gi,`$1="currentColor"`),t=t.replace(/viewBox="[^"]+"/,`viewBox="305 195 215 205"`),t=t.replace(/<svg([^>]*)\swidth="[^"]*"/,`<svg$1`),t=t.replace(/<svg([^>]*)\sheight="[^"]*"/,`<svg$1`),t=t.replace(/<svg/,`<svg fill="currentColor" stroke="currentColor" preserveAspectRatio="xMidYMid meet"`),t}function dn({tone:e=`light`,size:t=30}){let n=e===`dark`?`var(--night-text)`:`var(--ink)`;return(0,B.jsxs)(z,{to:`/`,"aria-label":`TattooGo home`,style:{display:`inline-flex`,alignItems:`center`,gap:10,color:n},children:[(0,B.jsx)(`span`,{style:{width:t,height:t,color:n,display:`inline-flex`},children:(0,B.jsx)(ln,{name:`logo`,size:t})}),(0,B.jsxs)(`span`,{style:{fontFamily:`var(--font-display)`,fontWeight:500,fontSize:22,letterSpacing:`-0.02em`},children:[`Tattoo`,(0,B.jsx)(`span`,{style:{fontStyle:`italic`},children:`Go`})]})]})}function fn({tone:e=`light`}){let{lang:t,setLang:n}=V(),r=e===`dark`,i=r?`rgba(239,234,227,0.4)`:`rgba(22,19,15,0.4)`,a=r?`var(--night-text)`:`var(--ink)`;return(0,B.jsxs)(`div`,{className:`row center gap-2`,style:{fontFamily:`var(--font-mono)`,fontSize:11,letterSpacing:`0.16em`},children:[(0,B.jsx)(`button`,{"aria-label":`English`,onClick:()=>n(`en`),style:{color:t===`en`?a:i,padding:`4px 6px`},children:`EN`}),(0,B.jsx)(`span`,{style:{color:i},children:`/`}),(0,B.jsx)(`button`,{"aria-label":`Türkçe`,onClick:()=>n(`tr`),style:{color:t===`tr`?a:i,padding:`4px 6px`},children:`TR`})]})}var pn=[{label:`Discover`,items:[{to:`/`,label:{en:`Landing`,tr:`Anasayfa`}},{to:`/how-it-works`,label:{en:`How it works`,tr:`Nasıl çalışır`}},{to:`/artists`,label:{en:`Browse artists`,tr:`Sanatçıları gör`}},{to:`/designs`,label:{en:`Browse designs`,tr:`Tasarımları gör`}},{to:`/categories`,label:{en:`Categories`,tr:`Kategoriler`}}]},{label:`Customer`,items:[{to:`/dashboard`,label:{en:`Dashboard`,tr:`Panel`}},{to:`/dashboard/create-request`,label:{en:`Create request`,tr:`İstek oluştur`}},{to:`/dashboard/requests`,label:{en:`My requests`,tr:`İsteklerim`}},{to:`/dashboard/offers`,label:{en:`Offers received`,tr:`Alınan teklifler`}},{to:`/dashboard/messages`,label:{en:`Messages`,tr:`Mesajlar`}},{to:`/dashboard/favorites`,label:{en:`Favorites`,tr:`Favoriler`}},{to:`/dashboard/appointments`,label:{en:`Appointments`,tr:`Randevular`}}]},{label:`Artist & studio`,items:[{to:`/studio`,label:{en:`Studio home`,tr:`Stüdyo anasayfa`}},{to:`/studio/tattoos`,label:{en:`My tattoos`,tr:`Dövmelerim`}},{to:`/studio/add-tattoo`,label:{en:`Add tattoo`,tr:`Dövme ekle`}},{to:`/studio/give-offer`,label:{en:`Give offer`,tr:`Teklif ver`}},{to:`/studio/offers`,label:{en:`My offers`,tr:`Tekliflerim`}},{to:`/studio/tracking`,label:{en:`Order tracking`,tr:`Sipariş takibi`}},{to:`/studio/calendar`,label:{en:`Calendar`,tr:`Takvim`}},{to:`/studio/campaigns`,label:{en:`Campaigns`,tr:`Kampanyalar`}},{to:`/studio/artists`,label:{en:`My artists`,tr:`Sanatçılarım`}},{to:`/studio/materials`,label:{en:`Materials`,tr:`Malzemeler`}},{to:`/studio/stats`,label:{en:`Statistics`,tr:`İstatistik`}},{to:`/studio/profile`,label:{en:`Profile`,tr:`Profil`}}]},{label:`Support`,items:[{to:`/faq`,label:{en:`FAQ`,tr:`SSS`}},{to:`/contact`,label:{en:`Contact`,tr:`İletişim`}},{to:`/about`,label:{en:`About`,tr:`Hakkında`}},{to:`/terms`,label:{en:`Terms`,tr:`Şartlar`}}]}];function mn({open:e,onClose:t}){let{lang:n}=V();return(0,g.useEffect)(()=>{if(!e)return;document.body.style.overflow=`hidden`;let n=e=>{e.key===`Escape`&&t()};return window.addEventListener(`keydown`,n),()=>{document.body.style.overflow=``,window.removeEventListener(`keydown`,n)}},[e,t]),(0,B.jsx)(`div`,{"aria-hidden":!e,style:{position:`fixed`,top:0,left:0,right:0,background:`var(--paper)`,borderBottom:`1px solid var(--hairline)`,zIndex:60,transform:e?`translateY(0)`:`translateY(-100%)`,transition:`transform .7s var(--ease-out)`,boxShadow:e?`0 30px 60px rgba(22,19,15,0.10)`:`none`},children:(0,B.jsxs)(`div`,{className:`container`,style:{paddingBlock:80},children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:40},children:[(0,B.jsxs)(`span`,{className:`mono`,children:[`Index · `,n===`tr`?`TattooGo içeriği`:`TattooGo navigation`]}),(0,B.jsxs)(`button`,{className:`mono`,onClick:t,"aria-label":`Close index`,children:[`× `,n===`tr`?`Kapat`:`Close`]})]}),(0,B.jsxs)(`div`,{className:`row gap-3 wrap`,style:{marginBottom:36},children:[(0,B.jsx)(z,{to:`/dashboard/create-request`,className:`btn btn-primary`,children:n===`tr`?`Dövme isteği oluştur`:`Create tattoo request`}),(0,B.jsx)(z,{to:`/register`,className:`btn`,children:n===`tr`?`Sanatçı olarak katıl`:`Join as artist`}),(0,B.jsx)(z,{to:`/login`,className:`btn btn-ghost`,children:n===`tr`?`Giriş`:`Log in`})]}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`,gap:48},children:pn.map(e=>(0,B.jsxs)(`div`,{className:`col`,style:{gap:14},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e.label}),(0,B.jsx)(`hr`,{className:`hr`}),e.items.map(e=>(0,B.jsx)(z,{to:e.to,className:`display`,style:{fontSize:22,lineHeight:1.1,padding:`4px 0`},children:e.label[n]},e.to))]},e.label))})]})})}var hn=940;function gn({tone:e=`light`}){let{t}=V(),[n,r]=(0,g.useState)(!1),[i,a]=(0,g.useState)(!1),[o,s]=(0,g.useState)(()=>typeof window>`u`?!0:window.innerWidth>=hn),c=Le();(0,g.useEffect)(()=>{let e=()=>r(window.scrollY>8);return e(),window.addEventListener(`scroll`,e,{passive:!0}),()=>window.removeEventListener(`scroll`,e)},[]),(0,g.useEffect)(()=>{let e=window.matchMedia(`(min-width: ${hn}px)`),t=()=>s(e.matches);return t(),e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),(0,g.useEffect)(()=>{a(!1)},[c.pathname]);let l=e===`dark`,u=l?n?`rgba(15,13,11,0.92)`:`rgba(15,13,11,0.6)`:n?`rgba(239,234,227,0.92)`:`rgba(239,234,227,0.6)`,d=n?l?`var(--night-hairline)`:`var(--hairline)`:`transparent`,f=l?`var(--night-text)`:`var(--ink)`;return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(`header`,{style:{position:`fixed`,top:0,left:0,right:0,zIndex:50,background:u,backdropFilter:`saturate(140%) blur(14px)`,WebkitBackdropFilter:`saturate(140%) blur(14px)`,borderBottom:`1px solid ${d}`,transition:`background .4s var(--ease-out), border-color .4s var(--ease-out)`},children:(0,B.jsxs)(`div`,{className:`container row center between`,style:{paddingBlock:14},children:[(0,B.jsx)(dn,{tone:e}),o?(0,B.jsxs)(`div`,{className:`row center gap-4`,children:[(0,B.jsx)(vn,{to:`/how-it-works`,children:t(`nav.howItWorks`)}),(0,B.jsx)(vn,{to:`/artists`,children:t(`nav.artists`)}),(0,B.jsx)(vn,{to:`/designs`,children:t(`nav.designs`)}),(0,B.jsx)(vn,{to:`/categories`,children:t(`nav.categories`)}),(0,B.jsx)(`span`,{style:{width:1,height:18,background:`var(--hairline-strong)`,opacity:l?.4:1}}),(0,B.jsx)(fn,{tone:e}),(0,B.jsx)(z,{to:`/login`,className:`mono`,style:{color:f},children:t(`nav.login`)}),(0,B.jsx)(z,{to:`/register`,className:`btn btn-sm`,children:t(`nav.signup`)}),(0,B.jsxs)(`button`,{className:`mono row center gap-2`,"aria-label":`Open index`,onClick:()=>a(!0),style:{marginLeft:6,color:f},children:[(0,B.jsx)(ln,{name:`add`,size:16}),t(`nav.index`)]})]}):(0,B.jsxs)(`div`,{className:`row center gap-3`,children:[(0,B.jsx)(fn,{tone:e}),(0,B.jsx)(`button`,{"aria-label":`Open menu`,onClick:()=>a(!0),style:{width:40,height:40,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,border:`1px solid ${l?`var(--night-hairline)`:`var(--hairline-strong)`}`,borderRadius:999,color:f,background:`transparent`},children:(0,B.jsx)(_n,{color:f,open:i})})]})]})}),(0,B.jsx)(mn,{open:i,onClose:()=>a(!1)})]})}function _n({color:e,open:t}){return(0,B.jsx)(`span`,{style:{display:`inline-block`,width:18,height:14,position:`relative`},children:[0,1,2].map(n=>{let r=n===0?0:n===1?6:12,i=`translateY(0) rotate(0deg)`,a=1;return t&&(n===0&&(i=`translateY(6px) rotate(45deg)`),n===1&&(a=0),n===2&&(i=`translateY(-6px) rotate(-45deg)`)),(0,B.jsx)(`span`,{style:{position:`absolute`,left:0,right:0,top:r,height:2,background:e,borderRadius:2,transform:i,opacity:a,transition:`transform .35s var(--ease-out), opacity .25s var(--ease-out)`}},n)})})}function vn({to:e,children:t}){let n=Le().pathname===e;return(0,B.jsxs)(z,{to:e,className:`mono`,style:{position:`relative`,padding:`6px 2px`,opacity:n?1:.78},children:[t,(0,B.jsx)(`span`,{style:{position:`absolute`,left:0,right:0,bottom:-2,height:1,background:`currentColor`,transform:`scaleX(${+!!n})`,transformOrigin:`left`,transition:`transform .35s var(--ease-out)`}})]})}function yn(){let{lang:e,t}=V(),n=new Date().getFullYear(),r=[{label:e===`tr`?`Keşfet`:`Discover`,items:[{to:`/how-it-works`,label:t(`nav.howItWorks`)},{to:`/artists`,label:t(`nav.artists`)},{to:`/designs`,label:t(`nav.designs`)},{to:`/categories`,label:t(`nav.categories`)}]},{label:e===`tr`?`Hesap`:`Account`,items:[{to:`/login`,label:t(`nav.login`)},{to:`/register`,label:t(`nav.signup`)},{to:`/dashboard`,label:e===`tr`?`Müşteri paneli`:`Customer dashboard`},{to:`/studio`,label:e===`tr`?`Sanatçı paneli`:`Artist dashboard`}]},{label:e===`tr`?`Destek`:`Support`,items:[{to:`/faq`,label:`FAQ`},{to:`/contact`,label:e===`tr`?`İletişim`:`Contact`},{to:`/about`,label:e===`tr`?`Hakkında`:`About`},{to:`/terms`,label:e===`tr`?`Şartlar`:`Terms`}]}];return(0,B.jsx)(`footer`,{className:`dark`,style:{paddingTop:100},children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsxs)(`div`,{className:`row between`,style:{gap:48,flexWrap:`wrap`,marginBottom:80},children:[(0,B.jsxs)(`div`,{className:`col gap-6`,style:{flex:`1 1 320px`},children:[(0,B.jsx)(`span`,{className:`mono`,style:{color:`var(--night-muted)`},children:e===`tr`?`Sanatçıya yaz`:`Talk to the studio`}),(0,B.jsx)(`p`,{className:`display display-md`,style:{margin:0,color:`var(--night-text)`,maxWidth:460},children:e===`tr`?`Brief’inizi paylaşın. Hafta içinde gerçek bir teklif gelsin.`:`Share your brief. Receive a real, considered offer this week.`}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:6},children:[(0,B.jsx)(z,{to:`/dashboard/create-request`,className:`btn btn-primary`,style:{background:`var(--accent)`,borderColor:`var(--accent)`},children:t(`cta.createRequest`)}),(0,B.jsx)(z,{to:`/register`,className:`btn`,children:t(`cta.joinAsArtist`)})]})]}),(0,B.jsx)(`div`,{className:`row`,style:{gap:64,flexWrap:`wrap`},children:r.map(e=>(0,B.jsxs)(`div`,{className:`col gap-3`,style:{minWidth:140},children:[(0,B.jsx)(`span`,{className:`mono`,style:{color:`var(--night-muted)`},children:e.label}),e.items.map(e=>(0,B.jsx)(z,{to:e.to,style:{color:`var(--night-text)`,opacity:.85},children:e.label},e.to))]},e.label))})]}),(0,B.jsxs)(`div`,{className:`display`,style:{fontSize:`clamp(80px, 22vw, 320px)`,lineHeight:.85,letterSpacing:`-0.04em`,color:`var(--night-text)`,borderTop:`1px solid var(--night-hairline)`,paddingTop:36},children:[`Tattoo`,(0,B.jsx)(`span`,{className:`italic`,children:`Go`})]}),(0,B.jsxs)(`div`,{className:`row between center`,style:{paddingBlock:28,borderTop:`1px solid var(--night-hairline)`,flexWrap:`wrap`,gap:16},children:[(0,B.jsxs)(`span`,{className:`mono`,style:{color:`var(--night-muted)`},children:[`© `,n,` · `,t(`footer.lockup`)]}),(0,B.jsx)(`span`,{className:`mono`,style:{color:`var(--night-muted)`},children:`Istanbul · Amsterdam · Lisbon`})]})]})})}function bn({items:e,tone:t=`light`}){let n=[...e,...e,...e];return(0,B.jsx)(`div`,{className:`marquee`,style:{background:t===`dark`?`var(--night)`:`var(--paper)`,color:t===`dark`?`var(--night-text)`:`var(--ink)`,borderColor:t===`dark`?`var(--night-hairline)`:`var(--hairline)`},children:(0,B.jsx)(`div`,{className:`marquee-track`,children:n.map((e,t)=>(0,B.jsx)(`span`,{children:e},t))})})}var xn=1e3,Sn=1001,Cn=1002,wn=1003,Tn=1004,En=1005,Dn=1006,On=1007,kn=1008,An=1009,jn=1010,Mn=1011,Nn=1012,Pn=1013,Fn=1014,In=1015,Ln=1016,Rn=1017,zn=1018,Bn=1020,Vn=35902,Hn=35899,Un=1021,Wn=1022,Gn=1023,Kn=1026,qn=1027,Jn=1028,Yn=1029,Xn=1030,Zn=1031,Qn=1033,$n=33776,er=33777,tr=33778,nr=33779,rr=35840,ir=35841,ar=35842,or=35843,sr=36196,cr=37492,lr=37496,ur=37488,dr=37489,fr=37490,pr=37491,mr=37808,hr=37809,gr=37810,_r=37811,vr=37812,yr=37813,br=37814,xr=37815,Sr=37816,Cr=37817,wr=37818,Tr=37819,Er=37820,Dr=37821,Or=36492,kr=36494,Ar=36495,jr=36283,Mr=36284,Nr=36285,Pr=36286,Fr=2300,Ir=2301,Lr=2302,Rr=2303,zr=2400,Br=2401,Vr=2402,Hr=3200,Ur=`srgb`,Wr=`srgb-linear`,Gr=`linear`,Kr=`srgb`,qr=7680,Jr=35044,Yr=2e3;function Xr(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Zr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Qr(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function $r(){let e=Qr(`canvas`);return e.style.display=`block`,e}var ei={},ti=null;function ni(...e){let t=`THREE.`+e.shift();ti?ti(`log`,t,...e):console.log(t,...e)}function ri(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=ri(e);let t=`THREE.`+e.shift();if(ti)ti(`warn`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=ri(e);let t=`THREE.`+e.shift();if(ti)ti(`error`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function ii(...e){let t=e.join(` `);t in ei||(ei[t]=!0,H(...e))}function ai(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var oi={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},si=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ci=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),li=Math.PI/180,ui=180/Math.PI;function di(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ci[e&255]+ci[e>>8&255]+ci[e>>16&255]+ci[e>>24&255]+`-`+ci[t&255]+ci[t>>8&255]+`-`+ci[t>>16&15|64]+ci[t>>24&255]+`-`+ci[n&63|128]+ci[n>>8&255]+`-`+ci[n>>16&255]+ci[n>>24&255]+ci[r&255]+ci[r>>8&255]+ci[r>>16&255]+ci[r>>24&255]).toLowerCase()}function W(e,t,n){return Math.max(t,Math.min(n,e))}function fi(e,t){return(e%t+t)%t}function pi(e,t,n){return(1-n)*e+n*t}function mi(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function hi(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var G=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},gi=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(W(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vi.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vi.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _i.copy(this).projectOnVector(e),this.sub(_i)}reflect(e){return this.sub(_i.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_i=new K,vi=new gi,q=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return ii(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(yi.makeScale(e,t)),this}rotate(e){return ii(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(yi.makeRotation(-e)),this}translate(e,t){return ii(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(yi.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},yi=new q,bi=new q().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xi=new q().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Si(){let e={enabled:!0,workingColorSpace:Wr,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=wi(e.r),e.g=wi(e.g),e.b=wi(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ti(e.r),e.g=Ti(e.g),e.b=Ti(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Gr:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return ii(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return ii(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Wr]:{primaries:t,whitePoint:r,transfer:Gr,toXYZ:bi,fromXYZ:xi,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ur},outputColorSpaceConfig:{drawingBufferColorSpace:Ur}},[Ur]:{primaries:t,whitePoint:r,transfer:Kr,toXYZ:bi,fromXYZ:xi,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ur}}}),e}var Ci=Si();function wi(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ti(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ei,Di=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ei===void 0&&(Ei=Qr(`canvas`)),Ei.width=e.width,Ei.height=e.height;let t=Ei.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ei}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Qr(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=wi(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(wi(t[e]/255)*255):t[e]=wi(t[e]);return{data:t,width:e.width,height:e.height}}else return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Oi=0,ki=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Oi++}),this.uuid=di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Ai(r[t].image)):e.push(Ai(r[t]))}else e=Ai(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Ai(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Di.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var ji=0,Mi=new K,Ni=class e extends si{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Sn,i=Sn,a=Dn,o=kn,s=Gn,c=An,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ji++}),this.uuid=di(),this.name=``,this.source=new ki(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mi).x}get height(){return this.source.getSize(Mi).y}get depth(){return this.source.getSize(Mi).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){H(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xn:e.x-=Math.floor(e.x);break;case Sn:e.x=e.x<0?0:1;break;case Cn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xn:e.y-=Math.floor(e.y);break;case Sn:e.y=e.y<0?0:1;break;case Cn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ni.DEFAULT_IMAGE=null,Ni.DEFAULT_MAPPING=300,Ni.DEFAULT_ANISOTROPY=1;var Pi=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this.w=W(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this.w=W(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Fi=class extends si{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Pi(0,0,e,t),this.scissorTest=!1,this.viewport=new Pi(0,0,e,t),this.textures=[];let r=new Ni({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Dn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new ki(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ii=class extends Fi{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Li=class extends Ni{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ri=class extends Ni{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},zi=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Bi.setFromMatrixColumn(e,0).length(),i=1/Bi.setFromMatrixColumn(e,1).length(),a=1/Bi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hi,e,Ui)}lookAt(e,t,n){let r=this.elements;return Ki.subVectors(e,t),Ki.lengthSq()===0&&(Ki.z=1),Ki.normalize(),Wi.crossVectors(n,Ki),Wi.lengthSq()===0&&(Math.abs(n.z)===1?Ki.x+=1e-4:Ki.z+=1e-4,Ki.normalize(),Wi.crossVectors(n,Ki)),Wi.normalize(),Gi.crossVectors(Ki,Wi),r[0]=Wi.x,r[4]=Gi.x,r[8]=Ki.x,r[1]=Wi.y,r[5]=Gi.y,r[9]=Ki.y,r[2]=Wi.z,r[6]=Gi.z,r[10]=Ki.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],M=r[7],N=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*M,i[8]=a*C+o*D+s*ee+c*N,i[12]=a*w+o*O+s*te+c*ne,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*M,i[9]=l*C+u*D+d*ee+f*N,i[13]=l*w+u*O+d*te+f*ne,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*M,i[10]=p*C+m*D+h*ee+g*N,i[14]=p*w+m*O+h*te+g*ne,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*M,i[11]=_*C+v*D+y*ee+b*N,i[15]=_*w+v*O+y*te+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Bi.set(r[0],r[1],r[2]).length(),o=Bi.set(r[4],r[5],r[6]).length(),s=Bi.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Vi.copy(this);let c=1/a,l=1/o,u=1/s;return Vi.elements[0]*=c,Vi.elements[1]*=c,Vi.elements[2]*=c,Vi.elements[4]*=l,Vi.elements[5]*=l,Vi.elements[6]*=l,Vi.elements[8]*=u,Vi.elements[9]*=u,Vi.elements[10]*=u,t.setFromRotationMatrix(Vi),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Yr,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Yr,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Bi=new K,Vi=new zi,Hi=new K(0,0,0),Ui=new K(1,1,1),Wi=new K,Gi=new K,Ki=new K,qi=new zi,Ji=new gi,Yi=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(W(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-W(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(W(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-W(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(W(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-W(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qi.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qi,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ji.setFromEuler(this),this.setFromQuaternion(Ji,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yi.DEFAULT_ORDER=`XYZ`;var Xi=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},Zi=0,Qi=new K,$i=new gi,ea=new zi,ta=new K,na=new K,ra=new K,ia=new gi,aa=new K(1,0,0),oa=new K(0,1,0),sa=new K(0,0,1),ca={type:`added`},la={type:`removed`},ua={type:`childadded`,child:null},da={type:`childremoved`,child:null},fa=class e extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zi++}),this.uuid=di(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new Yi,r=new gi,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new zi},normalMatrix:{value:new q}}),this.matrix=new zi,this.matrixWorld=new zi,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.multiply($i),this}rotateOnWorldAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.premultiply($i),this}rotateX(e){return this.rotateOnAxis(aa,e)}rotateY(e){return this.rotateOnAxis(oa,e)}rotateZ(e){return this.rotateOnAxis(sa,e)}translateOnAxis(e,t){return Qi.copy(e).applyQuaternion(this.quaternion),this.position.add(Qi.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(aa,e)}translateY(e){return this.translateOnAxis(oa,e)}translateZ(e){return this.translateOnAxis(sa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ea.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ta.copy(e):ta.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ea.lookAt(na,ta,this.up):ea.lookAt(ta,na,this.up),this.quaternion.setFromRotationMatrix(ea),r&&(ea.extractRotation(r.matrixWorld),$i.setFromRotationMatrix(ea),this.quaternion.premultiply($i.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ca),ua.child=e,this.dispatchEvent(ua),ua.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(la),da.child=e,this.dispatchEvent(da),da.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ea.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ea.multiply(e.parent.matrixWorld)),e.applyMatrix4(ea),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ca),ua.child=e,this.dispatchEvent(ua),ua.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,e,ra),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,ia,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};fa.DEFAULT_UP=new K(0,1,0),fa.DEFAULT_MATRIX_AUTO_UPDATE=!0,fa.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pa=class extends fa{constructor(){super(),this.isGroup=!0,this.type=`Group`}},ma={type:`move`},ha=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ma)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new pa;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ga={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_a={h:0,s:0,l:0},va={h:0,s:0,l:0};function ya(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ur){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ci.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ci.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ci.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ci.workingColorSpace){if(e=fi(e,1),t=W(t,0,1),n=W(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=ya(i,r,e+1/3),this.g=ya(i,r,e),this.b=ya(i,r,e-1/3)}return Ci.colorSpaceToWorking(this,r),this}setStyle(e,t=Ur){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ur){let n=ga[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wi(e.r),this.g=wi(e.g),this.b=wi(e.b),this}copyLinearToSRGB(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ur){return Ci.workingToColorSpace(Y.copy(this),e),Math.round(W(Y.r*255,0,255))*65536+Math.round(W(Y.g*255,0,255))*256+Math.round(W(Y.b*255,0,255))}getHexString(e=Ur){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ci.workingColorSpace){Ci.workingToColorSpace(Y.copy(this),t);let n=Y.r,r=Y.g,i=Y.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Ci.workingColorSpace){return Ci.workingToColorSpace(Y.copy(this),t),e.r=Y.r,e.g=Y.g,e.b=Y.b,e}getStyle(e=Ur){Ci.workingToColorSpace(Y.copy(this),e);let t=Y.r,n=Y.g,r=Y.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(_a),this.setHSL(_a.h+e,_a.s+t,_a.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_a),e.getHSL(va);let n=pi(_a.h,va.h,t),r=pi(_a.s,va.s,t),i=pi(_a.l,va.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Y=new J;J.NAMES=ga;var ba=class extends fa{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yi,this.environmentIntensity=1,this.environmentRotation=new Yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},xa=new K,Sa=new K,Ca=new K,wa=new K,Ta=new K,Ea=new K,Da=new K,Oa=new K,ka=new K,Aa=new K,ja=new Pi,Ma=new Pi,Na=new Pi,Pa=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),xa.subVectors(e,t),r.cross(xa);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){xa.subVectors(r,t),Sa.subVectors(n,t),Ca.subVectors(e,t);let a=xa.dot(xa),o=xa.dot(Sa),s=xa.dot(Ca),c=Sa.dot(Sa),l=Sa.dot(Ca),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,wa)===null?!1:wa.x>=0&&wa.y>=0&&wa.x+wa.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,wa)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,wa.x),s.addScaledVector(a,wa.y),s.addScaledVector(o,wa.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return ja.setScalar(0),Ma.setScalar(0),Na.setScalar(0),ja.fromBufferAttribute(e,t),Ma.fromBufferAttribute(e,n),Na.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ja,i.x),a.addScaledVector(Ma,i.y),a.addScaledVector(Na,i.z),a}static isFrontFacing(e,t,n,r){return xa.subVectors(n,t),Sa.subVectors(e,t),xa.cross(Sa).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xa.subVectors(this.c,this.b),Sa.subVectors(this.a,this.b),xa.cross(Sa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ta.subVectors(r,n),Ea.subVectors(i,n),Oa.subVectors(e,n);let s=Ta.dot(Oa),c=Ea.dot(Oa);if(s<=0&&c<=0)return t.copy(n);ka.subVectors(e,r);let l=Ta.dot(ka),u=Ea.dot(ka);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Ta,a);Aa.subVectors(e,i);let f=Ta.dot(Aa),p=Ea.dot(Aa);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ea,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Da.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Da,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Ta,a).addScaledVector(Ea,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Fa=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(La.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(La.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=La.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,La):La.fromBufferAttribute(r,t),La.applyMatrix4(e.matrixWorld),this.expandByPoint(La);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Ra.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Ra.copy(e.boundingBox)),Ra.applyMatrix4(e.matrixWorld),this.union(Ra)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,La),La.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ga),Ka.subVectors(this.max,Ga),za.subVectors(e.a,Ga),Ba.subVectors(e.b,Ga),Va.subVectors(e.c,Ga),Ha.subVectors(Ba,za),Ua.subVectors(Va,Ba),Wa.subVectors(za,Va);let t=[0,-Ha.z,Ha.y,0,-Ua.z,Ua.y,0,-Wa.z,Wa.y,Ha.z,0,-Ha.x,Ua.z,0,-Ua.x,Wa.z,0,-Wa.x,-Ha.y,Ha.x,0,-Ua.y,Ua.x,0,-Wa.y,Wa.x,0];return!Ya(t,za,Ba,Va,Ka)||(t=[1,0,0,0,1,0,0,0,1],!Ya(t,za,Ba,Va,Ka))?!1:(qa.crossVectors(Ha,Ua),t=[qa.x,qa.y,qa.z],Ya(t,za,Ba,Va,Ka))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,La).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(La).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ia[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ia[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ia[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ia[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ia[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ia[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ia[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ia[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ia),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ia=[new K,new K,new K,new K,new K,new K,new K,new K],La=new K,Ra=new Fa,za=new K,Ba=new K,Va=new K,Ha=new K,Ua=new K,Wa=new K,Ga=new K,Ka=new K,qa=new K,Ja=new K;function Ya(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Ja.fromArray(e,a);let o=i.x*Math.abs(Ja.x)+i.y*Math.abs(Ja.y)+i.z*Math.abs(Ja.z),s=t.dot(Ja),c=n.dot(Ja),l=r.dot(Ja);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Xa=new K,Za=new G,Qa=0,$a=class extends si{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qa++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Jr,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Za.fromBufferAttribute(this,t),Za.applyMatrix3(e),this.setXY(t,Za.x,Za.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Xa.fromBufferAttribute(this,t),Xa.applyMatrix3(e),this.setXYZ(t,Xa.x,Xa.y,Xa.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Xa.fromBufferAttribute(this,t),Xa.applyMatrix4(e),this.setXYZ(t,Xa.x,Xa.y,Xa.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xa.fromBufferAttribute(this,t),Xa.applyNormalMatrix(e),this.setXYZ(t,Xa.x,Xa.y,Xa.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xa.fromBufferAttribute(this,t),Xa.transformDirection(e),this.setXYZ(t,Xa.x,Xa.y,Xa.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=mi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=hi(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=mi(t,this.array)),t}setX(e,t){return this.normalized&&(t=hi(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=mi(t,this.array)),t}setY(e,t){return this.normalized&&(t=hi(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=mi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=hi(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=mi(t,this.array)),t}setW(e,t){return this.normalized&&(t=hi(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=hi(t,this.array),n=hi(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=hi(t,this.array),n=hi(n,this.array),r=hi(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=hi(t,this.array),n=hi(n,this.array),r=hi(r,this.array),i=hi(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},eo=class extends $a{constructor(e,t,n){super(new Uint16Array(e),t,n)}},to=class extends $a{constructor(e,t,n){super(new Uint32Array(e),t,n)}},no=class extends $a{constructor(e,t,n){super(new Float32Array(e),t,n)}},ro=new Fa,io=new K,ao=new K,oo=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?ro.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;io.subVectors(e,this.center);let t=io.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(io,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ao.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(io.copy(e.center).add(ao)),this.expandByPoint(io.copy(e.center).sub(ao))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},so=0,co=new zi,lo=new fa,uo=new K,fo=new Fa,po=new Fa,mo=new K,ho=class e extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:so++}),this.uuid=di(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xr(e)?to:eo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return co.makeRotationFromQuaternion(e),this.applyMatrix4(co),this}rotateX(e){return co.makeRotationX(e),this.applyMatrix4(co),this}rotateY(e){return co.makeRotationY(e),this.applyMatrix4(co),this}rotateZ(e){return co.makeRotationZ(e),this.applyMatrix4(co),this}translate(e,t,n){return co.makeTranslation(e,t,n),this.applyMatrix4(co),this}scale(e,t,n){return co.makeScale(e,t,n),this.applyMatrix4(co),this}lookAt(e){return lo.lookAt(e),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(uo).negate(),this.translate(uo.x,uo.y,uo.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new no(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];fo.setFromBufferAttribute(n),this.morphTargetsRelative?(mo.addVectors(this.boundingBox.min,fo.min),this.boundingBox.expandByPoint(mo),mo.addVectors(this.boundingBox.max,fo.max),this.boundingBox.expandByPoint(mo)):(this.boundingBox.expandByPoint(fo.min),this.boundingBox.expandByPoint(fo.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new oo);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);return}if(e){let n=this.boundingSphere.center;if(fo.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];po.setFromBufferAttribute(n),this.morphTargetsRelative?(mo.addVectors(fo.min,po.min),fo.expandByPoint(mo),mo.addVectors(fo.max,po.max),fo.expandByPoint(mo)):(fo.expandByPoint(po.min),fo.expandByPoint(po.max))}fo.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)mo.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(mo));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)mo.fromBufferAttribute(a,t),o&&(uo.fromBufferAttribute(e,t),mo.add(uo)),r=Math.max(r,n.distanceToSquared(mo))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new $a(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let c=new K,l=new K,u=new K,d=new G,f=new G,p=new G,m=new K,h=new K;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new K,y=new K,b=new K,x=new K;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new $a(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)mo.fromBufferAttribute(e,t),mo.normalize(),e.setXYZ(t,mo.x,mo.y,mo.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new $a(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},go=0,_o=class extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:go++}),this.uuid=di(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qr,this.stencilZFail=qr,this.stencilZPass=qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){H(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors==`number`?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new G().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new G().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},vo=new K,yo=new K,bo=new K,xo=new K,So=new K,Co=new K,wo=new K,To=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vo)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=vo.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vo.copy(this.origin).addScaledVector(this.direction,t),vo.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){yo.copy(e).add(t).multiplyScalar(.5),bo.copy(t).sub(e).normalize(),xo.copy(this.origin).sub(yo);let i=e.distanceTo(t)*.5,a=-this.direction.dot(bo),o=xo.dot(this.direction),s=-xo.dot(bo),c=xo.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(yo).addScaledVector(bo,d),f}intersectSphere(e,t){vo.subVectors(e.center,this.origin);let n=vo.dot(this.direction),r=vo.dot(vo)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,vo)!==null}intersectTriangle(e,t,n,r,i){So.subVectors(t,e),Co.subVectors(n,e),wo.crossVectors(So,Co);let a=this.direction.dot(wo),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;xo.subVectors(this.origin,e);let s=o*this.direction.dot(Co.crossVectors(xo,Co));if(s<0)return null;let c=o*this.direction.dot(So.cross(xo));if(c<0||s+c>a)return null;let l=-o*xo.dot(wo);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Eo=class extends _o{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Do=new zi,Oo=new To,ko=new oo,Ao=new K,jo=new K,Mo=new K,No=new K,Po=new K,Fo=new K,Io=new K,Lo=new K,Ro=class extends fa{constructor(e=new ho,t=new Eo){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Fo.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Po.fromBufferAttribute(s,e),a?Fo.addScaledVector(Po,r):Fo.addScaledVector(Po.sub(t),r))}t.add(Fo)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ko.copy(n.boundingSphere),ko.applyMatrix4(i),Oo.copy(e.ray).recast(e.near),!(ko.containsPoint(Oo.origin)===!1&&(Oo.intersectSphere(ko,Ao)===null||Oo.origin.distanceToSquared(Ao)>(e.far-e.near)**2))&&(Do.copy(i).invert(),Oo.copy(e.ray).applyMatrix4(Do),!(n.boundingBox!==null&&Oo.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Oo)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Bo(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Bo(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Bo(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Bo(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function zo(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Lo.copy(s),Lo.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Lo);return l<n.near||l>n.far?null:{distance:l,point:Lo.clone(),object:e}}function Bo(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,jo),e.getVertexPosition(c,Mo),e.getVertexPosition(l,No);let u=zo(e,t,n,r,jo,Mo,No,Io);if(u){let e=new K;Pa.getBarycoord(Io,jo,Mo,No,e),i&&(u.uv=Pa.getInterpolatedAttribute(i,s,c,l,e,new G)),a&&(u.uv1=Pa.getInterpolatedAttribute(a,s,c,l,e,new G)),o&&(u.normal=Pa.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};Pa.getNormal(jo,Mo,No,t.normal),u.face=t,u.barycoord=e}return u}var Vo=class extends Ni{constructor(e=null,t=1,n=1,r,i,a,o,s,c=wn,l=wn,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ho=new K,Uo=new K,Wo=new q,Go=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ho.subVectors(n,t).cross(Uo.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ho),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Wo.getNormalMatrix(e),r=this.coplanarPoint(Ho).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ko=new oo,qo=new G(.5,.5),Jo=new K,Yo=class{constructor(e=new Go,t=new Go,n=new Go,r=new Go,i=new Go,a=new Go){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yr,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ko.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ko.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ko)}intersectsSprite(e){return Ko.center.set(0,0,0),Ko.radius=.7071067811865476+qo.distanceTo(e.center),Ko.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ko)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Jo.x=r.normal.x>0?e.max.x:e.min.x,Jo.y=r.normal.y>0?e.max.y:e.min.y,Jo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Jo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Xo=class extends Ni{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Zo=class extends Ni{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Qo=class extends Ni{constructor(e,t,n=Fn,r,i,a,o=wn,s=wn,c,l=Kn,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ki(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},$o=class extends Qo{constructor(e,t=Fn,n=301,r,i,a=wn,o=wn,s,c=Kn){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},es=class extends Ni{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ts=class e extends ho{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new no(c,3)),this.setAttribute(`normal`,new no(l,3)),this.setAttribute(`uv`,new no(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ns=class e extends ho{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new no(p,3)),this.setAttribute(`normal`,new no(m,3)),this.setAttribute(`uv`,new no(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function rs(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(as(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i))if(as(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice();else t[n][r]=i}}return t}function is(e){let t={};for(let n=0;n<e.length;n++){let r=rs(e[n]);for(let e in r)t[e]=r[e]}return t}function as(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function os(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ss(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ci.workingColorSpace}var cs={clone:rs,merge:is},ls=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,us=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ds=class extends _o{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ls,this.fragmentShader=us,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rs(e.uniforms),this.uniformsGroups=os(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Pi().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new zi().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},fs=class extends ds{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ps=class extends _o{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Hr,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ms=class extends _o{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function hs(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var gs=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},_s=class extends gs{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:zr,endingEnd:zr}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Br:i=e,o=2*t-n;break;case Vr:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Br:a=e,s=2*n-t;break;case Vr:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},vs=class extends gs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},ys=class extends gs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},bs=class extends gs{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},xs=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=hs(t,this.TimeBufferType),this.values=hs(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:hs(e.times,Array),values:hs(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ys(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vs(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new _s(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new bs(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Fr:t=this.InterpolantFactoryMethodDiscrete;break;case Ir:t=this.InterpolantFactoryMethodLinear;break;case Lr:t=this.InterpolantFactoryMethodSmooth;break;case Rr:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fr;case this.InterpolantFactoryMethodLinear:return Ir;case this.InterpolantFactoryMethodSmooth:return Lr;case this.InterpolantFactoryMethodBezier:return Rr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Zr(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Lr,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};xs.prototype.ValueTypeName=``,xs.prototype.TimeBufferType=Float32Array,xs.prototype.ValueBufferType=Float32Array,xs.prototype.DefaultInterpolation=Ir;var Ss=class extends xs{constructor(e,t,n){super(e,t,n)}};Ss.prototype.ValueTypeName=`bool`,Ss.prototype.ValueBufferType=Array,Ss.prototype.DefaultInterpolation=Fr,Ss.prototype.InterpolantFactoryMethodLinear=void 0,Ss.prototype.InterpolantFactoryMethodSmooth=void 0;var Cs=class extends xs{constructor(e,t,n,r){super(e,t,n,r)}};Cs.prototype.ValueTypeName=`color`;var ws=class extends xs{constructor(e,t,n,r){super(e,t,n,r)}};ws.prototype.ValueTypeName=`number`;var Ts=class extends gs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)gi.slerpFlat(i,0,a,c-o,a,c,s);return i}},Es=class extends xs{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ts(this.times,this.values,this.getValueSize(),e)}};Es.prototype.ValueTypeName=`quaternion`,Es.prototype.InterpolantFactoryMethodSmooth=void 0;var Ds=class extends xs{constructor(e,t,n){super(e,t,n)}};Ds.prototype.ValueTypeName=`string`,Ds.prototype.ValueBufferType=Array,Ds.prototype.DefaultInterpolation=Fr,Ds.prototype.InterpolantFactoryMethodLinear=void 0,Ds.prototype.InterpolantFactoryMethodSmooth=void 0;var Os=class extends xs{constructor(e,t,n,r){super(e,t,n,r)}};Os.prototype.ValueTypeName=`vector`;var ks=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},As=class{constructor(e){this.manager=e===void 0?ks:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};As.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var js=new K,Ms=new gi,Ns=new K,Ps=class extends fa{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new zi,this.projectionMatrix=new zi,this.projectionMatrixInverse=new zi,this.coordinateSystem=Yr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(js,Ms,Ns),Ns.x===1&&Ns.y===1&&Ns.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(js,Ms,Ns.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(js,Ms,Ns),Ns.x===1&&Ns.y===1&&Ns.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(js,Ms,Ns.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Fs=new K,Is=new G,Ls=new G,Rs=class extends Ps{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ui*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(li*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ui*2*Math.atan(Math.tan(li*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fs.x,Fs.y).multiplyScalar(-e/Fs.z),Fs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fs.x,Fs.y).multiplyScalar(-e/Fs.z)}getViewSize(e,t){return this.getViewBounds(e,Is,Ls),t.subVectors(Ls,Is)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(li*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},zs=class extends Ps{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Bs=-90,Vs=1,Hs=class extends fa{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Rs(Bs,Vs,e,t);r.layers=this.layers,this.add(r);let i=new Rs(Bs,Vs,e,t);i.layers=this.layers,this.add(i);let a=new Rs(Bs,Vs,e,t);a.layers=this.layers,this.add(a);let o=new Rs(Bs,Vs,e,t);o.layers=this.layers,this.add(o);let s=new Rs(Bs,Vs,e,t);s.layers=this.layers,this.add(s);let c=new Rs(Bs,Vs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Us=class extends Rs{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ws=`\\[\\]\\.:\\/`,Gs=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ks=`[^\\[\\]\\.:\\/]`,qs=`[^`+Ws.replace(`\\.`,``)+`]`,Js=`((?:WC+[\\/:])*)`.replace(`WC`,Ks),Ys=`(WCOD+)?`.replace(`WCOD`,qs),Xs=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ks),Zs=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ks),Qs=RegExp(`^`+Js+Ys+Xs+Zs+`$`),$s=[`material`,`materials`,`bones`,`map`],ec=class{constructor(e,t,n){let r=n||tc.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},tc=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Gs,``)}static parseTrackName(e){let t=Qs.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);$s.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};tc.Composite=ec,tc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},tc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},tc.prototype.GetterByBindingType=[tc.prototype._getValue_direct,tc.prototype._getValue_array,tc.prototype._getValue_arrayElement,tc.prototype._getValue_toArray],tc.prototype.SetterByBindingTypeAndVersioning=[[tc.prototype._setValue_direct,tc.prototype._setValue_direct_setNeedsUpdate,tc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tc.prototype._setValue_array,tc.prototype._setValue_array_setNeedsUpdate,tc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tc.prototype._setValue_arrayElement,tc.prototype._setValue_arrayElement_setNeedsUpdate,tc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tc.prototype._setValue_fromArray,tc.prototype._setValue_fromArray_setNeedsUpdate,tc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function nc(e,t,n,r){let i=rc(r);switch(n){case Un:return e*t;case Jn:return e*t/i.components*i.byteLength;case Yn:return e*t/i.components*i.byteLength;case Xn:return e*t*2/i.components*i.byteLength;case Zn:return e*t*2/i.components*i.byteLength;case Wn:return e*t*3/i.components*i.byteLength;case Gn:return e*t*4/i.components*i.byteLength;case Qn:return e*t*4/i.components*i.byteLength;case $n:case er:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case tr:case nr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ir:case or:return Math.max(e,16)*Math.max(t,8)/4;case rr:case ar:return Math.max(e,8)*Math.max(t,8)/2;case sr:case cr:case ur:case dr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case lr:case fr:case pr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case mr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case hr:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case gr:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case _r:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case vr:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case yr:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case br:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case xr:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Sr:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Cr:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case wr:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Tr:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Er:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Dr:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Or:case kr:case Ar:return Math.ceil(e/4)*Math.ceil(t/4)*16;case jr:case Mr:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Nr:case Pr:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function rc(e){switch(e){case An:case jn:return{byteLength:1,components:1};case Nn:case Mn:case Ln:return{byteLength:2,components:1};case Rn:case zn:return{byteLength:2,components:4};case Fn:case Pn:case In:return{byteLength:4,components:1};case Vn:case Hn:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function ic(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ac(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var X={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},envMapRotation:{value:new q},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},oc={basic:{uniforms:is([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:is([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:is([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:is([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:is([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new J(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:is([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:is([Z.points,Z.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:is([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:is([Z.common,Z.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:is([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:is([Z.sprite,Z.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distance:{uniforms:is([Z.common,Z.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distance_vert,fragmentShader:X.distance_frag},shadow:{uniforms:is([Z.lights,Z.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};oc.physical={uniforms:is([oc.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var sc={r:0,b:0,g:0},cc=new zi,lc=new q;lc.set(-1,0,0,0,1,0,0,0,1);function uc(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Ro(new ts(1,1,1),new ds({name:`BackgroundCubeMaterial`,uniforms:rs(oc.backgroundCube.uniforms),vertexShader:oc.backgroundCube.vertexShader,fragmentShader:oc.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(cc.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(lc),l.material.toneMapped=Ci.getTransfer(i.colorSpace)!==Kr,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Ro(new ns(2,2),new ds({name:`BackgroundMaterial`,uniforms:rs(oc.background.uniforms),vertexShader:oc.background.vertexShader,fragmentShader:oc.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Ci.getTransfer(i.colorSpace)!==Kr,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(sc,ss(e)),n.buffers.color.setClear(sc.r,sc.g,sc.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function dc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Q(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function fc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return!(t!==1023&&r.convert(t)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function pc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Go,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var mc=4,hc=[.125,.215,.35,.446,.526,.582],gc=20,_c=256,vc=new zs,yc=new J,bc=null,xc=0,Sc=0,Cc=!1,wc=new K,Tc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=wc}=i;bc=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),Sc=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(bc,xc,Sc),this._renderer.xr.enabled=Cc,e.scissorTest=!1,Oc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bc=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),Sc=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:Ln,format:Gn,colorSpace:Wr,depthBuffer:!1},r=Dc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ec(r)),this._blurMaterial=Ac(r,e,t),this._ggxMaterial=kc(r,e,t)}return r}_compileMaterial(e){let t=new Ro(new ho,e);this._renderer.compile(t,vc)}_sceneToCubeUV(e,t,n,r,i){let a=new Rs(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(yc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ro(new ts,new Eo({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(yc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Oc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Oc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,vc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-mc?n-d+mc:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Oc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,vc),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Oc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,vc)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&U(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*gc-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):gc;m>gc&&H(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gc}`);let h=[],g=0;for(let e=0;e<gc;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Oc(t,3*v*(r>_-mc?r-_+mc:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,vc)}};function Ec(e){let t=[],n=[],r=[],i=e,a=e-mc+1+hc.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-mc?s=hc[o-e+mc-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new ho;h.setAttribute(`position`,new $a(f,3)),h.setAttribute(`uv`,new $a(p,2)),h.setAttribute(`faceIndex`,new $a(m,1)),r.push(new Ro(h,null)),i>mc&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function Dc(e,t,n){let r=new Ii(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Oc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function kc(e,t,n){return new ds({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:_c,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ac(e,t,n){let r=new Float32Array(gc),i=new K(0,1,0);return new ds({name:`SphericalGaussianBlur`,defines:{n:gc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function jc(){return new ds({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Mc(){return new ds({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Nc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Pc=class extends Ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Xo(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ts(5,5,5),i=new ds({name:`CubemapFromEquirect`,uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Ro(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Dn),new Hs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Fc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304)if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}else{let r=n.image;if(r&&r.height>0){let i=new Pc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}else return null}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Tc(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Tc(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ic(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&ii(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Lc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?to:eo)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Rc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function zc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Bc(e,t,n){let r=new WeakMap,i=new Pi;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Li(h,p,m,u);g.type=In,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new G(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Vc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Hc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Uc(e,t,n,r,i,a){let o=new Ii(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new Qo(t,n):void 0}),s=new Ii(t,n,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),c=new ho;c.setAttribute(`position`,new no([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new no([0,2,0,0,2,0],2));let l=new fs({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Ro(c,l),d=new zs(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},Ci.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=Hc[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var Wc=new Ni,Gc=new Qo(1,1),Kc=new Li,qc=new Ri,Jc=new Xo,Yc=[],Xc=[],Zc=new Float32Array(16),Qc=new Float32Array(9),$c=new Float32Array(4);function el(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Yc[i];if(a===void 0&&(a=new Float32Array(i),Yc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function tl(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function nl(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function rl(e,t){let n=Xc[t];n===void 0&&(n=new Int32Array(t),Xc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function il(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function al(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(tl(n,t))return;e.uniform2fv(this.addr,t),nl(n,t)}}function ol(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(tl(n,t))return;e.uniform3fv(this.addr,t),nl(n,t)}}function sl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(tl(n,t))return;e.uniform4fv(this.addr,t),nl(n,t)}}function cl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(tl(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),nl(n,t)}else{if(tl(n,r))return;$c.set(r),e.uniformMatrix2fv(this.addr,!1,$c),nl(n,r)}}function ll(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(tl(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),nl(n,t)}else{if(tl(n,r))return;Qc.set(r),e.uniformMatrix3fv(this.addr,!1,Qc),nl(n,r)}}function ul(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(tl(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),nl(n,t)}else{if(tl(n,r))return;Zc.set(r),e.uniformMatrix4fv(this.addr,!1,Zc),nl(n,r)}}function dl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function fl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(tl(n,t))return;e.uniform2iv(this.addr,t),nl(n,t)}}function pl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(tl(n,t))return;e.uniform3iv(this.addr,t),nl(n,t)}}function ml(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(tl(n,t))return;e.uniform4iv(this.addr,t),nl(n,t)}}function hl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function gl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(tl(n,t))return;e.uniform2uiv(this.addr,t),nl(n,t)}}function _l(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(tl(n,t))return;e.uniform3uiv(this.addr,t),nl(n,t)}}function vl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(tl(n,t))return;e.uniform4uiv(this.addr,t),nl(n,t)}}function yl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Gc.compareFunction=n.isReversedDepthBuffer()?518:515,a=Gc):a=Wc,n.setTexture2D(t||a,i)}function bl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||qc,i)}function xl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Jc,i)}function Sl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Kc,i)}function Cl(e){switch(e){case 5126:return il;case 35664:return al;case 35665:return ol;case 35666:return sl;case 35674:return cl;case 35675:return ll;case 35676:return ul;case 5124:case 35670:return dl;case 35667:case 35671:return fl;case 35668:case 35672:return pl;case 35669:case 35673:return ml;case 5125:return hl;case 36294:return gl;case 36295:return _l;case 36296:return vl;case 35678:case 36198:case 36298:case 36306:case 35682:return yl;case 35679:case 36299:case 36307:return bl;case 35680:case 36300:case 36308:case 36293:return xl;case 36289:case 36303:case 36311:case 36292:return Sl}}function wl(e,t){e.uniform1fv(this.addr,t)}function Tl(e,t){let n=el(t,this.size,2);e.uniform2fv(this.addr,n)}function El(e,t){let n=el(t,this.size,3);e.uniform3fv(this.addr,n)}function Dl(e,t){let n=el(t,this.size,4);e.uniform4fv(this.addr,n)}function Ol(e,t){let n=el(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function kl(e,t){let n=el(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Al(e,t){let n=el(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function jl(e,t){e.uniform1iv(this.addr,t)}function Ml(e,t){e.uniform2iv(this.addr,t)}function Nl(e,t){e.uniform3iv(this.addr,t)}function Pl(e,t){e.uniform4iv(this.addr,t)}function Fl(e,t){e.uniform1uiv(this.addr,t)}function Il(e,t){e.uniform2uiv(this.addr,t)}function Ll(e,t){e.uniform3uiv(this.addr,t)}function Rl(e,t){e.uniform4uiv(this.addr,t)}function zl(e,t,n){let r=this.cache,i=t.length,a=rl(n,i);tl(r,a)||(e.uniform1iv(this.addr,a),nl(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Gc:Wc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Bl(e,t,n){let r=this.cache,i=t.length,a=rl(n,i);tl(r,a)||(e.uniform1iv(this.addr,a),nl(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||qc,a[e])}function Vl(e,t,n){let r=this.cache,i=t.length,a=rl(n,i);tl(r,a)||(e.uniform1iv(this.addr,a),nl(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Jc,a[e])}function Hl(e,t,n){let r=this.cache,i=t.length,a=rl(n,i);tl(r,a)||(e.uniform1iv(this.addr,a),nl(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Kc,a[e])}function Ul(e){switch(e){case 5126:return wl;case 35664:return Tl;case 35665:return El;case 35666:return Dl;case 35674:return Ol;case 35675:return kl;case 35676:return Al;case 5124:case 35670:return jl;case 35667:case 35671:return Ml;case 35668:case 35672:return Nl;case 35669:case 35673:return Pl;case 5125:return Fl;case 36294:return Il;case 36295:return Ll;case 36296:return Rl;case 35678:case 36198:case 36298:case 36306:case 35682:return zl;case 35679:case 36299:case 36307:return Bl;case 35680:case 36300:case 36308:case 36293:return Vl;case 36289:case 36303:case 36311:case 36292:return Hl}}var Wl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cl(t.type)}},Gl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ul(t.type)}},Kl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},ql=/(\w+)(\])?(\[|\.)?/g;function Jl(e,t){e.seq.push(t),e.map[t.id]=t}function Yl(e,t,n){let r=e.name,i=r.length;for(ql.lastIndex=0;;){let a=ql.exec(r),o=ql.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Jl(n,l===void 0?new Wl(s,e,t):new Gl(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new Kl(s),Jl(n,e)),n=e}}}var Xl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Yl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Zl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ql=37297,$l=0;function eu(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var tu=new q;function nu(e){Ci._getMatrix(tu,Ci.workingColorSpace,e);let t=`mat3( ${tu.elements.map(e=>e.toFixed(4))} )`;switch(Ci.getTransfer(e)){case Gr:return[t,`LinearTransferOETF`];case Kr:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ru(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+eu(e.getShaderSource(t),r)}else return i}function iu(e,t){let n=nu(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var au={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function ou(e,t){let n=au[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var su=new K;function cu(){return Ci.getLuminanceCoefficients(su),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${su.x.toFixed(4)}, ${su.y.toFixed(4)}, ${su.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function lu(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(fu).join(`
`)}function uu(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function du(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function fu(e){return e!==``}function pu(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function mu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var hu=/^[ \t]*#include +<([\w\d./]+)>/gm;function gu(e){return e.replace(hu,vu)}var _u=new Map;function vu(e,t){let n=X[t];if(n===void 0){let e=_u.get(t);if(e!==void 0)n=X[e],H(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return gu(n)}var yu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bu(e){return e.replace(yu,xu)}function xu(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Su(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Cu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function wu(e){return Cu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Tu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Eu(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Tu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Du={302:`ENVMAP_MODE_REFRACTION`};function Ou(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Du[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var ku={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Au(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:ku[e.combine]||`ENVMAP_BLENDING_NONE`}function ju(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Mu(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=wu(n),l=Eu(n),u=Ou(n),d=Au(n),f=ju(n),p=lu(n),m=uu(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(fu).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(fu).join(`
`),_.length>0&&(_+=`
`)):(g=[Su(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(fu).join(`
`),_=[Su(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:X.tonemapping_pars_fragment,n.toneMapping===0?``:ou(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,X.colorspace_pars_fragment,iu(`linearToOutputTexel`,n.outputColorSpace),cu(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(fu).join(`
`)),o=gu(o),o=pu(o,n),o=mu(o,n),s=gu(s),s=pu(s,n),s=mu(s,n),o=bu(o),s=bu(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Zl(i,i.VERTEX_SHADER,y),S=Zl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=ru(i,x,`vertex`),n=ru(i,S,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Xl(i,h),T=du(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Ql)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=$l++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Nu=0,Pu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Fu(e),t.set(e,n)),n}},Fu=class{constructor(e){this.id=Nu++,this.code=e,this.usedTimes=0}};function Iu(e){return e===1030||e===37490||e===36285}function Lu(e,t,n,r,i,a){let o=new Xi,s=new Pu,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=oc[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,M=h.isBatchedMesh===!0,N=!!i.map,ne=!!i.matcap,re=!!x,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,ue=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=fe&&!!i.anisotropyMap,ye=pe&&!!i.clearcoatMap,be=pe&&!!i.clearcoatNormalMap,xe=pe&&!!i.clearcoatRoughnessMap,Se=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,P=ge&&!!i.sheenColorMap,we=ge&&!!i.sheenRoughnessMap,Te=!!i.specularMap,Ee=!!i.specularColorMap,F=!!i.specularIntensityMap,De=_e&&!!i.transmissionMap,I=_e&&!!i.thicknessMap,L=!!i.gradientMap,Oe=!!i.alphaMap,ke=i.alphaTest>0,Ae=!!i.alphaHash,je=!!i.extensions,Me=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Me=e.toneMapping);let Ne={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:M,batchingColor:M&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ci.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:N,matcap:ne,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&Iu(i.normalMap.format),metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:ve,clearcoat:pe,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,dispersion:me,iridescence:he,iridescenceMap:Se,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:P,sheenRoughnessMap:we,specularMap:Te,specularColorMap:Ee,specularIntensityMap:F,transmission:_e,transmissionMap:De,thicknessMap:I,gradientMap:L,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ke,alphaHash:Ae,combine:i.combine,mapUv:N&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:se&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:ue&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:P&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:we&&m(i.sheenRoughnessMap.channel),specularMapUv:Te&&m(i.specularMap.channel),specularColorMapUv:Ee&&m(i.specularColorMap.channel),specularIntensityMapUv:F&&m(i.specularIntensityMap.channel),transmissionMapUv:De&&m(i.transmissionMap.channel),thicknessMapUv:I&&m(i.thicknessMap.channel),alphaMapUv:Oe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(se||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(N||Oe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Me,decodeVideoTexture:N&&i.map.isVideoTexture===!0&&Ci.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&Ci.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:je&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(je&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=oc[t];n=cs.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Mu(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Ru(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function zu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Bu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Vu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||zu),r.length>1&&r.sort(t||Bu),i.length>1&&i.sort(t||Bu),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Hu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Vu,e.set(t,[i])):n>=r.length?(i=new Vu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Uu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new K,color:new J};break;case`SpotLight`:n={position:new K,direction:new K,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new K,halfWidth:new K,halfHeight:new K};break}return e[t.id]=n,n}}}function Wu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var Gu=0;function Ku(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function qu(e){let t=new Uu,n=Wu(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new zi,o=new zi;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(Ku);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=Gu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Ju(e){let t=new qu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Yu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Ju(e),t.set(n,[a])):r>=i.length?(a=new Ju(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Xu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Qu=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],$u=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],ed=new zi,td=new K,nd=new K;function rd(e,t,n){let r=new Yo,i=new G,a=new G,o=new Pi,s=new ps,c=new ms,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new ds({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:Xu,fragmentShader:Zu}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new ho;m.setAttribute(`position`,new $a(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Ro(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){H(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Ii(i.x,i.y,{format:Xn,type:Ln,minFilter:Dn,magFilter:Dn,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Qo(i.x,i.y,In),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Kn,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=wn,d.map.depthTexture.magFilter=wn}else l.isPointLight?(d.map=new Pc(i.x),d.map.depthTexture=new $o(i.x,Fn)):(d.map=new Ii(i.x,i.y),d.map.depthTexture=new Qo(i.x,i.y,Fn)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Kn,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Dn,d.map.depthTexture.magFilter=Dn):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=wn,d.map.depthTexture.magFilter=wn);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),td.setFromMatrixPosition(l.matrixWorld),e.position.copy(td),nd.copy(e.position),nd.add(Qu[t]),e.up.copy($u[t]),e.lookAt(nd),e.updateMatrixWorld(),n.makeTranslation(-td.x,-td.y,-td.z),ed.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(ed,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Ii(i.x,i.y,{format:Xn,type:Ln})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function id(e,t){function n(){let t=!1,n=new Pi,r=null,i=new Pi(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=oi[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,M=0,N=e.getParameter(e.VERSION);N.indexOf(`WebGL`)===-1?N.indexOf(`OpenGL ES`)!==-1&&(M=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),j=M>=2):(M=parseFloat(/^WebGL (\d)/.exec(N)[1]),j=M>=1);let ne=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new Pi().fromArray(ie),se=new Pi().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),ue(e.CULL_FACE),_e(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]===n?!1:(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h===t?!1:(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(de(e.BLEND),g=!1);return}if(g===!1&&(ue(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t);break}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(ue(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(j&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?ue(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function P(t){t===void 0&&(t=e.TEXTURE0+te-1),ne!==t&&(e.activeTexture(t),ne=t)}function we(t,n,r){r===void 0&&(r=ne===null?e.TEXTURE0+te-1:ne);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(ne!==r&&(e.activeTexture(r),ne=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Te(){let t=re[ne];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function F(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function I(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function L(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ae(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function je(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Me(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ne(t){return d[t]===void 0?e.getParameter(t):d[t]}function Pe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Fe(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Ie(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function Le(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Re(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:P,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:F,texImage2D:je,texImage3D:Me,pixelStorei:Pe,getParameter:Ne,updateUBOMapping:Le,uniformBlockBinding:Re,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:De,texSubImage3D:I,compressedTexSubImage2D:L,compressedTexSubImage3D:Oe,scissor:Fe,viewport:Ie,reset:ze}}function ad(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new G,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Qr(`canvas`)}function g(e,t,n){let r=1,i=Ee(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Gr:Ci.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function ee(e){O=e}function te(){let e=O;return e>=i.maxTextures&&H(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function j(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function M(t,i){let a=r.get(t);if(t.isVideoTexture&&we(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{de(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function N(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){de(a,t,i);return}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){de(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){fe(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ie={[xn]:e.REPEAT,[Sn]:e.CLAMP_TO_EDGE,[Cn]:e.MIRRORED_REPEAT},ae={[wn]:e.NEAREST,[Tn]:e.NEAREST_MIPMAP_NEAREST,[En]:e.NEAREST_MIPMAP_LINEAR,[Dn]:e.LINEAR,[On]:e.LINEAR_MIPMAP_NEAREST,[kn]:e.LINEAR_MIPMAP_LINEAR},oe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function se(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ie[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ie[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ie[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ae[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ae[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,oe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ce(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=j(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function le(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ue(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=le(n.start,r.width,4),c=le(t.start,r.width,4);n.start<=i+1&&a===c&&le(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function de(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ce(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Ci.getPrimaries(Ci.workingColorSpace),r=o.colorSpace===``?null:Ci.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Te(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);se(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===qn,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture)if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ue(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023)if(r!==null)if(C){if(T)if(o.layerUpdates.size>0){let t=nc(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0);else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}else if(o.isDataArrayTexture)if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T)if(o.layerUpdates.size>0){let i=nc(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w)if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Ee(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Ee(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function fe(t,o,s){if(o.image.length!==6)return;let c=ce(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Ci.getPrimaries(Ci.workingColorSpace),r=o.colorSpace===``?null:Ci.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Te(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);se(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Ee(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function pe(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ce(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function me(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;P(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);P(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function he(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),se(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else M(i.depthTexture,0);let u=l.__webglTexture,d=Ce(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ge(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer)if(a)for(let e=0;e<6;e++)he(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?he(i.__webglFramebuffer[0],t,0):he(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),me(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),me(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function _e(t,n,i){let a=r.get(t);n!==void 0&&pe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ge(t)}function ve(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&P(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ce(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),me(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),se(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)pe(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),se(c,a),pe(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),se(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else pe(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&ge(t)}function ye(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let be=[],xe=[];function Se(t){if(t.samples>0){if(P(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(be.length=0,xe.length=0,be.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(be.push(l),xe.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,xe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,be))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ce(e){return Math.min(i.maxSamples,e.samples)}function P(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function we(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Te(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Ci.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ee(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=te,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=ee,this.setTexture2D=M,this.setTexture2DArray=N,this.setTexture3D=ne,this.setTextureCube=re,this.rebindTextures=_e,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=P,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function od(e,t){function n(n,r=``){let i,a=Ci.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var sd=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cd=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ld=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new es(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ds({vertexShader:sd,fragmentShader:cd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ro(new ns(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ud=class extends si{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new ld,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new G,C=null,w=new Rs;w.viewport=new Pi;let T=new Rs;T.viewport=new Pi;let E=[w,T],D=new Us,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new ha,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new ha,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new ha,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,te);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,oe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,te),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?qn:Kn,a=_.stencil?Bn:Fn);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Ii(d.textureWidth,d.textureHeight,{format:Gn,type:An,depthTexture:new Qo(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ii(f.framebufferWidth,f.framebufferHeight,{format:Gn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),oe.setContext(r),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let j=new K,M=new K;function N(e,t,n){j.setFromMatrixPosition(t.matrixWorld),M.setFromMatrixPosition(n.matrixWorld);let r=j.distanceTo(M),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ne(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;ne(D,i);for(let e=0;e<a.length;e++)ne(a[e],i);a.length===2?N(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),re(e,D,i)};function re(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ui*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new Rs,o.layers.enable(n),o.viewport=new Pi,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new es,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let oe=new ic;oe.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},dd=new zi,fd=new q;fd.set(-1,0,0,0,1,0,0,0,1);function pd(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ss(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(dd.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(fd),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function md(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return U(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:ArrayBuffer.isView(i)?r[a]=i.slice():r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var hd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),gd=null;function _d(){return gd===null&&(gd=new Vo(hd,16,16,Xn,Ln),gd.name=`DFG_LUT`,gd.minFilter=Dn,gd.magFilter=Dn,gd.wrapS=Sn,gd.wrapT=Sn,gd.generateMipmaps=!1,gd.needsUpdate=!0),gd}var vd=class{constructor(e={}){let{canvas:t=$r(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=An}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Qn,Zn,Yn]),g=new Set([An,Fn,Nn,Bn,Rn,zn]),_=new Uint32Array(4),v=new Int32Array(4),y=new K,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Ur;let ee=0,te=0,j=null,M=-1,N=null,ne=new Pi,re=new Pi,ie=null,ae=new J(0),oe=0,se=t.width,ce=t.height,le=1,ue=null,de=null,fe=new Pi(0,0,se,ce),pe=new Pi(0,0,se,ce),me=!1,he=new Yo,ge=!1,_e=!1,ve=new zi,ye=new K,be=new Pi,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Ce(){return j===null?le:1}let P=n;function we(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,qe,!1),t.addEventListener(`webglcontextrestored`,Je,!1),t.addEventListener(`webglcontextcreationerror`,Ye,!1),P===null){let t=`webgl2`;if(P=we(t,e),P===null)throw we(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw U(`WebGLRenderer: `+e.message),e}let Te,Ee,F,De,I,L,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We;function Ge(){Te=new Ic(P),Te.init(),He=new od(P,Te),Ee=new fc(P,Te,e,He),F=new id(P,Te),Ee.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),O=P.createFramebuffer(),k=P.createFramebuffer(),A=P.createFramebuffer(),De=new zc(P),I=new Ru,L=new ad(P,Te,F,I,Ee,He,De),Oe=new Fc(T),ke=new ac(P),Ue=new dc(P,ke),Ae=new Lc(P,ke,De,Ue),je=new Vc(P,Ae,ke,Ue,De),ze=new Bc(P,Ee,L),Ie=new pc(I),Me=new Lu(T,Oe,Te,Ee,Ue,Ie),Ne=new pd(T,I),Pe=new Hu,Fe=new Yu(Te),Re=new uc(T,Oe,F,je,p,s),Le=new rd(T,je,Ee),We=new md(P,De,Ee,F),Be=new Q(P,Te,De),Ve=new Rc(P,Te,De),De.programs=Me.programs,T.capabilities=Ee,T.extensions=Te,T.properties=I,T.renderLists=Pe,T.shadowMap=Le,T.state=F,T.info=De}Ge(),m!==1009&&(w=new Uc(m,t.width,t.height,o,r,i));let Ke=new ud(T,P);this.xr=Ke,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(e){e!==void 0&&(le=e,this.setSize(se,ce,!1))},this.getSize=function(e){return e.set(se,ce)},this.setSize=function(e,n,r=!0){if(Ke.isPresenting){H(`WebGLRenderer: Can't change size while VR device is presenting.`);return}se=e,ce=n,t.width=Math.floor(e*le),t.height=Math.floor(n*le),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(se*le,ce*le).floor()},this.setDrawingBufferSize=function(e,n,r){se=e,ce=n,le=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(ne)},this.getViewport=function(e){return e.copy(fe)},this.setViewport=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),F.viewport(ne.copy(fe).multiplyScalar(le).round())},this.getScissor=function(e){return e.copy(pe)},this.setScissor=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),F.scissor(re.copy(pe).multiplyScalar(le).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(e){F.setScissorTest(me=e)},this.setOpaqueSort=function(e){ue=e},this.setTransparentSort=function(e){de=e},this.getClearColor=function(e){return e.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(j!==null){let t=j.texture.format;e=h.has(t)}if(e){let e=j.texture.type,t=g.has(e),n=Re.getClearColor(),r=Re.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,P.clearBufferiv(P.COLOR,0,v))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,qe,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),Re.dispose(),Pe.dispose(),Fe.dispose(),I.dispose(),Oe.dispose(),je.dispose(),Ue.dispose(),We.dispose(),Me.dispose(),Ke.dispose(),Ke.removeEventListener(`sessionstart`,nt),Ke.removeEventListener(`sessionend`,rt),it.stop()};function qe(e){e.preventDefault(),ni(`WebGLRenderer: Context Lost.`),E=!0}function Je(){ni(`WebGLRenderer: Context Restored.`),E=!1;let e=De.autoReset,t=Le.enabled,n=Le.autoUpdate,r=Le.needsUpdate,i=Le.type;Ge(),De.autoReset=e,Le.enabled=t,Le.autoUpdate=n,Le.needsUpdate=r,Le.type=i}function Ye(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Xe(e){let t=e.target;t.removeEventListener(`dispose`,Xe),Ze(t)}function Ze(e){Qe(e),I.remove(e)}function Qe(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){Me.releaseProgram(e)}),e.isShaderMaterial&&Me.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=xe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=pt(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ae.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ue.setup(i,r,s,n,c);let h,g=Be;if(c!==null&&(h=ke.get(c),g=Ve,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Ce()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Ce()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh)if(Te.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ke.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function $e(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,lt(e,t,n),e.side=0,e.needsUpdate=!0,lt(e,t,n),e.side=2):lt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=Fe.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];$e(a,n,e),r.add(a)}else $e(t,n,e),r.add(t)}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){I.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Te.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let et=null;function tt(e){et&&et(e)}function nt(){it.stop()}function rt(){it.start()}let it=new ic;it.setAnimationLoop(tt),typeof self<`u`&&it.setContext(self),this.setAnimationLoop=function(e){et=e,Ke.setAnimationLoop(e),e===null?it.stop():it.start()},Ke.addEventListener(`sessionstart`,nt),Ke.addEventListener(`sessionend`,rt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ke.enabled===!0&&Ke.isPresenting===!0,r=w!==null&&(j===null||n)&&w.begin(T,j);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ke.enabled===!0&&Ke.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ke.cameraAutoUpdate===!0&&Ke.updateCamera(t),t=Ke.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,j),x=Fe.get(e,C.length),x.init(t),x.state.textureUnits=L.getTextureUnits(),C.push(x),ve.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),he.setFromProjectionMatrix(ve,Yr,t.reversedDepth),_e=this.localClippingEnabled,ge=Ie.init(this.clippingPlanes,_e),b=Pe.get(e,S.length),b.init(),S.push(b),Ke.enabled===!0&&Ke.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&at(e,t,-1/0,T.sortObjects)}at(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(ue,de,t.reversedDepth),Se=Ke.enabled===!1||Ke.isPresenting===!1||Ke.hasDepthSensing()===!1,Se&&Re.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ge===!0&&Ie.beginShadows();let i=x.state.shadowsArray;if(Le.render(i,e,t),ge===!0&&Ie.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];R(n,r,e,a)}Se&&Re.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ot(b,e,n,n.viewport)}}else r.length>0&&R(n,r,e,t),Se&&Re.render(e),ot(b,e,t)}j!==null&&te===0&&(L.updateMultisampleRenderTarget(j),L.updateRenderTargetMipmap(j)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ue.resetDefaultState(),M=-1,N=null,C.pop(),C.length>0?(x=C[C.length-1],L.setTextureUnits(x.state.textureUnits),ge===!0&&Ie.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function at(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||he.intersectsSprite(e)){r&&be.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ve);let t=je.update(e),i=e.material;i.visible&&b.push(e,t,i,n,be.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||he.intersectsObject(e))){let t=je.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),be.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),be.copy(e.boundingSphere.center)),be.applyMatrix4(e.matrixWorld).applyMatrix4(ve)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,be.z,o)}}else i.visible&&b.push(e,t,i,n,be.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)at(i[e],t,n,r)}function ot(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ge===!0&&Ie.setGlobalState(T.clippingPlanes,n),r&&F.viewport(ne.copy(r)),i.length>0&&st(i,t,n),a.length>0&&st(a,t,n),o.length>0&&st(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function R(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Te.has(`EXT_color_buffer_half_float`)||Te.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Ii(1,1,{generateMipmaps:!0,type:e?Ln:An,minFilter:kn,samples:Math.max(4,Ee.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ci.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ne;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ae),oe=T.getClearAlpha(),oe<1&&T.setClearColor(16777215,.5),T.clear(),Se&&Re.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ge===!0&&Ie.setGlobalState(T.clippingPlanes,r),st(e,n,r),L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a),Te.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ct(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ae,oe),d!==void 0&&(r.viewport=d),T.toneMapping=u}function st(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ct(o,t,n,s,l,c)}}function ct(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function lt(e,t,n){t.isScene!==!0&&(t=xe);let r=I.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Me.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Me.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Oe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Xe),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return dt(e,s),d}else s.uniforms=Me.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Me.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ie.uniform),dt(e,s),r.needsLights=ht(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function ut(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Xl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function dt(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ft(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function pt(e,t,n,r,i){t.isScene!==!0&&(t=xe),L.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=j===null?T.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ci.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Oe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=x.state.lights;if(ge===!0&&(_e===!0||e!==N)){let t=e===N&&r.id===M;Ie.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ie.numPlanes||v.numIntersection!==Ie.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=lt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(F.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==M&&(M=r.id,w=!0),v.needsLights){let e=ft(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||N!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(P,`projectionMatrix`,e.projectionMatrix),O.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(P,ye.setFromMatrixPosition(e.matrixWorld)),Ee.logarithmicDepthBuffer&&O.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),N!==e&&(N=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,L),y.state.spotShadowMap.length>0&&O.setValue(P,`spotShadowMap`,y.state.spotShadowMap,L),y.state.pointShadowMap.length>0&&O.setValue(P,`pointShadowMap`,y.state.pointShadowMap,L)),i.isSkinnedMesh){O.setOptional(P,i,`bindMatrix`),O.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(P,`boneTexture`,e.boneTexture,L))}i.isBatchedMesh&&(O.setOptional(P,i,`batchingTexture`),O.setValue(P,`batchingTexture`,i._matricesTexture,L),O.setOptional(P,i,`batchingIdTexture`),O.setValue(P,`batchingIdTexture`,i._indirectTexture,L),O.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(P,`batchingColorTexture`,i._colorsTexture,L));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&ze.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=_d()),w){if(O.setValue(P,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&mt(k,E),a&&r.fog===!0&&Ne.refreshFogUniforms(k,a),Ne.refreshMaterialUniforms(k,r,le,ce,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}Xl.upload(P,ut(v),k,L)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Xl.upload(P,ut(v),k,L),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(P,`center`,i.center),O.setValue(P,`modelViewMatrix`,i.modelViewMatrix),O.setValue(P,`normalMatrix`,i.normalMatrix),O.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];We.update(n,S),We.bind(n,S)}}return S}function mt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ht(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){j=e,ee=t,te=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),ne.copy(e.viewport),re.copy(e.scissor),ie=e.scissorTest,F.viewport(ne),F.scissor(re),F.setScissorTest(ie),M=-1;return}else if(o.__webglFramebuffer===void 0)L.setupRenderTarget(e);else if(o.__hasExternalTextures)L.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);L.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&L.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ne.copy(e.viewport),re.copy(e.scissor),ie=e.scissorTest}else ne.copy(fe).multiplyScalar(le).floor(),re.copy(pe).multiplyScalar(le).floor(),ie=me;if(n!==0&&(r=O),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(ne),F.scissor(re),F.setScissorTest(ie),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}M=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s),!Ee.textureFormatReadable(c)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Ee.textureTypeReadable(l)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,He.convert(c),He.convert(l),a)}finally{let e=j===null?null:I.get(j).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s),!Ee.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Ee.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,d),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,He.convert(l),He.convert(u),0);let f=j===null?null:I.get(j).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,f);let p=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await ai(P,p,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,d),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.deleteBuffer(d),P.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;L.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=He.convert(t.format),_=He.convert(t.type),v;t.isData3DTexture?(L.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(L.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(L.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,k),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&L.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?L.setTextureCube(e,0):e.isData3DTexture?L.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?L.setTexture2DArray(e,0):L.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){ee=0,te=0,j=null,F.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Yr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ci._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ci._getUnpackColorSpace()}},yd=`/assets/clean-C_hfpnyC.png`,bd=`/assets/tattooed-CsEy6wj5.png`,xd=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Sd=`
  uniform sampler2D uPrevTrails;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform vec2 uResolution;
  uniform float uDecay;
  uniform bool uIsMoving;

  varying vec2 vUv;

  void main() {
    vec4 prev = texture2D(uPrevTrails, vUv);
    float newValue = prev.r * uDecay; // 0.97 decay

    if (uIsMoving) {
      vec2 dir = uMouse - uPrevMouse;
      float len = length(dir);
      if (len > 0.001) {
        vec2 d = dir / len;
        vec2 toPx = vUv - uPrevMouse;
        float proj = clamp(dot(toPx, d), 0.0, len);
        vec2 closest = uPrevMouse + proj * d;
        float dist = length(vUv - closest);

        float lineWidth = 0.09;
        float intensity = smoothstep(lineWidth, 0.0, dist) * 0.3;
        newValue += intensity;
      }
    }

    gl_FragColor = vec4(newValue, 0.0, 0.0, 1.0);
  }
`,Cd=`
  uniform sampler2D uFluid;
  uniform sampler2D uTopTexture;
  uniform sampler2D uBottomTexture;
  uniform vec2 uResolution;
  uniform vec2 uTopTextureSize;
  uniform vec2 uBottomTextureSize;
  uniform float uDpr;

  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 ts) {
    if (ts.x < 1.0 || ts.y < 1.0) return uv;
    vec2 s = uResolution / ts;
    float scale = max(s.x, s.y);
    vec2 scaled = ts * scale;
    vec2 offset = (uResolution - scaled) * 0.5;
    return (uv * uResolution - offset) / scaled;
  }

  void main() {
    float fluid = texture2D(uFluid, vUv).r;

    vec2 topUV = getCoverUV(vUv, uTopTextureSize);
    vec2 bottomUV = getCoverUV(vUv, uBottomTextureSize);

    vec4 topColor = texture2D(uTopTexture, topUV);
    vec4 bottomColor = texture2D(uBottomTexture, bottomUV);

    float threshold = 0.02;
    float edgeWidth = 0.004 / uDpr;
    float t = smoothstep(threshold, threshold + edgeWidth, fluid);

    // Soft gray trail-visibility overlay (top image only).
    // Halo peaks just before the reveal threshold and fades out as
    // t -> 1 so the bottom image still appears clean inside the trail.
    float halo = smoothstep(0.0, threshold * 2.0, fluid) * (1.0 - t);
    vec3 trailGray = vec3(0.12);
    vec3 tintedTop = mix(topColor.rgb, trailGray, halo * 0.35);

    vec4 finalColor = mix(vec4(tintedTop, topColor.a), bottomColor, t);
    gl_FragColor = finalColor;
  }
`,wd={simSize:500,decay:.97,lineWidth:.09,perFrameIntensity:.3,revealThreshold:.02,edgeWidthBase:.004,haloUpperMul:2,haloMixStrength:.35,haloGray:[.12,.12,.12],idleThresholdMs:2500,idleEaseInMs:1500,autoLerp:.05,stopAfterMs:50,maxTextureSize:4096};function Td(){let e=(0,g.useRef)(null),t=(0,g.useRef)(null);return(0,g.useEffect)(()=>{let n=e.current,r=t.current,i=new vd({canvas:r,antialias:!0,precision:`highp`});i.setSize(n.clientWidth,n.clientHeight,!1),i.setPixelRatio(Math.min(window.devicePixelRatio||1,2));let a=new ba,o=new ba,s=new zs(-1,1,1,-1,0,1),c={minFilter:Dn,magFilter:Dn,format:Gn,type:In},l=[new Ii(wd.simSize,wd.simSize,c),new Ii(wd.simSize,wd.simSize,c)];l.forEach(e=>{i.setRenderTarget(e),i.clear()}),i.setRenderTarget(null);let u=0,d=new G(.5,.5),f=new G(.5,.5),p=!1,m=0,h=new G(.5,.5),g=new G(.5,.5);function _(e){let t=document.createElement(`canvas`);t.width=t.height=2;let n=t.getContext(`2d`);n.fillStyle=e,n.fillRect(0,0,2,2);let r=new Zo(t);return r.minFilter=Dn,r.magFilter=Dn,r.generateMipmaps=!1,r}let v=_(`#0000ff`),y=_(`#ff0000`),b=new G(0,0),x=new G(0,0),S=i.getPixelRatio(),C=new G(n.clientWidth*S,n.clientHeight*S),w=new ds({vertexShader:xd,fragmentShader:Sd,uniforms:{uPrevTrails:{value:l[u].texture},uMouse:{value:d.clone()},uPrevMouse:{value:f.clone()},uResolution:{value:C.clone()},uDecay:{value:wd.decay},uIsMoving:{value:!1}}}),T=new ds({vertexShader:xd,fragmentShader:Cd,uniforms:{uFluid:{value:l[u].texture},uTopTexture:{value:v},uBottomTexture:{value:y},uResolution:{value:C.clone()},uTopTextureSize:{value:b},uBottomTextureSize:{value:x},uDpr:{value:S}}}),E=new ns(2,2),D=new Ro(E,w),O=new Ro(E,T);o.add(D),a.add(O);function k(e,t,n){let r=new Image;r.crossOrigin=`Anonymous`,r.onload=()=>{let{naturalWidth:i,naturalHeight:a}=r,o=i,s=a;if(Math.max(i,a)>wd.maxTextureSize){let e=wd.maxTextureSize/Math.max(i,a);o=Math.round(i*e),s=Math.round(a*e)}let c=document.createElement(`canvas`);c.width=o,c.height=s,c.getContext(`2d`).drawImage(r,0,0,o,s);let l=new Zo(c);l.minFilter=Dn,l.magFilter=Dn,l.generateMipmaps=!1,l.needsUpdate=!0,t.set(o,s),n(l),console.info(`[hero] loaded ${e} as ${o}×${s}`)},r.onerror=t=>{console.warn(`[hero] failed to load ${e}`,t)},r.src=e}k(yd,b,e=>{T.uniforms.uTopTexture.value=e}),k(bd,x,e=>{T.uniforms.uBottomTexture.value=e});function A(){return r.getBoundingClientRect()}function ee(e,t){let n=A(),r=(e-n.left)/n.width,i=1-(t-n.top)/n.height;f.copy(d),d.set(r,i),p=!0,m=performance.now()}function te(e,t){let n=A();return e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom}function j(e){te(e.clientX,e.clientY)?ee(e.clientX,e.clientY):p=!1}function M(e){if(e.touches.length===0)return;let t=e.touches[0];te(t.clientX,t.clientY)?(e.preventDefault(),ee(t.clientX,t.clientY)):p=!1}window.addEventListener(`mousemove`,j,{passive:!0}),window.addEventListener(`touchmove`,M,{passive:!1});function N(){let e=n.clientWidth,t=n.clientHeight;if(e===0||t===0)return;let r=Math.min(window.devicePixelRatio||1,2);i.setPixelRatio(r),i.setSize(e,t,!1),T.uniforms.uResolution.value.set(e*r,t*r),T.uniforms.uDpr.value=r,w.uniforms.uResolution.value.set(e*r,t*r)}let ne=new ResizeObserver(()=>N());ne.observe(n),window.addEventListener(`resize`,N),N();let re=0;function ie(){re=requestAnimationFrame(ie);let e=performance.now();p&&e-m>wd.stopAfterMs&&(p=!1);let t=e-m,n=t>wd.idleThresholdMs,r=l[u];u=(u+1)%2;let c=l[u];if(w.uniforms.uPrevTrails.value=r.texture,n){let n=Math.min(1,(t-wd.idleThresholdMs)/wd.idleEaseInMs),r=e*.001,i=.5+.3*Math.sin(r*.41)+.12*Math.sin(r*.93+1.3),a=.5+.28*Math.cos(r*.37+.5)+.1*Math.cos(r*1.11+2.7);g.copy(h),h.x+=(i-h.x)*wd.autoLerp*n,h.y+=(a-h.y)*wd.autoLerp*n,w.uniforms.uMouse.value.copy(h),w.uniforms.uPrevMouse.value.copy(g),w.uniforms.uIsMoving.value=!0,d.copy(h),f.copy(g)}else w.uniforms.uMouse.value.copy(d),w.uniforms.uPrevMouse.value.copy(f),w.uniforms.uIsMoving.value=p,h.copy(d),g.copy(d);i.setRenderTarget(c),i.render(o,s),T.uniforms.uFluid.value=c.texture,i.setRenderTarget(null),i.render(a,s)}return ie(),()=>{cancelAnimationFrame(re),window.removeEventListener(`mousemove`,j),window.removeEventListener(`touchmove`,M),window.removeEventListener(`resize`,N),ne.disconnect(),l.forEach(e=>e.dispose()),E.dispose(),w.dispose(),T.dispose(),v.dispose(),y.dispose(),i.dispose()}},[]),(0,B.jsx)(`div`,{ref:e,style:{position:`absolute`,inset:0,overflow:`hidden`,background:`#F1F1F1`},children:(0,B.jsx)(`canvas`,{ref:t,style:{position:`absolute`,inset:0,width:`100%`,height:`100%`,display:`block`,cursor:`crosshair`}})})}function Ed({num:e,eyebrow:t,title:n,italic:r,description:i,tone:a=`light`,align:o=`left`}){let s=a===`dark`?`var(--night-muted)`:`var(--muted)`;return(0,B.jsxs)(`header`,{className:`reveal`,style:{textAlign:o,color:a===`dark`?`var(--night-text)`:`var(--ink)`},children:[(0,B.jsxs)(`div`,{className:`row center between`,style:{borderBottom:`1px solid ${a===`dark`?`var(--night-hairline)`:`var(--hairline)`}`,paddingBottom:14,marginBottom:28},children:[(0,B.jsxs)(`span`,{className:`mono`,style:{color:s},children:[e,` · `,t??n]}),(0,B.jsx)(`span`,{className:`mono`,style:{color:s},children:`TattooGo · index`})]}),(0,B.jsxs)(`h2`,{className:`display display-lg`,style:{margin:0},children:[n,r&&(0,B.jsxs)(B.Fragment,{children:[` `,(0,B.jsx)(`span`,{className:`italic`,style:{color:`var(--accent)`},children:r})]})]}),i&&(0,B.jsx)(`p`,{style:{maxWidth:620,marginTop:22,color:s,fontSize:16,lineHeight:1.55},children:i})]})}var Dd={"sw-1":{background:`linear-gradient(160deg, #2A2520 0%, #1B1816 60%, #B0382A 130%)`},"sw-2":{background:`linear-gradient(170deg, #DDD4C5 0%, #B5A78A 100%)`},"sw-3":{background:`linear-gradient(150deg, #15120F 0%, #3C2A23 100%)`},"sw-4":{background:`linear-gradient(140deg, #B0382A 0%, #6A1E18 80%)`},"sw-5":{background:`linear-gradient(180deg, #EFEAE3 0%, #A29485 110%)`},"sw-6":{background:`linear-gradient(200deg, #2A2520 0%, #8E8579 100%)`}};function Od({id:e,ratio:t=1,label:n,dark:r}){return(0,B.jsxs)(`div`,{className:`ph`,style:{...Dd[e]??Dd[`sw-1`],aspectRatio:t.toString(),position:`relative`},children:[(0,B.jsx)(kd,{dark:r}),n&&(0,B.jsx)(`span`,{className:`mono`,style:{position:`absolute`,left:12,bottom:12,color:`var(--paper)`,mixBlendMode:`screen`,fontSize:10,letterSpacing:`0.2em`},children:n})]})}function kd({dark:e}){let t=e?`rgba(239,234,227,0.18)`:`rgba(239,234,227,0.35)`;return(0,B.jsxs)(`svg`,{viewBox:`0 0 200 200`,preserveAspectRatio:`none`,style:{position:`absolute`,inset:0,width:`100%`,height:`100%`,mixBlendMode:`screen`},children:[(0,B.jsx)(`defs`,{children:(0,B.jsx)(`pattern`,{id:`lines`,width:`6`,height:`6`,patternUnits:`userSpaceOnUse`,patternTransform:`rotate(38)`,children:(0,B.jsx)(`line`,{x1:`0`,y1:`0`,x2:`0`,y2:`6`,stroke:t,strokeWidth:`0.6`})})}),(0,B.jsx)(`rect`,{width:`200`,height:`200`,fill:`url(#lines)`}),(0,B.jsx)(`path`,{d:`M -20 140 Q 60 60 100 100 T 220 80`,stroke:t,strokeWidth:`1.2`,fill:`none`}),(0,B.jsx)(`path`,{d:`M -10 80 Q 40 140 110 120 T 220 160`,stroke:t,strokeWidth:`0.6`,fill:`none`}),(0,B.jsx)(`circle`,{cx:`150`,cy:`55`,r:`22`,stroke:t,strokeWidth:`1`,fill:`none`})]})}function Ad({name:e,size:t=40}){let n=e.split(/\s+/).slice(0,2).map(e=>e[0]?.toUpperCase()).join(``),r=(e.charCodeAt(0)+e.length)%6+1;return(0,B.jsx)(`span`,{"aria-hidden":!0,style:{width:t,height:t,borderRadius:999,overflow:`hidden`,display:`inline-grid`,placeItems:`center`,fontFamily:`var(--font-mono)`,fontSize:t*.32,letterSpacing:`0.06em`,color:`var(--paper)`,flexShrink:0,...Dd[`sw-${r}`]},children:n})}function jd({design:e}){return(0,B.jsxs)(`article`,{className:`card`,style:{display:`flex`,flexDirection:`column`},children:[(0,B.jsx)(Od,{id:e.swatch,ratio:e.imageRatio,label:`#${e.id}`,dark:!0}),(0,B.jsxs)(`div`,{className:`card-pad col gap-2`,style:{flex:1},children:[(0,B.jsxs)(`div`,{className:`row between center`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e.style}),(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[`♡ `,e.likes]})]}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:22,margin:0},children:e.title}),(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[`by `,e.artistName,e.city?` · ${e.city}`:``]}),e.price&&(0,B.jsxs)(`span`,{className:`mono text-accent`,children:[`₺`,e.price.toLocaleString()]})]})]})}function Md({artist:e,dark:t,large:n}){return(0,B.jsxs)(z,{to:`/artists`,className:`card`,style:{display:`grid`,gridTemplateColumns:n?`1.1fr 1fr`:`1fr`,background:`transparent`,borderColor:t?`var(--night-hairline)`:`var(--hairline)`,color:t?`var(--night-text)`:`var(--ink)`},children:[(0,B.jsx)(Od,{id:`sw-${e.portfolio.length%6+1}`,ratio:n?.95:1.1,dark:t}),(0,B.jsxs)(`div`,{className:`card-pad col gap-3`,style:{borderLeft:n?`1px solid ${t?`var(--night-hairline)`:`var(--hairline)`}`:`0`},children:[(0,B.jsxs)(`div`,{className:`row between center`,children:[(0,B.jsx)(`span`,{className:`mono`,style:{color:t?`var(--night-muted)`:`var(--muted)`},children:e.city}),e.verified&&(0,B.jsx)(`span`,{className:`tag tag-accent`,children:`Verified`})]}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:n?32:24,margin:0},children:e.name}),(0,B.jsx)(`span`,{className:`mono`,style:{color:t?`var(--night-muted)`:`var(--muted)`},children:e.handle}),(0,B.jsx)(`p`,{style:{margin:0,color:t?`var(--night-muted)`:`var(--muted)`},children:e.bio}),(0,B.jsx)(`div`,{className:`row wrap gap-2`,style:{marginTop:`auto`},children:e.styles.map(e=>(0,B.jsx)(`span`,{className:`tag`,style:{borderColor:t?`var(--night-hairline)`:void 0,color:t?`var(--night-text)`:void 0},children:e},e))}),(0,B.jsxs)(`div`,{className:`row between center`,style:{marginTop:8},children:[(0,B.jsxs)(`span`,{className:`mono`,style:{color:t?`var(--night-text)`:`var(--ink)`},children:[`★ `,e.rating,` `,(0,B.jsxs)(`span`,{style:{color:t?`var(--night-muted)`:`var(--muted)`},children:[`· `,e.reviewCount]})]}),e.minPrice&&(0,B.jsxs)(`span`,{className:`mono text-accent`,children:[`from ₺`,e.minPrice.toLocaleString()]})]})]})]})}function Nd({studio:e}){return(0,B.jsxs)(`article`,{className:`card col`,children:[(0,B.jsx)(Od,{id:`sw-${e.cover===`cover-1`?3:6}`,ratio:1.4,dark:!0}),(0,B.jsxs)(`div`,{className:`card-pad col gap-2`,children:[(0,B.jsxs)(`div`,{className:`row between center`,children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e.city,` · est. `,e.established]}),e.verified&&(0,B.jsx)(`span`,{className:`tag tag-accent`,children:`Verified`})]}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:26,margin:0},children:e.name}),(0,B.jsx)(`p`,{className:`text-muted`,style:{margin:0},children:e.bio}),(0,B.jsxs)(`div`,{className:`row between center`,style:{marginTop:12},children:[(0,B.jsxs)(`span`,{className:`mono`,children:[`★ `,e.rating,` `,(0,B.jsxs)(`span`,{className:`text-muted`,children:[`· `,e.reviewCount]})]}),(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e.artistIds.length,` resident artists`]})]})]})]})}function Pd({request:e,dark:t}){let{lang:n}=V();return(0,B.jsxs)(`article`,{className:`card card-pad col gap-3`,style:{borderColor:t?`var(--night-hairline)`:`var(--hairline)`,color:t?`var(--night-text)`:`var(--ink)`},children:[(0,B.jsxs)(`div`,{className:`row between center`,children:[(0,B.jsxs)(`span`,{className:`mono`,style:{color:t?`var(--night-muted)`:`var(--muted)`},children:[`#`,e.id.toUpperCase(),` · `,e.style]}),(0,B.jsx)(`span`,{className:`status`,style:{color:`var(--accent)`},children:{open:{en:`Open`,tr:`Açık`},reviewing:{en:`Reviewing`,tr:`İnceleniyor`},booked:{en:`Booked`,tr:`Randevulu`},completed:{en:`Completed`,tr:`Tamamlandı`},cancelled:{en:`Cancelled`,tr:`İptal`}}[e.status][n]})]}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:24,margin:0},children:e.title}),(0,B.jsx)(`p`,{style:{margin:0,color:t?`var(--night-muted)`:`var(--muted)`},children:e.description}),(0,B.jsxs)(`div`,{className:`row wrap gap-2`,children:[(0,B.jsx)(`span`,{className:`tag tag-soft`,children:e.placement}),(0,B.jsx)(`span`,{className:`tag tag-soft`,children:e.size.toUpperCase()}),(0,B.jsx)(`span`,{className:`tag tag-soft`,children:e.color}),(0,B.jsx)(`span`,{className:`tag tag-soft`,children:e.city})]}),(0,B.jsxs)(`div`,{className:`row between center`,style:{marginTop:6},children:[(0,B.jsxs)(`span`,{className:`mono`,style:{color:t?`var(--night-muted)`:`var(--muted)`},children:[n===`tr`?`Bütçe`:`Budget`,` · ₺`,e.budgetMin.toLocaleString(),`–₺`,e.budgetMax.toLocaleString()]}),(0,B.jsxs)(`span`,{className:`mono`,children:[e.offerCount,` `,n===`tr`?`teklif`:`offers`]})]})]})}function Fd({offer:e,accentOnAccepted:t=!0}){let{lang:n}=V(),r=t&&e.status===`accepted`;return(0,B.jsxs)(`article`,{className:`card card-pad col gap-3`,style:{borderColor:r?`var(--ink)`:`var(--hairline)`,background:r?`rgba(0,0,0,0.04)`:`transparent`},children:[(0,B.jsxs)(`div`,{className:`row between center`,children:[(0,B.jsxs)(`div`,{className:`row center gap-3`,children:[(0,B.jsx)(Ad,{name:e.artistName}),(0,B.jsxs)(`div`,{className:`col`,children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e.artistCity,` · ★ `,e.rating,` (`,e.reviewCount,`)`]}),(0,B.jsx)(`strong`,{style:{fontFamily:`var(--font-display)`,fontSize:20},children:e.artistName})]})]}),(0,B.jsx)(`span`,{className:`status status-${e.status}`,children:e.status})]}),(0,B.jsx)(`p`,{style:{margin:0},children:e.message}),(0,B.jsxs)(`div`,{className:`row wrap gap-4`,children:[(0,B.jsx)(Id,{label:n===`tr`?`Fiyat`:`Price`,value:`₺${e.price.toLocaleString()}`,accent:!0}),(0,B.jsx)(Id,{label:n===`tr`?`Süre`:`Duration`,value:`${e.estimatedHours} h`}),(0,B.jsx)(Id,{label:n===`tr`?`Randevu`:`Appointment`,value:e.appointmentAt}),(0,B.jsx)(Id,{label:n===`tr`?`Geçerli`:`Valid until`,value:e.validUntil})]}),(0,B.jsxs)(`div`,{className:`row between center`,style:{marginTop:6},children:[(0,B.jsxs)(`div`,{className:`row gap-2`,children:[(0,B.jsx)(`button`,{className:`btn btn-sm`,children:`Message`}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-ghost`,children:`Save`})]}),(0,B.jsxs)(`div`,{className:`row gap-2`,children:[(0,B.jsx)(`button`,{className:`btn btn-sm btn-ghost`,children:`Reject`}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-accent`,children:`Accept`})]})]})]})}function Id({label:e,value:t,accent:n}){return(0,B.jsxs)(`div`,{className:`col`,style:{minWidth:100},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e}),(0,B.jsx)(`span`,{className:`mono`,style:{fontSize:13,color:n?`var(--accent)`:`var(--ink)`,letterSpacing:`0.06em`},children:t})]})}function Ld({label:e,value:t,delta:n}){return(0,B.jsxs)(`div`,{className:`card card-pad col gap-2`,style:{minHeight:140},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e}),(0,B.jsx)(`span`,{className:`display`,style:{fontSize:44,margin:0,lineHeight:1},children:t}),n&&(0,B.jsx)(`span`,{className:`mono text-accent`,children:n})]})}function Rd({n:e}){return(0,B.jsxs)(`div`,{className:`row gap-4`,style:{padding:`14px 0`,borderBottom:`1px solid var(--hairline)`},children:[(0,B.jsx)(`span`,{className:`mono`,style:{width:70,color:`var(--muted)`},children:e.time}),(0,B.jsx)(`span`,{style:{width:8,height:8,borderRadius:999,background:e.read?`var(--hairline-strong)`:`var(--accent)`,marginTop:8,flexShrink:0}}),(0,B.jsxs)(`div`,{className:`col`,style:{flex:1},children:[(0,B.jsx)(`strong`,{style:{fontSize:15},children:e.title}),(0,B.jsx)(`span`,{className:`text-muted`,style:{fontSize:14},children:e.body})]}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:e.type})]})}function zd({c:e,active:t}){return(0,B.jsxs)(`div`,{className:`row gap-3 center`,style:{padding:`14px 16px`,borderBottom:`1px solid var(--hairline)`,background:t?`var(--paper-warm)`:`transparent`,cursor:`pointer`},children:[(0,B.jsx)(Ad,{name:e.with,size:36}),(0,B.jsxs)(`div`,{className:`col`,style:{flex:1,minWidth:0},children:[(0,B.jsxs)(`div`,{className:`row between`,children:[(0,B.jsx)(`strong`,{children:e.with}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:e.lastTime})]}),(0,B.jsx)(`span`,{className:`text-muted`,style:{fontSize:13,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`},children:e.lastText})]}),e.unread>0&&(0,B.jsx)(`span`,{className:`tag tag-accent`,style:{padding:`2px 8px`},children:e.unread})]})}function Bd({ap:e}){let{lang:t}=V();return(0,B.jsxs)(`article`,{className:`card card-pad col gap-2`,children:[(0,B.jsxs)(`div`,{className:`row between`,children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e.date,` · `,e.time,` · `,e.durationMin,`m`]}),(0,B.jsx)(`span`,{className:`status status-${e.status===`today`?`sent`:e.status===`completed`?`completed`:`viewed`}`,children:e.status})]}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:22,margin:0},children:e.requestTitle}),(0,B.jsxs)(`span`,{className:`text-muted`,children:[t===`tr`?`Sanatçı`:`Artist`,`: `,e.artistName]}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:e.location})]})}function Vd({c:e}){return(0,B.jsxs)(`article`,{className:`card col`,children:[(0,B.jsx)(Od,{id:e.swatch,ratio:1.4,dark:!0}),(0,B.jsxs)(`div`,{className:`card-pad col gap-2`,children:[(0,B.jsxs)(`div`,{className:`row between center`,children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e.startDate,` → `,e.endDate]}),(0,B.jsx)(`span`,{className:`status ${e.active?`status-accepted`:`status-expired`}`,children:e.active?`active`:`passive`})]}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:26,margin:0},children:e.title}),(0,B.jsx)(`p`,{className:`text-muted`,style:{margin:0},children:e.description}),(0,B.jsxs)(`div`,{className:`row between center`,style:{marginTop:8},children:[(0,B.jsxs)(`span`,{className:`mono text-accent`,children:[`-`,e.discount,`%`]}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-ghost`,children:`Edit`})]})]})]})}function Hd({r:e}){return(0,B.jsxs)(`article`,{className:`card card-pad col gap-2`,children:[(0,B.jsxs)(`div`,{className:`row between center`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e.date}),(0,B.jsxs)(`span`,{className:`mono`,children:[`★`.repeat(e.rating),(0,B.jsx)(`span`,{className:`text-muted`,children:`★`.repeat(5-e.rating)})]})]}),(0,B.jsxs)(`p`,{style:{margin:0,fontFamily:`var(--font-display)`,fontSize:20,fontStyle:`italic`,lineHeight:1.35},children:[`“`,e.text,`”`]}),(0,B.jsxs)(`div`,{className:`row between center`,style:{marginTop:6},children:[(0,B.jsx)(`span`,{children:e.authorName}),(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e.artistName,` · `,e.tattooTitle]})]})]})}function Ud({name:e,role:t,city:n,rating:r,followers:i}){return(0,B.jsxs)(`div`,{className:`card card-pad row center gap-4`,children:[(0,B.jsx)(Ad,{name:e,size:64}),(0,B.jsxs)(`div`,{className:`col`,style:{flex:1},children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[t,` · `,n]}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:26,margin:0},children:e}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:6},children:[r&&(0,B.jsxs)(`span`,{className:`mono`,children:[`★ `,r]}),i&&(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[i.toLocaleString(),` followers`]})]})]}),(0,B.jsx)(`button`,{className:`btn btn-sm`,children:`Edit`})]})}function Wd({m:e}){return(0,B.jsxs)(`div`,{className:`row center gap-4`,style:{padding:`16px 0`,borderBottom:`1px solid var(--hairline)`},children:[(0,B.jsx)(Ad,{name:e.name,size:48}),(0,B.jsxs)(`div`,{className:`col`,style:{flex:1},children:[(0,B.jsx)(`strong`,{children:e.name}),(0,B.jsxs)(`span`,{className:`text-muted`,children:[e.role,` · joined `,e.joinedAt]}),(0,B.jsx)(`div`,{className:`row gap-2`,style:{marginTop:6},children:e.styles.map(e=>(0,B.jsx)(`span`,{className:`tag tag-soft`,children:e},e))})]}),(0,B.jsxs)(`span`,{className:`mono`,children:[`★ `,e.rating]}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-ghost`,children:`Edit`})]})}function Gd({m:e}){return(0,B.jsxs)(`article`,{className:`card card-pad col gap-2`,children:[(0,B.jsx)(Od,{id:`sw-${e.id.length%6+1}`,ratio:1.4}),(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e.brand,` · `,e.category]}),(0,B.jsx)(`h4`,{style:{margin:0,fontFamily:`var(--font-display)`,fontSize:18},children:e.name}),(0,B.jsxs)(`div`,{className:`row between center`,style:{marginTop:8},children:[(0,B.jsxs)(`span`,{className:`mono`,children:[`₺`,e.price.toLocaleString()]}),(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e.stock,` in stock`]})]}),(0,B.jsx)(`button`,{className:`btn btn-sm`,style:{marginTop:6},children:`Add to order`})]})}var Kd=[{key:`fine-line`,en:`Fine line`,tr:`İnce çizgi`},{key:`realism`,en:`Realism`,tr:`Realizm`},{key:`minimal`,en:`Minimal`,tr:`Minimal`},{key:`traditional`,en:`Traditional`,tr:`Geleneksel`},{key:`blackwork`,en:`Blackwork`,tr:`Blackwork`},{key:`geometric`,en:`Geometric`,tr:`Geometrik`},{key:`lettering`,en:`Lettering`,tr:`Yazı`},{key:`color`,en:`Color`,tr:`Renkli`}],qd=[`Istanbul`,`Ankara`,`Izmir`,`Antalya`,`Bursa`,`Eskişehir`,`Berlin`,`Amsterdam`,`Lisbon`],Jd=[{id:`a1`,role:`artist`,name:`Aslı Vardar`,handle:`@asli.ink`,bio:`Fine line botanical and quiet figurative.`,verified:!0,rating:4.9,reviewCount:184,followers:12400,styles:[`fine-line`,`minimal`],minPrice:1800,city:`Istanbul`,portfolio:[`p1`,`p2`,`p3`,`p4`],yearsActive:7,email:`asli@example.com`,joined:`2021-04-12`},{id:`a2`,role:`artist`,name:`Kerem Atıl`,handle:`@kerematil`,bio:`Heavy blackwork and ornamental sleeves.`,verified:!0,rating:4.8,reviewCount:96,followers:8900,styles:[`blackwork`,`geometric`],minPrice:2400,city:`Izmir`,portfolio:[`p5`,`p6`,`p7`,`p8`],yearsActive:9,email:`kerem@example.com`,joined:`2020-02-01`},{id:`a3`,role:`artist`,name:`Maya Hoekstra`,handle:`@maya.h`,bio:`Single-needle micro realism, faces and hands.`,verified:!0,rating:5,reviewCount:212,followers:21800,styles:[`realism`,`fine-line`],minPrice:3200,city:`Amsterdam`,portfolio:[`p9`,`p10`,`p11`,`p12`],yearsActive:11,email:`maya@example.com`,joined:`2019-08-15`},{id:`a4`,role:`artist`,name:`Defne Selvi`,handle:`@defne.s`,bio:`Soft minimalism, single sessions.`,verified:!1,rating:4.7,reviewCount:51,followers:2400,styles:[`minimal`,`lettering`],minPrice:1200,city:`Ankara`,portfolio:[`p13`,`p14`,`p15`,`p16`],yearsActive:4,email:`defne@example.com`,joined:`2022-11-04`},{id:`a5`,role:`artist`,name:`Joaquim Reis`,handle:`@reis.tattoo`,bio:`Traditional Americana with painterly color.`,verified:!0,rating:4.8,reviewCount:138,followers:14200,styles:[`traditional`,`color`],minPrice:2200,city:`Lisbon`,portfolio:[`p17`,`p18`,`p19`,`p20`],yearsActive:12,email:`reis@example.com`,joined:`2018-06-30`},{id:`a6`,role:`artist`,name:`Su Karaca`,handle:`@su.karaca`,bio:`Editorial lettering and quiet brushwork.`,verified:!0,rating:4.9,reviewCount:73,followers:6700,styles:[`lettering`,`minimal`],minPrice:1500,city:`Istanbul`,portfolio:[`p21`,`p22`,`p23`,`p24`],yearsActive:5,email:`su@example.com`,joined:`2021-09-22`}],Yd=[{id:`s1`,role:`studio`,name:`Karanfil Atölye`,handle:`@karanfil`,bio:`Multi-artist studio in Karaköy. By appointment only.`,verified:!0,rating:4.9,reviewCount:412,city:`Istanbul`,artistIds:[`a1`,`a6`],cover:`cover-1`,established:2018,email:`studio@karanfil.example`,joined:`2019-01-01`},{id:`s2`,role:`studio`,name:`Northbound Ink`,handle:`@northbound`,bio:`Blackwork-forward collective near Vondelpark.`,verified:!0,rating:4.8,reviewCount:287,city:`Amsterdam`,artistIds:[`a3`],cover:`cover-2`,established:2016,email:`studio@northbound.example`,joined:`2018-05-20`}],Xd=[1,1.25,.85,1.1,.95,1.3,.8,1,1.2,.9,1.15,1.05],Zd=Array.from({length:18}).map((e,t)=>{let n=Jd[t%Jd.length],r=n.styles[0],i=[`Quiet Bloom`,`Ornament Line`,`Half Sleeve Study`,`Folded Hand`,`Phoenix Note`,`Pillar of Salt`,`Iris`,`Compass Glyph`,`Single Needle Portrait`,`Lettering No.4`,`Wave & Sun`,`Snake in Garden`];return{id:`d${t+1}`,title:i[t%i.length],artistId:n.id,artistName:n.name,style:r,tags:[r,n.styles[1]??`minimal`,`custom`],city:n.city,price:n.minPrice?n.minPrice+t*150:void 0,likes:240+t*17,views:1800+t*213,imageRatio:Xd[t%Xd.length],swatch:`sw-${t%6+1}`,createdAt:`2026-0${t%6+1}-1${t%9+1}`}}),Qd=[{id:`r1`,customerId:`c1`,customerName:`Naz Y.`,title:`Fine line wildflower along forearm`,description:`Looking for a delicate single-needle floral piece, around 12cm on the inner forearm. No color, soft shading.`,style:`fine-line`,placement:`forearm`,size:`md`,color:`black`,references:3,city:`Istanbul`,budgetMin:2500,budgetMax:4e3,preferredDate:`2026-07-18`,status:`reviewing`,offerCount:4,createdAt:`2026-06-20`},{id:`r2`,customerId:`c1`,customerName:`Naz Y.`,title:`Ornamental blackwork shoulder cap`,description:`Geometric ornament cap on the shoulder, blending into upper arm. Open to artist interpretation.`,style:`blackwork`,placement:`shoulder`,size:`lg`,color:`black`,references:5,city:`Istanbul`,budgetMin:5e3,budgetMax:8e3,preferredDate:`2026-08-02`,status:`open`,offerCount:2,createdAt:`2026-06-22`},{id:`r3`,customerId:`c2`,customerName:`Emir K.`,title:`Single line script — “mevsim”`,description:`Small single-line typography on inner bicep. About 8cm wide.`,style:`lettering`,placement:`arm`,size:`sm`,color:`black`,references:2,city:`Ankara`,budgetMin:800,budgetMax:1500,preferredDate:`2026-07-05`,status:`booked`,offerCount:6,createdAt:`2026-06-10`},{id:`r4`,customerId:`c3`,customerName:`Lea S.`,title:`Realism portrait of late grandfather`,description:`Approximately A5 sized realism portrait, sepia tones, inner upper arm. Studio with private room preferred.`,style:`realism`,placement:`arm`,size:`lg`,color:`shaded`,references:6,city:`Amsterdam`,budgetMin:9e3,budgetMax:14e3,preferredDate:`2026-09-10`,status:`reviewing`,offerCount:3,createdAt:`2026-06-15`},{id:`r5`,customerId:`c2`,customerName:`Emir K.`,title:`Minimal geometric ankle band`,description:`Thin geometric line work as an ankle band, ~2cm tall.`,style:`geometric`,placement:`ankle`,size:`sm`,color:`black`,references:2,city:`Ankara`,budgetMin:600,budgetMax:1200,status:`completed`,offerCount:5,createdAt:`2026-05-29`}],$d=[{id:`o1`,requestId:`r1`,artistId:`a1`,artistName:`Aslı Vardar`,artistCity:`Istanbul`,price:3200,estimatedHours:3,appointmentAt:`2026-07-22 14:00`,message:`Happy to design something quiet — I can prepare two directions ahead of the session.`,validUntil:`2026-07-10`,status:`sent`,rating:4.9,reviewCount:184,verified:!0},{id:`o2`,requestId:`r1`,artistId:`a6`,artistName:`Su Karaca`,artistCity:`Istanbul`,price:2800,estimatedHours:2.5,appointmentAt:`2026-07-19 11:00`,message:`I love the brief. I would lean toward a single-needle approach for delicacy.`,validUntil:`2026-07-08`,status:`viewed`,rating:4.9,reviewCount:73,verified:!0},{id:`o3`,requestId:`r1`,artistId:`a4`,artistName:`Defne Selvi`,artistCity:`Ankara`,price:2400,estimatedHours:3,appointmentAt:`2026-07-25 16:00`,message:`Could travel to Istanbul for this. Available the last week of July.`,validUntil:`2026-07-05`,status:`sent`,rating:4.7,reviewCount:51,verified:!1},{id:`o4`,requestId:`r1`,artistId:`a3`,artistName:`Maya Hoekstra`,artistCity:`Amsterdam`,price:4200,estimatedHours:4,appointmentAt:`2026-08-12 13:00`,message:`I could host you at the studio in Amsterdam — we can co-design the layout in our consult.`,validUntil:`2026-07-20`,status:`accepted`,rating:5,reviewCount:212,verified:!0},{id:`o5`,requestId:`r2`,artistId:`a2`,artistName:`Kerem Atıl`,artistCity:`Izmir`,price:6800,estimatedHours:6,appointmentAt:`2026-08-15 11:00`,message:`Ornament work is my home. Happy to sketch three options.`,validUntil:`2026-07-30`,status:`sent`,rating:4.8,reviewCount:96,verified:!0}],ef=[{id:`ap1`,customerName:`Naz Y.`,artistName:`Maya Hoekstra`,date:`2026-08-12`,time:`13:00`,durationMin:240,location:`Northbound Ink, Amsterdam`,status:`upcoming`,requestTitle:`Fine line wildflower along forearm`},{id:`ap2`,customerName:`Emir K.`,artistName:`Su Karaca`,date:`2026-07-05`,time:`11:00`,durationMin:90,location:`Karanfil Atölye, Istanbul`,status:`upcoming`,requestTitle:`Single line script`},{id:`ap3`,customerName:`Lea S.`,artistName:`Aslı Vardar`,date:`2026-06-26`,time:`15:30`,durationMin:120,location:`Karanfil Atölye, Istanbul`,status:`today`,requestTitle:`Botanical wrist piece`},{id:`ap4`,customerName:`Yiğit Ö.`,artistName:`Kerem Atıl`,date:`2026-05-12`,time:`10:00`,durationMin:360,location:`Atıl Studio, Izmir`,status:`completed`,requestTitle:`Ornamental forearm`}],tf=[{id:`rv1`,authorName:`Naz Y.`,rating:5,text:`Maya was incredibly patient with the design rounds. The final piece sits like jewelry.`,date:`2026-06-18`,artistName:`Maya Hoekstra`,tattooTitle:`Single needle iris`},{id:`rv2`,authorName:`Emir K.`,rating:5,text:`Asli took my rough sketch and turned it into something I will live with happily.`,date:`2026-06-04`,artistName:`Aslı Vardar`,tattooTitle:`Quiet bloom`},{id:`rv3`,authorName:`Lea S.`,rating:4,text:`Studio was spotless. Communication was excellent throughout.`,date:`2026-05-21`,artistName:`Kerem Atıl`,tattooTitle:`Ornamental sleeve`},{id:`rv4`,authorName:`Yiğit Ö.`,rating:5,text:`Long session, never rushed. Will be back for the matching piece.`,date:`2026-05-12`,artistName:`Kerem Atıl`,tattooTitle:`Geometric forearm`}],nf=[{id:`cv1`,with:`Maya Hoekstra`,role:`artist`,lastText:`Sent two sketch directions — let me know which one feels closer.`,lastTime:`2h`,unread:2},{id:`cv2`,with:`Aslı Vardar`,role:`artist`,lastText:`Confirming Saturday 14:00. Bring something to eat.`,lastTime:`5h`,unread:0},{id:`cv3`,with:`Karanfil Atölye`,role:`studio`,lastText:`Front desk: parking is around the corner on Necatibey.`,lastTime:`1d`,unread:0},{id:`cv4`,with:`TattooGo Support`,role:`support`,lastText:`Your verification is approved. Welcome.`,lastTime:`3d`,unread:0}],rf=[{id:`m1`,conversationId:`cv1`,fromMe:!1,authorName:`Maya Hoekstra`,text:`Hey Naz — I had two ideas overnight. Sending sketches now.`,time:`09:14`},{id:`m2`,conversationId:`cv1`,fromMe:!0,authorName:`You`,text:`Thank you. Excited to see them.`,time:`09:21`},{id:`m3`,conversationId:`cv1`,fromMe:!1,authorName:`Maya Hoekstra`,text:`Sent two sketch directions — let me know which one feels closer.`,time:`09:34`},{id:`m4`,conversationId:`cv1`,fromMe:!0,authorName:`You`,text:`Second one. Can we lengthen the stem slightly?`,time:`10:02`}],af=[{id:`n1`,type:`offer`,title:`New offer from Maya Hoekstra`,body:`€4200 · Single needle iris`,time:`12m`,read:!1},{id:`n2`,type:`message`,title:`Aslı Vardar replied`,body:`Confirming Saturday at 14:00.`,time:`38m`,read:!1},{id:`n3`,type:`accepted`,title:`Your offer was accepted`,body:`Customer Naz Y. accepted your offer.`,time:`2h`,read:!0},{id:`n4`,type:`appointment`,title:`New appointment booked`,body:`Aug 12 · 13:00 · Northbound Ink`,time:`4h`,read:!0},{id:`n5`,type:`review`,title:`You received a 5★ review`,body:`“Quiet, precise, lovely energy.”`,time:`1d`,read:!0},{id:`n6`,type:`follower`,title:`124 new followers this week`,body:`Your studio page is trending.`,time:`2d`,read:!0},{id:`n7`,type:`campaign`,title:`Studio campaign goes live`,body:`Summer flash — 20% off until Aug 31.`,time:`3d`,read:!0},{id:`n8`,type:`system`,title:`TattooGo updated terms`,body:`Read the summary in your dashboard.`,time:`5d`,read:!0}],of=[{id:`cp1`,title:`Summer flash sheet`,description:`Pre-drawn small pieces, walk-in friendly. While slots last.`,discount:20,startDate:`2026-07-01`,endDate:`2026-08-31`,active:!0,swatch:`sw-1`},{id:`cp2`,title:`Returning client`,description:`15% off second piece booked within 90 days of first.`,discount:15,startDate:`2026-06-01`,endDate:`2026-12-31`,active:!0,swatch:`sw-3`},{id:`cp3`,title:`Winter calligraphy week`,description:`A focused week of lettering bookings with Su.`,discount:10,startDate:`2025-11-10`,endDate:`2025-11-17`,active:!1,swatch:`sw-4`}],sf=[{id:`am1`,name:`Aslı Vardar`,role:`Resident artist`,styles:[`fine-line`,`minimal`],rating:4.9,joinedAt:`2021-04-12`},{id:`am2`,name:`Su Karaca`,role:`Lettering specialist`,styles:[`lettering`,`minimal`],rating:4.9,joinedAt:`2022-01-08`},{id:`am3`,name:`Hakan Yel`,role:`Apprentice`,styles:[`blackwork`],rating:4.6,joinedAt:`2025-09-01`}],cf=[{id:`mp1`,name:`Solid Ink — Lining Black`,brand:`Solid Ink`,price:320,stock:14,category:`ink`},{id:`mp2`,name:`Cheyenne Hawk Pen`,brand:`Cheyenne`,price:8200,stock:2,category:`machine`},{id:`mp3`,name:`Round Liner 7RL — box of 20`,brand:`Kwadron`,price:720,stock:36,category:`needle`},{id:`mp4`,name:`Aftercare balm — 30ml`,brand:`Hustle Butter`,price:240,stock:48,category:`aftercare`},{id:`mp5`,name:`Barrier film roll`,brand:`Saniderm`,price:540,stock:12,category:`hygiene`}],lf={about:`01`,how:`02`,styles:`03`,artists:`04`,requests:`05`,trust:`06`,cta:`07`};function uf(){(0,g.useEffect)(()=>{let e=document.querySelectorAll(`.reveal:not(.in)`);if(!(`IntersectionObserver`in window)){e.forEach(e=>e.classList.add(`in`));return}let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`in`),t.unobserve(e.target))})},{threshold:.12,rootMargin:`0px 0px -10% 0px`});return e.forEach(e=>t.observe(e)),()=>t.disconnect()})}function df(){let{t:e,lang:t}=V();return uf(),(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(gn,{}),(0,B.jsxs)(`section`,{style:{position:`relative`,height:`100vh`,minHeight:560,overflow:`hidden`,background:`#F1F1F1`},className:`hero`,children:[(0,B.jsx)(Td,{}),(0,B.jsx)(`div`,{className:`container`,style:{position:`absolute`,top:96,left:0,right:0,zIndex:2,pointerEvents:`none`},children:(0,B.jsxs)(`div`,{className:`row between center`,children:[(0,B.jsx)(`span`,{className:`mono`,style:{color:`var(--ink)`},children:`TG · 2026 · Edition №1`}),(0,B.jsxs)(`span`,{className:`mono row center`,style:{color:`var(--ink)`},children:[(0,B.jsx)(`span`,{style:{display:`inline-block`,width:8,height:8,borderRadius:999,background:`var(--ink)`,marginRight:8}}),t===`tr`?`İmleci hareket ettir`:`Move cursor · reveal ink`]})]})}),(0,B.jsx)(`div`,{style:{position:`absolute`,left:18,top:`50%`,transform:`translateY(-50%) rotate(-90deg)`,transformOrigin:`left center`,zIndex:2,pointerEvents:`none`},children:(0,B.jsx)(`span`,{className:`mono`,style:{color:`var(--ink)`},children:`—— surface · identity · ink`})}),(0,B.jsx)(`div`,{style:{position:`absolute`,right:18,top:`50%`,transform:`translateY(-50%) rotate(90deg)`,transformOrigin:`right center`,zIndex:2,pointerEvents:`none`},children:(0,B.jsx)(`span`,{className:`mono`,style:{color:`var(--ink)`},children:`TR / EN · 01 · cover`})}),(0,B.jsx)(`div`,{className:`container`,style:{position:`absolute`,left:0,right:0,bottom:0,zIndex:3,paddingBottom:36,paddingTop:28,pointerEvents:`none`},children:(0,B.jsxs)(`div`,{className:`row between`,style:{gap:40,alignItems:`flex-end`,flexWrap:`wrap`},children:[(0,B.jsxs)(`div`,{className:`col`,style:{flex:`1 1 380px`,pointerEvents:`auto`},children:[(0,B.jsxs)(`h1`,{className:`display`,style:{fontSize:`clamp(56px, 10vw, 156px)`,margin:0,color:`var(--ink)`,letterSpacing:`-0.04em`,lineHeight:.86},children:[`Tattoo`,(0,B.jsx)(`span`,{className:`italic`,children:`Go`})]}),(0,B.jsxs)(`h2`,{className:`display display-md`,style:{margin:`14px 0 0`,color:`var(--ink)`,maxWidth:540},children:[t===`tr`?`Niyetle`:`Ink,`,` `,(0,B.jsx)(`span`,{className:`italic`,children:t===`tr`?`açığa çıkmış mürekkep.`:`revealed with intention.`})]})]}),(0,B.jsxs)(`div`,{className:`col`,style:{flex:`0 1 440px`,gap:18,pointerEvents:`auto`},children:[(0,B.jsx)(`p`,{style:{color:`var(--muted)`,margin:0,fontSize:15,maxWidth:400},children:e(`brand.intro`)}),(0,B.jsxs)(`div`,{className:`row gap-3 wrap`,children:[(0,B.jsxs)(z,{to:`/dashboard/create-request`,className:`btn btn-primary`,children:[e(`cta.createRequest`),(0,B.jsx)(`span`,{className:`dot`})]}),(0,B.jsx)(z,{to:`/register`,className:`btn`,children:e(`cta.joinAsArtist`)})]}),(0,B.jsxs)(`div`,{className:`row gap-3 wrap`,style:{marginTop:2},children:[(0,B.jsx)(ff,{label:e(`badge.verified`)}),(0,B.jsx)(ff,{label:e(`badge.custom`)}),(0,B.jsx)(ff,{label:e(`badge.booking`)})]})]})]})})]}),(0,B.jsx)(bn,{items:[`TattooGo`,t===`tr`?`Özel dövme teklifleri`:`Custom tattoo offers`,t===`tr`?`Onaylı sanatçılar`:`Verified artists`,t===`tr`?`Stüdyo randevuları`:`Studio appointments`,`Istanbul · Amsterdam · Lisbon`,`TR / EN`]}),(0,B.jsx)(`section`,{className:`section`,children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsx)(Ed,{num:lf.about,eyebrow:t===`tr`?`Hakkında`:`About`,title:t===`tr`?`Seçilmiş`:`A curated`,italic:t===`tr`?`bir dövme pazarı.`:`tattoo marketplace.`,description:e(`section.about.body`)}),(0,B.jsxs)(`div`,{className:`split reveal`,style:{marginTop:60},children:[(0,B.jsx)(`p`,{className:`display display-md`,style:{margin:0,maxWidth:520},children:t===`tr`?`TattooGo, dövmeyi bir karar olarak ele alır — ortaya çıkmak için doğru ele ihtiyacı olan bir karar.`:`TattooGo treats a tattoo as a decision — one that deserves the right hand to bring it to life.`}),(0,B.jsxs)(`div`,{className:`col gap-4`,children:[(0,B.jsx)(pf,{label:t===`tr`?`Onaylı sanatçı`:`Verified artists`,value:`412`}),(0,B.jsx)(pf,{label:t===`tr`?`Tamamlanan randevu`:`Bookings completed`,value:`2,184`}),(0,B.jsx)(pf,{label:t===`tr`?`Sözleşmeye dayalı teklif`:`Contracted offers`,value:`9,206`}),(0,B.jsx)(pf,{label:t===`tr`?`Ortalama yanıt süresi`:`Median first reply`,value:`38 min`})]})]})]})}),(0,B.jsx)(`section`,{className:`section`,style:{background:`var(--paper-warm)`},children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsx)(Ed,{num:lf.how,eyebrow:t===`tr`?`Süreç`:`Process`,title:e(`section.how`)}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`,gap:32,marginTop:40},children:[[`01`,e(`how.01.title`),e(`how.01.body`)],[`02`,e(`how.02.title`),e(`how.02.body`)],[`03`,e(`how.03.title`),e(`how.03.body`)],[`04`,e(`how.04.title`),e(`how.04.body`)]].map(([e,t,n],r)=>(0,B.jsxs)(`div`,{className:`reveal col gap-3`,style:{"--delay":`${r*80}ms`,borderTop:`1px solid var(--hairline-strong)`,paddingTop:18},children:[(0,B.jsx)(`span`,{className:`display`,style:{fontSize:56,lineHeight:.9,color:`var(--accent)`},children:e}),(0,B.jsx)(`h3`,{style:{margin:0,fontFamily:`var(--font-display)`,fontSize:22},children:t}),(0,B.jsx)(`p`,{className:`text-muted`,style:{margin:0},children:n})]},e))})]})}),(0,B.jsx)(`section`,{className:`section`,children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsx)(Ed,{num:lf.styles,eyebrow:t===`tr`?`Stiller`:`Styles`,title:t===`tr`?`İncelenmiş`:`Considered`,italic:t===`tr`?`dövme stilleri.`:`tattoo styles.`,description:t===`tr`?`TattooGo, sanatçıları stillerine göre kategorize eder — böylece daha hızlı doğru kişiye ulaşırsınız.`:`TattooGo categorises artists by style — so the right hand reaches you sooner.`}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`,gap:1,marginTop:40,border:`1px solid var(--hairline)`},children:Kd.map((e,n)=>(0,B.jsxs)(z,{to:`/designs`,className:`reveal col`,style:{"--delay":`${n*60}ms`,borderRight:`1px solid var(--hairline)`,borderBottom:`1px solid var(--hairline)`,padding:24,background:`var(--paper)`},children:[(0,B.jsx)(Od,{id:`sw-${n%6+1}`,ratio:1.2,dark:!0}),(0,B.jsxs)(`div`,{className:`row between center`,style:{marginTop:14},children:[(0,B.jsx)(`span`,{className:`display`,style:{fontSize:26},children:e[t]}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:String(n+1).padStart(2,`0`)})]})]},e.key))})]})}),(0,B.jsx)(`section`,{className:`section`,style:{background:`var(--paper-warm)`},children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsx)(Ed,{num:lf.artists,eyebrow:t===`tr`?`Seçki`:`Selection`,title:t===`tr`?`Bu hafta`:`This week,`,italic:t===`tr`?`seçili sanatçılar.`:`selected hands.`,description:t===`tr`?`Yorumları, portföyleri ve aktif tekliflerine göre öne çıkan sanatçılar.`:`Artists drawn forward by their reviews, portfolios, and active offers.`}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:24,marginTop:40},children:Jd.slice(0,6).map((e,t)=>(0,B.jsx)(`div`,{className:`reveal`,style:{"--delay":`${t*60}ms`},children:(0,B.jsx)(Md,{artist:e,large:t===0})},e.id))}),(0,B.jsx)(`div`,{className:`row`,style:{justifyContent:`flex-end`,marginTop:24},children:(0,B.jsxs)(z,{to:`/artists`,className:`mono`,children:[e(`common.viewAll`),` →`]})})]})}),(0,B.jsx)(`section`,{className:`section`,children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsx)(Ed,{num:lf.requests,eyebrow:t===`tr`?`Müşteriler`:`Customers`,title:t===`tr`?`Güncel`:`Recent`,italic:t===`tr`?`dövme istekleri.`:`customer briefs.`,description:t===`tr`?`Sanatçılar bu açık brief’lere bu hafta teklif veriyor.`:`Artists are sending offers on these open briefs this week.`}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:24,marginTop:40},children:Qd.slice(0,4).map((e,t)=>(0,B.jsx)(`div`,{className:`reveal`,style:{"--delay":`${t*60}ms`},children:(0,B.jsx)(Pd,{request:e})},e.id))})]})}),(0,B.jsx)(`section`,{className:`section`,style:{background:`var(--paper-warm)`},children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsx)(Ed,{num:lf.trust,eyebrow:t===`tr`?`Güven`:`Trust`,title:e(`section.trust`)}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(240px, 1fr))`,gap:24,marginTop:40},children:[[e(`trust.verified.title`),e(`trust.verified.body`)],[e(`trust.reviews.title`),e(`trust.reviews.body`)],[e(`trust.booking.title`),e(`trust.booking.body`)],[e(`trust.hygiene.title`),e(`trust.hygiene.body`)]].map(([e,t],n)=>(0,B.jsxs)(`div`,{className:`reveal card card-pad col gap-3`,style:{"--delay":`${n*60}ms`},children:[(0,B.jsxs)(`span`,{className:`mono text-accent`,children:[`0`,n+1]}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:22,margin:0},children:e}),(0,B.jsx)(`p`,{className:`text-muted`,style:{margin:0},children:t})]},e))})]})}),(0,B.jsx)(`section`,{className:`section`,children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsx)(Ed,{num:`6.5`,eyebrow:t===`tr`?`Galeri`:`Gallery`,title:t===`tr`?`Yeni`:`Newly`,italic:t===`tr`?`eklenen tasarımlar.`:`added designs.`}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`,gap:24,marginTop:40},children:Zd.slice(0,8).map((e,t)=>(0,B.jsx)(`div`,{className:`reveal`,style:{"--delay":`${t*50}ms`},children:(0,B.jsx)(jd,{design:e})},e.id))})]})}),(0,B.jsx)(`section`,{className:`section dark`,children:(0,B.jsxs)(`div`,{className:`container split center`,children:[(0,B.jsxs)(`div`,{className:`reveal`,children:[(0,B.jsxs)(`span`,{className:`mono`,style:{color:`var(--night-muted)`},children:[lf.cta,` · `,e(`section.cta`)]}),(0,B.jsxs)(`h2`,{className:`display display-lg`,style:{marginTop:16,color:`var(--night-text)`},children:[t===`tr`?`Brief’inizi yazın.`:`Write your brief.`,(0,B.jsx)(`br`,{}),(0,B.jsx)(`span`,{className:`italic`,style:{color:`var(--accent-soft)`},children:t===`tr`?`Doğru el size yazsın.`:`Let the right hand reply.`})]})]}),(0,B.jsxs)(`div`,{className:`reveal col gap-4`,children:[(0,B.jsx)(`p`,{className:`text-muted`,style:{color:`var(--night-muted)`,maxWidth:460,margin:0},children:t===`tr`?`Müşteriyseniz brief’inizi paylaşın. Sanatçıysanız sıraya girin — verified artist olmaya 12 saat içinde başvurabilirsiniz.`:`If you are a customer, share your brief. If you are an artist, apply to become verified in under 12 hours.`}),(0,B.jsxs)(`div`,{className:`row gap-3`,children:[(0,B.jsx)(z,{to:`/dashboard/create-request`,className:`btn btn-accent`,children:e(`cta.createRequest`)}),(0,B.jsx)(z,{to:`/register`,className:`btn`,children:e(`cta.joinAsArtist`)})]})]})]})}),(0,B.jsx)(yn,{})]})}function ff({label:e}){return(0,B.jsxs)(`span`,{className:`row center gap-2 mono`,style:{padding:`6px 12px`,border:`1px solid var(--hairline-strong)`,borderRadius:999,color:`var(--ink)`},children:[(0,B.jsx)(`span`,{style:{width:6,height:6,borderRadius:999,background:`var(--ink)`}}),e]})}function pf({label:e,value:t}){return(0,B.jsxs)(`div`,{className:`row between`,style:{borderBottom:`1px solid var(--hairline)`,paddingBlock:12},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e}),(0,B.jsx)(`span`,{className:`display`,style:{fontSize:30,lineHeight:1},children:t})]})}function $({label:e,hint:t,children:n}){return(0,B.jsxs)(`div`,{className:`field`,style:{marginBlock:12},children:[(0,B.jsx)(`label`,{children:e}),n,t&&(0,B.jsx)(`span`,{className:`mono text-muted`,style:{marginTop:2},children:t})]})}function mf(e){return(0,B.jsx)(`input`,{className:`input`,...e})}function hf(e){return(0,B.jsx)(`textarea`,{className:`textarea`,...e})}function gf(e){let{options:t,...n}=e;return(0,B.jsx)(`select`,{className:`select`,...n,children:t.map(e=>(0,B.jsx)(`option`,{value:e.value,children:e.label},e.value))})}function _f({options:e,value:t,onChange:n}){return(0,B.jsx)(`div`,{className:`row wrap gap-2`,style:{marginTop:6},children:e.map(e=>(0,B.jsx)(`button`,{type:`button`,className:`tag`,onClick:()=>n(e.value),style:{background:t===e.value?`var(--ink)`:`transparent`,color:t===e.value?`var(--paper)`:`var(--ink)`,borderColor:t===e.value?`var(--ink)`:`var(--hairline-strong)`,padding:`8px 12px`},children:e.label},e.value))})}function vf({label:e}){let[t,n]=(0,g.useState)([]);return(0,B.jsxs)(`div`,{className:`col gap-3`,children:[(0,B.jsx)(`label`,{className:`mono text-muted`,style:{fontSize:10},children:e??`Upload image`}),(0,B.jsxs)(`div`,{style:{border:`1px dashed var(--hairline-strong)`,padding:`32px 20px`,background:`var(--paper-warm)`,textAlign:`center`},children:[(0,B.jsx)(`div`,{className:`mono text-muted`,style:{marginBottom:12},children:`Drag images or`}),(0,B.jsxs)(`label`,{className:`btn btn-sm`,style:{cursor:`pointer`},children:[(0,B.jsx)(`input`,{type:`file`,multiple:!0,style:{display:`none`},onChange:e=>{let t=e.target.files;if(!t)return;let r=Array.from(t).map(e=>e.name);n(e=>[...e,...r])}}),`Select image`]}),t.length>0&&(0,B.jsx)(`div`,{className:`row wrap gap-2 center-text`,style:{justifyContent:`center`,marginTop:16},children:t.map((e,t)=>(0,B.jsx)(`span`,{className:`tag tag-soft`,children:e},t))})]})]})}function yf({title:e,italic:t,eyebrow:n,num:r,children:i}){return uf(),(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(gn,{}),(0,B.jsx)(`div`,{style:{paddingTop:120},children:(0,B.jsx)(`section`,{className:`section-tight`,children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsx)(Ed,{num:r,eyebrow:n,title:e,italic:t}),(0,B.jsx)(`div`,{style:{marginTop:48},children:i})]})})}),(0,B.jsx)(yn,{})]})}function bf(){let{t:e,lang:t}=V(),n=[[e(`how.01.title`),e(`how.01.body`)],[e(`how.02.title`),e(`how.02.body`)],[e(`how.03.title`),e(`how.03.body`)],[e(`how.04.title`),e(`how.04.body`)]];return(0,B.jsxs)(yf,{num:`01`,eyebrow:t===`tr`?`Süreç`:`Process`,title:t===`tr`?`Nasıl`:`How it`,italic:t===`tr`?`çalışır.`:`works.`,children:[(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr`,gap:1,border:`1px solid var(--hairline)`},children:n.map(([e,t],n)=>(0,B.jsxs)(`div`,{className:`row`,style:{background:`var(--paper)`,borderBottom:`1px solid var(--hairline)`,padding:32,gap:32,flexWrap:`wrap`},children:[(0,B.jsx)(`span`,{className:`display`,style:{fontSize:96,lineHeight:.9,color:`var(--accent)`,minWidth:120},children:String(n+1).padStart(2,`0`)}),(0,B.jsxs)(`div`,{className:`col`,style:{flex:1,minWidth:240},children:[(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:34,margin:0},children:e}),(0,B.jsx)(`p`,{className:`text-muted`,style:{marginTop:12,maxWidth:640},children:t})]})]},e))}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:40},children:[(0,B.jsx)(z,{to:`/dashboard/create-request`,className:`btn btn-accent`,children:e(`cta.createRequest`)}),(0,B.jsx)(z,{to:`/register`,className:`btn`,children:e(`cta.joinAsArtist`)})]})]})}function xf(){let{lang:e}=V(),[t,n]=(0,g.useState)(`all`),[r,i]=(0,g.useState)(`all`),a=Jd.filter(e=>(t===`all`||e.city===t)&&(r===`all`||e.styles.includes(r)));return(0,B.jsxs)(yf,{num:`02`,eyebrow:e===`tr`?`Sanatçılar`:`Artists`,title:e===`tr`?`Sanatçıları`:`Browse`,italic:e===`tr`?`keşfet.`:`artists.`,children:[(0,B.jsxs)(`div`,{className:`row gap-3 wrap`,style:{marginBottom:24},children:[(0,B.jsx)(gf,{options:[{value:`all`,label:e===`tr`?`Tüm şehirler`:`All cities`},...qd.map(e=>({value:e,label:e}))],value:t,onChange:e=>n(e.target.value)}),(0,B.jsx)(gf,{options:[{value:`all`,label:e===`tr`?`Tüm stiller`:`All styles`},...Kd.map(t=>({value:t.key,label:t[e]}))],value:r,onChange:e=>i(e.target.value)}),(0,B.jsx)(`div`,{className:`flex-1`}),(0,B.jsx)(mf,{placeholder:e===`tr`?`Ara`:`Search`})]}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:24},children:a.map(e=>(0,B.jsx)(Md,{artist:e},e.id))}),(0,B.jsxs)(`div`,{style:{marginTop:80},children:[(0,B.jsx)(`h3`,{className:`display display-md`,style:{marginBottom:24},children:e===`tr`?`Stüdyolar`:`Studios`}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:24},children:Yd.map(e=>(0,B.jsx)(Nd,{studio:e},e.id))})]})]})}function Sf(){let{lang:e}=V(),[t,n]=(0,g.useState)(`all`),r=Zd.filter(e=>t===`all`||e.style===t);return(0,B.jsxs)(yf,{num:`03`,eyebrow:e===`tr`?`Tasarımlar`:`Designs`,title:e===`tr`?`Tasarımları`:`Browse`,italic:e===`tr`?`keşfet.`:`designs.`,children:[(0,B.jsx)(`div`,{className:`row gap-2 wrap`,style:{marginBottom:24},children:(0,B.jsx)(_f,{value:t,onChange:e=>n(e),options:[{value:`all`,label:e===`tr`?`Tümü`:`All`},...Kd.map(t=>({value:t.key,label:t[e]}))]})}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(230px, 1fr))`,gap:24},children:r.map(e=>(0,B.jsx)(jd,{design:e},e.id))})]})}function Cf(){let{lang:e}=V();return(0,B.jsx)(yf,{num:`04`,eyebrow:e===`tr`?`Kategoriler`:`Categories`,title:e===`tr`?`Dövme`:`Tattoo`,italic:e===`tr`?`kategorileri.`:`categories.`,children:(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:1,border:`1px solid var(--hairline)`},children:Kd.map((t,n)=>(0,B.jsxs)(z,{to:`/designs`,style:{background:`var(--paper)`,borderRight:`1px solid var(--hairline)`,borderBottom:`1px solid var(--hairline)`,padding:32,display:`block`},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:String(n+1).padStart(2,`0`)}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:38,margin:`8px 0 12px`},children:t[e]}),(0,B.jsx)(`p`,{className:`text-muted`,style:{margin:0},children:e===`tr`?`Sanatçılar bu stilde aktif olarak teklif veriyor.`:`Artists currently working in this style send offers daily.`})]},t.key))})})}function wf(){let{lang:e}=V();return(0,B.jsx)(yf,{num:`05`,eyebrow:e===`tr`?`Giriş`:`Sign in`,title:e===`tr`?`Tekrar`:`Welcome`,italic:e===`tr`?`hoş geldiniz.`:`back.`,children:(0,B.jsxs)(`div`,{className:`split`,children:[(0,B.jsxs)(`form`,{className:`col gap-4`,onSubmit:e=>e.preventDefault(),style:{maxWidth:460},children:[(0,B.jsx)($,{label:`Email`,children:(0,B.jsx)(mf,{type:`email`,placeholder:`hello@example.com`})}),(0,B.jsx)($,{label:e===`tr`?`Şifre`:`Password`,children:(0,B.jsx)(mf,{type:`password`,placeholder:`••••••••`})}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:12},children:[(0,B.jsx)(`button`,{className:`btn btn-primary`,type:`submit`,children:e===`tr`?`Giriş yap`:`Sign in`}),(0,B.jsx)(z,{to:`/register`,className:`btn btn-ghost`,children:e===`tr`?`Hesap oluştur`:`Create account`})]}),(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e===`tr`?`Şifrenizi mi unuttunuz?`:`Forgot password?`,` `,(0,B.jsx)(z,{to:`/contact`,style:{textDecoration:`underline`},children:e===`tr`?`Yardım`:`Get help`})]})]}),(0,B.jsxs)(`div`,{className:`col gap-3`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Yeni misiniz?`:`New here?`}),(0,B.jsx)(`p`,{className:`display display-md`,style:{margin:0},children:e===`tr`?`Dövme yaptırmak ya da yapmak. İkisi de tek hesapla.`:`Get tattooed, or tattoo. Both with one account.`}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:12},children:[(0,B.jsx)(z,{to:`/register?as=customer`,className:`btn`,children:e===`tr`?`Müşteri olarak`:`As customer`}),(0,B.jsx)(z,{to:`/register?as=artist`,className:`btn btn-ghost`,children:e===`tr`?`Sanatçı olarak`:`As artist`})]})]})]})})}function Tf(){let{lang:e}=V(),[t,n]=(0,g.useState)(`customer`);return(0,B.jsxs)(yf,{num:`06`,eyebrow:e===`tr`?`Kayıt`:`Sign up`,title:e===`tr`?`Hesap`:`Create`,italic:e===`tr`?`oluştur.`:`your account.`,children:[(0,B.jsx)(`div`,{className:`row gap-2 wrap`,style:{marginBottom:32},children:(0,B.jsx)(_f,{value:t,onChange:e=>n(e),options:[{value:`customer`,label:e===`tr`?`Müşteri`:`Customer`},{value:`artist`,label:e===`tr`?`Sanatçı`:`Artist`},{value:`studio`,label:e===`tr`?`Stüdyo`:`Studio`}]})}),(0,B.jsxs)(`form`,{className:`col gap-4`,onSubmit:e=>e.preventDefault(),style:{maxWidth:580},children:[(0,B.jsx)($,{label:e===`tr`?t===`studio`?`Stüdyo adı`:`Adınız`:t===`studio`?`Studio name`:`Full name`,children:(0,B.jsx)(mf,{})}),(0,B.jsx)($,{label:`Email`,children:(0,B.jsx)(mf,{type:`email`})}),(0,B.jsx)($,{label:e===`tr`?`Şehir`:`City`,children:(0,B.jsx)(gf,{options:qd.map(e=>({value:e,label:e}))})}),t!==`customer`&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)($,{label:e===`tr`?`Kısa biyografi`:`Short bio`,children:(0,B.jsx)(hf,{rows:3})}),(0,B.jsx)($,{label:e===`tr`?`Ana stil`:`Primary style`,children:(0,B.jsx)(gf,{options:Kd.map(t=>({value:t.key,label:t[e]}))})})]}),(0,B.jsx)($,{label:e===`tr`?`Şifre`:`Password`,children:(0,B.jsx)(mf,{type:`password`})}),(0,B.jsxs)(`label`,{className:`row gap-2 center`,style:{marginTop:8},children:[(0,B.jsx)(`input`,{type:`checkbox`}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`18 yaşından büyüğüm ve Şartları okudum.`:`I am 18+ and I agree to the Terms.`})]}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:12},children:[(0,B.jsx)(`button`,{className:`btn btn-primary`,type:`submit`,children:e===`tr`?`Hesap oluştur`:`Create account`}),(0,B.jsx)(z,{to:`/login`,className:`btn btn-ghost`,children:e===`tr`?`Zaten hesabım var`:`I have an account`})]})]})]})}function Ef(){let{lang:e}=V();return(0,B.jsx)(yf,{num:`07`,eyebrow:`FAQ`,title:e===`tr`?`Sık`:`Frequently`,italic:e===`tr`?`sorulanlar.`:`asked.`,children:(0,B.jsx)(`div`,{className:`col`,children:(e===`tr`?[[`Sanatçılar nasıl doğrulanıyor?`,`Her sanatçı kimlik ve portföy değerlendirmesinden geçer.`],[`Bir teklifi kabul edersem ne olur?`,`Randevu otomatik olarak oluşturulur ve sohbet açılır.`],[`Birden fazla sanatçıya brief gönderebilir miyim?`,`Tek brief gönderirsiniz; teklifler size gelir.`],[`Ücreti nasıl ödüyorum?`,`Stüdyoda doğrudan ödersiniz; depozito için planlanmış güvenli ödeme yakında.`],[`Yorum bırakmak için ne gerekli?`,`Randevu tamamlanmış olmalı; aksi halde yorum açılmaz.`]]:[[`How are artists verified?`,`Each artist passes identity and portfolio review.`],[`What happens if I accept an offer?`,`A booking is created and a private chat opens.`],[`Can I send my brief to multiple artists?`,`One brief, many offers come to you.`],[`How do I pay?`,`In-studio for now; secured deposits coming soon.`],[`Who can leave a review?`,`Only customers with completed bookings.`]]).map(([e,t],n)=>(0,B.jsxs)(`details`,{style:{borderBottom:`1px solid var(--hairline)`,padding:`22px 0`},children:[(0,B.jsxs)(`summary`,{style:{cursor:`pointer`,listStyle:`none`,display:`flex`,justifyContent:`space-between`,gap:24},children:[(0,B.jsxs)(`span`,{className:`row gap-3 center`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:String(n+1).padStart(2,`0`)}),(0,B.jsx)(`span`,{className:`display`,style:{fontSize:22},children:e})]}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:`+`})]}),(0,B.jsx)(`p`,{className:`text-muted`,style:{marginTop:14,maxWidth:720},children:t})]},e))})})}function Df(){let{lang:e}=V();return(0,B.jsx)(yf,{num:`08`,eyebrow:e===`tr`?`Hakkında`:`About`,title:`TattooGo`,italic:`manifesto.`,children:(0,B.jsxs)(`div`,{className:`split`,children:[(0,B.jsx)(`p`,{className:`display display-md`,style:{margin:0,maxWidth:520},children:e===`tr`?`Her dövme bir karardır. Bu karara saygıyla yaklaşıyoruz — açık artırmalarla değil, eşleşmelerle.`:`Every tattoo is a decision. We honour that decision with matches, not auctions.`}),(0,B.jsxs)(`div`,{className:`col gap-4`,children:[(0,B.jsx)(`p`,{className:`text-muted`,style:{margin:0},children:e===`tr`?`TattooGo, kapsamlı bir pazardan çok bir editöryal platform olarak tasarlandı. Sanatçıları kalitelerine göre öne çıkarırız, müşterilere de aynı saygıyı sunarız.`:`TattooGo is designed as an editorial platform more than a broad marketplace. We highlight artists by craft, and we extend the same care to clients.`}),(0,B.jsx)(`p`,{className:`text-muted`,style:{margin:0},children:e===`tr`?`İstanbul’da kuruldu. Amsterdam ve Lisbon ofisleriyle büyüyor.`:`Founded in Istanbul. Growing with studios in Amsterdam and Lisbon.`})]})]})})}function Of(){let{lang:e}=V();return(0,B.jsx)(yf,{num:`09`,eyebrow:e===`tr`?`İletişim`:`Contact`,title:e===`tr`?`Bize`:`Talk to`,italic:e===`tr`?`yazın.`:`us.`,children:(0,B.jsxs)(`div`,{className:`split`,children:[(0,B.jsxs)(`form`,{className:`col gap-4`,onSubmit:e=>e.preventDefault(),style:{maxWidth:480},children:[(0,B.jsx)($,{label:e===`tr`?`Adınız`:`Your name`,children:(0,B.jsx)(mf,{})}),(0,B.jsx)($,{label:`Email`,children:(0,B.jsx)(mf,{type:`email`})}),(0,B.jsx)($,{label:e===`tr`?`Mesaj`:`Message`,children:(0,B.jsx)(hf,{rows:5})}),(0,B.jsx)(`button`,{className:`btn btn-primary`,type:`submit`,children:e===`tr`?`Gönder`:`Send`})]}),(0,B.jsxs)(`div`,{className:`col gap-3`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Doğrudan`:`Direct`}),(0,B.jsx)(`p`,{className:`display display-md`,style:{margin:0},children:`hello@tattoogo.example`}),(0,B.jsx)(`span`,{className:`text-muted`,children:`Istanbul · Karaköy · TR`})]})]})})}function kf(){let{lang:e}=V();return(0,B.jsx)(yf,{num:`10`,eyebrow:e===`tr`?`Şartlar`:`Terms`,title:e===`tr`?`Şartlar ve`:`Terms &`,italic:e===`tr`?`gizlilik.`:`privacy.`,children:(0,B.jsxs)(`div`,{className:`col gap-4`,style:{maxWidth:760},children:[(0,B.jsx)(`p`,{className:`text-muted`,children:e===`tr`?`Bu sayfa örnektir.`:`This page is a placeholder for the prototype.`}),(0,B.jsxs)(`ol`,{className:`text-muted`,style:{paddingLeft:22,lineHeight:1.8},children:[(0,B.jsx)(`li`,{children:e===`tr`?`Kullanıcı 18 yaşından büyük olmalıdır.`:`Users must be 18 years or older.`}),(0,B.jsx)(`li`,{children:e===`tr`?`Doğrulama portföy ve kimlik kontrolü içerir.`:`Verification includes portfolio and identity check.`}),(0,B.jsx)(`li`,{children:e===`tr`?`Sadece tamamlanmış randevular yorum alabilir.`:`Only completed bookings may receive reviews.`}),(0,B.jsx)(`li`,{children:e===`tr`?`Kullanıcı raporlama ve engelleme her zaman mümkündür.`:`Reporting and blocking is available at any time.`})]})]})})}function Af({scope:e,title:t,subtitle:n,children:r}){let{lang:i,t:a}=V(),o=[{to:`/dashboard`,num:`01`,label:a(`cust.home`)},{to:`/dashboard/create-request`,num:`02`,label:a(`cust.createRequest`)},{to:`/dashboard/requests`,num:`03`,label:a(`cust.requests`)},{to:`/dashboard/offers`,num:`04`,label:a(`cust.offers`)},{to:`/dashboard/messages`,num:`05`,label:a(`cust.messages`)},{to:`/dashboard/notifications`,num:`06`,label:a(`cust.notifications`)},{to:`/dashboard/favorites`,num:`07`,label:a(`cust.favorites`)},{to:`/dashboard/appointments`,num:`08`,label:a(`cust.appointments`)},{to:`/dashboard/tracking`,num:`09`,label:a(`cust.tracking`)},{to:`/dashboard/reviews`,num:`10`,label:a(`cust.reviews`)},{to:`/dashboard/profile`,num:`11`,label:a(`cust.profile`)}],s=[{to:`/studio`,num:`01`,label:a(`art.home`)},{to:`/studio/tattoos`,num:`02`,label:a(`art.myTattoos`)},{to:`/studio/add-tattoo`,num:`03`,label:a(`art.addTattoo`)},{to:`/studio/give-offer`,num:`04`,label:a(`art.giveOffer`)},{to:`/studio/offers`,num:`05`,label:a(`art.myOffers`)},{to:`/studio/tracking`,num:`06`,label:a(`art.tracking`)},{to:`/studio/calendar`,num:`07`,label:a(`art.calendar`)},{to:`/studio/campaigns`,num:`08`,label:a(`art.campaigns`)},{to:`/studio/artists`,num:`09`,label:a(`art.myArtists`)},{to:`/studio/materials`,num:`10`,label:a(`art.materials`)},{to:`/studio/reviews`,num:`11`,label:a(`art.reviews`)},{to:`/studio/messages`,num:`12`,label:a(`art.messages`)},{to:`/studio/notifications`,num:`13`,label:a(`art.notifications`)},{to:`/studio/stats`,num:`14`,label:a(`art.stats`)},{to:`/studio/profile`,num:`15`,label:a(`art.profile`)}];return(0,B.jsxs)(`div`,{style:{background:`var(--paper)`,minHeight:`100vh`},children:[(0,B.jsx)(jf,{scope:e}),(0,B.jsxs)(`div`,{className:`container`,style:{paddingTop:28,paddingBottom:120,display:`grid`,gridTemplateColumns:`minmax(200px, 240px) 1fr`,gap:`clamp(28px, 4vw, 64px)`},children:[(0,B.jsxs)(`aside`,{className:`dash-aside`,style:{borderTop:`1px solid var(--hairline-strong)`,paddingTop:22,position:`sticky`,top:90,alignSelf:`start`,maxHeight:`calc(100vh - 110px)`,overflowY:`auto`},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`customer`?i===`tr`?`Müşteri menüsü`:`Customer menu`:i===`tr`?`Sanatçı menüsü`:`Artist menu`}),(0,B.jsx)(`ul`,{style:{listStyle:`none`,padding:0,margin:`18px 0 0`,display:`flex`,flexDirection:`column`,gap:4},children:(e===`customer`?o:s).map(e=>(0,B.jsx)(`li`,{children:(0,B.jsx)(Ct,{to:e.to,end:e.to===`/dashboard`||e.to===`/studio`,style:({isActive:e})=>({display:`flex`,alignItems:`baseline`,gap:12,padding:`8px 0`,borderBottom:`1px solid var(--hairline-light)`,color:`var(--ink)`,opacity:e?1:.7}),children:({isActive:t})=>(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(`span`,{className:`mono`,style:{width:22,color:t?`var(--accent)`:`var(--muted)`},children:e.num}),(0,B.jsx)(`span`,{style:{fontSize:14,fontWeight:t?500:400},children:e.label})]})})},e.to))})]}),(0,B.jsxs)(`main`,{children:[(0,B.jsxs)(`header`,{style:{borderBottom:`1px solid var(--hairline-strong)`,paddingBottom:22,marginBottom:32},children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e===`customer`?`Customer · `:`Artist · `,i.toUpperCase()]}),(0,B.jsx)(`h1`,{className:`display display-md`,style:{margin:`12px 0 8px`},children:t}),n&&(0,B.jsx)(`p`,{style:{color:`var(--muted)`,maxWidth:640,margin:0},children:n})]}),r]})]}),(0,B.jsx)(Mf,{scope:e})]})}function jf({scope:e}){let{t,lang:n}=V();return(0,B.jsx)(`div`,{style:{position:`sticky`,top:0,zIndex:40,background:`rgba(239,234,227,0.94)`,backdropFilter:`blur(14px)`,borderBottom:`1px solid var(--hairline)`},children:(0,B.jsxs)(`div`,{className:`container row center between`,style:{paddingBlock:14},children:[(0,B.jsxs)(`div`,{className:`row center gap-4`,children:[(0,B.jsx)(dn,{}),(0,B.jsxs)(`span`,{className:`mono text-muted`,style:{marginLeft:8},children:[`· `,e===`customer`?n===`tr`?`Müşteri Paneli`:`Customer Panel`:n===`tr`?`Stüdyo Paneli`:`Studio Panel`]})]}),(0,B.jsxs)(`div`,{className:`row center gap-4`,children:[(0,B.jsxs)(z,{to:e===`customer`?`/dashboard/notifications`:`/studio/notifications`,className:`mono row center gap-2`,"aria-label":`Notifications`,children:[(0,B.jsx)(ln,{name:`notifications`,size:18}),` Notifications`]}),(0,B.jsxs)(z,{to:e===`customer`?`/dashboard/messages`:`/studio/messages`,className:`mono row center gap-2`,"aria-label":`Messages`,children:[(0,B.jsx)(ln,{name:`messages`,size:18}),` DM`]}),(0,B.jsx)(z,{to:`#`,className:`mono row center gap-2`,"aria-label":`Search`,children:(0,B.jsx)(ln,{name:`search`,size:18})}),(0,B.jsx)(fn,{})]})]})})}function Mf({scope:e}){let{t}=V(),n=Le();return(0,B.jsx)(`nav`,{className:`bottom-nav`,style:{position:`fixed`,left:0,right:0,bottom:0,background:`rgba(15,13,11,0.96)`,color:`var(--night-text)`,backdropFilter:`blur(20px)`,zIndex:40},children:(0,B.jsx)(`div`,{className:`container row between`,style:{paddingBlock:10},children:(e===`customer`?[{to:`/dashboard`,label:t(`cust.home`),icon:`home`},{to:`/dashboard/requests`,label:t(`cust.requests`),icon:`search`},{to:`/dashboard/create-request`,label:t(`cust.createRequest`),icon:`add`,primary:!0},{to:`/dashboard/messages`,label:t(`cust.messages`),icon:`messages`},{to:`/dashboard/profile`,label:t(`cust.profile`),icon:`editProfile`}]:[{to:`/studio`,label:t(`art.home`),icon:`home`},{to:`/studio/stats`,label:t(`art.stats`),icon:`data`},{to:`/studio/add-tattoo`,label:t(`art.addTattoo`),icon:`add`,primary:!0},{to:`/studio/give-offer`,label:t(`art.giveOffer`),icon:`giveOffer`},{to:`/studio/profile`,label:t(`art.profile`),icon:`editProfile`}]).map(e=>{let t=n.pathname===e.to;return(0,B.jsxs)(z,{to:e.to,className:`col center`,style:{flex:1,padding:`8px 4px`,gap:4},children:[(0,B.jsx)(`span`,{style:{width:e.primary?40:32,height:e.primary?40:32,borderRadius:999,border:`1px solid var(--night-hairline)`,background:e.primary?`var(--paper)`:`transparent`,color:e.primary?`var(--ink)`:`var(--night-text)`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,opacity:t?1:.9},children:(0,B.jsx)(ln,{name:e.icon,size:e.primary?18:16})}),(0,B.jsx)(`span`,{className:`mono-sm`,style:{fontFamily:`var(--font-mono)`,fontSize:9,letterSpacing:`0.16em`,textTransform:`uppercase`,opacity:t?1:.65},children:e.label})]},e.to)})})})}function Nf(){uf();let{lang:e,t}=V();return(0,B.jsxs)(Af,{scope:`customer`,title:e===`tr`?`Tekrar hoş geldin, Naz.`:`Welcome back, Naz.`,subtitle:e===`tr`?`Aktif istekleriniz, son teklifler ve yaklaşan randevular.`:`Your active requests, latest offers and upcoming appointments.`,children:[(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:16,marginBottom:36},children:[(0,B.jsx)(Ld,{label:e===`tr`?`Aktif istek`:`Active requests`,value:`3`,delta:`+1 this week`}),(0,B.jsx)(Ld,{label:e===`tr`?`Açık teklif`:`Open offers`,value:`7`,delta:`+4 today`}),(0,B.jsx)(Ld,{label:e===`tr`?`Yaklaşan`:`Upcoming`,value:`2`}),(0,B.jsx)(Ld,{label:e===`tr`?`Tamamlanan`:`Completed`,value:`5`})]}),(0,B.jsx)(Wf,{num:`A1`,label:e===`tr`?`İsteklerim`:`My requests`,action:(0,B.jsxs)(z,{to:`/dashboard/requests`,className:`mono`,children:[t(`common.viewAll`),` →`]})}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:16},children:Qd.slice(0,2).map(e=>(0,B.jsx)(Pd,{request:e},e.id))}),(0,B.jsx)(Wf,{num:`A2`,label:e===`tr`?`Son teklifler`:`Latest offers`,action:(0,B.jsxs)(z,{to:`/dashboard/offers`,className:`mono`,children:[t(`common.viewAll`),` →`]})}),(0,B.jsx)(`div`,{className:`col gap-3`,children:$d.slice(0,3).map(e=>(0,B.jsx)(Fd,{offer:e},e.id))}),(0,B.jsx)(Wf,{num:`A3`,label:e===`tr`?`Yaklaşan randevular`:`Upcoming appointments`,action:(0,B.jsxs)(z,{to:`/dashboard/appointments`,className:`mono`,children:[t(`common.viewAll`),` →`]})}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16},children:ef.filter(e=>e.status!==`completed`).map(e=>(0,B.jsx)(Bd,{ap:e},e.id))})]})}function Pf(){uf();let{lang:e,t}=V(),[n,r]=(0,g.useState)(`fine-line`),[i,a]=(0,g.useState)(`md`),[o,s]=(0,g.useState)(`black`),[c,l]=(0,g.useState)(`forearm`);return(0,B.jsx)(Af,{scope:`customer`,title:e===`tr`?`Dövme isteği oluştur`:`Create tattoo request`,subtitle:e===`tr`?`Fikrinizi paylaşın. Onaylı sanatçılar size özel teklif gönderir.`:`Describe your idea. Verified artists send tailored offers.`,children:(0,B.jsxs)(`div`,{className:`split`,children:[(0,B.jsxs)(`form`,{className:`col`,onSubmit:e=>e.preventDefault(),children:[(0,B.jsx)($,{label:e===`tr`?`1 · Dövme tanımı`:`1 · Tattoo description`,hint:e===`tr`?`En az 2 cümle yazın`:`At least 2 sentences`,children:(0,B.jsx)(hf,{rows:4,placeholder:e===`tr`?`Aklınızdakini anlatın…`:`Describe what you have in mind…`})}),(0,B.jsx)($,{label:e===`tr`?`2 · Stil`:`2 · Style`,children:(0,B.jsx)(_f,{value:n,onChange:r,options:Kd.map(t=>({value:t.key,label:t[e]}))})}),(0,B.jsx)($,{label:e===`tr`?`3 · Yerleşim`:`3 · Body placement`,children:(0,B.jsx)(_f,{value:c,onChange:l,options:[`arm`,`forearm`,`shoulder`,`chest`,`back`,`leg`,`thigh`,`ankle`,`hand`,`neck`,`ribs`].map(e=>({value:e,label:e}))})}),(0,B.jsx)($,{label:e===`tr`?`4 · Boyut`:`4 · Size`,children:(0,B.jsx)(_f,{value:i,onChange:a,options:[`xs`,`sm`,`md`,`lg`,`xl`].map(e=>({value:e,label:e.toUpperCase()}))})}),(0,B.jsx)($,{label:e===`tr`?`5 · Renk tercihi`:`5 · Color preference`,children:(0,B.jsx)(_f,{value:o,onChange:s,options:[{value:`black`,label:e===`tr`?`Siyah`:`Black`},{value:`shaded`,label:e===`tr`?`Gölgeli`:`Shaded`},{value:`color`,label:e===`tr`?`Renkli`:`Color`}]})}),(0,B.jsx)($,{label:e===`tr`?`6 · Referanslar`:`6 · Reference images`,children:(0,B.jsx)(vf,{label:t(`common.uploadImage`)})}),(0,B.jsx)($,{label:e===`tr`?`7 · Şehir`:`7 · City`,children:(0,B.jsx)(gf,{options:qd.map(e=>({value:e,label:e}))})}),(0,B.jsxs)(`div`,{className:`row gap-3`,children:[(0,B.jsx)($,{label:e===`tr`?`8 · Bütçe min`:`8 · Budget min`,children:(0,B.jsx)(mf,{type:`number`,placeholder:`₺2,500`})}),(0,B.jsx)($,{label:e===`tr`?`Bütçe max`:`Budget max`,children:(0,B.jsx)(mf,{type:`number`,placeholder:`₺6,000`})})]}),(0,B.jsx)($,{label:e===`tr`?`9 · Tercih edilen tarih`:`9 · Preferred date`,children:(0,B.jsx)(mf,{type:`date`})}),(0,B.jsxs)($,{label:e===`tr`?`10 · Gizlilik`:`10 · Privacy`,children:[(0,B.jsxs)(`label`,{className:`row gap-2 center`,children:[(0,B.jsx)(`input`,{type:`radio`,name:`priv`,defaultChecked:!0}),` `,e===`tr`?`Sanatçılar görsün`:`Visible to artists`]}),(0,B.jsxs)(`label`,{className:`row gap-2 center`,children:[(0,B.jsx)(`input`,{type:`radio`,name:`priv`}),` `,e===`tr`?`Sadece davet ettiklerim görsün`:`Only invited artists`]})]}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:18},children:[(0,B.jsx)(`button`,{className:`btn btn-accent`,type:`submit`,children:e===`tr`?`İsteği gönder`:`Submit request`}),(0,B.jsx)(`button`,{className:`btn btn-ghost`,type:`button`,children:e===`tr`?`Taslak olarak kaydet`:`Save as draft`})]})]}),(0,B.jsxs)(`aside`,{className:`card card-pad col gap-4`,style:{position:`sticky`,top:96,alignSelf:`start`},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Önizleme`:`Preview`}),(0,B.jsxs)(`h3`,{className:`display`,style:{fontSize:28,margin:0},children:[n.replace(`-`,` `),` · `,c,` · `,i.toUpperCase()]}),(0,B.jsx)(`p`,{className:`text-muted`,style:{margin:0},children:e===`tr`?`Brief’iniz onaylı sanatçılara açık teklif olarak yayınlanacak.`:`Your brief will be opened to verified artists as a public request.`}),(0,B.jsx)(`hr`,{className:`hr`}),(0,B.jsxs)(`div`,{className:`row between`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Beklenen teklif`:`Expected offers`}),(0,B.jsx)(`span`,{className:`mono`,children:`4–8`})]}),(0,B.jsxs)(`div`,{className:`row between`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`İlk yanıt`:`First reply`}),(0,B.jsx)(`span`,{className:`mono`,children:`~ 38 min`})]}),(0,B.jsxs)(`div`,{className:`row between`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Olgunlaşma`:`Brief lifetime`}),(0,B.jsx)(`span`,{className:`mono`,children:`7 days`})]})]})]})})}function Ff(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`customer`,title:e===`tr`?`İsteklerim`:`My requests`,subtitle:e===`tr`?`Tüm brief’leriniz ve durumları.`:`All your briefs and their status.`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:18},children:[(0,B.jsx)(_f,{value:`all`,onChange:()=>{},options:[{value:`all`,label:e===`tr`?`Tümü`:`All`},{value:`open`,label:`Open`},{value:`reviewing`,label:`Reviewing`},{value:`booked`,label:`Booked`},{value:`completed`,label:`Completed`}]}),(0,B.jsx)(z,{to:`/dashboard/create-request`,className:`btn btn-sm btn-accent`,children:e===`tr`?`＋ Yeni istek`:`＋ New request`})]}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:16},children:Qd.map(e=>(0,B.jsx)(Pd,{request:e},e.id))})]})}function If(){uf();let{lang:e}=V(),[t,n]=(0,g.useState)(!1);return(0,B.jsxs)(Af,{scope:`customer`,title:e===`tr`?`Alınan teklifler`:`Offers received`,subtitle:e===`tr`?`Brief’leriniz için sanatçı ve stüdyo teklifleri.`:`Offers from artists and studios on your briefs.`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:18},children:[(0,B.jsx)(_f,{value:`all`,onChange:()=>{},options:[{value:`all`,label:e===`tr`?`Tümü`:`All`},{value:`sent`,label:`New`},{value:`viewed`,label:`Viewed`},{value:`accepted`,label:`Accepted`},{value:`rejected`,label:`Rejected`}]}),(0,B.jsx)(`button`,{className:`btn btn-sm`,onClick:()=>n(e=>!e),children:t?e===`tr`?`Listeye dön`:`Back to list`:e===`tr`?`Karşılaştır`:`Compare`})]}),t?(0,B.jsx)(`div`,{style:{overflowX:`auto`,border:`1px solid var(--hairline)`},children:(0,B.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,minWidth:760},children:[(0,B.jsx)(`thead`,{children:(0,B.jsx)(`tr`,{style:{borderBottom:`1px solid var(--hairline)`},children:[e===`tr`?`Sanatçı`:`Artist`,e===`tr`?`Şehir`:`City`,e===`tr`?`Fiyat`:`Price`,e===`tr`?`Süre`:`Hours`,e===`tr`?`Randevu`:`Slot`,e===`tr`?`Puan`:`Rating`,``].map(e=>(0,B.jsx)(`th`,{className:`mono text-muted`,style:{textAlign:`left`,padding:12},children:e},e))})}),(0,B.jsx)(`tbody`,{children:$d.map(e=>(0,B.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--hairline)`},children:[(0,B.jsx)(`td`,{style:{padding:12},children:(0,B.jsxs)(`div`,{className:`row center gap-3`,children:[(0,B.jsx)(Ad,{name:e.artistName,size:28}),e.artistName,e.verified&&(0,B.jsx)(`span`,{className:`tag tag-accent`,style:{padding:`2px 6px`},children:`✓`})]})}),(0,B.jsx)(`td`,{style:{padding:12},className:`mono text-muted`,children:e.artistCity}),(0,B.jsxs)(`td`,{style:{padding:12},className:`mono`,children:[`₺`,e.price.toLocaleString()]}),(0,B.jsxs)(`td`,{style:{padding:12},className:`mono`,children:[e.estimatedHours,`h`]}),(0,B.jsx)(`td`,{style:{padding:12},className:`mono text-muted`,children:e.appointmentAt}),(0,B.jsxs)(`td`,{style:{padding:12},className:`mono`,children:[`★ `,e.rating]}),(0,B.jsx)(`td`,{style:{padding:12},children:(0,B.jsx)(`button`,{className:`btn btn-sm btn-accent`,children:`Accept`})})]},e.id))})]})}):(0,B.jsx)(`div`,{className:`col gap-3`,children:$d.map(e=>(0,B.jsx)(Fd,{offer:e},e.id))})]})}function Lf(){uf();let{lang:e}=V(),[t,n]=(0,g.useState)(nf[0].id),r=nf.find(e=>e.id===t),i=rf.filter(e=>e.conversationId===t);return(0,B.jsx)(Af,{scope:`customer`,title:e===`tr`?`Mesajlar`:`Messages`,children:(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`320px 1fr`,gap:0,border:`1px solid var(--hairline)`},children:[(0,B.jsxs)(`div`,{className:`col`,style:{borderRight:`1px solid var(--hairline)`,maxHeight:580,overflowY:`auto`},children:[(0,B.jsx)(`div`,{style:{padding:14,borderBottom:`1px solid var(--hairline)`},children:(0,B.jsx)(mf,{placeholder:e===`tr`?`Sohbet ara`:`Search conversations`})}),nf.map(e=>(0,B.jsx)(`button`,{onClick:()=>n(e.id),style:{display:`block`,width:`100%`,textAlign:`left`},children:(0,B.jsx)(zd,{c:e,active:e.id===t})},e.id))]}),(0,B.jsxs)(`div`,{className:`col`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{padding:16,borderBottom:`1px solid var(--hairline)`},children:[(0,B.jsxs)(`div`,{className:`row gap-3 center`,children:[(0,B.jsx)(Ad,{name:r.with,size:36}),(0,B.jsxs)(`div`,{className:`col`,children:[(0,B.jsx)(`strong`,{children:r.with}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:r.role})]})]}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-ghost`,children:`View profile`})]}),(0,B.jsx)(`div`,{className:`col gap-3`,style:{padding:18,minHeight:320,maxHeight:460,overflowY:`auto`},children:i.map(e=>(0,B.jsx)(`div`,{className:`row`,style:{justifyContent:e.fromMe?`flex-end`:`flex-start`},children:(0,B.jsxs)(`div`,{style:{maxWidth:420,background:e.fromMe?`var(--ink)`:`var(--paper-warm)`,color:e.fromMe?`var(--paper)`:`var(--ink)`,padding:`10px 14px`,borderRadius:0,border:`1px solid var(--hairline)`},children:[(0,B.jsx)(`span`,{style:{display:`block`,fontSize:14},children:e.text}),(0,B.jsx)(`span`,{className:`mono`,style:{display:`block`,marginTop:6,opacity:.6,fontSize:10},children:e.time})]})},e.id))}),(0,B.jsxs)(`div`,{className:`row gap-2 center`,style:{padding:14,borderTop:`1px solid var(--hairline)`},children:[(0,B.jsx)(mf,{placeholder:e===`tr`?`Mesaj yazın…`:`Write a message…`}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-primary`,children:e===`tr`?`Gönder`:`Send`})]})]})]})})}function Rf(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`customer`,title:e===`tr`?`Bildirimler`:`Notifications`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:18},children:[(0,B.jsx)(_f,{value:`all`,onChange:()=>{},options:[{value:`all`,label:e===`tr`?`Tümü`:`All`},{value:`offers`,label:e===`tr`?`Teklifler`:`Offers`},{value:`msgs`,label:e===`tr`?`Mesajlar`:`Messages`},{value:`appts`,label:e===`tr`?`Randevular`:`Appointments`},{value:`system`,label:e===`tr`?`Sistem`:`System`}]}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-ghost`,children:e===`tr`?`Tümünü okundu işaretle`:`Mark all read`})]}),(0,B.jsx)(`div`,{className:`col`,children:af.map(e=>(0,B.jsx)(Rd,{n:e},e.id))})]})}function zf(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`customer`,title:e===`tr`?`Favoriler`:`Favorites`,children:[(0,B.jsx)(`h3`,{className:`mono text-muted`,style:{marginBottom:12},children:e===`tr`?`Sanatçılar`:`Artists`}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:16},children:Jd.slice(0,4).map(e=>(0,B.jsx)(Md,{artist:e},e.id))}),(0,B.jsx)(`h3`,{className:`mono text-muted`,style:{margin:`40px 0 12px`},children:e===`tr`?`Tasarımlar`:`Designs`}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(230px, 1fr))`,gap:16},children:Zd.slice(0,6).map(e=>(0,B.jsx)(jd,{design:e},e.id))})]})}function Bf(){uf();let{lang:e}=V();return(0,B.jsx)(Af,{scope:`customer`,title:e===`tr`?`Randevular`:`Appointments`,subtitle:e===`tr`?`Tüm randevularınız ve geçmiş.`:`All your bookings and history.`,children:(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16},children:ef.map(e=>(0,B.jsx)(Bd,{ap:e},e.id))})})}function Vf(){uf();let{lang:e}=V(),t=[{k:`request`,label:e===`tr`?`İstek oluşturuldu`:`Request created`},{k:`offers`,label:e===`tr`?`Teklifler alındı`:`Offers received`},{k:`accept`,label:e===`tr`?`Teklif kabul edildi`:`Offer accepted`},{k:`book`,label:e===`tr`?`Randevu oluşturuldu`:`Appointment booked`},{k:`complete`,label:e===`tr`?`Tamamlandı`:`Completed`},{k:`review`,label:e===`tr`?`Yorum bırakıldı`:`Reviewed`}];return(0,B.jsx)(Af,{scope:`customer`,title:e===`tr`?`Sipariş takibi`:`Order tracking`,children:Qd.slice(0,3).map(e=>(0,B.jsxs)(`div`,{className:`card card-pad col gap-4`,style:{marginBottom:16},children:[(0,B.jsxs)(`div`,{className:`row between`,children:[(0,B.jsx)(`strong`,{children:e.title}),(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[`#`,e.id.toUpperCase()]})]}),(0,B.jsx)(`ol`,{className:`row between`,style:{listStyle:`none`,padding:0,margin:0,gap:8,flexWrap:`wrap`},children:t.map((t,n)=>{let r=n<(e.status===`open`?1:e.status===`reviewing`?2:e.status===`booked`?4:6);return(0,B.jsxs)(`li`,{className:`col gap-2`,style:{flex:1,minWidth:110},children:[(0,B.jsx)(`span`,{style:{display:`block`,height:2,background:r?`var(--accent)`:`var(--hairline-strong)`}}),(0,B.jsx)(`span`,{className:`mono`,style:{color:r?`var(--accent)`:`var(--muted)`},children:String(n+1).padStart(2,`0`)}),(0,B.jsx)(`span`,{style:{fontSize:13},children:t.label})]},t.k)})})]},e.id))})}function Hf(){uf();let{lang:e}=V();return(0,B.jsx)(Af,{scope:`customer`,title:e===`tr`?`Yorumlarım`:`My reviews`,children:(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:16},children:tf.slice(0,3).map(e=>(0,B.jsx)(Hd,{r:e},e.id))})})}function Uf(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`customer`,title:e===`tr`?`Profil`:`Profile`,children:[(0,B.jsx)(Ud,{name:`Naz Y.`,role:e===`tr`?`Müşteri`:`Customer`,city:`Istanbul`}),(0,B.jsxs)(`div`,{className:`split`,style:{marginTop:32},children:[(0,B.jsxs)(`form`,{className:`col`,onSubmit:e=>e.preventDefault(),children:[(0,B.jsx)($,{label:e===`tr`?`Adınız`:`Full name`,children:(0,B.jsx)(mf,{defaultValue:`Naz Y.`})}),(0,B.jsx)($,{label:`Email`,children:(0,B.jsx)(mf,{defaultValue:`naz@example.com`,type:`email`})}),(0,B.jsx)($,{label:e===`tr`?`Şehir`:`City`,children:(0,B.jsx)(gf,{options:qd.map(e=>({value:e,label:e})),defaultValue:`Istanbul`})}),(0,B.jsx)($,{label:e===`tr`?`Telefon`:`Phone`,children:(0,B.jsx)(mf,{defaultValue:`+90 5XX XXX XX XX`})}),(0,B.jsx)($,{label:e===`tr`?`Dil`:`Language`,children:(0,B.jsx)(gf,{options:[{value:`en`,label:`English`},{value:`tr`,label:`Türkçe`}],defaultValue:e})}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:12},children:[(0,B.jsx)(`button`,{className:`btn btn-primary`,children:e===`tr`?`Kaydet`:`Save`}),(0,B.jsx)(`button`,{className:`btn btn-ghost`,type:`button`,children:e===`tr`?`Vazgeç`:`Discard`})]})]}),(0,B.jsxs)(`aside`,{className:`col gap-4`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Hesap`:`Account`}),[[`Security & privacy`,`Güvenlik & gizlilik`],[`Connected accounts`,`Bağlı hesaplar`],[`Order history`,`Sipariş geçmişi`],[`Reviews`,`Yorumlar`],[`Customer service`,`Müşteri hizmetleri`],[`FAQ`,`SSS`],[`About`,`Hakkında`],[`Block & report`,`Engelle & bildir`]].map(([t,n])=>(0,B.jsxs)(`div`,{className:`row between`,style:{padding:`14px 0`,borderBottom:`1px solid var(--hairline)`},children:[(0,B.jsx)(`span`,{children:e===`tr`?n:t}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:`→`})]},t))]})]})]})}function Wf({num:e,label:t,action:n}){return(0,B.jsxs)(`div`,{className:`row between center`,style:{margin:`36px 0 16px`,borderBottom:`1px solid var(--hairline)`,paddingBottom:10},children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e,` · `,t]}),n]})}function Gf(){uf();let{lang:e,t}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`İyi günler, Aslı.`:`Good afternoon, Aslı.`,subtitle:e===`tr`?`Bugün için aktif brief’ler, randevular ve istatistik.`:`Open briefs, today’s appointments, and weekly numbers.`,children:[(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:16,marginBottom:32},children:[(0,B.jsx)(Ld,{label:e===`tr`?`Açık brief`:`Open briefs`,value:`42`,delta:`+6 today`}),(0,B.jsx)(Ld,{label:e===`tr`?`Gönderilen teklif`:`Offers sent`,value:`118`,delta:`+9 week`}),(0,B.jsx)(Ld,{label:e===`tr`?`Kabul oranı`:`Acceptance rate`,value:`38%`,delta:`+4 pts`}),(0,B.jsx)(Ld,{label:e===`tr`?`Bugünkü randevu`:`Today appts`,value:`3`})]}),(0,B.jsxs)(`div`,{className:`split`,children:[(0,B.jsxs)(`div`,{children:[(0,B.jsx)(sp,{num:`01`,label:e===`tr`?`Size uygun açık brief’ler`:`Open briefs that match you`,action:(0,B.jsxs)(z,{to:`/studio/give-offer`,className:`mono`,children:[t(`common.viewAll`),` →`]})}),(0,B.jsx)(`div`,{className:`col gap-3`,children:Qd.slice(0,3).map(e=>(0,B.jsx)(Pd,{request:e},e.id))})]}),(0,B.jsxs)(`div`,{children:[(0,B.jsx)(sp,{num:`02`,label:e===`tr`?`Bugünün randevuları`:`Today’s appointments`,action:(0,B.jsxs)(z,{to:`/studio/calendar`,className:`mono`,children:[t(`common.viewAll`),` →`]})}),(0,B.jsx)(`div`,{className:`col gap-3`,children:ef.filter(e=>e.status===`today`||e.status===`upcoming`).map(e=>(0,B.jsx)(Bd,{ap:e},e.id))}),(0,B.jsx)(sp,{num:`03`,label:e===`tr`?`Son aktivite`:`Recent activity`}),(0,B.jsx)(`div`,{className:`col`,children:af.slice(0,4).map(e=>(0,B.jsx)(Rd,{n:e},e.id))})]})]})]})}function Kf(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`Dövmelerim`:`My tattoos`,subtitle:e===`tr`?`Yüklediğiniz tüm dövmeler.`:`Everything you have published.`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:18},children:[(0,B.jsx)(_f,{value:`all`,onChange:()=>{},options:[{value:`all`,label:e===`tr`?`Tümü`:`All`},...Kd.slice(0,5).map(t=>({value:t.key,label:t[e]}))]}),(0,B.jsx)(z,{to:`/studio/add-tattoo`,className:`btn btn-sm btn-accent`,children:e===`tr`?`＋ Dövme ekle`:`＋ Add tattoo`})]}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`,gap:20},children:Zd.map(t=>(0,B.jsxs)(`div`,{className:`col`,children:[(0,B.jsx)(jd,{design:t}),(0,B.jsxs)(`div`,{className:`row between`,style:{padding:`8px 4px`},children:[(0,B.jsx)(`button`,{className:`mono text-muted`,children:e===`tr`?`Düzenle`:`Edit`}),(0,B.jsx)(`button`,{className:`mono text-muted`,children:e===`tr`?`Sil`:`Delete`})]})]},t.id))})]})}function qf(){uf();let{lang:e}=V(),[t,n]=(0,g.useState)([`fine-line`,`botanical`]),[r,i]=(0,g.useState)(``),a=t.length>=3;return(0,B.jsx)(Af,{scope:`studio`,title:e===`tr`?`Dövme ekle`:`Add tattoo`,subtitle:e===`tr`?`Portföyünüze yeni bir parça ekleyin.`:`Add a new piece to your portfolio.`,children:(0,B.jsxs)(`div`,{className:`split`,children:[(0,B.jsxs)(`form`,{className:`col`,onSubmit:e=>e.preventDefault(),children:[(0,B.jsx)($,{label:e===`tr`?`Görsel`:`Image`,children:(0,B.jsx)(vf,{label:e===`tr`?`Görsel yükle`:`Upload image`})}),(0,B.jsx)($,{label:e===`tr`?`Başlık`:`Title`,children:(0,B.jsx)(mf,{placeholder:e===`tr`?`Sessiz çiçek`:`Quiet bloom`})}),(0,B.jsx)($,{label:e===`tr`?`Stil`:`Style`,children:(0,B.jsx)(gf,{options:Kd.map(t=>({value:t.key,label:t[e]}))})}),(0,B.jsxs)($,{label:e===`tr`?`Etiketler (en az 3)`:`Tags (min 3)`,hint:`${t.length} / 3 ${a?`✓`:``}`,children:[(0,B.jsx)(`div`,{className:`row wrap gap-2`,style:{marginBottom:8},children:t.map(e=>(0,B.jsxs)(`span`,{className:`tag`,onClick:()=>n(t.filter(t=>t!==e)),style:{cursor:`pointer`},children:[e,` ×`]},e))}),(0,B.jsx)(mf,{placeholder:e===`tr`?`Etiket girin ve Enter`:`Type a tag and press Enter`,value:r,onChange:e=>i(e.target.value),onKeyDown:e=>{e.key===`Enter`&&r.trim()&&(e.preventDefault(),n([...t,r.trim()]),i(``))}})]}),(0,B.jsx)($,{label:e===`tr`?`Şehir (opsiyonel)`:`City (optional)`,children:(0,B.jsx)(gf,{options:[{value:``,label:`—`},...qd.map(e=>({value:e,label:e}))]})}),(0,B.jsx)($,{label:e===`tr`?`Fiyat (opsiyonel)`:`Price (optional)`,children:(0,B.jsx)(mf,{type:`number`,placeholder:`₺`})}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:12},children:[(0,B.jsx)(`button`,{className:`btn btn-accent`,type:`submit`,disabled:!a,children:e===`tr`?`Yayınla`:`Publish`}),(0,B.jsx)(`button`,{className:`btn btn-ghost`,type:`button`,children:e===`tr`?`Taslak`:`Save draft`})]})]}),(0,B.jsxs)(`aside`,{className:`card col`,children:[(0,B.jsx)(Od,{id:`sw-3`,ratio:1.1,dark:!0}),(0,B.jsxs)(`div`,{className:`card-pad col gap-2`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Önizleme`:`Preview`}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:22,margin:0},children:`—`}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Aslı Vardar tarafından`:`by Aslı Vardar`}),(0,B.jsx)(`div`,{className:`row wrap gap-2`,children:t.map(e=>(0,B.jsx)(`span`,{className:`tag tag-soft`,children:e},e))})]})]})]})})}function Jf(){uf();let{lang:e}=V(),[t,n]=(0,g.useState)(Qd[0].id),r=Qd.find(e=>e.id===t);return(0,B.jsx)(Af,{scope:`studio`,title:e===`tr`?`Teklif ver`:`Give offer`,subtitle:e===`tr`?`Bir brief seçin ve teklifinizi hazırlayın.`:`Pick a brief and prepare your offer.`,children:(0,B.jsxs)(`div`,{className:`split`,children:[(0,B.jsxs)(`div`,{className:`col gap-3`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Brief seçin`:`Choose a brief`}),Qd.map(e=>(0,B.jsx)(`button`,{onClick:()=>n(e.id),style:{textAlign:`left`},children:(0,B.jsxs)(`div`,{className:`card card-pad col gap-1`,style:{borderColor:t===e.id?`var(--ink)`:`var(--hairline)`,background:t===e.id?`rgba(0,0,0,0.04)`:`transparent`},children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[`#`,e.id.toUpperCase(),` · `,e.style,` · `,e.city]}),(0,B.jsx)(`strong`,{children:e.title}),(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[`₺`,e.budgetMin.toLocaleString(),`–₺`,e.budgetMax.toLocaleString(),` · `,e.offerCount,` offers`]})]})},e.id))]}),(0,B.jsxs)(`form`,{className:`col`,onSubmit:e=>e.preventDefault(),children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Teklifiniz`:`Your offer`}),(0,B.jsx)(`h3`,{className:`display`,style:{fontSize:26,margin:`6px 0 4px`},children:r.title}),(0,B.jsx)(`p`,{className:`text-muted`,style:{margin:0},children:r.description}),(0,B.jsx)(`hr`,{className:`hr`,style:{marginBlock:20}}),(0,B.jsxs)(`div`,{className:`row gap-4 wrap`,children:[(0,B.jsx)($,{label:e===`tr`?`Fiyat (₺)`:`Price (₺)`,children:(0,B.jsx)(mf,{type:`number`,defaultValue:3200})}),(0,B.jsx)($,{label:e===`tr`?`Tahmini süre (saat)`:`Estimated duration (h)`,children:(0,B.jsx)(mf,{type:`number`,defaultValue:3})})]}),(0,B.jsxs)(`div`,{className:`row gap-4 wrap`,children:[(0,B.jsx)($,{label:e===`tr`?`Randevu tarihi`:`Appointment date`,children:(0,B.jsx)(mf,{type:`datetime-local`})}),(0,B.jsx)($,{label:e===`tr`?`Şehir`:`City`,children:(0,B.jsx)(gf,{options:qd.map(e=>({value:e,label:e}))})})]}),(0,B.jsx)($,{label:e===`tr`?`Mesaj`:`Offer message`,children:(0,B.jsx)(hf,{rows:4,placeholder:e===`tr`?`Brief’e nasıl yaklaşacağınızı anlatın…`:`Describe your approach to the brief…`})}),(0,B.jsx)($,{label:e===`tr`?`Tasarım / referans`:`Proposed design / reference`,children:(0,B.jsx)(vf,{label:e===`tr`?`Görsel yükle`:`Upload image`})}),(0,B.jsx)($,{label:e===`tr`?`Teklif geçerlilik`:`Offer validity`,children:(0,B.jsx)(gf,{options:[{value:`3`,label:`3 days`},{value:`7`,label:`7 days`},{value:`14`,label:`14 days`}]})}),(0,B.jsx)($,{label:e===`tr`?`Notlar / şartlar`:`Notes / terms`,children:(0,B.jsx)(hf,{rows:2})}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:12},children:[(0,B.jsx)(`button`,{className:`btn btn-accent`,type:`submit`,children:e===`tr`?`Teklifi tamamla`:`Complete offer`}),(0,B.jsx)(`button`,{className:`btn btn-ghost`,type:`button`,children:e===`tr`?`Taslak`:`Save draft`})]})]})]})})}function Yf(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`Tekliflerim`:`My offers`,subtitle:e===`tr`?`Gönderdiğiniz tüm teklifler.`:`Every offer you have sent.`,children:[(0,B.jsx)(`div`,{className:`row between center`,style:{marginBottom:18},children:(0,B.jsx)(_f,{value:`all`,onChange:()=>{},options:[{value:`all`,label:e===`tr`?`Tümü`:`All`},{value:`draft`,label:`Draft`},{value:`sent`,label:`Sent`},{value:`viewed`,label:`Viewed`},{value:`accepted`,label:`Accepted`},{value:`rejected`,label:`Rejected`},{value:`expired`,label:`Expired`}]})}),(0,B.jsx)(`div`,{className:`col gap-3`,children:$d.map(e=>(0,B.jsx)(Fd,{offer:e,accentOnAccepted:!0},e.id))})]})}function Xf(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`Sipariş takibi`:`Order tracking`,children:[(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:12,marginBottom:28},children:[{k:`request`,label:e===`tr`?`İstek geldi`:`Request created`,count:12},{k:`sent`,label:e===`tr`?`Teklif gönderildi`:`Offer sent`,count:7},{k:`accepted`,label:e===`tr`?`Müşteri kabul etti`:`Customer accepted`,count:3},{k:`booked`,label:e===`tr`?`Randevu oluştu`:`Appointment booked`,count:3},{k:`completed`,label:e===`tr`?`Tamamlandı`:`Completed`,count:24},{k:`reviewed`,label:e===`tr`?`Yorum bırakıldı`:`Reviewed`,count:18},{k:`cancelled`,label:e===`tr`?`İptal`:`Cancelled`,count:2}].map((e,t)=>(0,B.jsxs)(`div`,{className:`card card-pad col gap-2`,children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[String(t+1).padStart(2,`0`),` · `,e.label]}),(0,B.jsx)(`span`,{className:`display`,style:{fontSize:36,lineHeight:1,margin:0},children:e.count})]},e.k))}),(0,B.jsx)(`div`,{className:`col gap-3`,children:$d.map(e=>(0,B.jsx)(Fd,{offer:e},e.id))})]})}function Zf(){uf();let{lang:e}=V(),t=Array.from({length:35}),n=new Set([4,8,12,17,19,22,26]);return(0,B.jsx)(Af,{scope:`studio`,title:e===`tr`?`Randevu takvimi`:`Appointment calendar`,children:(0,B.jsxs)(`div`,{className:`split`,children:[(0,B.jsxs)(`div`,{className:`card card-pad`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:18},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Haziran 2026`:`June 2026`}),(0,B.jsxs)(`div`,{className:`row gap-2`,children:[(0,B.jsx)(`button`,{className:`mono`,children:`←`}),(0,B.jsx)(`button`,{className:`mono`,children:`→`})]})]}),(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(7, 1fr)`,gap:1,background:`var(--hairline)`},children:[[`M`,`T`,`W`,`T`,`F`,`S`,`S`].map(e=>(0,B.jsx)(`div`,{className:`mono text-muted`,style:{background:`var(--paper)`,padding:6,textAlign:`center`},children:e},e+Math.random())),t.map((e,t)=>{let r=t+1-2,i=r>0&&r<=30,a=n.has(r);return(0,B.jsxs)(`div`,{style:{background:`var(--paper)`,padding:8,minHeight:64,position:`relative`,opacity:i?1:.3},children:[(0,B.jsxs)(`div`,{className:`row between center`,children:[(0,B.jsx)(`span`,{className:`mono`,style:{color:t===14?`var(--accent)`:`var(--muted)`},children:i?r:``}),a&&(0,B.jsx)(`span`,{style:{width:6,height:6,borderRadius:999,background:`var(--accent)`}})]}),a&&(0,B.jsx)(`span`,{className:`mono`,style:{fontSize:10,color:`var(--ink)`,display:`block`,marginTop:6},children:r===12?`13:00`:r===22?`11:00`:`15:30`})]},t)})]})]}),(0,B.jsxs)(`div`,{className:`col`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Yaklaşan`:`Upcoming`}),(0,B.jsx)(`div`,{className:`col gap-3`,style:{marginTop:12},children:ef.map(e=>(0,B.jsx)(Bd,{ap:e},e.id))})]})]})})}function Qf(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`Kampanyalarım`:`My campaigns`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:18},children:[(0,B.jsx)(_f,{value:`all`,onChange:()=>{},options:[{value:`all`,label:e===`tr`?`Tümü`:`All`},{value:`active`,label:e===`tr`?`Aktif`:`Active`},{value:`passive`,label:e===`tr`?`Pasif`:`Passive`}]}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-accent`,children:e===`tr`?`＋ Kampanya`:`＋ Campaign`})]}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16},children:of.map(e=>(0,B.jsx)(Vd,{c:e},e.id))})]})}function $f(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`Sanatçılarım`:`My artists`,subtitle:e===`tr`?`Stüdyo bünyesindeki ekip.`:`The artists working under your studio.`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:18},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Karanfil Atölye · 3 sanatçı`:`Karanfil Atölye · 3 artists`}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-accent`,children:e===`tr`?`＋ Sanatçı ekle`:`＋ Add artist`})]}),(0,B.jsx)(`div`,{className:`card`,children:sf.map(e=>(0,B.jsx)(`div`,{style:{paddingInline:22},children:(0,B.jsx)(Wd,{m:e})},e.id))})]})}function ep(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`Dövme malzemeleri`:`Tattoo materials`,subtitle:e===`tr`?`Demo amaçlı ürün katalogu.`:`Sample product catalog (placeholder).`,children:[(0,B.jsx)(`div`,{className:`row between center`,style:{marginBottom:18},children:(0,B.jsx)(_f,{value:`all`,onChange:()=>{},options:[{value:`all`,label:e===`tr`?`Tümü`:`All`},{value:`ink`,label:`Ink`},{value:`needle`,label:`Needles`},{value:`machine`,label:`Machines`},{value:`aftercare`,label:`Aftercare`},{value:`hygiene`,label:`Hygiene`}]})}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(230px, 1fr))`,gap:20},children:cf.map(e=>(0,B.jsx)(Gd,{m:e},e.id))})]})}function tp(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`Yorumlar`:`Reviews`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:18},children:[(0,B.jsx)(_f,{value:`all`,onChange:()=>{},options:[{value:`all`,label:`All`},{value:`5`,label:`5 ★`},{value:`4`,label:`4 ★`},{value:`3`,label:`3 ★`}]}),(0,B.jsxs)(`div`,{className:`row gap-3`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Ortalama`:`Average`}),(0,B.jsx)(`span`,{className:`display`,style:{fontSize:24},children:`4.86`})]})]}),(0,B.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:16},children:tf.map(e=>(0,B.jsx)(Hd,{r:e},e.id))})]})}function np(){uf();let{lang:e}=V(),[t,n]=(0,g.useState)(nf[0].id),r=nf.find(e=>e.id===t),i=rf.filter(e=>e.conversationId===t);return(0,B.jsx)(Af,{scope:`studio`,title:e===`tr`?`Mesajlar`:`Messages`,children:(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`320px 1fr`,gap:0,border:`1px solid var(--hairline)`},children:[(0,B.jsxs)(`div`,{className:`col`,style:{borderRight:`1px solid var(--hairline)`},children:[(0,B.jsx)(`div`,{style:{padding:14,borderBottom:`1px solid var(--hairline)`},children:(0,B.jsx)(mf,{placeholder:`Search`})}),nf.map(e=>(0,B.jsx)(`button`,{onClick:()=>n(e.id),style:{display:`block`,width:`100%`,textAlign:`left`},children:(0,B.jsx)(zd,{c:e,active:e.id===t})},e.id))]}),(0,B.jsxs)(`div`,{className:`col`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{padding:16,borderBottom:`1px solid var(--hairline)`},children:[(0,B.jsxs)(`div`,{className:`row gap-3 center`,children:[(0,B.jsx)(Ad,{name:r.with,size:36}),(0,B.jsx)(`strong`,{children:r.with})]}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-ghost`,children:e===`tr`?`Profil`:`Profile`})]}),(0,B.jsx)(`div`,{className:`col gap-3`,style:{padding:18,minHeight:320},children:i.map(e=>(0,B.jsx)(`div`,{className:`row`,style:{justifyContent:e.fromMe?`flex-end`:`flex-start`},children:(0,B.jsxs)(`div`,{style:{maxWidth:420,padding:`10px 14px`,border:`1px solid var(--hairline)`,background:e.fromMe?`var(--ink)`:`var(--paper-warm)`,color:e.fromMe?`var(--paper)`:`var(--ink)`},children:[(0,B.jsx)(`span`,{style:{fontSize:14},children:e.text}),(0,B.jsx)(`span`,{className:`mono`,style:{display:`block`,marginTop:6,opacity:.6,fontSize:10},children:e.time})]})},e.id))}),(0,B.jsxs)(`div`,{className:`row gap-2 center`,style:{padding:14,borderTop:`1px solid var(--hairline)`},children:[(0,B.jsx)(mf,{placeholder:e===`tr`?`Mesaj yazın…`:`Write a message…`}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-primary`,children:e===`tr`?`Gönder`:`Send`})]})]})]})})}function rp(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`Bildirimler`:`Notifications`,children:[(0,B.jsxs)(`div`,{className:`row between center`,style:{marginBottom:18},children:[(0,B.jsx)(_f,{value:`all`,onChange:()=>{},options:[{value:`all`,label:`All`},{value:`offers`,label:`Offers`},{value:`msgs`,label:`Messages`},{value:`appts`,label:`Appointments`},{value:`campaign`,label:`Campaigns`},{value:`system`,label:`System`}]}),(0,B.jsx)(`button`,{className:`btn btn-sm btn-ghost`,children:e===`tr`?`Tümünü okundu işaretle`:`Mark all read`})]}),(0,B.jsx)(`div`,{className:`col`,children:af.map(e=>(0,B.jsx)(Rd,{n:e},e.id))})]})}function ip(){uf();let{lang:e}=V();return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`İstatistik`:`Statistics`,subtitle:e===`tr`?`Son 30 günün performansı.`:`Performance over the past 30 days.`,children:[(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:16},children:[(0,B.jsx)(Ld,{label:e===`tr`?`Profil görüntüleme`:`Profile views`,value:`12,480`,delta:`+8%`}),(0,B.jsx)(Ld,{label:e===`tr`?`Dövme görüntüleme`:`Tattoo views`,value:`38,602`,delta:`+22%`}),(0,B.jsx)(Ld,{label:e===`tr`?`Beğeni`:`Likes`,value:`4,210`,delta:`+11%`}),(0,B.jsx)(Ld,{label:e===`tr`?`Takipçi`:`Followers`,value:`6,734`,delta:`+124`}),(0,B.jsx)(Ld,{label:e===`tr`?`Gönderilen teklif`:`Sent offers`,value:`118`}),(0,B.jsx)(Ld,{label:e===`tr`?`Kabul edilen`:`Accepted`,value:`45`,delta:`38%`}),(0,B.jsx)(Ld,{label:e===`tr`?`Tamamlanan iş`:`Completed orders`,value:`24`}),(0,B.jsx)(Ld,{label:e===`tr`?`Çevrim oranı`:`Conversion rate`,value:`6.2%`,delta:`+0.8 pts`})]}),(0,B.jsxs)(`div`,{className:`card card-pad`,style:{marginTop:32},children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Haftalık görüntüleme`:`Views per week`}),(0,B.jsx)(ap,{})]})]})}function ap(){let e=[42,58,64,71,65,88,102,96,121,134,128,142],t=Math.max(...e);return(0,B.jsx)(`div`,{className:`row`,style:{alignItems:`flex-end`,gap:8,height:200,marginTop:18},children:e.map((n,r)=>(0,B.jsxs)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,alignItems:`center`,gap:6},children:[(0,B.jsx)(`span`,{style:{flex:1,width:`100%`,display:`flex`,alignItems:`flex-end`},children:(0,B.jsx)(`span`,{style:{display:`block`,width:`100%`,height:`${n/t*100}%`,background:r===e.length-1?`var(--accent)`:`var(--ink)`,opacity:r===e.length-1?1:.78}})}),(0,B.jsxs)(`span`,{className:`mono text-muted`,style:{fontSize:9},children:[`W`,r+1]})]},r))})}function op(){uf();let{lang:e}=V(),t=Jd[0];return(0,B.jsxs)(Af,{scope:`studio`,title:e===`tr`?`Profil`:`Profile`,children:[(0,B.jsx)(Ud,{name:t.name,role:e===`tr`?`Sanatçı · Karanfil Atölye`:`Artist · Karanfil Atölye`,city:t.city,rating:t.rating,followers:t.followers}),(0,B.jsxs)(`div`,{className:`split`,style:{marginTop:32},children:[(0,B.jsxs)(`form`,{className:`col`,onSubmit:e=>e.preventDefault(),children:[(0,B.jsx)($,{label:e===`tr`?`Profil fotoğrafı`:`Profile photo`,children:(0,B.jsx)(vf,{label:e===`tr`?`Görsel seç`:`Select image`})}),(0,B.jsx)($,{label:e===`tr`?`Profil adı`:`Profile name`,children:(0,B.jsx)(mf,{defaultValue:t.name})}),(0,B.jsx)($,{label:e===`tr`?`Kullanıcı adı`:`Handle`,children:(0,B.jsx)(mf,{defaultValue:t.handle})}),(0,B.jsx)($,{label:e===`tr`?`Biyografi`:`Bio`,children:(0,B.jsx)(hf,{rows:3,defaultValue:t.bio})}),(0,B.jsx)($,{label:e===`tr`?`Şehir`:`City`,children:(0,B.jsx)(gf,{options:qd.map(e=>({value:e,label:e})),defaultValue:t.city})}),(0,B.jsx)($,{label:e===`tr`?`Stiller`:`Styles`,children:(0,B.jsx)(_f,{value:t.styles[0],onChange:()=>{},options:Kd.map(t=>({value:t.key,label:t[e]}))})}),(0,B.jsx)($,{label:e===`tr`?`Başlangıç fiyatı`:`Minimum price`,children:(0,B.jsx)(mf,{type:`number`,defaultValue:t.minPrice})}),(0,B.jsxs)(`div`,{className:`row gap-3`,style:{marginTop:12},children:[(0,B.jsx)(`button`,{className:`btn btn-primary`,children:e===`tr`?`Kaydet`:`Save`}),(0,B.jsx)(`button`,{className:`btn btn-ghost`,type:`button`,children:e===`tr`?`Vazgeç`:`Discard`})]})]}),(0,B.jsxs)(`aside`,{className:`col gap-3`,children:[(0,B.jsx)(`span`,{className:`mono text-muted`,children:e===`tr`?`Hesap`:`Account`}),[[`My information`,`Bilgilerim`],[`Security & privacy`,`Güvenlik & gizlilik`],[`Connected accounts`,`Bağlı hesaplar`],[`Order history`,`Sipariş geçmişi`],[`Reviews`,`Yorumlar`],[`Customer service`,`Müşteri hizmetleri`],[`FAQ`,`SSS`],[`About`,`Hakkında`],[`Contact`,`İletişim`]].map(([t,n])=>(0,B.jsxs)(`div`,{className:`row between`,style:{padding:`14px 0`,borderBottom:`1px solid var(--hairline)`},children:[(0,B.jsx)(`span`,{children:e===`tr`?n:t}),(0,B.jsx)(`span`,{className:`mono text-muted`,children:`→`})]},t))]})]})]})}function sp({num:e,label:t,action:n}){return(0,B.jsxs)(`div`,{className:`row between center`,style:{margin:`36px 0 16px`,borderBottom:`1px solid var(--hairline)`,paddingBottom:10},children:[(0,B.jsxs)(`span`,{className:`mono text-muted`,children:[e,` · `,t]}),n]})}function cp(){let{pathname:e}=Le();return(0,g.useEffect)(()=>{window.scrollTo({top:0,behavior:`auto`})},[e]),null}function lp(){return(0,B.jsx)(Nt,{children:(0,B.jsxs)(bt,{children:[(0,B.jsx)(cp,{}),(0,B.jsxs)(ct,{children:[(0,B.jsx)(R,{path:`/`,element:(0,B.jsx)(df,{})}),(0,B.jsx)(R,{path:`/how-it-works`,element:(0,B.jsx)(bf,{})}),(0,B.jsx)(R,{path:`/artists`,element:(0,B.jsx)(xf,{})}),(0,B.jsx)(R,{path:`/designs`,element:(0,B.jsx)(Sf,{})}),(0,B.jsx)(R,{path:`/categories`,element:(0,B.jsx)(Cf,{})}),(0,B.jsx)(R,{path:`/login`,element:(0,B.jsx)(wf,{})}),(0,B.jsx)(R,{path:`/register`,element:(0,B.jsx)(Tf,{})}),(0,B.jsx)(R,{path:`/faq`,element:(0,B.jsx)(Ef,{})}),(0,B.jsx)(R,{path:`/about`,element:(0,B.jsx)(Df,{})}),(0,B.jsx)(R,{path:`/contact`,element:(0,B.jsx)(Of,{})}),(0,B.jsx)(R,{path:`/terms`,element:(0,B.jsx)(kf,{})}),(0,B.jsx)(R,{path:`/dashboard`,element:(0,B.jsx)(Nf,{})}),(0,B.jsx)(R,{path:`/dashboard/create-request`,element:(0,B.jsx)(Pf,{})}),(0,B.jsx)(R,{path:`/dashboard/requests`,element:(0,B.jsx)(Ff,{})}),(0,B.jsx)(R,{path:`/dashboard/offers`,element:(0,B.jsx)(If,{})}),(0,B.jsx)(R,{path:`/dashboard/messages`,element:(0,B.jsx)(Lf,{})}),(0,B.jsx)(R,{path:`/dashboard/notifications`,element:(0,B.jsx)(Rf,{})}),(0,B.jsx)(R,{path:`/dashboard/favorites`,element:(0,B.jsx)(zf,{})}),(0,B.jsx)(R,{path:`/dashboard/appointments`,element:(0,B.jsx)(Bf,{})}),(0,B.jsx)(R,{path:`/dashboard/tracking`,element:(0,B.jsx)(Vf,{})}),(0,B.jsx)(R,{path:`/dashboard/reviews`,element:(0,B.jsx)(Hf,{})}),(0,B.jsx)(R,{path:`/dashboard/profile`,element:(0,B.jsx)(Uf,{})}),(0,B.jsx)(R,{path:`/studio`,element:(0,B.jsx)(Gf,{})}),(0,B.jsx)(R,{path:`/studio/tattoos`,element:(0,B.jsx)(Kf,{})}),(0,B.jsx)(R,{path:`/studio/add-tattoo`,element:(0,B.jsx)(qf,{})}),(0,B.jsx)(R,{path:`/studio/give-offer`,element:(0,B.jsx)(Jf,{})}),(0,B.jsx)(R,{path:`/studio/offers`,element:(0,B.jsx)(Yf,{})}),(0,B.jsx)(R,{path:`/studio/tracking`,element:(0,B.jsx)(Xf,{})}),(0,B.jsx)(R,{path:`/studio/calendar`,element:(0,B.jsx)(Zf,{})}),(0,B.jsx)(R,{path:`/studio/campaigns`,element:(0,B.jsx)(Qf,{})}),(0,B.jsx)(R,{path:`/studio/artists`,element:(0,B.jsx)($f,{})}),(0,B.jsx)(R,{path:`/studio/materials`,element:(0,B.jsx)(ep,{})}),(0,B.jsx)(R,{path:`/studio/reviews`,element:(0,B.jsx)(tp,{})}),(0,B.jsx)(R,{path:`/studio/messages`,element:(0,B.jsx)(np,{})}),(0,B.jsx)(R,{path:`/studio/notifications`,element:(0,B.jsx)(rp,{})}),(0,B.jsx)(R,{path:`/studio/stats`,element:(0,B.jsx)(ip,{})}),(0,B.jsx)(R,{path:`/studio/profile`,element:(0,B.jsx)(op,{})}),(0,B.jsx)(R,{path:`*`,element:(0,B.jsx)(df,{})})]})]})})}(0,_.createRoot)(document.getElementById(`root`)).render((0,B.jsx)(g.StrictMode,{children:(0,B.jsx)(lp,{})}));