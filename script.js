// script.js



const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mealResults = document.getElementById('meal-results');
const showAllBtn = document.getElementById('show-all-btn');

searchBtn.addEventListener('click', searchMeals);

function searchMeals() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {



          mealResults.innerHTML = '';



          if (data.meals) {
            const meals = data.meals.slice(0, 5);
            meals.forEach(meal => {
              const mealItem = createMealItem(meal);
              mealResults.appendChild(mealItem);
            });


            if (data.meals.length > 5) {
              showAllBtn.style.display = 'block';
              showAllBtn.onclick = () => {

                data.meals.slice(5).forEach(meal => {
                  const mealItem = createMealItem(meal);
                  mealResults.appendChild(mealItem);
                });


                showAllBtn.style.display = 'none';
              };


            } else {
              showAllBtn.style.display = 'none';
            }


          } else {
            mealResults.innerHTML = '<p>No meals found.</p>';
            showAllBtn.style.display = 'none';
          }
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }
  }

 
function createMealItem(meal) {
    
    const mealItem = document.createElement('div');
    mealItem.classList.add('meal-item');



    mealItem.innerHTML = `
      <h2>Meal ID: ${meal.idMeal}</h2>
      <h3>Meal Name: ${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p>Cooking Instructions:</p>
      <p>${meal.strInstructions}</p>
    `;
    return mealItem;
  }
  




