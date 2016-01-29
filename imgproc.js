(function(wnd) {
  if (!wnd.imgproc) var imgproc = wnd.imgproc = {};

  imgproc.getPixelLocation = function(x,y) {
    return (y*imgData.width + x)*4; // if pixel (x,y) is the nth pixel, the pixel location is n*4, since each pixel has 4 values (RGBA)
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
