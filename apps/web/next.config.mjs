import remarkFrontmatter from 'remark-frontmatter'
import rehypeHighlight from 'rehype-highlight'
import nextTranspileModules from 'next-transpile-modules'
import nextMDX from '@next/mdx'

const withTM = nextTranspileModules(['ui', 'measure-ts', 'ahp-0', 'ahp-1'])
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: { 
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [rehypeHighlight],
    providerImportSource: '@mdx-js/react'
  }
})

export default withTM(withMDX({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
}))