import React from 'react';
import {actions} from 'mirrorx';

export default {
    name:'bcjgyjxf',
    initialState:{
        isOpen:false,
        isDetailOpen:false
    },
    reducers:{
        set(state,data){
            return {...state,...data}
        }
    },
    effects:{

        OpenThreshold() {
            actions.bcjgyjxf.set({isOpen: true})
        },
        CloseThreshold(){
            actions.bcjgyjxf.set({isOpen:false})
        },
        OpenAlarmDetail(){
            actions.bcjgyjxf.set({isDetailOpen:true})
        },
        CloseAlarmDetail(){
            actions.bcjgyjxf.set({isDetailOpen:false})
        }
    }
}