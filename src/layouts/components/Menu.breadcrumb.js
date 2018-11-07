import React from 'react'
import PropTypes from 'prop-types'

import {Breadcrumb} from 'antd'
import {Link} from 'mirrorx'

const BreadcrumbMenu = ({menu,menus=[]}) => {
    const getBreadcrumbMenus = (menu) => {

        if (!menu)
            return []

        if (menu.id === '404' || menu.id === '403')
            return []

        let breadcrumbMenus = []

        const buildBreadcrumb = (menu) => {
            if (menu) {
                breadcrumbMenus = [menu, ...breadcrumbMenus]
                const parent = menus.find(item => item.id === menu.parentId)
                buildBreadcrumb(parent)
            }
        }

        buildBreadcrumb(menu)

        const index = menus.find(item => item.name === '首页')

        if (breadcrumbMenus.length > 0 && breadcrumbMenus[0].name !== '首页' && index)
            breadcrumbMenus = [index, ...breadcrumbMenus]

        return breadcrumbMenus
    }
    return (
        <Breadcrumb>
            {
                getBreadcrumbMenus(menu).map(item =>
                    <Breadcrumb.Item key={item.id}>
                        {
                            item.url ?
                                <Link to={item.url}>{item.name}</Link> :
                                <a>{item.name}</a>
                        }
                    </Breadcrumb.Item>
                )
            }
        </Breadcrumb>
    )
}

BreadcrumbMenu.propTypes = {
    menus: PropTypes.array,
    menu: PropTypes.object
}

export default BreadcrumbMenu
