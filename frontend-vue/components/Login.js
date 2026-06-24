const Login = {

template:`

<div class="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center">


<div class="w-full max-w-md">



<!-- Logo -->

<div class="text-center mb-8">


<div class="text-6xl mb-3">

📚

</div>


<h1 class="text-4xl font-bold text-green-700">

E-Library

</h1>


<p class="text-gray-600 mt-2">

Masuk untuk mengakses koleksi buku digital

</p>


</div>







<!-- Card Login -->

<div class="bg-white rounded-3xl shadow-xl p-8">





<h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">

Login Akun

</h2>







<div class="mb-4">


<label class="text-gray-600">

Username

</label>


<input

v-model="username"

placeholder="Masukkan username"

class="mt-2 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-3 w-full rounded-xl outline-none">


</div>








<div class="mb-6">


<label class="text-gray-600">

Password

</label>


<input

type="password"

v-model="password"

placeholder="Masukkan password"

class="mt-2 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-3 w-full rounded-xl outline-none">


</div>








<button


@click="login"


class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg transition">


🔐 Login


</button>







<div class="mt-6 text-center text-sm text-gray-500">


© E-Library Digital Library


</div>







</div>



</div>



</div>


`,


data(){

return{

username:'',

password:''

}

},



methods:{


async login(){


try{



const response =

await API.post('/login',{


username:this.username,

password:this.password



});





localStorage.setItem(

'id',

response.data.id

);





localStorage.setItem(

'token',

response.data.token

);





localStorage.setItem(

'role',

response.data.role

);





localStorage.setItem(

'nama',

response.data.nama

);








if(response.data.role=='admin')

{


router.push('/admin');


}

else{


router.push('/anggota');


}





}

catch(error){


alert('Username atau password salah');


}



}



}



}