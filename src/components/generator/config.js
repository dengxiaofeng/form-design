// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
}

// 输入型组件 【左面板】
export const inputComponents = [
  {
    componentConfig: {
      label: '标题',
      tag: 'vc-text',
      tagIcon: 'input',
      layout: 'retouch'
    },
    props: {
      text: '标题'
    }
  },
  {
      // 组件的自定义配置
      componentConfig: {
        label: '表格',
        changeTag: true,
        tag: 'pro-table',
        tagIcon: 'input',
        defaultValue: undefined,
        layout: 'colFormItem'
      },
      // 组件的插槽属性
      __slot__: {
        prepend: '',
        append: ''
      },
      props: {
        label: '单行文本',
        labelWidth: '',
        placeholder: '请输入123',
        clearable: false,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false,
        defaultValue: undefined,
        span: 24,
        showLabel: true,
        events: [
          {
            type: 'blur',
            name: '失去焦点时',
            methodName: 'blur'
          },
          {
            type: 'change',
            name: '值发生改变时',
            methodName: 'change'
          },
          {
            type: 'keyDown',
            name: '键按下时',
            methodName: 'keyDown'
          }
        ]
  
      }
  },
  {
    // 组件的自定义配置
    componentConfig: {
      label: '单行文本',
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      layout: 'colFormItem'
    },
    // 组件的插槽属性
    __slot__: {
      prepend: '',
      append: ''
    },
    props: {
      label: '单行文本',
      labelWidth: '',
      placeholder: '请输入123',
      clearable: false,
      'prefix-icon': '',
      'suffix-icon': '',
      maxlength: null,
      'show-word-limit': false,
      readonly: false,
      disabled: false,
      defaultValue: undefined,
      span: 24,
      showLabel: true,
      events: [
        {
          type: 'blur',
          name: '失去焦点时',
          methodName: 'blur'
        },
        {
          type: 'change',
          name: '值发生改变时',
          methodName: 'change'
        },
        {
          type: 'keyDown',
          name: '键按下时',
          methodName: 'keyDown'
        }
      ]

    }
  },
  {
    componentConfig: {
      label: '多行文本',
      // labelWidth: null,
      // showLabel: true,
      tag: 'el-input',
      tagIcon: 'textarea',
      defaultValue: undefined,
      // required: true,
      layout: 'colFormItem',
      // span: 24,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/input'
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: '100%' },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  // {
  //   componentConfig: {
  //     label: '密码',
  //     showLabel: true,
  //     labelWidth: null,
  //     changeTag: true,
  //     tag: 'el-input',
  //     tagIcon: 'password',
  //     defaultValue: undefined,
  //     layout: 'colFormItem',
  //     span: 24,
  //     required: true,
  //     regList: [],
  //     document: 'https://element.eleme.cn/#/zh-CN/component/input'
  //   },
  //   __slot__: {
  //     prepend: '',
  //     append: ''
  //   },
  //   placeholder: '请输入',
  //   'show-password': true,
  //   style: { width: '100%' },
  //   clearable: true,
  //   'prefix-icon': '',
  //   'suffix-icon': '',
  //   maxlength: null,
  //   'show-word-limit': false,
  //   readonly: false,
  //   disabled: false
  // },
  {
    componentConfig: {
      label: '计数器',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'el-input-number',
      tagIcon: 'number',
      defaultValue: undefined,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      document: 'https://element.eleme.cn/#/zh-CN/component/input-number'
    },
    placeholder: '',
    min: undefined,
    max: undefined,
    step: 1,
    'step-strictly': false,
    precision: undefined,
    'controls-position': '',
    disabled: false
  },
  // {
  //   componentConfig: {
  //     label: '编辑器',
  //     showLabel: true,
  //     changeTag: true,
  //     labelWidth: null,
  //     tag: 'tinymce',
  //     tagIcon: 'rich-text',
  //     defaultValue: null,
  //     span: 24,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: [],
  //     document: 'http://tinymce.ax-z.cn'
  //   },
  //   placeholder: '请输入',
  //   height: 300, // 编辑器高度
  //   branding: false // 隐藏右下角品牌烙印
  // },
  {
    componentConfig: {
      label: '表单容器',
      tag: 'el-form',
      tagIcon: 'input',
      defaultValue: undefined,
      layout: 'form',
      children: [
        {
          // 组件的自定义配置
          componentConfig: {
            label: '单行文本',
            changeTag: true,
            tag: 'el-input',
            tagIcon: 'input',
            defaultValue: undefined,
            layout: 'colFormItem'
          },
          // 组件的插槽属性
          __slot__: {
            prepend: '',
            append: ''
          },
          // 其余的为可直接写在组件标签上的属性
          props: {
            label: '单行文本',
            labelWidth: '',
            placeholder: '请输入123',
            clearable: false,
            'prefix-icon': '',
            'suffix-icon': '',
            maxlength: null,
            'show-word-limit': false,
            readonly: false,
            disabled: false,
            defaultValue: undefined,
            span: 24,
            showLabel: true,
            events: [
              {
                type: 'blur',
                name: '失去焦点时',
                methodName: 'blur'
              },
              {
                type: 'change',
                name: '值发生改变时',
                methodName: 'change'
              },
              {
                type: 'keyDown',
                name: '键按下时',
                methodName: 'keyDown'
              }
            ]

          },
        },
        {
          componentConfig: {
            label: '提交',
            showLabel: true,
            changeTag: true,
            labelWidth: null,
            tag: 'el-button',
            tagIcon: 'button',
            span: 24,
            layout: 'button'
          },
          props: {
            title: '主要按钮',
            type: 'primary',
            size: 'mini',
            defaultBehavior: 'normal',
            iconName: '',
            iconFill: '',
            loading: false,
            triggerEventsWhenLoading: false,
            advanced: {
              fieldId: '',
              action: {
                events: []
              }
            }
          },
        },
        {
          componentConfig: {
            label: '重置',
            showLabel: true,
            changeTag: true,
            labelWidth: null,
            tag: 'el-button',
            tagIcon: 'button',
            span: 24,
            layout: 'button'
          },
          props: {
            title: '重置',
            type: '',
            size: 'mini',
            defaultBehavior: 'normal',
            iconName: '',
            iconFill: '',
            loading: false,
            triggerEventsWhenLoading: false,
            advanced: {
              fieldId: '',
              action: {
                events: []
              }
            }
          },
        }
      ]
    }

  }
]

// 选择型组件 【左面板】
export const selectComponents = [
  {
    componentConfig: {
      label: '下拉选择',
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 24
    }
  },
  // {
  //   componentConfig: {
  //     label: '级联选择',
  //     showLabel: true,
  //     labelWidth: null,
  //     tag: 'el-cascader',
  //     tagIcon: 'cascader',
  //     layout: 'colFormItem',
  //     defaultValue: [],
  //     dataType: 'dynamic',
  //     span: 24,
  //     required: true,
  //     regList: [],
  //     changeTag: true,
  //     document: 'https://element.eleme.cn/#/zh-CN/component/cascader'
  //   },
  //   options: [{
  //     id: 1,
  //     value: 1,
  //     label: '选项1',
  //     children: [{
  //       id: 2,
  //       value: 2,
  //       label: '选项1-1'
  //     }]
  //   }],
  //   placeholder: '请选择',
  //   style: { width: '100%' },
  //   props: {
  //     props: {
  //       multiple: false,
  //       label: 'label',
  //       value: 'value',
  //       children: 'children'
  //     }
  //   },
  //   'show-all-levels': true,
  //   disabled: false,
  //   clearable: true,
  //   filterable: false,
  //   separator: '/'
  // },
  {
    componentConfig: {
      label: '单选框组',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      changeTag: true,
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      optionType: 'default',
      regList: [],
      required: true,
      border: false,
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {},
    size: 'medium',
    disabled: false
  },
  {
    componentConfig: {
      label: '多选框组',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      layout: 'colFormItem'

    }
  },
  {
    componentConfig: {
      label: '开关',
      tag: 'el-switch',
      tagIcon: 'switch',
      defaultValue: false,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem'
    }
    // style: {},
    // disabled: false,
    // 'active-text': '',
    // 'inactive-text': '',
    // 'active-color': null,
    // 'inactive-color': null,
    // 'active-value': true,
    // 'inactive-value': false
  },
  {
    componentConfig: {
      label: '滑块',
      tag: 'el-slider',
      tagIcon: 'slider',
      defaultValue: null,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/slider'
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    'show-stops': false,
    range: false
  },
  {
    componentConfig: {
      label: '时间选择',
      tag: 'el-time-picker',
      tagIcon: 'time',
      defaultValue: null,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
    },
    placeholder: '请选择',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    'picker-options': {
      selectableRange: '00:00:00-23:59:59'
    },
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    componentConfig: {
      label: '时间范围',
      tag: 'el-time-picker',
      tagIcon: 'time-range',
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      defaultValue: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
    },
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    componentConfig: {
      label: '日期选择',
      tag: 'el-date-picker',
      tagIcon: 'date',
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      span: 24,
      layout: 'colFormItem',
      // required: true,
      // regList: [],
      // changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
    },
    
    // placeholder: '请选择',
    // type: 'date',
    // style: { width: '100%' },
    // disabled: false,
    // clearable: true,
    // format: 'yyyy-MM-dd',
    // 'value-format': 'yyyy-MM-dd',
    // readonly: false
  },
  {
    componentConfig: {
      label: '日期范围',
      tag: 'el-date-picker',
      tagIcon: 'date-range',
      defaultValue: null,
      span: 24,
      showLabel: true,
      labelWidth: null,
      required: true,
      layout: 'colFormItem',
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
    },
    style: { width: '100%' },
    type: 'daterange',
    'range-separator': '至',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false
  },
  // {
  //   componentConfig: {
  //     label: '评分',
  //     tag: 'el-rate',
  //     tagIcon: 'rate',
  //     defaultValue: 0,
  //     span: 24,
  //     showLabel: true,
  //     labelWidth: null,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: [],
  //     changeTag: true,
  //     document: 'https://element.eleme.cn/#/zh-CN/component/rate'
  //   },
  //   style: {},
  //   max: 5,
  //   'allow-half': false,
  //   'show-text': false,
  //   'show-score': false,
  //   disabled: false
  // },
  // {
  //   componentConfig: {
  //     label: '颜色选择',
  //     tag: 'el-color-picker',
  //     tagIcon: 'color',
  //     span: 24,
  //     defaultValue: null,
  //     showLabel: true,
  //     labelWidth: null,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: [],
  //     changeTag: true,
  //     document: 'https://element.eleme.cn/#/zh-CN/component/color-picker'
  //   },
  //   'show-alpha': false,
  //   'color-format': '',
  //   disabled: false,
  //   size: 'medium'
  // },
  // {
  //   componentConfig: {
  //     label: '上传',
  //     tag: 'el-upload',
  //     tagIcon: 'upload',
  //     layout: 'colFormItem',
  //     defaultValue: null,
  //     showLabel: true,
  //     labelWidth: null,
  //     required: true,
  //     span: 24,
  //     showTip: false,
  //     buttonText: '点击上传',
  //     regList: [],
  //     changeTag: true,
  //     fileSize: 2,
  //     sizeUnit: 'MB',
  //     document: 'https://element.eleme.cn/#/zh-CN/component/upload'
  //   },
  //   __slot__: {
  //     'list-type': true
  //   },
  //   action: 'https://jsonplaceholder.typicode.com/posts/',
  //   disabled: false,
  //   accept: '',
  //   name: 'file',
  //   'auto-upload': true,
  //   'list-type': 'text',
  //   multiple: false
  // }
]

// 布局型组件 【左面板】
export const layoutComponents = [
  {
    componentConfig: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '行容器',
      tag: 'el-row'
    }
  },
  {
    componentConfig: {
      label: '按钮',
      tag: 'el-button',
      tagIcon: 'button',
      span: 24,
      layout: 'button'
    }
  }
]

export const packageJSON = {
  Root: {
    config: {
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
            default: "function willMount(ctx) {\n console.log('willMount', ctx)  \n}",
            eventType: 'page',
            actionName: 'willMount'
          },
          didMount: {
            type: 'event',
            name: '页面加载完后执行',
            default: "function didMount(ctx) {\n console.log('willMount', ctx)  \n}",
            eventType: 'page',
            actionName: 'didMount'
          },
          willUnMount: {
            type: 'event',
            name: '页面销毁前执行',
            default: "function willUnMount(ctx) {\n  console.log('willUnMount', ctx) \n}",
            eventType: 'page',
            actionName: 'willUnMount'
          }
        }
      }
    }
  },
  RootContent: {
    config: {
      rootContentPadding: {
        name: '默认间距',
        type: 'choice',
        options: [{
          text: '无间距',
          value: "0"
        }, {
          text: '20px',
          value: '20'
        }, {
          text: '12px',
          value: '12'
        }],
        default: '0'
      },
      rootBackgroundColor: {
        name: '背景色',
        type: 'choice',
        default: 'white',
        options: [{
          text: '白色',
          value: 'white'
        }, {
          text: '透明',
          value: 'transparent'
        }]
      }
    }
  },
  'vc-text': {
    config: {
      text: {
        type: 'el-input',
        name: '文案',
        default: '标题',
        description: ''
      },
      anchor: {
        type: 'el-input',
        name: '锚点',
        default: '',
        description: ''
      },
      type: {
        name: '类型',
        type: 'choice',
        options: [{
          text: '一级',
          value: 'primary'
        }, {
          text: '二级',
          value: 'secondary'
        }, {
          text: '三级',
          value: 'thirdary'
        }]
      },
      noDecoration: {
        name: '纯文字',
        tip: '没有额外的间距和修饰物，不能开箱即用，但具有更加灵活的组合能力',
        type: 'el-switch',
        default: false
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          }
        }
      }
    }
  },
  'el-button': {
    config: {
      title: {
        type: 'el-input',
        default: '主要按钮',
        name: '标题',
        description: ''
      },
      type: {
        type: 'el-select',
        default: 'primary',
        options: [{
          label: '默认按钮',
          type: 'default'
        }, {
          label: '主要按钮',
          value: 'primary'
        }, {
          label: '成功按钮',
          value: 'success'
        }, {
          label: '信息按钮',
          value: 'info'
        }, {
          label: '警告按钮',
          value: 'warning'
        }, {
          label: '危险按钮',
          value: 'danger'
        }],
        name: '按钮类型',
        description: ''
      },
      size: {
        name: '尺寸',
        type: 'choice',
        options: [{
          text: '中等',
          value: 'medium'
        }, {
          text: '较小',
          value: 'small'
        }, {
          text: '迷你',
          value: 'mini'
        }],
        default: 'mini',
        description: ''
      },
      defaultBehavior: {
        name: '默认状态',
        type: 'choice',
        options: [{
          text: '普通',
          value: 'normal'
        }, {
          text: '禁用',
          value: 'disabled'
        }],
        default: 'normal',
        description: ''
      },
      iconName: {
        name: '图标',
        type: 'el-input',
        default: '',
        description: ''
      },
      iconFill: {
        name: '图标颜色',
        type: 'el-input',
        default: '',
        description: ''
      },
      loading: {
        type: 'el-switch',
        name: '加载状态',
        default: false,
        description: ''
      },
      triggerEventsWhenLoading: {
        type: 'el-switch',
        name: '加载点击',
        default: false,
        description: '当按钮为加载状态时,是否响应动作'
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          },
          action: {
            type: 'group',
            name: '动作设置',
            children: {
              events: {
                type: 'customEvent',
                name: '新建动作',
                events: [{
                  name: 'onClick',
                  title: '当点击时',
                  actions: [{
                    id: '__submitForm__',
                    isSystem: true,
                    name: '提交表单',
                    params: [{
                      name: 'formId',
                      title: '表单容器标识',
                      setter: {
                        render() {
                          return (
                            <TextSetter/>
                          )
                        }
                      }
                    }, {
                      defaultValue: "function submitForm({ ctx, data, fullData, success, errMsg }) {↵  console.log(data, fullData, success);↵  if (success) {↵    ctx.fn.fetch({↵      url: 'https://dip.alibaba-inc.com/api/v2/services/schema/mock/69980',↵      jsonp: true,↵      data: data↵    }).then((content) => {↵      console.log(content);↵      ctx.fn.toast({↵        type: 'success',↵        title: '提交成功',↵      });↵    }).catch((error) => {↵      console.log(error);↵      ctx.fn.toast({↵        type: 'error',↵        title: error.message,↵      })↵    })↵  }↵}",
                      name: 'callback',
                      title: '操作函数',
                      setter: {
                        render() {
                          return (
                            <CodeSetter
                              customStyle={{ width: '600px', height: '300px' }}
                              value="function submitForm({ ctx, data, fullData, success, errMsg }) {\n}"
                              editorConfig={{
                                language: 'javascript'
                              }}></CodeSetter>
                          )
                        }
                      }
                    }]
                  }, {
                    id: '__resetForm__',
                    isSystem: true,
                    name: '重置表单',
                    params: [{
                      name: 'formId',
                      title: '表单容器标识',
                      setter: {
                        render() {
                          return (
                            <TextSetter/>
                          )
                        }
                      }
                    }, {
                      defaultValue: 'function resetForm({ ctx }) {}',
                      name: 'callback',
                      title: '操作函数',
                      setter: {
                        render() {
                          return (
                            <CodeSetter
                              customStyle={{ width: '600px', height: '300px' }}
                              value="function resetForm({ ctx }) {}"
                              editorConfig={{
                                language: 'javascript',
                                value: 'function resetForm({ ctx }) {}'
                              }}></CodeSetter>
                          )
                        }
                      }
                    }]
                  }]
                }],
                default: [],
                description: ''
              }
            }
          }
        }
      }
    }
  },
  'el-row': {
    config: {
      span: {
        type: 'el-slider',
        name: '栅格',
        default: 24,
        description: ''
      },
      gutter: {
        type: 'el-slider',
        name: '栅格间隔',
        default: 0,
        description: ''
      },
      type: {
        type: 'choice',
        name: '布局模式',
        default: 'default',
        options: [{
          text: 'default',
          value: 'default'
        }, {
          text: 'flex',
          value: 'flex'
        }]
      },
      justify: {
        type: 'el-select',
        name: '水平排列',
        options: [{
          label: 'start',
          value: 'start'
        },
        {
          label: 'end',
          value: 'end'
        },
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'space-around',
          value: 'space-around'
        },
        {
          label: 'space-between',
          value: 'space-between'
        }],
        default: 'space-around',
        description: '',
        show: [
          [
            'type',
            '$eq',
            'flex'
          ]
        ]
      },
      align: {
        name: '垂直排列',
        type: 'choice',
        default: 'middle',
        options: [{
          text: 'top',
          value: 'top'
        }, {
          text: 'middle',
          value: 'middle'
        }, {
          text: 'bottom',
          value: 'bottom'
        }],
        show: [
          [
            'type',
            '$eq',
            'flex'
          ]
        ]
      }
    }
  },
  'el-input': {
    config: {
      label: {
        type: 'el-input',
        name: '标题',
        default: '单行输入',
        description: ''
      },
      showLabel: {
        type: 'el-switch',
        name: '显示标题',
        default: true,
        description: ''
      },
      labelWidth: {
        type: 'el-input-number',
        name: '标签宽度',
        default: '130',
        description: ''
      },
      placeholder: {
        type: 'el-input',
        name: '提示文字',
        default: '请输入',
        description: ''
      },
      defaultValue: {
        type: 'el-input',
        name: '默认值',
        default: undefined,
        description: ''
      },
      layout: {
        name: '展现方式',
        type: 'choice',
        default: 'HORIZONTAL',
        options: [{
          text: '横向',
          value: 'HORIZONTAL'
        }, {
          text: '纵向',
          value: 'VERTICAL'
        }],
        description: '仅对非表单有效'
      },
      size: {
        name: '尺寸',
        type: 'choice',
        options: [{
          text: '中等',
          value: 'large'
        }, {
          text: '较小',
          value: 'small'
        }, {
          text: '迷你',
          value: 'mini'
        }],
        default: 'mini',
        description: ''
      },
      span: {
        type: 'el-slider',
        name: '表单栅格',
        default: 24,
        description: ''
      },
      defaultBehavior: {
        name: '默认状态',
        type: 'choice',
        options: [{
          text: '普通',
          value: 'normal'
        }, {
          text: '禁用',
          value: 'disabled'
        }, {
          text: '只读',
          value: 'readonly'
        }],
        default: 'normal',
        description: ''
      },
      more: {
        type: 'group',
        name: '更多',
        children: {
          clearable: {
            type: 'el-switch',
            name: '能否清空',
            default: false,
            description: ''
          },
          maxlength: {
            type: 'el-input-number',
            name: '最多输入',
            default: null,
            description: ''
          },
          'show-password': {
            type: 'el-switch',
            name: '密码模式',
            default: false,
            description: ''
          },
          'show-word-limit': {
            type: 'el-switch',
            name: '输入统计',
            default: false,
            description: ''
          },
          'prefix-icon': {
            type: 'icon',
            name: '前图标',
            default: '',
            description: '',
            setter: {
              render(h, prop) {
                return (
                  <IconList selected={prop.value} handlerSelect={(value) => prop.handlerSelect(value)}></IconList>
                )
              }
            }
          },
          'suffix-icon': {
            type: 'icon',
            name: '后图标',
            default: '',
            description: '',
            setter: {
              render(h, prop) {
                return (
                  <IconList selected={prop.value} handlerSelect={(value) => prop.handlerSelect(value)}></IconList>
                )
              }
            }
          }
        }
      },
      validation: {
        name: '校验',
        type: 'reg',
        default: [],
        supports: ["required", "minLength", "maxLength", "email", "mobile", "url", "mac"],
        description: ''
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          },
          renderLabel: {
            type: 'block',
            name: '定制渲染标题',
            setter: {
              render(h, prop) {
                console.log("定制渲染标题", prop)
                return (
                  <Block title="定制渲染标题">
                    <ActionSetter defaultActionName="renderLabel" defaultCode="function renderLabel(label, ctx) {\n  return label;\n}" value={prop.value} handleChange={(param) => prop.handleChange(param, prop.keyChain) }></ActionSetter>
                  </Block>
                )
              }
            }
          }
        }
      },
      events: {
        name: '高级',
        type: 'group-event',
        default: [{
          type: 'blur',
          name: '失去焦点时',
          methodName: 'blur'
        },
        {
          type: 'change',
          name: '值发生改变时',
          methodName: 'change'
        },
        {
          type: 'keyDown',
          name: '键按下时',
          methodName: 'keyDown'
        }],
        description: ''
      }
    }
  },
  'el-select': {
     config: {
      label: {
        type: 'el-input',
        name: '标题',
        default: '下拉选择',
        description: ''
      },
      showLabel: {
        type: 'el-switch',
        name: '显示标题',
        default: true,
        description: ''
      },
      labelWidth: {
        type: 'el-input-number',
        name: '标签宽度',
        default: '',
        description: ''
      },

      placeholder: {
        type: 'el-input',
        name: '提示文字',
        default: '请输入',
        description: ''
      },
      multiple: {
        type: 'el-switch',
        name: '多选模式',
        default: false,
        description: ''
      },
      dataSource: {
        type: 'composite',
        name: '选项',
        display: "plain",
        default:{
          options:[{
            "text": "选项一",
            "value": "1",
          },{
            "text": "选项二",
            "value": "21221"
          },
          {
            "text": "选项三",
            "value": "3"
          },
          {
            "text": "新选项",
            "value": "option_kdmfadrz",
          }],
          multiOptions: [{
            "text": "多选选项一",
            "value": "1"
          },
          {
            "text": "多选选项二",
            "value": "2"
          },
          {
            "text": "多选选项三",
            "value": "3"
          }],
          "searchConfig": {
            "dataType": "jsonp",
            "fetchDataOnMount": true,
            "beforeFetch": "function willFetch(params) { \n  return params;\n}",
            "afterFetch": "function didFetch(content) { \n  return content;\n}"
          }
        },
        items: [{
          name: "options",
          display: "block",
          title: "选项",
          supportVariable: !0,
          defaultValue: [{
            text: "选项一",
            value: "1"
          },{
            text: "选项二",
            value: "2"
          }, {
            text: "选项三",
            value: "3"
          }],
          setter: {
            render(h, prop) {
              if(!prop.getPropValue("multiple")) {
                return (
                  <Block title="选项">
                      <OptionsSetter prop={prop}></OptionsSetter>
                  </Block>
                )
              }
            }
          }
        }, {
          name: "multiOptions",
          display: "block",
          title: "选项",
          supportVariable: !0,
          defaultValue: [{
            text: "选项一",
            value: "1"
          },{
            text: "选项二",
            value: "2"
          }, {
            text: "选项三",
            value: "3"
          }],
          setter: {
            render(h, prop) {
            
              if(prop.getPropValue("multiple")) {
                console.log("prop.getPropValue(multiple)", prop.getPropValue("multiple"))
                return (
                  <Block title="多选项">
                      <OptionsSetter prop={prop} multiple={!0}></OptionsSetter>
                  </Block>
                )
              }
            }
          }
        }, {
          name: "searchConfig",
          display: "accordion",
          type: "composite",
          collapsed: !0,
          initialValue: {
            dataType: "jsonp",
            fetchDataOnMount: !0,
            beforeFetch: "function willFetch(params) { \n  return params;\n}",
            afterFetch: "function didFetch(content) { \n  return content;\n}"
          },
          title: '搜索数据源',
          items: [{
            name: "dataType",
            title: '方式',
            display: "inline",
            setter:  {
              render(h, prop) {
                console.log("搜索数据源", prop)
                return (
                  <inline-field  class-names="engine-setting-field engine-inline-field" title="方式">
                    <ChoiceGroup value={prop.childrenValue} {...{on:{change: (param) => prop.setHotValue(param)}}}>
                      {
                        [{
                          text: "GET",
                          value: "get"
                        }, {
                          text: "POST",
                          value: "post"
                        }, {
                          text: "JSONP",
                          value: "jsonp"
                        }].map((item, index) => {
                          return (
                            <ChoiceItem key={index} label={item.value}>{item.text}</ChoiceItem>
                          )
                        })
                      }
                    </ChoiceGroup>
                  </inline-field>
                )
              }
            }
          }, {
            name: "url",
            title: '地址',
            setter: {
              render(h, prop) {
                //URL地址
                return (
                  <Block title="地址">
                    <el-input placeholder="url地址" vModel={prop.childrenValue} {...{on:{change: (param) => prop.setHotValue(param)}}}/>
                  </Block>
                )
              }
            }
          }, {
            name: "fetchDataOnMount",
            title: '组件 Mount 后立刻加载数据',
            setter: {
              render(h, prop) {
                return ( 
                  <Block title="组件 Mount 后立刻加载数据">
                     <BoolControl value={prop.childrenValue} handlerChange= {(param) => prop.setHotValue(param)}></BoolControl>
                  </Block>
                )
              }
            }
          }, {
            name: "beforeFetch",
            title: '请求处理函数',
            setter: {
              render(h) {
                return (
                  <Block title="请求处理函数">
                    <ActionSetter></ActionSetter>
                  </Block>
                )
              }
            }
          }, {
            name: "afterFetch",
            title: "数据处理函数",
            setter: {
              render(h) {
                return (
                  <Block title="请求处理函数">
                      <ActionSetter></ActionSetter>
                  </Block>
                )
              }
            }
          }]
        }]
      },
      more: {
        type: 'group',
        name: '更多配置',
        children: {
          clearable: {
            type: 'el-switch',
            name: '能否清空',
            default: false,
            description: ''
          },
          readonly: {
            type: 'el-switch',
            name: '是否只读',
            default: false,
            description: ''
          },
          disabled: {
            type: 'el-switch',
            name: '是否禁用',
            default: false,
            description: ''
          },
          defaultValue: {
            type: 'el-input',
            name: '默认值',
            default: '',
            description: ''
          },
          span: {
            type: 'el-slider',
            name: '表单栅格',
            default: 24,
            description: ''
          },
        }
      },
      
      validation: {
        name: '校验',
        type: 'reg',
        default: [],
        supports: ["required"],
        description: ''
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          },
          renderLabel: {
            type: 'block',
            name: '定制渲染标题',
            setter: {
              render(h, prop) {
                console.log("定制渲染标题", prop)
                return (
                  <Block title="定制渲染标题">
                    <ActionSetter defaultActionName="renderLabel" defaultCode="function renderLabel(label, ctx) {\n  return label;\n}" value={prop.value} handleChange={(param) => prop.handleChange(param, prop.keyChain) }></ActionSetter>
                  </Block>
                )
              }
            }
          }
        }
      }
     }
  },
  'el-radio-group': {
    config: {
      label: {
        type: 'el-input',
        name: '标题',
        default: '单选框组  ',
        description: ''
      },
      showLabel: {
        type: 'el-switch',
        name: '显示标题',
        default: true,
        description: ''
      },
      labelWidth: {
        type: 'el-input-number',
        name: '标签宽度',
        default: '',
        description: ''
      },
      readonly: {
        type: 'el-switch',
        name: '是否只读',
        default: false,
        description: ''
      },
      disabled: {
        type: 'el-switch',
        name: '是否禁用',
        default: false,
        description: ''
      },
      dataSource: {
        type: 'composite',
        name: '选项',
        children: {
          options: {
            type: "options",
            title: "选项",
            supportVariable: !0,
            show: [
              [
                '..multiple',
                '$ne',
                true
              ]
            ],
            default: [{
              text: '选项一',
              value: "1"
            }, {
              text: '选项二',
              value: "2"
            }, {
              text: '选项三',
              value: "3"
            }]
          }
        }
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          },
          renderLabel: {
            type: 'block',
            name: '定制渲染标题',
            setter: {
              render(h, prop) {
                console.log("定制渲染标题", prop)
                return (
                  <Block title="定制渲染标题">
                    <ActionSetter defaultActionName="renderLabel" defaultCode="function renderLabel(label, ctx) {\n  return label;\n}" value={prop.value} handleChange={(param) => prop.handleChange(param, prop.keyChain) }></ActionSetter>
                  </Block>
                )
              }
            }
          }
        }
      }
    }
  },
  'el-checkbox-group': {
    config: {
      label: {
        type: 'el-input',
        name: '标题',
        default: '多选框  ',
        description: ''
      },
      showLabel: {
        type: 'el-switch',
        name: '显示标题',
        default: true,
        description: ''
      },
      labelWidth: {
        type: 'el-input-number',
        name: '标签宽度',
        default: '',
        description: ''
      },
      readonly: {
        type: 'el-switch',
        name: '是否只读',
        default: false,
        description: ''
      },
      disabled: {
        type: 'el-switch',
        name: '是否禁用',
        default: false,
        description: ''
      },
      defaultValue: {
        type: 'el-input',
        name: '默认值',
        default: [1,2],
        description: ''
      },
      validation: {
        name: '校验',
        type: 'reg',
        default: [],
        supports: ["required"],
        description: ''
      },
      dataSource: {
        type: 'composite',
        name: '选项',
        children: {
          options: {
            type: "options",
            title: "选项",
            supportVariable: !0,
            default: [{
              text: '选项一',
              value: 1
            }, {
              text: '选项二',
              value: 2
            }, {
              text: '选项三',
              value: 3
            }]
          }
        }
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          },
          renderLabel: {
            type: 'block',
            name: '定制渲染标题',
            setter: {
              render(h, prop) {
                console.log("定制渲染标题", prop)
                return (
                  <Block title="定制渲染标题">
                    <ActionSetter defaultActionName="renderLabel" defaultCode="function renderLabel(label, ctx) {\n  return label;\n}" value={prop.value} handleChange={(param) => prop.handleChange(param, prop.keyChain) }></ActionSetter>
                  </Block>
                )
              }
            }
          }
        }
      }
    }
  },
  'el-date-picker': {
    config: {
      label: {
        type: 'el-input',
        name: '日期选择',
        default: '时间选择',
        description: ''
      },
      labelWidth: {
        type: 'el-input-number',
        name: '标签宽度',
        default: '',
        description: ''
      },
      showLabel: {
        type: 'el-switch',
        name: '显示标题',
        default: true,
        description: ''
      },
      placeholder: {
        type: 'el-input',
        name: '提示文字',
        default: '请选择日期',
        description: ''
      },
      size: {
        name: '尺寸',
        type: 'choice',
        options: [{
          text: '中等',
          value: 'medium'
        }, {
          text: '较小',
          value: 'small'
        }, {
          text: '迷你',
          value: 'mini'
        }],
        default: 'mini',
        description: ''
      },
      span: {
        type: 'el-slider',
        name: '表单栅格',
        default: 24,
        description: ''
      },
      type: {
        type: 'el-select',
        name: '类型',
        default: '',
        options: [{
          value: 'normal',
          text: '默认'
        },{
          value: 'daterange',
          text: '区间'
        }]
      },
      rangeSeparator: {
        type: 'el-input',
        name: '分隔符',
        default: '至'
      },
      startPlaceholder: {
        type: 'el-input',
        name: '开始日期占位',
        default: '开始日期'
      },
      endPlaceholder: {
        type: 'el-input',
        name: '结束日期占位',
        default: '结束日期'
      },
      format: {
        type: 'el-select',
        name: '格式',
        default: '',
        options: [{
          value: 'yyyy',
          text: 'YYYY'
        }, {
          value: 'yyyy-MM',
          text: 'yyyy-MM'
        }, {
          value: 'yyyy-MM-dd',
          text: 'yyyy-MM-dd'
        }, {
          value: 'yyyy-MM-dd HH:mm:ss',
          text: 'yyyy-MM-dd HH:mm:ss'
        }],
        description: ''
      },
      validation: {
        name: '校验',
        type: 'reg',
        default: [],
        supports: ["required"],
        description: ''
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          },
          renderLabel: {
            type: 'block',
            name: '定制渲染标题',
            setter: {
              render(h, prop) {
                console.log("定制渲染标题", prop)
                return (
                  <Block title="定制渲染标题">
                    <ActionSetter defaultActionName="renderLabel" defaultCode="function renderLabel(label, ctx) {\n  return label;\n}" value={prop.value} handleChange={(param) => prop.handleChange(param, prop.keyChain) }></ActionSetter>
                  </Block>
                )
              }
            }
          }
        }
      }
    }
  },
  'el-time-picker': {
    config: {

    }
  },
  'pro-table': {
    config: {
      width: {
        type: "el-input",
        name: "宽度",
        default: 'auto'
      },
      height: {
        type: "el-input",
        name: "高度",
        default: 'auto'
      },
      columns: {
        type: 'accordion',
        name: '数据列配置',
        initialValue: [{
          dataKey: "name",
          editKey: "nameId",
          title: "姓名",
          width: 130,
          dataType: "custom"
      }, {
          dataKey: "email",
          title: "邮件地址",
          width: 200,
          dataType: "custom"
      }, {
          dataKey: "entryDate",
          editKey: "entryDateId",
          title: "入职日期",
          dataType: "timestamp",
          timeFormatter: "YYYY-MM-DD",
          width: 180
      }, {
          dataKey: "contractDate",
          editKey: "contractDateId",
          title: "合同日期",
          dataType: "cascadeTimestamp",
          timeFormatter: "YYYY-MM-DD",
          width: 200
      }],
        default: [{
          prop: "name",
          label: '姓名',
          width: 130
        }, {
          prop: "email",
          label: "邮件地址",
          width: 200
        },{
          prop: 'entryDate',
          label: '入职日期'
        }, {
          prop: 'contractDate',
          label: '合同日期'
        }],
        require: !1,
        display: 'accordion',
        setter: {
          render(h) {
            const onAddOptionData = (param) => {

            }
            const configure = [{
              name: "title",
              title: "标题",
              editable: !0,
              supportVariable: !0,
              setter: {
                render(h, props) {
                  console.log("dataTitle", props)
                  return (
                    <TextSetter value={props.value} key={props.title}/>
                  )
                }
              },
            }, {
              name: "dataKey",
              title: "数据字段",
              display: "inline",
              initialValue: "",
              editable: !1,
              supportVariable: !0,
              setter: {
                render(h, props) {
                  return (
                    <TextSetter value={props.value} key={props.title}/>
                  )
                }
              },
            },{
              name: "dataKey",
              title: "数据字段",
              display: "inline",
              initialValue: "name",
              supportVariable: !0,
              editable: !0,
              setter: {
                render(h, props) {
                  return (
                    <TextSetter value={props.value} key={props.title}/>
                  )
                }
              },
            }, {
              name: "fieldsetCode",
              title: '绑定字段集',
              display: "none",
              initialValue: "",
              editable: !1,
              setter: {
                render(h) {
                  return (
                    <el-input value="1"/>
                  )
                }
              },
            }, {
              name: "editKey",
              title: "编辑字段",
              display: "inline",
              setter: {
                render(h) {
                  return (
                    <el-input value="1"/>
                  )
                }
              },
            }, {
              name: "dataType",
              title: '数据类型',
              display: "inline",
              initialValue: "custom",
              setter: {
                render(h) {
                  return (
                    <el-input value="1"/>
                  )
                }
              },
            }, {
              name: 'linkedPage',
              title: '关联页面设置'
            }]
            const hotValue =[{
              dataKey: "name",
              editKey: "nameId",
              title: "姓名",
              width: 130,
              dataType: "custom"
          }, {
              dataKey: "email",
              title: "邮件地址",
              width: 200,
              dataType: "custom"
          }, {
              dataKey: "entryDate",
              editKey: "entryDateId",
              title: "入职日期",
              dataType: "timestamp",
              timeFormatter: "YYYY-MM-DD",
              width: 180
          }, {
              dataKey: "contractDate",
              editKey: "contractDateId",
              title: "合同日期",
              dataType: "cascadeTimestamp",
              timeFormatter: "YYYY-MM-DD",
              width: 200
          }]
            const descriptor = (config) => {
              return (
                <span key={config.id}>
                  <b>{config.getParamValue('title') || '-'}</b>
                  <i style={{fontStyle: "italic"}}>{config.getParamValue('dataKey')}</i>
                </span>
              )
            }
            return (
              <ListSetter 
                descriptor={descriptor}
                checkField={null} 
                addable={!0} 
                editable={!0} 
                display="drawer" 
                options={[]}
                prop={{
                  hotValue: hotValue
                }}
                onAddOptionData={onAddOptionData} 
                configure={configure} options={() => {}}>
              </ListSetter>
            )
          }
        }
      },
      tablePcStyle: {
        type: 'entry',
        name: '风格',
        default: {
          size: 'mini',
          theme: 'split',
          expandIconType: 'arrow'
        },
        items: [{
          name: "size",
          title: "尺寸",
          type: "block",
          default: "middle",
          supportVariable: !0,
          setter: {
            render(h) {
              return <Block title="尺寸">
                  <choice-group>
                      {
                        [{
                          text: '大',
                          value: 'medium'
                        }, {
                          text: '中',
                          value: 'small'
                        }, {
                          text: '小',
                          value: 'mini'
                        }].map((item, index) => {
                          return (
                            <choice-item key={index} label={item.value}>{item.text}</choice-item>
                          )
                        })
                      }
                  </choice-group>
              </Block>
            }
          }
        }, {
          name: "theme",
          title: "主题",
          type: "block",
          default: "split",
          setter: {
            render(h) {
              return <Block title="主题">
                <choice-group>
                  {
                        [{
                          text: '斑马纹',
                          value: 'zebra'
                        }, {
                          text: '分割线',
                          value: 'split'
                        }, {
                          text: '边框',
                          value: 'border'
                        }].map((item, index) => {
                          return (
                            <choice-item key={index} label={item.value}>{item.text}</choice-item>
                          )
                        })
                  }
                </choice-group>
              </Block>
            }
          }
        }, {
          name: 'expandIconType',
          title: 'tablePcExpandIconType',
          type: "block",
          default: "arrow",
          setter: {
            render(h) {
              return <Block title="展开按钮样式">
                 <choice-group>
                  {
                        [{
                          text: '箭头',
                          value: 'arrow'
                        }, {
                          text: '加减号',
                          value: 'adderSubtractor'
                        }].map((item, index) => {
                          return (
                            <choice-item key={index} label={item.value}>{item.text}</choice-item>
                          )
                        })
                  }
                </choice-group>
              </Block>
            }
          }
        }]
      },
      tablePcOperationColumn: {
        type: 'entry',
        name: '操作列',
        items: [{
          name: 'actionTitle',
          title: '列标题',
          supportVariable: !0,
          default: '操作',
          initialValue: '操作',
          setter: {
            render(h) {
              return (
                <inline-field class-names="engine-setting-field engine-inline-field" title="列标题">
                  <TextSetter></TextSetter>
                </inline-field >
              )
            }
          }
        }, {
          name: "actionType",
          title: "按钮类型",
          default: "link",
          initialValue: "link",
          supportVariable: !0,
          setter: {
            render(h) {
              return (
                <inline-field class-names="engine-setting-field engine-inline-field" title="按钮类型">
                  <choice-group style="width: 180px">
                        {
                          [{
                            value: "link",
                            text: "链接"
                          }, {
                            value: "button",
                            text: "按钮"
                          }].map((item, index) => {
                            return (
                              <choice-item key={index} label={item.value}>{item.text}</choice-item>
                            )
                          })
                        }
                  </choice-group>
                </inline-field >
              )
            }
          }
        }, {
          name: "actionFixed",
          title: "列固定",
          display: "inline",
          initialValue: "none",
          supportVariable: !0,
          setter: {
            render(h) {
              return (
                <inline-field class-names="engine-setting-field engine-inline-field" title="列固定">
                  <choice-group style="width: 180px">
                       {
                          [{
                            value: "none",
                            text: '无'
                          }, {
                            value: "left",
                            text: "左"
                          }, {
                            value: "right",
                            text: "右"
                          }].map((item, index) => {
                                return (
                                  <choice-item key={index} label={item.value}>{item.text}</choice-item>
                                )
                          })
                      }
                  </choice-group>
                </inline-field >
              )
            }
          }
        }, {
          name: "hidden",
          title: "是否隐藏",
          display: "inline",
          initialValue: !1,
          setter: {
            render(h) {
              return <inline-field class-names="engine-setting-field engine-inline-field" title="列固定">
                      <BoolControl></BoolControl>
              </inline-field>
            }
          },
          supportVariable: !0
      }]
      },
      tablePcDataSource: {
        type: 'entry',
        name: '数据源',
        items: [{
          name: 'dataSourceType',
          title: '类型',
          default: 'url',
          setter: {
            render(h) {
              return <inline-field class-names="engine-setting-field engine-inline-field" title="类型">
                 <choice-group>
                  {
                        [{
                          text: 'URL',
                          value: 'url'
                        }, {
                          text: 'data',
                          value: 'data'
                        }].map((item, index) => {
                          return (
                            <choice-item key={index} label={item.value}>{item.text}</choice-item>
                          )
                        })
                  }
                </choice-group>
              </inline-field>
            }
          }
        }, {
          name: 'fetchUrl',
          title: '数据源',
          default: '',
          setter: {
            render(h) {
              return <Block title="数据源"></Block>
            }
          }
        },{
          name: 'fetchParams',
          title: '请求携带参数',
          default: '',
          setter: {
            render(h) {
              return <Block title="请求携带参数"></Block>
            }
          }
        },{
          name: 'beforeFetch',
          title: '请求参数处理',
          default: '',
          setter: {
            render(h) {
              return <Block title="请求参数处理"></Block>
            }
          }
        },{
          name: 'fitResponse',
          title: '返回参数预处理',
          default: '',
          setter: {
            render(h) {
              return <Block title="返回参数预处理"></Block>
            }
          }
        }, {
          name: 'processData',
          title: '返回数据处理',
          default: '',
          setter: {
            render(h) {
              return <Block title="返回数据处理"></Block>
            }
          }
        },{
          name: 'fetchError',
          title: '请求出错处理',
          default: '',
          setter: {
            render(h) {
              return <Block title="请求出错处理"></Block>
            }
          }
        },{
          name: 'fetchMethod',
          title: '请求方式',
          default: '',
          setter: {
            render(h) {
              return <Block title="请求方式"></Block>
            }
          }
        },{
          name: 'fetchDataOnMount',
          title: '是否立即请求数据',
          default: '',
          setter: {
            render(h) {
              return <Block title="请求方式"></Block>
            }
          }
        }]
      },
      tablePcTopOperation: {
        type: 'group',
        name: '顶部操作',
      },
      tablePcRowSelector: {
        type: 'group',
        name: '行选择器',
      },
      tablePcTreeForm: {
        type: 'group',
        name: '树形表格'
      },
      tablePcInlineEditing: {
        type: 'group',
        name: '行内编辑'
      },
      tablePcPagination: {
        type: 'entry',
        name: '分页',
        items: [{
          title: '默认显示多少条',
          name: 'pageSize',
          setter:{
            render(h) {
              return (
                <Block title="默认显示多少条"></Block>
              )
            }
          }
        }, {
          title: '每页可以显示多少条',
          name: 'pagerSizeOptions',
          setter:{
            render(h) {
              return (
                <Block title="每页可以显示多少条"></Block>
              )
            }
          }
        }, {
          title: '显示总数',
          name: 'showPagerTotal',
          setter:{
            render(h) {
              return (
                <Block title="显示总数"></Block>
              )
            }
          }
        }, {
          title: '显示条数修改器',
          name: 'showPagerSizeChanger',
          setter:{
            render(h) {
              return (
                <Block title="显示条数修改器"></Block>
              )
            }
          }
        }, {
          title: '显示快速跳转',
          name: 'showPagerQuickJumper',
          setter:{
            render(h) {
              return (
                <Block title="显示快速跳转"></Block>
              )
            }
          }
        }]
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          }
        }
      }
    }
  },
  'el-form': {
    config: {
      formRef: {
        type: 'el-input',
        name: '表单名称',
        default: 'elForm',
        description: ''
      },
      formModel: {
        type: 'el-input',
        name: '表单模型',
        default: 'formData',
        description: ''
      },
      formRules: {
        type: 'el-input',
        name: '校验模型',
        default: 'rules',
        description: ''
      },
      unFocusedComponentBorder: {
        name: '显示边框',
        type: 'el-switch',
        default: true,
        description: ''
      },
      batchAll: {
        type: 'group',
        name: '批量设置',
        children: {
          size: {
            type: 'choice',
            name: '尺寸',
            default: 'medium',
            options: [{
              text: '中等',
              value: 'medium'
            }, {
              text: '较小',
              value: 'small'
            }, {
              text: '迷你',
              value: 'mini'
            }],
            description: ''
          },
          fieldBehavior: {
            type: 'choice',
            name: '默认状态',
            options: [{
              text: '普通',
              value: 'normal'
            }, {
              text: '禁用',
              value: 'disabled'
            }],
            default: 'normal',
            description: ''
          },
          labelPosition: {
            type: 'choice',
            name: '标签对齐',
            options: [{
              text: '左对齐',
              value: 'left'
            }, {
              text: '右对齐',
              value: 'right'
            }, {
              text: '顶部对齐',
              value: 'top'
            }],
            default: 'right',
            description: ''
          },
          labelWidth: {
            type: 'el-input-number',
            name: '标签宽度',
            default: 100,
            description: ''
          },
          gutter: {
            type: 'el-slider',
            name: '栅格间隔',
            default: 15,
            description: ''
          }
        },
        fold: true
      },
      dataSource: {
        type: 'group',
        name: '表单数据源',
        children: {
          type: {
            type: 'choice',
            name: '类型',
            options: [{
              text: 'URL',
              value: 'url'
            }, {
              text: 'DATA',
              value: 'data'
            }],
            default: 'url',
            description: ''
          },
          method: {
            type: 'choice',
            name: '方式',
            options: [{
              text: 'GET',
              value: 'get'
            }, {
              text: 'POST',
              value: 'post'
            }, {
              text: 'JSONP',
              value: 'jsonp'
            }],
            default: 'get',
            description: ''
          },
          url: {
            name: '地址',
            type: 'el-input',
            default: '',
            description: ''
          }
        }
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          }
        }
      }
    }
  },
  'el-cascader': {
    config: {
      label: {
        type: 'el-input',
        name: '标题',
        default: '级联选择',
        description: ''
      },
      showLabel: {
        type: 'el-switch',
        name: '显示标题',
        default: true,
        description: ''
      },
      labelWidth: {
        type: 'el-input-number',
        name: '标签宽度',
        default: '130',
        description: ''
      },
      size: {
        name: '尺寸',
        type: 'choice',
        options: [{
          text: '中等',
          value: 'large'
        }, {
          text: '较小',
          value: 'small'
        }, {
          text: '迷你',
          value: 'mini'
        }],
        default: 'mini',
        description: ''
      },
      span: {
        type: 'el-slider',
        name: '表单栅格',
        default: 24,
        description: ''
      },
      dataSource: {
        name: '数据源',
        type: 'group'
      },
      validation: {
        name: '校验',
        type: 'reg',
        default: [],
        supports: ["required"],
        description: ''
      },
      advanced: {
        type: 'group',
        name: '高级',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          },
          renderLabel: {
            type: 'block',
            name: '定制渲染标题',
            setter: {
              render(h, prop) {
                console.log("定制渲染标题", prop)
                return (
                  <Block title="定制渲染标题">
                    <ActionSetter defaultActionName="renderLabel" defaultCode="function renderLabel(label, ctx) {\n  return label;\n}" value={prop.value} handleChange={(param) => prop.handleChange(param, prop.keyChain) }></ActionSetter>
                  </Block>
                )
              }
            }
          }
        }
      }
    }
  },
  'el-switch': {
    config: {
      label: {
        type: 'el-input',
        name: '标题',
        default: '开关',
        description: ''
      },
      showLabel: {
        type: 'el-switch',
        name: '显示标题',
        default: true,
        description: ''
      },
      defaultValue: {
        type: 'el-switch',
        name: '默认选中',
        default: false,
        description: ''
      },
      defaultBehavior: {
        name: '默认状态',
        type: 'choice',
        options: [{
          text: '普通',
          value: 'normal'
        }, {
          text: '禁用',
          value: 'disabled'
        }],
        default: 'normal',
        description: ''
      },
      disabled: {
        type: 'el-switch',
        name: '禁用',
        default: false,
        description: ''
      },
      size: {
        name: '尺寸',
        type: 'choice',
        options: [{
          text: '中等',
          value: 'medium'
        }, {
          text: '较小',
          value: 'small'
        }, {
          text: '迷你',
          value: 'mini'
        }],
        default: 'mini',
        description: ''
      },
      useRadioGroup: {
        type: 'block',
        name: '使用radio视图',
        default: false,
        setter: {
          render(h, prop) {
            return (
              <Block title="使用radio视图">
                <BoolControl value={prop.value} handlerChange={(value) => prop.handleChange(value)}></BoolControl>
              </Block>
            )
          }
        }
      },
      active: {
        type: 'group',
        name: '开启状态',
        children: {
          'active-text': {
            type: 'el-input',
            name: '提示文字',
            default: "",
            description: ''
          },
          'active-color': {
            type: 'color',
            name: '背景颜色',
            default: "",
            description: ''
          },
          'active-value': {
            type: 'el-input',
            name: '开启值',
            default: true,
            description: ''
          }
        }
      },
      inactive: {
        type: 'group',
        name: '关闭状态',
        children: {
          'inactive-text': {
            type: 'el-input',
            name: '提示文字',
            default: "",
            description: ''
          },
          'inactive-color': {
            type: 'color',
            name: '背景颜色',
            default: "",
            description: ''
          },
          'inactive-value': {
            type: 'el-input',
            name: '关闭值',
            default: true,
            description: ''
          },
        }
      },
      
      advanced: {
        type: 'group',
        name: '高级',
        description: '',
        children: {
          fieldId: {
            type: 'el-input',
            name: '唯一标识',
            default: '',
            description: ''
          },
          renderLabel: {
            type: 'block',
            name: '定制渲染标题',
            default: "",
            setter: {
              render(h, prop) {
                console.log("定制渲染标题", prop)
                return (
                  <Block title="定制渲染标题">
                    <ActionSetter defaultActionName="renderLabel" defaultCode="function renderLabel(label, ctx) {\n  return label;\n}" value={prop.value} handleChange={(param) => prop.handleChange(param, prop.keyChain) }></ActionSetter>
                  </Block>
                )
              }
            }
          }
        }
      }
    }
  }

}
