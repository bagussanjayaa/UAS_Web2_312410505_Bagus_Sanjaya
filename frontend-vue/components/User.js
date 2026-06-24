const User = {

template:`

<div class="min-h-screen bg-gray-50 p-6">



<!-- HEADER -->

<div class="flex justify-between items-center mb-8">


<div>

<h1 class="text-3xl font-bold text-gray-800">

🔑 Kelola User

</h1>


<p class="text-gray-500">

Manajemen akun pengguna E-Library

</p>


</div>




<button

@click="openTambah"

class="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow">


+ Tambah User


</button>



</div>







<!-- SEARCH -->


<div class="bg-white p-5 rounded-2xl shadow mb-6">


<input

v-model="keyword"

placeholder="🔎 Cari user..."

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

Nama

</th>


<th>

Username

</th>


<th>

Role

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



<td class="p-4">

{{item.id}}

</td>



<td class="font-semibold">

{{item.nama}}

</td>



<td>

{{item.username}}

</td>




<td>


<span

:class="item.role=='admin' 
? 'bg-purple-100 text-purple-700'
: 'bg-green-100 text-green-700'"

class="px-4 py-1 rounded-full">


{{item.role}}


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


Halaman {{page}}


</div>






<button

@click="page++"

:disabled="page>=totalPage"

class="bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg">


Next


</button>



</div>









<!-- MODAL -->


<div

v-if="showForm"

class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">





<div class="bg-white w-[500px] rounded-2xl shadow-xl p-8">



<h2 class="text-2xl font-bold mb-6">


{{editMode ? '✏️ Edit User':'➕ Tambah User'}}


</h2>







<input

v-model="form.nama"

placeholder="Nama"

class="border p-3 rounded-xl w-full mb-3">







<input

v-model="form.username"

placeholder="Username"

class="border p-3 rounded-xl w-full mb-3">







<input

type="password"

v-model="form.password"

placeholder="Password"

class="border p-3 rounded-xl w-full mb-3">








<select

v-model="form.role"

class="border p-3 rounded-xl w-full mb-5">


<option value="admin">

Admin

</option>


<option value="anggota">

Anggota

</option>


</select>







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
    users:[],   // ganti dari "data" ke "users"
    keyword:'',
    showForm:false,
    editMode:false,
    page:1,
    perPage:5,

    form:{
        id:null,
        nama:'',
        username:'',
        password:'',
        role:'anggota'
    }
}
},

computed:{

filteredData(){

    return this.users.filter(item =>
        item.nama
        .toLowerCase()
        .includes(
            this.keyword.toLowerCase()
        )
    );

},

watch:{

keyword(){

    this.page = 1;

}

},


totalPage(){

    return Math.ceil(
        this.filteredData.length /
        this.perPage
    );

},


paginatedData(){

    const start =
        (this.page - 1) * this.perPage;


    return this.filteredData.slice(
        start,
        start + this.perPage
    );

}

},

methods:{
async loadData(){
    try{
        const res = await API.get('/user');
        this.users = res.data;
    }catch(err){
        console.log(err);
    }
},

async simpan(){
    try{
        const formData = new FormData();
        formData.append('nama', this.form.nama);
        formData.append('username', this.form.username);
        formData.append('password', this.form.password);
        formData.append('role', this.form.role);

        if(this.editMode){
            await API.post('/user/' + this.form.id, formData);
        }else{
            await API.post('/user', formData);
        }

        alert('Data berhasil disimpan');
        this.showForm = false;
        this.loadData();
    }catch(error){
        console.log(error);
        alert('Gagal menyimpan');
    }
},

openTambah(){
    this.editMode = false;
    this.form = {
        id:null,
        nama:'',
        username:'',
        password:'',
        role:'anggota'
    };
    this.showForm = true;
},

editData(item){
    this.editMode = true;
    this.form = {...item, password:''};
    this.showForm = true;
},

async hapus(id){
    if(!confirm('Hapus user?')) return;
    await API.delete('/user/'+id);
    this.loadData();
}
},

async mounted(){
    this.loadData();
}

}
