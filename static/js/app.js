/**
 * MedIntel AI - Frontend Application (Standalone Version)
 * AI-Powered Health Intelligence Platform
 */

// =============================================================================
// Medical Knowledge Base (Embedded)
// =============================================================================

const MedicalKnowledgeBase = {
    conditions: [
        {
            id: "heart_attack",
            name: "Heart Attack",
            symptoms: ["chest pain", "chest tightness", "sweating", "nausea", "shortness of breath", "arm pain", "jaw pain"],
            weights: {"chest pain": 10, "chest tightness": 10, "sweating": 7, "nausea": 6, "shortness of breath": 8, "arm pain": 8, "jaw pain": 7},
            risk_factors: ["age", "smoking", "diabetes", "hypertension", "family history"],
            emergency: true,
            severity: "critical",
            prevention: ["Regular exercise", "Healthy diet", "Quit smoking", "Manage stress", "Regular checkups"],
            recommendations: ["Call emergency services immediately", "Chew aspirin if available", "Rest in comfortable position", "Do not drive yourself"]
        },
        {
            id: "stroke",
            name: "Stroke",
            symptoms: ["sudden headache", "confusion", "trouble speaking", "numbness", "weakness", "vision problems", "dizziness", "loss of balance"],
            weights: {"sudden headache": 9, "confusion": 9, "trouble speaking": 10, "numbness": 8, "weakness": 8, "vision problems": 7, "dizziness": 6, "loss of balance": 7},
            risk_factors: ["age", "hypertension", "diabetes", "smoking", "heart disease"],
            emergency: true,
            severity: "critical",
            prevention: ["Control blood pressure", "Maintain healthy weight", "Exercise regularly", "Limit alcohol", "Manage diabetes"],
            recommendations: ["Call emergency services immediately", "Note the time symptoms started", "Do not give food or water", "Stay calm and rest"]
        },
        {
            id: "migraine",
            name: "Migraine",
            symptoms: ["severe headache", "throbbing pain", "sensitivity to light", "sensitivity to sound", "nausea", "vomiting", "aura"],
            weights: {"severe headache": 9, "throbbing pain": 8, "sensitivity to light": 7, "sensitivity to sound": 6, "nausea": 6, "vomiting": 5, "aura": 8},
            risk_factors: ["family history", "hormonal changes", "stress", "certain foods"],
            emergency: false,
            severity: "moderate",
            prevention: ["Identify triggers", "Regular sleep schedule", "Stay hydrated", "Manage stress", "Limit caffeine"],
            recommendations: ["Rest in dark quiet room", "Apply cold compress", "Take prescribed medication", "Stay hydrated"]
        },
        {
            id: "anxiety_attack",
            name: "Anxiety Attack",
            symptoms: ["rapid heartbeat", "sweating", "trembling", "shortness of breath", "chest tightness", "dizziness", "fear", "nausea"],
            weights: {"rapid heartbeat": 8, "sweating": 6, "trembling": 7, "shortness of breath": 7, "chest tightness": 6, "dizziness": 5, "fear": 8, "nausea": 4},
            risk_factors: ["stress", "trauma", "genetics", "substance use"],
            emergency: false,
            severity: "moderate",
            prevention: ["Regular exercise", "Meditation", "Adequate sleep", "Limit caffeine", "Therapy"],
            recommendations: ["Practice deep breathing", "Use grounding techniques", "Remove yourself from triggers", "Seek professional help if recurrent"]
        },
        {
            id: "common_cold",
            name: "Common Cold",
            symptoms: ["runny nose", "sneezing", "cough", "sore throat", "mild fever", "congestion", "fatigue"],
            weights: {"runny nose": 7, "sneezing": 6, "cough": 6, "sore throat": 5, "mild fever": 4, "congestion": 6, "fatigue": 5},
            risk_factors: ["season", "exposure to sick people", "weakened immune system"],
            emergency: false,
            severity: "low",
            prevention: ["Wash hands frequently", "Avoid touching face", "Stay away from sick people", "Boost immune system"],
            recommendations: ["Rest and hydrate", "Over-the-counter cold medicine", "Warm salt water gargle", "Use humidifier"]
        },
        {
            id: "influenza",
            name: "Influenza (Flu)",
            symptoms: ["fever", "chills", "body aches", "fatigue", "cough", "sore throat", "headache", "congestion"],
            weights: {"fever": 8, "chills": 7, "body aches": 8, "fatigue": 7, "cough": 6, "sore throat": 5, "headache": 6, "congestion": 5},
            risk_factors: ["season", "no vaccination", "age", "chronic conditions"],
            emergency: false,
            severity: "moderate",
            prevention: ["Annual flu vaccine", "Wash hands frequently", "Avoid close contact", "Stay home when sick"],
            recommendations: ["Rest and hydrate", "Take antiviral medication if prescribed", "Use fever reducers", "Seek care if symptoms worsen"]
        },
        {
            id: "food_poisoning",
            name: "Food Poisoning",
            symptoms: ["nausea", "vomiting", "diarrhea", "stomach cramps", "fever", "weakness", "dehydration"],
            weights: {"nausea": 7, "vomiting": 8, "diarrhea": 8, "stomach cramps": 7, "fever": 5, "weakness": 6, "dehydration": 9},
            risk_factors: ["contaminated food", "improper food handling", "travel", "weakened immune system"],
            emergency: false,
            severity: "moderate",
            prevention: ["Proper food handling", "Cook food thoroughly", "Refrigerate promptly", "Wash hands before eating"],
            recommendations: ["Stay hydrated", "Rest", "Eat bland foods when able", "Seek care if severe dehydration"]
        },
        {
            id: "appendicitis",
            name: "Appendicitis",
            symptoms: ["abdominal pain", "nausea", "vomiting", "fever", "loss of appetite", "swelling", "tenderness"],
            weights: {"abdominal pain": 10, "nausea": 6, "vomiting": 6, "fever": 5, "loss of appetite": 5, "swelling": 7, "tenderness": 8},
            risk_factors: ["age", "family history", "male gender"],
            emergency: true,
            severity: "critical",
            prevention: ["High fiber diet", "Maintain healthy weight"],
            recommendations: ["Seek immediate medical attention", "Do not eat or drink", "Do not take laxatives", "Surgery may be required"]
        },
        {
            id: "pneumonia",
            name: "Pneumonia",
            symptoms: ["cough", "fever", "chills", "shortness of breath", "chest pain", "fatigue", "sweating", "confusion"],
            weights: {"cough": 7, "fever": 8, "chills": 7, "shortness of breath": 9, "chest pain": 7, "fatigue": 6, "sweating": 5, "confusion": 8},
            risk_factors: ["age", "chronic conditions", "weakened immune system", "smoking"],
            emergency: false,
            severity: "high",
            prevention: ["Vaccination", "Hand hygiene", "Don't smoke", "Healthy lifestyle"],
            recommendations: ["See doctor promptly", "Take prescribed antibiotics", "Rest and hydrate", "Monitor symptoms closely"]
        },
        {
            id: "diabetes_type2",
            name: "Type 2 Diabetes",
            symptoms: ["increased thirst", "frequent urination", "fatigue", "blurred vision", "slow healing", "numbness", "weight loss"],
            weights: {"increased thirst": 8, "frequent urination": 8, "fatigue": 6, "blurred vision": 7, "slow healing": 6, "numbness": 7, "weight loss": 6},
            risk_factors: ["obesity", "family history", "age", "sedentary lifestyle", "poor diet"],
            emergency: false,
            severity: "high",
            prevention: ["Healthy diet", "Regular exercise", "Maintain healthy weight", "Regular screening"],
            recommendations: ["See doctor for testing", "Monitor blood sugar", "Lifestyle modifications", "Medication if prescribed"]
        },
        {
            id: "hypertension",
            name: "Hypertension (High Blood Pressure)",
            symptoms: ["headache", "dizziness", "chest pain", "shortness of breath", "nosebleeds", "flushing", "vision changes"],
            weights: {"headache": 6, "dizziness": 6, "chest pain": 8, "shortness of breath": 7, "nosebleeds": 5, "flushing": 4, "vision changes": 7},
            risk_factors: ["age", "family history", "obesity", "sedentary lifestyle", "high sodium diet", "stress"],
            emergency: false,
            severity: "high",
            prevention: ["Reduce sodium intake", "Exercise regularly", "Maintain healthy weight", "Limit alcohol", "Manage stress"],
            recommendations: ["Regular blood pressure monitoring", "Take prescribed medication", "Lifestyle changes", "Regular doctor visits"]
        },
        {
            id: "allergic_reaction",
            name: "Allergic Reaction",
            symptoms: ["sneezing", "itchy eyes", "runny nose", "watery eyes", "congestion", "skin rash", "swelling", "difficulty breathing"],
            weights: {"sneezing": 6, "itchy eyes": 7, "runny nose": 5, "watery eyes": 6, "congestion": 5, "skin rash": 7, "swelling": 8, "difficulty breathing": 10},
            risk_factors: ["family history", "exposure to allergens", "seasonal factors"],
            emergency: true,
            severity: "critical",
            prevention: ["Avoid known allergens", "Use air purifiers", "Keep windows closed during high pollen", "Read food labels carefully"],
            recommendations: ["Use antihistamines", "Seek emergency care if breathing difficulty", "Use epinephrine if prescribed", "Identify and avoid triggers"]
        },
        {
            id: "gastroenteritis",
            name: "Gastroenteritis",
            symptoms: ["diarrhea", "nausea", "vomiting", "stomach cramps", "fever", "headache", "muscle aches", "dehydration"],
            weights: {"diarrhea": 8, "nausea": 7, "vomiting": 7, "stomach cramps": 7, "fever": 5, "headache": 4, "muscle aches": 4, "dehydration": 9},
            risk_factors: ["contaminated food/water", "close contact with infected person", "weakened immune system"],
            emergency: false,
            severity: "moderate",
            prevention: ["Hand washing", "Safe food preparation", "Drink clean water", "Avoid sick contacts"],
            recommendations: ["Stay hydrated with electrolytes", "Rest", "Eat bland foods", "Seek care if severe symptoms"]
        },
        {
            id: "urinary_tract_infection",
            name: "Urinary Tract Infection",
            symptoms: ["burning urination", "frequent urination", "urgent urination", "cloudy urine", "blood in urine", "pelvic pain", "fever"],
            weights: {"burning urination": 10, "frequent urination": 8, "urgent urination": 7, "cloudy urine": 6, "blood in urine": 8, "pelvic pain": 6, "fever": 5},
            risk_factors: ["female anatomy", "sexual activity", "menopause", "urinary tract abnormalities"],
            emergency: false,
            severity: "moderate",
            prevention: ["Drink plenty of water", "Wipe front to back", "Urinate after intercourse", "Avoid irritating feminine products"],
            recommendations: ["See doctor for antibiotics", "Drink cranberry juice", "Stay hydrated", "Complete full antibiotic course"]
        },
        {
            id: "asthma_attack",
            name: "Asthma Attack",
            symptoms: ["shortness of breath", "chest tightness", "wheezing", "coughing", "rapid breathing", "anxiety", "sweating"],
            weights: {"shortness of breath": 10, "chest tightness": 9, "wheezing": 9, "coughing": 6, "rapid breathing": 8, "anxiety": 5, "sweating": 4},
            risk_factors: ["allergies", "respiratory infections", "exercise", "cold air", "stress"],
            emergency: true,
            severity: "critical",
            prevention: ["Avoid triggers", "Take controller medications", "Use inhaler before exercise", "Get flu vaccine"],
            recommendations: ["Use rescue inhaler immediately", "Sit upright", "Try to stay calm", "Call emergency if no relief"]
        }
    ],
    
    symptomSynonyms: {
        "chest pain": ["chest pain", "chest ache", "chest discomfort", "tight chest", "chest pressure", "chest tightness"],
        "sweating": ["sweating", "sweaty", "perspiration", "clammy"],
        "shortness of breath": ["shortness of breath", "breathless", "difficulty breathing", "can't breathe", "cannot breathe", "labored breathing"],
        "nausea": ["nausea", "nauseous", "feel sick", "queasy", "upset stomach"],
        "vomiting": ["vomiting", "throwing up", "puking", "vomit"],
        "headache": ["headache", "head pain", "head ache"],
        "severe headache": ["severe headache", "intense headache", "bad headache", "throbbing headache", "migraine"],
        "fever": ["fever", "high temperature", "feverish", "running a fever"],
        "fatigue": ["fatigue", "tired", "exhausted", "weak", "no energy", "lethargic"],
        "dizziness": ["dizziness", "dizzy", "lightheaded", "vertigo"],
        "abdominal pain": ["abdominal pain", "stomach pain", "belly pain", "tummy ache", "stomach ache"],
        "diarrhea": ["diarrhea", "loose stool", "watery stool", "runs"],
        "cough": ["cough", "coughing", "hacking"],
        "sore throat": ["sore throat", "throat pain", "scratchy throat", "painful throat"],
        "runny nose": ["runny nose", "runny nostril", "nasal discharge"],
        "congestion": ["congestion", "stuffy nose", "nasal congestion", "blocked nose"],
        "rapid heartbeat": ["rapid heartbeat", "racing heart", "heart palpitations", "fast heartbeat"],
        "trembling": ["trembling", "shaking", "shivering", "tremors"],
        "numbness": ["numbness", "numb", "tingling", "pins and needles"],
        "confusion": ["confusion", "confused", "disoriented", "mental fog"],
        "vision problems": ["vision problems", "blurred vision", "double vision", "can't see", "cannot see", "vision changes"],
        "loss of balance": ["loss of balance", "unsteady", "balance problems", "falling"],
        "swelling": ["swelling", "swollen", "inflamed", "puffy"],
        "skin rash": ["skin rash", "rash", "hives", "skin irritation"],
        "itchy eyes": ["itchy eyes", "eye itching", "irritated eyes"],
        "burning urination": ["burning urination", "burning when peeing", "painful urination", "pee burns"],
        "frequent urination": ["frequent urination", "peeing often", "urinating frequently"],
        "wheezing": ["wheezing", "wheeze", "whistling sound when breathing"],
        "chills": ["chills", "shivering", "feeling cold", "rigors"],
        "body aches": ["body aches", "muscle pain", "body pain", "aching muscles"],
        "trouble speaking": ["trouble speaking", "slurred speech", "can't speak", "difficulty speaking"],
        "weakness": ["weakness", "weak", "loss of strength"],
        "sensitivity to light": ["sensitivity to light", "light sensitivity", "photophobia"],
        "sensitivity to sound": ["sensitivity to sound", "sound sensitivity", "phonophobia"],
        "throbbing pain": ["throbbing pain", "pulsating pain", "pounding pain"],
        "aura": ["aura", "visual aura", "seeing spots", "flashing lights"],
        "fear": ["fear", "panic", "feeling of doom", "impending doom"],
        "mild fever": ["mild fever", "low grade fever", "slight fever"],
        "chills": ["chills", "shivering", "feeling cold"],
        "body aches": ["body aches", "muscle aches", "body pain"],
        "stomach cramps": ["stomach cramps", "abdominal cramps", "cramping"],
        "dehydration": ["dehydration", "dry mouth", "thirsty", "dark urine"],
        "loss of appetite": ["loss of appetite", "not hungry", "decreased appetite"],
        "tenderness": ["tenderness", "pain when touched", "sore to touch"],
        "increased thirst": ["increased thirst", "very thirsty", "always thirsty"],
        "blurred vision": ["blurred vision", "blurry vision", "fuzzy vision"],
        "slow healing": ["slow healing", "wounds not healing", "delayed healing"],
        "weight loss": ["weight loss", "losing weight", "unexplained weight loss"],
        "nosebleeds": ["nosebleeds", "nose bleeding", "bloody nose"],
        "flushing": ["flushing", "red face", "hot flashes"],
        "watery eyes": ["watery eyes", "tearing", "eyes watering"],
        "difficulty breathing": ["difficulty breathing", "trouble breathing", "can't breathe", "cannot breathe"],
        "urgent urination": ["urgent urination", "urgency to pee", "can't hold urine"],
        "cloudy urine": ["cloudy urine", "murky urine", "foul smelling urine"],
        "blood in urine": ["blood in urine", "bloody urine", "peeing blood"],
        "pelvic pain": ["pelvic pain", "pelvic discomfort", "lower abdominal pain"],
        "wheezing": ["wheezing", "wheeze", "whistling breathing"],
        "rapid breathing": ["rapid breathing", "fast breathing", "breathing quickly"],
        "anxiety": ["anxiety", "anxious", "nervous", "worried"]
    },

    emergencyKeywords: {
        critical: ['cant breathe', 'cannot breathe', 'stop breathing', 'unconscious', 'not breathing', 'chest pain', 'heart attack', 'stroke', 'severe bleeding', 'choking', 'anaphylaxis', 'allergic reaction', 'suicide', 'kill myself'],
        urgent: ['severe pain', 'intense pain', 'extreme pain', 'high fever', 'cant move', 'cannot move', 'paralyzed', 'seizure', 'convulsion']
    },

    stopWords: new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'i', 'my', 'me', 'have', 'has', 'had', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'this', 'that', 'these', 'those', 'very', 'so', 'just', 'now', 'then', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'than', 'too', 'can', 'will', 'don', 'should', 'what', 'which', 'who', 'whom', 'whose', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves'])
};

