const Genre = {

template:`

<div class="min-h-screen bg-gray-50 p-6">



<!-- HEADER -->

<div class="flex justify-between items-center mb-8">


<div>

<h1 class="text-3xl font-bold text-gray-800">

🏷️ Kelola Genre

</h1>


<p class="text-gray-500">

Manajemen kategori buku E-Library

</p>


</div>





<button

@click="openTambah"

class="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow">


+ Tambah Genre


</button>



</div>








<!-- SEARCH -->


<div class="bg-white p-5 rounded-2xl shadow mb-6">


<input

v-model="keyword"

placeholder="🔎 Cari genre..."

class="border p-3 rounded-xl w-full focus:ring-2 focus:ring-green-500">


</div>








<!-- TABLE -->


<div class="bg-white rounded-2xl shadow overflow-hidden">


<table class="w-full">


<thead class="bg-green-600 text-white">


<tr>


<th class="p-4">

ID

</th>


<th>

Nama Genre

</th>


<th>

Aksi

</th>


</tr>


</thead>





<tbody>


<tr

v-for="item in paginatedGenre"

:key="item.id"

class="border-b text-center hover:bg-green-50">


<td class="p-4">

{{item.id}}

</td>



<td>


<span

class="bg-green-100 text-green-700 px-4 py-1 rounded-full">


{{item.nama_genre}}


</span>


</td>




<td>



<button

@click="editData(item)"

class="bg-yellow-500 text-white px-3 py-2 rounded-lg mr-2">


✏️ Edit


</button>





<button

@click="hapus(item.id)"

class="bg-red-600 text-white px-3 py-2 rounded-lg">


🗑 Hapus


</button>




</td>





</tr>



</tbody>



</table>



</div>










<!-- PAGINATION -->


<div class="flex justify-center items-center gap-3 mt-8">



<button

@click="page--"

:disabled="page===1"

class="bg-gray-300 px-4 py-2 rounded-lg">


Prev


</button>





<div class="bg-white px-5 py-2 rounded-lg shadow font-bold">


Halaman {{page}} / {{totalPage}}


</div>





<button

@click="page++"

:disabled="page>=totalPage"

class="bg-green-600 text-white px-4 py-2 rounded-lg">


Next


</button>



</div>










<!-- MODAL -->


<div

v-if="showForm"

class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">





<div class="bg-white w-[500px] rounded-2xl shadow-xl p-8">



<h2 class="text-2xl font-bold mb-6">


{{editMode ? '✏️ Edit Genre':'➕ Tambah Genre'}}


</h2>







<input

v-model="form.nama_genre"

placeholder="Nama Genre"

class="border p-3 rounded-xl w-full mb-5">







<div class="flex justify-end gap-3">





<button

@click="showForm=false"

class="bg-gray-500 text-white px-5 py-2 rounded-xl">


Batal


</button>







<button

@click="simpan"

class="bg-green-600 text-white px-5 py-2 rounded-xl">


Simpan


</button>





</div>




</div>



</div>






</div>

`,

data(){
return{

    genre:[],

    keyword:'',
    page:1,
    perPage:5,

    showForm:false,
    editMode:false,

    form:{
        id:null,
        nama_genre:''
    }

}
},

computed:{

filteredGenre(){

    return this.genre.filter(item =>
        item.nama_genre
        .toLowerCase()
        .includes(
            this.keyword.toLowerCase()
        )
    );

},

totalPage(){

    return Math.ceil(
        this.filteredGenre.length /
        this.perPage
    );

},

paginatedGenre(){

    const start =
        (this.page-1) * this.perPage;

    return this.filteredGenre.slice(
        start,
        start + this.perPage
    );

}

},

methods:{

async loadData(){

    const res =
    await API.get('/genre');

    this.genre =
    res.data;

},

openTambah(){

    this.editMode=false;

    this.form={
        id:null,
        nama_genre:''
    };

    this.showForm=true;

},

editData(item){

    this.editMode=true;

    this.form={...item};

    this.showForm=true;

},

async simpan(){

try{

    if(this.editMode)
    {
        await API.post(
            '/genre/'+this.form.id,
            {
                nama_genre:
                this.form.nama_genre
            }
        );
    }
    else
    {
        await API.post(
            '/genre',
            {
                nama_genre:
                this.form.nama_genre
            }
        );
    }

    alert('Data berhasil disimpan');

    this.showForm=false;

    this.loadData();

}
catch(error){

    console.log(error);

    alert('Gagal menyimpan');

}

},

async hapus(id){

    if(!confirm('Yakin hapus genre?'))
    return;

    try{

        await API.delete(
            '/genre/'+id
        );

        alert('Genre berhasil dihapus');

        this.loadData();

    }
    catch(error){

        console.log(error);

        alert('Gagal menghapus');

    }

}

},

async mounted(){

    this.loadData();

}

}