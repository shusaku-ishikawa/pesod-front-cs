(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54b3b3a3"],{"1b81":function(e,t,r){"use strict";r("69e0")},"4fad":function(e,t,r){var n=r("23e7"),o=r("6f53").entries;n({target:"Object",stat:!0},{entries:function(e){return o(e)}})},6344:function(e,t,r){e.exports=r.p+"img/pesod_logo_doctor.dad27519.png"},"69e0":function(e,t,r){},"6f53":function(e,t,r){var n=r("83ab"),o=r("df75"),a=r("fc6a"),c=r("d1e7").f,i=function(e){return function(t){var r,i=a(t),s=o(i),u=s.length,l=0,d=[];while(u>l)r=s[l++],n&&!c.call(i,r)||d.push(e?[r,i[r]]:i[r]);return d}};e.exports={entries:i(!0),values:i(!1)}},d81d:function(e,t,r){"use strict";var n=r("23e7"),o=r("b727").map,a=r("1dde"),c=a("map");n({target:"Array",proto:!0,forced:!c},{map:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})},f3ce:function(e,t,r){"use strict";r.r(t);var n=r("7a23"),o=r("6344"),a=r.n(o),c=Object(n["withScopeId"])("data-v-83d8b45e");Object(n["pushScopeId"])("data-v-83d8b45e");var i={class:"bg-image h-screen w-screen table-cell align-middle"},s={class:"mx-auto rounded p-5 w-80"},u=Object(n["createVNode"])("img",{src:a.a,alt:"",class:"mb-5"},null,-1),l={key:0,class:"mb-5 text-red-600"},d={class:"text-center"},f=Object(n["createVNode"])("div",{class:"inline-block"}," ログイン ",-1),p=Object(n["createVNode"])("svg",{class:" w-6 h-6 float-right",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[Object(n["createVNode"])("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})],-1),b=Object(n["createVNode"])("div",null,[Object(n["createVNode"])("a",{class:"cursor-pointer "},"パスワードをお忘れの方はこちら")],-1);Object(n["popScopeId"])();var m=c((function(e,t,r,o,a,c){var m=Object(n["resolveComponent"])("p-input");return Object(n["openBlock"])(),Object(n["createBlock"])("div",i,[Object(n["createVNode"])("div",s,[u,Object(n["createVNode"])("form",{class:" ",disabled:e.loading,ref:"from",method:"post",onSubmit:t[4]||(t[4]=Object(n["withModifiers"])((function(){return e.onLogin&&e.onLogin.apply(e,arguments)}),["prevent"]))},[""!=e.loginError?(Object(n["openBlock"])(),Object(n["createBlock"])("div",l,Object(n["toDisplayString"])(e.loginError),1)):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(m,{class:"mb-10",label:"メールアドレス",id:"email",type:"email",required:!0,autocomplete:"email",modelValue:e.formData.email,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.formData.email=t}),placeholder:"example@pesod.com",error:e.errors.email},null,8,["modelValue","error"]),Object(n["createVNode"])(m,{class:"mb-12",label:"パスワード",autocomplete:"current-password",id:"password",type:e.isPasswordHidden?"password":"text",modelValue:e.formData.password,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.formData.password=t}),hidable:!0,isHidden:e.isPasswordHidden,"onUpdate:isHidden":t[3]||(t[3]=function(t){return e.isPasswordHidden=t}),placeholder:"英数字8文字以上で入力",error:e.errors.password},null,8,["type","modelValue","isHidden","error"]),Object(n["createVNode"])("div",d,[Object(n["createVNode"])("button",{disabled:e.loading,type:"submit",class:"primary mb-10 w-72 sm:block sm:w-full"},[f,p],8,["disabled"]),b])],40,["disabled"])])])})),v=r("1da1"),w=(r("96cf"),r("6c02"));function g(e){if(Array.isArray(e))return e}r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0");function j(e,t){var r=e&&("undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=r){var n,o,a=[],c=!0,i=!1;try{for(r=r.call(e);!(c=(n=r.next()).done);c=!0)if(a.push(n.value),t&&a.length===t)break}catch(s){i=!0,o=s}finally{try{c||null==r["return"]||r["return"]()}finally{if(i)throw o}}return a}}var O=r("06c5");function h(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function y(e,t){return g(e)||j(e,t)||Object(O["a"])(e,t)||h()}r("d81d"),r("4fad");var x=function(e){if("string"===typeof e)return e?null:"必須項目です。"},k=function(e,t){return function(r){return e.test(r)?null:t}},V=function(e){return k(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"メールアドレスの形式が不正です。")(e)},N=function(e,t,r){var n=!1;return Object.entries(t).map((function(t){var o=y(t,2),a=o[0],c=o[1],i="";r.value[a]="",c.map((function(t){if(!i){var r=t(e[a]);r&&(i=r,n=!0)}})),i&&(r.value[a]=i)})),!n},D=r("382a"),S=r("2e44");function P(){var e=Object(S["a"])(),t=e.client,r=Object(n["ref"])([]),o=Object(n["ref"])(null),a=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.get("/doctors/");case 2:return r=e.sent,n=r.data,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),c=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(r){var n,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.get("/doctor/".concat(r));case 2:return n=e.sent,o=n.data,e.abrupt("return",o);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{doctor:o,doctors:r,getDoctor:c,fetchDoctors:a}}var H=Object(n["defineComponent"])({components:{},setup:function(){var e=Object(w["d"])(),t=Object(D["a"])(),r=t.createToken,o=t.storeToken,a=t.removeToken,c=t.getUserId,i=(t.getProfile,t.storeProfile),s=(t.removeProfile,t.getProfileFromLS,P()),u=s.getDoctor,l=Object(n["ref"])({email:"",password:""}),d=Object(n["ref"])({email:"",password:""}),f={email:[x,V],password:[x]},p=Object(n["ref"])(null),b=Object(n["ref"])(""),m=function(e){b.value=e,window.setTimeout((function(){b.value=""}),5e3)};Object(n["onMounted"])((function(){a()}));var g=Object(n["ref"])(!1),j=function(){var t=Object(v["a"])(regeneratorRuntime.mark((function t(n){var a,s,p,b,v,w;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(N(l.value,f,d)){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,g.value=!0,t.next=6,r(l.value);case 6:return a=t.sent,o(a),console.log(a.access),t.next=11,c();case 11:return s=t.sent,t.next=14,u(s);case 14:p=t.sent,console.log(p),i(p),e.push({name:"DoctorDashboard"}),t.next=24;break;case 20:t.prev=20,t.t0=t["catch"](2),console.log(t.t0),t.t0.response?(b=t.t0.response,v=b.status,w=b.data,console.log(w),m(v>=400&&v<500?"ログインに失敗しました。":JSON.stringify(w))):m("ネットワークエラー");case 24:g.value=!1;case 25:case"end":return t.stop()}}),t,null,[[2,20]])})));return function(e){return t.apply(this,arguments)}}(),O=Object(n["ref"])(!0);return{loading:g,form:p,formRequired:x,formData:l,loginError:b,onLogin:j,isPasswordHidden:O,errors:d}}});r("1b81");H.render=m,H.__scopeId="data-v-83d8b45e";t["default"]=H}}]);
//# sourceMappingURL=chunk-54b3b3a3.ee8638ad.js.map