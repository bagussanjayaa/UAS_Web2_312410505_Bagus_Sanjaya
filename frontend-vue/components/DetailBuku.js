const DetailBuku = {

template:`

<div
v-if="buku"
class="min-h-screen bg-gray-50">


<!-- HEADER -->

<div class="bg-gradient-to-r from-green-700 to-green-500 text-white shadow">


<div class="container mx-auto px-6 py-10">


<h1 class="text-4xl font-bold">

📖 Detail Buku

</h1>


<p class="text-green-100 mt-2">

Informasi lengkap koleksi E-Library

</p>


</div>


</div>






<div class="container mx-auto px-6 py-10">





<div class="bg-white rounded-3xl shadow-xl p-8">



<div class="grid md:grid-cols-3 gap-10">





<!-- COVER -->


<div class="flex justify-center">


<img

:src="buku.cover_url"

class="w-80 h-[500px] object-contain rounded-2xl shadow-lg bg-gray-100">


</div>






<!-- INFORMASI -->


<div class="md:col-span-2">





<span

class="bg-green-100 text-green-700 px-4 py-2 rounded-full">

{{buku.nama_genre}}

</span>





<h1

class="text-5xl font-bold text-gray-800 mt-5 mb-5">

{{buku.judul}}

</h1>






<div class="grid md:grid-cols-2 gap-5 mb-8">





<div class="bg-gray-50 p-5 rounded-xl">


<p class="text-gray-500">

Penulis

</p>


<p class="font-bold text-lg">

{{buku.penulis}}

</p>


</div>





<div class="bg-gray-50 p-5 rounded-xl">


<p class="text-gray-500">

Penerbit

</p>


<p class="font-bold text-lg">

{{buku.penerbit}}

</p>


</div>





<div class="bg-gray-50 p-5 rounded-xl">


<p class="text-gray-500">

Genre

</p>


<p class="font-bold text-green-600">

{{buku.nama_genre}}

</p>


</div>





<div class="bg-gray-50 p-5 rounded-xl">


<p class="text-gray-500">

Stok Buku

</p>


<p class="font-bold text-green-600 text-xl">

{{buku.stok}}

</p>


</div>





</div>







<!-- DESKRIPSI -->


<div class="bg-green-50 p-6 rounded-2xl">


<h2 class="text-2xl font-bold mb-3 text-green-700">

Deskripsi Buku

</h2>



<p class="text-gray-700 leading-relaxed">

{{buku.deskripsi || 'Tidak ada deskripsi buku'}}

</p>



</div>











</div>



</div>



</div>







<!-- BACK -->

<div class="flex justify-center mt-8">


<button

@click="$router.back()"

class="bg-green-700 hover:bg-gray-800 text-white px-8 py-3 rounded-xl">


← Kembali ke Koleksi

</button>



</div>





</div>



</div>


`,



data(){

return{

buku:null

}

},





methods:{



pinjam(){


if(!localStorage.getItem('token'))

{

alert(
'Silakan login terlebih dahulu'
);


router.push('/login');


return;

}



router.push('/anggota');


}


},





async mounted(){


try{


const id =

this.$route.params.id;



const res =

await API.get('/buku/'+id);



this.buku =

res.data;



}

catch(error){


console.log(error);


}



}



}