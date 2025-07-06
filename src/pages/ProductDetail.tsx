import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Helmet } from 'react-helmet';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`https://hbd-backend.onrender.com/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, []);

  // const handleStripeCheckout = async () => {
  //   const res = await fetch('https://hbd-backend.onrender.com/api/stripe/create-checkout-session', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ product }),
  //   });
  //   const { id } = await res.json();
  //   const stripe = await stripePromise;
  //   await stripe?.redirectToCheckout({ sessionId: id });
  // };
  const handleStripeCheckout = async () => {
  const res = await fetch('https://hbd-backend.onrender.com/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product }),
  });
  const { id } = await res.json();
  const stripe = await stripePromise;
  await stripe?.redirectToCheckout({ sessionId: id });
};


  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <Helmet>
        <title>{product.name} | House Of Blended Drapes</title>
        <meta name="description" content={product.description?.slice(0, 160)} />
        <meta property="og:title" content={product.name} />
        <meta property="og:image" content={`https://hbd-backend.onrender.com/${product.images[0]}`} />
        <meta property="og:description" content={product.description?.slice(0, 160)} />
        <meta property="og:url" content={`https://hbd.vercel.app/product/${product._id}`} />
      </Helmet>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {product.images.map((img: string, i: number) => (
            <img key={i} src={`https://hbd-backend.onrender.com/${img}`} className="rounded mb-2 w-full object-cover" />
          ))}
        </div>
        <div>
          <p className="text-xl text-gray-700 mb-4">₹{product.price}</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded mr-3" onClick={handleStripeCheckout}>
            Buy with Card (Stripe)
          </button>
          <a
            href={`https://wa.me/919999687769?text=I'm%20interested%20in%20${product.name}`}
            target="_blank"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};


export default ProductDetail;
