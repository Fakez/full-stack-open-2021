(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t.n(r),u=t(14),i=t.n(u),a=t(5),o=t(0),s=function(e){var n=e.filterRef,t=e.handleChange;return Object(o.jsxs)("div",{children:["search string: ",Object(o.jsx)("input",{ref:n,onChange:t})]})},d=function(e){var n=e.nameRef,t=e.phoneRef,r=e.handleSubmit;return Object(o.jsx)("div",{children:Object(o.jsxs)("form",{onSubmit:r,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{ref:n}),Object(o.jsx)("br",{}),"number: ",Object(o.jsx)("input",{ref:t})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})})},f=function(e){var n=e.person,t=e.deletePerson;return Object(o.jsxs)("li",{children:[n.name," ",n.number,Object(o.jsx)("button",{onClick:function(){return t(n.id)},children:"Delete"})]})},l=t(3),j=t.n(l),b="/api/persons",h=function(){return j.a.get(b).then((function(e){return e.data}))},O=function(e,n){return j.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},m=function(e){return j.a.post(b,e).then((function(e){return e.data}))},p=function(e){return j.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))};var v=function(){var e=Object(r.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],u=Object(r.useState)([]),i=Object(a.a)(u,2),l=i[0],j=i[1],b=Object(r.useRef)(null),v=Object(r.useRef)(),x=Object(r.useRef)();Object(r.useEffect)((function(){h().then((function(e){c(e),j(e)}))}),[]);var g=function(e){window.confirm("Delete?")&&(p(e),c(t.filter((function(n){return n.id!==e}))),j(t.filter((function(n){return n.id!==e}))),b.current.value=null)};return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(s,{filterRef:b,handleChange:function(e){var n=e.target.value.toLowerCase(),r=""===n?t:t.filter((function(e){return e.name.toLowerCase().includes(n)}));j(r)}}),Object(o.jsx)("h2",{children:"Add Persons"}),Object(o.jsx)(d,{nameRef:v,phoneRef:x,handleSubmit:function(e){e.preventDefault();var n=v.current.value,r=x.current.value;if(""!==n&&""!==r){var u={id:t.length+1,name:n,number:r},i=t.filter((function(e){return e.name.toLowerCase()===u.name.toLowerCase()}));if(i.length>0){if(window.confirm("Dude already in list, update number?")){var a={id:i[0].id,name:i[0].name,number:r};O(a.id,a).then((function(e){c(t.map((function(n){return n.id!==a.id?n:e}))),j(t.map((function(n){return n.id!==a.id?n:e})))}))}}else m(u).then((function(e){c(t.concat(e)),j(t.concat(e))}));v.current.value=null,x.current.value=null}}}),Object(o.jsx)("h2",{children:"Numbers"}),Object(o.jsx)("ul",{children:Object(o.jsx)(o.Fragment,{children:l.map((function(e){return Object(o.jsx)(f,{person:e,deletePerson:g},e.id)}))})})]})};i.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(v,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.f0b7e435.chunk.js.map