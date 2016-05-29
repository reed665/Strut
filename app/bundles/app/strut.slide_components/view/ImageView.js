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
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				var $img,
					_this = this;

				ComponentView.prototype.render.call(this, true);
				
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
				var natW = $img[0].naturalWidth;
				var natH = $img[0].naturalHeight;

				this.origSize = {
					width: natW,
					height: natH
				};

				$img[0].width = natW;
				$img[0].height = natH;

				this._setUpdatedTransform();

				$img.bind("dragstart", function(e) {
					e.preventDefault();
					return false;
				});
				this.$content.append($img);
			}
		});
	});