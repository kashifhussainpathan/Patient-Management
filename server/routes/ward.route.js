const express = require("express");

const {
  getAllWards,
  addWard,
  getWard,
  editWard,
  deleteWard,
} = require("../controllers/ward.controller");

const wardRouter = express.Router();

wardRouter.get("/", async (req, res) => {
  try {
    const allWards = await getAllWards();
    res
      .status(201)
      .json({ message: "All wards fetched successfully", wards: allWards });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch all wards", error });
  }
});

wardRouter.post("/", async (req, res) => {
  try {
    const wards = await addWard(req.body);

    if (wards.length >= 0) {
      res.status(201).json({ message: "New ward added successfully", wards });
    } else {
      res.status(404).json({ error: "Error adding new ward" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to add new ward", error });
  }
});

wardRouter.get("/:wardId", async (req, res) => {
  try {
    const selectedWard = await getWard(req.params.wardId);

    if (selectedWard) {
      res
        .status(201)
        .json({ message: "Ward fetched successfully", ward: selectedWard });
    } else {
      res.status(404).json({ error: "Ward not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch ward", error });
  }
});

wardRouter.put("/:wardId", async (req, res) => {
  try {
    const wards = await editWard(req.params.wardId, req.body);

    if (wards.length >= 0) {
      res.status(201).json({ message: "Ward updated successfully", wards });
    } else {
      res.status(404).json({ error: "Ward not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update ward", error });
  }
});

wardRouter.delete("/:wardId", async (req, res) => {
  try {
    const wards = await deleteWard(req.params.wardId);

    if (wards.length >= 0) {
      res.status(201).json({ message: "Ward deleted successfully", wards });
    } else {
      res.status(404).json({ message: "Ward not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete ward", error });
  }
});

module.exports = wardRouter;
