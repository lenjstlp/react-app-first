import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router-dom';
import router from '@/router'

import { Provider } from 'react-redux'
import store from '@/store'

// 兼容 react19
import '@ant-design/v5-patch-for-react-19';

import 'normalize.css'
import '@/style/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
