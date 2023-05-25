import React, { createContext, useState } from 'react'

export const addData = createContext('');
export const updateData = createContext('')
export const delData = createContext('')

const ContextProvider = ({ children }) => {
    const [udata, setUdata] = useState('');
    const [updata, setUpdata] = useState('')
    const [deletedata, setDeletedata] = useState('')
    return (
        <>
            <addData.Provider value={{ udata, setUdata }}>
                <updateData.Provider value={{ updata, setUpdata }}>
                    <delData.Provider value={{ deletedata, setDeletedata }}>
                        {children}
                    </delData.Provider>
                </updateData.Provider>
            </addData.Provider>
        </>
    )
}

export default ContextProvider