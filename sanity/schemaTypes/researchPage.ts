import {defineArrayMember, defineField, defineType} from 'sanity'

const linkAnnotation = defineArrayMember({
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
})

export const researchPage = defineType({
  name: 'researchPage',
  title: 'Research page',
  type: 'document',
  fields: [
    defineField({
      name: 'publications',
      title: 'Publications',
      type: 'array',
      description: 'Shown in the order listed here. Drag to reorder.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'publication',
          title: 'Publication',
          fields: [
            defineField({
              name: 'citation',
              title: 'Citation',
              type: 'array',
              description: 'The full reference. Use italics for journal or book titles.',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [{title: 'Normal', value: 'normal'}],
                  lists: [],
                  marks: {
                    decorators: [
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Strong', value: 'strong'},
                    ],
                    annotations: [linkAnnotation],
                  },
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Optional link to the publication, e.g. a DOI.',
              validation: (rule) => rule.uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {citation: 'citation'},
            prepare: ({citation}) => ({
              title:
                (citation as {children?: {text?: string}[]}[] | undefined)?.[0]?.children
                  ?.map((child) => child.text ?? '')
                  .join('') || 'Untitled publication',
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'presentations',
      title: 'Presentations',
      type: 'array',
      description: 'Shown in the order listed here. Drag to reorder.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'presentation',
          title: 'Presentation',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
              type: 'string',
              description: 'Written as you want it shown, e.g. "September 2026".',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'details',
              title: 'Details',
              type: 'string',
              description: 'Event, place or co-presenters.',
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'date'}},
        }),
      ],
    }),
    defineField({
      name: 'presentationsNote',
      title: 'Presentations note',
      type: 'string',
      description: 'Optional line shown under the list of presentations.',
    }),
    defineField({
      name: 'networks',
      title: 'Networks',
      type: 'array',
      description: 'Research networks and groups, one per entry.',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'showSpotlight',
      title: 'Show Spotlight',
      type: 'boolean',
      description: 'Turn on to show the Spotlight section',
      initialValue: false,
    }),
    defineField({
      name: 'spotlightTitle',
      title: 'Spotlight title',
      type: 'string',
    }),
    defineField({
      name: 'spotlightBody',
      title: 'Spotlight body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {annotations: [linkAnnotation]},
        }),
        defineArrayMember({
          type: 'image',
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
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Research page'})},
})
