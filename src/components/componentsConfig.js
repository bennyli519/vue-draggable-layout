


export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: ''
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: ''
    }
  },
]

export const labelList = [

  {
    type: 'label',
    name: '名称1',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: ''
    }
  },
  {
    type: 'label',
    name: '名称2',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: ''
    }
  }
]

export const panel = [

  {
    type: 'panel',
    name: '面板',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: ''
    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    name: '栅格布局',
    icon: 'icon-grid-',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]
