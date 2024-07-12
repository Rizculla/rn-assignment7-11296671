Certainly! Below is an updated README file including your student ID and placeholders for screenshots.

---

# E-Commerce App

This is a simple e-commerce app built with React Native. Products fetched from an eternal API

**Student ID**: [11296671]

## Features

- **Product Listing**: Display a list of products fetched from an API.
- **Add to Cart**: Users can add products to their cart.
- **Cart Management**: View and remove products from the cart, along with the total price.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Rizculla/rn-assignment7-11296671
.git
    cd Assignment7
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the app**:
    ```bash
    npx react-native run-android
    # or
    npx react-native run-ios
    ```

## Project Structure

```
.
├── assets
│   ├── Filter.png
│   ├── Logo.png
│   ├── Menu.png
│   ├── Search.png
│   └── shoppingBag.png
├── components
│   └── ProductItem.js
├── screens
│   ├── HomeScreen.js
│   └── CartScreen.js
├── App.js
└── README.md
```

## Screenshots

Here are some screenshots of the app:

### Home Screen

![Home Screen](./assets/home_screen.png)

### Cart Screen

![Cart Screen](./assets/cart_screen.png)

### Components

#### `ProductItem.js`

```javascript
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <TouchableOpacity onPress={onAddToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProductItem;
```

### Screens

#### `HomeScreen.js`

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ProductItem from './ProductItem';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products. Please try again.');
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/carts', { userId: 1, date: new Date(), products: [{ productId: product.id, quantity: 1 }] });
      if (response.status === 200 || response.status === 201) {
        navigation.navigate('Cart');
      } else {
        setError('Failed to add product to cart. Please try again.');
      }
    } catch (error) {
      setError('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('./assets/Menu.png')} style={styles.icon} />
        </TouchableOpacity>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image source={require('./assets/Search.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/Filter.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subheading}>
        <Text style={styles.storyTitle}>OUR STORY</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image source={require('./assets/shoppingBag.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductItem product={item} onAddToCart={() => handleAddToCart(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 25,
    height: 25,
  },
  logo: {
    width: 100,
    height: 40,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  subheading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
```

## Contributing

If you wish to contribute to this project, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License.
