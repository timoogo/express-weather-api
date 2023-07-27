# Weather API

## Description
Ce projet est une mini API qui permet de créer, modifier, supprimer et lister des "Weather" (météo).
Ce n'est pas lié a une ville ou un pays, c'est juste une météo (longitude, latitude, temperature, etc...).

## Prérequis
- [ ] node
### Installation
`git clone <this-repo>`
`cd <this-repo>`
`npm install`

### Premier lancement (création de la base de données)

`mysql -u root -p`

`CREATE DATABASE <name_of_the_db>;`

#### quit mysql
`exit`

#### Créer la table
`npm run db:create`

#### .env
1. Copier le fichier `.env.example` et le renommer en `.env`

2. Remplir les variables d'environnement dans le fichier `.env` avec les informations de votre base de données

> Exemple:
```shell
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=weatherDB
DB_PORT=3306
```

### Lancement
`npm run start`


## Routes

Toutes les routes sont préfixées par `/api/

### GET /weather
Liste tous les weather

### GET /weather/:id
Récupère un weather par son id
</br>

**Il faut que l'id existant pour que cette route fonctionne**

### POST /weather
Créer un weather




#### Données a transmettre  (exemple de json)
```json
{
  "longitude": 123.456,
  "latitude": 78.910,
  "temperature": 25.6,
  "humidity": 64,
  "pressure": 1013.5,
  "windSpeed": 12.3,
  "windDirection": 180
}
```

</br>

**S'il manque un paramètre, cette route renverra une erreur**

### PUT /weather/:id
Permet de modifier un weather



#### Données a transmettre  (exemple de json)
```json
{
  "longitude": 123.456,
  "latitude": 78.910,
  "temperature": 25.6,
  "humidity": 64,
  "pressure": 1013.5,
  "windSpeed": 12.3,
  "windDirection": 180
}
```
</br>

**Il faut que l'id existant pour que cette route fonctionne**

### DELETE /weather/:id
Permet de supprimer un weather
</br>
**Il faut que l'id existant pour que cette route fonctionne**
