"use strict";
const container = document.querySelector(".container");
const url = "https://fakestoreapi.com/products";
const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
const createCards = async () => {
    const data = await fetchAPI(url);
    const newData = data.filter((el) => el.category == "men's clothing" || el.category == "women's clothing");
    for (let item of newData) {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.innerHTML = `
                <div class="card-img">
                    <img src=${item.image} alt=${item.title}>
                </div>
                <div class="card-body">
                    <h1>${item.title}</h1>
                    <span class="card-info">
                        <span class="rating">
                            <p>Rating ${item.rating.rate}</p>
                            ${'<i class="bi bi-star-fill star"></i>'.repeat(Math.trunc(item.rating.rate))}
                        </span>
                        <p class="price">$${item.price}</p>
                    </span>
                    <hr>
                    <p class="card-description">${item.description}</p>
                    <button class="btn"><i class="bi bi-cart-fill"></i>&nbsp;Buy Now</button>   
                </div>
            `;
        container.appendChild(card);
    }
};
createCards();
