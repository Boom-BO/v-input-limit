# input-limit 输入限制自定义指令

## 使用

### (一)

```bash
npm install v-input-limit -S

or

yarn add v-input-limit -S
```

### （二）

```js
// main.ts
import inputLimit from 'v-input-limit'
Vue.use(inputLimit)
```

::: tip
目前已有以下几种限制方式、后续会不断完善 :cyclone::cyclone::cyclone:
:::

## 一、正整数

```js
<input v-model="" v-input-limit:int />
```

## 一、正整数范围限制

> - 例如：限制 `0 ≤ number < 100` 的正整数

```js
 <input v-model="" v-input-limit:int.range="[0, 99]" />
```

> - 例如：限制 `100 ≤ number` 的正整数

```js
 <input v-model="" v-input-limit:int.range="[100]" />
```

## 一、无限制正小数

```js
<input v-model="" v-input-limit:float />
```

## 一、限制正小数点后 n 位

> - 例如：限制小数点后 1 位的正小数

```js
<input v-model="" v-input-limit:float="1" />
```

## 一、正小数且有范围限制

> - 例如：限制 `0 ≤ number < 100` ，并且保留小数点后两位的小数

```js
 <input v-model="" v-input-limit:float.range="{ decimal: 2, range: [0, 99.99] }" />
```
