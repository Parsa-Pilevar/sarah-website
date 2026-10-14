import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      description: 'Shown under your name in the sidebar, e.g. "Lecturer in Education".',
    }),
    defineField({
      name: 'affiliations',
      title: 'Affiliations',
      type: 'array',
      description: 'Each entry is shown on its own line in the sidebar, e.g. a department or university.',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'A short description of the photo for screen readers.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      description: 'Profile links shown in the sidebar. Labels containing LinkedIn, Scholar or ORCID get a matching icon.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'link',
          title: 'Link',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      description: 'The main text of the About page.',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
  preview: {prepare: () => ({title: 'About page'})},
})
