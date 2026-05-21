// Form Data
let formData = {
    fullName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    gpClinic: '',
    healthQuestions: {
        heartCondition: null,
        chestPainExercise: null,
        chestPainMonth: null,
        dizziness: null,
        asthma: null,
        highBloodPressure: null,
        diabetes: null,
        prescriptionMeds: null,
        injuries: null,
        surgery: null,
        pregnancy: null,
        medicalAdvice: null,
    },
    healthDetails: '',
    medicalHistory: '',
    goals: [],
    goalsDescription: '',
    trainingExperience: '',
    trainingDaysPerWeek: '',
    hasReferral: false,
    referralName: '',
    referralRelationship: '',
    informedConsent: false,
    informedConsentInitials: '',
    liabilityWaiver: false,
    liabilityWaiverInitials: '',
    photography: null,
    photographyInitials: '',
    emergencyConsent: false,
    emergencyConsentInitials: '',
};

let currentStep = 0;
const totalSteps = 8;

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    renderStep();
});

// Render current step
function renderStep() {
    const formContent = document.getElementById('formContent');
    
    // Update progress bar
    const progress = (currentStep / 7) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('stepCounter').textContent = `Step ${currentStep + 1} of ${totalSteps}`;
    
    // Update button states
    document.getElementById('backBtn').disabled = currentStep === 0;
    document.getElementById('nextBtn').textContent = currentStep === 7 ? '✓ Submit' : 'Next →';
    
    // Clear content
    formContent.innerHTML = '';
    
    // Render appropriate step
    switch(currentStep) {
        case 0:
            renderStep0();
            break;
        case 1:
            renderStep1();
            break;
        case 2:
            renderStep2();
            break;
        case 3:
            renderStep3();
            break;
        case 4:
            renderStep4();
            break;
        case 5:
            renderStep5();
            break;
        case 6:
            renderStep6();
            break;
        case 7:
            renderStep7();
            break;
    }
}

// STEP 0: Client Details
function renderStep0() {
    const html = `
        <h2>Client Details</h2>
        
        <div class="form-group">
            <label>Full Name *</label>
            <input type="text" placeholder="John Doe" value="${formData.fullName}" onchange="formData.fullName = this.value">
        </div>
        
        <div class="form-group">
            <label>Date of Birth *</label>
            <input type="date" value="${formData.dateOfBirth}" onchange="formData.dateOfBirth = this.value">
        </div>
        
        <div class="form-group">
            <label>Phone Number *</label>
            <input type="tel" placeholder="(555) 123-4567" value="${formData.phone}" onchange="formData.phone = this.value">
        </div>
        
        <div class="form-group">
            <label>Email Address *</label>
            <input type="email" placeholder="you@example.com" value="${formData.email}" onchange="formData.email = this.value">
        </div>
        
        <div class="form-group">
            <label>Residential Address *</label>
            <textarea placeholder="123 Main St, City, State" onchange="formData.address = this.value">${formData.address}</textarea>
        </div>
        
        <div class="form-group">
            <label>Emergency Contact Name *</label>
            <input type="text" placeholder="Jane Doe" value="${formData.emergencyContactName}" onchange="formData.emergencyContactName = this.value">
        </div>
        
        <div class="form-group">
            <label>Emergency Contact Phone *</label>
            <input type="tel" placeholder="(555) 987-6543" value="${formData.emergencyContactPhone}" onchange="formData.emergencyContactPhone = this.value">
        </div>
        
        <div class="form-group">
            <label>Relationship to Emergency Contact *</label>
            <input type="text" placeholder="Spouse, Parent, Sibling" value="${formData.emergencyContactRelationship}" onchange="formData.emergencyContactRelationship = this.value">
        </div>
        
        <div class="form-group">
            <label>GP / Medical Clinic (Optional)</label>
            <input type="text" placeholder="Clinic name and address" value="${formData.gpClinic}" onchange="formData.gpClinic = this.value">
        </div>
    `;
    document.getElementById('formContent').innerHTML = html;
}

