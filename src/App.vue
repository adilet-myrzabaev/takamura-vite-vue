<template>
    <component :is="layout.value"><router-view></router-view></component>
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
