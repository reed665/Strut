
/*
@author Matt Crinklaw-Vot
*/


(function() {

  define(["vendor/amd/backbone", "./Templates", "storage/FileStorage", "css!./css/OpenDialog.css"], function(Backbone, Templates, FileStorage, empty) {
    return Backbone.View.extend({
      className: "openDialog modal",
      events: function() {
        return {
          "click .ok": "okClicked",
          "click li > a > span": "fileClicked",
          "click li > a > button": "deleteClicked"
        };
      },
      initialize: function() {},
      show: function(cb, val) {
        this._renderPartial();
        this.cb = cb;
        return this.$el.modal("show");
      },
      okClicked: function() {
        if (this.cb != null) {
          this.cb(this.$el.find(".active span").text());
        }
        return this.$el.modal("hide");
      },
      fileClicked: function(e) {
        this.$el.find(".active").removeClass("active");
        return $(e.currentTarget).parent().parent().addClass("active");
      },
      deleteClicked: function(e) {
        var $tgt, fileName;
        $tgt = $(e.currentTarget);
        fileName = $tgt.siblings("span").text();
        FileStorage.remove(fileName);
        return $tgt.parent().parent().remove();
      },
      _renderPartial: function() {
        return this.$el.html(this.__template()({
          fileNames: FileStorage.fileNames()
        }));
      },
      __template: function() {
        return Templates.OpenDialog;
      },
      render: function() {
        this._renderPartial();
        this.$el.modal();
        this.$el.modal("hide");
        return this.$el;
      }
    });
  });

}).call(this);