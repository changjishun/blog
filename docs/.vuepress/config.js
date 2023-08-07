module.exports = {
  // evergreen: true,
  title: '琅玕的博客',
  description: '个人编程技术分享',
  searchMaxSuggestions: 10,
  base: '/blog/',
  themeConfig:{
  nav: [{text: "主页", link: "/"      },
      { text: "项目", link: "/project/" },
      { text: "学习", link: "/skills/"},
      { text: "算法", link: "/algorithm/"   },
      { text: "资源分享", link: "/share/"   },
    ],
  
  sidebar: {
    '/project/':['',
      {
        title: "物联网",
        path:'/project/IoT/',
        collapsable: false, // 不折叠
        children: [
          "/project/IoT/基于NodeMcu的智慧生态农业系统设计",
          // "/project/IoT/"
        ]
      },
      {
        title: "Java",
        path:'/project/Java/',
        collapsable: false, // 不折叠
        children: [
          "/project/Java/电商秒杀系统",
          "/project/Java/2"
        ]
      }
    ],

    '/skills/':[
      {
        title: "JavaSE",
        path:'/skills/JavaSE',
        collapsable: false, // 不折叠
        children: [
          "/skills/JavaSE/File类和IO流",
          "/skills/JavaSE/Java常用API",
          "/skills/JavaSE/Thread",
          "/skills/JavaSE/内部类",
          "/skills/JavaSE/Collection",
          "/skills/JavaSE/Map",
          "/skills/JavaSE/Stream",
        ],

        // title: "网络安全",
        // path:'/project/网络安全/',
        // collapsable: false, // 不折叠
        // children: [
        //   // "/skills/网络安全/"
        // ],

        // title: "数据库",
        // path:'/project/数据库/',
        // collapsable: false, // 不折叠
        // children: [
        //   // "/skills/数据库/"
          
        // ],
      }
    ],

    // '/share/':[
    //   {
    //     title: "",
    //     path:'/skills/JavaSE',
    //     collapsable: false, // 不折叠
    //     children: [
    //       "/skills/JavaSE/File类和IO流",
    //       "/skills/JavaSE/Java常用API",
    //       "/skills/JavaSE/Thread",
    //       "/skills/JavaSE/内部类"
    //     ],
    //   }
    // ],

    '/':[
        {
          title: '欢迎',
          path: '/',
          collapsable: false, // 不折叠
          // sidebarDepth: 3,
          children: [
              { title: "简介", path: "/" }
          ]
        }
      ],
  }
  }, 

//   // 处理路径问题
//   markdown: {
//     extendMarkdown: md => {
//         md.set({breaks: true})
//         md.use(require("markdown-it-disable-url-encode"), "./")
//     }
// }
markdown: {
  // ......
  extendMarkdown: md => {
    md.use(require("markdown-it-disable-url-encode"));
  }
}
}
// configureWebpack: (config, isServer) => {
//   if (!isServer) {
//     // 开启webpack的watch模式
//     config.watch = true;
//     config.watchOptions = {
//       ignored: /node_modules/,
//       aggregateTimeout: 300,
//       poll: 1000
//     };
//   }
// }
// }
