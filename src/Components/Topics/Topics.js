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
// import Topics from "./Components/Topics/Topics";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const myTopics = [];
const myStarted_year = [];

const Topics = () => {
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
                    myTopics.push(d.topic);
                    myStarted_year.push(d.start_year);
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

    const labels = myTopics;

    const data = {
        labels,
        datasets: [
            {
                label: "Started Year",
                data: myStarted_year,
                borderColor: "rgb(128,0,128)",
                backgroundColor: "rgba(128,0,128, 0.5)",
            },
        ],
    };
    return (
        <div>
            <h1>Topics and Started Year</h1>
            <Line options={options} data={data} />
        </div>
    );
};

export default Topics;
