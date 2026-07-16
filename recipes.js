const recipes = [
    // Your Burger Recipe
    {
        id: 1,
        title: 'Here is how to make a delicious burger.',
        description: 'Juicy beef patty with fresh lettuce and tomato.',
        image: 'images/burger.webp',
        category: 'meat',
        time: '25 min',
        likes: 89,
        tag: '🥩 Meat'
    },
    // Chicken Salad
    {
        id: 2,
        title: 'Here is how to make a chicken salad bowl.',
        description: 'Fresh greens with grilled chicken and vinaigrette.',
        image: 'images/chicken_salad.jpg',
        category: 'vegan',
        time: '15 min',
        likes: 45,
        tag: '🥗 Healthy'
    },
    // Chicken Wrap
    {
        id: 3,
        title: 'Here is how to make a tasty chicken wrap.',
        description: 'Grilled chicken wrapped in a soft tortilla.',
        image: 'images/chicken_wrap.jpg',
        category: 'meat',
        time: '20 min',
        likes: 56,
        tag: '🥩 Meat'
    },
    // Fried Chicken
    {
        id: 4,
        title: 'Here is how to make delicious fried chicken with Indian parata.',
        description: 'Crispy fried chicken served with soft parata.',
        image: 'images/fried_chicken.jpg',
        category: 'meat',
        time: '40 min',
        likes: 72,
        tag: '🥩 Meat'
    },
    // Fruit Salad
    {
        id: 5,
        title: 'Here is how to make a refreshing fruit bowl.',
        description: 'Fresh seasonal fruits with a honey drizzle.',
        image: 'images/fruit_salad_bowl.jpg',
        category: 'vegan',
        time: '10 min',
        likes: 34,
        tag: '🌱 Vegan'
    },
    // Pancakes
    {
        id: 6,
        title: 'Here is how to enjoy your breakfast with delicious fresh pancakes.',
        description: 'Fluffy pancakes with maple syrup and berries.',
        image: 'images/pancakes.webp',
        category: 'breakfast',
        time: '15 min',
        likes: 61,
        tag: '🍳 Breakfast'
    }
];

// ============================================
// RENDER FUNCTION
// ============================================
const recipeGrid = document.getElementById('recipeGrid');

function renderRecipes(category = 'all') {
    // Filter recipes based on category
    let filteredRecipes = recipes;
    if (category !== 'all') {
        filteredRecipes = recipes.filter(recipe => recipe.category === category);
    }

    // If no recipes, show message
    if (filteredRecipes.length === 0) {
        recipeGrid.innerHTML = `
            <div class="no-recipes">
                <i class="fas fa-search"></i>
                <p>No recipes found in this category yet.</p>
                <p style="font-size: 14px; color: #888;">Check back soon for new recipes!</p>
            </div>
        `;
        return;
    }

    // Generate HTML for each recipe
    recipeGrid.innerHTML = filteredRecipes.map(recipe => `
        <article class="grid-item">
            <img src="${recipe.image}" alt="${recipe.title}" />
            <h2>${recipe.title}</h2>
            <div class="recipe-meta">
                <span><i class="far fa-clock"></i> ${recipe.time}</span>
                <span><i class="far fa-heart"></i> ${recipe.likes}</span>
            </div>
        </article>
    `).join('');
}

// ============================================
// TAB FUNCTIONALITY
// ============================================
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get category and render
        const category = this.dataset.category;
        renderRecipes(category);
    });
});

// ============================================
// INITIAL LOAD
// ============================================
// Show all recipes on page load
renderRecipes('all');

console.log('🍽️ Tabbed recipe section loaded!');
console.log(`📊 ${recipes.length} recipes available`);

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        // If search is empty, show all recipes
        renderRecipes('all');
        return;
    }

    // Filter recipes by title or description
    const filtered = recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(query) || 
               recipe.description.toLowerCase().includes(query);
    });

    // Display results
    const recipeGrid = document.getElementById('recipeGrid');
    
    if (filtered.length === 0) {
        recipeGrid.innerHTML = `
            <div class="no-recipes">
                <i class="fas fa-search"></i>
                <p>No recipes found for "<strong>${query}</strong>"</p>
                <p style="font-size: 14px; color: #888;">Try searching for "chicken", "pasta", or "vegan"</p>
            </div>
        `;
        return;
    }

    // Render filtered recipes
    recipeGrid.innerHTML = filtered.map(recipe => `
        <article class="grid-item">
            <img src="${recipe.image}" alt="${recipe.title}" />
            <h2>${recipe.title}</h2>
            <div class="recipe-meta">
                <span><i class="far fa-clock"></i> ${recipe.time}</span>
                <span><i class="far fa-heart"></i> ${recipe.likes}</span>
            </div>
        </article>
    `).join('');
}

// Event listeners
searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Clear search when clicking a tab
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        searchInput.value = ''; // Clear search input
    });
});