"use strict!";
document.addEventListener("DOMContentLoaded",function(){
    //Constant Values
    const LEVEL_MONEY_VALUES = [100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,1000000];
    const STRING_GENERATION_LENGTH = 6;

    //Variables
    let currentLevel = 1;
    let questionText = 0;
    let answerTexts = 0;
    let answerButtons = 0;
    let rightAnswerIndex = 0;

    //Write functions for encoding and decoding
    function caesarEncode(str, key){
        return str.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65 + key ) % 26 + 65));
    }
    function caesarDecode(str,key){
        return str.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65 - key ) % 26 + 65));
    }

    //Function for generating random string
    function generateRandomString(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

     
     function setLevelData(){
         //Setting Level Data
         let levelData = "";
         for(let i = 14; i >= 0; i--){
             let initialSpace = i>=9? "" : "&nbsp&nbsp";
             levelData += `<div class='level'>${initialSpace + (i+1)} $ ${LEVEL_MONEY_VALUES[i]}</div>`;
            }
        document.getElementById("levelBar").innerHTML = levelData;
    }

    function drawLevelData(){
        if(currentLevel>1){
            document.getElementsByClassName("level")[16-currentLevel].classList.remove("currentLevel");
        }
        document.getElementsByClassName("level")[15-currentLevel].classList.add("currentLevel");
    }
    
    function bindViews(){
        // Binding Data
        questionText = document.querySelector("#question .boxPhrase");
        answerButtons = document.querySelectorAll(".answerOption");
        answerTexts = document.querySelectorAll(".answerOption .boxPhrase");
    }
    
    function setButtonClickListeners(){
        for(let i = 0; i < 4; i++){
                answerButtons[i].addEventListener('click',function(){
                    if(currentLevel == 16){
                        alert(`Congratulations: You Won $${getMoneyWon()}`);
                    }else{
                        if(this.getAttribute("data-index") == rightAnswerIndex){
                            currentLevel++;
                            generateNextQuestion();
                        }else{
                            alert(`GameOver: You Won $${getMoneyWon()}`);
                            location.reload();
                        }
                    }
                },false);
            }
    }
    
    // Function for generating next Question
     function generateNextQuestion(){
        const key = Math.ceil(Math.random() * 26);
        const inputString = generateRandomString(STRING_GENERATION_LENGTH);
        const outputString = caesarEncode(inputString,key);
        rightAnswerIndex = Math.floor(Math.random()*4);
        console.log(rightAnswerIndex);
        questionText.innerHTML = `Encode '${inputString}' using CaesarCipher with Key ${key}`;

        for(let i = 0; i < 4; i++){
            answerTexts[i].innerHTML = generateRandomString(STRING_GENERATION_LENGTH);
        }
        answerTexts[rightAnswerIndex].innerHTML = outputString;
        drawLevelData();
    }

    function getMoneyWon(){
        if(currentLevel == 16){
            return LEVEL_MONEY_VALUES[14];
        }else if(currentLevel >10){
            return LEVEL_MONEY_VALUES[9];
        }else if(currentLevel >5){
            return LEVEL_MONEY_VALUES[4];
        }else{
            return 0;
        }
    }

    // Game Starts Here
    setLevelData();
    bindViews();
    setButtonClickListeners();
    generateNextQuestion();

},false);