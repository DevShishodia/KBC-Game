const start = document.getElementById('start');
const timer = document.getElementById('timer');
const question = document.querySelector('#question');
const container = document.getElementById('container');
const options1 = document.querySelector('#button1');
const options2 = document.querySelector('#button2');
const options3 = document.querySelector('#button3');
const options4 = document.querySelector('#button4');
const amount = document.querySelector('#winningAmount > h2')
const options = document.querySelectorAll('#options > button');
var quizData;
let amnt = 0;
let i = 0 ;
let t = 30;
let intervalId = 0;
let correctans;
let data;

  

const startGame = () =>{
 
let promise = fetch('http://127.0.0.1:5500/Advance%20FE(React)/Assignment/Game/data.json');

      promise.then(response => {
         return response.json();
      
    }).then(newdata => {
         data = newdata;
          clickButton(options);
          intervalId = setInterval(() =>{
            timer.innerText = t;
            t=t-1;
            display(data,i);
          },1000);
    }).catch(() => console.log('error'));
    

const display = (data,i) => {
  
            if(i<=4){
             quizData = data.questionList[i];
     
          question.innerHTML = quizData.question;
          options1.innerHTML = quizData.option[0];
          options2.innerHTML = quizData.option[1];
          options4.innerHTML = quizData.option[2];
          options3.innerHTML = quizData.option[3];
          correctans = quizData.correctAnswer;
        }
          if(t<0){
            clearInterval(intervalId);
            timer.innerHTML = "";
            container.classList.add('d-none');
            amount.innerHTML = `You Lose`;
        
        }
      }

const clickButton = (option) => {
  option.forEach(element => {
    element.addEventListener('click', (e) =>{
         
          if (e.target.textContent ==  correctans &&i<4){
            amnt += 1000;
             i++;  
             t=30;
             amount.innerHTML = `You won ${amnt}`;
             display(data,i);

            } else if(e.target.textContent == correctans && i==4){
              t=30;
              i++;
              amnt += 1000;
              timer.innerHTML = "";
              intervalId = clearInterval(intervalId)
              amount.innerHTML = `Hurray ! You Have Won ${amnt}`;
              container.classList.add('d-none')

            } else if(e.target.textContent != correctans){
              intervalId = clearInterval(intervalId)
              timer.innerHTML = "";
              container.classList.add('d-none')
              amount.innerHTML = `Wrong Answer ! You Have Won only ${amnt}`;
            }
  });
});
}

}




start.addEventListener('click',()=>{
  start.classList.add('d-none');
  document.getElementById('whole').classList.remove('d-none');
  startGame();
});

