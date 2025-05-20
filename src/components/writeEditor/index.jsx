import { Editor } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
// import highlightSSR from '@bytemd/plugin-highlight-ssr'
import math from '@bytemd/plugin-math'
// import mathSSR from '@bytemd/plugin-math-ssr'
import zoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'

import 'bytemd/dist/index.css'

// import 'juejin-markdown-themes/dist/github.css'
import 'juejin-markdown-themes/dist/juejin.css'

import 'highlight.js/styles/github.css'
import 'katex/dist/katex.css'
import zh_Hans from 'bytemd/locales/zh_Hans.json'

const plugins = [
  gfm(),
  frontmatter(),
  gemoji(),
  highlight(),
  math(),
  zoom(),
  mermaid()
]

function WriteEditor({ value, setValue }) {
  return (
    <div className='h-[100%]'>
      <Editor
        locale={zh_Hans}
        value={value}
        plugins={plugins}
        placeholder='开始编辑...'
        uploadImages={(files) => {
          console.log(files, '======')
        }}
        onChange={(v) => {
          setValue(v)
        }}
      />
    </div>
  )
}

export default WriteEditor
