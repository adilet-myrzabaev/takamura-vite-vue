<script lang='ts' setup>
import { ref } from 'vue';
const products = ref([
    {
        id: 1,
        img: 'https://takamura-eats.ru/userfls/shop/small/1675_oshinko-maki.jpg',
        caption: 'ОШИНКО МАКИ',
        description: 'Такуан, рис',
        weight: '100',
        portion: '6',
        kBJU: '88/2/1/18',
        price: '150'
    },
    {
        id: 2,
        img: 'https://takamura-eats.ru/userfls/shop/small/1675_oshinko-maki.jpg',
        caption: 'ОШИНКО МАКИ',
        description: 'Такуан, рис',
        weight: '100',
        portion: '6',
        kBJU: '88/2/1/18',
        price: '150'
    },
    {
        id: 3,
        img: 'https://takamura-eats.ru/userfls/shop/small/1675_oshinko-maki.jpg',
        caption: 'ОШИНКО МАКИ',
        description: 'Такуан, рис',
        weight: '100',
        portion: '6',
        kBJU: '88/2/1/18',
        price: '150'
    },
    {
        id: 4,
        img: 'https://takamura-eats.ru/userfls/shop/small/1675_oshinko-maki.jpg',
        caption: 'ОШИНКО МАКИ',
        description: 'Такуан, рис',
        weight: '100',
        portion: '6',
        kBJU: '88/2/1/18',
        price: '150'
    }
])
const count = ref(0)

const  countNum = () => {
    count.value++
}
const  minusNum = () => {
    count.value--
}
</script>

<template>
    <div>
        <div class='grid product-parent'>
            <Card v-for='product in products' class='col-3 '>
                <template #header>
                    <img :src='product.img' :alt='product.caption'>
                </template>
                <template #content>
                    <h5 class='product-caption'>{{product.caption}}</h5>
                    <p class='product-description'>{{product.description}}</p>
                    <p class='product-description'>Вес: {{product.weight}} г</p>
                    <p class='product-description' v-if='product.kBJU'>КБЖУ: {{product.kBJU}}</p>
                    <p class='product-description'>Порция: {{product.portion}} шт</p>
                </template>
                <template #footer>
                    <div class='flex align-items-center justify-content-between'>
                        <p class='text-xl product-caption mb-0'>{{product.price}}. -</p>
                        <div class='flex align-items-center'>
                            <button v-if='count>0' class='border-1 mr-3' style='border-radius: 7px' @click='minusNum'><i class='pi pi-minus p-1'></i></button>
                            <span v-if='count'>{{ count }}</span>
                            <button class='border-1 ml-3' style='border-radius: 7px' @click='countNum'><i class='pi pi-plus p-1'></i></button>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>