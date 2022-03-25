/* eslint-disable new-cap */
import React from "react";
import createjs from "createjs";
import AdobeAn from "../animation";
import styles from "../styles/ClientServerAnimation.scss";

class ClientServerAnimation extends React.Component {
  componentDidMount() {
    this.init();
  }

  init() {
    this.canvas = document.getElementById("canvas");
    this.anim_container = document.getElementById("animation_container");
    this.dom_overlay_container = document.getElementById(
      "dom_overlay_container"
    );

    this.composition = AdobeAn.getComposition(
      "3D36F8DC37114F0F86E95B72AF62779C"
    );
    this.lib = this.composition.getLibrary();

    createjs.MotionGuidePlugin.install();
    const loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", (evt) => {
      this.handleFileLoad(evt, this.composition);
    });
    loader.addEventListener("complete", (evt) => {
      this.handleComplete(evt, this.composition);
    });
    this.lib = this.composition.getLibrary();
    loader.loadManifest(this.lib.properties.manifest);
  }

  handleFileLoad(evt, comp) {
    const images = comp.getImages();
    if (evt && evt.item.type === "image") {
      images[evt.item.id] = evt.result;
    }
  }

  handleComplete(evt, comp) {
    const lib = comp.getLibrary();
    const ss = comp.getSpriteSheet();
    const queue = evt.target;
    const { ssMetadata } = lib;

    for (let i = 0; i < ssMetadata.length; i += 1) {
      ss[ssMetadata[i].name] = new createjs.SpriteSheet({
        images: [queue.getResult(ssMetadata[i].name)],
        frames: ssMetadata[i].frames,
      });
    }
    window.exportRoot = new lib.animation();
    window.stage = new lib.Stage(this.canvas);

    const fnStartAnimation = () => {
      window.stage.addChild(window.exportRoot);
      createjs.Ticker.framerate = lib.properties.fps;
      createjs.Ticker.addEventListener("tick", window.stage);
    };

    AdobeAn.makeResponsive(false, "both", false, 1, [
      this.canvas,
      this.anim_container,
      this.dom_overlay_container,
    ]);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
    window.exportRoot.gotoAndStop(6);
  }

  render() {
    return (
      <div id="animation_container" className={styles.container}>
        <canvas id="canvas" />
        <div className={styles.address}>192.168.0.1</div>
        <div id="dom_overlay_container" />
      </div>
    );
  }
}

export default ClientServerAnimation;