// STEP 1: Health Screening
function renderStep1() {
    const questions = [
        { key: 'heartCondition', label: 'Has your doctor ever told you that you have a heart condition?' },
        { key: 'chestPainExercise', label: 'Do you experience chest pain during exercise?' },
        { key: 'chestPainMonth', label: 'Have you experienced chest pain in the last month?' },
        { key: 'dizziness', label: 'Do you lose balance due to dizziness or have fainting episodes?' },
        { key: 'asthma', label: 'Do you have asthma or breathing difficulties during exercise?' },
        { key: 'highBloodPressure', label: 'Do you currently have high blood pressure?' },
        { key: 'diabetes', label: 'Do you have diabetes?' },
        { key: 'prescriptionMeds', label: 'Are you currently taking prescription medication?' },
        { key: 'injuries', label: 'Do you have any injuries affecting exercise?' },
        { key: 'surgery', label: 'Have you had surgery in the past 12 months?' },
        { key: 'pregnancy', label: 'Are you pregnant or recently postpartum?' },
        { key: 'medicalAdvice', label: 'Has a medical professional advised against exercise?' },
    ];
    
    let html = `
        <h2>Health & Pre-Exercise Screening</h2>
        <p class="form-description">Please answer YES or NO to each question</p>
    `;
    
    questions.forEach(q => {
        const yesSelected = formData.healthQuestions[q.key] === true;
        const noSelected = formData.healthQuestions[q.key] === false;
        
        html += `
            <div class="question-container">
                <p class="question-text">${q.label}</p>
                <div class="yes-no-container">
                    <button class="yes-no-btn ${yesSelected ? 'selected' : ''}" 
                        onclick="formData.healthQuestions['${q.key}'] = true; renderStep()">Yes</button>
                    <button class="yes-no-btn ${noSelected ? 'selected' : ''}" 
                        onclick="formData.healthQuestions['${q.key}'] = false; renderStep()">No</button>
                </div>
            </div>
        `;
    });
    
    html += `
        <div class="form-group">
            <label>If YES to any question above, please provide details:</label>
            <textarea placeholder="Please explain any YES answers..." onchange="formData.healthDetails = this.value">${formData.healthDetails}</textarea>
        </div>
    `;
    
    document.getElementById('formContent').innerHTML = html;
}

// STEP 2: Medical History
function renderStep2() {
    const html = `
        <h2>Medical Conditions & Injury History</h2>
        <div class="form-group">
            <label>Please list any injuries, medical conditions, allergies, surgeries, or physical limitations:</label>
            <textarea placeholder="List all relevant medical information..." onchange="formData.medicalHistory = this.value">${formData.medicalHistory}</textarea>
        </div>
    `;
    document.getElementById('formContent').innerHTML = html;
}

