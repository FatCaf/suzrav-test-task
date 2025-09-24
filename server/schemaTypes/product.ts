import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({name:'title', type:'string', validation:r=>r.required()}),
    defineField({name:'description', type:'text',  validation:r=>r.required()}),
    defineField({name:'image', type:'image', options:{hotspot:true}, validation:r=>r.required()}),
    defineField({name:'category', type:'string', validation:r=>r.required()}),
    defineField({name:'price', type:'number', validation:r=>r.required().min(0)}),
    defineField({name:'availability', type:'boolean', initialValue:true, validation:r=>r.required()}),
    defineField({name:'slug', type:'slug', options:{source:'title'}, validation:r=>r.required()}),
  ],
})
