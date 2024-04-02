// DOM elements
const homeLink = document.querySelector("#homeLink");
const clientsLink = document.querySelector("#clientsLink");
const dishesLink = document.querySelector("#dishesLink");
const workersLink = document.querySelector("#workersLink");
const eventsLink = document.querySelector("#eventsLink");
const cardsContainer = document.querySelector("#cardsContainer");

// Event listeners
homeLink.addEventListener("click", () => loadPage("Welcome to the Restaurant Management System"));
clientsLink.addEventListener("click", () => loadData("clients"));
dishesLink.addEventListener("click", () => loadData("dishes"));
workersLink.addEventListener("click", () => loadData("workers"));
eventsLink.addEventListener("click", () => loadData("events"));

// Functions
async function loadData(endpoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`);
        const data = await response.json();
        buildCards(data)
        // Handle the response data as needed
    } catch (error) {
        console.error(error);
    }
}

function loadPage(message) {
    mainContent.innerHTML = `<h2>${message}</h2>`;
}

// function buildCards(data) {
//     cardsContainer.innerHTML = ""; // Clear previous content
    
//     data.forEach((item, index) => {
//         cardsContainer.innerHTML += `
//             <div class="card mb-3" style="max-width: 540px;">
//                 <div class="row g-0">
//                     <div class="col-md-4">
//                     </div>
//                     <div class="col-md-8">
//                         <div class="card-body">
//                             <h5 class="card-title">${item.name}</h5>
//                             <p class="card-text">${item.email}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     });
// }

function buildCards(data) {
    cardsContainer.innerHTML = ""; // Clear previous content
    
    data.forEach((item, index) => {
        // Start building card content
        let cardContent = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
        `;

        // Iterate over properties of the current object
        for (const key in item) {
            if (Object.hasOwnProperty.call(item, key) && key !== '_id' && key !== '__v') {
                // Add property to card content
                cardContent += `
                    <h5 class="card-title">${key}: ${item[key]}</h5>
                `;
            }
        }

        // Complete card content
        cardContent += `
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append card to cardsContainer
        cardsContainer.innerHTML += cardContent;
    });
}

