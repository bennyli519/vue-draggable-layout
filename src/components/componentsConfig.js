


export const basicComponents = [
  {
    type: 'title',
    name: '标题',
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
    name: '字段1',
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
    name: '字段2',
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
    name: '字段3',
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
    name: '字段4',
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
    name: '一整行(24)',
    title:'大标题',
    icon: 'icon-grid-',
    columns: [
      {
        span: 24,
        list: []
      },
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
  {
    type: 'grid',
    name: '一行2列(12:12)',
    title:'大标题',
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
  },
  {
    type: 'grid',
    name: '一行3列(8:8:8)',
    title:'大标题',
    icon: 'icon-grid-',
    columns: [
      {
        span: 8,
        list: []
      },
      {
        span: 8,
        list: []
      },
      {
        span: 8,
        list: []
      },
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
  {
    name: '一行4列(6:6:6:6)',
    type: 'grid',
    title:'大标题',
    icon: 'icon-grid-',
    columns: [
      {
        span: 6,
        list: []
      },
      {
        span: 6,
        list: []
      },
      {
        span: 6,
        list: []
      },
      {
        span: 6,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
]
