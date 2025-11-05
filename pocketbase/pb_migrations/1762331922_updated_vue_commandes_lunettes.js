/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3284961495")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  printf('%s-%s', c.id, l.id) AS id,\n  u.nom AS client,\n  l.nom_modele AS modele,\n  (lc.quantite * lc.prix_unitaire) AS total,\n  c.date_commande AS date_commande,\n  m1.libelle AS materiau_monture,\n  m2.libelle AS materiau_branches\nFROM Lignes_Commande lc\nLEFT JOIN Commandes c ON c.id = lc.commande\nLEFT JOIN users u ON u.id = c.users_\nLEFT JOIN Lunettes l ON l.id = lc.lunette\nLEFT JOIN Materiaux m1 ON m1.id = l.materiaux_monture\nLEFT JOIN Materiaux m2 ON m2.id = l.materiaux_branches;"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_e9Xy")

  // remove field
  collection.fields.removeById("_clone_HTLc")

  // remove field
  collection.fields.removeById("_clone_mMAR")

  // remove field
  collection.fields.removeById("_clone_6Qe3")

  // remove field
  collection.fields.removeById("_clone_vQvr")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_DbyH",
    "max": 255,
    "min": 0,
    "name": "client",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_0ECf",
    "max": 0,
    "min": 0,
    "name": "modele",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_VZc1",
    "max": "",
    "min": "",
    "name": "date_commande",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_gWre",
    "max": 0,
    "min": 0,
    "name": "materiau_monture",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_hynv",
    "max": 0,
    "min": 0,
    "name": "materiau_branches",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3284961495")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  printf('%s-%s', c.id, l.id) AS id,\n  u.nom AS client,\n  l.nom_modele AS modele,\n  (lc.quantite * lc.prix_unitaire) AS total,\n  c.date_commande AS date_commande,\n  m1.libelle AS materiau_monture,\n  m2.libelle AS materiau_branches\nFROM Lignes_Commande lc\nJOIN Commandes c ON c.id = lc.commande\nJOIN users u ON u.id = c.users_\nJOIN Lunettes l ON l.id = lc.lunette\nJOIN Materiaux m1 ON m1.id = l.materiaux_monture\nJOIN Materiaux m2 ON m2.id = l.materiaux_branches;"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
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
  }))

  // add field
  collection.fields.addAt(2, new Field({
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
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_mMAR",
    "max": "",
    "min": "",
    "name": "date_commande",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(5, new Field({
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
  }))

  // add field
  collection.fields.addAt(6, new Field({
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
  }))

  // remove field
  collection.fields.removeById("_clone_DbyH")

  // remove field
  collection.fields.removeById("_clone_0ECf")

  // remove field
  collection.fields.removeById("_clone_VZc1")

  // remove field
  collection.fields.removeById("_clone_gWre")

  // remove field
  collection.fields.removeById("_clone_hynv")

  return app.save(collection)
})