// =============================================================================
// Analysis Engine
// =============================================================================

const AnalysisEngine = {
    processSymptoms(userInput) {
        const text = userInput.toLowerCase();
        const tokens = text.match(/\b\w+\b/g) || [];
        const filteredTokens = tokens.filter(t => !MedicalKnowledgeBase.stopWords.has(t));
        
        const emergencyLevel = this.detectEmergency(text);
        const extractedSymptoms = this.extractSymptoms(text);
        
        return {
            original_input: userInput,
            processed_tokens: filteredTokens,
            extracted_symptoms: extractedSymptoms,
            emergency_level: emergencyLevel,
            symptom_count: extractedSymptoms.length
        };
    },

    detectEmergency(text) {
        for (const keyword of MedicalKnowledgeBase.emergencyKeywords.critical) {
            if (text.includes(keyword)) return 'critical';
        }
        for (const keyword of MedicalKnowledgeBase.emergencyKeywords.urgent) {
            if (text.includes(keyword)) return 'urgent';
        }
        return 'none';
    },

    extractSymptoms(text) {
        const extracted = [];
        for (const [canonical, synonyms] of Object.entries(MedicalKnowledgeBase.symptomSynonyms)) {
            for (const synonym of synonyms) {
                if (text.includes(synonym)) {
                    if (!extracted.includes(canonical)) {
                        extracted.push(canonical);
                    }
                    break;
                }
            }
        }
        return extracted;
    },

    calculateRisk(symptoms) {
        const results = [];
        
        for (const condition of MedicalKnowledgeBase.conditions) {
            const scoreData = this.calculateConditionScore(symptoms, condition);
            if (scoreData.match_count > 0) {
                results.push(scoreData);
            }
        }
        
        results.sort((a, b) => b.score - a.score);
        return results;
    },

    calculateConditionScore(symptoms, condition) {
        const conditionSymptoms = condition.symptoms;
        const weights = condition.weights;
        
        let totalWeight = 0;
        let matchedWeight = 0;
        const matchedSymptoms = [];
        const unmatchedSymptoms = [];
        
        for (const symptom of conditionSymptoms) {
            const weight = weights[symptom] || 5;
            totalWeight += weight;
            
            if (symptoms.includes(symptom)) {
                matchedWeight += weight;
                matchedSymptoms.push(symptom);
            } else {
                unmatchedSymptoms.push(symptom);
            }
        }
        
        let rawScore = totalWeight > 0 ? (matchedWeight / totalWeight) * 100 : 0;
        
        const matchCount = matchedSymptoms.length;
        if (matchCount >= 4) {
            rawScore = Math.min(rawScore * 1.15, 100);
        } else if (matchCount >= 2) {
            rawScore = Math.min(rawScore * 1.05, 100);
        }
        
        const finalScore = Math.round(rawScore);
        const severity = this.getSeverityLevel(finalScore);
        
        return {
            condition_id: condition.id,
            condition_name: condition.name,
            score: finalScore,
            severity: severity,
            match_count: matchCount,
            total_symptoms: conditionSymptoms.length,
            matched_symptoms: matchedSymptoms,
            unmatched_symptoms: unmatchedSymptoms,
            is_emergency: condition.emergency,
            condition_severity: condition.severity,
            prevention: condition.prevention,
            recommendations: condition.recommendations
        };
    },

    getSeverityLevel(score) {
        if (score <= 25) return 'low';
        if (score <= 50) return 'moderate';
        if (score <= 75) return 'high';
        return 'critical';
    },

    generateInsight(processedInput, riskResults, emergencyLevel) {
        if (!riskResults || riskResults.length === 0) {
            return this.generateNoMatchInsight();
        }
        
        const topCondition = riskResults[0];
        
        return {
            summary: this.generateSummary(topCondition, emergencyLevel),
            risk_explanation: this.generateRiskExplanation(topCondition),
            preventive_guidance: topCondition.prevention ? {
                title: `Prevention Tips for ${topCondition.condition_name}`,
                tips: topCondition.prevention
            } : null,
            next_steps: this.generateNextSteps(topCondition, emergencyLevel),
            safety_note: this.generateSafetyNote(emergencyLevel),
            additional_considerations: riskResults.slice(1, 4).map(c => ({
                name: c.condition_name,
                score: c.score,
                severity: c.severity
            }))
        };
    },

    generateSummary(topCondition, emergencyLevel) {
        const conditionName = topCondition.condition_name;
        const score = topCondition.score;
        
        if (emergencyLevel === 'critical') {
            return "Your symptoms indicate a potentially life-threatening condition that requires immediate medical attention.";
        } else if (emergencyLevel === 'urgent') {
            return "Your symptoms suggest a serious condition that should be evaluated by a medical professional as soon as possible.";
        } else if (score >= 70) {
            return `Your symptoms show a strong match with ${conditionName}. Medical evaluation is recommended.`;
        } else if (score >= 40) {
            return `Your symptoms show a moderate match with ${conditionName}. Consider consulting a healthcare provider.`;
        } else {
            return "Your symptoms show a mild match with several conditions. Monitor your symptoms and consult a doctor if they persist or worsen.";
        }
    },

    generateRiskExplanation(condition) {
        const score = condition.score;
        const matched = condition.matched_symptoms.length;
        const total = condition.total_symptoms;
        
        let explanation = `Based on your reported symptoms, our analysis found ${matched} out of ${total} typical symptoms for ${condition.condition_name}. `;
        explanation += `The risk score of ${score}% indicates a ${condition.severity} level of concern.`;
        
        if (condition.matched_symptoms.length > 0) {
            explanation += ` Matching symptoms include: ${condition.matched_symptoms.join(', ')}.`;
        }
        
        return explanation;
    },

    generateNextSteps(condition, emergencyLevel) {
        const steps = [];
        
        if (emergencyLevel === 'critical' || condition.is_emergency) {
            steps.push("Call emergency services (911) immediately");
            steps.push("Do not drive yourself to the hospital");
            steps.push("Have someone stay with you");
            steps.push("Follow any emergency instructions given");
        } else if (condition.score >= 60) {
            steps.push("Schedule an appointment with your doctor within 24-48 hours");
            steps.push("Monitor your symptoms closely");
            steps.push("Rest and avoid strenuous activities");
            steps.push("Keep a symptom diary");
            steps.push(...condition.recommendations.slice(0, 2));
        } else {
            steps.push("Monitor your symptoms for the next few days");
            steps.push("Get plenty of rest and stay hydrated");
            steps.push("Consider over-the-counter remedies if appropriate");
            steps.push("Consult a doctor if symptoms worsen or persist");
        }
        
        return steps;
    },

    generateSafetyNote(emergencyLevel) {
        const notes = [
            "This analysis is for educational purposes only and does not constitute medical advice.",
            "Always consult with a qualified healthcare professional for proper diagnosis and treatment.",
            "If you are experiencing severe symptoms or believe you have a medical emergency, call 911 immediately."
        ];
        
        if (emergencyLevel === 'critical') {
            notes.unshift("WARNING: Your symptoms may indicate a life-threatening emergency.");
        }
        
        return notes;
    },

    generateNoMatchInsight() {
        return {
            summary: "We couldn't find a strong match for your symptoms in our database.",
            risk_explanation: "Your symptoms may be non-specific or could indicate a condition not covered in our knowledge base.",
            preventive_guidance: null,
            next_steps: [
                "Monitor your symptoms",
                "Stay hydrated and get rest",
                "Consult a healthcare professional if symptoms persist",
                "Consider keeping a symptom diary"
            ],
            safety_note: [
                "This tool provides educational information only.",
                "When in doubt, always consult a medical professional."
            ],
            additional_considerations: []
        };
    },

    analyze(symptoms) {
        const processed = this.processSymptoms(symptoms);
        const riskResults = this.calculateRisk(processed.extracted_symptoms);
        const insight = this.generateInsight(processed, riskResults, processed.emergency_level);
        
        return {
            success: true,
            timestamp: new Date().toISOString(),
            input_analysis: {
                extracted_symptoms: processed.extracted_symptoms,
                symptom_count: processed.symptom_count,
                emergency_detected: processed.emergency_level !== 'none',
                emergency_level: processed.emergency_level
            },
            risk_assessment: riskResults.slice(0, 5),
            insight: insight,
            disclaimer: "This analysis is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional."
        };
    }
};

