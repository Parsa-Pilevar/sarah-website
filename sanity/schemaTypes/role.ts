import {defineField, defineType} from 'sanity'

export const role = defineType({
  name: 'role',
  title: 'Role',
  type: 'object',
  fields: [
    defineField({
      name: 'years',
      title: 'Years',
      type: 'string',
      description: 'Written as you want it shown, e.g. "2021 – present".',
    }),
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional short paragraph about the role.',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Optional. If set, the job title links here.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {title: 'title', years: 'years', organisation: 'organisation'},
    prepare: ({title, years, organisation}) => ({
      title: [title, years].filter(Boolean).join(', ') || 'Untitled role',
      subtitle: organisation,
    }),
  },
})
