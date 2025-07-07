<script setup>
import httpService from "@/services/Httpservice";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
    memo: {
        id: 0,
        title: '',
        content: '',
        createdAt: ''
    }
});

onMounted(() => { 
    const passData = history.state.data;
    console.log("passData", passData);
    if (passData) {
        state.memo = JSON.parse(passData);
    }
});

// 수정만 Detail.vue로 가게 해주세요.
const submit = async () => {
    const bodyJson = {
        title: state.memo.title,
        content: state.memo.content
    };

    let data = null;
    let path = "/";
  if (state.memo.id) {
      path = `/memos/${state.memo.id}`
      bodyJson.id = state.memo.id;
      data = await httpService.putMemo(bodyJson);
    } else {
      data = await httpService.postMemo(bodyJson);
    }

    if (data.resultData === 1) {
        router.push({ path });
    } else {
        alert(data.resultMessage);
    }
}
</script>

<template>
 <form class="detail" @submit.prevent="submit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" id="title" class="form-control p-3" v-model="state.memo.title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea id="content" class="form-control p-3" v-model="state.memo.content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">{{ state.memo.id > 0? '수정완료' : '저장' }}</button>
  </form>
</template>

<style scoped>

</style>