const mongoose = require("mongoose");
const fs = require("fs");

const jsonData = fs.readFileSync("./data/ward.json");
const wardData = JSON.parse(jsonData);

const Ward = require("../models/ward.model");

const seedWardDatabase = async () => {
  try {
    for (const ward of wardData) {
      const newWard = new Ward(ward);
      await newWard.save();
      console.log(`Ward ${newWard.wardNumber} seeded`);
    }
    console.log("Ward database seeded successfully");
  } catch (error) {
    console.log("Error seeding ward database:", error);
  } finally {
    mongoose.disconnect();
  }
};

const getAllWards = async () => {
  try {
    const allWards = await Ward.find();
    console.log("All wards:", allWards);
    return allWards;
  } catch (error) {
    console.log("Error fetching all wards:", error);
  }
};

const addWard = async (ward) => {
  try {
    const newWard = new Ward(ward);
    const addedWard = await newWard.save();
    if (addedWard) {
      const wards = getAllWards();
      console.log("New ward added successfully:", addedWard);
      return wards;
    } else {
      console.log("Unable to add new ward");
    }
  } catch (error) {
    console.log("Error adding new ward:", error);
  }
};

const editWard = async (wardId, ward) => {
  try {
    const updatedWard = await Ward.findByIdAndUpdate(wardId, ward, {
      new: true,
    });
    if (updatedWard) {
      const wards = getAllWards();
      console.log("Ward updated successfully:", updatedWard);
      return wards;
    } else {
      console.log("Unable to update ward");
    }
  } catch (error) {
    console.log("Error updating ward:", error);
  }
};

const deleteWard = async (wardId) => {
  try {
    const deletedWard = await Ward.findByIdAndDelete(wardId);
    if (deletedWard) {
      const wards = getAllWards();
      console.log("Ward deleted successfully:", deletedWard);
      return wards;
    } else {
      console.log("Unable to delete ward");
    }
  } catch (error) {
    console.log("Error deleting ward:", error);
  }
};

const getWard = async (wardNum) => {
  try {
    const selectedWard = await Ward.findOne({ wardNumber: wardNum });
    if (selectedWard) {
      console.log("Ward fetched successfully:", selectedWard);
      return selectedWard;
    } else {
      console.log("Unable to fetch ward");
    }
  } catch (error) {
    console.log("Error fetching ward:", error);
  }
};

module.exports = {
  seedWardDatabase,
  getAllWards,
  addWard,
  editWard,
  deleteWard,
  getWard,
};
