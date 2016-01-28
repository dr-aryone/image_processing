
var img = document.querySelector('input#img'),

    // canvases
    base  = document.querySelector('canvas#base'),
    gray  = document.querySelector('canvas#gray'),
    gauss = document.querySelector('canvas#gauss'),
    sobel = document.querySelector('canvas#sobel'),
    
    // contexts
    baseCtx  = base.getContext('2d'),
    grayCtx  = gray.getContext('2d'),
    gaussCtx = gauss.getContext('2d'),
    sobelCtx = sobel.getContext('2d');

// when the user selects an image, upload it to the base canvas
img.onchange = function() {
  var file = img.files[0],
      reader = new FileReader();
  
  reader.onload = function() {
    var dataURL = reader.result,
        tmpImg  = new Image();
    
    tmpImg.onload = function() {
      // set all canvases to match the img dimensions
      base.width  = gray.width  = gauss.width  = sobel.width  = tmpImg.width;
      base.height = gray.height = gauss.height = sobel.height = tmpImg.height;
      
      // draw the image on the canvas
      baseCtx.drawImage(tmpImg, 0, 0);
      
      // kick off the main program
      main();
    };
    tmpImg.src = dataURL;
  };
  reader.readAsDataURL(file);
};

function main() {
  console.log('done!');
}
