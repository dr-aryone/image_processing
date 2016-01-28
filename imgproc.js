(function(wnd) {
  if (!wnd.imgproc) imgproc = {};

  imgproc.getPixelLocation = function(x,y) {
    return y*imgData.width + x;
  };
  imgproc.getPixel = function (imgData, x, y) {
    var ps = imgproc.getPixelLocation(x,y);
    return {
      r: imgData.data[ps],
      g: imgData.data[ps+1],
      b: imgData.data[ps+2]
    };
  }
})(window);
