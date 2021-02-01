Vue.createApp({
    methods:{
        async getLoggedUser(){
            try {
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
                console.log(response);
                if(response.prof){
                    window.location.href = "/professor";
                } else{
                    window.location.href = "/search";
                }
            } catch (e) {
                console.log("Usuário não logado");
            }
        }
    },
    errorCaptured(err, vm, info) {
        console.log("Usuário não logado")
    },
    beforeMount(){
        this.getLoggedUser();
    }
}).mount("#redirect");