const backgroundGm = document.querySelector('.backgorund-gm');
const personGm = document.querySelector('.person-gm');

let position = 0;

let isJunping = false;

function handlerKeyUp(event){
    if(event.keyCode === 32){
        if(!isJunping){
            console.log("Espaço apertado");
            jump();
        }
    }
}

function jump(){

    isJunping = true;

    let upInterval = setInterval(() => {
        
        if(position >= 150){

            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <=0){
                    clearInterval(downInterval);
                    isJunping = false;
                } else {
                    position -= 20;
                    personGm.style.bottom = position + 'px';
                }
            }, 40);

        } else {
            position += 20;
            personGm.style.bottom = position + 'px';
        }
        

    }, 20);
}

function createEnemy(){
    const cactus = document.createElement('div');

    let cactusPosition = 1200;
    let randomTime = Math.floor(Math.random() * 10000) + 6000 ;

    cactus.classList.add('cactus');
    backgroundGm.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if(cactusPosition < -100) {
            clearInterval(leftInterval);
            backgroundGm.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over"> Game Over </h1> <p class="emoji-over"> &#128546;</p>'
        } else {
            cactusPosition -= 6;
            cactus.style.left = cactusPosition + 'px';
        }

    }, 30);

    setInterval(createEnemy, randomTime);
}

createEnemy();
document.addEventListener('keyup', handlerKeyUp);