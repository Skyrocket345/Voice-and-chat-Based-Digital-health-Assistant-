// Compliance Database
const complianceDatabase = {
  criticalViolations: {
    bannedAdditives: ["BHA", "BHT", "Sodium benzoate (high levels)", "TBHQ", "Propyl gallate"],
    undeclaredAllergens: ["Peanuts", "Tree nuts", "Dairy", "Gluten", "Shellfish", "Fish", "Eggs", "Soy"],
    harmfulPreservatives: ["Sodium nitrite (high levels)", "Potassium sorbate (excess)", "Sodium sulfite"],
    penalty: 15
  },
  highSeverity: {
    commonAllergens: ["Milk", "Eggs", "Fish", "Shellfish", "Wheat", "Soy", "Sesame"],
    controversialAdditives: ["Aspartame", "MSG", "High fructose corn syrup", "Acesulfame potassium"],
    artificialColors: ["Red 40", "Yellow 5", "Blue 1", "Red 3", "Yellow 6", "Blue 2"],
    penalty: 10
  },
  mediumSeverity: {
    preservatives: ["Citric acid", "Potassium sorbate", "Sodium citrate", "Calcium propionate"],
    stabilizers: ["Carrageenan", "Xanthan gum", "Guar gum", "Locust bean gum"],
    emulsifiers: ["Lecithin", "Mono and diglycerides", "Polysorbate 80"],
    penalty: 5
  },
  lowSeverity: {
    artificialFlavors: ["Natural flavors", "Artificial flavors", "Natural identical flavors"],
    naturalColors: ["Caramel color", "Annatto", "Turmeric", "Paprika extract"],
    commonAdditives: ["Baking soda", "Salt", "Sugar", "Corn starch"],
    penalty: 2
  },
  positiveFactors: {
    organicIngredients: {bonus: 5, keywords: ["organic", "certified organic", "USDA organic"]},
    nonGMO: {bonus: 3, keywords: ["non-GMO", "non GMO", "GMO-free", "non-GMO project"]},
    properLabeling: {bonus: 2, keywords: ["contains:", "allergen information", "may contain"]},
    certifications: {bonus: 4, keywords: ["gluten-free", "kosher", "halal", "fair trade"]}
  }
};

const complianceMessages = {
  excellent: "Excellent compliance! This product meets high safety and quality standards.",
  good: "Good compliance with minor concerns. Generally safe for consumption.",
  fair: "Fair compliance. Some ingredients may pose health concerns for sensitive individuals.",
  poor: "Poor compliance. Multiple concerning ingredients detected. Consider alternatives."
};

const alternativeProducts = [
  {name: "Organic Valley Whole Milk", reason: "No artificial additives, organic certification"},
  {name: "Annie's Organic Mac & Cheese", reason: "No artificial colors or preservatives"},
  {name: "Simply Organic Spices", reason: "Certified organic, no artificial additives"}
];

// Global variables
let currentImage = null;
let complianceChart = null;
let analysisResults = null;
let cameraStream = null;

// DOM Elements - Initialize after DOM loads
let imageInput, cameraBtn, imagePreview, previewImg, processBtn;
let ocrSection, ocrLoading, ocrResults, extractedText, analyzeBtn;
let analysisSection, complianceScore, complianceMessage, violationsList, positiveFactors, ingredientsList;
let recommendationsSection, recommendationsList;
let cameraModal, closeCameraModal, cameraVideo, cameraCanvas, captureBtn, cancelCameraBtn;
let saveReportBtn, shareReportBtn, newScanBtn;

// Initialize DOM elements
function initializeElements() {
  imageInput = document.getElementById('imageInput');
  cameraBtn = document.getElementById('cameraBtn');
  imagePreview = document.getElementById('imagePreview');
  previewImg = document.getElementById('previewImg');
  processBtn = document.getElementById('processBtn');
  ocrSection = document.getElementById('ocrSection');
  ocrLoading = document.getElementById('ocrLoading');
  ocrResults = document.getElementById('ocrResults');
  extractedText = document.getElementById('extractedText');
  analyzeBtn = document.getElementById('analyzeBtn');
  analysisSection = document.getElementById('analysisSection');
  complianceScore = document.getElementById('complianceScore');
  complianceMessage = document.getElementById('complianceMessage');
  violationsList = document.getElementById('violationsList');
  positiveFactors = document.getElementById('positiveFactors');
  ingredientsList = document.getElementById('ingredientsList');
  recommendationsSection = document.getElementById('recommendationsSection');
  recommendationsList = document.getElementById('recommendationsList');
  cameraModal = document.getElementById('cameraModal');
  closeCameraModal = document.getElementById('closeCameraModal');
  cameraVideo = document.getElementById('cameraVideo');
  cameraCanvas = document.getElementById('cameraCanvas');
  captureBtn = document.getElementById('captureBtn');
  cancelCameraBtn = document.getElementById('cancelCameraBtn');
  saveReportBtn = document.getElementById('saveReportBtn');
  shareReportBtn = document.getElementById('shareReportBtn');
  newScanBtn = document.getElementById('newScanBtn');
}

