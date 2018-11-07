import React from 'react'
import {Pagination} from 'antd'

function MyPagination ({start,limit,count,onChange}) {
    const current = parseInt((start + 1) / limit, 10) + ((start + 1) % limit === 0 ? 0 : 1)
    return (
        <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0'}}>
            <Pagination
                current={current}
                total={count}
                pageSize={limit}
                size="small"
                onChange={(pageIndex) => {
                    onChange({start: (pageIndex - 1) * limit})
                }}
            />
            <div style={{lineHeight:'25px'}}>
                共 <strong>{count}</strong> 条记录，每页 <strong>{limit}</strong> 条
            </div>
        </div>
    )
}

export default MyPagination