import React from 'react'
import './index.less'
interface Props {
    name: string;
    number: number;
    unit?: string;
}
export default function PointMarker(props: Props) {
    const { name, number, unit } = props;
    return (
        <div className="towns-cricle">
            <div className="circle "></div>
            <div className="circle1 liner"></div>
            <div className="circle2 liner"></div>
            <div className="circle-text ">
                <p>
                    <span className="text text-liner">{number}</span>
                    {
                        unit && <span className="home text-liner">{unit}</span>
                    }
                </p>
                <p className="name ">{name}</p>
            </div>
        </div>
    )
}