// Set up event listeners
function setupEventListeners() {
  if (imageInput) imageInput.addEventListener('change', handleImageUpload);
  if (processBtn) processBtn.addEventListener('click', processImageWithOCR);
  if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeIngredients);
  if (cameraBtn) cameraBtn.addEventListener('click', openCamera);
  if (closeCameraModal) closeCameraModal.addEventListener('click', closeCamera);
  if (cancelCameraBtn) cancelCameraBtn.addEventListener('click', closeCamera);
  if (captureBtn) captureBtn.addEventListener('click', capturePhoto);
  if (saveReportBtn) saveReportBtn.addEventListener('click', saveReport);
  if (shareReportBtn) shareReportBtn.addEventListener('click', shareReport);
  if (newScanBtn) newScanBtn.addEventListener('click', resetApp);
  
  // Click outside modal to close
  if (cameraModal) {
    cameraModal.addEventListener('click', function(e) {
      if (e.target === cameraModal) {
        closeCamera();
      }
    });
  }
  
  // ESC key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cameraModal && !cameraModal.classList.contains('hidden')) {
      closeCamera();
    }
  });
}

// Image Upload Handler
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      currentImage = e.target.result;
      if (previewImg) previewImg.src = currentImage;
      if (imagePreview) imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }
}

// Image upload 
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Please upload a JPG, PNG, or GIF image.');
      event.target.value = ''; // Reset input
      return;
    }
    // Check file size max 3MB
    const maxSizeInBytes = 3 * 1024 * 1024; // 3 MB
    if (file.size > maxSizeInBytes) {
      alert('File size exceeds 3MB. Please upload a smaller image.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      currentImage = e.target.result;
      if (previewImg) previewImg.src = currentImage;
      if (imagePreview) imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }
}


// OCR Processing
async function processImageWithOCR() {
  if (!currentImage) {
    alert('Please select an image first.');
    return;
  }

  if (ocrSection) ocrSection.classList.remove('hidden');
  if (ocrLoading) ocrLoading.classList.remove('hidden');
  if (ocrResults) ocrResults.classList.add('hidden');

  try {
    const { data: { text } } = await Tesseract.recognize(
      currentImage,
      'eng',
      {
        logger: m => console.log(m)
      }
    );

    if (ocrLoading) ocrLoading.classList.add('hidden');
    if (ocrResults) ocrResults.classList.remove('hidden');
    if (extractedText) extractedText.value = text.trim() || 'No text detected. Please enter ingredients manually.';
  } catch (error) {
    console.error('OCR Error:', error);
    if (ocrLoading) ocrLoading.classList.add('hidden');
    if (ocrResults) ocrResults.classList.remove('hidden');
    if (extractedText) extractedText.value = 'OCR processing failed. Please enter ingredients manually.';
  }
}

// Ingredient Analysis
function analyzeIngredients() {
  if (!extractedText) return;
  
  const text = extractedText.value.trim();
  if (!text) {
    alert('Please provide ingredient text to analyze.');
    return;
  }

  // Parse ingredients
  const ingredients = parseIngredients(text);
  
  // Analyze compliance
  analysisResults = analyzeCompliance(ingredients, text);
  
  // Display results
  displayAnalysisResults(analysisResults, ingredients);
  
  if (analysisSection) analysisSection.classList.remove('hidden');
  if (recommendationsSection) recommendationsSection.classList.remove('hidden');
}

function parseIngredients(text) {
  // Clean and normalize text
  const cleanText = text.toLowerCase()
    .replace(/ingredients?:?/gi, '')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Split by common delimiters
  const ingredients = cleanText
    .split(/[,;]/)
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 1)
    .map(ingredient => ingredient.replace(/^\W+|\W+$/g, ''));

  return ingredients;
}

