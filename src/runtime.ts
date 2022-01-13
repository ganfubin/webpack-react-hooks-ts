export interface Runtime {
  baseName?: string
  appId?: string
}

const runtime: Runtime = (window as any).__config || {}

export default runtime 

