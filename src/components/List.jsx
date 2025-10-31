import "./List.css";
import { Link } from "react-router-dom";

const List = ({ data }) => {
    return (
        <>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature</th>
                        <th>Wind</th>
                        <th>Snow</th>
                        <th>Max UV</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/details/${index}`} state={{ item: item }}>
                                    {item["datetime"]}
                                </Link>
                            </td>
                            <td>{item["temp"]}</td>
                            <td>{item["wind_spd"]}</td>
                            <td>{item["snow"]}</td>
                            <td>{item["max_uv"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default List;