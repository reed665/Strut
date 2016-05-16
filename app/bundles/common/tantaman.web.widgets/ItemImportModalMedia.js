define(['libs/backbone'],
function(Backbone) {
	var Modal = Backbone.View.extend({
		// hardcoded media data
		media: [
			{
				"IndexInGroup": -1,
				"dtDbModified": new Date(Date.UTC(2016,2,10,11,14,40,297)),
				"cust_id":      224,
				"Pub":          1,
				"ScreenIndex":  1,
				"Groups":       [],
				"Owner":        "serge",
				"FileName":     "Lysbilde1_This-is-long-file-name.JPG",
				"Id":           "09d1b441-105f-4773-a752-ecc9a2bf5ff7",
				"Size":         1429.29,
				"Width":        8000,
				"Height":       4500,
				"Length":       0,
				"CustomProperties": [],
				"MediaType":    0,
				"Modified":     new Date(Date.UTC(2016,2,10,11,14,29,953)),
				"ThumbUrl":     "http://prod05.webpro.no/media/thumb/100x100_09d1b441-105f-4773-a752-ecc9a2bf5ff7.jpg",
				"Url":          "http://prod05.webpro.no/media/09d1b441-105f-4773-a752-ecc9a2bf5ff7.JPG",
				"IsFile":       true,
				"scheduleex":   "",
				"Schedule":     null,
				"ImageTemplate":null,
				"Screens":      null
			},
			{
				"IndexInGroup": -1,
				"dtDbModified": new Date(Date.UTC(2016,2,10,11,14,42,687)),
				"cust_id":      224,
				"Pub":          1,
				"ScreenIndex":  1,
				"Groups":       [],
				"Owner":        "serge",
				"FileName":     "jour_bg_white.png",
				"Id":           "11a5e71a-3515-4961-8ae9-79679592280c",
				"Size":         577.98,
				"Width":        1920,
				"Height":       1080,
				"Length":       0,
				"CustomProperties":[],
				"MediaType":    0,
				"Modified":     new Date(Date.UTC(2016,2,10,11,14,33,464)),
				"ThumbUrl":     "http://prod05.webpro.no/media/thumb/100x100_11a5e71a-3515-4961-8ae9-79679592280c.jpg",
				"Url":          "http://prod05.webpro.no/media/11a5e71a-3515-4961-8ae9-79679592280c.png",
				"IsFile":       true,
				"scheduleex":   "",
				"Schedule":     null,
				"ImageTemplate":null,
				"Screens":      null
			}
		],
		className: "itemGrabber modal hide",
		events: {
			"click .ok": "okClicked",
			"click .pic": "picClicked",
			"hidden": "hidden"
		},

		show: function(cb) {
			this.cb = cb;
			return this.$el.modal('show');
		},
		okClicked: function() {
			if (!this.$okBtn.hasClass('disabled')) {
				this.cb(this.src);
				return this.$el.modal('hide');
			}
		},

		hidden: function() {
			if (this.$input != null) {
				this.item.src = '';
				return this.$input.val("");
			}
		},

		render: function() {
			var _this = this;

			// console.log('Options:', this.options);

			this.setMediaOption(function() {
				_this.$el.html(JST["tantaman.web.widgets/ItemImportModalMedia"](_this.options));
				_this.$el.modal();

				_this.$mediaSelect = _this.$el.find('.media-select');
				_this.$mediaSelect.css('text-align', 'center');

				_this.$okBtn = _this.$el.find(".ok");
				_this.$okBtn.addClass('disabled');

				_this.$el.modal("hide");

				return _this.$el;

			});

		},
		constructor: function ItemImportModal() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		},
		getMedia: function(cb) {
			// TODO: get media.json through ajax call
			var media = [];
			for(var i=0; i<10; i++) {
				this.media.forEach(function(mediaItem) {
					media.push(mediaItem);
				});
			}
			return cb(null, media);
		},
		setMediaOption: function(cb) {
			var _this = this;
			this.getMedia(function(err, media) {
				if (err) {
					console.log(err);
					return cb();
				}

				_this.options.media = media.map(function(obj) {
					obj.shortFileName = _this._shortenMediaFileName(obj.FileName, 18);
					return obj;
				});

				cb();
			});
		},
		_shortenMediaFileName: function(fileName, maxChars) {
			if (fileName.length <= maxChars - 3) {
				return fileName;
			}
			// return fileName.slice(0, maxChars) + '&hellip;';
			return fileName.slice(0, maxChars - 3) + '...';
		},
		picClicked: function(e) {
			var selected = this.$('.selected');
			selected.removeClass('selected');
			$(e.target).addClass('selected');
			this.$okBtn.removeClass('disabled');

			var idx = $(e.target).attr('data-index');
			var selMed = this.options.media[idx];

			// TODO:
			// this.src = selMed.Url;
			var compType = this.options.componentType;
			if (compType === 'Image') {
				this.src = 'http://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg';
			} else if (compType === 'Video') {
				this.src = 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4';
			} else {
				console.log('unknown component type: ' + compType);
			}
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
