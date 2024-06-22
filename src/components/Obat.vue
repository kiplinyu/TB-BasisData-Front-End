<template>
    <!-- Container utama dengan flexbox -->
    <div class="flex flex-col lg:flex-row h-screen">


        <!-- SideBar -->
        <div class="flex flex-col justify-between border-e bg-white w-64">
        <div class="px-4 py-6">
            <span class="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            LinyuPharm
            </span>
            <ul class="mt-6 space-y-1">
            <li>
                <router-link to="/" class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                Home
                </router-link>
            </li>
            <li>
                <router-link to="/Apoteker" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                Apoteker
                </router-link>
            </li>
            <li>
                <router-link to="/Obat" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                Obat
                </router-link>
            </li>
            </ul>
        </div>
        <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img alt="" src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="size-10 rounded-full object-cover" />
            <div>
                <p class="text-xs">
                <strong class="block font-medium">kiplinyu</strong>
                <span> kiplinyu@gmail.com </span>
                </p>
            </div>
            </a>
        </div>
        </div>


        <!-- Main Content -->
        <div class="flex-1 flex flex-col bg-white">
			<!-- Header -->
			<header>
				<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
					<div class="sm:flex sm:items-center sm:justify-between">
					<div class="text-center sm:text-left">
						<h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Area Obat</h1>

						<p class="mt-1.5 text-sm text-gray-500">Data Obat</p>
					</div>
					
					<div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                        <input 
                        type="button" 
                        class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-blue-700   transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-blue-700 border-blue-700 mr-2" 
                        value="New Data"
                        @click="openModal">
					</div>
					</div>
				</div>
			</header>
			
			<!-- Modal -->
            <ModalObatPost :isOpen="isModalOpen" @close="closeModal" @refresh="getObat" />
            <ModalObatEdit :isOpen="isEditModalOpen" :Obat="selectedObat" @close="closeEditModal" @refresh="getObat" />
            <ModalObatDelete :isOpen="isDeleteModalOpen" :Obat="selectedObat" @close="closeDeleteModal" @confirm-delete="deleteObat" />
			
			<!-- Table -->
            <div class="flex-1 p-5">
				<div class="overflow-x-auto p-7">
					<table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
					<thead class="text-left">
						<tr>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nama Obat</th>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Harga</th>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Golongan</th>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Exp Date</th>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Jumlah Stok</th>
						</tr>
					</thead>
				
					<tbody class="divide-y divide-gray-200">
						<tr v-for="Obat in paginatedData" :key="Obat.id">
						<td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ Obat.nama_obat }}</td>
						<td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ Obat.harga }}</td>
						<td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ getGolonganName(Obat.golongan) }}</td>
						<td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ formatDate(Obat.exp_date) }}</td>
						<td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ Obat.jumlah_stok }}</td>
						<td>
							<input type="button" @click="openEditModal(Obat)" class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-offset-slate-700  active:text-green-600 border-green-600 mr-2" value="Edit">
							<input type="button" @click="openDeleteModal(Obat)" class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-red-700 transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-red-700 border-red-700 ml-2" value="Delete">
							</td>
						</tr>
					</tbody>
					</table>
				</div>
            </div>
		
            <!-- Navigasi halaman -->
            <div class="flex justify-center mt-4">
                <button 
                    :disabled="currentPage === 1" 
                    @click="changePage(currentPage - 1)"
                    class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-blue-700   transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-blue-700 border-blue-700 mr-2 mb-5"
                >
                    Previous
                </button>
                <button 
                    :disabled="currentPage * itemsPerPage >= dataObat.length" 
                    @click="changePage(currentPage + 1)"
                    class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-blue-700   transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-blue-700 border-blue-700 mb-5"
                >
                    Next
                </button>
            </div>


            <!-- Footer -->
            <footer class="bg-white text-center lg:text-left">
                <div class="bg-black/5 p-4 text-center text-surface text-black">
                    © 2024 Copyright:
                    <a href="https://www.instagram.com/kiplinyu/">kiplinyu @ kelompok [1]</a>
                </div>
            </footer>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import ModalObatPost from './ModalObatPost.vue'
import ModalObatEdit from './ModalObatEdit.vue'
import ModalObatDelete from './ModalObatDelete.vue'

const dataObat = ref([]);
const golonganData = ref([]);
const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedObat = ref(null);
const isDeleteModalOpen = ref(false); 
const currentPage = ref(1);
const itemsPerPage = 5;

const url = "http://localhost:4000";

const getObat = async () => {
    try {
        const response = await axios.get(url + "/Obat");
        console.log(response);
        dataObat.value = response.data.data;
    } catch (error) {
        console.error(error);
    }
}

const getGolongan = async () => {
    try {
        const response = await axios.get(url + "/Golongan");
        if (response.data && Array.isArray(response.data.data)) {
            golonganData.value = response.data.data;
        } else {
            console.error("Golongan data is not an array:", response.data);
        }
        console.log("Golongan Data:", golonganData.value);
    } catch (error) {
        console.error(error);
    }
}


const getGolonganName = (golonganId) => {
    if (!Array.isArray(golonganData.value)) {
        console.error("golonganData is not an array");
        return 'Unknown';
    }
    const golongan = golonganData.value.find(g => g.id_golongan === golonganId);
    return golongan ? golongan.golongan : 'Unknown';
}


const openModal = () => {
    isModalOpen.value = true;
}

const closeModal = () => {
    isModalOpen.value = false;
}

const openEditModal = (Obat) => {
    console.log('Selected Obat:', Obat); 
    selectedObat.value = Obat;
    isEditModalOpen.value = true;
};


const closeEditModal = () => {
    isEditModalOpen.value = false;
    selectedObat.value = null;
};

const openDeleteModal = (Obat) => {
    selectedObat.value = Obat;
    isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
    selectedObat.value = null;
};



const deleteObat = async () => {
    if (!selectedObat.value || !selectedObat.value.id_obat) {
        console.error('ID Obat is missing');
        return;
    }

    try {
        await axios.delete(`${url}/Obat/${selectedObat.value.id_obat}`);
        console.log('Data deleted');
        closeDeleteModal();
        getObat();
    } catch (error) {
        console.error('Error deleting Obat', error);
    }
}

const changePage = (page) => {
    currentPage.value = page;
}

const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataObat.value.slice(startIndex, endIndex);
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};



onMounted(() => {
    getObat();
    getGolongan();
})
</script>
