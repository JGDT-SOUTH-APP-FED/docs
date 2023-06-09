# FormGrid 珊格表单

快速的数据化配置一个珊格布局表单。

依赖组件： `ElRow` `ElCol` `JgFormItem` ，需先全局注册。


## 基础使用

grid 的 `span` 属性为表单设置全局的排版，item 的栅格属性优先级最高。

:::demo 
form-grid/base
:::

## 自适应表单

设置 `responsive:true` 开启响应式

根据容器宽度（非窗口宽度）自动调整栅格大小，可通过 `responsiveMethod` 来自定义规则。

:::demo 
form-grid/formGridResponsive
:::


## 属性

| 属性 | 类型  | 默认值 | 说明  
| --- | ---   | ---   | --- 
| items | ItemProps[] | - | 表单配置项 
| model-prop | string | - | 表单 model 键名 
| scope | object | - | 表单项插槽作用域参数 
| view-model | boolean | - | 视图模式，只渲染 value
| responsive | boolean | - | 是否开启自适应容器
| responsive-method | (width: number) => number | - | 自定义自适应容器方法
| span | number | 24 | 珊格列
| gutter | number | 18 | 珊格间距
| ...... | RowProps | - | [ElRow 属性](https://element-plus.gitee.io/zh-CN/component/layout.html#row-attributes)

### ItemProps

| 属性 | 类型  | 默认值 | 说明  
| --- | ---   | ---   | --- 
| ...... | -    | - | 
| span, push, pull, offset  | -  |-|  [ElCol 属性](https://element-plus.gitee.io/zh-CN/component/layout.html#col-attributes) |



## 插槽

| 名称            | 插槽作用域|   说明                                   | 
| -----------    |   ------- | -----------------------------  |
| component-xx        | itemProps |  item 组件具名插槽           | 
| prepend        | - |   items 前置插槽           |
| append         | - |   items 后置插槽            |