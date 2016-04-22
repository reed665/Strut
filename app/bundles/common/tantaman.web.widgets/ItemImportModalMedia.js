define(['libs/backbone'],
function(Backbone) {
	var Modal = Backbone.View.extend({
		className: "itemGrabber modal hide",
		events: {
			"click .ok": "okClicked",
			"change input[type='file']": "fileChosen",
			// "keyup input[name='itemUrl']": "urlChanged",
			// "paste input[name='itemUrl']": "urlChanged",
			"hidden": "hidden"
		},
		initialize: function() {
			this.loadItem = _.debounce(this.loadItem.bind(this), 200);
		},
		show: function(cb) {
			this.cb = cb;
			return this.$el.modal('show');
		},
		okClicked: function() {
			log('Adding selected media to slide...');
			// if (!this.$el.find(".ok").hasClass("disabled")) {
			// 	this.cb(this.src);
			// 	return this.$el.modal('hide');
			// }
		},
		fileChosen: function(e) {
			var f, reader,
				_this = this;
			f = e.target.files[0];
			if (!f.type.match('image.*'))
				return;

			this.item.src = '';
		},
		hidden: function() {
			if (this.$input != null) {
				this.item.src = '';
				return this.$input.val("");
			}
		},
		// urlChanged: function(e) {
		// 	if (e.which === 13) {
		// 		this.src = this.$input.val();
		// 		return this.okClicked();
		// 	} else {
		// 		this.loadItem();
		// 	}
		// },
		loadItem: function() {
			var val = this.$input.val();

			this.item.src = val;
			return this.src = this.item.src;
		},

		render: function() {
			var _this = this;
			this.$el.html(JST["tantaman.web.widgets/ItemImportModalMedia"](this.options));
			this.$el.modal();
			this.$el.modal("hide");
			this.item = this.$el.find('.preview');
			// this.$input = this.$el.find("input[name='itemUrl']");
			// this.$thumbnail = this.$el.find('.thumbnail');

			return this.$el;
		},
		constructor: function ItemImportModal() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});

	return {
		get: function(options) {
			var modal = new Modal(options);
			modal.render();
			$('modals').append(modal.$el);

			return modal;
		},

		ctor: Modal
	};
});
