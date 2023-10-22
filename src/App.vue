<template>
    <component :is="layout.value"><router-view></router-view></component>
<!--    <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll" v-model:filters="products" v-model:selection="selectedCustomer"-->
<!--               stateStorage="session" stateKey="dt-state-demo-session" paginator filterDisplay="menu"-->
<!--               selectionMode="single" dataKey="id" :globalFilterFields="['name', 'country.name', 'representative.name', 'status']" tableStyle="min-width: 50rem">-->
<!--        <Column style="width: 15%">-->
<!--            <template #header> Image </template>-->
<!--            <template #body="slotProps">-->
<!--                <img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.image" width="50" class="shadow-2" />-->
<!--            </template>-->
<!--        </Column>-->
<!--        <Column field="name" header="Имя" :sortable="true" style="width: 35%"></Column>-->
<!--        <Column field="price" header="Цена" :sortable="true" style="width: 35%">-->
<!--            <template #body="slotProps">-->
<!--                {{ formatCurrency(slotProps.data.price) }}-->
<!--            </template>-->
<!--        </Column>-->
<!--        <Column field="name" header="Категория" :sortable="true" style="width: 35%">-->
<!--            <template #body="slotProps">-->
<!--                {{ formatCurrency(slotProps.data.price) }}-->
<!--            </template>-->
<!--        </Column>-->
<!--        <Column style="width: 15%">-->
<!--            <template #body='slotProps'>-->
<!--                <div class='flex align-items-center'>-->
<!--                    <Button icon="pi pi-pencil" type="button" class="p-button-text text-black-alpha-80" @click='openDialog()'></Button>-->
<!--                    <Dialog class="dialog-menu" v-model:visible="visible" :style="{ width: '50vw' }" position="center" :modal="true" :draggable="false">-->
<!--                        <template #header>-->
<!--                            <img @click="router.push('/')" src="https://takamura-eats.ru/custom/my/img/logo22.png" alt="qwdasdas">-->
<!--                        </template>-->
<!--                        <p class="font-normal product-caption mb-0 cursor-pointer">ПРОГРАММА ЛОЯЛЬНОСТИ</p>-->
<!--                        <p class="font-normal product-caption mb-0 cursor-pointer">АКЦИИ</p>-->
<!--                        <p class="font-normal product-caption mb-0 cursor-pointer">МЕНЮ</p>-->
<!--                        <p class="font-normal product-caption mb-0 cursor-pointer">КОНТАКТЫ</p>-->

<!--                    </Dialog>-->
<!--                    <Button icon="pi pi-trash" type="button" class="p-button-text text-black-alpha-80 ml-3"  @click='deleted(slotProps.data.id)'></Button>-->
<!--                </div>-->
<!--            </template>-->
<!--        </Column>-->
<!--    </DataTable>-->
</template>

<script lang='ts' setup>
import { computed, shallowRef } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "./layout/default.vue";
import LoginLayout from "./layout/login.vue";
const route = useRoute();
const layout = computed(() => {
    if (route.meta?.layout == "login") {
        return shallowRef(LoginLayout);
    }
    return shallowRef(DefaultLayout);
});
</script>

<style lang="scss">
</style>
