import "./App.css";
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
import Topics from "./Components/Topics/Topics";
import Pestle from "./Components/Pestle/Pestle";
import Sources from "./Components/Sources/Sources";
import Country from "./Components/Country/Country";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const myIntensity = [];
const myLikelihood = [];
const myRelevance = [];
const myEnd_Yearly = [];

function App() {
    const [myData, setMyData] = useState([]);

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
                    myIntensity.push(d.intensity);
                    myLikelihood.push(d.likelihood);
                    myRelevance.push(d.relevance);
                    myEnd_Yearly.push(d.end_year);
                });
                console.log(myIntensity);
                setMyData(data);
                // console.log(data.intensity);
            });
    }, []);

    // console.log(myData);

    // console.log(myData.length);

    // for (let i = 0; i <= myData.length; i++) {
    //     console.log(myData[i].intensity);
    // }

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

    const labels = myEnd_Yearly;

    const data = {
        labels,
        datasets: [
            {
                label: "intensity",
                data: myIntensity,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "relevance",
                data: myRelevance,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
                label: "End Year",
                data: myLikelihood,
                borderColor: "rgb(0,255,0)",
                backgroundColor: "rgba(0,255,0, 0.5)",
            },
        ],
    };
    console.log(data);
    return (
        <>
            <Line options={options} data={data} />
            <Topics></Topics>
            <Pestle></Pestle>
            <Sources></Sources>
            <Country></Country>
        </>
    );
}

export default App;
