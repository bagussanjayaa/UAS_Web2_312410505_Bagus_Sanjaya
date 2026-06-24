const Navbar = {

template:`

<nav class="bg-blue-600 text-white px-6 py-3">

<div class="container mx-auto flex justify-between items-center">

<h1 class="font-bold text-xl">
E-Library
</h1>

<div>

<button
v-if="!isLogin"
@click="$router.push('/login')"
class="bg-white text-blue-600 px-4 py-2 rounded">

Login

</button>

<div
v-else
class="flex gap-2">

<button
@click="$router.push('/admin')"
class="bg-white text-blue-600 px-3 py-1 rounded">

Dashboard

</button>

<button
@click="$router.push('/admin/buku')"
class="bg-white text-blue-600 px-3 py-1 rounded">

Buku

</button>

<button
@click="$router.push('/admin/anggota')"
class="bg-white text-blue-600 px-3 py-1 rounded">

Anggota

</button>

<button
@click="$router.push('/admin/peminjaman')"
class="bg-white text-blue-600 px-3 py-1 rounded">

Peminjaman

</button>

<button
@click="logout"
class="bg-red-500 text-white px-3 py-1 rounded">

Logout

</button>

</div>

</div>

</div>

</nav>

`,

computed:{

isLogin(){
return localStorage.getItem('token');
}

},

methods:{

logout(){

localStorage.clear();

this.$router.push('/');

}

}

}