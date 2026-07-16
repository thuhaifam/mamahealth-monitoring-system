import {

    Bar

} from "react-chartjs-2";

export default function BarChart({

    labels,

    values

}) {

    const data = {

        labels,

        datasets: [

            {

                label: "Appointments",

                data: values

            }

        ]

    };

    return <Bar data={data} />;

}