// =============================================================================
// State Management
// =============================================================================

const AppState = {
    theme: localStorage.getItem('medintel-theme') || 'light',
    history: JSON.parse(localStorage.getItem('medintel-history') || '[]'),
    bookmarks: JSON.parse(localStorage.getItem('medintel-bookmarks') || '[]'),
    currentAnalysis: null,
    isAnalyzing: false
};

// =============================================================================
// DOM Elements
// =============================================================================

const Elements = {
    themeToggle: document.getElementById('themeToggle'),
    themeTransition: document.querySelector('.theme-transition'),
    symptomInput: document.getElementById('symptomInput'),
    charCount: document.getElementById('charCount'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    loadingSection: document.getElementById('loadingSection'),
    loadingSteps: document.querySelectorAll('.step'),
    resultsSection: document.getElementById('resultsSection'),
    emergencyAlert: document.getElementById('emergencyAlert'),
    insightContent: document.getElementById('insightContent'),
    riskConditions: document.getElementById('riskConditions'),
    symptomsList: document.getElementById('symptomsList'),
    emptyState: document.getElementById('emptyState'),
    historyModal: document.getElementById('historyModal'),
    bookmarkModal: document.getElementById('bookmarkModal'),
    disclaimerModal: document.getElementById('disclaimerModal'),
    historyBtn: document.getElementById('historyBtn'),
    bookmarkBtn: document.getElementById('bookmarkBtn'),
    closeHistory: document.getElementById('closeHistory'),
    closeBookmarks: document.getElementById('closeBookmarks'),
    closeDisclaimer: document.getElementById('closeDisclaimer'),
    clearHistory: document.getElementById('clearHistory'),
    acceptDisclaimer: document.getElementById('acceptDisclaimer'),
    disclaimerLink: document.getElementById('disclaimerLink'),
    termsLink: document.getElementById('termsLink'),
    historyList: document.getElementById('historyList'),
    bookmarkList: document.getElementById('bookmarkList'),
    toastContainer: document.getElementById('toastContainer')
};

// =============================================================================
// Theme Management
// =============================================================================

function initTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    Elements.themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const newTheme = AppState.theme === 'light' ? 'dark' : 'light';
    
    Elements.themeTransition.classList.add('active');
    
    setTimeout(() => {
        AppState.theme = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('medintel-theme', newTheme);
        
        setTimeout(() => {
            Elements.themeTransition.classList.remove('active');
        }, 100);
    }, 400);
}

