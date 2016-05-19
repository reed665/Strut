define(["./ComponentView", './Mixers'],
	function(ComponentView, Mixers) {

		/**
		 * @class ImageView
		 * @augments ComponentView
		 */
		return ComponentView.extend({
			className: "component imageView",
			tagName: "div",

			/**
			 * Initialize Image component view.
			 */
			initialize: function() {
				ComponentView.prototype.initialize.apply(this, arguments);
				// if (this.model.get("imageType") === "SVG") {
				// 	this.scale = Mixers.scaleByResize;
				// 	this.model.off("change:scale", this._setUpdatedTransform, this);
				// 	this.model.on("change:scale", Mixers.scaleChangeByResize, this);
				// }
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				var $img,
					_this = this;
				ComponentView.prototype.render.call(this);
				$img = $("<img src=" + (this.model.get('src')) + "></img>");
				$img.load(function() {
					return _this._finishRender($(this));
				});
				$img.error(function() {
					return _this.remove();
				});
				return this.$el;
			},

			/**
			 * Do the actual rendering once image is loaded.
			 *
			 * @param {jQuery} $img
			 * @returns {*}
			 * @private
			 */
			_finishRender: function($img) {
				// var height, width, scale;
				var naturalHeight, naturalWidth;
				naturalWidth = $img[0].naturalWidth;
				naturalHeight = $img[0].naturalHeight;
				// if (this.model.get("imageType") === "SVG") {
				// 	$img.css({
				// 		width: "100%",
				// 		height: "100%"
				// 	});
				// 	scale = this.model.get("scale");
				// 	if (scale && scale.width) {
				// 		this.$el.css({
				// 			width: scale.width,
				// 			height: scale.height
				// 		});
				// 	} else {
				// 		width = Math.max(naturalWidth, 50);
				// 		height = Math.max(naturalHeight, 50);
				// 		// this.$el.css({
				// 		//   width: width,
				// 		//   height: height
				// 		// });
				// 		this.model.set("scale", {
				// 			width: width,
				// 			height: height
				// 		});
				// 	}
				// } else {

				var cuteSize = this.getCuteSize(naturalWidth, naturalHeight);

				this.origSize = {
					width: cuteSize.width,
					height: cuteSize.height
				};

				$img[0].width = cuteSize.width;
				$img[0].height = cuteSize.height;

				this._setUpdatedTransform();

				// }
				$img.bind("dragstart", function(e) {
					e.preventDefault();
					return false;
				});
				this.$content.append($img);
				// if (this.model.get("imageType") === "SVG") {
				// 	$img.parent().addClass("svg");
				// 	return $img.parent().parent().addClass("svg");
				// }
			},

			getCuteSize: function(natW, natH) {
				var width = natW;
				var height = natH;
				var maxW = config.slide.size.width / 2;
				var maxH = config.slide.size.height / 2;

				if (natW > maxW) {
					var ratio = maxW / natW;
					width = maxW;
					height *= ratio;
				}

				if (natH > maxH) {
					var ratio = maxH / natH;
					height = maxH;
					width *= ratio;
				}

				return {
					width: width,
					height: height
				}
			}
		});
	});