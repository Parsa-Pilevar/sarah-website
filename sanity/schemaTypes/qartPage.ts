import {defineArrayMember, defineField, defineType} from 'sanity'

export const qartPage = defineType({
  name: 'qartPage',
  title: 'Q-Art page',
  type: 'document',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h3'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Emphasis', value: 'em'},
              {title: 'Strong', value: 'strong'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) => rule.uri({scheme: ['http', 'https']}),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Optional. Shown below the text.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'A short description of the image for screen readers.',
        }),
      ],
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Q-Art website',
      type: 'url',
      description: 'Link to the Q-Art website, shown at the bottom of the page.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {prepare: () => ({title: 'Q-Art page'})},
})
