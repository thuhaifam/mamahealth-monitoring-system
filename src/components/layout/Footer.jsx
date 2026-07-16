export default function Footer() {

    return (

        <footer
            className="dashboard-footer"
        >

            <div className="container-fluid">

                <div className="row align-items-center">

                    <div className="col-md-6">

                        © {new Date().getFullYear()} MamaHealth Monitoring System

                    </div>

                    <div className="col-md-6 text-md-end mt-2 mt-md-0">

                        <a href="#" className="me-3 text-decoration-none">

                            Privacy

                        </a>

                        <a href="#" className="me-3 text-decoration-none">

                            Terms

                        </a>

                        <a href="#" className="text-decoration-none">

                            Help

                        </a>

                    </div>

                </div>

            </div>

        </footer>

    );

}