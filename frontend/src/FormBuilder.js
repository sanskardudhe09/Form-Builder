import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('');
  const [description, setDescription] = useState('');
  const [headerImage, setHeaderImage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = (type) => {
    setQuestions([
      ...questions,
      { id: Date.now(), type, questionText: '', options: [], image: '', comprehensionText: '' },
    ]);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (file) => {
    const newFileString = await convertFileToBase64(file);
    setHeaderImage(newFileString);
  };

  const handleSaveForm = async () => {
    const formData = {
      title: formTitle,
      description,
      headerImage,
      questions,
    };

    // Save form to the backend
    const response = await fetch(`https://form-builder-5bg4.vercel.app/api/forms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);
    if (data._id) navigate(`https://form-builder-5bg4.vercel.app/api/forms/${data._id}`);
  };

  const handleQuestionChange = async (id, field, value) => {
    if(field !== 'image'){
      setQuestions(
        questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
      );
    }else{
      const newValue = await convertFileToBase64(value);
      console.log(newValue);
      console.log(field);
      setQuestions(
        questions.map((q) => (q.id === id ? { ...q, [field]: newValue } : q))
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Form Builder</h1>

      {/* Form Header */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Form Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg mb-4"
        />
        <textarea
          placeholder="Form Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="block w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer mb-4"
        />
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow">
            <select
              value={question.type}
              onChange={(e) => handleQuestionChange(question.id, 'type', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg mb-3"
            >
              <option value="categorize">Categorize</option>
              <option value="cloze">Cloze</option>
              <option value="comprehension">Comprehension</option>
            </select>
            <textarea
              placeholder="Question Text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(question.id, 'questionText', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg mb-3"
            />
            {question.type === 'categorize' && (
              <input
                type="text"
                placeholder="Options (comma-separated)"
                value={question.options.join(', ')}
                onChange={(e) =>
                  handleQuestionChange(question.id, 'options', e.target.value.split(', '))
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg mb-3"
              />
            )}
            {question.type === 'comprehension' && (
              <textarea
                placeholder="Comprehension Text"
                value={question.comprehensionText}
                onChange={(e) =>
                  handleQuestionChange(question.id, 'comprehensionText', e.target.value)
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg mb-3"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleQuestionChange(question.id, 'image', e.target.files[0])}
              className="block w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Add Question */}
      <div className="flex gap-4 mt-6">
        <button onClick={() => addQuestion('categorize')} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
          Add Categorize
        </button>
        <button onClick={() => addQuestion('cloze')} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
          Add Cloze
        </button>
        <button onClick={() => addQuestion('comprehension')} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
          Add Comprehension
        </button>
      </div>

      {/* Save Form */}
      <button onClick={handleSaveForm} className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600">
        Save Form
      </button>
      </div>
    </div>
  );
};

export default FormBuilder;
