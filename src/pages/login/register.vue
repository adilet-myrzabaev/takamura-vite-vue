<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {useToast} from 'primevue/usetoast';
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter()
const checked = ref(false);
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

const validations = reactive({
    firstName: {
        show: false,
        message: 'Имя обязательно!',
        validate: () => {
            if (model.user.firstName === '') {
                validations.firstName.show = true
            } else {
                validations.firstName.show = false
            }
            return !validations.firstName.show
        }
    },
    lastName: {
        show: false,
        message: 'Фамилия обязательно!',
        validate: () => {
            if (model.user.lastName === '') {
                validations.lastName.show = true
            } else {
                validations.lastName.show = false
            }
            return !validations.lastName.show
        }
    },
    age: {
        show: false,
        message: 'Возраст обязательно!',
        messageReal: 'Введите реальный возраст',
        validate: () => {
            if (model.user.age ! >= 130 || model.user.age ! <= 1) {
                showError(validations.age.messageReal)
                // eslint-disable-next-line eqeqeq
            }
            else if (model.user.age == 0 || model.user.age == null) {
                validations.age.show = true
            }
            else {
                validations.age.show = false
            }
            return !validations.age.show
        }
    },
    login: {
        show: false,
        message: 'Логин обязательно!',
        validate: () => {
            if (model.userLogin.login === '') {
                validations.login.show = true
            } else {
                validations.login.show = false
            }
            return !validations.login.show
        }
    },
    password: {
        show: false,
        message: 'Пароль обязательно!',
        validate: () => {
            if (model.userLogin.password === '') {
                validations.password.show = true
            } else {
                validations.password.show = false
            }
            return !validations.password.show
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
const submit = async () => {
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
  <div class="p-4 surface-0 flex align-items-center justify-content-center min-h-screen  overflow-hidden">
    <div class="w-full md:w-7 grid justify-content-center p-2 lg:p-0">
      <div class="col-12 xl:col-10" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
                Регистрация
            </div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div class="grid md:w-10 mx-auto">
            <div class='col-12 sm:col-6'>
                  <label for="email1" class="block text-900 text-xl font-medium mb-2">Имя</label>
                  <InputText
                      id="name"
                      v-model="model.user.firstName"
                      :class="{'p-invalid': !validations.firstName.message}"
                      @input="validations.firstName.validate()"
                      type="text"
                      class="w-full mb-1"
                      placeholder="Например: Иван"
                      style="padding:1rem;"
                  />
                <small v-if="validations.firstName.show" class="p-error ml-1">{{validations.firstName.message}}</small>
              </div>
            <div class='col-12 sm:col-6'>
                  <label for="email1" class="block text-900 text-xl font-medium mb-2">Возраст</label>
                  <InputText
                      id="age"
                      v-model="model.user.age"
                      @input="validations.age.validate()"
                      :class="{'p-invalid': !validations.age.message}"
                      type="text"
                      class="w-full mb-1"
                      placeholder="Возраст"
                      style="padding:1rem;"
                  />
                <small v-if="validations.age.show" class="p-error ml-1">{{validations.age.message}}</small>
              </div>
            <div class='col-12 '>
                  <label for="email1" class="block text-900 text-xl font-medium mb-2">Фамилия</label>
                  <InputText
                      id="lastName"
                      v-model="model.user.lastName"
                      @input="validations.lastName.validate()"
                      :class="{'p-invalid': !validations.lastName.message}"
                      type="text"
                      class="w-full mb-1"
                      placeholder="Фамилия"
                      style="padding:1rem;"
                  />
                <small v-if="validations.lastName.show" class="p-error ml-1">{{validations.lastName.message}}</small>
              </div>
            <div class='col-12 sm:col-6 '>
                  <label for="email1" class="block text-900 text-xl font-medium mb-2">Логин</label>
                  <InputText
                      id="login"
                      v-model="model.userLogin.login"
                      @input="validations.login.validate()"
                      :class="{'p-invalid': !validations.login.message}"
                      type="text"
                      class="w-full mb-1"
                      placeholder="Логин"
                      style="padding:1rem;"
                  />
                <small v-if="validations.login.show" class="p-error ml-1">{{validations.login.message}}</small>
              </div>
            <div class='col-12 sm:col-6'>
                <label for="password1" class="block text-900 font-medium text-xl mb-2">Пароль</label>
                <Password
                    id="password"
                    v-model="model.userLogin.password"
                    @input="validations.password.validate()"
                    :class="{'p-invalid': !validations.password.message}"
                    placeholder="Пароль"
                    :toggle-mask="true"
                    class="w-full mb-1"
                    input-class="w-full"
                    input-style="padding:1rem"
                />
                <small v-if="validations.password.show" class="p-error ml-1">{{validations.password.message}}</small>
            </div>

            <div class='col-12 '>
                <div class="flex align-items-center justify-content-between mb-5">
                    <div class="flex align-items-center">
                        <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2" />
                        <label for="rememberme1">Remember me</label>
                    </div>
                </div>
            </div>
            <div class='col-12 '>
                <Button label="Создать" class="w-full p-3 text-xl" @click='submit'/>
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
