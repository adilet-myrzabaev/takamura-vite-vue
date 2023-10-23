<template>
    <div class="grid crud-demo">
        <div class='col-12'>
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
        </div>
        <div class="col-12">
            <div class="card">
                <Toast />
                <DataTable
                    ref="dt"
                    :value="products"
                    v-model:selection="selectedProducts"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex md:justify-content-between md:align-items-center">
                            <button class='pi pi-plus bg-transparent cursor-pointer p-2 border-round border-1' @click='openNew()'>
                                <span class='text-xl ml-2'>New product</span>
                            </button>
                            <Dialog v-model:visible="productAdd" :style="{ width: '450px' }" header="Добавить новый продукт" :modal="true" class="p-fluid">
                                <img
                                    :src="'images/product/' + product.image"
                                    :alt="product.image"
                                    v-if="product.image"
                                    width="150"
                                    class="mt-0 mx-auto mb-5 block shadow-2"
                                />
                                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Добавить картинки" chooseLabel="Добавить  картинки" class="mr-2 inline-block bg-transparent text-black-alpha-80 border-black-alpha-80" />
                                <div class="field">
                                    <label for="name">Имя</label>
                                    <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                                    <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                                </div>
                                <div class="field">
                                    <label for="description">Описание</label>
                                    <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
                                </div>

                                <div class="field">
                                    <label class="mb-3">Категория</label>
                                    <div class="formgrid grid">
                                        <div class="field-radiobutton col-6">
                                            <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                                            <label for="category1">Accessories</label>
                                        </div>
                                        <div class="field-radiobutton col-6">
                                            <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                                            <label for="category2">Clothing</label>
                                        </div>
                                        <div class="field-radiobutton col-6">
                                            <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                                            <label for="category3">Electronics</label>
                                        </div>
                                        <div class="field-radiobutton col-6">
                                            <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                                            <label for="category4">Fitness</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="formgrid grid">
                                    <div class="field col">
                                        <label for="price">Цена</label>
                                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
                                    </div>
                                </div>
                                <template #footer>
                                    <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                                    <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                                </template>
                            </Dialog>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Поиск..." />
                            </span>
                        </div>
                    </template>
                    <Column field="name" header="Имя" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Name</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column header="Картинка">
                        <template #body="slotProps">
                            <span class="p-column-title">Image</span>
                            <img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="price" header="Цена" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Price</span>
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="category" header="Категория" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Category</span>
                            {{ formatCurrency(slotProps.data.category) }}
                        </template>
                    </Column>
                    <Column>
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded bg-transparent border-none text-black-alpha-80 mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded bg-transparent border-none text-black-alpha-80" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
                    <img
                        :src="'images/product/' + product.image"
                        :alt="product.image"
                        v-if="product.image"
                        width="150"
                        class="mt-0 mx-auto mb-5 block shadow-2"
                    />
                    <div class="field">
                        <label for="name">Имя</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="description">Описание</label>
                        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
                    </div>

                    <div class="field">
                        <label class="mb-3">Категория</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">Цена</label>
                            <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                    </template>
                </Dialog>
                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product"
                            >Are you sure you want to delete <b>{{ product.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="Нет" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="Да" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                    </template>
                </Dialog>
                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Are you sure you want to delete the selected products?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
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
            productDialog: false,
            productAdd: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: {},
            selectedProducts: null,
            filters: {},
            submitted: false,
        };
    },
    productService: null,
    created() {
        this.productService = new ProductService();
    },
    mounted() {
        this.productService.getProducts().then((data) => (this.products = data));
    },
    methods: {
        formatCurrency(value) {
            if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            return;
        },
        openNew() {
            this.product = {};
            this.submitted = false;
            this.productAdd = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        saveProduct() {
            this.submitted = true;
            if (this.product.name.trim()) {
                if (this.product.id) {
                    this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                    this.products[this.findIndexById(this.product.id)] = this.product;
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                } else {
                    this.product.id = this.createId();
                    this.product.code = this.createId();
                    this.product.image = 'product-placeholder.svg';
                    this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                    this.products.push(this.product);
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }
                this.productDialog = false;
                this.product = {};
            }
        },
        editProduct(product) {
            this.product = { ...product };
            this.productDialog = true;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            this.products = this.products.filter((val) => val.id !== this.product.id);
            this.deleteProductDialog = false;
            this.product = {};
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        createId() {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < 5; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
            this.deleteProductsDialog = false;
            this.selectedProducts = null;
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        },
    },
};
</script>

<style scoped lang="scss">
.product-badge {
    border-radius: 2px;
    padding: 0.25em 0.5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.3px;

    &.status-instock {
        background: #c8e6c9;
        color: #256029;
    }

    &.status-outofstock {
        background: #ffcdd2;
        color: #c63737;
    }

    &.status-lowstock {
        background: #feedaf;
        color: #8a5340;
    }
}
</style>
