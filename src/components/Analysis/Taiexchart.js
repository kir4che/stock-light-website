
import { useEffect, useState } from 'react';
import Chart from '@/components/Chart/Chart';
import Loading from '@/components/common/Loading'

export default function Taiexchart() {
    const [taiexData, setTaiexData] = useState([]);

    const fetchTaiex = async () => {
        try {
            const response = await fetch(`${process.env.DB_URL}/api/taiex/all`, {
                method: 'GET',
            });
            const data = await response.json();
            setTaiexData(data.data);
        } catch (error) {
            console.error('error', error);
        }
    };

    useEffect(() => {
        fetchTaiex();
    }, []);


    const dateData = taiexData.map((item) => item.date);
    const closePriceData = taiexData.map((item) => item.closing_index);
    const openingIndexData = taiexData.map((item) => item.opening_index);
    const highestIndexData = taiexData.map((item) => item.highest_index);
    const lowestIndexData = taiexData.map((item) => item.lowest_index);
    const createDateData = taiexData.map((item) => item.create_date);
    const updateDateData = taiexData.map((item) => item.update_date);

    return (
        <div>
            {taiexData.length > 0 ? (
                <Chart
                    option={{
                        dateData,
                        createDateData,
                        updateDateData,
                        closePriceData,
                        openingIndexData,
                        highestIndexData,
                        lowestIndexData,
                    }}
                    customHeight="h-72 md:h-80 xl:h-[450px]"
                />
            ) : (
                <Loading />
            )}
        </div>
    );
}