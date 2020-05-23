<template>
  <div class="create">
    <!--文件上传表单-->
    <form>
      <input type="file" @change="getFile($event)">
      <button @click="submit($event)">提交</button>
    </form>
  </div>
</template>
<script>
import music from '@/api/music'
export default {
  data() {
    return {
      file: ''
    }
  },
  methods: {
    getFile(event) {
      this.file = event.target.files[0]
      console.log(this.file)
    },
    submit(event) {
      event.preventDefault() // 取消默认行为
      // 创建 formData 对象
      const formData = new FormData()
      // 向 formData 对象中添加文件
      formData.append('file', this.file)
      music.uploadFile(formData).then(response => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style>
.create {
  width: 60%;
  margin: 5% 20%;
}
</style>

