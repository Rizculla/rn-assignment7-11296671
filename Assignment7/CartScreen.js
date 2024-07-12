import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/carts/user/1');
      const cartProducts = response.data.reduce((acc, cart) => {
        cart.products.forEach(product => acc.push({ ...product, cartId: cart.id }));
        return acc;
      }, []);
      const detailedProducts = await Promise.all(cartProducts.map(async product => {
        const productDetails = await axios.get(`https://fakestoreapi.com/products/${product.productId}`);
        return { ...product, ...productDetails.data };
      }));
      setCartItems(detailedProducts);
    } catch (error) {
      console.error(error);
      setError('Failed to load cart items. Please try again.');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId, cartId) => {
    try {
      await axios.delete(`https://fakestoreapi.com/carts/${cartId}/items/${productId}`);
      setCartItems(cartItems.filter(item => item.productId !== productId || item.cartId !== cartId));
    } catch (error) {
      console.error(error);
      setError('Failed to remove item from cart. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text>{item.title}</Text>
      <Text>${item.price}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Button
        title="Remove from Cart"
        onPress={() => handleRemoveFromCart(item.productId, item.cartId)}
      />
    </View>
  );

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={cartItems}
        keyExtractor={item => `${item.cartId}-${item.productId}`}
        renderItem={renderItem}
      />
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>Total Price: ${totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  totalPriceContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CartScreen;
