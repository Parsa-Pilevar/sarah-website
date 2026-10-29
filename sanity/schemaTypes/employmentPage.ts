import {defineArrayMember, defineField, defineType} from 'sanity'

export const employmentPage = defineType({
  name: 'employmentPage',
  title: 'Employment page',
  type: 'document',
  fields: [
    defineField({
      name: 'researchRoles',
      title: 'Research roles',
      type: 'array',
      description: 'Shown in the order listed here. Drag to reorder.',
      of: [defineArrayMember({type: 'role'})],
    }),
    defineField({
      name: 'teachingRoles',
      title: 'Teaching roles',
      type: 'array',
      description: 'Shown in the order listed here. Drag to reorder.',
      of: [defineArrayMember({type: 'role'})],
    }),
    defineField({
      name: 'enterpriseRoles',
      title: 'Enterprise',
      type: 'array',
      description: 'Shown in the order listed here. Drag to reorder.',
      of: [defineArrayMember({type: 'role'})],
    }),
  ],
  preview: {prepare: () => ({title: 'Employment page'})},
})
