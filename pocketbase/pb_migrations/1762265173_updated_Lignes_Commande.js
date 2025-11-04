/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3310468753")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number2347911801",
    "max": null,
    "min": null,
    "name": "quantite",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number3871381664",
    "max": null,
    "min": null,
    "name": "prix_unitaire",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3540929559",
    "hidden": false,
    "id": "relation1860871805",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "commande",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3758190954",
    "hidden": false,
    "id": "relation2233221673",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "lunette",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3310468753")

  // remove field
  collection.fields.removeById("number2347911801")

  // remove field
  collection.fields.removeById("number3871381664")

  // remove field
  collection.fields.removeById("relation1860871805")

  // remove field
  collection.fields.removeById("relation2233221673")

  return app.save(collection)
})
