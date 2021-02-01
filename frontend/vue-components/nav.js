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
                        <a class="nav-link" data-toggle="modal" data-target="#editProfile" style="cursor:pointer;">Editar perfil</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-md-0">
                    <button @click.prevent="logout()" class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Sair</button>
                </form>
            </div>
        </nav>

        <div class="modal fade" id="editProfile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document" style="overflow: initial;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Disciplinas</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                
                    <form class="text-left">
                        <div class="modal-body" syle="height: 300; overflow: auto;">
                            Nome:
                            <input class="form-control mr-sm-2" type="text" id="nameInput" name="nameInput" v-model="name">
                            Senha (Para manter a mesma senha, deixe em branco):
                            <input class="form-control mr-sm-2" type="password" id="passInput" name="passInput" v-model="pass">
                            
                            <div v-if="this.isProfessor==1">
                                Valor hora-aula:
                                <input class="form-control mr-sm-2" type="number" id="valueInput" name="valueInput" v-model="price">
                                Descrição:
                                <input class="form-control mr-sm-2" type="text" id="descriptionInput" name="descriptionInput" v-model="description">

                                Minhas disciplinas:
                                <div class="form-check" v-for="subject in subjects">
                                    <input type="checkbox" class="form-check-input" :name="subject['code']" :id="subject['code']" v-model="selectedSubs" :value="subject['code']">
                                    <label class="form-check-label" :for="subject['code']">{{subject['subjectName']}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button v-if="this.isProfessor==1" @click.prevent="this.updateProfessor()" type="button" class="btn btn-secondary" data-dismiss="modal" style="margin: auto;">Salvar modificações</button>
                            <button v-else @click.prevent="this.updateUser()" type="button" class="btn btn-secondary" data-dismiss="modal" style="margin: auto;">Salvar modificações</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data(){
        return{
            isProfessor: 0,
            subjects: [],
            selectedSubs: [],
            name: "",
            pass: "",
            price: 0,
            description: ""
        }
    },
    methods:{
        async logout(){
            const request = new Request( "/logout");
            const res = await fetch(request);
            window.location = res["url"];
        },
        reload(){
            window.location.reload();
        },
        async startModalProf(id){  
            const headers = new Headers();
            headers.append(
                "Content-Type",
                "application/json"
            );
            const request = new Request( "/searchID",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ id: id}),
                    mode: "cors",
                    cache: "default"
                }
            );      
            const res = await fetch(request);
            const response = await res.json();
            this.name = response["user"].name
            this.price = response["user"].price
            this.description = response["user"].description
            for (j in response["user"].subjects){
                // console.log(response["user"].subjects[j].code)
                this.selectedSubs.push(response["user"].subjects[j].code)
            }
            // console.log(this.selectedSubs);
        },
        async getLoggedUser(){
            const headers = new Headers();
                headers.append(
                    "Content-Type",
                    "application/json"
                );
            const request = new Request( "/getLoggedUser",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({}),
                    mode: "cors",
                    cache: "default"
                }
            )
            const res = await fetch(request);
            const response = await res.json();
            this.isProfessor = response.prof;
            if(this.isProfessor){
                this.startModalProf(response.id);
            } else{
                this.name = response.name;
            }
        },
        async getAllSubjects(){
            const headers = new Headers();
                headers.append(
                    "Content-Type",
                    "application/json"
                );
            const request = new Request( "/getAllSubjects",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({}),
                    mode: "cors",
                    cache: "default"
                }
            )
            const res = await fetch(request);
            const response = await res.json();
            this.subjects = response.subjects;
        },
        async updateProfessorSubjects(){
            const headers = new Headers();
                headers.append(
                    "Content-Type",
                    "application/json"
                );
            const request = new Request( "/updateProfSubject",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ subjects: this.selectedSubs}),
                    mode: "cors",
                    cache: "default"
                }
            )
            const res = await fetch(request);
            const response = await res.json();
        },
        async updateProfessorData(){
            const headers = new Headers();
                headers.append(
                    "Content-Type",
                    "application/json"
                );
            const request = new Request( "/updateProf",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ description: this.description, price: this.price}),
                    mode: "cors",
                    cache: "default"
                }
            )
            const res = await fetch(request);
            const response = await res.json();
        },
        async updateUserData(){
            const headers = new Headers();
                headers.append(
                    "Content-Type",
                    "application/json"
                );
            const request = new Request( "/updateUser",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ name: this.name, password: this.pass}),
                    mode: "cors",
                    cache: "default"
                }
            )
            const res = await fetch(request);
            const response = await res.json();
            this.reload();
        },
        updateUser(){
            console.log(this.name);
            console.log(this.pass);
            this.updateUserData();
        },
        updateProfessor(){
            console.log(this.name);
            console.log(this.pass);
            console.log(this.price);
            console.log(this.description);
            console.log(this.selectedSubs);
            this.updateProfessorSubjects();
            this.updateProfessorData();
            this.updateUserData();
        }
    },
    beforeMount(){
        this.getLoggedUser();
        this.getAllSubjects();
    }
});

nav.mount('#nav-vue');