function analyzeCompliance(ingredients, fullText) {
  let score = 100;
  let violations = [];
  let positives = [];
  let ingredientAnalysis = [];

  const normalizedText = fullText.toLowerCase();
  const normalizedIngredients = ingredients.map(ing => ing.toLowerCase());

  // Check for violations
  // Critical violations
  Object.entries(complianceDatabase.criticalViolations).forEach(([key, items]) => {
    if (key !== 'penalty') {
      items.forEach(item => {
        const found = normalizedIngredients.some(ing => 
          ing.includes(item.toLowerCase()) || 
          normalizedText.includes(item.toLowerCase())
        );
        if (found) {
          score -= complianceDatabase.criticalViolations.penalty;
          violations.push({
            item: item,
            category: 'Critical Violation',
            severity: 'critical',
            penalty: complianceDatabase.criticalViolations.penalty
          });
        }
      });
    }
  });

  // High severity
  Object.entries(complianceDatabase.highSeverity).forEach(([key, items]) => {
    if (key !== 'penalty') {
      items.forEach(item => {
        const found = normalizedIngredients.some(ing => 
          ing.includes(item.toLowerCase()) || 
          normalizedText.includes(item.toLowerCase())
        );
        if (found) {
          score -= complianceDatabase.highSeverity.penalty;
          violations.push({
            item: item,
            category: 'High Concern',
            severity: 'high',
            penalty: complianceDatabase.highSeverity.penalty
          });
        }
      });
    }
  });

  // Medium severity
  Object.entries(complianceDatabase.mediumSeverity).forEach(([key, items]) => {
    if (key !== 'penalty') {
      items.forEach(item => {
        const found = normalizedIngredients.some(ing => 
          ing.includes(item.toLowerCase()) || 
          normalizedText.includes(item.toLowerCase())
        );
        if (found) {
          score -= complianceDatabase.mediumSeverity.penalty;
          violations.push({
            item: item,
            category: 'Medium Concern',
            severity: 'medium',
            penalty: complianceDatabase.mediumSeverity.penalty
          });
        }
      });
    }
  });

  // Low severity
  Object.entries(complianceDatabase.lowSeverity).forEach(([key, items]) => {
    if (key !== 'penalty') {
      items.forEach(item => {
        const found = normalizedIngredients.some(ing => 
          ing.includes(item.toLowerCase()) || 
          normalizedText.includes(item.toLowerCase())
        );
        if (found) {
          score -= complianceDatabase.lowSeverity.penalty;
          violations.push({
            item: item,
            category: 'Minor Concern',
            severity: 'low',
            penalty: complianceDatabase.lowSeverity.penalty
          });
        }
      });
    }
  });

  // Check for positive factors
  Object.entries(complianceDatabase.positiveFactors).forEach(([key, data]) => {
    data.keywords.forEach(keyword => {
      if (normalizedText.includes(keyword.toLowerCase())) {
        score += data.bonus;
        positives.push({
          factor: keyword,
          category: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
          bonus: data.bonus
        });
      }
    });
  });

  // Categorize ingredients
  ingredients.forEach(ingredient => {
    let category = 'neutral';
    const ingredientLower = ingredient.toLowerCase();
    
    // Check if ingredient is flagged
    const hasViolation = violations.some(v => 
      ingredientLower.includes(v.item.toLowerCase())
    );
    
    if (hasViolation) {
      const violation = violations.find(v => 
        ingredientLower.includes(v.item.toLowerCase())
      );
      category = violation.severity === 'critical' || violation.severity === 'high' ? 'violation' : 'concern';
    } else {
      // Check if it's a positive ingredient
      const isPositive = Object.values(complianceDatabase.positiveFactors).some(data =>
        data.keywords.some(keyword => ingredientLower.includes(keyword.toLowerCase()))
      );
      category = isPositive ? 'safe' : 'neutral';
    }
    
    ingredientAnalysis.push({
      name: ingredient,
      category: category
    });
  });

  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    violations,
    positives,
    ingredientAnalysis,
    level: getComplianceLevel(score)
  };
}

function getComplianceLevel(score) {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'fair';
  return 'poor';
}

