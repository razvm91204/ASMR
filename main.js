const pause = document.getElementById('play-btn');
const favourite = document.getElementById('star-btn');
const save = document.getElementById('save-btn');
const presets = document.getElementById('heart-btn');

let isPaused = false;
const soundButtons = Array.from(document.getElementsByClassName('icon'));
const volume = {};
let soundsState = {};
let soundPresets = JSON.parse(localStorage.getItem('sound-presets'))?? {};

soundButtons.forEach((each, index)=>{
    let sound = document.getElementsByClassName('sound')[index];
    let audio = document.getElementsByClassName('audio')[index];
    let volume = document.getElementById(`${each.id}-volume`);
    soundsState[each.id]={
        active:false,
        volume:1,
    };
    volume.addEventListener('input', (e)=>{
        audio.volume=e.target.value/100;
        soundsState[each.id].volume=e.target.value/100;
    })

    audio.addEventListener("timeupdate", ()=>{
        if(audio.currentTime > audio.duration - 0.44){
            audio.currentTime = 0;
        }
    })

    each.addEventListener('click', (e)=>{
        sound.classList.toggle('inactive');
        if(sound.classList.contains('inactive')){
            soundsState[each.id].active=false;
            audio.pause();
            audio.currentTime=0;
            if(countActives()>0 && isPaused == false)
                document.getElementById('play-img').src='icons/pause.svg';
            else
                document.getElementById('play-img').src='icons/play.svg';
            return;
        }
        soundsState[each.id].active=true;
        if(countActives()>0 && isPaused == false)
            document.getElementById('play-img').src='icons/pause.svg';
        else
            document.getElementById('play-img').src='icons/play.svg';
        if(isPaused==false)
            audio.play();
    })
})

// localStorage.removeItem('sound-presets');

function countActives(){
    let i = 0;
    soundButtons.forEach((e)=>{
        if(soundsState[e.id].active==true)
            i++;
    })
    return i;
}

function reloadSounds(soundPreset){
    soundsState=soundPreset;
    isPaused=false;
    document.getElementById('play-img').src='icons/pause.svg';
    soundButtons.forEach((each,index)=>{
        let sound = document.getElementsByClassName('sound')[index];
        let audio = document.getElementsByClassName('audio')[index];
        let volume = document.getElementById(`${each.id}-volume`);
        audio.volume=soundsState[each.id].volume;
        volume.value=soundsState[each.id].volume*100;
        if(soundsState[each.id].active){
            audio.play();
            sound.classList.remove('inactive');
        }
        else{
            audio.pause();
            audio.currentTime=0;
            sound.classList.add('inactive');
        }
        
    })
}

function playSounds(){
    const sounds = Array.from(Object.keys(soundsState));
    sounds.forEach((e, index)=>{
        let audio = document.getElementsByClassName('audio')[index];
        if(isPaused){
            audio.pause();
            return;
        }
        else
            if(soundsState[e].active){
                audio.play();
            }
    })
}

pause.addEventListener('click', () => { 
    if(isPaused){
        if(countActives()>0){
            isPaused=false;
            document.getElementById('play-img').src='icons/pause.svg';
        }
    }
    else{
        document.getElementById('play-img').src='icons/play.svg';
        isPaused=true;
    }
    playSounds();
})


favourite.addEventListener('click', ()=>{
    document.getElementById('modal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.getElementById('modal2').classList.remove('active');
})

presets.addEventListener('click', ()=>{
    if(document.getElementById('modal2').classList.contains('active'))
        return;
    reloadPresets();
    document.getElementById('overlay').classList.add('active');
    document.getElementById('modal').classList.remove('active');
    document.getElementById('modal2').classList.add('active');

})

document.getElementById('overlay').addEventListener('click', ()=>{
    backToMain();
})

function backToMain(){
    document.getElementById('modal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('modal2').classList.remove('active');
    document.getElementById('preset-name').value = '';
}

save.addEventListener('click', ()=>{
    let name = document.getElementById('preset-name').value;
    if(name.trim()=='')
        return;
    let i = 1;
    let changedName=`${name}`
    if(soundPresets[name]!=undefined)
        while(soundPresets[changedName]!=undefined){
            changedName=`${name} (${i})`
            i++;
        }
    if(name!=changedName)
        name=changedName;
    soundPresets[name]=soundsState;
    document.getElementById('sound-title').textContent=name;
    localStorage.setItem('sound-presets', JSON.stringify(soundPresets));
    reloadPresets();
})

function reloadPresets(){
    document.getElementById('presets').replaceChildren([]);
    if(Array.from(Object.keys(soundPresets)).length==0){
        document.getElementById('modal2').style.height="80px";
        let span = document.createElement('span');
        span.textContent="No favorites saved yet."
        document.getElementById('presets').appendChild(span);
        return;
    }
    document.getElementById('modal2').style.height="250px";

    Array.from(Object.keys(soundPresets)).map((e)=>{
        let div = document.createElement('div');
        let divContainer = document.createElement('div');
        div.textContent=e;
        let deleteBtn = document.createElement('button');
        let playBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        playBtn.classList.add('play-btn');
        deleteBtn.addEventListener('click', ()=>{
            delete soundPresets[e];
            localStorage.setItem('sound-presets', JSON.stringify(soundPresets));
            reloadPresets();
        })
        div.classList.add('preset');
        let img = document.createElement('img');
        let img2 = document.createElement('img');
        img.src='icons/trash.svg';
        deleteBtn.appendChild(img);
        div.appendChild(deleteBtn);
        img2.src='icons/play.svg';
        playBtn.appendChild(img2);
        playBtn.addEventListener('click', ()=>{
            reloadSounds(soundPresets[e]);
            document.getElementById('sound-title').textContent=e;
            backToMain();
        })
        divContainer.appendChild(playBtn);
        divContainer.appendChild(deleteBtn);
        divContainer.classList.add('btn-container')
        div.appendChild(divContainer);
        document.getElementById('presets').appendChild(div);
    })
}