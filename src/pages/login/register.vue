<script lang="ts" setup>



import { computed, reactive, ref } from 'vue';


const model = reactive({
    user: {
        firstName: '',
        lastName: '',
        age: ''
    },
    userLogin: {
        login: '',
        password: ''
    }
    }
)
const checked = ref(false);

</script>

<template>
  <div class="p-4 surface-0 flex align-items-center justify-content-center min-h-screen  overflow-hidden">
    <div class="w-full md:w-5 grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 xl:col-10" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
                Регистрация
            </div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div class="grid md:w-10 mx-auto">
              <div class='col-6'>
                  <label for="email1" class="block text-900 text-xl font-medium mb-2">Имя</label>
                  <InputText
                      id="name"
                      v-model="model.user.firstName"
                      type="text"
                      class="w-full mb-3"
                      placeholder="Например: Иван"
                      style="padding:1rem;"
                  />
              </div>
              <div class='col-6'>
                  <label for="email1" class="block text-900 text-xl font-medium mb-2">Возраст</label>
                  <InputText
                      id="age"
                      v-model="model.user.age"
                      type="text"
                      class="w-full mb-3"
                      placeholder="Возраст"
                      style="padding:1rem;"
                  />
              </div>
              <div class='col-12'>
                  <label for="email1" class="block text-900 text-xl font-medium mb-2">Фамилия</label>
                  <InputText
                      id="lastName"
                      v-model="model.user.lastName"
                      type="text"
                      class="w-full mb-3"
                      placeholder="Фамилия"
                      style="padding:1rem;"
                  />
              </div>
              <div class='col-6'>
                  <label for="email1" class="block text-900 text-xl font-medium mb-2">Логин</label>
                  <InputText
                      id="login"
                      v-model="model.userLogin.login"
                      type="text"
                      class="w-full mb-3"
                      placeholder="Логин"
                      style="padding:1rem;"
                  />
              </div>
            <div class='col-6'>
                <label for="password1" class="block text-900 font-medium text-xl mb-2">Пароль</label>
                <Password
                    id="password"
                    v-model="model.userLogin.password"
                    placeholder="Пароль"
                    :toggle-mask="true"
                    class="w-full mb-3"
                    input-class="w-full"
                    input-style="padding:1rem"
                />
            </div>

            <div class='col-12'>
                <div class="flex align-items-center justify-content-between mb-5">
                    <div class="flex align-items-center">
                        <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2" />
                        <label for="rememberme1">Remember me</label>
                    </div>
                </div>
            </div>
            <div class='col-12'>
                <Button label="Создать" class="w-full p-3 text-xl" />
            </div>
            <p class='mx-auto my-3'>или</p>
          </div>
            <div class='flex justify-content-center align-items-center '>
                <div><i class='pi pi-facebook text-2xl'></i></div>
                <div><i class='pi pi-apple text-2xl mx-4'></i></div>
                <div><i class='pi pi-google text-2xl'></i></div>
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
