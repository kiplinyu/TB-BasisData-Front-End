<template>
<!-- Container utama dengan flexbox -->
<div class="flex h-screen">
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
    <div class="flex-1 p-6">
        <a href="#" class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
        <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div class="sm:flex sm:justify-between sm:gap-4">
            <div>
            <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
                LinyuPharm - Kelompok 1
            </h3>
            <p class="mt-1 text-xs font-medium text-gray-600">Welcome, Kiplinyu</p>
            </div>

            <div class="hidden sm:block sm:shrink-0">
            <img alt="" src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="size-16 rounded-lg object-cover shadow-sm" />
            </div>
        </div>

        <div class="mt-4">
            <p class="text-pretty text-sm text-gray-500">
            "{{ quote }}"
            </p>
        </div>

        <dl class="mt-6 flex gap-4 sm:gap-6">
            <div class="flex flex-col-reverse">
            <div class="clock">
                {{ time }}
            </div>
            </div>
        </dl>
        </a>
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

<script>
export default {
data() {
    return {
    time: new Date().toLocaleTimeString(),
    quotes: [
        'Setiap hari adalah kesempatan baru untuk menjadi lebih baik.',
        'Keberhasilan adalah hasil dari usaha dan kegigihan.',
        'Ketika kamu percaya pada diri sendiri, apapun mungkin terjadi.',
        'Jangan pernah menyerah pada impianmu.',
        'Hidup adalah tentang membuat pilihan yang tepat.',
        'Kesuksesan tidak datang dari apa yang kamu lakukan sesekali, tetapi dari apa yang kamu lakukan secara konsisten.',
        'Jadilah perubahan yang ingin kamu lihat di dunia.',
        'Kegagalan adalah kesempatan untuk memulai lagi dengan lebih bijaksana.',
        'Pekerjaan besar dimulai dari langkah kecil yang konsisten.',
        'Jangan biarkan ketakutanmu lebih besar daripada mimpimu.'
    ],
    quote: '',
    };
},
created() {
    this.startClock();
    this.getRandomQuote();
},
beforeDestroy() {
    clearInterval(this.clockInterval);
},
methods: {
    startClock() {
    this.clockInterval = setInterval(() => {
        this.time = new Date().toLocaleTimeString();
    }, 1000);
    },
    getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.quote = this.quotes[randomIndex];
    },
},
};
</script>

<style scoped>
.clock {
font-size: 24px;
font-weight: bold;
text-align: center;
}
</style>
