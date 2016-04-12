define(["./ComponentView", './Mixers'],
function(ComponentView, Mixers) {

	/**
	 * @class MediaView
	 * @augments ComponentView
	 */
	return ComponentView.extend({
		className: "component mediaView",
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
			var height, naturalHeight, naturalWidth, scale, width;
			naturalWidth = $img[0].naturalWidth;
			naturalHeight = $img[0].naturalHeight;
			
			this.origSize = {
				width: naturalWidth,
				height: naturalHeight
			};
			$img[0].width = naturalWidth;
			$img[0].height = naturalHeight;
			this._setUpdatedTransform();
			
			$img.bind("dragstart", function(e) {
				e.preventDefault();
				return false;
			});
			this.$content.append($img);

		}
	});
});