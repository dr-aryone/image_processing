(function(wnd) {
  // requires imgproc.js, but this will allow loading files in any order
  var imgproc = wnd.imgproc || (wnd.imgproc={});
  
  imgproc.grayscale = function(imgData, moreGreen) {
    var resultData = new ImageData(imgData.width, imgData.height);
    for (var n=0; n<imgData.data.length; n+=4) {
      var grayColor;
      if (moreGreen) grayColor = (imgData.data[n] + imgData.data[n+1]*2 + imgData.data[n+2])/4;
      else grayColor = (imgData.data[n] + imgData.data[n+1] + imgData.data[n+2])/3;
      resultData.data.fill(grayColor, n, n+3);
      resultData.data[n+3] = 255;
    }
    return resultData;
  };
})(window);
