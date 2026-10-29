import {defineArrayMember, defineField, defineType} from 'sanity'

export const educationPage = defineType({
  name: 'educationPage',
  title: 'Education page',
  type: 'document',
  fields: [
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      description: 'Shown in the order listed here. Drag to reorder.',
      of: [defineArrayMember({type: 'role'})],
    }),
    defineField({
      name: 'affiliations',
      title: 'Professional affiliations',
      type: 'array',
      description: 'One per entry.',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
  preview: {prepare: () => ({title: 'Education page'})},
})
