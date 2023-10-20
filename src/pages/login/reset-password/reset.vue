<script lang="ts" setup>

import { computed, reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const checked = ref(false);
const loginUser = ref({
    password: '',
    confirmPassword: ''
})

const validations = reactive({
    password: {
        show: false,
        message: 'Пароль обязательно!',
        validate: () => {
            if (loginUser.value.password === '') {
                validations.password.show = true
            } else {
                validations.password.show = false
            }
            return !validations.password.show
        }
    },
    confirmPassword: {
        show: false,
        message: 'Пароль неправильно!',
        validate: () => {
            if (loginUser.value.confirmPassword !== loginUser.value.password) {
                validations.confirmPassword.show = true
            } else {
                validations.confirmPassword.show = false
            }
            return !validations.confirmPassword.show
        }
    }
})
const toast = useToast()
const validate = () => {
    for (const validationItem of Object.values(validations)) {
        const valid = validationItem.validate()
        if (!valid) { return false }
    }
    return true
}
const change = async () => {
    const valid = validate()
    if (!valid) {
        showError('Форма содержит ошибки. Пожалуйста, проверьте введенные данные.')

        return
    }
    try {
        // const { data } = await axios.post('https://localhost:7123/User/Registration', model)
        // router.push('/')
        showSuccess()
    } catch (error) {
        showError(error as string)
    }
}
const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 })
    return true
}
const showError = (error:string) => {
    toast.add({ severity: 'error', summary: 'Ошибка', detail:`${error}`, life: 3000 })
}
</script>

<template>
  <div class="surface-0 flex align-items-center justify-content-center min-h-screen  overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
               Изменить
            </div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div class="w-full md:w-10 mx-auto">

            <div class='col-12'>
                <label for="password1" class="block text-900 font-medium text-xl mb-2">Новый пароль</label>
                <Password
                    id="password"
                    v-model="loginUser.password"
                    @input="validations.password.validate()"
                    :class="{'p-invalid': !validations.password.message}"
                    placeholder="Пароль"
                    :toggle-mask="true"
                    class="w-full mb-1"
                    input-class="w-full"
                    input-style="padding:1rem"
                />
                <small v-if="validations.password.show" class="p-error ml-1">{{ validations.password.message }}</small>
            </div>
            <div class='col-12'>
                <label for="password1" class="block text-900 font-medium text-xl mb-2">Подтвердить пароль</label>
                <Password
                    id="confirmPassword"
                    v-model="loginUser.confirmPassword"
                    @input="validations.confirmPassword.validate()"
                    placeholder="Подтвердить пароль"
                    :toggle-mask="true"
                    class="w-full mb-1"
                    input-class="w-full"
                    input-style="padding:1rem"
                />
                <small v-if="validations.confirmPassword.show" class="p-error ml-1">{{ validations.confirmPassword.message }}</small>
            </div>
            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
              </div>
            </div>
            <Button label="Подтвердить" class="w-full p-3 text-xl" @click='change'/>
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
