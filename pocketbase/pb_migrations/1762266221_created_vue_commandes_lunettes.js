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
        "id": "_clone_e9Xy",
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
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_HTLc",
        "max": 0,
        "min": 0,
        "name": "modele",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "json3257917790",
        "maxSize": 1,
        "name": "total",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "_clone_mMAR",
        "max": "",
        "min": "",
        "name": "date_commande",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_6Qe3",
        "max": 0,
        "min": 0,
        "name": "materiau_monture",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_vQvr",
        "max": 0,
        "min": 0,
        "name": "materiau_branches",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      }
    ],
    "id": "pbc_3284961495",
    "indexes": [],
    "listRule": null,
    "name": "vue_commandes_lunettes",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  printf('%s-%s', c.id, l.id) AS id,\n  u.nom AS client,\n  l.nom_modele AS modele,\n  (lc.quantite * lc.prix_unitaire) AS total,\n  c.date_commande AS date_commande,\n  m1.libelle AS materiau_monture,\n  m2.libelle AS materiau_branches\nFROM Lignes_Commande lc\nJOIN Commandes c ON c.id = lc.commande\nJOIN users u ON u.id = c.users_\nJOIN Lunettes l ON l.id = lc.lunette\nJOIN Materiaux m1 ON m1.id = l.materiaux_monture\nJOIN Materiaux m2 ON m2.id = l.materiaux_branches;",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3284961495");

  return app.delete(collection);
})
