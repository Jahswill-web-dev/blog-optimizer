const axios = require("axios");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const headlineGuide = `Use specific numbers and data in your headline (e.g. "8 Steps to Start a Home-Based Business") Utilize a unique rationale 
(e.g. "5 Tips to Write Blog Introductions Like a Pro"), Call for attention,
 Make the headline unique, ultra-specific, convey a sense of urgency, and provide something useful. 
 use the 4 U's of Writing Attention-Grabbing Headlines 1. Make the headline unique
2. Be ultra-specific
3. Convey a sense of urgency
4. Provide something useful 

Additional Tips
 Use odd numbers instead of even numbers in your headlines
 Use specific phrases that communicate exactly what the reader will get by clicking
 Infuse your headline with urgency to encourage readers to click now
 Provide meaningful value to your readers.`;
const contentGuide = ``;

const headlineModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You will be given a Headline for a blog article and you are to improve the headline, using the following information as a guide ${headlineGuide} 
    you are to give me only 3 headline no addtional information Just the improved title`,
});

const contentModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You will be given a headline for a blog article you are to generate blog article for that headline`,
});
// Generating prompts
async function generateHeadline(prompt) {
  try {
    const result = await headlineModel.generateContent(prompt);
    return result;
  } catch (error) {
    console.error("Error generating Title:", error);
    throw error;
  }
}

async function generateContent(prompt) {
  try {
    const result = await contentModel.generateContent(prompt);
    return result;
  } catch (error) {
    console.error("Error generating Content:", error);
    throw error;
  }
}

module.exports = { generateHeadline, generateContent };
