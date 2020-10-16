import React from "react";
import PanelList from "./PanelList";

class PanelMenuView extends React.PureComponent {
  setInternalId(menuItem) {
    menuItem.id = this.internalId;
    if (menuItem.menu.length > 0) {
      menuItem.menu.forEach((child) => {
        this.internalId = this.internalId + 1;
        this.setInternalId(child);
      });
    }
  }
  constructor(props) {
    super(props);

    this.internalId = 0;
    props.options.menuConfig.menu.forEach((menuItem) => {
      this.setMenuItemLevel(menuItem, 0);
      this.setInternalId(menuItem);
      this.internalId = this.internalId + 1;
    });

    this.bindSubscriptions();
  }

  bindSubscriptions = () => {
    const { localObserver } = this.props;

    localObserver.subscribe("document-clicked", (item) => {
      localObserver.publish("set-active-document", {
        documentName: item.document,
        headerIdentifier: null,
      });
    });

    localObserver.subscribe("link-clicked", (item) => {
      window.open(item.link, "_blank");
    });

    localObserver.subscribe("maplink-clicked", (item) => {
      localObserver.publish("fly-to", item.maplink);
    });
  };

  setMenuItemLevel(menuItem, level) {
    menuItem.level = level;
    level = level + 1;
    if (menuItem.menu && menuItem.menu.length > 0) {
      menuItem.menu.forEach((subMenuItem) => {
        this.setMenuItemLevel(subMenuItem, level);
      });
    }
  }

  render() {
    const { localObserver, app, options } = this.props;
    console.log(this.props, "props");
    return (
      <PanelList
        localObserver={localObserver}
        globalObserver={app.globalObserver}
        menu={options.menuConfig.menu}
      ></PanelList>
    );
  }
}

export default PanelMenuView;
