const axios = require("axios");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const contentGuide = require("./geminiguides");
const headlineGuide = require("./geminiguides");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const enhanceHeadlineModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You will be given a Headline for a blog article and you are to improve the headline, using the 
  following information as a guide ${headlineGuide} 
    you are to give me only one headline no addtional information Just the improved title`,
});
const generateHeadlineModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You will be given a blog article and you are to generate a headline for it, using the 
  following information as a guide ${headlineGuide} 
    you are to give me only one headline no addtional information Just the improved title`,
});

const enhanceContentModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You will be given a blog article you are to improve the blog article 
  using the following as guide to improve the blog post ${contentGuide}`,
});

const generateContentModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You will be given a blog Title and you are to generate a blog article for that title, 
    and make sure you use the guide I am about to give you this is the Guide:"${contentGuide}"  `,
});
const generateKeywordsModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You will be given a blog Title or a blog content and you are to generate a bunch of keywords for them and 
  group them into 10 short keywords and 10 longtail keywords only`,
});
// Generating prompts
async function enhanceHeadline(title) {
  try {
    const result = await enhanceHeadlineModel.generateContent(title);
    return result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating Title:", error);
    throw error;
  }
}
async function generateHeadline(prompt) {
  try {
    const result = await generateHeadlineModel.generateContent(prompt);
    return result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating Title:", error);
    throw error;
  }
}
async function enhanceContent(prompt) {
  try {
    const result = await enhanceContentModel.generateContent(prompt);
    return result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating Title:", error);
    throw error;
  }
}

async function generateContent(prompt) {
  try {
    const result = await generateContentModel.generateContent(prompt);
    return result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating Content:", error);
    throw error;
  }
}
async function generatekeywords(prompt) {
  try {
    const result = await generateKeywordsModel.generateContent(prompt);
    return result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating Content:", error);
    throw error;
  }
}

module.exports = {
  enhanceHeadline,
  generateContent,
  enhanceContent,
  generateHeadline,
  generatekeywords,
};
