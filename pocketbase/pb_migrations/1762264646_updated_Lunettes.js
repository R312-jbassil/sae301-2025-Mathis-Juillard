/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3758190954")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2429360655",
    "max": 0,
    "min": 0,
    "name": "nom_modele",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor832971895",
    "maxSize": 0,
    "name": "svg_code",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1396272600",
    "max": null,
    "min": null,
    "name": "largeur_pont",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number438371369",
    "max": null,
    "min": null,
    "name": "taille_verres",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date2497440978",
    "max": "",
    "min": "",
    "name": "date_creation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1897857566",
    "hidden": false,
    "id": "relation832574908",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "materiaux_monture",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1897857566",
    "hidden": false,
    "id": "relation3104074760",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "materiaux_branches",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation344172009",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "users",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3758190954")

  // remove field
  collection.fields.removeById("text2429360655")

  // remove field
  collection.fields.removeById("editor832971895")

  // remove field
  collection.fields.removeById("number1396272600")

  // remove field
  collection.fields.removeById("number438371369")

  // remove field
  collection.fields.removeById("date2497440978")

  // remove field
  collection.fields.removeById("relation832574908")

  // remove field
  collection.fields.removeById("relation3104074760")

  // remove field
  collection.fields.removeById("relation344172009")

  return app.save(collection)
})
