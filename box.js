// Box rotation state
let rotationX = -20;
let rotationY = 20;

const box = document.getElementById('box');
const topButton = document.getElementById('topButton');
const modal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const copyBtn = document.getElementById('copyBtn');
const rewardLink = document.getElementById('rewardLink');

// Track correct answers for current session only (no persistence)
let correctAnswers = {
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false
};

// Update box rotation
function updateBoxRotation() {
    box.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

// Arrow button controls
document.getElementById('upBtn').addEventListener('click', () => {
    rotationX += 90;
    updateBoxRotation();
});

document.getElementById('downBtn').addEventListener('click', () => {
    rotationX -= 90;
    updateBoxRotation();
});

document.getElementById('leftBtn').addEventListener('click', () => {
    rotationY -= 90;
    updateBoxRotation();
});

document.getElementById('rightBtn').addEventListener('click', () => {
    rotationY += 90;
    updateBoxRotation();
});

// Initialize box rotation
updateBoxRotation();

// Check answers
document.querySelectorAll('.submit-btn').forEach(button => {
    button.addEventListener('click', function() {
        const questionNum = this.getAttribute('data-question');
        const correctAnswer = this.getAttribute('data-answer');
        const userAnswer = document.getElementById(`answer${questionNum}`).value.trim();
        const feedback = document.getElementById(`feedback${questionNum}`);

        // Check if answer is correct (case insensitive)
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            this.classList.add('correct');
            this.textContent = '✓ صحيح';
            feedback.textContent = '✓ إجابة صحيحة!';
            feedback.className = 'feedback correct';
            correctAnswers[questionNum] = true;

            // Check if all answers are correct
            updateTopButton();
        } else {
            feedback.textContent = '✗ إجابة خاطئة، حاول مرة أخرى';
            feedback.className = 'feedback incorrect';
            setTimeout(() => {
                feedback.textContent = '';
            }, 3000);
        }
    });
});

// Update top button state
function updateTopButton() {
    const allCorrect = Object.values(correctAnswers).every(val => val === true);

    if (allCorrect) {
        topButton.classList.add('unlocked');
        topButton.style.background = 'radial-gradient(circle at 30% 30%, #6bff6b, #28a745)';
        topButton.style.borderColor = '#1e7e34';
    }
}

// Top button click handler
topButton.addEventListener('click', function() {
    const allCorrect = Object.values(correctAnswers).every(val => val === true);
    
    if (!allCorrect) {
        // Show temporary message
        const originalText = this.textContent;
        this.textContent = 'أجب على الأسئلة أولاً!';
        this.style.fontSize = '14px';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.fontSize = '18px';
        }, 2000);
    } else {
        // Open modal with reward
        modal.classList.add('show');
        
        // Animate box opening
        box.style.transition = 'transform 1s ease-out';
        box.style.transform = `rotateX(${rotationX - 120}deg) rotateY(${rotationY}deg) scale(1.2)`;
    }
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    box.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
});

// Copy link
copyBtn.addEventListener('click', () => {
    rewardLink.select();
    document.execCommand('copy');

    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ تم النسخ!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 2000);
});

// Keyboard controls (optional)
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            rotationX += 90;
            updateBoxRotation();
            break;
        case 'ArrowDown':
            rotationX -= 90;
            updateBoxRotation();
            break;
        case 'ArrowLeft':
            rotationY -= 90;
            updateBoxRotation();
            break;
        case 'ArrowRight':
            rotationY += 90;
            updateBoxRotation();
            break;
    }
});
