const questions = [
    {
        Question: "which is the largest animal in the world?",
        answer: [
            { text : "shark" , correct : "false"},
            { text : "Elephant" , correct : "false"},
            { text : "blue whale" , correct : "true"},
            { text : "your friend" , correct : "false"},
        ]
    },
    {
        Question: "which is the largest lake in the world?",
        answer: [
            { text : "superior" , correct : "false"},
            { text : "victoria" , correct : "false"},
            { text : "caspian sea" , correct : "true"},
            { text : "dont'know" , correct : "false"},
        ]  
    },
    {
        Question: "which is the best anime in the world?",
        answer: [
            { text : "naruto" , correct : "false"},
            { text : "demon slayer" , correct : "false"},
            { text : "dragon ball" , correct : "true"},
            { text : "mein nahi dekhta" , correct : "false"},
        ]
    }
];
const queselement = document.getElementById("question");
const anselement = document.getElementById("answers");
const nextbtn = document.getElementById("next");

let index = 0;
let score = 0;

function startq (){
    index=0;
    score=0;
    nextbtn.innerHTML="next";
    showquestion();
}

function showquestion(){
    resetState ();
    let current= questions[index];
    let quesno = index+1;
    queselement.innerHTML = quesno + "." + current.Question;

    current.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        anselement.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function selectanswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct == "true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(anselement.children).forEach(button =>{
      if(button.dataset.correct =="true"){
        button.classList.add("correct");
      }
      button.disabled= true;
    });
    nextbtn.style.display="block";
}

function showscore(){
    resetState();
    queselement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "play Again"
    nextbtn.style.display= "block";
}

function handleNext(){
    index++;
    if(index<questions.length){
        showquestion();
    }else{
        showscore();
    }
}


nextbtn.addEventListener("click",()=>{
    if(index< questions.length){
        handleNext();
    }else {
        startq();
    }
})

function resetState(){
    nextbtn.style.display = "none";
    while(anselement.firstChild){
        anselement.removeChild(anselement.firstChild);
    }
}
startq ();