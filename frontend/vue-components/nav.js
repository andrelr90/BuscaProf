const nav = Vue.createApp({});
            
nav.component('nav-vue', {
    template: `
        <nav class="navbar navbar-expand-md navbar-light bg-light">
            <a class="navbar-brand" href="/search">BuscaProf</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Perfil</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-md-0">
                    <button @click.prevent="logout()" class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Sair</button>
                </form>
            </div>
        </nav>`,
        methods:{
            async logout(){
                const request = new Request( "http://localhost:3000/logout");
                const res = await fetch(request);
                window.location = res["url"];
            }
        }
});

nav.mount('#nav-vue');