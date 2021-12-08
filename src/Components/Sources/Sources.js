import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const mySource = [];
const myRelevance = [];

const Sources = () => {
    useEffect(() => {
        fetch("https://stark-lowlands-44847.herokuapp.com/dashboard")
            .then((res) => res.json())
            .then((data) => {
                // for (const dataObj of data) {
                // console.log(myIntensity.push(data.intensity));
                // }
                // for (let i = 0; i <= data.length; i++) {
                //     console.log(data[i].sector);
                // }
                data.map((d, index) => {
                    mySource.push(d.source);
                    myRelevance.push(d.relevance);
                });

                // setMyData(data);
                // console.log(data.intensity);
            });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Dash Board Chart",
            },
        },
    };

    const labels = mySource;

    const data = {
        labels,
        datasets: [
            {
                label: "Relevance",
                data: myRelevance,
                borderColor: "rgb(255,255,0)",
                backgroundColor: "rgba(255,255,0, 0.5)",
            },
        ],
    };
    return (
        <div>
            <h1>Sources and Relevance</h1>
            <Line options={options} data={data} />
        </div>
    );
};

export default Sources;
