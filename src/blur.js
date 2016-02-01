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
  imgproc.gaussianKernel = function(area) {
    var r = [],
        g = [],
        b = [],
        kernel = [],
        deviation;
    for (var y=0; y<area.length; y++) {
      for (var x=0; x<area[y].length; x++) {
        var pixel = area[y][x] 
        r.push(pixel.r);
        g.push(pixel.g);
        b.push(pixel.b);
      }
    }
    deviation = new imgproc.Pixel(
      imgproc.standardDeviation(r),
      imgproc.standardDeviation(g),
      imgproc.standardDeviation(b)
    );
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
    return imgproc.convolution(imgData, imgproc.boxKernel(kernel_size), kernel_size);
  };
  imgproc.boxKernel = function(size) {
    size = size || imgproc.defaults.kernel_size; 
    return (new Array(size)).fill((new Array(size)).fill(1));
  };
})(window);

