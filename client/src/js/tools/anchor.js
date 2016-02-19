
var ToolModel = require('tools/tool');

module.exports = ToolModel.extend({

  defaults: {
    type: 'anchor',
    panel: 'anchorpanel',
    toolbar: 'bottom',
    icon: 'fa fa-code icon',
    title: 'Länk',
    visible: false,
    shell: undefined,
    anchor: ""
  },
  /**
   * @desc Create savestate tool.
   * @constructor
   * @param {object} options | Options loaded from the configuration.
   * @return {undefined}
   */
  initialize: function (options) {
    ToolModel.prototype.initialize.call(this);
  },
  /**
   * @desc
   *
   */
  generate: function () {

    var a = document.location.protocol + "//" + document.location.host + document.location.pathname
    ,   map = this.get("map")
    ,   olMap = map.getMap()
    ,   layers = this.get("layers")

    ,   c = olMap.getView().getCenter()
    ,   z = olMap.getView().getZoom()
    ,   x = c[0]
    ,   y = c[1]
    ,   l = layers.filter(layer => layer.getVisible() === true).map(layer => encodeURIComponent(layer.getName())).join(',');

    a += `?x=${x}&y=${y}&z=${z}&l=${l}`;
    this.set("anchor", a);

    return a;

  },
  /**
   * @desc Configure the tool when the Applicatiion (shell) is ready.
   * @param {object} options | Options loaded from the configuration.
   * @return {undefined}
   */
  configure: function (shell) {

    this.set('map', shell.getMap());
    this.set('layers', shell.getLayerCollection());

  },
  /**
   * @desc Event handler triggered when the tool is clicked.
   * @return {undefined}
   */
  clicked: function () {
    this.set('visible', true);
  }

});
