getRandonMeal();
fetchMeals();

const searchterm = document.getElementById("search-term");
const search = document.getElementById("search");
search.addEventListener("click", () => {
  const mealName = searchterm.value;
  getmealbySearch(mealName);
});


async function getRandonMeal() {
  console.log("randomMeal");
  const randomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const meal = await randomMeal.json();
  const random = meal.meals[0];
  loadRandomMeal(random, true);
  // fetch gives promises. we have to convert it in JSON
}

async function getMealById(id) {
  const randomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
  const mm = await randomMeal.json();
  return mm.meals[0];
}

async function getmealbySearch(name) {

  const randomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + name);
  const responsdata = await randomMeal.json();
  loadRandomMeal(responsdata.meals[0], true)
}

function loadRandomMeal(meals, random) {
  const mealele = document.querySelector('.meal');
  const ele = document.createElement('div');
  ele.innerHTML = `
        <div class="meal-header">
        ${random ? `<span class="random">${meals.strMeal}</span>` : 'hehe'}
          <img id="imgclick" src="${meals.strMealThumb}">
        </div>
        <div class="meal-body">
          <h4>${meals.strMeal}</h4>
          <button id="heart">
            Heart
          </button>
        </div>
      </div>`;
  mealele.append(ele);
  const heartbtn = document.getElementById('heart');
  heartbtn.addEventListener('click', () => {
    addmealLs(meals.idMeal);
    fetchMealsLastone();
  });

  // we cant use mealele.getelementById
   const imgclick = mealele.querySelector("#imgclick");
  
 imgclick.addEventListener("click", () =>{
       showemealinfo(meals);
      });

}
function remvoemeal(id) {
  const meal = getMealLocalStorage();
  const removeone = meal.filter((val) => id !== val);
  localStorage.setItem("mealids", JSON.stringify(removeone));
}
function addmealLs(id) {
  const mealids = getMealLocalStorage();
  localStorage.setItem("mealids", JSON.stringify([...mealids, id]));
}

function getMealLocalStorage() {
  const mealIds = JSON.parse(localStorage.getItem("mealids"));

  return mealIds === null ? [] : mealIds;
}

async function fetchMeals() {
  const favmeals = document.querySelector(".fav-meals");
  const cl = favmeals.querySelector(".cl");
  console.log(cl);
  favmeals.innerHTML = "";
  const mealids = getMealLocalStorage();
  mealarr = [];
  for (let i = 0; i < mealids.length; i++) {
    const meal = await getMealById(mealids[i]);
    addMealtoFav(meal);
    // mealarr.push(meal);
  }
  // console.log(mealarr);
}
async function fetchMealsLastone() {
  const mealids = getMealLocalStorage();
  mealarr = [];
  const meal = await getMealById(mealids[mealids.length - 1]);
  addMealtoFav(meal);
}

const favmeals = document.querySelector('.fav-meals');
function addMealtoFav(meal) {
  const elee = document.createElement('li');
  elee.innerHTML = `<img src="${meal.strMealThumb}" alt=""><button class="clear">X</button>`;
  elee.classList.add("cl")
  //if html in js and want to access . use that elemnt jis mai tum innerhtml kr rh......
  favmeals.append(elee);
  
  const clear = elee.querySelector(".clear");
  clear.addEventListener("click", () => {
    remvoemeal(meal.idMeal);
    fetchMeals();
  });

  elee.addEventListener("click", () =>{
       showemealinfo(meal);
      });
  
}


const mealinfo = document.getElementById("mealinfo");
function showemealinfo(meal) {
  const mealele = document.createElement("div");
  mealinfo.innerHTML = "";
  mealele.innerHTML = `<h1>${meal.strMeal}</h1>
   <button class="popupButton">X</button>
      <img src="${meal.strMealThumb}">
      <p>${meal.strInstructions}</p>`
      mealinfo.append(mealele);
  
      const mealpopup = document.getElementById("meal-popup");
      const popbtn = mealinfo.querySelector(".popupButton");
      

      mealpopup.classList.remove("hidden");
      popbtn.addEventListener("click", () => {
        mealpopup.classList.add("hidden");
      });

}


