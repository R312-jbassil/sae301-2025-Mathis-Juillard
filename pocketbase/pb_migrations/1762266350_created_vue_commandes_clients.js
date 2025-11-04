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
        "id": "_clone_fqqQ",
        "max": 255,
        "min": 0,
        "name": "client",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number3296125494",
        "max": null,
        "min": null,
        "name": "nombre_commandes",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "json3222877733",
        "maxSize": 1,
        "name": "total_depense",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_1253599989",
    "indexes": [],
    "listRule": null,
    "name": "vue_commandes_clients",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  u.id AS id,\n  u.nom AS client,\n  COUNT(c.id) AS nombre_commandes,\n  SUM(lc.quantite * lc.prix_unitaire) AS total_depense\nFROM users u\nLEFT JOIN Commandes c ON c.users_ = u.id\nLEFT JOIN Lignes_Commande lc ON lc.commande = c.id\nGROUP BY u.id;\n",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1253599989");

  return app.delete(collection);
})
