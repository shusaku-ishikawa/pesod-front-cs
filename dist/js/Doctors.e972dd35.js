(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Doctors"],{"1c8d":function(e,r,t){"use strict";t.r(r);var n=t("7a23");function c(e,r,t,c,a,u){var o=Object(n["resolveComponent"])("router-view");return e.myPrescript?(Object(n["openBlock"])(),Object(n["createBlock"])(o,{key:0,myPrescript:e.myPrescript},null,8,["myPrescript"])):Object(n["createCommentVNode"])("",!0)}t("96cf");var a=t("1da1"),u=t("da56"),o=Object(n["defineComponent"])({components:{},setup:function(){var e=Object(u["a"])(),r=e.myPrescript,t=e.getPrescript;return Object(n["onMounted"])(Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t();case 2:r.value=e.sent;case 3:case"end":return e.stop()}}),e)})))),{myPrescript:r}}});o.render=c;r["default"]=o},d81d:function(e,r,t){"use strict";var n=t("23e7"),c=t("b727").map,a=t("1dde"),u=t("ae40"),o=a("map"),i=u("map");n({target:"Array",proto:!0,forced:!o||!i},{map:function(e){return c(this,e,arguments.length>1?arguments[1]:void 0)}})},da56:function(e,r,t){"use strict";t.d(r,"a",(function(){return u}));t("d81d"),t("96cf");var n=t("1da1"),c=t("7a23"),a=t("2e44");function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"customer",r=Object(a["a"])(e),t=r.client,u=Object(c["ref"])(null),o=Object(c["ref"])([]),i=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.get("/prescript/");case 2:return r=e.sent,n=r.data,console.log(n),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),s=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.get("/prescript/interview_fix");case 2:return r=e.sent,n=r.data,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r){var n,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.patch("/prescript/select_doctor",{doctor:r});case 2:return n=e.sent,c=n.data,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),f=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.get("/prescripts/");case 2:return r=e.sent,n=r.data,console.log(n),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r,n){var c,a,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return c=n.map((function(e){return{product:e.id}})),console.log(c),e.next=4,t.patch("/prescribe/".concat(r),{products:c});case 4:return a=e.sent,u=a.data,console.log(u),e.abrupt("return",u);case 8:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),m=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.patch("/prescript/exam_fix",{});case 2:return r=e.sent,n=r.data,console.log(n),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),l=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r){var n,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.delete("/prescribe/".concat(r));case 2:return n=e.sent,c=n.data,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return{myPrescript:u,prescripts:o,getPrescript:i,fixInterview:s,selectDoctor:p,fetchPrescripts:f,setPrescriptProducts:d,acceptPrescriptProducts:m,deletePrescriptProducts:l}}}}]);
//# sourceMappingURL=Doctors.e972dd35.js.map