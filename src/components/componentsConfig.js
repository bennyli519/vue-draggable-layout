/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-08-25 11:12:55
 * @LastEditTime: 2019-09-01 14:27:33
 */



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

]

export const labelList = [

  {
    type: 'label',
    name: '字段1',
    icon: 'icon-input',
    options: {
      // width: '100%',
      // defaultValue: '',
      // dataType: 'string',
      // pattern: '',
      // placeholder: ''
    }
  },
  {
    type: 'label',
    name: '字段2',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: 'aaa',
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
    title:' ',
    icon: 'icon-grid-',
    columns: [
      {
        span: 24,
        list: [],
      },
    ],
    options: {
      border:{
        isShow:true,
        width:1,
        color:'#eee',
      },
      gutter: 10,
      justify: 'start',
      align: 'top'
    }
  },
  {
    type: 'grid',
    name: '一行2列(12:12)',
    title:' ',
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
      border:{
        isShow:true,
        width:1,
        color:'#eee',
      },
      gutter: 10,
      justify: 'start',
      align: 'top'
    }
  },
  {
    type: 'grid',
    name: '一行3列(8:8:8)',
    title:' ',
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
      border:{
        isShow:true,
        width:1,
        color:'#eee',
      },
      gutter: 10,
      justify: 'start',
      align: 'top'
    }
  },
  {
    name: '一行4列(6:6:6:6)',
    type: 'grid',
    title:' ',
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
      border:{
        isShow:true,
        width:1,
        color:'#eee',
      },
      gutter: 10,
      justify: 'start',
      align: 'top'
    }
  },
]
