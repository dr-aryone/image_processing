(function(wnd) {
  // requires imgproc.js, but this will allow loading files in any order
  var imgproc = wnd.imgproc || (wnd.imgproc={});
  
  var kernelX = imgproc.sobelKernelX = [
    [-1,  0,  1],
    [-2,  0,  2],
    [-1,  0,  1]
  ];
  var kernelY = imgproc.sobelKernelY = [
    [-1, -2, -1],
    [ 0,  0,  0],
    [ 1,  2,  1]
  ];
  
  imgproc.sobel = function(imgData, range) {
    var kx, ky;
    if (range) {
      var low, high;
      if (range.constructor === Array) { low = range[0]; high = range[1]; }
      else { low = 0; high = range; }
    }
    var xTransform = imgproc.convolution(imgData, kernelX);
    return imgproc.convolution(xTransform, kernelY, true, true, [-255, 255]);
  };
})(window);