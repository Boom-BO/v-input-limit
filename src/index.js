import { Message } from 'element-ui'
const addListener = function (el, type, fn) {
	el.addEventListener(type, fn, false)
}
const defalutFilter = el => {
	el.value = el.value
}
const intFilter = el => {
	// 正整数
	addListener(el, 'keyup', () => {
		el.value = el.value.replace(/\D/g, '')
		if (isNaN(el.value)) {
			el.value = ''
		}
	})
}
const intRangeFilter = (el, [min, max]) => {
	// 正整数范围限制,例0-100，min=0,max=100
	addListener(el, 'keyup', () => {
		el.value = el.value.replace(/\D/g, '')
		if (isNaN(el.value)) {
			el.value = ''
		}
		if (!(!min && min !== 0) && el.value && el.value < min) {
			Message({
				message: '输入值不能小于' + min + '',
				type: 'warning',
				duration: 1000
			})
			el.value = min
		} else if (!(!max && max !== 0) && el.value > max) {
			Message({
				message: '输入值不能大于' + max + '',
				type: 'warning',
				duration: 1000
			})
			el.value = max
		}
	})
}
const floatFilter = function (el, value) {
	// 整数或小数
	addListener(el, 'keyup', () => {
		if (value === undefined) {
			el.value = el.value.replace(/[^\d.]*/g, '')
		} else {
			// 小数，value位保留几位小数
			const reg = new RegExp('^\\d*(\\.?\\d{0,' + value + '})', 'g')
			el.value = el.value.match(reg)[0] || null
		}
		if (isNaN(el.value)) {
			el.value = ''
		}
	})
}
const floatRangeFilter = function (el, value) {
	// 小数、小数范围限制
	const decimal = value.decimal
	const [min, max] = value.range
	addListener(el, 'keyup', () => {
		if (value === undefined) {
			el.value = el.value.replace(/[^\d.]*/g, '')
		} else {
			// 小数，value位保留几位小数
			const reg = new RegExp('^\\d*(\\.?\\d{0,' + decimal + '})', 'g')
			el.value = el.value.match(reg)[0] || null
		}
		if (isNaN(el.value)) {
			el.value = ''
		}
		if (!(!min && min !== 0) && el.value && el.value < min) {
			Message({
				message: '输入值不能小于' + min + '',
				type: 'warning',
				duration: 1000
			})
			el.value = min
		} else if (!(!max && max !== 0) && el.value > max) {
			Message({
				message: '输入值不能大于' + max + '',
				type: 'warning',
				duration: 1000
			})
			el.value = max
		}
	})
}
export default Vue => {
	Vue.directives('input-limit', {
		bind: (el, { arg, value, modifiers }) => {
			try {
				if (el.tagName.toLowerCase() !== 'input') {
					el = el.getElementsByTagName('input')[0]
				}
				defalutFilter(el)
				switch (arg) {
					case 'int':
						if (Array.isArray(value) && modifiers.range) {
							intRangeFilter(el, value)
						} else {
							intFilter(el)
						}
						break
					case 'float':
						if (modifiers.range) {
							floatRangeFilter(el, value)
						} else {
							floatFilter(el, value)
						}
						break
					default:
						break
				}
			} catch (error) {
				console.error('🚀 ', error)
			}
		}
	})
}
