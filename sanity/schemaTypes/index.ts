import { type SchemaTypeDefinition } from 'sanity'

import { aboutPage } from './aboutPage'
import { contactPage } from './contactPage'
import { educationPage } from './educationPage'
import { employmentPage } from './employmentPage'
import { qartPage } from './qartPage'
import { researchPage } from './researchPage'
import { role } from './role'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutPage, qartPage, researchPage, employmentPage, educationPage, contactPage, role],
}
