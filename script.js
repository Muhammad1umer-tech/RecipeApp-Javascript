getRandonMeal();
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

// async function getmealbySearch(name) {
//   const randomMeal = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=' + name);

// }

function loadRandomMeal(meals, random) {
  const mealele = document.querySelector('.meal');
  const ele = document.createElement('div');
  ele.innerHTML = `
        <div class="meal-header">
        ${random ? `<span class="random">${meals.strMeal}</span>` : 'hehe'}
          <img src="${meals.strMealThumb}">
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
    fetchMeals();
  });
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
  const mealids = getMealLocalStorage();
  mealarr= [];
  for(let i=0 ; i<mealids.length ; i++) {
    const meal = await getMealById(mealids[i]);
    addMealtoFav(meal);
    // mealarr.push(meal);
    
  }
  // console.log(mealarr);
}
function addMealtoFav(meal) {
  const elee = document.createElement('li');
  const favmeals = document.querySelector('.fav-meals');
  elee.innerHTML = `<img src="${meal.strMealThumb}" alt=""><Span></Span>`;
  favmeals.append(elee);
  const heartbtn = document.getElementById('heart');
 
}