function displayAnalysisResults(results, ingredients) {
  // Update compliance score
  if (complianceScore) {
    complianceScore.textContent = results.score + '%';
    complianceScore.className = `score-number ${results.level}`;
  }
  
  if (complianceMessage) {
    complianceMessage.textContent = complianceMessages[results.level];
    complianceMessage.className = `score-message ${results.level}`;
  }

  // Update violations list
  if (violationsList) {
    violationsList.innerHTML = '';
    if (results.violations.length > 0) {
      results.violations.forEach(violation => {
        const div = document.createElement('div');
        div.className = `violation-item ${violation.severity}`;
        div.innerHTML = `
          <span>${violation.item}</span>
          <span class="penalty-score">-${violation.penalty}</span>
        `;
        violationsList.appendChild(div);
      });
    } else {
      violationsList.innerHTML = '<div class="text-center opacity-70">No violations detected</div>';
    }
  }

  // Update positive factors
  if (positiveFactors) {
    positiveFactors.innerHTML = '';
    if (results.positives.length > 0) {
      results.positives.forEach(positive => {
        const div = document.createElement('div');
        div.className = 'positive-item';
        div.innerHTML = `
          <span>${positive.factor}</span>
          <span class="bonus-score">+${positive.bonus}</span>
        `;
        positiveFactors.appendChild(div);
      });
    } else {
      positiveFactors.innerHTML = '<div class="text-center opacity-70">No positive factors detected</div>';
    }
  }

  // Update ingredients breakdown
  if (ingredientsList) {
    ingredientsList.innerHTML = '';
    results.ingredientAnalysis.forEach(ingredient => {
      const span = document.createElement('span');
      span.className = `ingredient-tag ${ingredient.category}`;
      span.textContent = ingredient.name;
      ingredientsList.appendChild(span);
    });
  }

  // Create pie chart
  createComplianceChart(results.score);

  // Update recommendations
  updateRecommendations(results.level);
}

function createComplianceChart(score) {
  const chartCanvas = document.getElementById('complianceChart');
  if (!chartCanvas) return;
  
  const ctx = chartCanvas.getContext('2d');
  
  if (complianceChart) {
    complianceChart.destroy();
  }

  const compliantScore = score;
  const nonCompliantScore = 100 - score;

  complianceChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Compliant', 'Non-Compliant'],
      datasets: [{
        data: [compliantScore, nonCompliantScore],
        backgroundColor: ['#1FB8CD', '#FFC185'],
        borderColor: ['#218295', '#E6A16A'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
}

function updateRecommendations(level) {
  if (!recommendationsList) return;
  
  recommendationsList.innerHTML = '';
  
  if (level === 'poor' || level === 'fair') {
    alternativeProducts.forEach(product => {
      const div = document.createElement('div');
      div.className = 'recommendation-item';
      div.innerHTML = `
        <h4>🌟 ${product.name}</h4>
        <p>${product.reason}</p>
      `;
      recommendationsList.appendChild(div);
    });
  } else {
    const div = document.createElement('div');
    div.className = 'recommendation-item';
    div.innerHTML = `
      <h4>✅ Great Choice!</h4>
      <p>This product meets high compliance standards. Continue making informed choices like this!</p>
    `;
    recommendationsList.appendChild(div);
  }
}

// Action Button Handlers
function saveReport() {
  if (!analysisResults) {
    alert('No analysis results to save.');
    return;
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    score: analysisResults.score,
    level: analysisResults.level,
    violations: analysisResults.violations,
    positives: analysisResults.positives,
    ingredients: analysisResults.ingredientAnalysis
  };
  
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `compliance-report-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function shareReport() {
  if (!analysisResults) {
    alert('No analysis results to share.');
    return;
  }
  
  const shareText = `Product Compliance Report
Score: ${analysisResults.score}%
Level: ${analysisResults.level.toUpperCase()}
Violations: ${analysisResults.violations.length}
Generated by Product Compliance Checker`;

  if (navigator.share) {
    navigator.share({
      title: 'Product Compliance Report',
      text: shareText,
      url: window.location.href
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Report copied to clipboard!');
    }).catch(() => {
      alert('Unable to share. Please copy the results manually.');
    });
  }
}

function resetApp() {
  // Reset all sections
  if (imagePreview) imagePreview.classList.add('hidden');
  if (ocrSection) ocrSection.classList.add('hidden');
  if (analysisSection) analysisSection.classList.add('hidden');
  if (recommendationsSection) recommendationsSection.classList.add('hidden');
  
  // Reset form inputs
  if (imageInput) imageInput.value = '';
  if (extractedText) extractedText.value = '';
  
  // Reset variables
  currentImage = null;
  analysisResults = null;
  
  // Destroy chart if exists
  if (complianceChart) {
    complianceChart.destroy();
    complianceChart = null;
  }
  
  // Close camera if open
  closeCamera();
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('Product Compliance Checker initialized');
  initializeElements();
  setupEventListeners();
  
  // Ensure modal is hidden on load
  if (cameraModal) {
    cameraModal.classList.add('hidden');
  }
});