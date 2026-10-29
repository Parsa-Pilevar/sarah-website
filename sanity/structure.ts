import type {StructureResolver} from 'sanity/structure'

// Keep in sync with the singletonTypes set in sanity.config.ts.
const singletonTypes: {id: string; title: string}[] = [
  {id: 'aboutPage', title: 'About page'},
  {id: 'qartPage', title: 'Q-Art page'},
  {id: 'researchPage', title: 'Research page'},
  {id: 'employmentPage', title: 'Employment page'},
  {id: 'educationPage', title: 'Education page'},
  {id: 'contactPage', title: 'Contact page'},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(
      singletonTypes.map(({id, title}) =>
        S.listItem()
          .id(id)
          .title(title)
          .child(S.document().schemaType(id).documentId(id))
      )
    )
