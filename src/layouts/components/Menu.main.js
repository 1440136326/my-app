import React from 'react'
import {actions} from 'mirrorx'
import {Menu,Icon} from 'antd'

const MainMenu = ({menu,menus = [],mode='inline',theme='dark'}) => {

        const buildMenuItem = (menu) => {
        const children = menus.filter(item => item.parentId === menu.id && item.show === 1)

        if (children.length === 0) {
            return (
                <Menu.Item
                    key={menu.id}
                >
                    <span>
                        {menu.level === 0 ? <Icon type={menu.icon || 'file-text'}/> : null}
                        <span>{menu.name}</span>
                    </span>
                </Menu.Item>
            )
        } else {
            return (
                <Menu.SubMenu
                    key={menu.id}
                    title={<span>
                         {menu.level === 0 ? <Icon type={menu.icon || 'file-text'}/> : null}
                        <span>{menu.name}</span>
                    </span>}
                >
                    {children.map(item => buildMenuItem(item))}
                </Menu.SubMenu>
            )
        }
    }

    const getSelectedKeys = (menu) => {

        let selectedKeys = []

        const getParent = (menu) => {
            if (menu) {
                selectedKeys.push(menu.id)
                const parent = menus.find(item => item.id === menu.parentId)
                getParent(parent)
            }
        }
        getParent(menu)
        return selectedKeys
    }

    const onClickMenu = ({key}) => {
        const menu = menus.find(menu => menu.id === key)
        if (menu && menu.url) {
            if (menu.url.indexOf('/') === 0)
                actions.routing.push(menu.url)
            else
                window.open(menu.url)
        }
    }

    return (
        <Menu
            className="main-menu"
            mode={mode}
            theme={theme}
            inlineIndent={20}
            defaultSelectedKeys={getSelectedKeys(menu)}
            defaultOpenKeys={mode === 'inline' ? getSelectedKeys(menu).filter(key => key !== menu.id) :[]}
            onClick={onClickMenu}
        >
            {
                menus.filter(item => item.parentId === '' && item.show === 1).map(item => buildMenuItem(item))
            }
        </Menu>

    )
}

export default MainMenu