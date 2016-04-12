define(['strut/deck/Component', 
	'common/FileUtils'],
	function(Component, FileUtils) {
		'use strict';

		/**
		 * @class Media
		 * @augments Component
		 */
		return Component.extend({
			initialize: function() {
				Component.prototype.initialize.apply(this, arguments);
				this.set('type', 'Media');

				var src = this.get('src');
				this.set('imageType', FileUtils.imageType(src));
			},

			_updateCache: function() {
				
			},

			toBase64: function() {
				
			},

			constructor: function MediaModel(attrs) {
				Component.prototype.constructor.call(this, attrs);
			}
		});
	});