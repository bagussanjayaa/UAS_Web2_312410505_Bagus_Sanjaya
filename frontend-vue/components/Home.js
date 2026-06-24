const Home = {

template:`

<div class="min-h-screen bg-gray-50">


<!-- HERO -->

<section class="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-b-3xl shadow-lg">


<div class="container mx-auto px-6 py-12 flex justify-between items-center">


<div>


<h1 class="text-5xl font-bold mb-4">

📚 E-Library

</h1>


<p class="text-2xl font-semibold">

Selamat Datang di E-Library

</p>


<p class="text-green-100 mt-2">

Temukan komik favoritmu dengan mudah dan cepat.

</p>



<button

@click="$router.push('/login')"

class="mt-6 bg-white text-green-700 px-6 py-3 rounded-xl font-bold">

Login

</button>


</div>


<div class="text-8xl">

📖

</div>


</div>


</section>





<div class="container mx-auto px-6 py-10">





<!-- TOTAL -->

<div class="bg-white shadow rounded-xl p-6 mb-8 border-l-8 border-green-600">


<h2 class="text-gray-500">

Total Buku

</h2>


<p class="text-5xl font-bold text-green-600">

{{buku.length}}

</p>


</div>






<!-- SEARCH + GENRE -->

<div class="grid md:grid-cols-2 gap-4 mb-8">


<input

v-model="keyword"

placeholder="🔍 Cari judul buku..."

class="border border-green-300 p-4 rounded-xl">





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







<h2 class="text-3xl font-bold mb-5">

Koleksi Buku

</h2>





<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">



<div

v-for="item in paginatedBooks"

:key="item.id"


@click="detail(item.id)"

class="bg-white rounded-2xl shadow hover:shadow-xl cursor-pointer overflow-hidden">





<img

:src="item.cover_url"

class="w-full h-80 object-contain bg-gray-100">





<div class="p-5">


<h3 class="font-bold text-lg">

{{item.judul}}

</h3>



<p class="text-gray-500">

{{item.penulis}}

</p>




<div class="flex justify-between mt-3">


<span

class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

{{item.nama_genre}}

</span>




<span

class="bg-gray-100 px-3 py-1 rounded-full">

Stok {{item.stok}}

</span>



</div>



</div>



</div>



</div>








<!-- PAGINATION -->


<div class="flex justify-center gap-3 mt-10">


<button

@click="prevPage"

:disabled="page==1"

class="bg-gray-300 px-5 py-2 rounded-lg">

Prev

</button>



<span class="bg-green-600 text-white px-5 py-2 rounded-lg">

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


</div>


`,




data(){

return{

buku:[],

genres:[],

keyword:'',

selectedGenre:'',

page:1,

perPage:8


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



detail(id){


router.push('/buku/'+id);


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


}



},




async mounted(){


try{



const bukuRes =

await API.get('/buku');



this.buku =

bukuRes.data;






const genreRes =

await API.get('/genre');



this.genres =

genreRes.data;




}

catch(error){


console.log(error);


}



}



}