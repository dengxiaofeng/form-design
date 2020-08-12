export function uuid(len, radix, prefix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []; let
    i
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return `${prefix}-${uuid.join('')}`
}

export function newPage() {
  return {
    schemaType: 'superform',
    schemaVersion: '0.1',
    pages: [{
      id: uuid(32, '', 'FORM'),
      layout: {
        componentName: 'Root',
        id: uuid(8, '', 'node'),
        props: {
          containerStyle: {},
          pageStyle: {
            backgroundColor: '#f2f3f5'
          },
          advanced: {},
          // advanced: {
          //   didMount: "function didMount(ctx) {\n console.log('didMount', ctx)  \n}",
          //   willUnMount: "function willUnMount(ctx) {\n  console.log('willUnMount', ctx) \n}",
          // },
          autoColumn: true,
          autoLayoutRoot: true
        },
        configObj: {
          containerStyle: {
            type: 'style',
            name: '背景样式设置',
            default: {},
            description: ''
          },
          pageStyle: {
            type: 'style',
            name: 'Body样式设置',
            default: {},
            description: ''
          },
          advanced: {
            type: 'group',
            name: '高级',
            children: {
              willMount: {
                type: 'event',
                name: '页面加载完之前执行',
                default: 'function willMount(ctx) {\n console.log(\'willMount\', ctx)  \n}',
                eventType: 'page',
                actionName: 'willMount'
              },
              didMount: {
                type: 'event',
                name: '页面加载完后执行',
                default: 'function didMount(ctx) {\n console.log(\'willMount\', ctx)  \n}',
                eventType: 'page',
                actionName: 'didMount'
              },
              willUnMount: {
                type: 'event',
                name: '页面销毁前执行',
                default: 'function willUnMount(ctx) {\n  console.log(\'willUnMount\', ctx) \n}',
                eventType: 'page',
                actionName: 'willUnMount'
              }
            }
          }

        },
        children: [
          {
            componentName: 'RootHeader',
            id: uuid(8, '', 'node'),
            props: {},
            children: []
          },
          {
            componentName: 'RootContent',
            id: uuid(8, '', 'node'),
            props: {
              rootContentPadding: '12',
              rootContentColor: 'white'
            },
            children: []
          },
          {
            componentName: 'RootFooter',
            id: uuid(8, '', 'node'),
            props: {},
            children: []
          }
        ]
      },
      params: {},
      dataSource: {
        offline: [],
        globalConfig: {
          fit: {
            compiled: "function main(){\n    'use strict';\n\nvar __compiledFunc__ = function fit(response) {\n  var content = response.content !== undefined ? response.content : response;\n  var error = {\n    message: response.errorMsg || response.errors && response.errors[0] && response.errors[0].msg || response.content || '远程数据源请求出错，success is false'\n  };\n  var success = true;\n  if (response.success !== undefined) {\n    success = response.success;\n  } else if (response.hasError !== undefined) {\n    success = !response.hasError;\n  }\n  return {\n    content: content,\n    success: success,\n    error: error\n  };\n};\n    return __compiledFunc__.apply(this, arguments);\n  }",
            source: "function fit(response) {\n  const content = (response.content !== undefined) ? response.content : response;\n  const error = {\n    message: response.errorMsg ||\n      (response.errors && response.errors[0] && response.errors[0].msg) ||\n      response.content || '远程数据源请求出错，success is false',\n  };\n  let success = true;\n  if (response.success !== undefined) {\n    success = response.success;\n  } else if (response.hasError !== undefined) {\n    success = !response.hasError;\n  }\n  return {\n    content,\n    success,\n    error,\n  };\n}",
            type: 'js',
            error: {}
          },
          onError: {
            compiled: 'function main(){\n    "use strict";\n\nvar __compiledFunc__ = function onError(error, ctx) {\n  console.log(error);\n  // 可以在这里做弹框提示等操作  \n};\n    return __compiledFunc__.apply(this, arguments);\n  }',
            source: 'function onError(error, ctx){\n  console.log(error);\n  // 可以在这里做弹框提示等操作  \n}',
            type: 'js',
            error: {}
          },
          willFetch: {
            compiled: 'function main(){\n    "use strict";\n\nvar __compiledFunc__ = function willFetch(vars, config) {\n  // 通过 vars.data 可以更改查询参数\n  // 通过 config.header 可以更改 header\n  // 通过 config.url 可以更改  url\n  console.log(vars, config); // 可以查看还有哪些参数可以修改。\n};\n    return __compiledFunc__.apply(this, arguments);\n  }',
            source: 'function willFetch(vars, config) {\n  // 通过 vars.data 可以更改查询参数\n  // 通过 config.header 可以更改 header\n  // 通过 config.url 可以更改  url\n  console.log(vars, config); // 可以查看还有哪些参数可以修改。\n}',
            type: 'js',
            error: {}
          }
        },
        online: [],
        list: [],
        sync: true
      }
    }],
    actions: {
      module: {
        source: '/**\n * 私有的，可复用的函数\n * 动作面板帮助文档: \n * @see https://www.yuque.com/yida/help/filx26\n */\nfunction printLog(obj) {\n  console.info(obj);\n}\n',
        compiled: '"use strict";\n\n/**\n * 私有的，可复用的函数\n * 动作面板帮助文档: \n * @see https://www.yuque.com/yida/help/filx26\n */\nfunction printLog(obj) {\n  console.info(obj);\n}'
      },
      type: 'FUNCTION',
      list: []
    }
  }
}
