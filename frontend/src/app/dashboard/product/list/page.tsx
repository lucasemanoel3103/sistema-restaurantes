"use client"
import styles from './styles.module.scss'
import { api } from '@/services/api'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Header } from '../../components/header'
import { getCookieClient } from '@/lib/cookieClient'

interface ProductProps {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
  category: {
    name: string;
  };
}

export default function ListProducts() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const token = getCookieClient();

      try {
        const response = await api.get('/show/product', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadProducts();
  }, []);

  const groupedProducts = products.reduce((groups, product) => {
    const categoryName = product.category.name;

    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }

    groups[categoryName].push(product);
    return groups;
  }, {} as Record<string, ProductProps[]>);

  return (
    <div className={styles.container}>
      <h1>Cardápio</h1>

      {Object.entries(groupedProducts).map(([categoryName, items]) => (
        <section key={categoryName} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{categoryName}</h2>

          <div className={styles.list}>
            {items.map(item => (
              <article key={item.id} className={styles.productItem}>
                <img 
                  src={`http://localhost:3333/files/${item.banner}`}
                  alt={item.name} 
                  className={styles.productImage}
                />

                <div className={styles.info}>
                  <span className={styles.productName}>{item.name}</span>
                  <span className={styles.price}>R$ {item.price}</span>
                  <span className={styles.description}>{item.description}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}