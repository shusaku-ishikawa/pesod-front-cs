(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["StoreProductDetail"],{"7b03":function(t,e,r){"use strict";r.r(e);r("b0c0");var c=r("7a23"),n={class:"flex items-center mr-auto"},u=Object(c["h"])("div",null," 購入 ",-1),a={key:0,class:"flex flex-col flex-grow bg-white"},o={class:"mx-auto p-5"},s={class:"text-lg mb-5"},i={class:"text-sm text-left"};function l(t,e,r,l,b,d){var p=Object(c["B"])("page-title-back"),j=Object(c["B"])("page-title"),O=Object(c["B"])("base-layout");return Object(c["t"])(),Object(c["d"])(O,null,{title:Object(c["H"])((function(){return[Object(c["h"])(j,null,{default:Object(c["H"])((function(){return[Object(c["h"])("div",n,[Object(c["h"])(p,{onClick:e[1]||(e[1]=function(){t.router.push({name:"StoreProductList"})})}),u])]})),_:1})]})),default:Object(c["H"])((function(){return[t.product?(Object(c["t"])(),Object(c["d"])("div",a,[Object(c["h"])("div",o,[Object(c["h"])("img",{src:t.product.image,alt:"",class:"w-36 h-36"},null,8,["src"]),Object(c["h"])("div",s,[Object(c["h"])("div",null,Object(c["D"])(t.product.name),1),Object(c["h"])("div",null,Object(c["D"])(t.product.price.toLocaleString())+"円 ",1)]),Object(c["h"])("div",i,Object(c["D"])(t.product.usage),1)])])):Object(c["e"])("",!0)]})),_:1})}r("d3b7"),r("25f0"),r("96cf");var b=r("1da1"),d=r("6c02"),p=r("c5e3"),j=Object(c["i"])({components:{},setup:function(){var t=Object(d["c"])(),e=Object(d["d"])(),r=t.params.id.toString(),n=Object(p["a"])(),u=n.product,a=n.getProduct;return Object(c["q"])(Object(b["a"])(regeneratorRuntime.mark((function t(){var e,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a(r);case 3:u.value=t.sent,t.next=10;break;case 6:t.prev=6,t.t0=t["catch"](0),e=t.t0.response,e?(c=e.data,console.error(c)):console.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,6]])})))),{router:e,product:u}}});j.render=l;e["default"]=j},c5e3:function(t,e,r){"use strict";r.d(e,"a",(function(){return s}));r("96cf");var c=r("1da1"),n=r("7a23"),u=r("2e44"),a=function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){var e,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u["a"].get("/products/");case 2:return e=t.sent,r=e.data,console.log(r),t.abrupt("return",r.results);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),o=function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){var r,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u["a"].get("/products/".concat(e));case 2:return r=t.sent,c=r.data,console.log(c),t.abrupt("return",c);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function s(){var t=Object(n["y"])(null),e=Object(n["y"])([]);return{product:t,products:e,fetchProducts:a,getProduct:o}}}}]);
//# sourceMappingURL=StoreProductDetail.d0c99bec.js.map