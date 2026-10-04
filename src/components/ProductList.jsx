import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/CartSlice';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState(new Set());

  const products = {
    'Indoor Plants': [
      {
        id: 1,
        name: 'Monstera Deliciosa',
        price: 35.99,
        image: '/images/monstera-deliciosa.jpg',
      },
      {
        id: 2,
        name: 'Snake Plant',
        price: 24.99,
        image: '/images/snake-plant.jpg',
      },
      {
        id: 3,
        name: 'Pothos',
        price: 19.99,
        image: '/images/pothos.jpg',
      },
      {
        id: 4,
        name: 'Peace Lily',
        price: 28.99,
        image: '/images/peace-lily.jpg',
      },
      {
        id: 5,
        name: 'Philodendron',
        price: 29.99,
        image: '/images/philodendron.jpg',
      },
      {
        id: 6,
        name: 'ZZ Plant',
        price: 32.99,
        image: '/images/zz-plant.jpg',
      },
    ],
    'Outdoor Plants': [
      {
        id: 7,
        name: 'Hibiscus',
        price: 42.99,
        image: '/images/hibiscus.jpg',
      },
      {
        id: 8,
        name: 'Rose Bush',
        price: 38.99,
        image: '/images/rose-bush.jpg',
      },
      {
        id: 9,
        name: 'Lavender',
        price: 22.99,
        image: '/images/lavender.jpg',
      },
      {
        id: 10,
        name: 'Sunflower',
        price: 19.99,
        image: '/images/sunflower.jpg',
      },
      {
        id: 11,
        name: 'Bougainvillea',
        price: 34.99,
        image: '/images/bougainvillea.jpg',
      },
      {
        id: 12,
        name: 'Jasmine Vine',
        price: 28.99,
        image: '/images/jasmine-vine.jpg',
      },
    ],
    'Succulents': [
      {
        id: 13,
        name: 'Aloe Vera',
        price: 15.99,
        image: 'https://i.imgur.com/Th5xiEz.png',
      },
      {
        id: 14,
        name: 'Echeveria',
        price: 18.99,
        image: '/images/echeveria.jpg',
      },
      {
        id: 15,
        name: 'Jade Plant',
        price: 21.99,
        image: '/images/jade-plant.jpg',
      },
      {
        id: 16,
        name: 'Sedum',
        price: 14.99,
        image: '/images/sedum.jpg',
      },
      {
        id: 17,
        name: 'Sempervivum',
        price: 16.99,
        image: '/images/sempervivum.jpg',
      },
      {
        id: 18,
        name: 'Cactus Mix',
        price: 17.99,
        image: '/images/cactus-mix.jpg',
      },
    ],
  };

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );

    // Disable button
    const newAddedItems = new Set(addedItems);
    newAddedItems.add(product.id);
    setAddedItems(newAddedItems);
  };

  return (
    <div className="product-list-container">
      {Object.entries(products).map(([category, items]) => (
        <section key={category} className="product-category">
          <h2 className="category-title">{category}</h2>
          <div className="products-grid">
            {items.map((product) => {
              const isAdded = addedItems.has(product.id);
              return (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <div className="product-card-body">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price}</p>
                    <button
                      className={`add-to-cart-btn ${isAdded ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={isAdded}
                    >
                      {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
