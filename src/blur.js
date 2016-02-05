(function(wnd) {
  // requires imgproc.js, but this will allow loading files in any order
  var imgproc = wnd.imgproc || (wnd.imgproc={});
  
  /**
   *
   */
  imgproc.gaussianBlur = function(imgData, deviation, size) {
    var kernelFn;
    if (deviation)
      kernelFn = function(area){ return gaussianKernel(area, deviation); };
    else
      kernelFn = gaussianKernel;
    return imgproc.convolution(imgData, kernelFn, size);
  };

  /**
   *
   */
  var do_log = 0;
  function gaussianKernel(area, deviation) {
    var r = [],
        g = [],
        b = [],
        kernel = [],
        y_size = area.pixels.length,
        y_half_size = Math.floor(y_size/2),
        x_size = area.pixels[0].length,
        x_half_size = Math.floor(x_size/2);

    for (var y=0; y<y_size; y++) {
      for (var x=0; x<x_size; x++) {
        var pixel = area.pixels[y][x];
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
    else if (deviation.constructor === Number) {
      deviation = new imgproc.Pixel(deviation);
    }
    for (var y=0; y<y_size; y++) {
      kernel_row = [];
      for (var x=0; x<x_size; x++) {
        gaussianDistribution(x-x_half_size, y-y_half_size, deviation)
        kernel_row.push(new imgproc.Pixel(
          gaussianDistribution(x-x_half_size, y-y_half_size, deviation.r),
          gaussianDistribution(x-x_half_size, y-y_half_size, deviation.g),
          gaussianDistribution(x-x_half_size, y-y_half_size, deviation.b)
        ));
      }
      kernel.push(kernel_row);
    }  
    return kernel;
  }
  imgproc.gaussianKernel = gaussianKernel;

  /**
   * @see {@link https://en.wikipedia.org/wiki/Gaussian_blur|Gaussian Blur at Wikipedia (en)}
   */
  function gaussianDistribution(x, y, d) {
    return (1/(2*Math.PI*d*d)) * Math.pow(Math.E, -(x*x + y*y)/(2*d*d));
  }
  imgproc.gaussianDistribution = gaussianDistribution;

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
    return imgproc.convolution(imgData, kernel, kernel_size);
  };
  imgproc.boxKernel = function(size) {
    size = size || imgproc.defaults.kernel_size; 
    return (new Array(size)).fill((new Array(size)).fill(new imgproc.Pixel(1)));
  };
})(window);

