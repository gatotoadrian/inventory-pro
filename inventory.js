const inventory = [
    { id: 1, name: "Laptop", price: 120000, quantity: 50, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smartphone", price: 60000, quantity: 100, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Headphones", price: 12000, quantity: 200, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Mouse", price: 3600, quantity: 300, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Keyboard", price: 7200, quantity: 150, image: "https://via.placeholder.com/150" },
    { id: 6, name: "Monitor", price: 36000, quantity: 75, image: "https://via.placeholder.com/150" },
    { id: 7, name: "Tablet", price: 48000, quantity: 80, image: "https://via.placeholder.com/150" },
    { id: 8, name: "Printer", price: 24000, quantity: 40, image: "https://via.placeholder.com/150" },
];

let cartContents = [];

function displayInventory(items) {
    const inventoryContainer = document.getElementById('inventory');
    inventoryContainer.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <h3>${item.name}</h3>
            <p>Price: KSh ${item.price.toLocaleString()}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        inventoryContainer.appendChild(itemElement);
    });
}

function filterInventory() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredItems = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );
    displayInventory(filteredItems);
}

function sortInventory() {
    const sortBy = document.getElementById('sort').value;
    const sortedItems = [...inventory].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });
    displayInventory(sortedItems);
}

function addToCart(itemId) {
    const item = inventory.find(i => i.id === itemId);
    if (item && item.quantity > 0) {
        const existingItem = cartContents.find(i => i.id === itemId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartContents.push({ ...item, quantity: 1 });
        }
        item.quantity--;
        updateCart();
        displayInventory(inventory);
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    
    cartContents.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>KSh ${(item.price * item.quantity).toLocaleString()}</span>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
        count += item.quantity;
    });
    
    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = count;
}

// Event listeners
document.getElementById('search').addEventListener('input', filterInventory);
document.getElementById('sort').addEventListener('change', sortInventory);

// Initialize inventory display
displayInventory(inventory);