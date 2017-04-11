(function() {
    var Uploadable,
        __bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; },
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }

            function ctor() { this.constructor = child; }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype; return child; },
        __hasProp = {}.hasOwnProperty;

    Uploadable = (function(_super) {
        __extends(Uploadable, _super);

        function Uploadable(_at_handleSave) {
            this.handleSave = _at_handleSave;
            this.getPixelData = __bind(this.getPixelData, this);
            this.render = __bind(this.render, this);
            this.handleUploadClick = __bind(this.handleUploadClick, this);
            this.resizeImage = __bind(this.resizeImage, this);
            this.storeNode = __bind(this.storeNode, this);
            this.node = null;
            this.resize_width = 50;
            this.resize_height = 50;
            this.preverse_ratio = true;
            this.try_png = false;
            this.png_limit = 2200;
            this.image_preview = new ImagePreview();
            this.pixel_chars = this.image_preview.pixel_chars;
            this;
        }

        Uploadable.prototype.storeNode = function(node) {
            return this.node = node;
        };

        Uploadable.prototype.scaleHalf = function(image) {
            var canvas, ctx;
            canvas = document.createElement("canvas");
            canvas.width = image.width / 2;
            canvas.height = image.height / 2;
            ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            return canvas;
        };

        Uploadable.prototype.resizeImage = function(file, width, height, cb) {
            var image;
            image = new Image();
            image.onload = (function(_this) {
                return function() {
                    var canvas, canvas_quant, ctx, image_base64uri, optimizer, quant, _ref;
                    _this.log("Resize image loaded");
                    canvas = document.createElement("canvas");
                    if (_this.preverse_ratio) {
                        _ref = _this.image_preview.calcSize(image.width, image.height, width, height), canvas.width = _ref[0], canvas.height = _ref[1];
                    } else {
                        canvas.width = width;
                        canvas.height = height;
                    }
                    ctx = canvas.getContext("2d");
                    ctx.fillStyle = "#FFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    while (image.width > width * 2) {
                        image = _this.scaleHalf(image);
                    }
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    if (_this.try_png) {
                        quant = new RgbQuant({
                            colors: 128,
                            method: 1
                        });
                        quant.sample(canvas);
                        quant.palette(true);
                        canvas_quant = drawPixels(quant.reduce(canvas), width);
                        optimizer = new CanvasTool.PngEncoder(canvas_quant, {
                            bitDepth: 8,
                            colourType: CanvasTool.PngEncoder.ColourType.TRUECOLOR
                        });
                        image_base64uri = "data:image/png;base64," + btoa(optimizer.convert());
                        if (image_base64uri.length > _this.png_limit) {
                            _this.log("PNG too large (" + image_base64uri.length + " bytes), convert to jpg instead");
                            image_base64uri = canvas.toDataURL("image/jpeg", 0.8);
                        }
                    } else {
                        image_base64uri = canvas.toDataURL("image/jpeg", 0.8);
                    }
                    _this.log("Size: " + image_base64uri.length + " bytes");
                    return cb(image_base64uri, canvas.width, canvas.height);
                };
            })(this);
            image.onerror = (function(_this) {
                return function(e) {
                    _this.log("Image upload error", e);
                    Page.cmd("wrapperNotification", ["error", "Invalid image, only jpg format supported"]);
                    return cb(null);
                };
            })(this);
            if (file.name) {
                return image.src = URL.createObjectURL(file);
            } else {
                return image.src = file;
            }
        };

        Uploadable.prototype.handleUploadClick = function(e) {
            var input, script;
            this.log("handleUploadClick", e);
            script = document.createElement("script");
            script.src = "js-external/pngencoder.js";
            document.head.appendChild(script);
            input = document.createElement('input');
            document.body.appendChild(input);
            input.type = "file";
            input.style.visibility = "hidden";
            input.onchange = (function(_this) {
                return function(e) {
                    _this.log("Uploaded");
                    return _this.resizeImage(input.files[0], _this.resize_width, _this.resize_height, function(image_base64uri, width, height) {
                        _this.log("Resized", width, height);
                        if (image_base64uri) {
                            _this.handleSave(image_base64uri, width, height);
                        }
                        return input.remove();
                    });
                };
            })(this);
            input.click();
            return false;
        };

        Uploadable.prototype.render = function(body) {
            return h("div.uploadable", h("a.icon.icon-upload", {
                href: "#Upload",
                onclick: this.handleUploadClick
            }), body());
        };

        Uploadable.prototype.getPixelData = function(data) {
            var b, color_db, colors, colors_next_id, g, hex, i, pixels, r, _i, _ref;
            color_db = {};
            colors = [];
            colors_next_id = 0;
            pixels = [];
            for (i = _i = 0, _ref = data.length - 1; _i <= _ref; i = _i += 4) {
                r = data[i];
                g = data[i + 1];
                b = data[i + 2];
                r = Math.round(r / 17);
                g = Math.round(g / 17);
                b = Math.round(b / 17);
                hex = Number(0x1000 + r * 0x100 + g * 0x10 + b).toString(16).substring(1);
                if (i === 0) {
                    this.log(r, g, b, data[i + 3], hex);
                }
                if (!color_db[hex]) {
                    color_db[hex] = this.pixel_chars[colors_next_id];
                    colors.push(hex);
                    colors_next_id += 1;
                }
                pixels.push(color_db[hex]);
            }
            return [colors, pixels];
        };

        Uploadable.prototype.getPreviewData = function(image_base64uri, target_width, target_height, cb) {
            var image;
            image = new Image();
            image.src = image_base64uri;
            return image.onload = (function(_this) {
                return function() {
                    var back, canvas, ctx, image_data, image_height, image_width, pixeldata, quant, _ref;
                    image_width = image.width;
                    image_height = image.height;
                    canvas = document.createElement("canvas");
                    _ref = _this.image_preview.calcSize(image.width, image.height, target_width, target_height), canvas.width = _ref[0], canvas.height = _ref[1];
                    ctx = canvas.getContext("2d");
                    ctx.fillStyle = "#FFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    while (image.width > target_width * 2) {
                        image = _this.scaleHalf(image);
                    }
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    quant = new RgbQuant({
                        colors: 16,
                        method: 1
                    });
                    quant.sample(canvas);
                    quant.palette(true);
                    canvas = drawPixels(quant.reduce(canvas), canvas.width);
                    ctx = canvas.getContext("2d");
                    image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    pixeldata = _this.getPixelData(image_data.data);
                    back = [image_width, image_height, pixeldata[0].join(""), pixeldata[1].join("")].join(",");
                    _this.log("Previewdata size:", back.length);
                    return cb(back);
                };
            })(this);
        };

        return Uploadable;

    })(Class);

    window.Uploadable = Uploadable;

}).call(this);