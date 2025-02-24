const express = require("express");
const router = express.Router();
const Form = require("../models/Form");

router.post("/", async (req, res) => {
    try {
        const { title, fields } = req.body;

        if (!title || !Array.isArray(fields)) {
            return res.status(400).json({ error: "Invalid request format" });
        }

        const newForm = new Form({ title, fields });
        await newForm.save();

        res.status(201).json({ message: "Form saved successfully!", form: newForm });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