// STEP 3: Fitness & Goals
function renderStep3() {
    const goalOptions = ['Fat loss', 'Muscle gain', 'Strength', 'Fitness', 'Sports performance', 'Mobility', 'General health'];
    
    let html = `
        <h2>Current Fitness & Goals</h2>
        <div class="button-group">
            <label>What are your primary goals? (Select all that apply)</label>
            <div class="button-options">
    `;
    
    goalOptions.forEach(goal => {
        const selected = formData.goals.includes(goal);
        html += `
            <button class="option-btn ${selected ? 'selected' : ''}" 
                onclick="toggleGoal('${goal}')">
                ${selected ? '✓ ' : ''}${goal}
            </button>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div class="form-group">
            <label>Describe your goals in detail:</label>
            <textarea placeholder="Tell us more about what you want to achieve..." onchange="formData.goalsDescription = this.value">${formData.goalsDescription}</textarea>
        </div>
        
        <div class="button-group">
            <label>Current training experience:</label>
            <div class="button-options">
                <button class="option-btn ${formData.trainingExperience === 'Beginner' ? 'selected' : ''}" 
                    onclick="formData.trainingExperience = 'Beginner'; renderStep()">Beginner</button>
                <button class="option-btn ${formData.trainingExperience === 'Intermediate' ? 'selected' : ''}" 
                    onclick="formData.trainingExperience = 'Intermediate'; renderStep()">Intermediate</button>
                <button class="option-btn ${formData.trainingExperience === 'Advanced' ? 'selected' : ''}" 
                    onclick="formData.trainingExperience = 'Advanced'; renderStep()">Advanced</button>
            </div>
        </div>
        
        <div class="form-group">
            <label>How many days per week do you currently train?</label>
            <input type="number" min="0" max="7" placeholder="0-7" value="${formData.trainingDaysPerWeek}" 
                onchange="formData.trainingDaysPerWeek = this.value">
        </div>
    `;
    
    document.getElementById('formContent').innerHTML = html;
}

// STEP 4: Referral
function renderStep4() {
    const html = `
        <h2>How Did You Hear About Us?</h2>
        <p class="form-description">Were you referred by a friend, family member, or current client? If so, we'd love to know! Both of you will receive referral rewards! 🎉</p>
        
        <div class="button-group">
            <label>Have you been referred to Blake?</label>
            <div class="button-options grid-2">
                <button class="option-btn ${formData.hasReferral === true ? 'selected' : ''}" 
                    onclick="formData.hasReferral = true; renderStep()">Yes, I was referred</button>
                <button class="option-btn ${formData.hasReferral === false ? 'selected' : ''}" 
                    onclick="formData.hasReferral = false; renderStep()">No referral</button>
            </div>
        </div>
        
        ${formData.hasReferral ? `
            <div class="form-group">
                <label>Who referred you? (Full Name)</label>
                <input type="text" placeholder="Full name of person who referred you" value="${formData.referralName}" 
                    onchange="formData.referralName = this.value">
            </div>
            
            <div class="form-group">
                <label>Their relationship to you</label>
                <input type="text" placeholder="e.g., Friend, Family, Colleague, Current client" value="${formData.referralRelationship}" 
                    onchange="formData.referralRelationship = this.value">
            </div>
        ` : `
            <div class="info-box">
                <p>💡 <strong>Tip:</strong> Know someone who could benefit from training with Blake? Refer them and you'll both get rewards!</p>
            </div>
        `}
    `;
    
    document.getElementById('formContent').innerHTML = html;
}

// STEP 5: Informed Consent
function renderStep5() {
    const html = `
        <h2>Informed Consent</h2>
        
        <div class="info-box">
            <p><strong>I understand that participation in physical exercise and fitness activities involves inherent risks, including but not limited to:</strong></p>
            <ul>
                <li>Muscle soreness</li>
                <li>Sprains and strains</li>
                <li>Cardiovascular complications</li>
                <li>Serious injury</li>
                <li>Death in rare circumstances</li>
            </ul>
            <p><strong>I acknowledge:</strong></p>
            <ul>
                <li>I voluntarily participate in training sessions</li>
                <li>I have disclosed all relevant medical information accurately</li>
                <li>I understand results are not guaranteed</li>
                <li>I agree to immediately stop exercise if I experience pain or discomfort</li>
            </ul>
        </div>
        
        <div class="checkbox-group">
            <input type="checkbox" id="consent1" ${formData.informedConsent ? 'checked' : ''} 
                onchange="formData.informedConsent = this.checked">
            <label for="consent1">I have read and agree to the informed consent</label>
        </div>
        
        <div class="form-group">
            <label>Client Initials:</label>
            <input type="text" placeholder="e.g., JD" maxlength="5" value="${formData.informedConsentInitials}" 
                onchange="formData.informedConsentInitials = this.value">
        </div>
    `;
    
    document.getElementById('formContent').innerHTML = html;
}

// STEP 6: Liability & Additional Consents
function renderStep6() {
    const html = `
        <h2>Liability Waiver & Additional Consents</h2>
        
        <div class="info-box">
            <h3>Liability Waiver</h3>
            <p>To the extent permitted by Australian law, I release and hold harmless the trainer/business from claims arising from participation in training sessions, except where caused by negligence or unlawful conduct.</p>
        </div>
        
        <div class="checkbox-group">
            <input type="checkbox" id="liability" ${formData.liabilityWaiver ? 'checked' : ''} 
                onchange="formData.liabilityWaiver = this.checked">
            <label for="liability">I agree to the liability waiver</label>
        </div>
        
        <div class="form-group">
            <label>Client Initials:</label>
            <input type="text" placeholder="e.g., JD" maxlength="5" value="${formData.liabilityWaiverInitials}" 
                onchange="formData.liabilityWaiverInitials = this.value">
        </div>
        
        <div class="info-box" style="margin-top: 24px;">
            <h3>Photography / Social Media Consent</h3>
            <p>I give permission for the following content to be used for marketing/social media purposes:</p>
        </div>
        
        <div class="button-group">
            <div class="button-options">
                <button class="option-btn ${formData.photography === true ? 'selected' : ''}" 
                    onclick="formData.photography = true; renderStep()">
                    I consent to photos, videos, testimonials & social media
                </button>
                <button class="option-btn ${formData.photography === false ? 'selected' : ''}" 
                    onclick="formData.photography = false; renderStep()">
                    I do NOT consent to any photography/social media use
                </button>
            </div>
        </div>
        
        <div class="form-group">
            <label>Client Initials:</label>
            <input type="text" placeholder="e.g., JD" maxlength="5" value="${formData.photographyInitials}" 
                onchange="formData.photographyInitials = this.value">
        </div>
        
        <div class="info-box" style="margin-top: 24px;">
            <h3>Emergency Medical Consent</h3>
            <p>In the event of an emergency, I authorize the trainer to administer basic first aid, contact emergency services, and contact my emergency contact person.</p>
        </div>
        
        <div class="checkbox-group">
            <input type="checkbox" id="emergency" ${formData.emergencyConsent ? 'checked' : ''} 
                onchange="formData.emergencyConsent = this.checked">
            <label for="emergency">I give permission for emergency medical consent</label>
        </div>
        
        <div class="form-group">
            <label>Client Initials:</label>
            <input type="text" placeholder="e.g., JD" maxlength="5" value="${formData.emergencyConsentInitials}" 
                onchange="formData.emergencyConsentInitials = this.value">
        </div>
    `;
    
    document.getElementById('formContent').innerHTML = html;
}

// STEP 7: Review
function renderStep7() {
    let html = `
        <h2>Review Your Application</h2>
        
        <div class="review-box">
            <h3>Client Details</h3>
            <p><strong>Name:</strong> ${formData.fullName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Emergency Contact:</strong> ${formData.emergencyContactName}</p>
        </div>
        
        <div class="review-box">
            <h3>Fitness Profile</h3>
            <p><strong>Goals:</strong> ${formData.goals.length > 0 ? formData.goals.join(', ') : 'Not selected'}</p>
            <p><strong>Training Experience:</strong> ${formData.trainingExperience || 'Not selected'}</p>
            <p><strong>Training Days/Week:</strong> ${formData.trainingDaysPerWeek || 'Not specified'}</p>
        </div>
    `;
    
    if (formData.hasReferral) {
        html += `
            <div class="review-box">
                <h3>Referral</h3>
                <p><strong>Referred By:</strong> ${formData.referralName}</p>
                <p><strong>Relationship:</strong> ${formData.referralRelationship}</p>
            </div>
        `;
    }
    
    html += `
        <div class="review-box">
            <h3>Consents</h3>
            <p>✓ Informed Consent: ${formData.informedConsent ? 'Agreed' : 'Not agreed'}</p>
            <p>✓ Liability Waiver: ${formData.liabilityWaiver ? 'Agreed' : 'Not agreed'}</p>
            <p>✓ Emergency Medical: ${formData.emergencyConsent ? 'Consented' : 'Not consented'}</p>
        </div>
        
        <div class="warning-box">
            By submitting this form, you confirm that all information is accurate and complete.
        </div>
    `;
    
    document.getElementById('formContent').innerHTML = html;
}

// Helper Functions
function toggleGoal(goal) {
    if (formData.goals.includes(goal)) {
        formData.goals = formData.goals.filter(g => g !== goal);
    } else {
        formData.goals.push(goal);
    }
    renderStep();
}

function handleNext() {
    if (currentStep === 7) {
        handleSubmit();
    } else {
        currentStep++;
        window.scrollTo(0, 0);
        renderStep();
    }
}

function handlePrev() {
    if (currentStep > 0) {
        currentStep--;
        window.scrollTo(0, 0);
        renderStep();
    }
}

function handleSubmit() {
    console.log('Form Data:', formData);
    
    // Send to Formspree
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // CLIENT DETAILS
            'Full Name': formData.fullName,
            'Date of Birth': formData.dateOfBirth,
            'Phone Number': formData.phone,
            'Email Address': formData.email,
            'Residential Address': formData.address,
            'Emergency Contact Name': formData.emergencyContactName,
            'Emergency Contact Phone': formData.emergencyContactPhone,
            'Emergency Contact Relationship': formData.emergencyContactRelationship,
            'GP Clinic': formData.gpClinic,
            
            // HEALTH SCREENING
            'Heart Condition': formData.healthQuestions.heartCondition,
            'Chest Pain During Exercise': formData.healthQuestions.chestPainExercise,
            'Chest Pain Last Month': formData.healthQuestions.chestPainMonth,
            'Dizziness/Fainting': formData.healthQuestions.dizziness,
            'Asthma/Breathing Issues': formData.healthQuestions.asthma,
            'High Blood Pressure': formData.healthQuestions.highBloodPressure,
            'Diabetes': formData.healthQuestions.diabetes,
            'Prescription Medications': formData.healthQuestions.prescriptionMeds,
            'Current Injuries': formData.healthQuestions.injuries,
            'Recent Surgery': formData.healthQuestions.surgery,
            'Pregnant/Postpartum': formData.healthQuestions.pregnancy,
            'Medical Advice Against Exercise': formData.healthQuestions.medicalAdvice,
            'Health Details': formData.healthDetails,
            
            // MEDICAL HISTORY
            'Medical Conditions & Injuries': formData.medicalHistory,
            
            // FITNESS & GOALS
            'Fitness Goals': formData.goals.join(', '),
            'Goals Description': formData.goalsDescription,
            'Training Experience': formData.trainingExperience,
            'Training Days Per Week': formData.trainingDaysPerWeek,
            
            // REFERRAL
            'Has Referral': formData.hasReferral,
            'Referral Name': formData.referralName,
            'Referral Relationship': formData.referralRelationship,
            
            // CONSENTS
            'Informed Consent': formData.informedConsent,
            'Informed Consent Initials': formData.informedConsentInitials,
            'Liability Waiver': formData.liabilityWaiver,
            'Liability Waiver Initials': formData.liabilityWaiverInitials,
            'Photography Consent': formData.photography,
            'Photography Initials': formData.photographyInitials,
            'Emergency Medical Consent': formData.emergencyConsent,
            'Emergency Medical Initials': formData.emergencyConsentInitials,
        })
    })
    .then(response => {
        if (response.ok) {
            // Show success screen
            document.getElementById('formContent').style.display = 'none';
            document.querySelector('.button-container').style.display = 'none';
            
            let successMsg = `Thanks for completing your intake form, ${formData.fullName.split(' ')[0]}!<br>Blake will review your information and contact you at ${formData.phone}`;
            
            if (formData.hasReferral) {
                successMsg += `<br><p class="success-referral">🎉 Great referral! You and ${formData.referralName} will both receive referral rewards!</p>`;
            }
            
            document.getElementById('successMessage').innerHTML = successMsg;
            document.getElementById('successScreen').style.display = 'flex';
        } else {
            alert('There was an error submitting your form. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again.');
    });
}
    
    document.getElementById('successMessage').innerHTML = successMsg;
    document.getElementById('successScreen').style.display = 'flex';
    
    // Here you would normally send the data to a server
    // Example:
    // fetch('/api/submit-form', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
}
