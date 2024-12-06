import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FormPreview = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Fetch the form data from the backend
    const fetchForm = async () => {
      const response = await fetch(`https://form-builder-5bg4.vercel.app/api/forms/${id}`);
      const data = await response.json();
      setForm(data);
    };
    fetchForm();
  }, [id]);

  const handleSubmit = async () => {
    await fetch(`https://form-builder-5bg4.vercel.app/api/forms/${id}/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responses }),
    });
    alert('Form submitted successfully!');
  };

  if (!form) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <p className="mb-4">{form.description}</p>
      {form.headerImage && <img src={form.headerImage} alt="Header" className="mb-4" />}
      </div>
      <form className="space-y-6">
      {form.questions.map((question, index) => (
        <div key={index} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow">
          <p className='text-lg font-medium text-gray-700 mb-2'>{question.questionText}</p>
          {question.image && <img src={question.image} alt="Question" className="w-full max-h-48 object-cover rounded-lg mb-4" />}
          {question.type === 'categorize' && (
            <select
              onChange={(e) => setResponses({ ...responses, [index]: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
            >
              {question.options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {question.type === 'cloze' && (
            <input
              type="text"
              placeholder="Your Answer"
              onChange={(e) => setResponses({ ...responses, [index]: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          )}
          {question.type === 'comprehension' && (
            <>
              <p className='text-gray-600 mb-3'>{question.comprehensionText}</p>
              <textarea
                placeholder="Your Answer"
                onChange={(e) => setResponses({ ...responses, [index]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </>
          )}
        </div>
      ))}
      </form>
      <button onClick={handleSubmit} className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600">
        Submit
      </button>
      </div>
    </div>
  );
};

export default FormPreview;
