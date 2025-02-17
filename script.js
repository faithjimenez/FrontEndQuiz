const questions = [
    {
        question: "I have keys but open no locks. I have space but no room. You can enter but not go outside. What am I?",
        answers: [
            {text: "Piano", correct: false},
            {text: "Keyboard", correct: true},
            {text: "Treasure Chest", correct: false},
        ]
    },
    
    {
        question: "I can be cracked, made, told, and played. What am I?",
        answers: [
            {text: "Joke", correct: true},
            {text: "Mirror", correct: false},
            {text: "Glass", correct: false},
        ]
    },
    
    {
        question: "The more you remove from me, the bigger I get. What am I?",
        answers: [
            {text: "Pothole", correct: true},
            {text: "Shadows", correct: false},
            {text: "Balloon", correct: false},
        ]
    },
    
    {
        question: "The more you take, the more you leave behind. What am I?",
        answers: [
            {text: "Memories", correct: false},
            {text: "Shadows", correct: false},
            {text: "Footsteps", correct: true},
        ]
    },
    
    {
        question: "I go up but never come down. What am I?",
        answers: [
            {text: "Staircase", correct: false},
            {text: "Age", correct: true},
            {text: "Balloon", correct: false},
        ]
    }
    
    
    ];
    
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextbuttonElement = document.getElementById("nextbutton");
    
    let currentQuestionIndex= 0;
    let score = 0;

    function startQuiz(){
        currentQuestionIndex= 0;
        score=0;
        nextbuttonElement.innerHTML="Next";//basically tells the code to move to the next cycle of words
        showQuestion();
    }

    function showQuestion(){
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo =currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


        currentQuestion.answers.forEach(answer => {
            const button = document.createElement ("button");
            button.innerText= answer.text;
            button.classList.add ("btn");
            answersElement.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);

        });

    }

    function resetState(){
        nextbuttonElement.style.display="none";
        while(answersElement.firstChild){
            answersElement.removeChild(answersElement.firstChild);
        }
    }

    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct==="true";
        const popup = document.getElementById("popup");
        const popupMessage = document.getElementById ("popup-message");
        if(isCorrect){
            selectedBtn.classList.add("correct");
            popupMessage.innerText ="Correct :D"
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
            popupMessage.innerText = "Incorrect :("

    }
    popup.style.display ="block";

    setTimeout(()=>{
        popup.style.display ="none";

    },1500);

    Array.from(answersElement.children).forEach(button=>{
        if (button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextbuttonElement.style.display = "block";


    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextbuttonElement.innerHTML = "Play Again?"
        nextbuttonElement.style.display ="block";
        questionElement.style.fontFamily= "Lexend, sans-sefif";
    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex<questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }

    nextbuttonElement.addEventListener("click", ()=>{
        if (currentQuestionIndex < questions.length){
            handleNextButton();
        } else{
            startQuiz()
        }
    })

    startQuiz();
    