const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
const form = document.getElementById('form-pseudo');
const maxScore = 5;
let pseudo = "";

// Création des objets raquette et balle
const raquetteGauche = { x: 10, y: canvas.height / 2 - 50, largeur: 10, hauteur: 100, score: 0 };
const raquetteDroite = { x: canvas.width - 20, y: canvas.height / 2 - 50, largeur: 10, hauteur: 100, score: 0, vitesseY: 5 };
const balle = { x: canvas.width / 2, y: canvas.height / 2, rayon: 7, vitesseX: 5, vitesseY: 5 };

// Fonction pour dessiner les éléments du jeu
function dessiner() {
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner les raquettes
  ctx.fillStyle = 'white';
  ctx.fillRect(raquetteGauche.x, raquetteGauche.y, raquetteGauche.largeur, raquetteGauche.hauteur);
  ctx.fillRect(raquetteDroite.x, raquetteDroite.y, raquetteDroite.largeur, raquetteDroite.hauteur);

  // Dessiner la balle
  ctx.beginPath();
  ctx.arc(balle.x, balle.y, balle.rayon, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();

  // Dessiner les scores
  ctx.font = '20px Arial';
  ctx.fillText(pseudo + ': ' + raquetteGauche.score, canvas.width / 4, 30);
  ctx.fillText('Ordinateur: ' + raquetteDroite.score, (canvas.width / 4) * 3, 30);
}

// Fonction pour déplacer les éléments du jeu
function deplacer() {
  // Déplacer la balle
  balle.x += balle.vitesseX;
  balle.y += balle.vitesseY;

    // Déplacer la raquette de l'ordinateur
    if (raquetteDroite.y > raquetteGauche.y) {
        raquetteDroite.y -= raquetteDroite.vitesseY;
      } else {
        raquetteDroite.y += raquetteDroite.vitesseY;
      }
    
      // Rebondir sur les bords horizontaux
      if (balle.y - balle.rayon < 0 || balle.y + balle.rayon > canvas.height) {
        balle.vitesseY = -balle.vitesseY;
      }
    
      // Rebondir sur les raquettes
      if (
        (balle.x - balle.rayon < raquetteGauche.x + raquetteGauche.largeur &&
          balle.y > raquetteGauche.y &&
          balle.y < raquetteGauche.y + raquetteGauche.hauteur) ||
        (balle.x + balle.rayon > raquetteDroite.x &&
          balle.y > raquetteDroite.y &&
          balle.y < raquetteDroite.y + raquetteDroite.hauteur)
      ) {
        balle.vitesseX = -balle.vitesseX;
      }
    
      // Gérer les scores et réinitialiser la balle
      if (balle.x - balle.rayon < 0) {
        raquetteDroite.score++;
        resetBalle();
        checkWinner();
      } else if (balle.x + balle.rayon > canvas.width) {
        raquetteGauche.score++;
        resetBalle();
        checkWinner();
      }
    }
    
    // Fonction pour réinitialiser la balle
    function resetBalle() {
      balle.x = canvas.width / 2;
      balle.y = canvas.height / 2;
      balle.vitesseX = -balle.vitesseX;
      balle.vitesseY = 5;
    }
    
    // Fonction pour vérifier le gagnant
    function checkWinner() {
      if (raquetteGauche.score === maxScore || raquetteDroite.score === maxScore) {
        alert((raquetteGauche.score === maxScore ? pseudo : 'Ordinateur') + ' a gagné !');
        raquetteGauche.score = 0;
        raquetteDroite.score = 0;
      }
    }
    
    // Gestion des événements clavier
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        raquetteGauche.y -= 50;
      } else if (e.key === 'ArrowDown') {
        raquetteGauche.y += 50;
      }
    });
    
    // Démarrage du jeu après la soumission du formulaire
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      pseudo = document.getElementById('pseudo').value;
      form.style.display = 'none';
      canvas.style.display = 'block';
      boucleDeJeu();
    });
    
    // Boucle de jeu
    function boucleDeJeu() {
      dessiner();
      deplacer();
      requestAnimationFrame(boucleDeJeu);
    }