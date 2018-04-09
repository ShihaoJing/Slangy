new Vue({
    el: '#user-list',
    data: {
        users: []
    },
    created: function () {
        this.init();
    },
    methods: {
        init: function () {
            // GET /someUrl
            this.$http.get('/user').then(response => {
                // get body data
                this.users = response.body;
            }, response => {
                // error callback
                console.log(response);
            });
        }
    }
});