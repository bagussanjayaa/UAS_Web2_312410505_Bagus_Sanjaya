const Peminjaman = {

template:`

<div class="min-h-screen bg-gray-50 p-6">


<!-- Header -->

<div class="mb-8">

<h1 class="text-3xl font-bold text-gray-800">

📖 Kelola Peminjaman

</h1>


<p class="text-gray-500">

Monitoring peminjaman dan pengembalian buku

</p>


</div>





<!-- Filter -->

<div class="bg-white p-5 rounded-2xl shadow mb-6">


<div class="grid md:grid-cols-2 gap-4">


<input

v-model="keyword"

placeholder="🔎 Cari nama anggota..."

class="border p-3 rounded-xl">





<select

v-model="statusFilter"

class="border p-3 rounded-xl">


<option value="">

Semua Status

</option>


<option value="Dipinjam">

Dipinjam

</option>


<option value="Dikembalikan">

Dikembalikan

</option>


</select>


</div>


</div>







<!-- Table -->

<div class="bg-white rounded-2xl shadow overflow-hidden">


<table class="w-full">


<thead class="bg-green-600 text-white">


<tr>

<th class="p-4">
ID
</th>

<th>
Anggota
</th>

<th>
Username
</th>

<th>
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

<th>
Aksi
</th>

</tr>


</thead>





<tbody>


<tr

v-for="item in paginatedData"

:key="item.id"

class="border-b text-center hover:bg-green-50">





<td class="p-3">

{{item.id}}

</td>





<td class="font-semibold">

{{item.nama}}

</td>





<td>

{{item.username}}

</td>





<td>

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

:class="item.status=='Dipinjam'
?'bg-yellow-200 text-yellow-800'
:'bg-green-200 text-green-800'"

class="px-3 py-1 rounded-full">


{{item.status}}


</span>


</td>







<td>


<button

v-if="item.status=='Dipinjam'"

@click="kembalikan(item.id)"

class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg">


Kembalikan


</button>


<span v-else class="text-gray-400">

Selesai

</span>


</td>







</tr>


</tbody>


</table>


</div>








<!-- Pagination -->


<div class="flex justify-center items-center gap-3 mt-8">



<button

@click="page--"

:disabled="page===1"

class="bg-gray-300 px-4 py-2 rounded-lg">


Prev


</button>






<div class="bg-white shadow px-5 py-2 rounded-lg font-bold">


Halaman {{page}} / {{totalPage}}


</div>







<button

@click="page++"

:disabled="page>=totalPage"

class="bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg">


Next


</button>



</div>





</div>


`,


data(){

return{

data:[],

keyword:'',

statusFilter:'',

page:1,

perPage:10


}

},



computed:{



filteredData(){


return this.data.filter(item=>{


const nama =


item.nama

?.toLowerCase()

.includes(

this.keyword.toLowerCase()

);





const status =


this.statusFilter=='' ||

item.status==this.statusFilter;





return nama && status;



});


},





totalPage(){


return Math.max(

1,

Math.ceil(

this.filteredData.length /

this.perPage

)

);


},






paginatedData(){


const start =

(this.page-1)

*this.perPage;




return this.filteredData.slice(

start,

start+this.perPage

);



}



},





watch:{


keyword(){

this.page=1;


},



statusFilter(){


this.page=1;


}



},






methods:{



async loadData(){


try{


const res =

await API.get('/peminjaman');



this.data =

res.data;



}



catch(error){


console.log(error);


}



},






async kembalikan(id){


if(!confirm(

'Kembalikan buku ini?'

))

return;





try{


await API.post(

'/peminjaman/kembali/'+id

);





alert(

'Buku berhasil dikembalikan'

);





this.loadData();





}


catch(error){


console.log(error);


alert(

'Gagal mengembalikan buku'

);


}



}



},





mounted(){


this.loadData();


}



}