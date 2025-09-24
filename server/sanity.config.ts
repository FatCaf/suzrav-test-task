import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = (import.meta as any).env.SANITY_STUDIO_PROJECT_ID as string
const dataset   = (import.meta as any).env.SANITY_STUDIO_DATASET as string

export default defineConfig({
  name: 'default',
  title: 'Test',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
