import { Suspense, lazy } from 'react'

// 路由懒加载，Suspense组件封装
export function lazyLoad(importFunc, fallback = null) {
  const LazyComponent = lazy(importFunc)
  return function comName(props) {
    return (
      <Suspense fallback={fallback || <div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}
