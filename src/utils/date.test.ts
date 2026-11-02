/** @description 示例单测：测试文件与被测文件同目录，命名 *.test.ts */
import { describe, it, expect } from 'vitest'
import { formatDate } from './date'

describe('formatDate', () => {
	it('补零并格式化为 YYYY-MM-DD', () => {
		expect(formatDate(new Date(2026, 0, 5))).toBe('2026-01-05')
	})
})
