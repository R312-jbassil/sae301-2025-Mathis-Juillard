/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3758190954")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "bool4018512588",
    "name": "favori",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3758190954")

  // remove field
  collection.fields.removeById("bool4018512588")

  return app.save(collection)
})
