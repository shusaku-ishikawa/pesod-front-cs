(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Signup2"],{"2bf5":function(e,t,r){"use strict";r.r(t);var n=r("7a23"),a={class:"relative"},u=Object(n["h"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 19l-7-7 7-7"},null,-1),c=Object(n["h"])("div",{class:""}," 新規登録 ",-1),o={class:"grid grid-cols-12"},i={key:0,class:"mb-5 text-red-600"},s={class:"text-center"},l=Object(n["h"])("div",null,[Object(n["h"])("a",{class:"cursor-pointer "},"確認メールが届かない場合は？")],-1);function p(e,t,r,p,f,m){var d=Object(n["B"])("p-input"),b=Object(n["B"])("top-layout");return Object(n["t"])(),Object(n["d"])(b,null,{title:Object(n["H"])((function(){return[Object(n["h"])("div",a,[(Object(n["t"])(),Object(n["d"])("svg",{onClick:t[1]||(t[1]=function(){e.router.push({name:"Signup1"})}),class:"absolute top-0 left-0 w-10 h-10 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[u])),c])]})),default:Object(n["H"])((function(){return[Object(n["h"])("div",o,[Object(n["h"])("form",{ref:"form",class:"py-5 col-span-12 sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-5 p-5",onSubmit:t[3]||(t[3]=Object(n["J"])((function(){return e.onSubmit&&e.onSubmit.apply(e,arguments)}),["prevent"]))},[""!=e.formError?(Object(n["t"])(),Object(n["d"])("div",i,Object(n["D"])(e.formError),1)):Object(n["e"])("",!0),Object(n["h"])(d,{class:"mb-10",label:"メールアドレス",id:"email",type:"email",required:!0,autocomplete:"email",modelValue:e.formData.email,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.formData.email=t}),rules:[e.formRequired]},null,8,["modelValue","rules"]),Object(n["h"])("div",s,[Object(n["h"])("button",{disabled:e.loading,type:"submit",class:"primary arrow w-64 mb-10"}," 確認メールを送信 ",8,["disabled"]),l])],544)])]})),_:1})}r("96cf");var f=r("1da1"),m=r("6c02"),d=r("5c69"),b=r("382a"),v=Object(n["i"])({components:{},setup:function(){var e=Object(m["d"])(),t=Object(b["a"])(),r=(t.getToken,t.remoteToken),a=t.sendSignupEmail,u=Object(n["y"])({email:""}),c=Object(n["y"])(null),o=Object(n["y"])(""),i=function(e){o.value=e,window.setTimeout((function(){o.value=""}),5e3)};Object(n["q"])((function(){r()}));var s=Object(n["y"])(!1),l=function(){var t=Object(f["a"])(regeneratorRuntime.mark((function t(r){var n,o,l,p;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!c.value){t.next=5;break}if(n=c.value.checkValidity(),n){t.next=5;break}return alert("not vaida"),t.abrupt("return");case 5:return t.prev=5,s.value=!0,t.next=9,a(u.value);case 9:o=t.sent,o.is_send?e.push({name:"Signup3",params:{email:u.value.email}}):alert(o.message),t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](5),console.log(t.t0),t.t0.response?(l=t.t0.response,l.status,p=l.data,console.log(p),i(JSON.stringify(p))):i("ネットワークエラー");case 17:s.value=!1;case 18:case"end":return t.stop()}}),t,null,[[5,13]])})));return function(e){return t.apply(this,arguments)}}();return{router:e,loading:s,form:c,formRequired:d["a"],formData:u,formError:o,onSubmit:l}}});v.render=p;t["default"]=v},"382a":function(e,t,r){"use strict";r.d(t,"a",(function(){return g}));r("99af"),r("96cf");var n=r("1da1"),a=r("2e44"),u=r("2ef0"),c=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"].get("/uuid/");case 2:return t=e.sent,r=t.data,console.log(r),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"].post("/customer_pre_create/",t);case 2:return r=e.sent,n=r.data,console.log(n),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),i=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"].get("/customer_activator/".concat(t));case 2:return r=e.sent,n=r.data,console.log(n),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,r){var n,c,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=Object(u["cloneDeep"])(r),n.address="".concat(n.street).concat(n.building),delete n.street,delete n.building,e.next=6,a["a"].put(t,n);case 6:return c=e.sent,o=c.data,console.log(o),e.abrupt("return",o);case 10:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),l=function(){var e=window.localStorage.getItem("token");if(null!=e)return JSON.parse(e)},p=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"].post("/auth/jwt/create/",t);case 2:return r=e.sent,n=r.data,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(e){window.localStorage.setItem("token",JSON.stringify(e))},m=function(){window.localStorage.removeItem("token")},d=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"].get("/auth/users/me/");case 2:return t=e.sent,r=t.data,e.abrupt("return",r.id);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"].get("/auth/users/".concat(t,"/"));case 2:return r=e.sent,n=r.data,console.log(n),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"].post("/signup/",t);case 2:r=e.sent,r.data;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function g(){return{sendSignupEmail:o,activateAccount:i,registerProfile:s,createToken:p,storeToken:f,getToken:l,remoteToken:m,getUserId:d,getProfile:b,signup:v,getUUID:c}}},"5c69":function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return a}));var n=function(e){if("string"===typeof e)return e?null:"必須項目です。"},a=function(e,t){return function(r){return e.test(r)?null:t}}}}]);
//# sourceMappingURL=Signup2.4c40234a.js.map