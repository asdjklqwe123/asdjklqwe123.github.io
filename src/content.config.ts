import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// 定义博客文章集合
const blog = defineCollection({
  // 加载 src/content/blog/ 目录下的所有 .md 文件
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      // 必填
      title: z.string().max(80),
      description: z.string().max(200),
      publishDate: z.coerce.date(),
      // 可选
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      author: z.string().default('asdjklqwe123'),
      // 分类：course | algorithm | ml | other
      category: z.enum(['course', 'algorithm', 'ml', 'other']).optional()
    })
})

export const collections = { blog }
