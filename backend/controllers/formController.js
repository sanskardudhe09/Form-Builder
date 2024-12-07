const Form = require('../model/Form.js');
const Response = require('../model/Response.js');

// Create a new form
const createForm = async (req, res) => {
  try {
    const { title, description, headerImage, questions } = req.body;

    const newForm = new Form({
      title,
      description,
      headerImage,
      questions,
    });
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get form by ID
const getFormById = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit responses for a form
const submitResponse = async (req, res) => {
  try {
    const formId = req.params.id;
    const { responses } = req.body;

    const newResponse = new Response({
      formId,
      responses,
    });

    const savedResponse = await newResponse.save();
    res.status(201).json(savedResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createForm,
  getFormById,
  submitResponse,
};
