const DashboardAnggota = {

template:`

<div class="min-h-screen bg-gray-50">


<!-- NAVBAR -->

<nav class="bg-gradient-to-r from-green-700 to-emerald-500 text-white px-8 py-5 shadow-lg">


<div class="flex justify-between items-center">


<h1 class="text-3xl font-bold">

📚 E-Library

</h1>



<div class="flex items-center gap-4">


<div class="bg-white/20 px-4 py-2 rounded-xl">

👤 {{nama}}

</div>



<button

@click="logout"

class="bg-white text-green-700 px-5 py-2 rounded-xl font-bold hover:bg-green-100">


Logout


</button>



</div>


</div>


</nav>






<div class="container mx-auto px-6 py-10">





<!-- WELCOME -->


<div class="bg-gradient-to-r from-green-600 to-emerald-400 text-white rounded-3xl p-8 shadow-xl mb-8">


<h1 class="text-4xl font-bold">

Selamat Datang, {{nama}} 👋

</h1>



<p class="mt-3 text-green-100 text-lg">

Temukan dan pinjam buku favoritmu dengan mudah

</p>


</div>







<!-- STATISTIK -->


<div class="grid md:grid-cols-2 gap-6 mb-10">



<div class="bg-white rounded-2xl shadow p-6 border-l-8 border-green-600">


<h2 class="text-gray-500 text-lg">

📖 Buku Tersedia

</h2>



<p class="text-5xl font-bold text-green-600 mt-3">

{{totalBuku}}

</p>


</div>





<div class="bg-white rounded-2xl shadow p-6 border-l-8 border-emerald-500">


<h2 class="text-gray-500 text-lg">

📚 Sedang Dipinjam

</h2>



<p class="text-5xl font-bold text-emerald-600 mt-3">

{{totalPinjam}}

</p>


</div>


</div>







<!-- KOLEKSI BUKU -->


<div class="bg-white rounded-3xl shadow p-8 mb-10">





<h2 class="text-3xl font-bold mb-6">

Koleksi Buku

</h2>







<!-- SEARCH -->


<div class="grid md:grid-cols-2 gap-4 mb-8">


<input

v-model="keyword"

placeholder="🔍 Cari judul buku..."

class="border border-green-300 p-4 rounded-xl focus:ring-2 focus:ring-green-500">





<select

v-model="selectedGenre"

class="border border-green-300 p-4 rounded-xl">


<option value="">

Semua Genre

</option>



<option

v-for="g in genres"

:value="g.nama_genre">


{{g.nama_genre}}


</option>


</select>


</div>







<!-- CARD BUKU -->


<div class="grid md:grid-cols-4 gap-6">



<div

v-for="item in paginatedBooks"

:key="item.id"

class="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-xl transition">





<img

:src="item.cover_url"

class="w-full h-72 object-contain bg-gray-100">






<div class="p-5">



<h3 class="font-bold text-lg">

{{item.judul}}

</h3>




<p class="text-gray-500">

{{item.penulis}}

</p>




<span class="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full">


{{item.nama_genre}}


</span>




<p class="mt-3">

Stok :

<b>

{{item.stok}}

</b>


</p>







<div class="flex gap-2 mt-5">


<button

@click="$router.push('/buku/'+item.id)"

class="flex-1 bg-gray-700 text-white py-2 rounded-lg">


Detail


</button>





<button

@click="pinjam(item.id)"

:disabled="item.stok<=0"

class="flex-1 bg-green-600 text-white py-2 rounded-lg">


{{item.stok>0?'Pinjam':'Habis'}}


</button>



</div>



</div>



</div>



</div>








<!-- PAGINATION -->


<div class="flex justify-center items-center gap-4 mt-10">



<button

@click="prevPage"

:disabled="page==1"

class="bg-gray-300 px-5 py-2 rounded-lg">


Prev


</button>





<span class="font-bold text-green-700">

Halaman {{page}} / {{totalPage}}

</span>





<button

@click="nextPage"

:disabled="page>=totalPage"

class="bg-green-600 text-white px-5 py-2 rounded-lg">


Next


</button>



</div>



</div>








<!-- RIWAYAT -->

<div class="bg-white rounded-3xl shadow p-8 mt-10">


<h2 class="text-3xl font-bold mb-6">

📋 Riwayat Peminjaman Saya

</h2>


<div class="overflow-x-auto">


<table class="w-full">


<thead class="bg-green-600 text-white">


<tr>


<th class="p-4">
Buku
</th>


<th>
Tanggal Pinjam
</th>


<th>
Tanggal Kembali
</th>


<th>
Status
</th>


</tr>


</thead>




<tbody>


<tr

v-for="item in paginatedRiwayat"

:key="item.id"

class="border-b text-center">



<td class="p-4 font-semibold">

{{item.judul}}

</td>




<td>

{{item.tanggal_pinjam}}

</td>




<td>

{{item.tanggal_kembali || '-'}}

</td>




<td>


<span

class="bg-yellow-200 px-4 py-1 rounded-full">

{{item.status}}

</span>



</td>




</tr>



</tbody>


</table>


</div>




<!-- Pagination Riwayat -->


<div class="flex justify-center items-center gap-4 mt-8">


<button

@click="prevRiwayat"

:disabled="riwayatPage==1"

class="bg-gray-300 px-5 py-2 rounded-lg">


Prev


</button>




<span class="font-bold text-green-700">

Halaman {{riwayatPage}} / {{totalRiwayatPage}}

</span>




<button

@click="nextRiwayat"

:disabled="riwayatPage>=totalRiwayatPage"

class="bg-green-600 text-white px-5 py-2 rounded-lg">


Next


</button>



</div>



</div>





</div>



</div>

`,



data(){

return{

nama:'',

totalBuku:0,

totalPinjam:0,

buku:[],

riwayat:[],

genres:[],

keyword:'',

selectedGenre:'',

page:1,

perPage:8,

// pagination riwayat

riwayatPage:1,

riwayatPerPage:5

}

},



computed:{


filteredBooks(){


return this.buku.filter(item=>{


const cari =

item.judul

.toLowerCase()

.includes(
this.keyword.toLowerCase()
);



const genre =

this.selectedGenre=='' ||

item.nama_genre==this.selectedGenre;



return cari && genre;


});


},




totalPage(){


return Math.ceil(

this.filteredBooks.length /

this.perPage

);


},




paginatedBooks(){


const start =

(this.page-1)*this.perPage;



return this.filteredBooks.slice(

start,

start+this.perPage

);


},




totalRiwayatPage(){


return Math.ceil(

this.riwayat.length /

this.riwayatPerPage

);


},




paginatedRiwayat(){


const start =

(this.riwayatPage-1)

*this.riwayatPerPage;



return this.riwayat.slice(

start,

start + this.riwayatPerPage

);


}


},





watch:{


keyword(){

this.page=1;

},



selectedGenre(){

this.page=1;

}


},





methods:{



async loadData(){


try{


this.nama =

localStorage.getItem('nama');



const userId =

localStorage.getItem('id');




// ambil buku

const bukuRes =

await API.get('/buku');



this.buku =

bukuRes.data;



this.totalBuku =

this.buku.filter(

b=>b.stok>0

).length;




// ambil genre

const genreRes =

await API.get('/genre');



this.genres =

genreRes.data;




// riwayat user

const pinjamRes =

await API.get(

`/peminjaman/user/${userId}`

);



this.riwayat =

pinjamRes.data;




this.totalPinjam =

this.riwayat.filter(

p=>p.status=="Dipinjam"

).length;



}


catch(error){


console.log(error);


}


},






async pinjam(idBuku){


try{


await API.post(

'/peminjaman',

{

user_id:

localStorage.getItem('id'),


buku_id:idBuku

}

);



alert(

'Buku berhasil dipinjam'

);



this.loadData();



}



catch(error){


console.log(error);



alert(

error.response?.data?.message ||

'Gagal meminjam buku'

);


}


},






nextPage(){


if(this.page < this.totalPage)

{

this.page++;

}


},




prevPage(){


if(this.page > 1)

{

this.page--;

}


},






nextRiwayat(){


if(this.riwayatPage < this.totalRiwayatPage)

{

this.riwayatPage++;

}


},






prevRiwayat(){


if(this.riwayatPage > 1)

{

this.riwayatPage--;

}


},





logout(){


localStorage.clear();


router.push('/login');


}



},




mounted(){


this.loadData();


}



}