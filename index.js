const fs = require('fs');

function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
}

function analyzeMatch(resumeText, jobText) {
  const resumeWords = new Set(extractKeywords(resumeText));
  const jobWords = new Set(extractKeywords(jobText));
  let matchCount = 0;
  jobWords.forEach(word => {
    if (resumeWords.has(word)) matchCount++;
  });
  const score = ((matchCount / jobWords.size) * 100).toFixed(2);
  console.log(`Match Score: ${score}%`);
}

const resumePath = process.argv[2];
const jobPath = process.argv[3];

if (!resumePath || !jobPath) {
  console.log("Usage: node match.js resume.txt job.txt");
  process.exit();
}

const resumeText = fs.readFileSync(resumePath, 'utf8');
const jobText = fs.readFileSync(jobPath, 'utf8');
analyzeMatch(resumeText, jobText);
