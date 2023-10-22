<template>
    <div class="grid">
        <div class="col-12">
            <div>
                <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll" v-model:filters="products" v-model:selection="selectedCustomer"
                           stateStorage="session" stateKey="dt-state-demo-session" paginator filterDisplay="menu"
                           selectionMode="single" dataKey="id" :globalFilterFields="['name', 'country.name', 'representative.name', 'status']" tableStyle="min-width: 50rem">
                    <Column style="width: 15%">
                        <template #header> Image </template>
                        <template #body="slotProps">
                            <img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.image" width="50" class="shadow-2" />
                        </template>
                    </Column>
                    <Column field="name" header="Имя" :sortable="true" style="width: 35%"></Column>
                    <Column field="price" header="Цена" :sortable="true" style="width: 35%">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="name" header="Категория" :sortable="true" style="width: 35%">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column style="width: 15%">
                        <template #body='slotProps'>
                            <div class='flex align-items-center'>
                                <Button icon="pi pi-pencil" type="button" class="p-button-text text-black-alpha-80" @click='openDialog()'></Button>
                                <Dialog class="dialog-menu" v-model:visible="visible" :style="{ width: '50vw' }" position="center" :modal="true" :draggable="false">
                                    <template #header>
                                        <img @click="router.push('/')" src="https://takamura-eats.ru/custom/my/img/logo22.png" alt="qwdasdas">
                                    </template>
                                    <p class="font-normal product-caption mb-0 cursor-pointer">ПРОГРАММА ЛОЯЛЬНОСТИ</p>
                                    <p class="font-normal product-caption mb-0 cursor-pointer">АКЦИИ</p>
                                    <p class="font-normal product-caption mb-0 cursor-pointer">МЕНЮ</p>
                                    <p class="font-normal product-caption mb-0 cursor-pointer">КОНТАКТЫ</p>

                                </Dialog>
                                <Button icon="pi pi-trash" type="button" class="p-button-text text-black-alpha-80 ml-3"  @click='deleted(slotProps.data.id)'></Button>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
import ProductService from '../service/ProductService';
import axios from 'axios';


export default {
    data() {
        return {
            visible: false,
            breadcrumbHome: { icon: 'pi pi-home', to: '/admin' },
            products: null,
            listboxValue: null,
            lineData: {
                datasets: [
                    {
                        label: 'Revenue',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: 0.4,
                    },
                    {
                        label: 'Sales',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        backgroundColor: '#00bb7e',
                        borderColor: '#00bb7e',
                        tension: 0.4,
                    },
                ],
            },
            items: [
                { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                { label: 'Remove', icon: 'pi pi-fw pi-minus' },
            ],
            methods: {
                deleted(Id) {
                    let index = this.products.value.findIndex((el) => {
                        return el.id === Id
                    });
                    this.products.value.slice(index,1)
                }
            },

        };
    },
    productService: null,
    created() {
        this.productService = new ProductService();
    },
    mounted() {
        this.productService.getProductsSmall().then((data) => (this.products = data));
    },
    methods: {
        formatCurrency(value) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        deleted(Id){
            this.products.filter((el)=>{
                 el.id == Id
            })
        },

        openDialog(Id) {
            this.visible = true
        }
    },


};
</script>
