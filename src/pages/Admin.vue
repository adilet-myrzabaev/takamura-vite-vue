<template>
    <div class='grid'>
        <div class='col-12 sm:col-6 md:col-4'>
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Система управления</span>
                        <div class="text-900 font-medium text-xl">Товары</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>
                <Button @click='router.push("/products")' class='bg-transparent text-black-alpha-80 border-black-alpha-80 outline-none shadow-none' label="перейти"  />
            </div>
        </div>
        <div class='col-12 sm:col-6 md:col-4'>
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Система управления</span>
                        <div class="text-900 font-medium text-xl">Заказы</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-check-square text-blue-500 text-xl"></i>
                    </div>
                </div>
                <Button @click='router.push("/orders")' class='bg-transparent text-black-alpha-80 border-black-alpha-80 outline-none shadow-none' label="перейти"  />
            </div>
        </div>
        <div class='col-12 sm:col-6 md:col-4'>
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Система управления</span>
                        <div class="text-900 font-medium text-xl">Категории</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-list text-blue-500 text-xl"></i>
                    </div>
                </div>
                <Button @click='router.push("/categories")' class='bg-transparent text-black-alpha-80 border-black-alpha-80 outline-none shadow-none' label="перейти"  />
            </div>
        </div>
    </div>
</template>

<script setup>

import router from '@/router';
</script>