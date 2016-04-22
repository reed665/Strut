define(['./ComponentButton', 'tantaman/web/widgets/ItemImportModal', 'tantaman/web/widgets/ItemImportModalMedia'],
	function(ComponentButton, ItemImportModal, ItemImportModalMedia) {
		'use strict';

		/**
		 * @class ImportingComponentButton
		 * @augments ComponentButton
		 */
		return ComponentButton.extend({
			/**
			 * Initialize ImportingComponentButton.
			 */
			initialize: function() {
				ComponentButton.prototype.initialize.apply(this, arguments);

				if (this.options.componentType.toLowerCase() === 'media') {
					this._modal = ItemImportModalMedia.get(this.options);
				} else {
					this._modal = ItemImportModal.get(this.options);
					
				}
				this._itemImported = this._itemImported.bind(this);
			},

			/**
			 * React on button click.
			 * @private
			 */
			_clicked: function() {
				this._modal.show(this._itemImported);
			},

			/**
			 * Add importent component to the slide.
			 * @private
			 */
			_itemImported: function(src) {
				this.options.editorModel.addComponent({
					src: src,
					type: this.options.componentType
				});
			},

			constructor: function ImportingComponentButton() {
				ComponentButton.prototype.constructor.apply(this, arguments);
			}
		});
	});