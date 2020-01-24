const getRandomIntInclusive = (min, max)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const imgs = ['./images/rock.png','./images/scissors.png','./images/paper.png'];
let countPlayer = 0,
    countBot = 0,
    chooseNow = '',
    isChoose = false;

document.addEventListener('DOMContentLoaded', ()=>{
    const choseItem = document.querySelectorAll('.choose img'),
        playerArm = document.getElementById('player'),
        botArm = document.getElementById('bot'),
        resultElemnt = document.querySelector('.result-wrapper');

    const result = (WhoWiner)=>{
        if(WhoWiner == 'player'){
            resultElemnt.children[0].textContent = 'Победа!';
            resultElemnt.children[0].style.color = 'green';
        }else if(WhoWiner == 'bot'){
            resultElemnt.children[0].textContent = 'Поражение!';
            resultElemnt.children[0].style.color = 'red';
        }else{
            resultElemnt.children[0].textContent = 'Ничья!';
            resultElemnt.children[0].style.color = 'yellow';
        }
        resultElemnt.style.display = 'flex'
    };

    choseItem.forEach(element=>{
        element.addEventListener('click', ()=>{
            choseItem.forEach(element=>{
                element.removeAttribute('style');
            });
            element.style.border = '1px solid #019b36';
            isChoose = true;
            chooseNow = element.getAttribute('src');
            chooseNow = `./${chooseNow}`;
        })
    });
    document.getElementById('play-btn').addEventListener('click', ()=>{
        resultElemnt.style.display = 'none';
        if(!isChoose){
            alert('Выберите чем будете играть');
        }else{
            playerArm.src = './images/rock.png';
            botArm.src = './images/rock.png';
            Promise.all([
                new Promise(resolve => {
                    playerArm.style.animation = '1s infinite 0s animationShakePlayer';
                    setTimeout(()=>{
                        playerArm.style.animation = '';
                        playerArm.src = `${chooseNow}`;
                        resolve(imgs.indexOf(chooseNow));
                    },3000)
                }),
                new Promise(resolve => {
                    const b = +getRandomIntInclusive(1,3);
                    botArm.style.animation = '1s infinite 0s animationShakeBot';
                    setTimeout(()=>{
                        botArm.style.animation = '';
                        botArm.src = `${imgs[b - 1]}`;
                        resolve(b - 1);
                    },3000)
                })
            ]).then((d)=>{
                if(d[0] == d[1]){
                    result(`tie`);
                }
                else if(d[0] == 0 && d[1] == 2 || d[0] == 1 && d[1] == 0 || d[0] == 2 && d[1] == 1){
                    document.getElementById('score-bot').innerText = `${++countBot}`;
                    result(`bot`);
                }else{
                    document.getElementById('score-player').innerText = `${++countPlayer}`;
                    result(`player`);
                }
            });
        }
    });
});