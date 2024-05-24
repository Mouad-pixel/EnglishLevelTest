function calculateScore() {
    const questions = document.querySelectorAll('.question');
    let score = 0;
    
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === question.dataset.correct) {
            score += 2;
        }
    });
    
    const totalQuestions = questions.length;
    const resultElement = document.getElementById('result');
    
    let level = '';
    if (score <= totalQuestions * 0.5) {
        level = 'Elementary';
    } else if (score <= totalQuestions * 1.0) {
        level = 'Pre-intermediate';
    } else {
        level = 'Intermediate';
    }
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('submit-btn').classList = "btn btn-dark";
    document.getElementById('thing').innerHTML = "Thank you for taking this test.";
    resultElement.hidden = false;
    resultElement.style.transition = 'height 0.5s';
    resultElement.style.height = 'auto';
    document.getElementById("question-carousel").hidden=true;
    resultElement.innerHTML = `You scored ${score} out of ${totalQuestions*2}. Your level is ${level}.`;
}

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const submitButton = document.getElementById('submit-btn');

    // Handle navigation to the next slide
    carousel.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('carousel-control-next')) {
            const currentQuestion = document.querySelector('.carousel-item.active');
            const nextQuestion = currentQuestion.nextElementSibling;
            if (nextQuestion) {
                carousel.classList.remove('no-transition');
                carousel.carousel('next');
            }
        }
    });

    // Handle navigation to the previous slide
    carousel.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('carousel-control-prev')) {
            const currentQuestion = document.querySelector('.carousel-item.active');
            const prevQuestion = currentQuestion.previousElementSibling;
            if (prevQuestion) {
                if (document.getElementById("40") == prevQuestion){return;}
                carousel.classList.remove('no-transition');
                carousel.carousel('prev');
            }
        }
    });

    // Mark the current question as answered
    carousel.addEventListener('change', function (event) {
        const target = event.target;
        if (target.tagName === 'INPUT') {
            const currentQuestion = document.querySelector('.carousel-item.active');
            currentQuestion.classList.add('answered');
        }
    });

    // Prevent moving to the next question if the current one is unanswered
    submitButton.addEventListener('click', function () {

        calculateScore();
    });
});
