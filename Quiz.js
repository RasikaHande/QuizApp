
        const quizData = {
            HTML: [
                { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of the above"], answer: 0 },
                { question: "Which tag is used to define a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<hyperlink>"], answer: 1 },
                { question: "Which attribute specifies the URL of a linked resource?", options: ["src", "url", "href", "link"], answer: 2 }
            ],
            CSS: [
                { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets", "Computer Style Sheets"], answer: 0 },
                { question: "Which property is used to change the background color?", options: ["color", "bgcolor", "background-color", "background"], answer: 2 },
                { question: "Which CSS property controls the text size?", options: ["font-size", "text-style", "text-size", "font-style"], answer: 0 }
            ],
            JavaScript: [
                { question: "Inside which HTML element do we put the JavaScript?", options: ["<script>", "<js>", "<scripting>", "<javascript>"], answer: 0 },
                { question: "Which operator is used to assign a value to a variable?", options: ["=", "-", "+", "*"], answer: 0 },
                { question: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World');", "alert('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');"], answer: 1 }
            ],
            DSA: [
                { question: "Which of the following is a linear data structure?", options: ["Array", "Tree", "Graph", "HashMap"], answer: 0 },
                { question: "Which data structure uses FIFO (First In First Out) principle?", options: ["Stack", "Queue", "Array", "Tree"], answer: 1 },
                { question: "Which algorithm is used to sort elements in an array?", options: ["Sorting", "Searching", "Merging", "None of the above"], answer: 0 }
            ]
        };

        let currentCategory = '';
        let currentQuestionIndex = 0;
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let skippedQuestions = 0;
        let timerInterval;
        let username = '';

        function showHome() {
            document.getElementById('home-container').style.display = 'block';
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('result-container').style.display = 'none';
            document.getElementById('categories').style.display = 'block';
        }

        function selectCategory(category) {
            username = document.getElementById('username').value || 'User';
            if (!username.trim()) {
                alert('Please enter your name.');
                return;
            }

            currentCategory = category;
            currentQuestionIndex = 0;
            correctAnswers = 0;
            wrongAnswers = 0;
            skippedQuestions = 0;
            document.getElementById('categories').style.display = 'none';
            document.getElementById('quiz-container').style.display = 'block';
            loadQuestion();
        }

        function loadQuestion() {
            if (currentQuestionIndex < quizData[currentCategory].length) {
                const questionData = quizData[currentCategory][currentQuestionIndex];
                document.getElementById('quiz-question').innerText = questionData.question;

                const optionsDiv = document.getElementById('options');
                optionsDiv.innerHTML = '';
                questionData.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.innerText = option;
                    button.onclick = () => checkAnswer(index);
                    optionsDiv.appendChild(button);
                });

                startTimer();
            } else {
                finishQuiz();
            }
        }

        function checkAnswer(selectedIndex) {
            clearInterval(timerInterval);
            const correctAnswerIndex = quizData[currentCategory][currentQuestionIndex].answer;
            if (selectedIndex === correctAnswerIndex) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
            currentQuestionIndex++;
            loadQuestion();
        }

        function startTimer() {
            let timeLeft = 10;
            document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;

            timerInterval = setInterval(() => {
                timeLeft--;
                document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    skippedQuestions++;
                    currentQuestionIndex++;
                    loadQuestion();
                }
            }, 1000);
        }

        function finishQuiz() {
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('result-container').style.display = 'block';

            const totalQuestions = quizData[currentCategory].length;
            const totalMarks = correctAnswers;
            const percentage = (correctAnswers / totalQuestions) * 100;
            let grade;

            if (percentage >= 90) grade = 'A';
            else if (percentage >= 80) grade = 'B';
            else if (percentage >= 70) grade = 'C';
            else if (percentage >= 60) grade = 'D';
            else grade = 'F';

            document.getElementById('result-username').innerText = username;
            document.getElementById('total-questions').innerText = totalQuestions;
            document.getElementById('correct-answers').innerText = correctAnswers;
            document.getElementById('wrong-answers').innerText = wrongAnswers;
            document.getElementById('skipped-questions').innerText = skippedQuestions;
            document.getElementById('total-marks').innerText = totalMarks;
            document.getElementById('percentage').innerText = percentage.toFixed(2);
            document.getElementById('grade').innerText = grade;
        }

        showHome();