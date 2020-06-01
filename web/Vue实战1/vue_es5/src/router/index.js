import Vue from 'vue'
import VueRouter from "vue-router"
let router = new VueRouter(
    {
        routes:[
            {
                path:'/index',
                component:'index'
            },
            {
                path:'/about',
                component:"about"
            }
        ]
    }
)
export {router}