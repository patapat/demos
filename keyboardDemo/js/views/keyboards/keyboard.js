KeyboardDemo.Views.Keyboard = Backbone.CompositeView.extend({
  template: JST['keyboards/keyboard'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})
