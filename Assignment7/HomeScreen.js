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
        console.log(response.data); 
        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load products. Please try again.');
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await axios.post('https://fakestoreapi.com/carts', { productId: product.id });
      navigation.navigate('Cart');
    } catch (error) {
      console.error(error);
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
            <ProductItem product={item} onAddToCart={handleAddToCart} />
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
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  subheading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
