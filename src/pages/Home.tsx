import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://hbd-backend.onrender.com/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <Link key={product._id} to={`/product/${p._id}`}>
            <div className="border p-4 rounded-xl shadow">
              <img src={`https://hbd-backend.onrender.com/${product.images[0]}`} className="h-60 w-full object-cover rounded" />
              <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
