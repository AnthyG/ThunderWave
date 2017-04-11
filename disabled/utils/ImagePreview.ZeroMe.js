(function() {
    var ImagePreview,
        __bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; },
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }

            function ctor() { this.constructor = child; }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype; return child; },
        __hasProp = {}.hasOwnProperty;

    ImagePreview = (function(_super) {
        __extends(ImagePreview, _super);

        function ImagePreview() {
            this.setPreviewData = __bind(this.setPreviewData, this);
            this.width = 0;
            this.height = 0;
            this.preview_data = "";
            this.pixel_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        }

        ImagePreview.prototype.getSize = function(target_width, target_height) {
            return this.calcSize(this.width, this.height, target_width, target_height);
        };

        ImagePreview.prototype.calcSize = function(source_width, source_height, target_width, target_height) {
            var height, width;
            width = target_width;
            height = width * (source_height / source_width);
            if (height > target_height) {
                height = target_height;
                width = height * (source_width / source_height);
            }
            return [Math.round(width), Math.round(height)];
        };

        ImagePreview.prototype.setPreviewData = function(_at_preview_data) {
            var colors, pixels, _ref;
            this.preview_data = _at_preview_data;
            return _ref = this.preview_data.split(","), this.width = _ref[0], this.height = _ref[1], colors = _ref[2], pixels = _ref[3], _ref;
        };

        ImagePreview.prototype.getPreviewUri = function(target_width, target_height) {
            var b, back, canvas, color, color_codes, colors, ctx, di, g, height, hex, i, image_data, pixel, pixels, r, width, _i, _j, _len, _len1, _ref, _ref1;
            if (target_width == null) {
                target_width = 10;
            }
            if (target_height == null) {
                target_height = 10;
            }
            this.logStart("Render");
            _ref = this.preview_data.split(","), this.width = _ref[0], this.height = _ref[1], colors = _ref[2], pixels = _ref[3];
            _ref1 = this.getSize(target_width, target_height), width = _ref1[0], height = _ref1[1];
            colors = colors.match(/.{3}/g);
            pixels = pixels.split("");
            canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
            image_data = ctx.createImageData(width, height);
            color_codes = {};
            for (i = _i = 0, _len = colors.length; _i < _len; i = ++_i) {
                color = colors[i];
                color_codes[this.pixel_chars[i]] = color;
            }
            di = 0;
            for (_j = 0, _len1 = pixels.length; _j < _len1; _j++) {
                pixel = pixels[_j];
                hex = color_codes[pixel];
                r = parseInt(hex[0], 16) * 17;
                g = parseInt(hex[1], 16) * 17;
                b = parseInt(hex[2], 16) * 17;
                image_data.data[di] = r;
                image_data.data[di + 1] = g;
                image_data.data[di + 2] = b;
                image_data.data[di + 3] = 255;
                di += 4;
            }
            ctx.putImageData(image_data, 0, 0);

            /*
            		canvas2 = document.createElement("canvas")
            		canvas2.width = width*3
            		canvas2.height = height*3
            		ctx = canvas2.getContext('2d')
            		ctx.filter = "blur(1px)"
            		ctx.drawImage(canvas, 1, 0, canvas.width*3, canvas.height*3)
            		ctx.drawImage(canvas, 0, 1, canvas.width*3, canvas.height*3)
            		ctx.drawImage(canvas, 0, 0, canvas.width*3, canvas.height*3)
             */
            back = canvas.toDataURL("image/png");
            this.logEnd("Render");
            return back;
        };

        return ImagePreview;

    })(Class);

    window.ImagePreview = ImagePreview;

}).call(this);