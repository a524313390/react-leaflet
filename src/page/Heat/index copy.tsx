import React, { useEffect, useState } from 'react'

import { useRequest } from 'ahooks';
const api: any = {}
export default function Demo() {
    const { data: data1 } = useRequest(api.get('111'));
    const { data: data2 } = useRequest(api.get('222'));
    const { data: data3 } = useRequest(api.get('222'));
    const { data: data4 } = useRequest(api.get('222'));
    const [state1, setState1] = useState();
    const [state2, setState2] = useState();
    const [state3, setState3] = useState();
    const [state4, setState4] = useState();

    useEffect(() => {
        if (data1 && data1.data) {
            let res = JSON.parse(data2.data);
            setState1(res)
        }
        if (data2 && data2.data) {
            let res = JSON.parse(data2.data);
            setState2(res)
        }
        if (data2 && data2.data) {
            let res = JSON.parse(data2.data);
            setState3(res)
        }

        if (data2 && data2.data) {
            let res = JSON.parse(data2.data);
            setState4(res)
        }

    }, [data1, data2, data3, data4])


    return (
        <>
            <div></div>
        </>
    )
}
