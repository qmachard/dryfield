# DryField

TP IMIE : Jeux de simulation web

## Objectif

Réaliser une application autonome javascript qui communique avec une api web REST.

## Besoin

Le but du jeu est de faire le plus grand nombre de récoltes possible.

Le principe est de devoir remplir les citernes d’eau de 3 champs qui ont besoin d’être irrigué tous les jours (secondes dans le jeux) pour pousser.

Le joueur à une réserve d’eau globale qu’il peut remplir en achetant de l’eau. Il irrigue ensuite ses champs en puisant dans cette réserve globale. Le joueur vend les champs arrivés à maturité pour récupérer de l’argent qu’il réinvestira dans de l’eau.

Si un champ est en rupture d’eau (plus d’eau dans la citerne du champ), sa récolte est perdue. Quand la citerne sera réalimentée, le décompte de maturité du champ repart à 0.

La consommation des champs va augmenter pour simuler une aridité. Le rythme de jeux va donc s’accélérer jusqu'à avoir les trois champs sans eau dans leurs citernes. La partie est alors terminée. Le nombre de récoltes effectuées est le score de la partie.

Le score est envoyé sur un serveur qui met à disposition une API web Service REST pour recevoir les nouveaux scores et mettre à disposition les scores déjà enregistrés. Le joueur peut consulter les scores de tout le monde.

L’objectif de temps moyen de jeu est de 10 minutes et le temps maximum 15 minutes.

## Règles de gestion

* Argent initial : 50$
* Réserve initiale : 3 L / citerne + 3 litres globale
* Consommation initiale : 1l / seconde
* Consommation maximum : 2L / seconde
* Vous devez trouver une règle d’augmentation de la consommation pour atteindre les objectifs de temps de jeu.
* Nombre de secondes pour qu’un champ soit mûr : 20 secondes
* Prix de l’eau : 1$ / L
* Prix d’une récolte : 40$
* Un champ prêt à récolter ne consomme pas d’eau.

## Ecran principale

### Wireframe

https://moqups.com/simon_louvet/7gfaQ7OA/p:ab7fe3653

### Interaction

L’achat d’eau ouvre une popin qui met le jeu en pause.

La couleur du bouton récolter change quand le champ est mûr. Une fenêtre s’ouvre à la fin du jeu pour saisir le nom du joueur.

## Démo

http://qmachard.github.io/dryfield/