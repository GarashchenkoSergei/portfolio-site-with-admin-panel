(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{559:function(e,t,i){"use strict";i.d(t,"b",function(){return c}),i.d(t,"a",function(){return a});var s=i(107);const c=e=>{const t=new FileReader;return new Promise((i,s)=>{try{t.readAsDataURL(e),t.onloadend=()=>{i(t.result)}}catch(e){throw new Error("Ошибка при чтении файла")}})},a=e=>{return`${s.a.defaults.baseURL}/${e}`}},564:function(e,t,i){},575:function(e,t,i){"use strict";var s=i(564);i.n(s).a},585:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"content-feedback__item"},[i("user",{attrs:{user:e.constructUserObj(e.review)}}),i("div",{staticClass:"feedback-item__content"},[i("p",{staticClass:"feedback-item__text"},[e._v(e._s(e.review.text))]),i("div",{staticClass:"item__edit"},[i("div",{staticClass:"edit"},[i("a",{staticClass:"edit-button",on:{click:e.updateWork}},[i("div",{staticClass:"edit-change__text"},[e._v("Edit")]),i("div",{staticClass:"edit-change__icon"},[i("icon-base",{attrs:{width:"14",height:"14","icon-name":"pen","icon-color":"blue",viewBox:"0 0 528.899 528.899"}},[i("icon-pen",{staticClass:"icon-pen"})],1)],1)]),i("a",{staticClass:"edit-button",on:{click:e.removeExistedReview}},[i("div",{staticClass:"edit-change__text"},[e._v("Delete")]),i("div",{staticClass:"edit-change__icon"},[i("icon-base",{attrs:{width:"13",height:"13","icon-name":"cross","icon-color":"#bf2929",viewBox:"0 0 1000 1000"}},[i("icon-cross",{staticClass:"icon-cross"})],1)],1)])])])])],1)};s._withStripped=!0;var c=i(559),a=i(10),n=i(28),o=i(37),r=i(45),d={props:{review:Object},components:{IconBase:n.default,IconCross:o.default,IconPen:r.a,user:()=>i.e(10).then(i.bind(null,589))},methods:{...Object(a.b)("feedback",["removeReview"]),...Object(a.c)("feedback",["SET_CURRENT_REVIEW"]),constructUserObj:e=>({name:e.author,occ:e.occ,avatar:Object(c.a)(e.photo)}),updateWork(){this.SET_CURRENT_REVIEW(this.review.id),this.$emit("updateWork")},async removeExistedReview(){if(!0===confirm("Delete review?"))try{await this.removeReview(this.review.id)}catch(e){alert("Error during review delete")}}}},l=(i(575),i(3)),u=Object(l.a)(d,s,[],!1,null,"41efe1d5",null);u.options.__file="src/admin/components/feedback-block.vue";t.default=u.exports}}]);