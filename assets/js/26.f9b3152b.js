(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{437:function(v,_,t){v.exports=t.p+"assets/img/image-20231008133520251.bb076b70.png"},489:function(v,_,t){"use strict";t.r(_);var r=t(14),a=Object(r.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"微服务架构和单体架构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#微服务架构和单体架构"}},[v._v("#")]),v._v(" 微服务架构和单体架构")]),v._v(" "),_("h2",{attrs:{id:"单体架构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#单体架构"}},[v._v("#")]),v._v(" 单体架构")]),v._v(" "),_("blockquote",[_("p",[v._v("单体架构：所有的代码最终打包成一个文件（jar包），整个系统的所有"),_("strong",[v._v("功能单元")]),v._v("整体部署到"),_("strong",[v._v("同一个进程")]),v._v("。")])]),v._v(" "),_("h3",{attrs:{id:"单体架构的优势和弊端"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#单体架构的优势和弊端"}},[v._v("#")]),v._v(" 单体架构的优势和弊端")]),v._v(" "),_("h4",{attrs:{id:"优势"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#优势"}},[v._v("#")]),v._v(" 优势")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("方面")]),v._v(" "),_("th",[v._v("描述")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("开发")]),v._v(" "),_("td",[v._v("应用的开发很简单")])]),v._v(" "),_("tr",[_("td",[v._v("更改")]),v._v(" "),_("td",[v._v("易于对应用程序进行大规模的更改")])]),v._v(" "),_("tr",[_("td",[v._v("测试")]),v._v(" "),_("td",[v._v("测试相对直观简单")])]),v._v(" "),_("tr",[_("td",[v._v("部署")]),v._v(" "),_("td",[v._v("部署简单明了")])]),v._v(" "),_("tr",[_("td",[v._v("扩容")]),v._v(" "),_("td",[v._v("横向扩容不费吹灰之力")])])])]),v._v(" "),_("h4",{attrs:{id:"弊端"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#弊端"}},[v._v("#")]),v._v(" 弊端")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("描述")]),v._v(" "),_("th",[v._v("关键词")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("代码过度"),_("strong",[v._v("复杂")]),v._v("且严重"),_("strong",[v._v("耦合")]),v._v("，导致难以维护")]),v._v(" "),_("td",[v._v("庞大复杂、恶性循环")])]),v._v(" "),_("tr",[_("td",[v._v("从代码提交到实际部署的周期很长；开发慢、启动慢，严重影响开发效率。")]),v._v(" "),_("td",[v._v("提交代码、更改测试")])]),v._v(" "),_("tr",[_("td",[v._v("扩展性受限")]),v._v(" "),_("td",[v._v("性能问题、资源需求")])]),v._v(" "),_("tr",[_("td",[v._v("交付可靠的单体应用困难")]),v._v(" "),_("td",[v._v("可靠测试、故障隔离")])])])]),v._v(" "),_("p",[_("strong",[v._v("代码过于复杂且严重耦合，导致维护困难")])]),v._v(" "),_("ol",[_("li",[v._v("由于系统本身过于"),_("strong",[v._v("庞大和复杂")]),v._v("，以至于任何一个开发人员都不能理解他的全部，因此，修复软件中的问题和正确开发新的功能变得十分困难且耗时。")]),v._v(" "),_("li",[v._v("更糟糕的是，这种极度的复杂性可能会形成一种"),_("strong",[v._v("恶性循环")]),v._v("，代码理解很困难，开发人员在修改代码的时候更加容易出错，每一次修改代码，都会导致代码库变得更加复杂、更加难以理解。")])]),v._v(" "),_("p",[_("strong",[v._v("从代码提交到部署周期很长")])]),v._v(" "),_("ol",[_("li",[v._v("所有的开发人员都向同一个代码库"),_("strong",[v._v("提交代码")]),v._v("，往往会使得代码库的构建结构处于无法交付的状态，当使用分支解决这个问题的时候，又必须忍受漫长且痛苦的合并过程。")]),v._v(" "),_("li",[v._v("由于代码库十分庞大且复杂，以至于每一个修改将会导致的影响是未知的，为了避免牵一发而动全身，即使是很细微的"),_("strong",[v._v("修改")]),v._v("，也要进行全部的"),_("strong",[v._v("测试")]),v._v("。")])]),v._v(" "),_("p",[_("strong",[v._v("扩展性差")])]),v._v(" "),_("ol",[_("li",[v._v("如果单体应用的某个功能点存在"),_("strong",[v._v("性能问题")]),v._v("，那么需要部署多个单体应用的实例，加上负载均衡设备（如nginx），才能保证整个应用的性能能够维持用户的使用。")]),v._v(" "),_("li",[v._v("在某些情况下，一个应用的不同模块的"),_("strong",[v._v("资源需求")]),v._v("是相互冲突的，比如某些模块需要高效的IO，某些模块需要高性能的CPU，而这些模块处于同一个单体应用之中，其所部署的服务器需要满足所有需求。")])]),v._v(" "),_("p",[_("strong",[v._v("交付可靠的单体应用困难")])]),v._v(" "),_("ol",[_("li",[v._v("由于单体应用体积庞大，以至于难以进行全面且彻底的测试，缺乏"),_("strong",[v._v("可靠的测试")]),v._v("意味着代码中的问题会进入生产环境。")]),v._v(" "),_("li",[v._v("缺乏"),_("strong",[v._v("故障隔离")]),v._v("，单体应用的所有模块都运行在一个应用中，在某个时间段内，某个模块中出现代码问题，将会导致整个应用程序的崩溃。")])]),v._v(" "),_("h2",{attrs:{id:"微服务架构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#微服务架构"}},[v._v("#")]),v._v(" 微服务架构")]),v._v(" "),_("h3",{attrs:{id:"什么是微服务"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#什么是微服务"}},[v._v("#")]),v._v(" 什么是微服务？")]),v._v(" "),_("p",[v._v("微服务的本质就是一个麻雀虽小但五脏俱全的应用程序，他按照单一职责的原则实现了特定的一组功能。")]),v._v(" "),_("ul",[_("li",[v._v("微服务可以独立部署、独立运行、独立对外提供服务。")]),v._v(" "),_("li",[v._v("根据单一职责原则，实现了一组相关功能")])]),v._v(" "),_("h3",{attrs:{id:"什么是微服务架构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#什么是微服务架构"}},[v._v("#")]),v._v(" 什么是微服务架构？")]),v._v(" "),_("p",[v._v("微服务架构就是把一个复杂的应用程序拆分成一组服务。")]),v._v(" "),_("p",[v._v("每个服务可以单独开发、独立部署、独立运行，服务之间是隔离的、有边界的，可以通过对外暴露的接口相互调用。")]),v._v(" "),_("h3",{attrs:{id:"微服务的优势和弊端"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#微服务的优势和弊端"}},[v._v("#")]),v._v(" 微服务的优势和弊端")]),v._v(" "),_("h4",{attrs:{id:"优势-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#优势-2"}},[v._v("#")]),v._v(" 优势")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("描述")]),v._v(" "),_("th",[v._v("关键词")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("每个服务都相对较小，容易维护")]),v._v(" "),_("td")]),v._v(" "),_("tr",[_("td",[v._v("使得大型的应用程序实现快速的持续交付和持续部署")]),v._v(" "),_("td")]),v._v(" "),_("tr",[_("td",[v._v("应用扩展灵活")]),v._v(" "),_("td")]),v._v(" "),_("tr",[_("td",[v._v("更好的容错")]),v._v(" "),_("td")])])]),v._v(" "),_("h4",{attrs:{id:"弊端-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#弊端-2"}},[v._v("#")]),v._v(" 弊端")]),v._v(" "),_("ul",[_("li",[v._v("分布式系统可能复杂难以管理")]),v._v(" "),_("li",[v._v("分布式部署追踪问题难")]),v._v(" "),_("li",[v._v("分布式事务比较难处理")]),v._v(" "),_("li",[v._v("服务数量增加，管理复杂性增加")])]),v._v(" "),_("h3",{attrs:{id:"微服务的拆分"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#微服务的拆分"}},[v._v("#")]),v._v(" 微服务的拆分")]),v._v(" "),_("p",[_("img",{attrs:{src:t(437),alt:"image-20231008133520251"}})]),v._v(" "),_("ul",[_("li",[v._v("每个服务的功能有边界，因此每个服务访问的"),_("strong",[v._v("数据也是有边界的")]),v._v("，每个服务都有自己的"),_("strong",[v._v("数据库")]),v._v("。")]),v._v(" "),_("li",[v._v("每个服务的数据库只限于该服务自己直接访问，其他服务不能直接访问。")]),v._v(" "),_("li",[v._v("如果一个服务需要其他服务的数据，则可以通过调用其他服务"),_("strong",[v._v("对外暴露的接口")]),v._v("来访问其他服务的数据。")])])])}),[],!1,null,null,null);_.default=a.exports}}]);