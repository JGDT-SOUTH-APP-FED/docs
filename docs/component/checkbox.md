# Checkbox 多选框组

快速的数据化配置一个多选框组，常用于搭配数据表单。

依赖组件： `ElCheckboxGroup` `ElCheckbox` `ElCheckboxButton` ，需先全局注册。

## 基础使用


:::demo 
checkbox/base
:::

## 属性

| 属性 | 类型  | 默认值 | 说明  
| --- | ---   | ---   | --- 
| options | CheckboxProps[] \| string[] | - | checkbox 配置
| props | `{label: string, value: string}` | - | CheckboxProps 配置别名 
| button | boolean | - | 按钮样式
| border | boolean | - | 边框样式
| ...... | -   | - | [ElCheckboxGroup 属性](https://element-plus.gitee.io/zh-CN/component/checkbox.html#checkboxgroup-attributes)


### CheckboxProps

| 属性 | 类型  | 默认值 | 说明  
| --- | ---   | ---   | --- 
| label | string | - | 标签
| value | string \| number \| boolean | - | 选中值
| disabled | boolean | - | 是否禁用
| checked | boolean | - | 是否默认选中

## 插槽


| 名称 | 插槽作用域  | 说明  
| --- | ---    | --- 
| default | `{item,index}` | 自定义模板
