let datas = []
let id = 1
async function charger_data(){
  let response = await fetch("json/horoscope.json")
  datas = await response.json()
  affiche_donnees_inf(id)
  afficher_données_par_id(id)
  affiche_donnees_sup(id)
}
charger_data()


const arrow_left = document.querySelector(".arrow-left")
const arrow_right = document.querySelector(".arrow-right")
const left_horoscope = document.querySelector(".left-horoscope")
const right_horoscope = document.querySelector(".right-horoscope")
const date_jour = document.querySelector("#datejour")
const first_title = document.querySelector("h1")
const date = document.querySelector("#date")
const love = document.querySelector("#amour")
const work = document.querySelector("#travail")
const silver = document.querySelector("#argent")
const health = document.querySelector("#sante")
const family = document.querySelector("#famille")
const board = document.querySelector("#conseil")
const img = document.querySelector("aside img")
const span_right = document.createElement("span")
const span_left = document.createElement("span")

const tableauID = [1, 2, 3, 4, 5];
// DATE ACTUELLE 
const dateActuelle = new Date();
const jour = ("0" + dateActuelle.getDate()).slice(-2);
const mois = ("0" + (dateActuelle.getMonth() + 1)).slice(-2);
const annee = dateActuelle.getFullYear();

// fonction qui cherche l'id dans le tableau 
function afficher_données_par_id(id){
  const element = datas.find(item => item.id === id)
  if (element) {
    first_title.textContent = element.signe
    date.textContent = element.date
    love.textContent = element.amour
    work.textContent = element.travail
    silver.textContent = element.argent
    health.textContent = element.sante
    family.textContent = element.famille
    board.textContent = element.conseil
    const chemin_img = element.image
    img.src = chemin_img
    affiche_donnees_sup(id)
    affiche_donnees_inf(id)
  }
}

function affiche_donnees_inf(id){
  let currentIndex = datas.findIndex(item => item.id === id);
  let previousIndex = currentIndex - 1;
  if (previousIndex < 0) {
    previousIndex = datas.length - 1; // Si currentIndex est 0, nous voulons remonter au dernier élément du tableau
  }
  const element_inf = datas[previousIndex];
  if (element_inf){
    left_horoscope.textContent = element_inf.signe
    left_horoscope.appendChild(span_left)
    span_left.textContent = element_inf.date
    
  }
}

// fonction qui cherche l'id dans le tableau 
function affiche_donnees_sup(id){
  let currentIndex = datas.findIndex(item => item.id === id);
  let nextIndex = (currentIndex + 1) % datas.length;
  const element_sup = datas[nextIndex]; // Accès à l'élément suivant dans le tableau
  if (element_sup){
    right_horoscope.textContent = element_sup.signe
    right_horoscope.appendChild(span_right)
    span_right.textContent = element_sup.date
  }
}

function change_element_left(){
  id = (tableauID.indexOf(id) - 1 < 0) ? tableauID[tableauID.length - 1] : tableauID[tableauID.indexOf(id) - 1];
  afficher_données_par_id(id)
}

function change_element_right(){
  id = tableauID[(tableauID.indexOf(id) + 1) % tableauID.length];
  afficher_données_par_id(id)
}

date_jour.textContent = "-- HOROSCOPE DU " + jour + "/" + mois + "/" + annee;
arrow_left.addEventListener("click", change_element_left)
arrow_right.addEventListener("click", change_element_right)
left_horoscope.addEventListener("click", change_element_left)
right_horoscope.addEventListener("click", change_element_right)

document.addEventListener('keydown', (e) => {
  // Vérifiez si la touche pressée est la touche de droite (ArrowRight)
  if (e.key === 'ArrowRight') {
      // Exécutez la fonction change_element_right
      change_element_right();
  }
});
document.addEventListener('keydown', (e) => {
  // Vérifiez si la touche pressée est la touche de droite (ArrowRight)
  if (e.key === 'ArrowLeft') {
      // Exécutez la fonction change_element_right
      change_element_left();
  }
});

