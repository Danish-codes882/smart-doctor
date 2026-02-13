"""
MedIntel AI - AI-Powered Health Intelligence Platform
Flask Backend Application
"""

from flask import Flask, render_template, request, jsonify, make_response
from functools import wraps
import json
import re
import time
import logging
from datetime import datetime
from collections import defaultdict
import random

# Initialize Flask App
app = Flask(__name__)
app.config['SECRET_KEY'] = 'medintel-secret-key-2024'

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('medintel.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# =============================================================================
# CACHING LAYER (In-Memory)
# =============================================================================

class CacheLayer:
    """Simple in-memory caching layer"""
    def __init__(self):
        self.cache = {}
        self.ttl = 3600  # 1 hour TTL
    
    def get(self, key):
        if key in self.cache:
            data, timestamp = self.cache[key]
            if time.time() - timestamp < self.ttl:
                return data
            else:
                del self.cache[key]
        return None
    
    def set(self, key, value):
        self.cache[key] = (value, time.time())
    
    def clear(self):
        self.cache.clear()

cache = CacheLayer()

# =============================================================================
# RATE LIMITING
# =============================================================================

class RateLimiter:
    """Rate limiter per IP address"""
    def __init__(self, max_requests=30, window=60):
        self.max_requests = max_requests
        self.window = window
        self.requests = defaultdict(list)
    
    def is_allowed(self, ip):
        now = time.time()
        self.requests[ip] = [req_time for req_time in self.requests[ip] 
                             if now - req_time < self.window]
        
        if len(self.requests[ip]) >= self.max_requests:
            return False
        
        self.requests[ip].append(now)
        return True

rate_limiter = RateLimiter()

def rate_limit(f):
    """Rate limiting decorator"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        ip = request.remote_addr
        if not rate_limiter.is_allowed(ip):
            logger.warning(f"Rate limit exceeded for IP: {ip}")
            return jsonify({'error': 'Rate limit exceeded. Please try again later.'}), 429
        return f(*args, **kwargs)
    return decorated_function

# =============================================================================
# KNOWLEDGE BASE ENGINE
# =============================================================================

class KnowledgeBase:
    """Medical Knowledge Base for condition matching"""
    
    def __init__(self):
        self.conditions = self._load_conditions()
        self.symptom_synonyms = self._load_synonyms()
    
    def _load_conditions(self):
        """Load medical conditions from embedded data"""
        return {
            "conditions": [
                {
                    "id": "heart_attack",
                    "name": "Heart Attack",
                    "symptoms": ["chest pain", "chest tightness", "sweating", "nausea", "shortness of breath", "arm pain", "jaw pain"],
                    "weights": {"chest pain": 10, "chest tightness": 10, "sweating": 7, "nausea": 6, "shortness of breath": 8, "arm pain": 8, "jaw pain": 7},
                    "risk_factors": ["age", "smoking", "diabetes", "hypertension", "family history"],
                    "emergency": True,
                    "severity": "critical",
                    "prevention": ["Regular exercise", "Healthy diet", "Quit smoking", "Manage stress", "Regular checkups"],
                    "recommendations": ["Call emergency services immediately", "Chew aspirin if available", "Rest in comfortable position", "Do not drive yourself"]
                },
                {
                    "id": "stroke",
                    "name": "Stroke",
                    "symptoms": ["sudden headache", "confusion", "trouble speaking", "numbness", "weakness", "vision problems", "dizziness", "loss of balance"],
                    "weights": {"sudden headache": 9, "confusion": 9, "trouble speaking": 10, "numbness": 8, "weakness": 8, "vision problems": 7, "dizziness": 6, "loss of balance": 7},
                    "risk_factors": ["age", "hypertension", "diabetes", "smoking", "heart disease"],
                    "emergency": True,
                    "severity": "critical",
                    "prevention": ["Control blood pressure", "Maintain healthy weight", "Exercise regularly", "Limit alcohol", "Manage diabetes"],
                    "recommendations": ["Call emergency services immediately", "Note the time symptoms started", "Do not give food or water", "Stay calm and rest"]
                },
                {
                    "id": "migraine",
                    "name": "Migraine",
                    "symptoms": ["severe headache", "throbbing pain", "sensitivity to light", "sensitivity to sound", "nausea", "vomiting", "aura"],
                    "weights": {"severe headache": 9, "throbbing pain": 8, "sensitivity to light": 7, "sensitivity to sound": 6, "nausea": 6, "vomiting": 5, "aura": 8},
                    "risk_factors": ["family history", "hormonal changes", "stress", "certain foods"],
                    "emergency": False,
                    "severity": "moderate",
                    "prevention": ["Identify triggers", "Regular sleep schedule", "Stay hydrated", "Manage stress", "Limit caffeine"],
                    "recommendations": ["Rest in dark quiet room", "Apply cold compress", "Take prescribed medication", "Stay hydrated"]
                },
                {
                    "id": "anxiety_attack",
                    "name": "Anxiety Attack",
                    "symptoms": ["rapid heartbeat", "sweating", "trembling", "shortness of breath", "chest tightness", "dizziness", "fear", "nausea"],
                    "weights": {"rapid heartbeat": 8, "sweating": 6, "trembling": 7, "shortness of breath": 7, "chest tightness": 6, "dizziness": 5, "fear": 8, "nausea": 4},
                    "risk_factors": ["stress", "trauma", "genetics", "substance use"],
                    "emergency": False,
                    "severity": "moderate",
                    "prevention": ["Regular exercise", "Meditation", "Adequate sleep", "Limit caffeine", "Therapy"],
                    "recommendations": ["Practice deep breathing", "Use grounding techniques", "Remove yourself from triggers", "Seek professional help if recurrent"]
                },
                {
                    "id": "common_cold",
                    "name": "Common Cold",
                    "symptoms": ["runny nose", "sneezing", "cough", "sore throat", "mild fever", "congestion", "fatigue"],
                    "weights": {"runny nose": 7, "sneezing": 6, "cough": 6, "sore throat": 5, "mild fever": 4, "congestion": 6, "fatigue": 5},
                    "risk_factors": ["season", "exposure to sick people", "weakened immune system"],
                    "emergency": False,
                    "severity": "low",
                    "prevention": ["Wash hands frequently", "Avoid touching face", "Stay away from sick people", "Boost immune system"],
                    "recommendations": ["Rest and hydrate", "Over-the-counter cold medicine", "Warm salt water gargle", "Use humidifier"]
                },
                {
                    "id": "influenza",
                    "name": "Influenza (Flu)",
                    "symptoms": ["fever", "chills", "body aches", "fatigue", "cough", "sore throat", "headache", "congestion"],
                    "weights": {"fever": 8, "chills": 7, "body aches": 8, "fatigue": 7, "cough": 6, "sore throat": 5, "headache": 6, "congestion": 5},
                    "risk_factors": ["season", "no vaccination", "age", "chronic conditions"],
                    "emergency": False,
                    "severity": "moderate",
                    "prevention": ["Annual flu vaccine", "Wash hands frequently", "Avoid close contact", "Stay home when sick"],
                    "recommendations": ["Rest and hydrate", "Take antiviral medication if prescribed", "Use fever reducers", "Seek care if symptoms worsen"]
                },
                {
                    "id": "food_poisoning",
                    "name": "Food Poisoning",
                    "symptoms": ["nausea", "vomiting", "diarrhea", "stomach cramps", "fever", "weakness", "dehydration"],
                    "weights": {"nausea": 7, "vomiting": 8, "diarrhea": 8, "stomach cramps": 7, "fever": 5, "weakness": 6, "dehydration": 9},
                    "risk_factors": ["contaminated food", "improper food handling", "travel", "weakened immune system"],
                    "emergency": False,
                    "severity": "moderate",
                    "prevention": ["Proper food handling", "Cook food thoroughly", "Refrigerate promptly", "Wash hands before eating"],
                    "recommendations": ["Stay hydrated", "Rest", "Eat bland foods when able", "Seek care if severe dehydration"]
                },
                {
                    "id": "appendicitis",
                    "name": "Appendicitis",
                    "symptoms": ["abdominal pain", "nausea", "vomiting", "fever", "loss of appetite", "swelling", "tenderness"],
                    "weights": {"abdominal pain": 10, "nausea": 6, "vomiting": 6, "fever": 5, "loss of appetite": 5, "swelling": 7, "tenderness": 8},
                    "risk_factors": ["age", "family history", "male gender"],
                    "emergency": True,
                    "severity": "critical",
                    "prevention": ["High fiber diet", "Maintain healthy weight"],
                    "recommendations": ["Seek immediate medical attention", "Do not eat or drink", "Do not take laxatives", "Surgery may be required"]
                },
                {
                    "id": "pneumonia",
                    "name": "Pneumonia",
                    "symptoms": ["cough", "fever", "chills", "shortness of breath", "chest pain", "fatigue", "sweating", "confusion"],
                    "weights": {"cough": 7, "fever": 8, "chills": 7, "shortness of breath": 9, "chest pain": 7, "fatigue": 6, "sweating": 5, "confusion": 8},
                    "risk_factors": ["age", "chronic conditions", "weakened immune system", "smoking"],
                    "emergency": False,
                    "severity": "high",
                    "prevention": ["Vaccination", "Hand hygiene", "Don't smoke", "Healthy lifestyle"],
                    "recommendations": ["See doctor promptly", "Take prescribed antibiotics", "Rest and hydrate", "Monitor symptoms closely"]
                },
                {
                    "id": "diabetes_type2",
                    "name": "Type 2 Diabetes",
                    "symptoms": ["increased thirst", "frequent urination", "fatigue", "blurred vision", "slow healing", "numbness", "weight loss"],
                    "weights": {"increased thirst": 8, "frequent urination": 8, "fatigue": 6, "blurred vision": 7, "slow healing": 6, "numbness": 7, "weight loss": 6},
                    "risk_factors": ["obesity", "family history", "age", "sedentary lifestyle", "poor diet"],
                    "emergency": False,
                    "severity": "high",
                    "prevention": ["Healthy diet", "Regular exercise", "Maintain healthy weight", "Regular screening"],
                    "recommendations": ["See doctor for testing", "Monitor blood sugar", "Lifestyle modifications", "Medication if prescribed"]
                },
                {
                    "id": "hypertension",
                    "name": "Hypertension (High Blood Pressure)",
                    "symptoms": ["headache", "dizziness", "chest pain", "shortness of breath", "nosebleeds", "flushing", "vision changes"],
                    "weights": {"headache": 6, "dizziness": 6, "chest pain": 8, "shortness of breath": 7, "nosebleeds": 5, "flushing": 4, "vision changes": 7},
                    "risk_factors": ["age", "family history", "obesity", "sedentary lifestyle", "high sodium diet", "stress"],
                    "emergency": False,
                    "severity": "high",
                    "prevention": ["Reduce sodium intake", "Exercise regularly", "Maintain healthy weight", "Limit alcohol", "Manage stress"],
                    "recommendations": ["Regular blood pressure monitoring", "Take prescribed medication", "Lifestyle changes", "Regular doctor visits"]
                },
                {
                    "id": "allergic_reaction",
                    "name": "Allergic Reaction",
                    "symptoms": ["sneezing", "itchy eyes", "runny nose", "watery eyes", "congestion", "skin rash", "swelling", "difficulty breathing"],
                    "weights": {"sneezing": 6, "itchy eyes": 7, "runny nose": 5, "watery eyes": 6, "congestion": 5, "skin rash": 7, "swelling": 8, "difficulty breathing": 10},
                    "risk_factors": ["family history", "exposure to allergens", "seasonal factors"],
                    "emergency": True,
                    "severity": "critical",
                    "prevention": ["Avoid known allergens", "Use air purifiers", "Keep windows closed during high pollen", "Read food labels carefully"],
                    "recommendations": ["Use antihistamines", "Seek emergency care if breathing difficulty", "Use epinephrine if prescribed", "Identify and avoid triggers"]
                },
                {
                    "id": "gastroenteritis",
                    "name": "Gastroenteritis",
                    "symptoms": ["diarrhea", "nausea", "vomiting", "stomach cramps", "fever", "headache", "muscle aches", "dehydration"],
                    "weights": {"diarrhea": 8, "nausea": 7, "vomiting": 7, "stomach cramps": 7, "fever": 5, "headache": 4, "muscle aches": 4, "dehydration": 9},
                    "risk_factors": ["contaminated food/water", "close contact with infected person", "weakened immune system"],
                    "emergency": False,
                    "severity": "moderate",
                    "prevention": ["Hand washing", "Safe food preparation", "Drink clean water", "Avoid sick contacts"],
                    "recommendations": ["Stay hydrated with electrolytes", "Rest", "Eat bland foods", "Seek care if severe symptoms"]
                },
                {
                    "id": "urinary_tract_infection",
                    "name": "Urinary Tract Infection",
                    "symptoms": ["burning urination", "frequent urination", "urgent urination", "cloudy urine", "blood in urine", "pelvic pain", "fever"],
                    "weights": {"burning urination": 10, "frequent urination": 8, "urgent urination": 7, "cloudy urine": 6, "blood in urine": 8, "pelvic pain": 6, "fever": 5},
                    "risk_factors": ["female anatomy", "sexual activity", "menopause", "urinary tract abnormalities"],
                    "emergency": False,
                    "severity": "moderate",
                    "prevention": ["Drink plenty of water", "Wipe front to back", "Urinate after intercourse", "Avoid irritating feminine products"],
                    "recommendations": ["See doctor for antibiotics", "Drink cranberry juice", "Stay hydrated", "Complete full antibiotic course"]
                },
                {
                    "id": "asthma_attack",
                    "name": "Asthma Attack",
                    "symptoms": ["shortness of breath", "chest tightness", "wheezing", "coughing", "rapid breathing", "anxiety", "sweating"],
                    "weights": {"shortness of breath": 10, "chest tightness": 9, "wheezing": 9, "coughing": 6, "rapid breathing": 8, "anxiety": 5, "sweating": 4},
                    "risk_factors": ["allergies", "respiratory infections", "exercise", "cold air", "stress"],
                    "emergency": True,
                    "severity": "critical",
                    "prevention": ["Avoid triggers", "Take controller medications", "Use inhaler before exercise", "Get flu vaccine"],
                    "recommendations": ["Use rescue inhaler immediately", "Sit upright", "Try to stay calm", "Call emergency if no relief"]
                }
            ]
        }
    
    def _load_synonyms(self):
        """Load symptom synonyms for better matching"""
        return {
            "chest pain": ["chest pain", "chest ache", "chest discomfort", "tight chest", "chest pressure", "chest tightness"],
            "sweating": ["sweating", "sweaty", "perspiration", "clammy"],
            "shortness of breath": ["shortness of breath", "breathless", "difficulty breathing", "can't breathe", "labored breathing"],
            "nausea": ["nausea", "nauseous", "feel sick", "queasy", "upset stomach"],
            "vomiting": ["vomiting", "throwing up", "puking", "vomit"],
            "headache": ["headache", "head pain", "migraine", "head ache"],
            "severe headache": ["severe headache", "intense headache", "bad headache", "throbbing headache"],
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
            "vision problems": ["vision problems", "blurred vision", "double vision", "can't see", "vision changes"],
            "loss of balance": ["loss of balance", "unsteady", "balance problems", "falling"],
            "swelling": ["swelling", "swollen", "inflamed", "puffy"],
            "skin rash": ["skin rash", "rash", "hives", "skin irritation"],
            "itchy eyes": ["itchy eyes", "eye itching", "irritated eyes"],
            "burning urination": ["burning urination", "burning when peeing", "painful urination", "pee burns"],
            "frequent urination": ["frequent urination", "peeing often", "urinating frequently"],
            "wheezing": ["wheezing", "wheeze", "whistling sound when breathing"],
            "chills": ["chills", "shivering", "feeling cold", "rigors"],
            "body aches": ["body aches", "muscle pain", "body pain", "aching muscles"]
        }
    
    def get_conditions(self):
        return self.conditions["conditions"]
    
    def get_condition_by_id(self, condition_id):
        for condition in self.conditions["conditions"]:
            if condition["id"] == condition_id:
                return condition
        return None

# Initialize Knowledge Base
knowledge_base = KnowledgeBase()

# =============================================================================
# INPUT VALIDATION LAYER
# =============================================================================

class InputValidator:
    """Input validation and sanitization"""
    
    MAX_INPUT_LENGTH = 500
    MIN_INPUT_LENGTH = 3
    
    # Patterns to reject
    MALICIOUS_PATTERNS = [
        r'<script[^>]*>.*?</script>',
        r'javascript:',
        r'on\w+\s*=',
        r'<iframe',
        r'<object',
        r'<embed',
        r'document\.cookie',
        r'window\.location',
        r'eval\s*\(',
        r'expression\s*\(',
    ]
    
    @classmethod
    def validate(cls, user_input):
        """Validate and sanitize user input"""
        if not user_input or not isinstance(user_input, str):
            return False, "Invalid input type"
        
        # Length check
        if len(user_input) < cls.MIN_INPUT_LENGTH:
            return False, f"Input too short. Minimum {cls.MIN_INPUT_LENGTH} characters required."
        
        if len(user_input) > cls.MAX_INPUT_LENGTH:
            return False, f"Input too long. Maximum {cls.MAX_INPUT_LENGTH} characters allowed."
        
        # Check for malicious patterns
        for pattern in cls.MALICIOUS_PATTERNS:
            if re.search(pattern, user_input, re.IGNORECASE):
                logger.warning(f"Malicious pattern detected: {pattern}")
                return False, "Invalid characters detected in input."
        
        return True, cls.sanitize(user_input)
    
    @classmethod
    def sanitize(cls, user_input):
        """Sanitize input by removing dangerous characters"""
        # Remove HTML tags
        sanitized = re.sub(r'<[^>]+>', '', user_input)
        # Normalize whitespace
        sanitized = ' '.join(sanitized.split())
        # Escape special characters
        sanitized = sanitized.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        return sanitized

# =============================================================================
# SYMPTOM PROCESSING ENGINE
# =============================================================================

class SymptomProcessor:
    """Process and normalize symptoms from user input"""
    
    STOP_WORDS = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'i', 'my', 'me', 'have', 'has', 'had', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'this', 'that', 'these', 'those', 'very', 'so', 'just', 'now', 'then', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'than', 'too', 'can', 'will', 'don', 'should', 'what', 'which', 'who', 'whom', 'whose', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves'}
    
    EMERGENCY_KEYWORDS = {
        'critical': ['cant breathe', 'cannot breathe', 'stop breathing', 'unconscious', 'not breathing', 'chest pain', 'heart attack', 'stroke', 'severe bleeding', 'choking', 'anaphylaxis', 'allergic reaction', 'suicide', 'kill myself'],
        'urgent': ['severe pain', 'intense pain', 'extreme pain', 'high fever', 'cant move', 'paralyzed', 'seizure', 'convulsion']
    }
    
    def __init__(self, knowledge_base):
        self.kb = knowledge_base
    
    def process(self, user_input):
        """Process user input and extract symptoms"""
        # Convert to lowercase
        text = user_input.lower()
        
        # Tokenize
        tokens = re.findall(r'\b\w+\b', text)
        
        # Remove stop words
        filtered_tokens = [t for t in tokens if t not in self.STOP_WORDS]
        
        # Detect emergency keywords
        emergency_level = self._detect_emergency(text)
        
        # Extract symptoms using synonym matching
        extracted_symptoms = self._extract_symptoms(text)
        
        return {
            'original_input': user_input,
            'processed_tokens': filtered_tokens,
            'extracted_symptoms': extracted_symptoms,
            'emergency_level': emergency_level,
            'symptom_count': len(extracted_symptoms)
        }
    
    def _detect_emergency(self, text):
        """Detect emergency level based on keywords"""
        for keyword in self.EMERGENCY_KEYWORDS['critical']:
            if keyword in text:
                return 'critical'
        for keyword in self.EMERGENCY_KEYWORDS['urgent']:
            if keyword in text:
                return 'urgent'
        return 'none'
    
    def _extract_symptoms(self, text):
        """Extract symptoms using synonym matching"""
        extracted = []
        text_lower = text.lower()
        
        for canonical, synonyms in self.kb.symptom_synonyms.items():
            for synonym in synonyms:
                if synonym in text_lower:
                    if canonical not in extracted:
                        extracted.append(canonical)
                    break
        
        return extracted

# Initialize Symptom Processor
symptom_processor = SymptomProcessor(knowledge_base)

# =============================================================================
# RISK SCORING ENGINE
# =============================================================================

class RiskScoringEngine:
    """Calculate risk scores for conditions based on symptoms"""
    
    SEVERITY_LEVELS = {
        'low': (0, 25),
        'moderate': (26, 50),
        'high': (51, 75),
        'critical': (76, 100)
    }
    
    def calculate(self, symptoms, conditions):
        """Calculate risk scores for all conditions"""
        results = []
        
        for condition in conditions:
            score_data = self._calculate_condition_score(symptoms, condition)
            if score_data['match_count'] > 0:
                results.append(score_data)
        
        # Sort by score descending
        results.sort(key=lambda x: x['score'], reverse=True)
        
        return results
    
    def _calculate_condition_score(self, symptoms, condition):
        """Calculate score for a single condition"""
        condition_symptoms = condition['symptoms']
        weights = condition['weights']
        
        total_weight = 0
        matched_weight = 0
        matched_symptoms = []
        unmatched_symptoms = []
        
        for symptom in condition_symptoms:
            weight = weights.get(symptom, 5)
            total_weight += weight
            
            if symptom in symptoms:
                matched_weight += weight
                matched_symptoms.append(symptom)
            else:
                unmatched_symptoms.append(symptom)
        
        # Calculate percentage
        if total_weight > 0:
            raw_score = (matched_weight / total_weight) * 100
        else:
            raw_score = 0
        
        # Apply boost for multiple symptom matches
        match_count = len(matched_symptoms)
        if match_count >= 4:
            raw_score = min(raw_score * 1.15, 100)
        elif match_count >= 2:
            raw_score = min(raw_score * 1.05, 100)
        
        # Round to integer
        final_score = round(raw_score)
        
        # Determine severity level
        severity = self._get_severity_level(final_score)
        
        return {
            'condition_id': condition['id'],
            'condition_name': condition['name'],
            'score': final_score,
            'severity': severity,
            'match_count': match_count,
            'total_symptoms': len(condition_symptoms),
            'matched_symptoms': matched_symptoms,
            'unmatched_symptoms': unmatched_symptoms,
            'is_emergency': condition['emergency'],
            'condition_severity': condition['severity'],
            'prevention': condition['prevention'],
            'recommendations': condition['recommendations']
        }
    
    def _get_severity_level(self, score):
        """Get severity level based on score"""
        for level, (min_score, max_score) in self.SEVERITY_LEVELS.items():
            if min_score <= score <= max_score:
                return level
        return 'low'

# Initialize Risk Scoring Engine
risk_engine = RiskScoringEngine()

# =============================================================================
# AI INSIGHT GENERATOR
# =============================================================================

class AIInsightGenerator:
    """Generate human-readable insights from risk analysis"""
    
    def generate(self, processed_input, risk_results, emergency_level):
        """Generate comprehensive insight"""
        
        if not risk_results:
            return self._generate_no_match_insight(processed_input)
        
        top_condition = risk_results[0]
        
        insight = {
            'summary': self._generate_summary(top_condition, emergency_level),
            'risk_explanation': self._generate_risk_explanation(top_condition),
            'preventive_guidance': self._generate_prevention_guide(top_condition),
            'next_steps': self._generate_next_steps(top_condition, emergency_level),
            'safety_note': self._generate_safety_note(emergency_level),
            'additional_considerations': self._generate_additional_considerations(risk_results)
        }
        
        return insight
    
    def _generate_summary(self, top_condition, emergency_level):
        """Generate summary of analysis"""
        condition_name = top_condition['condition_name']
        score = top_condition['score']
        
        if emergency_level == 'critical':
            return f"Your symptoms indicate a potentially life-threatening condition that requires immediate medical attention."
        elif emergency_level == 'urgent':
            return f"Your symptoms suggest a serious condition that should be evaluated by a medical professional as soon as possible."
        elif score >= 70:
            return f"Your symptoms show a strong match with {condition_name}. Medical evaluation is recommended."
        elif score >= 40:
            return f"Your symptoms show a moderate match with {condition_name}. Consider consulting a healthcare provider."
        else:
            return f"Your symptoms show a mild match with several conditions. Monitor your symptoms and consult a doctor if they persist or worsen."
    
    def _generate_risk_explanation(self, condition):
        """Explain the risk assessment"""
        score = condition['score']
        matched = len(condition['matched_symptoms'])
        total = condition['total_symptoms']
        
        explanations = [
            f"Based on your reported symptoms, our analysis found {matched} out of {total} typical symptoms for {condition['condition_name']}.",
            f"The risk score of {score}% indicates a {condition['severity']} level of concern.",
        ]
        
        if condition['matched_symptoms']:
            explanations.append(f"Matching symptoms include: {', '.join(condition['matched_symptoms'])}.")
        
        return " ".join(explanations)
    
    def _generate_prevention_guide(self, condition):
        """Generate prevention recommendations"""
        prevention_tips = condition['prevention']
        if prevention_tips:
            return {
                'title': f"Prevention Tips for {condition['condition_name']}",
                'tips': prevention_tips
            }
        return None
    
    def _generate_next_steps(self, condition, emergency_level):
        """Generate recommended next steps"""
        steps = []
        
        if emergency_level == 'critical' or condition['is_emergency']:
            steps = [
                "Call emergency services (911) immediately",
                "Do not drive yourself to the hospital",
                "Have someone stay with you",
                "Follow any emergency instructions given"
            ]
        elif condition['score'] >= 60:
            steps = [
                "Schedule an appointment with your doctor within 24-48 hours",
                "Monitor your symptoms closely",
                "Rest and avoid strenuous activities",
                "Keep a symptom diary"
            ] + condition['recommendations'][:2]
        else:
            steps = [
                "Monitor your symptoms for the next few days",
                "Get plenty of rest and stay hydrated",
                "Consider over-the-counter remedies if appropriate",
                "Consult a doctor if symptoms worsen or persist"
            ]
        
        return steps
    
    def _generate_safety_note(self, emergency_level):
        """Generate safety disclaimer"""
        notes = [
            "This analysis is for educational purposes only and does not constitute medical advice.",
            "Always consult with a qualified healthcare professional for proper diagnosis and treatment.",
            "If you are experiencing severe symptoms or believe you have a medical emergency, call 911 immediately."
        ]
        
        if emergency_level == 'critical':
            notes.insert(0, "WARNING: Your symptoms may indicate a life-threatening emergency.")
        
        return notes
    
    def _generate_additional_considerations(self, risk_results):
        """Generate additional condition considerations"""
        if len(risk_results) > 1:
            other_conditions = risk_results[1:4]
            return [
                {
                    'name': c['condition_name'],
                    'score': c['score'],
                    'severity': c['severity']
                }
                for c in other_conditions
            ]
        return []
    
    def _generate_no_match_insight(self, processed_input):
        """Generate insight when no conditions match"""
        return {
            'summary': "We couldn't find a strong match for your symptoms in our database.",
            'risk_explanation': "Your symptoms may be non-specific or could indicate a condition not covered in our knowledge base.",
            'preventive_guidance': None,
            'next_steps': [
                "Monitor your symptoms",
                "Stay hydrated and get rest",
                "Consult a healthcare professional if symptoms persist",
                "Consider keeping a symptom diary"
            ],
            'safety_note': [
                "This tool provides educational information only.",
                "When in doubt, always consult a medical professional."
            ],
            'additional_considerations': []
        }

# Initialize AI Insight Generator
insight_generator = AIInsightGenerator()

# =============================================================================
# API ROUTES
# =============================================================================

@app.route('/')
def index():
    """Serve the main application page"""
    return render_template('index.html')

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.route('/analyze', methods=['POST'])
@rate_limit
def analyze():
    """Main analysis endpoint"""
    try:
        # Get request data
        data = request.get_json()
        
        if not data or 'symptoms' not in data:
            return jsonify({'error': 'No symptoms provided'}), 400
        
        user_input = data['symptoms']
        
        # Log request
        logger.info(f"Analysis request from {request.remote_addr}")
        
        # Validate input
        is_valid, result = InputValidator.validate(user_input)
        if not is_valid:
            logger.warning(f"Validation failed: {result}")
            return jsonify({'error': result}), 400
        
        sanitized_input = result
        
        # Check cache
        cache_key = f"analyze:{hash(sanitized_input)}"
        cached_result = cache.get(cache_key)
        if cached_result:
            logger.info("Returning cached result")
            return jsonify(cached_result)
        
        # Process symptoms
        processed = symptom_processor.process(sanitized_input)
        
        # Calculate risk scores
        conditions = knowledge_base.get_conditions()
        risk_results = risk_engine.calculate(processed['extracted_symptoms'], conditions)
        
        # Generate insights
        insight = insight_generator.generate(processed, risk_results, processed['emergency_level'])
        
        # Build response
        response = {
            'success': True,
            'timestamp': datetime.now().isoformat(),
            'input_analysis': {
                'extracted_symptoms': processed['extracted_symptoms'],
                'symptom_count': processed['symptom_count'],
                'emergency_detected': processed['emergency_level'] != 'none',
                'emergency_level': processed['emergency_level']
            },
            'risk_assessment': risk_results[:5],
            'insight': insight,
            'disclaimer': "This analysis is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional."
        }
        
        # Cache result
        cache.set(cache_key, response)
        
        # Log success
        logger.info(f"Analysis complete. Top condition: {risk_results[0]['condition_name'] if risk_results else 'None'}, Score: {risk_results[0]['score'] if risk_results else 0}")
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        return jsonify({
            'error': 'An error occurred during analysis. Please try again.',
            'details': str(e)
        }), 500

@app.route('/conditions')
def get_conditions():
    """Get all available conditions"""
    conditions = knowledge_base.get_conditions()
    simplified = [
        {
            'id': c['id'],
            'name': c['name'],
            'emergency': c['emergency'],
            'severity': c['severity']
        }
        for c in conditions
    ]
    return jsonify({'conditions': simplified})

@app.route('/privacy')
def privacy():
    """Privacy policy page"""
    return render_template('privacy.html')

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {str(error)}")
    return jsonify({'error': 'Internal server error'}), 500

# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
