const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

//event listeners
recipeCloseBtn.addEventListener('click',()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipe')
})
searchBtn.addEventListener('click',getMealList)
mealList.addEventListener('click',getMealRecipe)
//Get meal list that matches with ingredients
function getMealList(){
    let searchInputText = document.getElementById("search-input").value.trim();
    // console.log(searchInputText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then((response)=>response.json())
    .then(data=>{
        // console.log(data);
    let html = "";
    if(data.meals){
        data.meals.forEach((meal)=> {
            html += ` 
            <div class="meal-item" data-id ="${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="food" >
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
            `
        }) 
        mealList.classList.remove('notFound');
    }
    else{
        mealList.classList.add('notFound');
        html="Sorry. No meal found"
     }
    mealList.innerHTML = html;
    })
    .catch((err)=>{
        console.log(err);
    });
}

//get recipe of meal
function getMealRecipe(e){
e.preventDefault();
if(e.target.classList.contains('recipe-btn')){
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then( res => res.json())
    .then( data => {
      mealRecipeModal(data.meals)
    })
}  
}

//creating a modal
function mealRecipeModal(meal){
meal = meal[0];
let html = `
<h2 class="recipe-title">${meal.strMeal}</h2>
<p class="recipe-category">${meal.strCategory}</p>
<div class="recipe-instruct">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions} </p>
</div>
<div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" alt="">
</div>
<div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
</div>
`
mealDetailsContent.innerHTML = html;
mealDetailsContent.parentElement.classList.add('showRecipe')
}

