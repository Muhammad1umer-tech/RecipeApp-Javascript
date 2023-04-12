getRandonMeal();
async function getRandonMeal() {
  console.log("randomMeal");
  const randomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const meal = await randomMeal.json();
  const random = meal.meals[0];
  loadRandomMeal(random, true);
  // fetch gives promises. we have to convert it in JSON
}

// async function getMealById(id) {
//   const randomMeal = await fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);

// }

// async function getmealbySearch(name) {
//   const randomMeal = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=' + name);

// }

function loadRandomMeal(meals, random) {
  const mealele = document.querySelector('.meal');
  const ele = document.createElement('div');
  ele.innerHTML =  `
        <div class="meal-header">
        ${random ?    `<span class="random">${meals.strMeal}</span>`: 'hehe'}
          <img src="${meals.strMealThumb}">
        </div>
        <div class="meal-body">
          <h4>${meals.strMeal}</h4>
          <button>
            Heart
          </button>
        </div>
      </div>`;
  mealele.append(ele);
}