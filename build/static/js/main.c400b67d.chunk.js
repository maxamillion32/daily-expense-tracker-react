(this["webpackJsonpmoney-tracker"]=this["webpackJsonpmoney-tracker"]||[]).push([[0],{14:function(e,t,n){e.exports={menu:"Menu_menu__g1b0Y",wrapper:"Menu_wrapper__2i6Q0",active:"Menu_active__1T3aC",menuAddBtn:"Menu_menuAddBtn__1bjf1",addBtnEnterActive:"Menu_addBtnEnterActive__2oVJa",addBtnEnterDone:"Menu_addBtnEnterDone__1MBUj"}},15:function(e,t,n){e.exports={form:"Form_form__2wVGg",dialogWrapper:"Form_dialogWrapper__Asoa1",dialog:"Form_dialog__3K11j",dialogTypeWrapper:"Form_dialogTypeWrapper__3UED0",dialogType:"Form_dialogType___T7YX",addFormEnterActive:"Form_addFormEnterActive__3ky2w",showForm:"Form_showForm__3Ut7i",addFormExitActive:"Form_addFormExitActive__3REkf"}},24:function(e,t,n){e.exports={Input:"Input_Input__3r5Ke"}},25:function(e,t,n){e.exports={Button:"Button_Button__3gFiX"}},27:function(e,t,n){e.exports={Select:"Select_Select__2qylT"}},41:function(e,t,n){"use strict";n.r(t);var a,r,c,o,i,s=n(0),u=n.n(s),l=n(12),d=n.n(l),j=n(13),b=n(6),f=n(2),m=n(5),O=n(3),h=n(4),p=n.n(h),v=n(8),g=n(7),x=n(16),_=n(17),C=n(11),y=n(20),w=[{id:1,title:"Salary"},{id:2,title:"Rent"},{id:3,title:"Groceries"},{id:4,title:"Transportation & parking fees"},{id:5,title:"Clothing & shoes"},{id:6,title:"Family"},{id:7,title:"Coffee"},{id:8,title:"Health"}],T=[{id:1,title:"Cash",balance:2e3,startBalance:0,archive:!1},{id:2,title:"Postbank",balance:55e3,startBalance:0,archive:!1},{id:3,title:"N26",balance:55e4,startBalance:0,archive:!1}],A=function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e},N=function(e){e=e.slice();for(var t=1,n=[];t--;)n.push.apply(n,Object(C.a)(e.splice(A(0,e.length-1),1)));return n[0]},E=function(){var e=(new Date).getTime(),t=e-new Date(7776e6).getTime();return new Date(t+Math.random()*(e-t)).toISOString().slice(0,-14)},F=(a=T,r=w,Array(20).fill({}).map((function(){return{id:Object(y.a)(6),sum:A(1,500),date:E(),outcome:Boolean(Math.round(Math.random())),account:N(a),category:N(r)}}))),S=function(){function e(){Object(x.a)(this,e),this.categories=w}return Object(_.a)(e,[{key:"getAll",value:function(){var e=Object(v.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.categories,e.abrupt("return",t);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),M=new S,k=Object(g.b)("categories/loadData",Object(v.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.getAll();case 2:return t=e.sent,e.next=5,t;case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))),B=Object(g.b)("categories/addData",function(){var e=Object(v.a)(p.a.mark((function e(t){var n,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.create(t);case 2:return n=e.sent,e.next=5,n;case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),D=Object(g.c)({name:"categories",initialState:{allCategories:[],newCategory:{title:""},isLoading:!1,hasError:!1,isPending:!1,isFailedToCreate:!1},reducers:{addCategory:function(e,t){return Object(O.a)(Object(O.a)({},e),{},{newCategory:Object(O.a)(Object(O.a)({},e.newCategory),{},{title:t.payload})})}},extraReducers:(c={},Object(m.a)(c,k.pending,(function(e){e.isLoading=!0,e.hasError=!1})),Object(m.a)(c,k.fulfilled,(function(e,t){e.allCategories=t.payload,e.isLoading=!1,e.hasError=!1})),Object(m.a)(c,k.rejected,(function(e){e.isLoading=!1,e.hasError=!0})),Object(m.a)(c,B.pending,(function(e){e.isPending=!0,e.isFailedToCreate=!1})),Object(m.a)(c,B.fulfilled,(function(e){e.newCategory={title:""},e.isPending=!1,e.isFailedToCreate=!1})),Object(m.a)(c,B.rejected,(function(e){e.isPending=!1,e.isFailedToCreate=!0})),c)}),L=function(e){return e.categories.allCategories},V=(D.actions.addCategory,D.reducer),I=function(){function e(){Object(x.a)(this,e),this.accounts=T}return Object(_.a)(e,[{key:"getAll",value:function(){var e=Object(v.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.accounts,e.abrupt("return",t);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),P=new I,R=Object(g.b)("accounts/loadData",Object(v.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.getAll();case 2:return t=e.sent,e.next=5,t;case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))),q=Object(g.b)("accounts/addData",function(){var e=Object(v.a)(p.a.mark((function e(t){var n,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("\ud83d\ude80 ~ file: accounts-slice.js ~ line 17 ~ newAccount",t),e.next=3,P.create(t);case 3:return n=e.sent,e.next=6,n;case 6:return a=e.sent,e.abrupt("return",a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),U=Object(g.c)({name:"accounts",initialState:{allAccounts:[],newAccount:{title:"",balance:0,startBalance:0,archive:!1},isLoading:!1,hasError:!1,isPending:!1,isFailedToCreate:!1},reducers:{addAccount:function(e,t){return Object(O.a)(Object(O.a)({},e),{},{newAccount:Object(O.a)(Object(O.a)({},e.newAccount),{},{title:t.payload})})}},extraReducers:(o={},Object(m.a)(o,R.pending,(function(e){e.isLoading=!0,e.hasError=!1})),Object(m.a)(o,R.fulfilled,(function(e,t){e.allAccounts=t.payload,e.isLoading=!1,e.hasError=!1})),Object(m.a)(o,R.rejected,(function(e){e.isLoading=!1,e.hasError=!0})),Object(m.a)(o,q.pending,(function(e){e.isPending=!0,e.isFailedToCreate=!1})),Object(m.a)(o,q.fulfilled,(function(e){e.newAccount={title:"",balance:0,startBalance:0,archive:!1},e.isPending=!1,e.isFailedToCreate=!1})),Object(m.a)(o,q.rejected,(function(e){e.isPending=!1,e.isFailedToCreate=!0})),o)}),W=function(e){return e.accounts.allAccounts},J=(U.actions.addAccount,U.reducer),Y=n(10),G=n(42),K=n(14),X=n.n(K),H=function(){function e(){Object(x.a)(this,e),this.transactions=F}return Object(_.a)(e,[{key:"getAll",value:function(){var e=Object(v.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.transactions,e.abrupt("return",t);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),Q=new H,z=Object(g.c)({name:"searchTerm",initialState:"",reducers:{setSearchTerm:function(e,t){return t.payload},clearSearchTerm:function(e,t){return""}}}),Z=function(e){return e.searchTerm},$=z.actions,ee=$.setSearchTerm,te=$.clearSearchTerm,ne=z.reducer,ae=Object(g.b)("transactions/loadData",Object(v.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.getAll();case 2:return t=e.sent,e.next=5,t;case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))),re=Object(g.c)({name:"transactions",initialState:{allTransactions:[],newTransaction:{id:Object(y.a)(6),sum:"",date:(new Date).toISOString().slice(0,-14),outcome:!0,account:[],category:[]},isLoading:!1,hasError:!1},reducers:{setUserInput:function(e,t){var n=t.payload,a=n.name,r=n.value;return"outcome"===a&&(r=!e.newTransaction.outcome),"sum"===a&&(r=0===+r?"":+r),Object(O.a)(Object(O.a)({},e),{},{newTransaction:Object(O.a)(Object(O.a)({},e.newTransaction),{},Object(m.a)({},a,r))})},setCategory:function(e,t){return Object(O.a)(Object(O.a)({},e),{},{newTransaction:Object(O.a)(Object(O.a)({},e.newTransaction),{},{category:t.payload})})},setAccount:function(e,t){return Object(O.a)(Object(O.a)({},e),{},{newTransaction:Object(O.a)(Object(O.a)({},e.newTransaction),{},{account:t.payload})})},addTransaction:function(e,t){return Object(O.a)(Object(O.a)({},e),{},{allTransactions:[].concat(Object(C.a)(e.allTransactions),Object(C.a)(t.payload))})},resetState:function(e,t){return Object(O.a)(Object(O.a)({},e),{},{newTransaction:{id:(new Date).getTime(),sum:"",date:(new Date).toISOString().slice(0,-14),outcome:!0,account:[],category:[]}})},deleteTransaction:function(e,t){var n=t.payload,a=e.allTransactions.filter((function(e){return e.id!==n}));return Object(O.a)(Object(O.a)({},e),{},{allTransactions:a})}},extraReducers:(i={},Object(m.a)(i,ae.pending,(function(e){e.isLoading=!0,e.hasError=!1})),Object(m.a)(i,ae.fulfilled,(function(e,t){e.allTransactions=t.payload,e.newTransaction=Object(O.a)({},e.newTransaction),e.isLoading=!1,e.hasError=!1,e.showDelete=!1})),Object(m.a)(i,ae.rejected,(function(e){e.isLoading=!1,e.hasError=!0})),i)}),ce=function(e){return e.transactions.allTransactions},oe=function(e){return e.transactions.newTransaction},ie=function(e){var t=ce(e),n=Z(e);return t.filter((function(e){return e.category.title.toLowerCase().includes(n.toLowerCase())})).sort((function(e,t){return new Date(t.date).getTime()-new Date(e.date).getTime()}))},se=re.actions,ue=se.setUserInput,le=se.setCategory,de=se.setAccount,je=(se.setTransactionId,se.addTransaction),be=se.resetState,fe=se.deleteTransaction,me=re.reducer,Oe=n(15),he=n.n(Oe),pe=n(24),ve=n.n(pe),ge=n(1);function xe(e){var t=e.valid,n=e.touched,a=e.shouldValidate;return!t&&a&&n}var _e=function(e){var t=e.type||"text",n=[ve.a.Input],a="".concat(t,"-").concat(Math.random());return xe(e)&&n.push(ve.a.invalid),Object(ge.jsxs)("div",{className:n.join(" "),children:[Object(ge.jsx)("input",{type:t,name:e.name,placeholder:e.placeholder,id:a,value:e.value,onChange:e.onChange}),Object(ge.jsx)("label",{htmlFor:a,children:e.label}),xe(e)?Object(ge.jsx)("span",{children:e.errorMessage||"Enter correct value"}):null]})},Ce=n(27),ye=n.n(Ce);function we(e){var t=e.valid,n=e.touched,a=e.shouldValidate;return!t&&a&&n}var Te=function(e){var t=[ye.a.Select];return Object(ge.jsx)("div",{className:t,children:Object(ge.jsxs)("select",{onChange:e.onChange,children:[Object(ge.jsx)("option",{value:"",hidden:!0,children:e.defaultOption}),e.options.map((function(e){return Object(ge.jsx)("option",{value:e.title,children:e.title},e.id)})),we(e)?Object(ge.jsx)("span",{children:e.errorMessage||"Enter correct value"}):null]})})},Ae=n(25),Ne=n.n(Ae),Ee=function(e){var t=[Ne.a.Button,Ne.a[e.type]].join(" ");return Object(ge.jsx)("button",{onClick:e.onClick,className:t,disabled:e.disabled,children:e.children})};function Fe(e,t){return Object(O.a)(Object(O.a)({},e),{},{validation:t,valid:!t,touched:!1,value:""})}function Se(e){var t=!0;for(var n in e)e.hasOwnProperty(n)&&(t=e[n].valid&&t);return t}function Me(e,t,n){var a=Object(O.a)({},n),r=Object(O.a)({},a[e]);return r.touched=!0,r.value=t,r.valid=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!t)return!0;var n=!0;return t.required&&(n=""!==e.trim()&&n),n}(r.value,r.validation),a[e]=r,a}var ke=function(e){var t=e.categories,n=e.accounts,a=e.onClickAddBtn,r=e.setOnClickAddBtn,c=Object(b.c)(oe),o=c.sum,i=c.date,l=Object(b.b)(),d=Object(s.useState)({isFormValid:!1,formControls:{sum:Fe({errorMessage:"Please fill out this field"},{required:!0}),date:Fe({errorMessage:"Choose a date please"},{required:!0}),category:Fe({errorMessage:"Choose a category please"},{required:!0}),account:Fe({errorMessage:"Choose an account please"},{required:!0})}}),j=Object(Y.a)(d,2),f=j[0],m=j[1];Object(s.useEffect)((function(){var e=Me("date",i,f.formControls);m({formControls:e})}),[]);var O=function(e,t){var n=Me(t,e,f.formControls);m({formControls:n,isFormValid:Se(n)}),l(ue({name:t,value:e}))},h=function(e){return function(a){var r=function(e,t){var n;return e.map((function(e){return e.title===t&&(n=e.id),n})),n};if("account"===e){var c=Me(e,a.target.value,f.formControls);m({formControls:c,isFormValid:Se(c)});var o=r(n,a.target.value);l(de({id:o,title:a.target.value}))}if("category"===e){var i=Me(e,a.target.value,f.formControls);m({formControls:i,isFormValid:Se(i)});var s=r(t,a.target.value);l(le({id:s,title:a.target.value}))}}},p=u.a.useRef(null);return Object(ge.jsx)("section",{className:he.a.form,children:Object(ge.jsx)("div",{className:he.a.dialogWrapper,children:Object(ge.jsx)("form",{onSubmit:function(e){e.preventDefault()},children:Object(ge.jsx)(G.a,{in:a,timeout:300,classNames:{enterActive:"".concat(he.a.addFormEnterActive),exitActive:"".concat(he.a.addFormExitActive)},unmountOnExit:!0,nodeRef:p,children:Object(ge.jsxs)("div",{className:he.a.dialog,ref:p,children:[Object(ge.jsx)(_e,{type:"number",name:"sum",placeholder:"0.00",value:o,valid:f.formControls.sum.valid,shouldValidate:!!f.formControls.sum.validation,touched:f.formControls.sum.touched,errorMessage:f.formControls.sum.errorMessage,onChange:function(e){return O(e.target.value,e.target.name)}}),Object(ge.jsx)(Te,{options:t,defaultOption:"Choose a category",onChange:h("category"),valid:f.formControls.category.valid,shouldValidate:!!f.formControls.category.validation,touched:f.formControls.category.touched,errorMessage:f.formControls.category.errorMessage}),Object(ge.jsx)(Te,{options:n,defaultOption:"Choose an account",onChange:h("account"),valid:f.formControls.account.valid,shouldValidate:!!f.formControls.account.validation,touched:f.formControls.account.touched,errorMessage:f.formControls.account.errorMessage}),Object(ge.jsx)(_e,{type:"date",name:"date",value:i,valid:f.formControls.date.valid,shouldValidate:!!f.formControls.date.validation,touched:f.formControls.date.touched,errorMessage:f.formControls.date.errorMessage,onChange:function(e){return O(e.target.value,e.target.name)}}),Object(ge.jsx)("div",{className:he.a.dialogType,children:Object(ge.jsx)(_e,{label:"Income",type:"checkbox",name:"outcome",onChange:function(e){return O(e.target.value,e.target.name)}})}),Object(ge.jsx)(Ee,{type:"submit",onClick:function(){l(je([c])),l(be()),r(!1)},disabled:!f.isFormValid,children:"Create"})]})})})})})};var Be=function(e){var t=e.categories,n=e.accounts,a=Object(s.useState)(!1),r=Object(Y.a)(a,2),c=r[0],o=r[1],i=Object(b.b)(),l=[X.a.menuAddBtn,"fa",c?"fa-times":"fa-plus"].join(" "),d=function(e){return e.isActive?"".concat(X.a.active):""},f=u.a.useRef(null);return Object(ge.jsxs)(ge.Fragment,{children:[Object(ge.jsx)(ke,{categories:t,accounts:n,onClickAddBtn:c,setOnClickAddBtn:o}),Object(ge.jsx)("nav",{className:X.a.menu,children:Object(ge.jsxs)("div",{className:X.a.wrapper,children:[Object(ge.jsx)(G.a,{in:c,timeout:300,classNames:{enterActive:"".concat(X.a.addBtnEnterActive),enterDone:"".concat(X.a.addBtnEnterDone)},nodeRef:f,children:Object(ge.jsx)("i",{className:l,onClick:function(){o(!c),c&&i(be())},ref:f})}),Object(ge.jsx)(j.b,{to:"/",className:d,children:"Transactions"}),Object(ge.jsx)(j.b,{to:"/budget",className:d,children:"Analytics"}),Object(ge.jsx)(j.b,{to:"/settings",className:d,children:"Settings"})]})})]})};var De=function(e){var t=Object(b.c)(L),n=Object(b.c)(W);return Object(ge.jsx)("div",{className:"container",children:Object(ge.jsxs)("main",{className:"page-main",children:[e.children,Object(ge.jsx)(Be,{categories:t,accounts:n})]})})};var Le=function(){var e=Object(b.c)(Z),t=Object(b.b)();return Object(ge.jsxs)("section",{className:"search",children:[Object(ge.jsx)("input",{type:"text",name:"search",placeholder:"Search by category",value:e,onChange:function(e){var n=e.target.value;t(ee(n))}}),e.length>0&&Object(ge.jsx)("span",{className:"search__close-btn",onClick:function(){t(te())}})]})};var Ve=function(e){var t=e.transactions,n=t.map((function(e){return e=e.outcome?+e.sum:null})).reduce((function(e,t){return e+t}),0),a=t.map((function(e){return e=e.outcome?null:+e.sum})).reduce((function(e,t){return e+t}),0);return Object(ge.jsx)("section",{className:"balance",children:Object(ge.jsx)("div",{className:"balance__container balance__balance",children:Object(ge.jsxs)("div",{children:[Object(ge.jsx)("p",{children:"Your balance"}),Object(ge.jsxs)("p",{className:"balance__amount",children:[a-n," \u20ac"]})]})})})};var Ie=function(e){var t=e.categoryTitle,n=e.accountTitle,a=e.outcome,r=e.sum,c=e.id,o=Object(b.b)(),i=Object(s.useState)(!1),u=Object(Y.a)(i,2),l=u[0],d=u[1],j=function(){d(!l)};return Object(ge.jsxs)("li",{className:"transactions__item",onMouseOver:j,onMouseOut:j,children:[Object(ge.jsxs)("div",{className:"transactions__item-wrapper",children:[Object(ge.jsx)("p",{children:t}),Object(ge.jsxs)("p",{className:"transactions__item--expense",children:[a?"-":"+",r," \u20ac"]})]}),Object(ge.jsxs)("div",{className:"transactions__item-wrapper",children:[Object(ge.jsx)("p",{className:"transactions__item--account",children:n}),Object(ge.jsx)("p",{className:"transactions__item--edit ".concat(l?"":"hidden"),id:c,onClick:function(e){var t=e.target.id;o(fe(t))},children:"delete"})]})]})};var Pe=function(e){var t=e.date;return e.transactions.filter((function(e){return e.date===t})).map((function(e,t){return Object(ge.jsx)("div",{children:Object(ge.jsx)(Ie,{categoryTitle:e.category.title,accountTitle:e.account.title,outcome:e.outcome,sum:e.sum,id:e.id})},t)}))};function Re(e){return new Date(e).toLocaleString("en-EN",{weekday:"long"})}function qe(e){return new Date(e).toLocaleString("en-EN",{month:"long",year:"numeric"})}var Ue=function(e){var t,n=e.date,a=e.transactions.filter((function(e){return e.date===n})),r=Object(C.a)(new Set(a.map((function(e){return e.date})))),c=a.filter((function(e){return!0===e.outcome})).map((function(e){return e.sum})).reduce((function(e,t){return e+t}),0),o=a.filter((function(e){return!1===e.outcome})).map((function(e){return e.sum})).reduce((function(e,t){return e+t}),0)-c;return Object(ge.jsxs)("div",{className:"transactions__header",children:[Object(ge.jsxs)("div",{className:"transactions__date-content",children:[Object(ge.jsx)("p",{children:(t=r,new Date(t).toLocaleString("en-EN",{day:"2-digit"}))}),Object(ge.jsxs)("div",{className:"transactions__date-wrapper",children:[Object(ge.jsx)("p",{children:Re(r)}),Object(ge.jsx)("p",{children:qe(r)})]})]}),Object(ge.jsxs)("p",{children:[o<0?"":"+",o," \u20ac"]})]})};var We=function(e){var t=e.transactions,n=Object(C.a)(new Set(t.map((function(e){return e.date}))));return Object(ge.jsx)("section",{className:"transactions",children:n.map((function(e,n){return Object(ge.jsxs)("ul",{className:"transactions__list",children:[Object(ge.jsx)(Ue,{date:e,transactions:t}),Object(ge.jsx)(Pe,{date:e,transactions:t})]},n)}))})};var Je=function(){var e=Object(b.c)(ce),t=Object(b.c)(ie),n=Object(b.b)();return Object(s.useEffect)((function(){n(ae()),n(k()),n(R())}),[n]),Object(ge.jsxs)(ge.Fragment,{children:[Object(ge.jsx)(Le,{}),Object(ge.jsx)(Ve,{transactions:e}),Object(ge.jsx)(We,{transactions:t})]})};var Ye=function(){return Object(ge.jsx)("div",{children:Object(ge.jsx)("h1",{children:"Analytics"})})};var Ge=function(){return Object(ge.jsx)("div",{children:Object(ge.jsx)("h1",{children:"Settings"})})};var Ke=function(){return Object(ge.jsx)(De,{children:Object(ge.jsxs)(f.d,{children:[Object(ge.jsx)(f.b,{path:"/",element:Object(ge.jsx)(Je,{})}),Object(ge.jsx)(f.b,{path:"/budget",element:Object(ge.jsx)(Ye,{})}),Object(ge.jsx)(f.b,{path:"/settings",element:Object(ge.jsx)(Ge,{})}),Object(ge.jsx)(f.b,{path:"*",element:Object(ge.jsx)(f.a,{to:"/"})})]})})},Xe=Object(g.a)({reducer:{transactions:me,categories:V,accounts:J,searchTerm:ne}});d.a.render(Object(ge.jsx)(u.a.StrictMode,{children:Object(ge.jsx)(b.a,{store:Xe,children:Object(ge.jsx)(j.a,{children:Object(ge.jsx)(Ke,{})})})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.c400b67d.chunk.js.map