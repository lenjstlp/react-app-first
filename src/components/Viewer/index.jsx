import { Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import zoom from '@bytemd/plugin-medium-zoom'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mermaid from '@bytemd/plugin-mermaid'
import 'bytemd/dist/index.css'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github.css'
import 'katex/dist/katex.css'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
// 配置插件
const plugins = [
  gfm(),
  frontmatter(),
  gemoji(),
  highlight(),
  math(),
  zoom(),
  mermaid()
]

function ViewerContent({ value }) {
  return <Viewer locale={zh_Hans} plugins={plugins} value={value} />
}

export default ViewerContent
