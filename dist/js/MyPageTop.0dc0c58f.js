(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["MyPageTop"],{"857a":function(e,n,t){var r=t("1d80"),c=/"/g;e.exports=function(e,n,t,a){var l=String(r(e)),i="<"+n;return""!==t&&(i+=" "+t+'="'+String(a).replace(c,"&quot;")+'"'),i+">"+l+"</"+n+">"}},9911:function(e,n,t){"use strict";var r=t("23e7"),c=t("857a"),a=t("af03");r({target:"String",proto:!0,forced:a("link")},{link:function(e){return c(this,"a","href",e)}})},af03:function(e,n,t){var r=t("d039");e.exports=function(e){return r((function(){var n=""[e]('"');return n!==n.toLowerCase()||n.split('"').length>3}))}},b398:function(e,n,t){"use strict";t.r(n);t("b0c0"),t("9911");var r=t("7a23"),c={class:"w-full bg-white shadow p-2"},a=Object(r["f"])('<div class="grid grid-cols-2 mb-4"><div class="col-span-1 mb-2"> ID: 123456 </div><div class="col-span-1"> ペルソナ太郎様 </div><div class="col-span-1"> かかりつけ医師 </div><div class="col-span-1"> 発毛するぞ 先生 </div></div>',1),l={class:"bg-gray-200 text-left pl-5 border border-black"},i={class:"flex-grow"},o=Object(r["h"])("svg",{class:"w-6 h-6",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[Object(r["h"])("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})],-1);function s(e,n,t,s,u,b){var d=Object(r["B"])("base-layout");return Object(r["t"])(),Object(r["d"])(d,null,{default:Object(r["H"])((function(){return[Object(r["h"])("div",c,[a,(Object(r["t"])(!0),Object(r["d"])(r["a"],null,Object(r["z"])(e.linkGroups,(function(n,t){return Object(r["t"])(),Object(r["d"])("div",{key:t},[Object(r["h"])("div",l,Object(r["D"])(n.name),1),Object(r["h"])("ul",null,[(Object(r["t"])(!0),Object(r["d"])(r["a"],null,Object(r["z"])(n.links,(function(c,a){return Object(r["t"])(),Object(r["d"])("li",{key:a,onClick:function(){e.router.push(c.link)},class:["cursor-pointer bg-white text-left px-5 border-r border-l border-black py-2 flex",{"border-b":a<n.links.length-1||t===e.linkGroups.length-1}]},[Object(r["h"])("div",i,Object(r["D"])(c.name),1),o],10,["onClick"])})),128))])])})),128))])]})),_:1})}var u=t("6c02"),b=Object(r["i"])({components:{},setup:function(){var e=Object(u["d"])(),n=[{name:"マイページ",links:[{name:"遺伝子タイプ",link:{name:"MyPageGenetics"}},{name:"定期便"},{name:"購入履歴"},{name:"発送状況"},{name:"決済情報"},{name:"アカウント情報"}]},{name:"お問い合わせ",links:[{name:"よくあるご質問"},{name:"お問い合わせ先"}]},{name:"その他",links:[{name:"利用規約"},{name:"プライバシーポリシー"},{name:"特定商取引法に基づく表記"}]}];return{router:e,linkGroups:n}}});b.render=s;n["default"]=b}}]);
//# sourceMappingURL=MyPageTop.0dc0c58f.js.map