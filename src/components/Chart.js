import React from 'react';
import { Bar } from 'react-chartjs-2';


const Chart = () => {
    return <div>
        <Bar 
            data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 
                'Purple', 'Orange'],
            }}
            height={400}
            width={600}
            options={{

            }}
        />
    </div>
}

export default Chart