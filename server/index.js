const express = require('express');
const cors = require('cors');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/learntrick'); // 'learntrick' is the database name
  console.log('Connected to database');
}

// Middleware setup
server.use(bodyParser.json());
server.use(cors());

let allQuestionsCache = []; // Cache for storing questions temporarily
let submissionCache = {}; // Cache for storing submission data temporarily

// POST endpoint to fetch questions
server.post('/fetch', async function (req, res) {
  const topics = req.body.topic; // Array of topic names
  const totalQuestions = req.body.numberOfQuestions; // Total number of questions requested

  // Validate input
  if (!Array.isArray(topics) || topics.length === 0) {
    return res.status(400).json({ message: 'Invalid topics array' });
  }
  
  if (totalQuestions < topics.length) {
    return res.status(400).json({ message: 'Total questions requested must be at least equal to the number of topics' });
  }

  const questionsPerTopic = Math.floor(totalQuestions / topics.length); // Divide total by number of topics

  try {
    const allQuestions = [];
    for (const topic of topics) {
      try {
        const collection = mongoose.connection.collection(topic);
        // Fetch random questions from the collection
        const questions = await collection.aggregate([
          { $sample: { size: questionsPerTopic } } // Get random questions
        ]).toArray();

        allQuestions.push(...questions); // Add to main questions array
      } catch (error) {
        console.error(`Error fetching questions from topic ${topic}:`, error);
      }
    }

    allQuestionsCache = allQuestions; // Store in cache for GET route
    res.json({ totalQuestions: allQuestions.length, questions: allQuestions });

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions', error });
  }
});

// GET endpoint to retrieve cached questions
server.get('/fetch', function (req, res) {
  if (allQuestionsCache.length === 0) {
    return res.status(404).json({ message: 'No cached questions available. Please use POST /fetch first.' });
  }
  res.json({ totalQuestions: allQuestionsCache.length, questions: allQuestionsCache });
});

// POST endpoint to submit answers and calculate score
server.post('/submit', function (req, res) {
  const answers = req.body.answers; // Array of correct answers
  const selectedOption = req.body.selectedOption; // User's selected options
  const questions = req.body.questions; // Array of questions
  const tabSwitchCount = req.body.tabSwitchCount; // Number of tab switches

  // Calculate score
  const score = Object.keys(selectedOption).reduce((acc, key) => {
    return selectedOption[key] === answers[key] ? acc + 1 : acc;
  }, 0);

  const finalScore = score * 5 - tabSwitchCount * 5;

  // Store submission data in cache for retrieval in GET /submit
  submissionCache = {
    finalScore,
    score,
    tabSwitchCount,
    questions,
    answers,
    selectedOption,
  };
  res.json({ finalScore, tabSwitchCount });
});

// GET endpoint to retrieve submission result
server.get('/submit', function (req, res) {
  
  res.json(submissionCache);
});

// Start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
