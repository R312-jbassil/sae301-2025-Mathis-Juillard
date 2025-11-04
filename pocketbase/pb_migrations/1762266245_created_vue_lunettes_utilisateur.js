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
        "id": "_clone_6ekr",
        "max": 255,
        "min": 0,
        "name": "utilisateur",
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
        "id": "_clone_15bk",
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
        "id": "_clone_Z2E7",
        "max": null,
        "min": null,
        "name": "largeur_pont",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "_clone_IZEI",
        "max": null,
        "min": null,
        "name": "taille_verres",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_D7zL",
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
        "id": "_clone_vE5n",
        "max": 0,
        "min": 0,
        "name": "materiau_branches",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_QgkD",
        "max": "",
        "min": "",
        "name": "date_creation",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      }
    ],
    "id": "pbc_1865143409",
    "indexes": [],
    "listRule": null,
    "name": "vue_lunettes_utilisateur",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  printf('%s-%s', u.id, l.id) AS id,\n  u.nom AS utilisateur,\n  l.nom_modele AS modele,\n  l.largeur_pont AS largeur_pont,\n  l.taille_verres AS taille_verres,\n  m1.libelle AS materiau_monture,\n  m2.libelle AS materiau_branches,\n  l.date_creation AS date_creation\nFROM Lunettes l\nJOIN users u ON u.id = l.users\nJOIN Materiaux m1 ON m1.id = l.materiaux_monture\nJOIN Materiaux m2 ON m2.id = l.materiaux_branches;\n",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1865143409");

  return app.delete(collection);
})
