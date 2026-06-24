const DashboardAdmin = {

template:`

<div class="min-h-screen bg-gray-50">



<!-- HEADER ADMIN -->

<div class="bg-gradient-to-r from-green-700 to-emerald-500 text-white shadow-lg">


<div class="container mx-auto px-6 py-6 flex justify-between items-center">


<div>


<h1 class="text-3xl font-bold">

📚 E-Library Admin

</h1>


<p class="text-green-100 mt-1">

Panel pengelolaan perpustakaan

</p>


</div>




<button

@click="logout"

class="bg-white text-green-700 px-5 py-2 rounded-xl font-bold hover:bg-green-100">


Logout


</button>




</div>


</div>








<div class="container mx-auto px-6 py-10">





<h2 class="text-4xl font-bold mb-8">

Dashboard Admin

</h2>







<!-- STATISTIK -->


<div class="grid md:grid-cols-4 gap-6 mb-10">






<div class="bg-white rounded-2xl shadow p-6 border-l-8 border-green-600">


<h3 class="text-gray-500">

📚 Total Buku

</h3>



<p class="text-5xl font-bold text-green-600 mt-3">

{{dashboard.total_buku}}

</p>


</div>







<div class="bg-white rounded-2xl shadow p-6 border-l-8 border-emerald-500">


<h3 class="text-gray-500">

👥 Total Anggota

</h3>



<p class="text-5xl font-bold text-emerald-600 mt-3">

{{dashboard.total_anggota}}

</p>


</div>








<div class="bg-white rounded-2xl shadow p-6 border-l-8 border-lime-500">


<h3 class="text-gray-500">

🔑 Total User

</h3>



<p class="text-5xl font-bold text-lime-600 mt-3">

{{dashboard.total_users}}

</p>


</div>







<div class="bg-white rounded-2xl shadow p-6 border-l-8 border-yellow-500">


<h3 class="text-gray-500">

📖 Total Peminjaman

</h3>



<p class="text-5xl font-bold text-yellow-600 mt-3">

{{dashboard.total_peminjaman}}

</p>


</div>





</div>








<!-- MENU -->

<div class="mb-8">


<h2 class="text-2xl font-bold mb-5">

Kelola Sistem

</h2>



<div class="grid md:grid-cols-5 gap-5">






<div

@click="$router.push('/admin/buku')"

class="bg-white p-6 rounded-2xl shadow hover:shadow-xl cursor-pointer transition text-center">


<div class="text-5xl mb-3">

📚

</div>


<h3 class="font-bold">

Kelola Buku

</h3>


</div>







<div

@click="$router.push('/admin/genre')"

class="bg-white p-6 rounded-2xl shadow hover:shadow-xl cursor-pointer transition text-center">


<div class="text-5xl mb-3">

🏷️

</div>


<h3 class="font-bold">

Kelola Genre

</h3>


</div>







<div

@click="$router.push('/admin/anggota')"

class="bg-white p-6 rounded-2xl shadow hover:shadow-xl cursor-pointer transition text-center">


<div class="text-5xl mb-3">

👥

</div>


<h3 class="font-bold">

Kelola Anggota

</h3>


</div>







<div

@click="$router.push('/admin/user')"

class="bg-white p-6 rounded-2xl shadow hover:shadow-xl cursor-pointer transition text-center">


<div class="text-5xl mb-3">

🔑

</div>


<h3 class="font-bold">

Kelola User

</h3>


</div>







<div

@click="$router.push('/admin/peminjaman')"

class="bg-white p-6 rounded-2xl shadow hover:shadow-xl cursor-pointer transition text-center">


<div class="text-5xl mb-3">

📖

</div>


<h3 class="font-bold">

Peminjaman

</h3>


</div>






</div>


</div>









<!-- AKTIVITAS -->


<div class="bg-white rounded-3xl shadow p-8">


<h3 class="text-2xl font-bold mb-5">

📊 Aktivitas Sistem

</h3>




<div class="grid md:grid-cols-3 gap-5">



<div class="bg-green-50 p-5 rounded-xl">


<p class="text-gray-500">

Total Buku

</p>


<p class="text-3xl font-bold text-green-600">

{{dashboard.total_buku}}

</p>


</div>





<div class="bg-green-50 p-5 rounded-xl">


<p class="text-gray-500">

Total Anggota

</p>


<p class="text-3xl font-bold text-green-600">

{{dashboard.total_anggota}}

</p>


</div>






<div class="bg-green-50 p-5 rounded-xl">


<p class="text-gray-500">

Peminjaman

</p>


<p class="text-3xl font-bold text-green-600">

{{dashboard.total_peminjaman}}

</p>


</div>





</div>




</div>





</div>



</div>

`,

data(){
return{
    dashboard:{}
}
},

async mounted(){

const res =
await API.get('/dashboard');

this.dashboard =
res.data;

},

methods:{

logout(){

    localStorage.clear();

    router.push('/login');

}

}

}