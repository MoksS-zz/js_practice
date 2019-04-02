const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio:false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
            
        })
        .catch(err =>{
            console.error('OH NO!!!!', err);
        });
};

function paintToCanavas(){
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video,0,0,width,height);
        let pixels = ctx.getImageData(0,0,width,height);
      
        // pixels = redEffect(pixels);
        pixels =rgbSplit(pixels);
        ctx.putImageData(pixels,0,0);

    },16);
};

function takePhoto() {
    //play sound
    snap.currentTime = 0;
    snap.play();

    //take the data out of the canvas
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    link.href = data;
    link.setAttribute('download','handsome');
    link.innerHTML = `<img src = "${data}" alt = "ух тыж блять, не работает"/>`
    link.textContent = 'Скачать это парашу';
    strip.insertBefore(link, strip.firstChild);
};

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4 ){
            pixels.data[i] = pixels.data[i + 0] + 100; //red
            pixels.data[i + 1] = pixels.data[i + 1] - 50;//green
            pixels.data[i + 2] = pixels.data[i + 2] * 0,5;//blue
    };  
    return pixels;
};

function  rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4 ){
        pixels.data[i - 250] = pixels.data[i + 0]; //red
        pixels.data[i + 200] = pixels.data[i + 1];//green
        pixels.data[i + 250] = pixels.data[i + 2];//blue
    };  
return pixels;
};


 getVideo();

 video.addEventListener('canplay', paintToCanavas);



 