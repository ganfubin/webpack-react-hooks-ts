namespace standard {
  /**
   * http请求返回结果
   */
  interface PartialResponse<T = unknown> {
    /**
     * 状态码, 0为成功, 非0为失败
     */
    code?: number,
    /**
     * 附加文本信息
     */
    msg?: string
    /**
     * 响应的数据
     */
    data?: T
  }

  /**
   * http请求返回分页信息结果
   */
  interface Pagination<T = unknown> {
    /**
     * 当前页索引, 从 1 开始
     */
    currentPage: number
    /**
     * 本次页大小
     */
    pageSize: number
    /**
     * 总页数
     */
    total: number
    /**
     * 本次数据列表
     */
    list: T[]
  }
}