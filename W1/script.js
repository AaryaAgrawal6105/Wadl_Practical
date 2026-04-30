const products = [
    { name: "Wireless Headphones", price: "₹7,999", desc: "Noise-cancelling over-ear headphones.", img: "images/headphones.jpg" },
    { name: "Smartwatch", price: "₹12,999", desc: "Fitness tracking smartwatch.", img: "images/smartwatch.jpg" },
    { name: "Gaming Mouse", price: "₹2,499", desc: "Ergonomic gaming mouse.", img: "images/mouse.jpg" },
    { name: "Laptop Stand", price: "₹1,999", desc: "Adjustable aluminium stand.", img: "images/stand.jpg" },

    // Add more products to exceed 10
    { name: "Keyboard", price: "₹3,499", desc: "Mechanical keyboard.", img: "images/mouse.jpg" },
    { name: "Monitor", price: "₹15,999", desc: "24-inch IPS monitor.", img: "images/mouse.jpg" },
    { name: "USB Hub", price: "₹999", desc: "Multiport USB hub.", img: "images/mouse.jpg" },
    { name: "Webcam", price: "₹2,199", desc: "HD webcam.", img: "images/mouse.jpg" },
    { name: "Speakers", price: "₹4,499", desc: "Stereo speakers.", img: "images/mouse.jpg" },
    { name: "Microphone", price: "₹5,999", desc: "USB condenser mic.", img: "images/mouse.jpg" },
    { name: "Tablet", price: "₹18,999", desc: "Android tablet.", img: "images/mouse.jpg" },
    { name: "Charger", price: "₹799", desc: "Fast charger.", img: "images/mouse.jpg" }
];

const rowsPerPage = 10;
let currentPage = 1;

const tableBody = document.querySelector("#productTable tbody");
const pageInfo = document.getElementById("pageInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function displayProducts() {
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = products.slice(start, end);

    paginatedItems.forEach(product => {
        const row = `
            <tr>
                <td><img src="${product.img}" alt="${product.name}"></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.desc}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(products.length / rowsPerPage)}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(products.length / rowsPerPage);
}

prevBtn.addEventListener("click", () => {
    currentPage--;
    displayProducts();
});

nextBtn.addEventListener("click", () => {
    currentPage++;
    displayProducts();
});

// Initial load
displayProducts();