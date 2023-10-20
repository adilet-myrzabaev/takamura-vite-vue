<template>
    <div class="grid">
        <div class="col-12">
            <div>
                <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
                    <Listbox v-model="listboxValue" :options="products" optionLabel="name" :filter="true" filter-placeholder='Поиск' />
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
                        <template #body>
                            <div class='flex align-items-center'>
                                <Button icon="pi pi-pencil" type="button" class="p-button-text text-black-alpha-80"></Button>
                                <Button icon="pi pi-trash" type="button" class="p-button-text text-black-alpha-80 ml-3"></Button>
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

export default {
    data() {
        return {
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
    },
};
</script>
