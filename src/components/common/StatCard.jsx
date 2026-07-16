import "./StatCard.css";

export default function StatCard({

    title,
    value,
    icon,
    color

}) {

    return (

        <div className="stat-card">

            <div
                className={`stat-icon bg-${color}`}
            >

                {icon}

            </div>

            <div
    className="card border-0 shadow-sm h-100"
    style={{ borderRadius: "18px" }}
></div>

            <div className="stat-content">

                <h6>

                    {title}

                </h6>

                <h2>

                    {value}

                </h2>

            </div>

        </div>

    );

}