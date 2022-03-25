import React, { Component } from "react";
import styles from "components/lesson1/common/styles/workspace/GenerateWorkSpace.scss";
import designtoolStyles from "components/lesson1/common/styles/designTool.scss";
import { inject, observer } from "mobx-react";
import { editDesignComponent } from "components/lesson1/common/constants/editDesignComponent";
import workspaceEmpty from "components/lesson1/common/statics/workspace_empty.png";
import WorkSpaceStatusText from "components/lesson1/common/components/workspace/WorkSpaceStatusText";

class GenerateWorkSpace extends Component {
  constructor(props) {
    super(props);
    this.generateForm = this.generateForm.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollRef = React.createRef(); // スクロール量検知用Ref
    this.formRefs = {}; // formのref管理
    this.state = {
      isActiveTabIndex: 0,
    };
  }

  generateForm(clickElm) {
    const formArr = [];
    const tabArr = [];
    clickElm.editDesignComponent.forEach((elm, index) => {
      formArr.push(this.getDesignElm(elm, index));
      tabArr.push(this.getDesignTabs(elm, index));
    });

    return (
      <>
        <div className={styles.formTabs}>{tabArr}</div>
        <div
          className={styles.forms}
          ref={this.scrollRef}
          onScroll={() => {
            this.handleScroll(clickElm);
          }}
        >
          <div className={styles.formInner}>{formArr}</div>
        </div>
      </>
    );
  }

  handleScroll(clickElm) {
    const currentPos = this.scrollRef.current.scrollTop;
    clickElm.editDesignComponent.forEach((elm, index) => {
      const formPos = this.formRefs[elm].current.offsetTop;
      if (currentPos >= formPos) {
        this.setState({
          isActiveTabIndex: index,
        });
      }
    });
  }

  clickTabs(elm, index) {
    if (this.formRefs[elm].current.scrollIntoView) {
      this.formRefs[elm].current.scrollIntoView({ behavior: "smooth" });
    } else {
      const elmTopPos = this.formRefs[elm].current.offsetTop;
      this.scrollRef.current.scrollTop = elmTopPos;
    }
    this.setState({
      isActiveTabIndex: index,
    });
  }

  getDesignElm(elm, index) {
    const { clickElm, schemas } = this.props.store;
    const { component, title, iconName } = editDesignComponent[elm];
    const EditComponent = component;
    const ref = React.createRef();
    this.formRefs[elm] = ref;
    const { presetColors } = this.props;

    return (
      <div key={index} style={{ width: "100%" }} ref={ref}>
        <EditComponent
          title={
            <div className={designtoolStyles.titleWrap}>
              <p className={`${designtoolStyles.titleIcon} bi ${iconName}`} />
              <p className={designtoolStyles.titleText}>{title}</p>
            </div>
          }
          type={elm}
          placeholder="数値を入力してください"
          name={elm}
          value={schemas[clickElm.className].style[elm]}
          presetColors={presetColors}
        />
      </div>
    );
  }

  getDesignTabs(elm, index) {
    const { title } = editDesignComponent[elm];
    const { isActiveTabIndex } = this.state;
    return (
      <div
        key={index}
        className={`${styles.tab} ${
          isActiveTabIndex === index ? styles.isActive : ""
        }`}
        role="button"
        tabIndex={0}
        onClick={() => {
          this.clickTabs(elm, index);
        }}
        onKeyDown={() => {
          this.clickTabs(elm, index);
        }}
      >
        <div
          className={`${styles.tabIcon} bi ${editDesignComponent[elm].iconName}`}
        />
        <div>{title}</div>
      </div>
    );
  }

  render() {
    const { clickElm } = this.props.store;
    return (
      <div className={styles.workSpaceWrap}>
        <WorkSpaceStatusText
          title={
            clickElm.className !== ""
              ? `「${clickElm.title}」を選択しました`
              : "何も選択されていません"
          }
        />
        <div className={styles.workSpace}>
          {clickElm.className !== "" ? (
            this.generateForm(clickElm)
          ) : (
            <div className={styles.emptyState}>
              <p>
                左上のパネルの「あなたのデザイン」からデザインする部分を選択してね！
              </p>
              <div>
                <img
                  src={workspaceEmpty}
                  alt="何も選択されていません"
                  width="100"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default inject("store")(observer(GenerateWorkSpace));
