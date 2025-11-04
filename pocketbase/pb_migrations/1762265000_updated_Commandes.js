/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3540929559")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "date2917126107",
    "max": "",
    "min": "",
    "name": "date_commande",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation4027873937",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "users_",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3540929559")

  // remove field
  collection.fields.removeById("date2917126107")

  // remove field
  collection.fields.removeById("relation4027873937")

  return app.save(collection)
})
