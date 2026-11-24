// 1. Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// 2. Restaurant Menu Data (Updated with Image URLs)
const menuData = [
    { 
        id: 1, 
        name: "Royal Mutton Karahi (Full)", 
        category: "Karahi", 
        price: 3400, 
        desc: "Cooked in pure desi ghee with freshly crushed black pepper",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0gvxxdyK74oh_mGKkFicXEvL3ZzF1eis8P3G1jhZeA&s=10"
    },
    { 
        id: 2, 
        name: "Chicken Makhni Handi", 
        category: "Karahi", 
        price: 1850, 
        desc: "Rich, creamy boneless chicken gravy simmered in butter",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGq3sgVhY5o5LU-aa_qIA73ZyEvCq5l2M922sdcMMTlQ&s=10"
    },
    { 
        id: 3, 
        name: "Malai Boti (12 Pcs)", 
        category: "BBQ", 
        price: 1100, 
        desc: "Tender boneless chicken cubes marinated in fresh cream & mild spices",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFB9MeC_6yr621glIee5rOfTy-YraYnVYisssb86Xag&s=10"
    },
    { 
        id: 4, 
        name: "Beef Seekh Kabab (6 Pcs)", 
        category: "BBQ", 
        price: 950, 
        desc: "Charcoal-grilled spiced minced beef skewers served with mint chutney",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkUs6OjZ2pq82Ps-LSZCq-uA-uZ_7eXMzCYAmWG5EFqA&s=10"
    },
    { 
        id: 5, 
        name: "Mint Margarita", 
        category: "Drinks", 
        price: 320, 
        desc: "Chilled blend of fresh garden mint, lime juice & sparkling soda",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88p53rDJDmXrb5X3jk4ptgVr0lPAGgDx1fsUlArUSOw&s=10"
    },
    { 
        id: 6, 
        name: "Royal Shahi Tukray", 
        category: "Desserts", 
        price: 450, 
        desc: "Saffron & cardamom-infused bread pudding topped with almonds",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0gvxxdyK74oh_mGKkFicXEvL3ZzF1eis8P3G1jhZeA&s=10"
    }
];

// 3. Load Saved Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('royalBitesCart')) || [];

// 4. Render Menu Items
const menuContainer = document.getElementById('menu-container');

function displayMenu(items) {
    if (!menuContainer) return;

    if (items.length === 0) {
        menuContainer.innerHTML = `<p style="color:#aaa; text-align:center; grid-column: 1/-1;">No dishes found matching your search.</p>`;
        return;
    }

    menuContainer.innerHTML = items.map(item => `
        <div class="menu-item" style="gap: 15px;">
            <img src="${item.img}" alt="${item.name}" style="width: 75px; height: 75px; object-fit: cover; border-radius: 8px; border: 1px solid #d4af37; flex-shrink: 0;">
            <div style="flex: 1;">
                <h4>${item.name}</h4>
                <small style="color: #aaa; display: block; line-height: 1.3;">${item.desc}</small>
                <span class="price">Rs. ${item.price}</span>
            </div>
            <button class="add-btn" onclick="addToCart(${item.id})">Add +</button>
        </div>
    `).join('');
}

// 5. Filter Menu by Category
function filterMenu(category, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    if (category === 'All') {
        displayMenu(menuData);
    } else {
        const filtered = menuData.filter(item => item.category === category);
        displayMenu(filtered);
    }
}

// 6. Live Search Function
function searchMenu() {
    const searchInput = document.getElementById('menu-search');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase();
    const filtered = menuData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
    );
    displayMenu(filtered);
}

// 7. Cart Functions
function addToCart(id) {
    const product = menuData.find(item => item.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveAndUpdateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveAndUpdateCart();
}

function saveAndUpdateCart() {
    localStorage.setItem('royalBitesCart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (cartCount) cartCount.innerText = totalQty;
    if (cartTotal) cartTotal.innerText = `Rs. ${totalPrice}`;

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p style="color:#aaa; text-align:center; margin-top:40px;">Your cart is empty.</p>`;
            return;
        }
        cartItemsContainer.innerHTML = cart.map(item => `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #333; padding:10px 0;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${item.img}" alt="${item.name}" style="width:45px; height:45px; object-fit:cover; border-radius:5px;">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small style="color:#d4af37;">Rs. ${item.price} x ${item.qty}</small>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:16px;">✕</button>
            </div>
        `).join('');
    }
}

// 8. Toggle Cart Drawer
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.toggle('open');
}

// 9. Checkout via WhatsApp API
const RESTAURANT_WHATSAPP = "923001234567"; // Apna WhatsApp number yahan dalein

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Please add some delicious dishes to your cart first!");
        return;
    }
    let message = "Hello Royal Bites! I would like to place an order:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        message += `• ${item.name} (x${item.qty}) - Rs. ${itemTotal}%0A`;
    });

    message += `%0A*Total Bill: Rs. ${total}*`;
    window.open(`https://wa.me{RESTAURANT_WHATSAPP}?text=${message}`, '_blank');
}

// 10. Table Reservation Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0];
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('res-date').value;
        const guests = document.getElementById('guests').value;
        const notes = document.getElementById('message').value || "None";

        const successBox = document.getElementById('booking-success');
        const summaryText = document.getElementById('booking-summary');
        const waBtn = document.getElementById('whatsapp-booking-btn');

        summaryText.innerText = `Thank you, ${name}! Table for ${guests} on ${date} is ready to be confirmed.`;
        successBox.style.display = 'block';

        waBtn.onclick = function() {
            const msg = `Hello Royal Bites! I want to reserve a table:%0A%0A` +
                        `• Name: ${name}%0A` +
                        `• Phone: ${phone}%0A` +
                        `• Date: ${date}%0A` +
                        `• Guests: ${guests}%0A` +
                        `• Notes: ${notes}`;
            window.open(`https://wa.me{RESTAURANT_WHATSAPP}?text=${msg}`, '_blank');
        };

        contactForm.reset();
    });
}

// 11. Gallery Lightbox Modal
function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightboxImg.src = imgElement.src;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// 12. Initialize Menu & Cart on Page Load
displayMenu(menuData);
updateCartUI();

