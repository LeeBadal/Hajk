import React, { Component } from "react";
import Observer from "react-event-observer";
import AppModel from "./../models/AppModel.js";
import Toolbar from "./Toolbar.js";
import Popup from "./Popup.js";
import "./App.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mapClickDataResult: {}
    };
  }

  componentWillMount() {
    this.observer = new Observer();
    this.appModel = new AppModel(this.props.config, this.observer);
  }

  componentDidMount() {
    var promises = this.appModel
      .configureApplication()
      .createMap()
      .addLayers()
      .loadPlugins(this.props.activeTools, plugin => {});

    Promise.all(promises).then(() => {
      this.setState({
        tools: this.appModel.getPlugins()
      });
    });

    this.observer.subscribe("mapClick", mapClickDataResult => {
      this.setState({
        mapClickDataResult: mapClickDataResult
      });
    });
  }

  getTheme = () => {
    // primary: blue // <- Can be done like this (don't forget to import blue from "@material-ui/core/colors/blue"!)
    // secondary: { main: "#11cb5f" } // <- Or like this

    return createMuiTheme({
      palette: {
        primary: { main: this.props.config.mapConfig.map.colors.primaryColor },
        secondary: {
          main: this.props.config.mapConfig.map.colors.secondaryColor
        }
      }
    });
  };

  render() {
    return (
      <MuiThemeProvider theme={this.getTheme()}>
        <div className="map" id="map">
          <Toolbar tools={this.appModel.getToolbarPlugins()} />
          <Popup
            mapClickDataResult={this.state.mapClickDataResult}
            map={this.appModel.getMap()}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

/**
 * QUICK APP FLOW OVERVIEW
 *
 * 1. App is instantiated and constructor() is called.
 * 2. componentWillMount() is called. this.appModel is created
 *    using this.props.config (which in turn got there from
 *    index.js where <App> is created with prop "config", which
 *    is basically an array of JSON objects fetched in index.js).
 * ==> Code execution jumps to AppModel.js...
 *    ...and the constructor() is called.
 *    AppModel contains some properties, like an object of plugins,
 *    a property named "config" (which we have here, because we got it when
 *    <App> was initiated in index.js). Also, projection is registered in appModel.
 *    No other methods are called except what happens in constructor of AppModel class,
 *    so that...
 * <== ...code execution jumps to this file.
 * 3. render() is called. <Toolbar> component is created and a prop,
 *    tools, is sent to it. Since tools=this.appModel.getToolbarPlugins() following happens:
 * ==> Code execution again jumps to AppModel.js.
 *    getToolbarPlugins() takes a look at currently available plugins (which
 *    by the way is just an empty array the first time this code is executed!).
 *    It filters out those that have the property target='toolbar'.
 *
 *    So we essentially call <Toolbar> with a prop that is an Object (returned
 *    from getToolbarPlugins()) which contains only those plugins that have
 *    target='toolbar'.
 *
 * ==> Code execution jumps to Toolbar.js...
 *    ... and its render() function. There, the only thing that happens is
 *    a call to the internal renderTools() method.
 *    renderTools() takes a look at Toolbar's prop 'tools' (that we sent in from here).
 *    For each tool that exists (which is none, the first time the code is run, cause
 *    we haven't even imported any tools yet!), a Component is created. The code jumps
 *    to one of those corresponding tool components and it's constructor(), componentWillMount()
 *    and render() methods, as usual. But we won't talk about this now. Instead, let's see what
 *    happens next.
 *
 * 4. When render() is done, React calls componentDidMount(). This is by the way only called once,
 *    and not for each re-render that will happen when DOM changes.
 *
 *    componentDidMount() calls a bunch of methods on this.appModel, which makes...
 * ==> ...code execution jump to AppModel.js again.
 *
 *    .configureApplication() does some mapping of CSS against the configurable values in app settings.
 *
 *    .createMap() initializes a new ol.Map object. A lot more is going on here.
 *
 *    .addLayers() does some mapping on requested layers (that it got from config). After that
 *    it calls .addMapLayer() on each of those layers. The .addMapLayer method is important as it
 *    is here that the different layer types, such as WMS, Vector, or ArcGIS are configured.
 *
 *
 * 5. This is pretty much it. Now we have an ol.Map object filled with layers, we have some plugins
 *    (mostly tools probably) loaded. User can interact with the Map as well as plugins and the
 *    the application will respond accordingly.
 *
 */
