const express = require("express");
const { generateHeadline, generateContent } = require("../utils/gemini");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/enhance-title", async (req, res)=>{
    const { prompt } = req.body; //How to get more users for your saas
    if(!prompt){
        return res.status(400).json({error: "prompt is required"});
    }
    try{
        const content = await generateHeadline(prompt);
        return res.status(200).json({generatedContent: content});
    }catch(error){
        console.error("Error from generating content",error);
        return res.status(500).json({ error: 'Failed to generate content' });
    }
});

router.post("/enhance-content", async (req, res)=>{
    const { prompt } = req.body;
    if(!prompt){
        return res.status(400).json({error: "prompt is required"});
    }
    try{
        const content = await generateContent(prompt);
        return res.status(200).json({generatedContent: content});
    }catch(error){
        console.error("Error from generating content",error);
        return res.status(500).json({ error: 'Failed to generate content' });
    }
});
router.post("/enhance-keywords", async (req, res)=>{
    const { prompt } = req.body;
    if(!prompt){
        return res.status(400).json({error: "prompt is required"});
    }
    try{
        const content = await generateContentFromGemini(prompt);
        return res.status(200).json({generatedContent: content});
    }catch(error){
        console.error("Error from generating content",error);
        return res.status(500).json({ error: 'Failed to generate content' });
    }
});


module.exports = router;
