(function(wnd) {
  if (!wnd.imgproc) imgproc = {};
  imgproc.defaults.kernel_size = 5;

  imgproc.convolution = function(ctx, grid, fn, size) {
    var imgData = ctx.getImageData(),
        size = size || imgproc.defaults.kernel_size;
    for (var y=0; y<imgData.height; y++) {
      for (var x=0; x<imgData.width; x++) {
        var kernel, area, aw, ah, half_size;
        area = [];
        half_size = Math.floor(size/2);
        aw = (x < half_size+1 ? x+half_size : (x+half_size+1 > imgData.width ? half_size + (imgData.width-x) : size));
        ah = (y < half_size+1 ? y+half_size : (y+half_size+1 > imgData.height ? half_size + (imgData.height-y) : size));
        p  = getPixel(imgData, x, y);
        for (var i=(x<half_size+1? 0 :  ))
        if (grid.constructor == Function) {
          var if (leg) {
            
          }
        }
      }
    }
  };

  function getPixel(imgData, x, y) {
    var px = y*imgData.width + x;
    return {
      r: imgData.data[px],
      g: imgData.data[px+1],
      b: imgData.data[px+2]
    };
  }
})(window);
