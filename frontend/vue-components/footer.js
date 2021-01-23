const footer = Vue.createApp({});

footer.component('footer-vue', {
    template:
        `<footer id="sticky-footer fixed-bottom " class="py-4 bg-light text-secondary">
            <div class="container d-flex align-items-center" id="footer-inside">
                <div class="container text-center">
                    <small>Desenvolvedores:</small> <br>
                    <small> André Ribeiro, Daniel Abadi, Igor Castejon, Pedro Geovanni </small>
                </div>
            </div>
        </footer>`
});

footer.mount("#footer-vue");