// =============================================================================
// Input Management
// =============================================================================

function initInput() {
    Elements.symptomInput.addEventListener('input', handleInput);
    Elements.symptomInput.addEventListener('keydown', handleKeydown);
    Elements.analyzeBtn.addEventListener('click', startAnalysis);
    updateCharCount();
}

function handleInput() {
    updateCharCount();
}

function updateCharCount() {
    const count = Elements.symptomInput.value.length;
    Elements.charCount.textContent = count;
    
    if (count >= 450) {
        Elements.charCount.style.color = 'var(--danger)';
    } else if (count >= 400) {
        Elements.charCount.style.color = 'var(--warning)';
    } else {
        Elements.charCount.style.color = 'var(--text-muted)';
    }
}

function handleKeydown(e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        startAnalysis();
    }
}

// =============================================================================
// Analysis Flow
// =============================================================================

async function startAnalysis() {
    const symptoms = Elements.symptomInput.value.trim();
    
    if (!symptoms) {
        showToast('Please enter your symptoms first', 'error');
        Elements.symptomInput.focus();
        return;
    }
    
    if (symptoms.length < 3) {
        showToast('Please provide more details about your symptoms', 'error');
        return;
    }
    
    if (AppState.isAnalyzing) return;
    
    AppState.isAnalyzing = true;
    Elements.analyzeBtn.disabled = true;
    Elements.analyzeBtn.querySelector('.btn-text').textContent = 'Analyzing...';
    
    Elements.resultsSection.classList.remove('active');
    Elements.emergencyAlert.classList.remove('active');
    Elements.emptyState.style.display = 'none';
    
    Elements.loadingSection.classList.add('active');
    
    animateLoadingSteps();
    
    try {
        // Use local analysis engine instead of API
        const data = AnalysisEngine.analyze(symptoms);
        
        AppState.currentAnalysis = {
            id: Date.now(),
            query: symptoms,
            timestamp: new Date().toISOString(),
            ...data
        };
        
        addToHistory(AppState.currentAnalysis);
        
        await completeLoadingSteps();
        
        displayResults(data);
        
        showToast('Analysis complete', 'success');
        
    } catch (error) {
        console.error('Analysis error:', error);
        showToast(error.message || 'Failed to analyze symptoms', 'error');
        Elements.emptyState.style.display = 'block';
    } finally {
        AppState.isAnalyzing = false;
        Elements.analyzeBtn.disabled = false;
        Elements.analyzeBtn.querySelector('.btn-text').textContent = 'Analyze Symptoms';
        Elements.loadingSection.classList.remove('active');
        resetLoadingSteps();
    }
}

