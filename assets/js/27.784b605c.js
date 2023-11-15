(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{438:function(t,v,_){t.exports=_.p+"assets/img/image-20231109155254881.6960814b.png"},492:function(t,v,_){"use strict";_.r(v);var r=_(14),s=Object(r.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"秒杀"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#秒杀"}},[t._v("#")]),t._v(" 秒杀")]),t._v(" "),v("h2",{attrs:{id:"思路"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#思路"}},[t._v("#")]),t._v(" 思路")]),t._v(" "),v("h3",{attrs:{id:"缓存预热"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#缓存预热"}},[t._v("#")]),t._v(" 缓存预热")]),t._v(" "),v("p",[t._v("使用Spring定时任务每天凌晨两点将当天的秒杀活动商品数据加载到Redis中。")]),t._v(" "),v("blockquote",[v("p",[t._v("缓存预热就是系统启动前，提前将相关数据直接加载到缓存系统。避免在用户请求的时候，先查询数据库，然后再将数据缓存。")])]),t._v(" "),v("p",[t._v("如果不考虑缓存，那么每次都需要访问直接数据库。而秒杀列表页和秒杀商品详情页的点击量一般会比较大，那势必会给数据库带来很大的压力，所以在此考虑使用缓存预热的方案。")]),t._v(" "),v("h3",{attrs:{id:"使用状态位控制访问请求"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#使用状态位控制访问请求"}},[t._v("#")]),t._v(" 使用状态位控制访问请求")]),t._v(" "),v("p",[t._v("我们在内存中保持一个状态位，当抢购开始时状态为1，可以抢购，当库存为0时状态位为0，不能抢购。状态位的好处是它是在内存中判断，压力比较小，可以阻止很多不必要的请求。")]),t._v(" "),v("h3",{attrs:{id:"秒杀排队实现方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#秒杀排队实现方式"}},[t._v("#")]),t._v(" 秒杀排队实现方式")]),t._v(" "),v("p",[t._v("用户提交秒杀请求，将秒杀商品与用户id关联发送给消息队列，然后返回。通过消息队列排队抢购秒杀资格。秒杀页面通过轮询接口查看是否秒杀成功。")]),t._v(" "),v("p",[t._v("我们秒杀只是为了获取一个秒杀资格，获取秒杀资格后就可以到下单页面下订单，后续业务和正常订单一样。")]),t._v(" "),v("h3",{attrs:{id:"库存超卖问题"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#库存超卖问题"}},[t._v("#")]),t._v(" 库存超卖问题")]),t._v(" "),v("p",[t._v("使用Redis队列存储商品库存，利用Redis队列的原子性，保证库存不超卖。")]),t._v(" "),v("h2",{attrs:{id:"实现"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#实现"}},[t._v("#")]),t._v(" 实现")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th"),t._v(" "),v("th"),t._v(" "),v("th")])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("缓存预热")]),t._v(" "),v("td",[t._v("使用Spring定时任务每天凌晨两点将当天的秒杀活动商品数据加载到Redis中。")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("秒杀商品列表")]),t._v(" "),v("td",[t._v("返回所有的秒杀商品")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("秒杀商品详情")]),t._v(" "),v("td",[t._v("返回指定的秒杀商品")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("秒杀下单排队")]),t._v(" "),v("td",[t._v("获取下单码、秒杀下单排队")]),t._v(" "),v("td",[v("strong",[t._v("下单码")]),t._v("主要目的是秒杀下单的时候校验用户请求，防止非法请求参与秒杀。")])]),t._v(" "),v("tr",[v("td",[t._v("秒杀下单消费")]),t._v(" "),v("td",[t._v("1. 判断状态位(看是否有库存)。2.标记用户下单(使用redis.setnx(userId))。3.获取库存队列。4.弹出库存。5.生成订单记录，存入Redis。")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("检查秒杀下单结果")]),t._v(" "),v("td",[t._v("1.  判断用户是否已经下过单。 2. 判断Redis中是否已经存在用户的订单，如果存在，说明抢单成功，返回秒杀成功状态码。3. 如果不满足1和2中的条件，就执行后面的。4. 判断库存标志位，看是否有库存，没有库存据返回已售罄标志位。5. 以上都不满足，就返回正在排队中。")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("秒杀下单商品确认页")]),t._v(" "),v("td",[t._v("当抢购成功之后，前端页面显示抢购成功，去下单。和订单服务的下单商品确认页逻辑类似。1. 从Redis中获取下单记录OrderRecord，然后获取秒杀详情SeckillGoods。 2. 获取用户地址 3. 构建OrderTradeDTO(下单确认页信息)")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("秒杀下单生成(提交)订单")]),t._v(" "),v("td",[t._v("1. 获取用户id。 2. 判断是否已经提交过订单，如果已经提交过订单，就返回相应的失败状态码。3. 远程调用订单服务，生成秒杀订单。4. 删除Redis中的下单信息。5. 在Redis中增加秒杀提交标记，表示用户已经提交了订单。")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("定时任务清除缓存")]),t._v(" "),v("td",[t._v("每天在固定时间清除当天的秒杀数据")]),t._v(" "),v("td")])])]),t._v(" "),v("h3",{attrs:{id:"缓存预热-2"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#缓存预热-2"}},[t._v("#")]),t._v(" 缓存预热")]),t._v(" "),v("p",[t._v("在凌晨将当天的所有秒杀商品从数据库中放入redis缓存")]),t._v(" "),v("p",[t._v("① 从数据库中查询状态为审核通过、开始时间在当天、库存大于的商品。")]),t._v(" "),v("p",[t._v("② 在redis中使用一个hash存储当天的商品，遍历当天的每个商品，将他们放入redis的hash中。hash的field为商品id，value为商品信息。")]),t._v(" "),v("p",[t._v("③ 使用一个队列表示每个商品的库存，添加一个元素(商品id)代表新增一个库存，移除一个元素就代表减少一个库存。")]),t._v(" "),v("p",[t._v('④ 初始化库存标志位为"1"，表示有库存。')]),t._v(" "),v("h3",{attrs:{id:"秒杀下单排队"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#秒杀下单排队"}},[t._v("#")]),t._v(" 秒杀下单排队")]),t._v(" "),v("h4",{attrs:{id:"获取下单码"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#获取下单码"}},[t._v("#")]),t._v(" 获取下单码")]),t._v(" "),v("p",[t._v('① 在redis中查询该商品是否存在，如果不存在就直接返回"不合法"的状态码')]),t._v(" "),v("p",[t._v("② 如果该商品存在，就判断当前时间是否还在活动时间内，如果在活动时间内，就返回由userId + skuId使用MD5编码后的字符串作为下单码，否则就返回失败。")]),t._v(" "),v("h4",{attrs:{id:"秒杀下单排队-携带下单码发送下单请求"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#秒杀下单排队-携带下单码发送下单请求"}},[t._v("#")]),t._v(" 秒杀下单排队（携带下单码发送下单请求）")]),t._v(" "),v("p",[t._v('① 判断秒杀商品库存状态标志位。如果该标志位为null，就返回secKill_illegal的状态码；如果该标志位为"0"，就返回"skill_finish"的状态码。')]),t._v(" "),v("p",[t._v('② 能够执行到这一步就说明还有库存，验证秒杀下单码是否正确。下单码不正确就返回"skill_illegal"的状态码；下单码正确，就创建一个UserRecord对象记录skuId和userId，然后将这个对象作为rocketMQ消息发送。')]),t._v(" "),v("h4",{attrs:{id:"秒杀下单消息消费"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#秒杀下单消息消费"}},[t._v("#")]),t._v(" 秒杀下单消息消费")]),t._v(" "),v("p",[v("img",{attrs:{src:_(438),alt:"image-20231109155254881"}})]),t._v(" "),v("p",[t._v("① 在消息监听器中将获取到的消息转换成UserRecord对象，然后调用service层方法，将UserRecord中userId和skuId传入这个方法。")]),t._v(" "),v("p",[t._v("② 在service层方法中，使用库存标志位判断该商品是否已经售罄，售罄就返回。")]),t._v(" "),v("p",[t._v("③ 使用redis的string的setnx方法添加记录来判断每个用户是否是第一次参加一场秒杀活动，如果成功添加记录，就说明之前没有添加过，没有参加过该秒杀活动；如果添加失败，就反之。")]),t._v(" "),v("p",[t._v("④ 如果是第一次参加，就通过该商品对应的队列出队来扣减库存，出队元素为null，就说明没有库存了；出队元素不为null，就说明用户获取了秒杀资格。")]),t._v(" "),v("p",[t._v("⑤ 从redis中获取该秒杀商品，创建一个OrderRecord对象，根据该秒杀商品给它相关属性赋值，然后放入redis(在redis中使用hash存储OrderRecord，field为userId，value为OrderRecord)")]),t._v(" "),v("h5",{attrs:{id:"更新库存"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#更新库存"}},[t._v("#")]),t._v(" 更新库存")]),t._v(" "),v("p",[t._v("① 获取、使用redis的锁")]),t._v(" "),v("p",[t._v("② 从redis中获取真实的库存，从redis中获取该商品，修改它的库存后再放回redis。")]),t._v(" "),v("p",[t._v("③ 将该商品信息更新到数据库。")]),t._v(" "),v("h4",{attrs:{id:"返回秒杀下单结果"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#返回秒杀下单结果"}},[t._v("#")]),t._v(" 返回秒杀下单结果")]),t._v(" "),v("p",[t._v("① 判断秒杀下单消息是否已经被消费")]),t._v(" "),v("p",[t._v("​\t使用redis中下单排队标记记录是否已经消费过了。")]),t._v(" "),v("p",[t._v("② 如果消息已经消费了，")]),t._v(" "),v("p",[t._v("​\t(1) 通过获取redis中的订单信息，看其中有没有该用户的订单信息，有的话就说明秒杀成功，返回秒杀成功状态码。")]),t._v(" "),v("p",[t._v("​\t(2) 从redis中的已提交秒杀订单，看里面是否有该用户的订单，有的话就说明下单成功，返回秒杀成功状态码。")]),t._v(" "),v("p",[t._v("③ 如果消息没有消费")]),t._v(" "),v("p",[t._v("有两种可能：(1) 库存为0，没有发送排队消息。(2)消息还在排队。")])])}),[],!1,null,null,null);v.default=s.exports}}]);