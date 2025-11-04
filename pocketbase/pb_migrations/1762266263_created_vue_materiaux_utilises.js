/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_kuXR",
        "max": 0,
        "min": 0,
        "name": "materiau",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number3960942154",
        "max": null,
        "min": null,
        "name": "nombre_utilisations",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_3031376758",
    "indexes": [],
    "listRule": null,
    "name": "vue_materiaux_utilises",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  m.id AS id,\n  m.libelle AS materiau,\n  COUNT(l.id) AS nombre_utilisations\nFROM Materiaux m\nLEFT JOIN Lunettes l\n  ON (m.id = l.materiaux_monture OR m.id = l.materiaux_branches)\nGROUP BY m.id;\n",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3031376758");

  return app.delete(collection);
})