function animateLoadingSteps() {
    const steps = Elements.loadingSteps;
    let currentStep = 0;
    
    function activateStep() {
        if (currentStep < steps.length) {
            steps.forEach((step, index) => {
                step.classList.remove('active', 'completed');
                if (index < currentStep) {
                    step.classList.add('completed');
                } else if (index === currentStep) {
                    step.classList.add('active');
                }
            });
            currentStep++;
        }
    }
    
    AppState.loadingInterval = setInterval(activateStep, 600);
}

function resetLoadingSteps() {
    if (AppState.loadingInterval) {
        clearInterval(AppState.loadingInterval);
        AppState.loadingInterval = null;
    }
    Elements.loadingSteps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
}

function completeLoadingSteps() {
    return new Promise(resolve => {
        clearInterval(AppState.loadingInterval);
        Elements.loadingSteps.forEach(step => {
            step.classList.remove('active');
            step.classList.add('completed');
        });
        setTimeout(resolve, 400);
    });
}

// =============================================================================
// Results Display
// =============================================================================

function displayResults(data) {
    const { input_analysis, risk_assessment, insight } = data;
    
    if (input_analysis.emergency_detected) {
        Elements.emergencyAlert.classList.add('active');
    }
    
    displayInsight(insight, input_analysis);
    displayRiskConditions(risk_assessment);
    displaySymptoms(input_analysis.extracted_symptoms);
    
    Elements.resultsSection.classList.add('active');
    
    setTimeout(() => {
        Elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function displayInsight(insight, inputAnalysis) {
    const emergencyLevel = inputAnalysis.emergency_level;
    
    let html = '';
    
    html += `<div class="insight-summary">${escapeHtml(insight.summary)}</div>`;
    
    if (insight.risk_explanation) {
        html += `
            <div class="insight-section">
                <h4 class="insight-section-title">Risk Assessment</h4>
                <div class="insight-section-content">${escapeHtml(insight.risk_explanation)}</div>
            </div>
        `;
    }
    
    if (insight.preventive_guidance) {
        html += `
            <div class="insight-section">
                <h4 class="insight-section-title">${escapeHtml(insight.preventive_guidance.title)}</h4>
                <ul class="insight-list">
                    ${insight.preventive_guidance.tips.map(tip => `<li>${escapeHtml(tip)}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (insight.next_steps && insight.next_steps.length > 0) {
        html += `
            <div class="insight-section">
                <h4 class="insight-section-title">Recommended Next Steps</h4>
                <ul class="insight-list">
                    ${insight.next_steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (insight.additional_considerations && insight.additional_considerations.length > 0) {
        html += `
            <div class="insight-section">
                <h4 class="insight-section-title">Other Possible Conditions</h4>
                <div class="detail-content">
                    ${insight.additional_considerations.map(c => `
                        <span class="detail-tag">${escapeHtml(c.name)} (${c.score}%)</span>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (insight.safety_note && insight.safety_note.length > 0) {
        html += `
            <div class="safety-note">
                <div class="safety-note-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Important Notice
                </div>
                <ul class="insight-list">
                    ${insight.safety_note.map(note => `<li>${escapeHtml(note)}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    html += `
        <div style="margin-top: 20px; text-align: right;">
            <button class="btn-secondary" id="bookmarkCurrent" onclick="bookmarkCurrentAnalysis()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                Save Analysis
            </button>
        </div>
    `;
    
    Elements.insightContent.innerHTML = html;
}

function displayRiskConditions(conditions) {
    if (!conditions || conditions.length === 0) {
        Elements.riskConditions.innerHTML = '<p class="empty-message">No matching conditions found.</p>';
        return;
    }
    
    Elements.riskConditions.innerHTML = conditions.map((condition, index) => {
        const circumference = 2 * Math.PI * 27;
        const offset = circumference - (condition.score / 100) * circumference;
        
        return `
            <div class="risk-card" onclick="toggleRiskCard(this)" style="animation: fadeInUp 0.5s ease ${index * 0.1}s both;">
                <div class="risk-card-header">
                    <div class="risk-score-ring">
                        <svg width="60" height="60" viewBox="0 0 60 60">
                            <circle class="track" cx="30" cy="30" r="27"/>
                            <circle 
                                class="progress ${condition.severity}" 
                                cx="30" 
                                cy="30" 
                                r="27"
                                stroke-dasharray="${circumference}"
                                stroke-dashoffset="${circumference}"
                                data-offset="${offset}"
                            />
                        </svg>
                        <span class="risk-score-value">${condition.score}%</span>
                    </div>
                    <div class="risk-info">
                        <div class="risk-name">${escapeHtml(condition.condition_name)}</div>
                        <div class="risk-meta">
                            <span class="risk-severity ${condition.severity}">${condition.severity}</span>
                            <span class="risk-matches">${condition.match_count}/${condition.total_symptoms} symptoms</span>
                            ${condition.is_emergency ? '<span class="risk-emergency-badge">Emergency</span>' : ''}
                        </div>
                    </div>
                    <svg class="risk-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>
                <div class="risk-card-details">
                    <div class="detail-section">
                        <div class="detail-label">Matched Symptoms</div>
                        <div class="detail-content">
                            ${condition.matched_symptoms.length > 0 
                                ? condition.matched_symptoms.map(s => `<span class="detail-tag matched">${escapeHtml(s)}</span>`).join('')
                                : '<span class="detail-tag">None detected</span>'
                            }
                        </div>
                    </div>
                    ${condition.unmatched_symptoms.length > 0 ? `
                        <div class="detail-section">
                            <div class="detail-label">Other Associated Symptoms</div>
                            <div class="detail-content">
                                ${condition.unmatched_symptoms.map(s => `<span class="detail-tag">${escapeHtml(s)}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    <div class="detail-section">
                        <div class="detail-label">Recommendations</div>
                        <ul class="insight-list">
                            ${condition.recommendations.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="detail-section">
                        <div class="detail-label">Prevention</div>
                        <ul class="insight-list">
                            ${condition.prevention.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    setTimeout(() => {
        document.querySelectorAll('.risk-score-ring .progress').forEach(ring => {
            const offset = ring.getAttribute('data-offset');
            ring.style.strokeDashoffset = offset;
        });
    }, 100);
}

function displaySymptoms(symptoms) {
    if (!symptoms || symptoms.length === 0) {
        Elements.symptomsList.innerHTML = '<span class="detail-tag">No specific symptoms detected</span>';
        return;
    }
    
    Elements.symptomsList.innerHTML = symptoms.map((symptom, index) => `
        <span class="symptom-tag" style="animation-delay: ${index * 0.05}s">${escapeHtml(symptom)}</span>
    `).join('');
}

function toggleRiskCard(card) {
    card.classList.toggle('expanded');
}

// =============================================================================
// History Management
// =============================================================================

function addToHistory(analysis) {
    AppState.history.unshift({
        id: analysis.id,
        query: analysis.query,
        timestamp: analysis.timestamp,
        topCondition: analysis.risk_assessment[0]?.condition_name || 'Unknown',
        score: analysis.risk_assessment[0]?.score || 0
    });
    
    if (AppState.history.length > 20) {
        AppState.history = AppState.history.slice(0, 20);
    }
    
    localStorage.setItem('medintel-history', JSON.stringify(AppState.history));
    renderHistory();
}

function renderHistory() {
    if (AppState.history.length === 0) {
        Elements.historyList.innerHTML = '<p class="empty-message">No search history yet.</p>';
        return;
    }
    
    Elements.historyList.innerHTML = AppState.history.map(item => `
        <div class="history-item" onclick="loadFromHistory(${item.id})">
            <div class="history-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            </div>
            <div class="history-content">
                <div class="history-query">${escapeHtml(item.query)}</div>
                <div class="history-date">${formatDate(item.timestamp)} · ${escapeHtml(item.topCondition)} (${item.score}%)</div>
            </div>
            <div class="history-actions" onclick="event.stopPropagation()">
                <button class="history-delete" onclick="deleteHistoryItem(${item.id})" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

function loadFromHistory(id) {
    const item = AppState.history.find(h => h.id === id);
    if (item) {
        Elements.symptomInput.value = item.query;
        updateCharCount();
        closeModal(Elements.historyModal);
        startAnalysis();
    }
}

function deleteHistoryItem(id) {
    AppState.history = AppState.history.filter(h => h.id !== id);
    localStorage.setItem('medintel-history', JSON.stringify(AppState.history));
    renderHistory();
    showToast('Item removed from history', 'info');
}

function clearAllHistory() {
    AppState.history = [];
    localStorage.setItem('medintel-history', JSON.stringify(AppState.history));
    renderHistory();
    showToast('History cleared', 'info');
}

// =============================================================================
// Bookmark Management
// =============================================================================

function bookmarkCurrentAnalysis() {
    if (!AppState.currentAnalysis) return;
    
    const exists = AppState.bookmarks.some(b => b.query === AppState.currentAnalysis.query);
    if (exists) {
        showToast('This analysis is already saved', 'info');
        return;
    }
    
    AppState.bookmarks.unshift({
        id: AppState.currentAnalysis.id,
        query: AppState.currentAnalysis.query,
        timestamp: AppState.currentAnalysis.timestamp,
        topCondition: AppState.currentAnalysis.risk_assessment[0]?.condition_name || 'Unknown',
        score: AppState.currentAnalysis.risk_assessment[0]?.score || 0,
        data: AppState.currentAnalysis
    });
    
    localStorage.setItem('medintel-bookmarks', JSON.stringify(AppState.bookmarks));
    renderBookmarks();
    showToast('Analysis saved', 'success');
}

function renderBookmarks() {
    if (AppState.bookmarks.length === 0) {
        Elements.bookmarkList.innerHTML = '<p class="empty-message">No saved analyses yet.</p>';
        return;
    }
    
    Elements.bookmarkList.innerHTML = AppState.bookmarks.map(item => `
        <div class="bookmark-item" onclick="loadBookmark(${item.id})">
            <div class="bookmark-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
            </div>
            <div class="bookmark-content">
                <div class="bookmark-title">${escapeHtml(item.query)}</div>
                <div class="bookmark-date">${formatDate(item.timestamp)} · ${escapeHtml(item.topCondition)} (${item.score}%)</div>
            </div>
            <div class="bookmark-actions" onclick="event.stopPropagation()">
                <button class="bookmark-delete" onclick="deleteBookmark(${item.id})" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

function loadBookmark(id) {
    const item = AppState.bookmarks.find(b => b.id === id);
    if (item && item.data) {
        AppState.currentAnalysis = item.data;
        Elements.symptomInput.value = item.query;
        updateCharCount();
        displayResults(item.data);
        closeModal(Elements.bookmarkModal);
        showToast('Bookmark loaded', 'success');
    }
}

function deleteBookmark(id) {
    AppState.bookmarks = AppState.bookmarks.filter(b => b.id !== id);
    localStorage.setItem('medintel-bookmarks', JSON.stringify(AppState.bookmarks));
    renderBookmarks();
    showToast('Bookmark removed', 'info');
}

// =============================================================================
// Modal Management
// =============================================================================

function initModals() {
    Elements.historyBtn.addEventListener('click', () => openModal(Elements.historyModal));
    Elements.bookmarkBtn.addEventListener('click', () => openModal(Elements.bookmarkModal));
    Elements.disclaimerLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(Elements.disclaimerModal);
    });
    Elements.termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(Elements.disclaimerModal);
    });
    
    Elements.closeHistory.addEventListener('click', () => closeModal(Elements.historyModal));
    Elements.closeBookmarks.addEventListener('click', () => closeModal(Elements.bookmarkModal));
    Elements.closeDisclaimer.addEventListener('click', () => closeModal(Elements.disclaimerModal));
    Elements.acceptDisclaimer.addEventListener('click', () => closeModal(Elements.disclaimerModal));
    Elements.clearHistory.addEventListener('click', clearAllHistory);
    
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            closeModal(overlay.parentElement);
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// =============================================================================
// Toast Notifications
// =============================================================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icons = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    
    toast.innerHTML = `
        <div class="toast-icon ${type}">${icons[type]}</div>
        <div class="toast-message">${escapeHtml(message)}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    
    Elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// =============================================================================
// Utility Functions
// =============================================================================

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) {
        return 'Just now';
    }
    
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}

// =============================================================================
// Initialization
// =============================================================================

function init() {
    initTheme();
    initInput();
    initModals();
    renderHistory();
    renderBookmarks();
    
    if (!localStorage.getItem('medintel-disclaimer-accepted')) {
        openModal(Elements.disclaimerModal);
        localStorage.setItem('medintel-disclaimer-accepted', 'true');
    }
    
    console.log('MedIntel AI initialized');
}

document.addEventListener('DOMContentLoaded', init);

// Expose functions globally
window.toggleRiskCard = toggleRiskCard;
window.loadFromHistory = loadFromHistory;
window.deleteHistoryItem = deleteHistoryItem;
window.loadBookmark = loadBookmark;
window.deleteBookmark = deleteBookmark;
window.bookmarkCurrentAnalysis = bookmarkCurrentAnalysis;
