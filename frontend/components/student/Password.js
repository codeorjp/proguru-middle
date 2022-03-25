import React, { Component } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import styles from "components/student/Password.scss";

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
    };
  }

  componentDidMount() {
    const input = document.getElementById("input_student_password");
    input.oninput = () => {
      this.setState({ password: input.value });
    };
  }

  render() {
    return (
      <div className={styles.wrap}>
        <PasswordStrengthBar
          className={styles.strengthBar}
          password={this.state.password}
          shortScoreWord="とても弱い"
          scoreWords={["弱い", "弱い", "やや弱い", "やや強い", "強い"]}
          minLength={8}
        />
      </div>
    );
  }
}
