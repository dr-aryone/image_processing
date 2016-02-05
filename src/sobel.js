(function(wnd) {
  // requires imgproc.js, but this will allow loading files in any order
  var imgproc = wnd.imgproc || (wnd.imgproc={});
  
  imgproc.sobelKernelX = [
    [-1,  0,  1],
    [-2,  0,  2],
    [-1,  0,  1]
  ];
  imgproc.sobelKernelY = [
    [-1, -2, -1],
    [ 0,  0,  0],
    [ 1,  2,  1]
  ];
  
  imgproc.sobel = function(imgData) {
    
  };
})(window);