import axios from "common/utils/axios";
import Lesson1Store from "components/lesson1/common/Store";

class Store extends Lesson1Store {
  constructor(userId, lesson, stage, submittedWorkspace) {
    super(userId, lesson, stage, submittedWorkspace);

    // 提出済みのデザインも SessionStorage に保存されているデザインもなければ 1-8 のデザインを取得する
    if (!this.submittedWorkspace && !this.storage.isExistsSavedWorkspace()) {
      axios.get("/api/lessons/1/stages/8/workspaces").then((res) => {
        const { workspace } = res.data;
        this.schemas = workspace ? JSON.parse(workspace.body) : this.schemas;
      });
    }
  }
}

export default Store;
