<template>
  <div>
    <div class="ckeditor">
      <div class="post-title">
        <el-input
          v-model="postData.title"
          placeholder="请输入文章标题"
        ></el-input>
      </div>
      <ckeditor
        v-model="postData.editorData"
        :editor="editor"
        :config="editorConfig"
      ></ckeditor>
      <div class="button-wrapper">
        <el-button
          size="small"
          type="primary"
          @click="submitForm('CKPostForm')"
        >立即创建</el-button>
        <el-button
          size="small"
          @click="resetForm('CKPostForm')"
        >重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: { ckeditor: CKEditor.component },
  data() {
    return {
      editor: ClassicEditor,
      postData: {
        title: "",
        editorData: "<p>hello world<p>"
      },
      editorConfig: {},
      MDValue: ""
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.postData);
      this.$http.post("/vue/post/", {
        body: this.postData.editorData,
        title: this.postData.title
      });
      console.log("end");
      console.log(document.cookie);
    },
    resetForm(formName) {
      console.log("reset");
    }
  }
};
</script>

<style lang="scss" scoped>
.post-title {
  margin: 10px 0;
}
.button-wrapper {
  margin: 10px 0;
}
</style>
