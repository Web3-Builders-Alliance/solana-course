"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[400],{5400:function(e,a,t){t.r(a);var l=t(5893),s=t(4306),n=t(5675),i=t.n(n),c=t(8073);let d=()=>{let{select:e,wallets:a,publicKey:t,disconnect:n}=(0,s.O)();return t?null:(0,l.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,l.jsx)("div",{className:"pb-4 text-base leading-7 text-slate-200",children:(0,l.jsx)("img",{src:"".concat(c.O,"/logo.svg"),className:"w-24 mx-auto",alt:"Web3 Builders Alliance"})}),a.filter(e=>"Installed"===e.readyState).length>0?a.filter(e=>"Installed"===e.readyState).map(a=>(0,l.jsxs)("button",{onClick:()=>e(a.adapter.name),className:"inline-flex items-center px-4 py-2 text-md font-medium leading-5 text-center text-slate-200 bg-slate-700 rounded-md shadow-md transition duration-150 ease-in-out hover:bg-slate-400 focus:outline-none focus:shadow-outline-slate focus:border-slate-300 active:bg-slate-400",children:[(0,l.jsx)(i(),{width:16,height:16,src:a.adapter.icon,alt:a.adapter.name,className:"h-6 w-6"}),(0,l.jsx)("span",{className:"ml-3",children:a.adapter.name})]},a.adapter.name)):(0,l.jsxs)("p",{className:"text-center",children:[(0,l.jsx)("span",{className:"font-bold text-lg block pb-4",children:"Wallet not found."}),"Please activate your existing wallet extension or install a supported Solana wallet"]})]})};a.default=d}}]);