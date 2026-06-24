const routes = [

{
path:'/',
component:Home
},

{
path:'/login',
component:Login
},

{
path:'/admin',
component:DashboardAdmin,
meta:{
requiresAuth:true
}
},

{
path:'/admin/buku',
component:Buku,
meta:{requiresAuth:true}
},

{
path:'/admin/genre',
component:Genre,
meta:{requiresAuth:true}
},

{
path:'/admin/peminjaman',
component:Peminjaman,
meta:{requiresAuth:true}
},

//{
//path:'/anggota/pinjaman',
//component:PinjamanSaya,
//meta:{requiresAuth:true}
//},

{
path:'/admin/anggota',
component:Anggota,
meta:{requiresAuth:true}
},

{
path:'/anggota',
component:DashboardAnggota,
meta:{
requiresAuth:true
}
},

{
path:'/admin/user',
component:User
},

{
path:'/buku/:id',
component:DetailBuku
}



];

const router =
VueRouter.createRouter({

history:
VueRouter.createWebHashHistory(),

routes

});

router.beforeEach(
(to,from,next)=>{

if(
to.meta.requiresAuth &&
!localStorage.getItem('token')
)
{
next('/login');
}
else
{
next();
}

});