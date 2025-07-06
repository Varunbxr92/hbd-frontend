import { useState } from 'react';

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });
  const [images, setImages] = useState<File[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files).slice(0, 3));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    images.forEach(img => data.append('images', img));
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    const res = await fetch('https://hbd-backend.onrender.com/api/products/upload', {
      method: 'POST',
      body: data
    });

    if (res.ok) {
      alert("Product uploaded!");
    } else {
      alert("Failed to upload");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Product</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input name="name" placeholder="Product Name" onChange={handleInput} className="border p-2 rounded" required />
        <input name="price" placeholder="Price" type="number" onChange={handleInput} className="border p-2 rounded" required />
        <input name="category" placeholder="Category" onChange={handleInput} className="border p-2 rounded" />
        <textarea name="description" placeholder="Description" onChange={handleInput} className="border p-2 rounded" required />
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="border p-2 rounded" required />
        <button type="submit" className="bg-black text-white py-2 rounded">Upload</button>
      </form>
    </div>
  );
};

export default AdminUpload;
