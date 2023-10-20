<script lang="ts" setup>

import { computed, reactive, ref } from 'vue';

const userLogin = reactive({
    login: ''
})

const checked = ref(false);

</script>

<template>
  <div class="surface-0 flex align-items-center justify-content-center min-h-screen  overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
                Ваш логин
            </div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Логин</label>
            <InputText
              id="login"
              v-model="userLogin.login"
              type="text"
              class="w-full mb-3"
              placeholder="Логин"
              style="padding:1rem;"
            />

            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
              </div>
            </div>
            <Button label="Продолжить" class="w-full p-3 text-xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>
