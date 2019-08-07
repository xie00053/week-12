<template>
    <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard {{ user.name}}!</p>
        <p>Your log in email is: {{ user.email}}</p>
        <form @submit.prevent="onSubmit">
            <label for="name">Edit your name:</label>
            <input type="text" id="name" v-model="user.name">
            <br />
            <input type="submit" value="Submit" />
        </form>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters({
            userData:"getUser"
        }), 
        user(){
            return !this.userData ? false : this.userData;
        }
    },
    created(){
    this.getUserData();
    },
    methods: {
        ...mapActions(["fetchUser", "updateUser"]),
        getUserData(){
            let userEmail = localStorage.getItem("userEmail");
            console.log(userEmail)
            this.fetchUser(userEmail); 
        },
        submitForm(){
            this.updateUser();
        }
    }
}
</script>
