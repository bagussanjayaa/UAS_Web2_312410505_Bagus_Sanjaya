const Buku = {

template:`

<div class="min-h-screen bg-gray-50 p-6">


<!-- HEADER -->

<div class="flex justify-between items-center mb-8">


<div>

<h1 class="text-3xl font-bold text-gray-800">

📚 Kelola Buku

</h1>


<p class="text-gray-500">

Manajemen koleksi buku E-Library

</p>


</div>




<button

@click="openTambah"

class="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow">

+ Tambah Buku

</button>


</div>







<!-- SEARCH -->

<div class="bg-white p-5 rounded-2xl shadow mb-6">


<input

v-model="keyword"

placeholder="🔎 Cari judul buku..."

class="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500">


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
Cover
</th>


<th>
Judul
</th>


<th>
Penulis
</th>


<th>
Penerbit
</th>


<th>
Genre
</th>


<th>
Stok
</th>


<th>
Aksi
</th>


</tr>


</thead>




<tbody>


<tr

v-for="item in paginatedBooks"

:key="item.id"

class="border-b hover:bg-green-50 text-center">


<td>

{{item.id}}

</td>





<td class="p-3">


<img

:src="item.cover_url"

class="w-16 h-20 object-cover rounded-lg mx-auto shadow">


</td>





<td class="font-semibold">

{{item.judul}}

</td>





<td>

{{item.penulis}}

</td>





<td>

{{item.penerbit}}

</td>





<td>


<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full">


{{item.nama_genre}}


</span>


</td>





<td>


<span class="font-bold text-green-600">


{{item.stok}}


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





<div class="bg-white w-[600px] rounded-2xl shadow-xl p-8">


<h2 class="text-2xl font-bold mb-6">


{{editMode ? '✏️ Edit Buku':'➕ Tambah Buku'}}


</h2>





<input

v-model="form.judul"

placeholder="Judul Buku"

class="border p-3 rounded-xl w-full mb-3">





<input

v-model="form.penulis"

placeholder="Penulis"

class="border p-3 rounded-xl w-full mb-3">





<input

v-model="form.penerbit"

placeholder="Penerbit"

class="border p-3 rounded-xl w-full mb-3">






<select

v-model="form.genre_id"

class="border p-3 rounded-xl w-full mb-3">



<option value="">Pilih Genre</option>



<option

v-for="g in genre"

:value="g.id">


{{g.nama_genre}}


</option>



</select>







<input

v-model="form.stok"

placeholder="Jumlah Stok"

class="border p-3 rounded-xl w-full mb-3">






<textarea

v-model="form.deskripsi"

placeholder="Deskripsi"

class="border p-3 rounded-xl w-full mb-3">


</textarea>







<input

type="file"

@change="pilihFile"

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
return {
    buku:[],
    genre:[],

    keyword:'',
    page:1,
    perPage:5,

    showForm:false,
    editMode:false,

    form:{
        id:null,
        judul:'',
        penulis:'',
        penerbit:'',
        genre_id:'',
        stok:'',
        deskripsi:'',
        cover:''
    }
}
},

computed:{

filteredBooks(){

    return this.buku.filter(item =>
        item.judul
        .toLowerCase()
        .includes(
            this.keyword.toLowerCase()
        )
    );

},

totalPage(){

    return Math.ceil(
        this.filteredBooks.length /
        this.perPage
    );

},



paginatedBooks(){

    const start =
        (this.page - 1) * this.perPage;

    return this.filteredBooks.slice(
        start,
        start + this.perPage
    );

}

},

methods:{

pilihFile(e){

    this.form.cover =
    e.target.files[0];

},

async loadData(){

    const res =
    await API.get('/buku');

    console.log(res.data);

    this.buku =
    res.data;

},

async loadGenre(){

    const res =
    await API.get('/genre');

    this.genre =
    res.data;

},

openTambah(){

    this.editMode=false;

    this.form={
        id:null,
        judul:'',
        penulis:'',
        penerbit:'',
        genre_id:'',
        stok:'',
        deskripsi:'',
        cover:'default.jpg'
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

    const formData =
    new FormData();

    formData.append(
        'judul',
        this.form.judul
    );

    formData.append(
        'penulis',
        this.form.penulis
    );

    formData.append(
        'penerbit',
        this.form.penerbit
    );

    formData.append(
        'genre_id',
        this.form.genre_id
    );

    formData.append(
        'stok',
        this.form.stok
    );

    formData.append(
        'deskripsi',
        this.form.deskripsi
    );

    if(this.form.cover)
    {
        formData.append(
            'cover',
            this.form.cover
        );
    }

    if(this.editMode)
    {
        await API.post(
            '/buku/'+this.form.id,
            formData
        );
    }
    else
    {
        await API.post(
            '/buku',
            formData
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

    if(!confirm('Hapus buku?'))
    return;

    await API.delete(
        '/buku/'+id
    );

    this.loadData();

}

},

async mounted(){

    await this.loadData();

    await this.loadGenre();

}

}