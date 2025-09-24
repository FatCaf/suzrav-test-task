import imageUrlBuilder from '@sanity/image-url'
export const urlFor = (img:any) =>
  imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  }).image(img)
