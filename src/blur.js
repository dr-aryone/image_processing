(function(wnd) {
  // requires imgproc.js, but this will allow loading files in any order
  var imgproc = wnd.imgproc || (wnd.imgproc={});
  
  /**
   *
   */
  imgproc.gaussianBlur = function(imgData) {
    var resultData = new ImageData(imgData.width, imgData.height);
  };

  /**
   *
   */
  imgproc.gaussianKernel = function(area, deviation) {
    var r = [],
        g = [],
        b = [],
        kernel = [];
    for (var y=0; y<area.length; y++) {
      for (var x=0; x<area[y].length; x++) {
        var pixel = area[y][x] 
        r.push(pixel.r);
        g.push(pixel.g);
        b.push(pixel.b);
      }
    }
    if (!deviation) {
      deviation = new imgproc.Pixel(
        imgproc.standardDeviation(r),
        imgproc.standardDeviation(g),
        imgproc.standardDeviation(b)
      );
    }
  };
  /**
   * @see {@link https://en.wikipedia.org/wiki/Gaussian_blur|Gaussian Blur at Wikipedia (en)}
   */
  imgproc.gaussianDistribution = function(x, y, d) {
    
  };

  /**
   * A simple convolution using a constant-magnitude kernel to produce a box (mean) blur.
   *
   * @function boxBlur
   * @memberof ImgProc
   * @param {external:ImageData} imgData
   * @returns {external:ImageData} - a copy of the original with the box blur applied
   */
  imgproc.boxBlur = function(imgData, kernel_size) {
    kernel_size = kernel_size || imgproc.defaults.kernel_size;
    var kernel = imgproc.boxKernel(kernel_size);
    console.log(kernel);
    return imgproc.convolution(imgData, kernel, kernel_size);
  };
  imgproc.boxKernel = function(size) {
    size = size || imgproc.defaults.kernel_size; 
    return (new Array(size)).fill((new Array(size)).fill(new imgproc.Pixel(1)));
  };
})(window);

