import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { loadToys } from '../store/toy.actions';
import { StockChart } from '../cmps/toy-stock-chart';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DashBoard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function getChartsData() {
        const data = toys.reduce(
            (acc, toy) => {
                toy.labels.forEach(label => {
                    acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? acc.labelsPriceMap[label] + toy.price : toy.price
                    acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
                })
                return acc

            }, { labelsPriceMap: {}, labelsCountMap: {} })
        Object.keys(data.labelsPriceMap).forEach((label) => (data.labelsPriceMap[label] /= data.labelsCountMap[label]))
        return data
    }

    const { labelsPriceMap, labelsCountMap } = getChartsData()
    console.log('labelsPriceMap:', labelsPriceMap)
    console.log('labelsCountMap:', labelsCountMap)

    return (
        <div className='main-about'>
            <h1>Check out our data</h1>
            <div className='main-charts'>
            <StockChart labels={Object.keys(labelsCountMap)} values={Object.values(labelsCountMap)} />
            <StockChart labels={Object.keys(labelsPriceMap)} values={Object.values(labelsPriceMap)} />
            </div>
        </div>
    )

}

