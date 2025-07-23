import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL} from '../baseurl';


const FaqManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [editId, setEditId] = useState(null);

  const fetchFaqs = async () => {
    const res = await axios.get(`${BASE_URL}/faq/all`);
    setFaqs(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${BASE_URL}/faq/${editId}`, form);
    } else {
      await axios.post(`${BASE_URL}/faq`, form);
    }
    setForm({ question: '', answer: '' });
    setEditId(null);
    fetchFaqs();
  };

  const handleEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditId(faq.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/faq/${id}`);
    fetchFaqs();
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Manage FAQs</h2>

      <form onSubmit={handleSubmit} className="bg-yellow-100 p-4 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-green-800 mb-1">Question:</label>
          <input
            type="text"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className="w-full p-2 border border-green-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-green-800 mb-1">Answer:</label>
          <textarea
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            className="w-full p-2 border border-green-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editId ? 'Update FAQ' : 'Add FAQ'}
        </button>
      </form>

      <div className="bg-yellow-50 rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold text-green-600 mb-4">All Questions</h3>
        {faqs.map((faq) => (
          <div key={faq.id} className="border-b border-green-200 py-3">
            <h4 className="text-green-800 font-bold">Q: {faq.question}</h4>
            <p className="text-green-700">A: {faq.answer}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(faq)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqManager;
