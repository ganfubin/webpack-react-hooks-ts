export const DEFAULT_ERROR_MESSAGE = '请求失败，请稍后再试'

const errorMsgs = new Map([
  [400, '该请求参数传递错误'],
  [401, '该请求认证失败'],
  [403, '该请求被禁止访问'],
  [404, '请求资源不存在'],
  [500, '服务端错误'],
  [504, '服务连接超时'],
])

export function getErrorMsgByCode(code?: number): string {
  return errorMsgs.get(code as number) ?? DEFAULT_ERROR_MESSAGE
}

