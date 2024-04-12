const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
   
    
  },
  species: {
    type: String,
    required: [true, 'Species  is required'],
    
  },
  skinColor: {
    type: String,
    required: [true, 'Skin color  is required'],
    
  },
  eyeColor: {
    type: String,
    required: [true, 'Eye color  is required'],
    
  },
  image: {
    type: String,
    required: [true, 'Image is required'],	
    // match: [/^https?:\/\//, "Invalid URL"],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
 
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Creature = mongoose.model("Book", creatureSchema);

module.exports = Creature;
