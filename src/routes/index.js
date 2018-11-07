import React from 'react'
import {Router,Route,Switch} from 'mirrorx'

import Private from './PrivateRoute'
import PageNoFound from './Error/PageNotFound'

// import Home from './Home'
import Setting from './Home/setting'
import ChangePwd from './Home/changePwd'
import Login from './Login'

import SystemUser from './System/User'
import SystemUserEdit from './System/User/edit'
import SystemMenu from './System/Menu'
import SystemMenuEdit from './System/Menu/edit'
import SystemMenuRightConfig from './System/Menu/right'
import SystemLog from './System/Log'
import SystemSafety from './System/Safety'

import Bcxjrwdz from './Bcxjrwdz';
import Bcjgyjxf from './Bcjgyjxf';
import Ywgj from './Ywgj';
import Wlsbjk from './Wlsbjk';
import Sbjkrw from './Sbjkrw';
import Sbtj from './Tjfx';
import Zytj from './Tjfx/components/zytj';

function PrivateWrapper({match}) {
    return function (component, code) {
        return <Private component={component} match={match} code={code}/>
    }
}

const routeConfig = ()=> {
    return (
        <Router>
            <Switch>
                <Route path='/' component={Login} exact/>

                <Route path='/home' exact render={props => PrivateWrapper(props)(Ywgj, 'ywgj')}/>
                <Route path='/setting' exact render={props => PrivateWrapper(props)(Setting, 'setting')}/>
                <Route path='/changePwd' component={ChangePwd} exact/>

                <Route path='/system/user' exact render={props => PrivateWrapper(props)(SystemUser, 'system.user')}/>
                <Route path='/system/user/add' render={props =>PrivateWrapper(props)(SystemUserEdit, 'system.user.add')}/>
                <Route path='/system/user/edit/:id' render={props => PrivateWrapper(props)(SystemUserEdit, 'system.user.edit')}/>

                <Route path='/system/menu' exact render={props => PrivateWrapper(props)(SystemMenu, 'system.menu')}/>
                <Route path='/system/menu/add' render={props => PrivateWrapper(props)(SystemMenuEdit, 'system.menu.add')}/>
                <Route path='/system/menu/edit/:id' render={props => PrivateWrapper(props)(SystemMenuEdit, 'system.menu.edit')}/>
                <Route path='/system/menu/right/:id' render={props => PrivateWrapper(props)(SystemMenuRightConfig, 'system.menu.right')}/>

                <Route path='/system/log' exact render={props => PrivateWrapper(props)(SystemLog, 'system.log')}/>
                <Route path='/system/safety' exact render={props => PrivateWrapper(props)(SystemSafety, 'system.safety')}/>

                <Route path='/bcxjrwdz' exact render={props=>PrivateWrapper(props)(Bcxjrwdz,'bcxjrwdz')} />
                <Route path='/bcjgyjxf' exact render={props=>PrivateWrapper(props)(Bcjgyjxf,'bcjgyjxf')} />
                <Route path='/ywgj' exact render={props=>PrivateWrapper(props)(Ywgj,'ywgj')} />
                <Route path='/wlsbjk' exact render={props=>PrivateWrapper(props)(Wlsbjk,'wlsbjk')} />
                <Route path='/sbjkrw' exact render={props=>PrivateWrapper(props)(Sbjkrw,'sbjkrw')} />
                <Route path='/tjfx/sbtj' exact render={props=>PrivateWrapper(props)(Sbtj,'tjfx.sbtj')} />
                <Route path='/tjfx/zytj' exact render={props=>PrivateWrapper(props)(Zytj,'tjfx.zytj')} />

                <Route render={props => PrivateWrapper(props)(PageNoFound, '404')}/>
            </Switch>
        </Router>
    )
}
export default routeConfig