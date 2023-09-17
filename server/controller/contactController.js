const Contact = require('../model/userModel');

// @desc   Fetch all contact
// @route  GET /api/contacts
//@access  Public
async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find({});
    res.status(200).json({ contacts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
}

// @desc   Fetch a single contact by ID
// @route  GET /api/contacts/:id
//@access  Public
async function getSingleContact(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(400).json({ message: 'Contact not found!' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: 'Server error', message: error.message });
  }
}

// @desc   create contact
// @route  Post /api/contacts
//@access  Public
async function createContact(req, res) {
  const { name, email, phoneNumber } = req.body;
  try {
    const contactExist = await Contact.findOne({ email });

    if (contactExist) {
      res.status(400);
      return res.status(400).json({ error: 'Contact already exists' });
    }
    const contact = await Contact.create({ name, email, phoneNumber });

    if (contact) {
      res.status(201).json({
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Server error',
      message: error,
    });
  }
}

// @desc   update contact
// @route  Put /api/contacts/:id
//@access  Public
async function updateContact(req, res) {
  try {
    const updateData = req.body;
    const contactId = req.params.id;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updateData,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(400).json({ error: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
}

// @desc   single all contact
// @route  GET /api/contacts/:id
//@access  Public
async function deleteContact(req, res) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).json();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
}

module.exports = {
  getAllContacts,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
