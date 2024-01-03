import React from 'react'
import { Pagination, Table } from 'antd'
import styles from './styles.module.scss'
import './styles.scss'

function TableDefault(props) {
    let {
        // eslint-disable-next-line react/prop-types
        dataSource, columns, pagination, loading,
        // eslint-disable-next-line react/prop-types
        onChange, handleSelectPagination
    } = props

    return (
        <div className={`${styles.tableDefaultWrap}`}>
            <Table
                loading={loading}
                className={'main-table mb-[15px]'}
                rowClassName={'main-row'}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                rowKey={'id'}
                onChange={onChange}
                scroll={{ y: 500 }}
            />
            <Pagination
                className={'flex justify-end'}
                current={pagination.currentPage}
                total={pagination.totalRecord}
                pageSize={pagination.perPage}
                onChange={(e) => handleSelectPagination(e)}
            />
        </div>
    )
}

export default TableDefault

