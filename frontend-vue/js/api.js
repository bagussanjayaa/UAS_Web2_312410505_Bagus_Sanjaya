const API = axios.create({
    baseURL: 'http://localhost:8080'
});

API.interceptors.request.use(config => {

    const token =
        localStorage.getItem('token');

    if(token)
    {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
    response => response,

    error => {

        const currentUrl =
            error.config.url;

        if(
            error.response &&
            error.response.status === 401 &&
            currentUrl !== '/login'
        )
        {
            alert('Session habis');

            localStorage.clear();

            router.push('/login');
        }

        return Promise.reject(error);
    }
);