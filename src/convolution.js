(function(wnd) {
  // requires imgproc.js, but this will allow loading files in any order
  var imgproc = wnd.imgproc || (wnd.imgproc={});
  if (!imgproc.defaults) imgproc.defaults = {};
  imgproc.defaults.kernel_size = 5;

  imgproc.convolution = function(source, kernel_source, size, grayscale, normalize, normalizeBounds) {
    var imgData;
    if (source.constructor === CanvasRenderingContext2D)
      imgData = ctx.getImageData();
    else if (source.constructor === ImageData)
      imgData = source;
    else throw 'Convolution Error: image source must be either a CanvasRenderingContext2D or an ImageData; received '+source.constructor.name;
    
    if (grayscale) console.log('grayscale convolution');
    if (normalize) {
      console.log(imgData);
      return imgData;
    }
    wnd.CONV_IMG_DATA = imgData;
    var resultData = new ImageData(imgData.width, imgData.height),
        // if a size was specified, use that; if not, if a kernel array was provided, use its length; if neither, use a default
        size = size || (kernel_source.constructor === Array ? kernel_source.length : imgproc.defaults.kernel_size),
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
        if (area.right  >= imgData.width) area.right = imgData.width-1;
        if (area.bottom >= imgData.height) area.bottom = imgData.height-1;
        
        // load up the area's pixels
        for (var ay=area.top; ay<=area.bottom; ay++) {
          var arow = [];
          for (var ax=area.left; ax<=area.right; ax++) {
            arow.push(imgproc.getPixel(imgData, ax, ay));
          }
          area.pixels.push(arow);
        }
        
        // figure out the kernel if it needs figuring
        if (kernel_source.constructor === Function) kernel = kernel_source(area);
        else kernel = kernel_source;
        
        // if we are in grayscale mode but we got a kernel
        // of Pixels, assume the pixels are gray and extract
        // the red channel to be used as a grayscale kernel 
        if (kernel[0][0].constructor === imgproc.Pixel && grayscale) {
          for (var i=0; i<kernel.length; i++)
            for (var j=0; j<kernel[i].length; j++)
              kernel[i][j] = kernel[i][j].r;
        }
        // if we're not in grayscale mode but we got a kernel
        // of numbers, convert the numbers to Pixels
        else if (kernel[0][0].constructor === Number && !grayscale) {
          for (var i=0; i<kernel.length; i++)
            for (var j=0; j<kernel[i].length; j++)
              kernel[i][j] = new imgproc.Pixel(kernel[i][j]);
        }
        
        var area_sum = (grayscale ? 0 : new imgproc.Pixel());
        var kernel_sum = (grayscale ? 0 : new imgproc.Pixel());;
        for (var j=0; j<area.pixels.length; j++) {
          for (var i=0; i<area.pixels[0].length; i++) {
            // if grayscale, use the red channel and multiply by kernel values
            if (grayscale) {
              var apixel = area.pixels[j][i].r,
                  kpixel = kernel[j][i];
              area_sum += apixel * kpixel;
              kernel_sum += kpixel;
            }
            // else, multiply each color channel of this pixel by its kernel values
            else {
              var apixel = area.pixels[j][i],
                  kpixel = kernel[j][i];
              area_sum.r += apixel.r * kpixel.r;
              area_sum.g += apixel.g * kpixel.g;
              area_sum.b += apixel.b * kpixel.b;
              kernel_sum.r += kpixel.r;
              kernel_sum.g += kpixel.g;
              kernel_sum.b += kpixel.b;
            }
          }
        }
        
        var area_avg;
        // if grayscale, find average
        if (grayscale)
          area_avg = area_sum / kernel_sum;
        // else, find average for each channel
        else
          area_avg = new imgproc.Pixel(
            (area_sum.r / kernel_sum.r),
            (area_sum.g / kernel_sum.g),
            (area_sum.b / kernel_sum.b)
          );
        
        if (normalize) {
          var low, high;
          if (normalizeBounds) { low = normalizeBounds[0]; high = normalizeBounds[1]; }
          else { low = 0; high = 255; }
          function normalizeFn(n) { return Math.round( (n - low) / (high - low) * 255); }
          if (grayscale) area_avg = normalizeFn(area_avg);
          else {
            area_avg.r = normalizeFn(area_avg.r);
            area_avg.g = normalizeFn(area_avg.g);
            area_avg.b = normalizeFn(area_avg.b);
          }
        }
        
        if (grayscale) area_avg = new imgproc.Pixel(Math.floor(area_avg));
        else area_avg = new imgproc.Pixel(
          Math.floor(area_avg.r),
          Math.floor(area_avg.g),
          Math.floor(area_avg.b)
        );
        
        
        // store convolved pixel in result imageData
        var pixloc = imgproc.getPixelLocation(imgData,x,y); // see imgproc.js
        resultData.data[pixloc]   = Math.round(area_avg.r);
        resultData.data[pixloc+1] = Math.round(area_avg.g);
        resultData.data[pixloc+2] = Math.round(area_avg.b);
        resultData.data[pixloc+3] = 255;
      }
    }

    // return the resulting imageData object
    return resultData;
  };

})(window);
