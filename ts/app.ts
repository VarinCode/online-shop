const container: HTMLElement = document.querySelector(".container")!;
const url: string = "https://fakestoreapi.com/products";

interface DataStructure {
  id: number;
  title: number;
  price: number;
  description: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const fetchAPI = async (url: string): Promise<DataStructure[]> => {
  const response: Response = await fetch(url);
  const data: DataStructure[] = await response.json();
  return data;
};

const createCards = async (): Promise<void> => {
  const data: DataStructure[] = await fetchAPI(url);
  const newData: DataStructure[] = data.filter(
    (el: DataStructure): boolean =>
      el.category == "men's clothing" || el.category == "women's clothing"
  );
  for (let item of newData) {
    const card: HTMLDivElement = document.createElement("div")!;
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
                            ${'<i class="bi bi-star-fill star"></i>'.repeat(
                              Math.trunc(item.rating.rate)
                            )}
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
