<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';


const router = useRouter()
const checked = ref(false);
const userLogin = reactive({
    login: '',
    password: ''
})
const validations = reactive({
    login: {
        show: false,
        message: 'логин обязательно!',
        validate: () => {
            if (userLogin.login === '') {
                validations.login.show = true
            } else {
                validations.login.show = false
            }
            return !validations.login.show
        }
    },
    password: {
        show: false,
        message: 'пароль обязательно!',
        validate: () => {
            if (userLogin.password === '') {
                validations.password.show = true
            } else {
                validations.password.show = false
            }
            return !validations.password.show
        }
    }
})

const validate = () => {
    for (const validationItem of Object.values(validations)) {
        const valid = validationItem.validate()
        if (!valid) { return false }
    }
    return true
}
const toast = useToast()
const signIn = async () => {
    const valid = validate()
    if (!valid) {
        showError('Форма содержит ошибки. Пожалуйста, проверьте введенные данные.')
        return
    }
    try {
        const { data } = await axios.post('https://localhost:7123/User/Authenticate', userLogin)
        await router.push('/')
        await showSuccess()
    } catch (error) {
        console.log('catch error')
        showError(error as string)
    }
}
const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 })
}
const showError = (error:string) => {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: `${error}`, life: 3000 })
}

</script>

<template>
  <div class="surface-0 flex align-items-center justify-content-center min-h-screen  overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
                Войти
            </div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Логин</label>
            <InputText
              id="login1"
              v-model="userLogin.login"
              type="text"
              class="w-full mb-3"
              placeholder="Логин"
              style="padding:1rem;"
            />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Пароль</label>
            <Password
              id="password1"
              v-model="userLogin.password"
              placeholder="Password"
              :toggle-mask="true"
              class="w-full mb-3"
              input-class="w-full"
              input-style="padding:1rem"
            />

            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
              </div>
              <router-link to='/login/reset-password/check' class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)"> Забыли пароль?</router-link>
            </div>
            <Button label="Продолжить" class="w-full p-3 text-xl" />
            <p class='mt-2'>Нет аккаунт? <router-link to="/login/register">Создать аккаунт</router-link></p>
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
