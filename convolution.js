(function(wnd) {
  // requires imgproc.js, but this will allow loading files in any order
  if (!wnd.imgproc) imgproc = {};
  imgproc.defaults.kernel_size = 5;

  imgproc.convolution = function(ctx, kernel_source, fn, size) {
    var imgData = ctx.getImageData(),
        resultData = new ImageData(imgData.width, imgData.height),
        size = size || imgproc.defaults.kernel_size,
        half_size = Math.floor(size/2);
    // loop through every pixel
    for (var y=0; y<imgData.height; y++) {
      for (var x=0; x<imgData.width; x++) {
        var kernel, area;
        
        // find the image area to be affected by our kernel
        area = {
          left: x-half_size,
          top:  y-half_size,
          right:  x+half_size,
          bottom: y+half_size,
          center: {x: x, y: y},
          pixels: []
        };
        
        // clip area at image edges
        if (area.left < 0) area.left = 0;
        if (area.top  < 0) area.top = 0;
        if (area.right  >= imgData.width) area.right = imgData.width;
        if (area.bottom >= imgData.height) area.bottom = imgData.height;
        
        // load up the area's pixels
        for (var ay=area.top; ay<=area.bottom; ay++) {
          var arow = [];
          for (var ax=area.left; ax<=area.right; ax++) {
            arow.push(getPixel(imgData, ax, ay));
          }
          area.pixels.push(arow);
        }
        
        // figure out the kernel if it needs figuring
        if (kernel_source.constructor === Function) kernel = kernel_source(area);
        else kernel = kernel_source;
        
        var area_sums = {r:0, g:0, b:0};
        var kernel_sum = {r:0, g:0, b:0};
        for (var j=area.top; j<=area.bottom; j++) {
          for (var i=area.left; i<=area.right; i++) {
            // multiply each color channel of this pixel by its weight
            area_sum.r += area.pixels[j][i].r * kernel[j][i].r;
            area_sum.g += area.pixels[j][i].g * kernel[j][i].g;
            area_sum.b += area.pixels[j][i].b * kernel[j][i].b;
            kernel_sum.r += kernel[j][i].r;
            kernel_sum.g += kernel[j][i].g;
            kernel_sum.b += kernel[j][i].b;
          }
        }
        
        // find averages for each channel
        var area_avg = {
          r: Math.floor(area_sum.r / kernel_sum.r),
          g: Math.floor(area_sum.g / kernel_sum.g),
          b: Math.floor(area_sum.b / kernel_sum.b)
        };
        
        // store convolved pixel in result imageData
        var pixloc = imgproc.getPixelLocation(x,y); // see imgproc.js
        resultData.data[pixloc]   = area_avg.r;
        resultData.data[pixloc+1] = area_avg.g;
        resultData.data[pixloc+2] = area_avg.b;
      }
    }

    // return the resulting imageData object
    return resultData;
  };

})(window);
